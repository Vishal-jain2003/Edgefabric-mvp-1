import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CanvasProps {
  sectionIndex: number;
  mousePos: { x: number; y: number };
}

const SECTION_CONFIGS: Record<number, {
  speed: number;
  burstFactor: number;
  failedNodes: number[];
  allGreen?: boolean;
  hexCluster?: boolean;
}> = {
  0:  { speed: 2.0, burstFactor: 1.0, failedNodes: [] },
  1:  { speed: 1.2, burstFactor: 1.0, failedNodes: [] },
  2:  { speed: 3.0, burstFactor: 3.0, failedNodes: [] },  // scale shock
  3:  { speed: 1.8, burstFactor: 1.2, failedNodes: [] },  // why it breaks
  4:  { speed: 2.5, burstFactor: 4.0, failedNodes: [] },  // netflix
  5:  { speed: 1.5, burstFactor: 1.5, failedNodes: [] },
  6:  { speed: 1.0, burstFactor: 1.0, failedNodes: [] },
  7:  { speed: 1.2, burstFactor: 1.0, failedNodes: [] },
  8:  { speed: 1.5, burstFactor: 1.2, failedNodes: [] },  // edgefabric pivot
  9:  { speed: 1.2, burstFactor: 1.0, failedNodes: [] },  // architecture
  10: { speed: 1.0, burstFactor: 1.0, failedNodes: [] },  // consistent hashing
  11: { speed: 1.0, burstFactor: 1.0, failedNodes: [3, 7, 12, 15, 19, 22, 27, 30, 35, 40, 44, 48, 51, 56, 60, 63, 68, 72, 77, 81] }, // gossip/challenges
  12: { speed: 1.0, burstFactor: 1.0, failedNodes: [5, 18, 33, 47, 62] },  // WAL
  13: { speed: 1.2, burstFactor: 1.0, failedNodes: [] },
  14: { speed: 1.2, burstFactor: 1.0, failedNodes: [] },  // challenges
  15: { speed: 1.0, burstFactor: 1.0, failedNodes: [] },  // MCP
  16: { speed: 0.8, burstFactor: 1.0, failedNodes: [] },  // observability
  17: { speed: 0.5, burstFactor: 1.0, failedNodes: [], allGreen: true }, // closing
};

const NODE_COUNT = 200;
const PACKET_COUNT = 50;

