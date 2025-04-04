import { InitGraphInterface } from "../../interfaces/InitGraphData";
import { Queue } from "../data_structures/queue";

// returns a random number between [1, n]
export const getRandInt = (n: number) => {
  return (Math.round(Math.random() * 100000000) % Math.round(n)) + 1;
};

const buildTree = (
  adjList: number[][],
  adjMatrix: number[][],
  eAvg: number,
  N: number
) => {
  if (eAvg === 0) {
    return 0;
  }

  const q = new Queue();
  q.push(0);

  let completedEdges = 0;

  let nextNode = 1;

  while (!q.empty() && nextNode < N) {
    const size = q.size();
    for (let i = 0; i < size; i++) {
      // todo: fix this
      const top = q.front() ?? -1;
      q.pop();

      let edgeCount = getRandInt(eAvg);
      completedEdges += edgeCount;

      while (edgeCount > 0 && nextNode < N) {
        adjList[top].push(nextNode);
        adjList[nextNode].push(top);

        adjMatrix[top][nextNode] = adjMatrix[nextNode][top] = 1;

        q.push(nextNode);

        nextNode++;
        edgeCount--;
      }
    }
  }

  return completedEdges;
};

export const generateGraph = (data: InitGraphInterface) => {
  const N = data.nodes;
  const E = Math.round((data.sparseness * N * (N - 1)) / 200);

  // nodes -> 0 to N-1
  const eAvg = Math.floor(E / N);

  const adjList: number[][] = new Array(N).fill(null).map(() => []);
  let adjMatrix = new Array(N).fill(null).map(() => new Array(N).fill(0));

  let completedEdges = buildTree(adjList, adjMatrix, eAvg, N);
  // todo: join the remaining edges
  let remainingEdges = Math.max(E - completedEdges, 0);
  while (remainingEdges > 0) {
    let x = getRandInt(N) - 1;
    let y = getRandInt(N) - 1;

    while (x === y || adjMatrix[x][y] === 1) {
      x = getRandInt(N) - 1;
      y = getRandInt(N) - 1;
    }

    adjMatrix[x][y] = adjMatrix[y][x] = 1;
    adjList[x].push(y);
    adjList[y].push(x);
    remainingEdges--;
  }

  printAdjList(adjList);
  return adjList;
};

export const printAdjList = (adjList: number[][]) => {
  let N = adjList.length;
  for (let i = 0; i < N; i++) {
    let str = "" + i + ": ";
    for (let child of adjList[i]) {
      str += "" + child + ", ";
    }

    console.log(str);
  }
};

const printAdjMatrix = (adjMatrix: number[][]) => {
  let N = adjMatrix.length;

  for (let i = 0; i < N; i++) {
    let str = "" + i + ": ";
    for (let j = 0; j < N; j++) {
      if (adjMatrix[i][j] === 1) {
        str += j + ", ";
      }
    }
    console.log(str);
  }
};
