# ♞ Knight's Travails - Graph Algorithms & Problem Solving

A complete implementation of the Knight's Travails problem using Breadth-First Search (BFS) to find the shortest path for a knight on a chessboard. This project demonstrates graph theory concepts, pathfinding algorithms, and algorithmic problem-solving.

## Learning Objectives

This project was specifically designed to demonstrate and practice:

- **Graph Theory** - Modeling chessboard positions as graph nodes
- **Breadth-First Search (BFS)** - Finding shortest paths in unweighted graphs
- **Path Reconstruction** - Tracking and rebuilding paths from BFS
- **Algorithmic Problem Solving** - Breaking down complex problems
- **Data Structure Integration** - Using queues for traversal
- **Real-time Visualization** - Showing algorithm results interactively

## Live Demo

[View Live Demo](https://leandroesposito.github.io/top-knight-travails/)

## Project Overview

**The Problem:** Find the shortest sequence of moves for a knight to travel from one square to another on a standard 8×8 chessboard.

**The Solution:** Model the board as a graph where:

- Each square is a vertex
- Each legal knight move is an edge
- BFS finds the shortest path

## Project Architecture

```
knights-travails/
├── Node.js                   # Linked list node
├── LinkedList.js             # Queue implementation for BFS
├── knightMoves.js            # Core BFS algorithm
├── script.js                 # UI and event handling
├── index.html                # Web interface
├── style.css                 # Chessboard styling
└── README.md                 # Documentation
```

## Problem Modeling as a Graph

### Chessboard Graph Representation

```javascript
// Each square is a node in the graph
const square = [x, y]; // where x,y range from 0-7

// Knight moves are edges (8 possible moves)
const knightMoves = [
  [-2, -1],
  [-2, 1], // Two up, left/right
  [-1, -2],
  [-1, 2], // One up, two left/right
  [1, -2],
  [1, 2], // One down, two left/right
  [2, -1],
  [2, 1], // Two down, left/right
];
```

### Graph Visualization

```
Board as Graph (simplified 4x4):
(0,0) --- (0,1) --- (0,2) --- (0,3)
  |         |         |         |
(1,0) --- (1,1) --- (1,2) --- (1,3)
  |         |         |         |
(2,0) --- (2,1) --- (2,2) --- (2,3)
  |         |         |         |
(3,0) --- (3,1) --- (3,2) --- (3,3)

Knight Connections (from position (1,1)):
    (1,1) connects to:
    (-1,0), (-1,2), (0,-1), (0,3), (2,-1), (2,3), (3,0), (3,2)
    (filtered to stay within 0-7)
```

## Knight Movement Rules

### All Possible Knight Moves

```javascript
// Knight moves in an "L" shape: 2 in one direction, 1 perpendicular
const moves = [
  // Two steps up/down, one step left/right
  [-2, -1],
  [-2, 1], // Up 2, Left/Right 1
  [2, -1],
  [2, 1], // Down 2, Left/Right 1

  // One step up/down, two steps left/right
  [-1, -2],
  [-1, 2], // Up 1, Left/Right 2
  [1, -2],
  [1, 2], // Down 1, Left/Right 2
];
```

### Movement Visualization

```
Knight at (3,3) possible moves:

    0   1   2   3   4   5   6   7
0   .   .   .   .   .   .   .   .
1   .   .   o   .   o   .   .   .
2   .   o   .   .   .   o   .   .
3   .   .   .   ♘  .   .   .   .   ← (3,3) Knight
4   .   o   .   .   .   o   .   .
5   .   .   o   .   o   .   .   .
6   .   .   .   .   .   .   .   .
7   .   .   .   .   .   .   .   .

Legal moves from (3,3):
(1,2) ┐
(1,4) ├─ Two up, one left/right
(2,1) ┘
(2,5) ┐
(4,1) ├─ Two down, one left/right
(4,5) ┘
(5,2) ┐
(5,4) └─ One down, two left/right
```

## Breadth-First Search (BFS) Algorithm

### Why BFS for Shortest Path?

- **Unweighted Graph** - All moves cost the same (1 move)
- **BFS properties** - First time we reach a node is the shortest path
- **Level-order exploration** - Explores all positions at distance 1, then 2, etc.

### BFS Implementation

```javascript
export default function knightMoves(start, dest) {
  const visited = new Set(); // Track visited squares
  const queue = new LinkedList(); // Queue for BFS

  // Queue stores: {position, path to reach it}
  queue.append({
    pos: start,
    path: [],
  });

  while (queue.size() > 0) {
    const queueSize = queue.size();

    // Process all nodes at current distance level
    for (let i = 0; i < queueSize; i++) {
      let { pos, path } = queue.removeAt(0).value;

      // Validate position is on board
      if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
        continue;
      }

      // Skip if already visited
      const posStr = `${pos[0]},${pos[1]}`;
      if (visited.has(posStr)) continue;
      visited.add(posStr);

      // Update and check if reached destination
      path = [...path, pos];
      if (pos[0] === dest[0] && pos[1] === dest[1]) {
        return path; // Found shortest path!
      }

      // Enqueue all legal knight moves
      const [x, y] = pos;
      const moves = [
        [x - 1, y - 2],
        [x - 1, y + 2], // Up 1
        [x + 1, y - 2],
        [x + 1, y + 2], // Down 1
        [x - 2, y - 1],
        [x - 2, y + 1], // Up 2
        [x + 2, y - 1],
        [x + 2, y + 1], // Down 2
      ];

      moves.forEach((move) => {
        queue.append({ pos: move, path });
      });
    }
  }
  return [];
}
```

### BFS Visualization

```
Finding path from (0,0) to (7,7):

Level 0: Start at (0,0)
Distance 0: [(0,0)]

Level 1: All positions 1 move away
Distance 1: [(1,2), (2,1)]

Level 2: All positions 2 moves away
Distance 2: [(0,4), (1,0), (2,3), (3,2), (3,0), (4,1), (4,3), (2,5), ...]

Level 3: Continue until destination found
... eventually reaching (7,7)

BFS guarantees: First time we see (7,7) is the shortest path!
```

## Time & Space Complexity Analysis

### Time Complexity: O(n²) = O(64) = O(1)

```javascript
// The chessboard has fixed size (8x8 = 64 squares)
// Each square visited at most once
// Each square generates up to 8 moves

Total operations = 64 squares × (1 visit + 8 move checks) = 576 operations

Time Complexity = O(64) = O(1) constant time!
```

### Space Complexity: O(n²) = O(64) = O(1)

```javascript
// Storage for:
// - visited set: max 64 entries
// - queue: max 64 entries
// - path: max 64 moves

Space Complexity = O(64) = O(1) constant space!
```

**Key Insight:** Even though we analyze as O(n²) where n=8, the board size is fixed, making this algorithm run in constant time and space!

### Maximum Path Length

```
Worst case: Knight may need up to 6 moves to reach any square
Example: (0,0) to (1,1) takes 4 moves
        (0,0) to (0,1) takes 3 moves
        (0,0) to (7,7) takes 6 moves

Maximum path length = 6 moves (empirically proven)
```

## Algorithm Walkthrough

### Example: (0,0) to (7,7)

```javascript
knightMoves([0,0], [7,7]);

Step 1: Start at (0,0), path = []
Queue: [(0,0) path:[]]

Step 2: Process (0,0)
Enqueue: (1,2) path:[0,0], (2,1) path:[0,0]
Queue: [(1,2) path:[0,0], (2,1) path:[0,0]]

Step 3: Process (1,2)
Enqueue 8 moves from (1,2)
Queue: [(2,1) path:[0,0], (2,4) path:[0,0,1,2], ...]

Step 4: Continue until (7,7) reached
Return: [0,0, 1,2, 2,4, 4,5, 6,6, 7,7]  (6 moves)
```

## Graph Theory Concepts Applied

### 1. Graph Representation

```javascript
// Implicit graph (no adjacency list stored)
// Edges generated on-the-fly from knight move rules
function getNeighbors(position) {
  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  return moves
    .map((d) => [position[0] + d[0], position[1] + d[1]])
    .filter((p) => p[0] >= 0 && p[0] < 8 && p[1] >= 0 && p[1] < 8);
}
```

### 2. Visited Set Pattern

```javascript
const visited = new Set();
const posStr = `${pos[0]},${pos[1]}`;

if (!visited.has(posStr)) {
  visited.add(posStr);
  // Process node
}
```

**Why use Set?**

- O(1) lookup/insertion
- Prevents infinite loops
- Avoids reprocessing nodes

### 3. Path Reconstruction

```javascript
// Store entire path with each node
queue.append({
  pos: current,
  path: [...previousPath, current],
});

// When destination found, path is immediately available
if (pos === dest) return path;
```

**Alternative approach:** Store parent references

```javascript
const parents = new Map();
parents.set(posStr, parent);
// At end, walk back through parents
```

## UI Visualization

### Interactive Chessboard

```javascript
function drawMoves(path) {
  for (let i = 0; i < path.length; i++) {
    const square = document.querySelector(
      `[data-x="${path[i][0]}"][data-y="${path[i][1]}"]`,
    );

    // Animate each step
    setTimeout(() => {
      square.textContent = i; // Show move number
      if (i === 0) square.classList.add("start");
      if (i === path.length - 1) square.classList.add("dest");
    }, 200 * i); // 200ms delay between moves
  }
}
```

### Visual Features

- **Chessboard Grid** - 8×8 alternating colors
- **Start Position** - Knight icon placement
- **End Position** - Destination marker
- **Path Animation** - Sequential move display
- **Move Numbers** - Shows order of moves

## BFS vs DFS for This Problem

| Aspect                   | BFS (Used)       | DFS              |
| ------------------------ | ---------------- | ---------------- |
| **Finds shortest path?** | ✅ Yes           | ❌ No            |
| **Space complexity**     | O(width) = O(64) | O(depth) = O(64) |
| **Time complexity**      | O(V+E) = O(64)   | O(V+E) = O(64)   |
| **Implementation**       | Queue-based      | Stack-based      |
| **Best for**             | Shortest path    | Finding any path |

**Why BFS wins:** Guarantees shortest path in unweighted graphs

## Problem-Solving Approach

### Step 1: Understand the Problem

- Knight moves in "L" shape
- Find minimum number of moves
- Output the path sequence

### Step 2: Model the Problem

- Chessboard = Graph vertices
- Legal moves = Graph edges
- Pathfinding = Graph traversal problem

### Step 3: Choose Algorithm

- Need shortest path
- Unweighted graph
- BFS is perfect fit!

### Step 4: Implement Solution

- Queue for BFS
- Visited set for tracking
- Path storage for reconstruction

### Step 5: Optimize

- Board bounds checking
- Early exit on destination
- Efficient data structures

## Key Takeaways

### Algorithmic Insights

- **Graph problems often hide in plain sight** - Chess moves, social networks, web links
- **BFS is optimal for unweighted shortest path** - First time you see a node is the shortest
- **Queue data structure is essential** - FIFO property gives level-order traversal
- **Visited set prevents cycles** - Essential for finite graph traversal

### Problem-Solving Template

```
1. Identify vertices (positions)
2. Identify edges (valid moves)
3. Choose traversal (BFS for shortest)
4. Track visited nodes
5. Reconstruct path
6. Return result
```

### Real-World Applications

- **GPS Navigation** - Shortest path in road networks
- **Social Networks** - Degrees of separation
- **Puzzle Solving** - Rubik's cube, 15-puzzle
- **Network Routing** - Fewest hops between routers