function Scene({ sectionIndex, mouse }: { sectionIndex: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const nodeCount = isMobile ? 80 : NODE_COUNT;

  const nodesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const packetsRef = useRef<THREE.Points>(null);

  const cfg = SECTION_CONFIGS[sectionIndex] ?? { speed: 1, burstFactor: 1, failedNodes: [] };
  const cfgRef = useRef(cfg);
  useEffect(() => { cfgRef.current = SECTION_CONFIGS[sectionIndex] ?? { speed: 1, burstFactor: 1, failedNodes: [] }; }, [sectionIndex]);

  // ── Generate node positions ───────────────────────────────────────────
  const { nodePositions, nodeColors, nodeTypes } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const colors    = new Float32Array(nodeCount * 3);
    const types     = new Uint8Array(nodeCount); // 0=cache(cyan), 1=app(violet), 2=db(green)

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const roll = Math.random();
      if (roll < 0.75) {
        types[i] = 0; // cyan cache nodes
        colors[i*3] = 0.0; colors[i*3+1] = 0.83; colors[i*3+2] = 1.0;
      } else if (roll < 0.90) {
        types[i] = 1; // violet app servers
        colors[i*3] = 0.49; colors[i*3+1] = 0.23; colors[i*3+2] = 0.93;
      } else {
        types[i] = 2; // green db nodes
        colors[i*3] = 0.06; colors[i*3+1] = 0.73; colors[i*3+2] = 0.51;
      }
    }
    return { nodePositions: positions, nodeColors: colors, nodeTypes: types };
  }, [nodeCount]);

  // ── Generate edges ────────────────────────────────────────────────────
  const { linePositions, lineIndices } = useMemo(() => {
    if (isMobile) return { linePositions: new Float32Array(0), lineIndices: [] as [number,number][] };
    const lines: number[] = [];
    const indices: [number,number][] = [];
    const threshold = 5;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodePositions[i*3]   - nodePositions[j*3];
        const dy = nodePositions[i*3+1] - nodePositions[j*3+1];
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < threshold) {
          lines.push(
            nodePositions[i*3], nodePositions[i*3+1], nodePositions[i*3+2],
            nodePositions[j*3], nodePositions[j*3+1], nodePositions[j*3+2]
          );
          indices.push([i, j]);
        }
      }
    }
    return { linePositions: new Float32Array(lines), lineIndices: indices };
  }, [nodePositions, nodeCount, isMobile]);

  // ── Packet animation state ────────────────────────────────────────────
  const packetState = useMemo(() => {
    const positions = new Float32Array(PACKET_COUNT * 3);
    const edges = lineIndices.length > 0 ? lineIndices : [[0,1]] as [number,number][];
    const states = Array.from({ length: PACKET_COUNT }, () => ({
      edgeIdx: Math.floor(Math.random() * edges.length),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.006,
    }));
    return { positions, states, edges };
  }, [lineIndices]);

  const velRef = useMemo(() => {
    const v = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      v[i*3]   = (Math.random() - 0.5) * 0.012;
      v[i*3+1] = (Math.random() - 0.5) * 0.008;
      v[i*3+2] = (Math.random() - 0.5) * 0.005;
    }
    return v;
  }, [nodeCount]);

  const colorAttrRef = useRef<THREE.BufferAttribute | null>(null);

  useFrame((state) => {
    const conf = cfgRef.current;
    const speed = conf.speed;
    const burst = conf.burstFactor;
    const mx = mouse.current.x * 0.25;
    const my = mouse.current.y * 0.25;

    // ── Update node positions ─────────────────────────────────────────
    if (nodesRef.current) {
      const pos = nodesRef.current.geometry.attributes.position.array as Float32Array;
      const col = nodesRef.current.geometry.attributes.color.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const isFailed = conf.failedNodes.includes(i);
        const factor = isFailed ? 0.1 : speed;

        pos[i*3]   += velRef[i*3]   * factor;
        pos[i*3+1] += velRef[i*3+1] * factor;
        pos[i*3+2] += velRef[i*3+2] * factor * 0.5;

        // Parallax
        pos[i*3]   += mx * 0.0008;
        pos[i*3+1] += my * 0.0008;

        // Wrap
        if (pos[i*3]   >  12) pos[i*3]   = -12;
        if (pos[i*3]   < -12) pos[i*3]   =  12;
        if (pos[i*3+1] >   7) pos[i*3+1] =  -7;
        if (pos[i*3+1] <  -7) pos[i*3+1] =   7;

        // Color override for failed / allGreen
        if (conf.allGreen) {
          col[i*3] = 0.06; col[i*3+1] = 0.73; col[i*3+2] = 0.51;
        } else if (isFailed) {
          const flicker = Math.sin(state.clock.elapsedTime * 8 + i) > 0 ? 0.15 : 0.05;
          col[i*3] = 0.94 * flicker; col[i*3+1] = 0.27 * flicker; col[i*3+2] = 0.27 * flicker;
        } else {
          col[i*3]   = nodeColors[i*3];
          col[i*3+1] = nodeColors[i*3+1];
          col[i*3+2] = nodeColors[i*3+2];
        }
      }
      nodesRef.current.geometry.attributes.position.needsUpdate = true;
      nodesRef.current.geometry.attributes.color.needsUpdate = true;
    }

    // ── Update packets ────────────────────────────────────────────────
    if (packetsRef.current && packetState.edges.length > 0) {
      const pos = nodesRef.current?.geometry.attributes.position.array as Float32Array;
      const ppos = packetsRef.current.geometry.attributes.position.array as Float32Array;

      for (let p = 0; p < PACKET_COUNT; p++) {
        const st = packetState.states[p];
        st.progress += st.speed * speed * burst;
        if (st.progress >= 1) {
          st.progress = 0;
          st.edgeIdx = Math.floor(Math.random() * packetState.edges.length);
        }
        const edge = packetState.edges[st.edgeIdx];
        const a = edge[0], b = edge[1];
        if (!pos) continue;
        const t = st.progress;
        ppos[p*3]   = pos[a*3]   + (pos[b*3]   - pos[a*3])   * t;
        ppos[p*3+1] = pos[a*3+1] + (pos[b*3+1] - pos[a*3+1]) * t;
        ppos[p*3+2] = pos[a*3+2] + (pos[b*3+2] - pos[a*3+2]) * t;
      }
      packetsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={nodePositions.slice()} count={nodeCount} itemSize={3} />
          <bufferAttribute attach="attributes-color"    array={nodeColors.slice()}    count={nodeCount} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.12} vertexColors transparent opacity={0.85} sizeAttenuation />
      </points>

      {/* Edges */}
      {!isMobile && linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={linePositions} count={linePositions.length / 3} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color="#00D4FF" transparent opacity={0.12} />
        </lineSegments>
      )}

      {/* Data packets */}
      {!isMobile && (
        <points ref={packetsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={packetState.positions} count={PACKET_COUNT} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color="#00D4FF" size={0.07} transparent opacity={0.95} sizeAttenuation />
        </points>
      )}
    </group>
  );
}

export function CinematicCanvas({ sectionIndex, mousePos }: CanvasProps) {
  const mouseRef = useRef(mousePos);
  useEffect(() => { mouseRef.current = mousePos; }, [mousePos]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: "var(--ef-bg)" }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 60 }} style={{ width: "100%", height: "100%" }} dpr={[1, 1.5]}>
        <Scene sectionIndex={sectionIndex} mouse={mouseRef} />
      </Canvas>
    </div>
  );
}
