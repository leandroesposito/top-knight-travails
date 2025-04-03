import LinkedList from "./LinkedList.js";

export default function knightMoves(start, dest) {
  const visited = new Set();
  const queue = new LinkedList();
  queue.append({
    pos: start,
    path: [],
  });

  // BFS path search
  while (queue.size() > 0) {
    const queueSize = queue.size();

    // process current iteration
    for (let i = 0; i < queueSize; i++) {
      let { pos, path } = queue.removeAt(0).value;

      // validate position
      if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
        continue;
      }

      // visit position
      const posStr = `${pos[0]},${pos[1]}`;
      if (visited.has(posStr)) {
        continue;
      }
      visited.add(posStr);

      // update path
      path = [...path, pos];
      if (pos[0] == dest[0] && pos[1] == dest[1]) {
        return path;
      }

      // append reachable position to exploration queue
      const [x, y] = pos;
      queue.append({ pos: [x - 1, y - 2], path });
      queue.append({ pos: [x - 1, y + 2], path });
      queue.append({ pos: [x + 1, y - 2], path });
      queue.append({ pos: [x + 1, y + 2], path });
      queue.append({ pos: [x - 2, y + 1], path });
      queue.append({ pos: [x - 2, y - 1], path });
      queue.append({ pos: [x + 2, y + 1], path });
      queue.append({ pos: [x + 2, y - 1], path });
    }
  }
  return [];
}
