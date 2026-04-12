const PHYSICAL_NODES = ['node-1','node-2','node-3','node-4'];
function hashFn(key) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}
function computeReplicasForKey(key, replicationFactor) {
  const keyHash = hashFn(key);
  const keyPos = keyHash / 0xffffffff;
  const nodePositions = {};
  for (let i = 0; i < PHYSICAL_NODES.length; i++) nodePositions[PHYSICAL_NODES[i]] = i / PHYSICAL_NODES.length;
  let start = PHYSICAL_NODES.findIndex((id) => nodePositions[id] >= keyPos);
  if (start === -1) start = 0;
  const replicas = [];
  for (let i = 0; i < replicationFactor; i++) replicas.push(PHYSICAL_NODES[(start + i) % PHYSICAL_NODES.length]);
  return { keyHash: '0x' + keyHash.toString(16), keyPos, replicas };
}
console.log(computeReplicasForKey('user:1232567', 2));
console.log(computeReplicasForKey('user:123', 3));
