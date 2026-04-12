import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import type { CacheNode, NodeStatus } from "@/engine/types";

interface ClusterLink {
  source: string;
  target: string;
  active?: boolean;
}

interface ClusterGraphProps {
  nodes: CacheNode[];
  links: ClusterLink[];
  selectedNodeId?: string | null;
  pulseLinks?: ClusterLink[];
  onSelectNode?: (nodeId: string) => void;
}

const STATUS_COLORS: Record<NodeStatus, string> = {
  ALIVE: "#10b981",
  SUSPECT: "#f59e0b",
  DEAD: "#ef4444",
};

export function ClusterGraph({
  nodes,
  links,
  selectedNodeId,
  pulseLinks = [],
  onSelectNode,
}: ClusterGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const pulseSet = useMemo(() => {
    return new Set(pulseLinks.map((edge) => `${edge.source}->${edge.target}`));
  }, [pulseLinks]);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl || nodes.length === 0) {
      return;
    }

    const width = 520;
    const height = 320;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const root = svg.append("g");
    const linkLayer = root.append("g");
    const pulseLayer = root.append("g");
    const nodeLayer = root.append("g");

    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.6, 1.8]).on("zoom", (event) => {
      root.attr("transform", event.transform.toString());
    });

    svg.call(zoom);

    const simNodes = nodes.map((node, i) => ({
      ...node,
      x: node.x ?? width / 2 + Math.cos((i / nodes.length) * Math.PI * 2) * 120,
      y: node.y ?? height / 2 + Math.sin((i / nodes.length) * Math.PI * 2) * 120,
    }));

    const computeOffset = (s: string, t: string) => {
      // deterministic small integer based on ids to spread parallel links
      const key = `${s}->${t}`;
      let h = 0;
      for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
      // range -2..2
      return ((Math.abs(h) % 5) - 2) * 18;
    };

    const simLinks = links.map((link) => ({ ...link, _offset: computeOffset(link.source as string, link.target as string) }));

    const simulation = d3
      .forceSimulation(simNodes as d3.SimulationNodeDatum[])
      .force(
        "link",
        d3
          .forceLink(simLinks)
          .id((d: any) => d.id)
          .distance(110)
          .strength(0.28),
      )
      .force("charge", d3.forceManyBody().strength(-260))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(24));

    // Use paths (quadratic bezier) so parallel/overlapping links can be curved and spread out
    const linkSelection = linkLayer
      .selectAll("path")
      .data(simLinks)
      .join("path")
      .attr("fill", "none")
      .attr("stroke", (edge: any) => (edge.active ? "rgba(0,212,255,0.55)" : "rgba(255,255,255,0.13)"))
      .attr("stroke-width", (edge: any) => (edge.active ? 2 : 1.2))
      .attr("stroke-linecap", "round");

    const pulseSelection = pulseLayer
      .selectAll("circle")
      .data(simLinks.filter((edge) => pulseSet.has(`${edge.source}->${edge.target}`)))
      .join("circle")
      .attr("r", 4)
      .attr("fill", "#00d4ff")
      .attr("opacity", 0.95)
      .style("filter", "drop-shadow(0 0 6px #00d4ff)");

    const nodeGroup = nodeLayer
      .selectAll("g")
      .data(simNodes)
      .join("g")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, any>()
          .on("start", (event, d) => {
            if (!event.active) {
              simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) {
              simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
          }),
      )
      .on("click", (_, node: CacheNode) => onSelectNode?.(node.id));

    nodeGroup
      .append("circle")
      .attr("r", 14)
      .attr("fill", (node) => `${STATUS_COLORS[node.status]}20`)
      .attr("stroke", (node) => STATUS_COLORS[node.status])
      .attr("stroke-width", (node) => (node.id === selectedNodeId ? 4 : 2))
      .style("filter", (node) => `drop-shadow(0 0 8px ${STATUS_COLORS[node.status]})`)
      .attr("opacity", (node) => (node.status === "DEAD" ? 0.45 : 1));

    nodeGroup
      .append("text")
      .text((node) => node.id.replace("node-", "N"))
      .attr("fill", "#e2e8f0")
      .attr("font-size", 9)
      .attr("text-anchor", "middle")
      .attr("dy", 3)
      .attr("font-family", "'Space Mono', monospace")
      .attr("opacity", (node) => (node.status === "DEAD" ? 0.5 : 1));

    nodeGroup
      .append("title")
      .text((node) => `status=${node.status} heartbeat=${node.heartbeat} inc=${node.incarnation}`);

    // helper: compute quadratic bezier path and midpoint
    const quadPath = (x1: number, y1: number, x2: number, y2: number, offset: number) => {
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      // perpendicular vector
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const ux = -dy / len;
      const uy = dx / len;
      const cx = mx + ux * offset;
      const cy = my + uy * offset;
      return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, cx, cy };
    };

    simulation.on("tick", () => {
      linkSelection.each(function (edge: any) {
        const pathEl = d3.select(this as SVGPathElement);
        const { x: x1, y: y1 } = edge.source as any;
        const { x: x2, y: y2 } = edge.target as any;
        const off = edge._offset ?? 0;
        const p = quadPath(x1, y1, x2, y2, off);
        pathEl.attr("d", p.d);
      });

      pulseSelection.each(function (edge: any) {
        const { x: x1, y: y1 } = edge.source as any;
        const { x: x2, y: y2 } = edge.target as any;
        const off = edge._offset ?? 0;
        // midpoint on quadratic bezier (t=0.5)
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = -dy / len;
        const uy = dx / len;
        const cx = mx + ux * off;
        const cy = my + uy * off;
        // quadratic bezier point at t=0.5
        const t = 0.5;
        const bx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
        const by = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
        d3.select(this as SVGCircleElement).attr("cx", bx).attr("cy", by);
      });

      nodeGroup.attr("transform", (node: any) => `translate(${node.x},${node.y})`);
    });

    pulseSelection
      .transition()
      .duration(420)
      .attr("r", 13)
      .attr("opacity", 0)
      .remove();

    return () => {
      simulation.stop();
    };
  }, [links, nodes, onSelectNode, pulseSet, selectedNodeId]);

  return (
    <div className="glass rounded-xl p-3" style={{ minHeight: 360 }}>
      <div className="font-section text-xs mb-2" style={{ color: "var(--ef-cyan)" }}>
        CLUSTER GRAPH (D3 FORCE)
      </div>
      <svg ref={svgRef} viewBox="0 0 520 320" className="w-full h-[320px] rounded-lg" />
      <div className="mt-2 flex gap-3 font-section text-xs" style={{ color: "var(--ef-gray)" }}>
        <span>ALIVE: #10b981</span>
        <span>SUSPECT: #f59e0b</span>
        <span>DEAD: #ef4444</span>
      </div>
    </div>
  );
}
