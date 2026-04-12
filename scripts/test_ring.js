// Quick repro of ConsistentHashRing logic in plain Node
function hashFn(key) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function buildRing(nodes, virtualCount) {
  const ring = new Map();
  for (const node of nodes) {
    for (let i = 0; i < virtualCount; i++) {
      const h = hashFn(`${node}#${i}`);
      ring.set(h, node);
    }
  }
  return ring;
}

function getNodes(ringMap, key, count) {
  const keyHash = hashFn(key);
  const sorted = [...ringMap.keys()].sort((a,b)=>a-b);
  if (sorted.length === 0 || count <= 0) return [];
  const seen = new Set();
  const result = [];
  let startIdx = sorted.findIndex(h => h >= keyHash);
  if (startIdx === -1) startIdx = 0;
  for (let i = 0; i < sorted.length && result.length < count; i++) {
    const idx = (startIdx + i) % sorted.length;
    const owner = ringMap.get(sorted[idx]);
    if (!owner) continue;
    if (!seen.has(owner)) {
      seen.add(owner);
      result.push(owner);
    }
  }
  return result;
}

const nodes = ['node-1','node-2','node-3','node-4'];
const ring = buildRing(nodes, 60);
const key = 'user:1232567';
console.log('keyHash = 0x' + hashFn(key).toString(16));
console.log('owners:', getNodes(ring, key, 2));

// Also print the first few virtual nodes around the key position for inspection
const keyHash = hashFn(key);
const sorted = [...ring.keys()].sort((a,b)=>a-b);
let startIdx = sorted.findIndex(h => h >= keyHash);
if (startIdx === -1) startIdx = 0;
console.log('\nNearby virtual nodes:');
for (let i=0;i<12;i++){
  const idx = (startIdx + i) % sorted.length;
  console.log(i, 'hash=0x'+sorted[idx].toString(16), 'owner='+ring.get(sorted[idx]));
}
