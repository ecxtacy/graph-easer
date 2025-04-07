import { Queue } from "../data_structures/queue";
import { DisplayEdge } from "./displayEdge";

interface BfsStatus {
  endNodeFound: boolean;
}

export const bfs = (
  adjList: number[][],
  startNode: number,
  endNode: number
) => {
  let N = adjList.length;
  const queue = new Queue();
  let visited: boolean[] = new Array(N).fill(false);
  let displayEdgeArray: DisplayEdge[] = [];
  let parent: number[] = new Array(N).fill(0);

  // todo : BfsStatus and DfsStatus is same. Make a common interface for checking if the endNode is found or not
  let bfsStatus: BfsStatus = {
    endNodeFound: false,
  };

  bfs_implement(
    adjList,
    startNode,
    endNode,
    queue,
    visited,
    parent,
    displayEdgeArray,
    bfsStatus
  );

  console.log(bfsStatus.endNodeFound ? "End Node Found" : "Not Found");

  if (!bfsStatus.endNodeFound) {
    return [];
  } else return displayEdgeArray;
};

const bfs_implement = (
  adjList: number[][],
  startNode: number,
  endNode: number,
  queue: Queue,
  visited: boolean[],
  parent: number[],
  displayEdgeArray: DisplayEdge[],
  bfsStatus: BfsStatus
) => {
  if (startNode === endNode) {
    bfsStatus.endNodeFound = true;
    return;
  }
  queue.push(startNode);

  visited[startNode] = true;
  while (!queue.empty()) {
    let size = queue.size();

    for (let i = 0; i < size; i++) {
      let currNode = queue.front();
      queue.pop();

      // todo : currNode should be number always
      if (typeof currNode === "number") {
        for (let child of adjList[currNode]) {
          if (!visited[child]) {
            visited[child] = true;
            parent[child] = currNode;
            displayEdgeArray.push(new DisplayEdge(true, currNode, child));
            if (child === endNode) {
              bfsStatus.endNodeFound = true;
              return;
            }
            queue.push(child);
          }
        }
      }
    }
  }
};
