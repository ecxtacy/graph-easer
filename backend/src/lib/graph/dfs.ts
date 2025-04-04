import { DisplayEdge } from "./displayEdge";

interface DfsStatus {
  endNodeFound: boolean;
}

export const dfs = (
  adjList: number[][],
  startNode: number,
  endNode: number
) => {
  let N = adjList.length;
  let visited: boolean[] = new Array(N).fill(false);
  let displayEdgeArray: DisplayEdge[] = [];
  let dfsStatus: DfsStatus = {
    endNodeFound: false,
  };

  dfs_recurse(
    adjList,
    startNode,
    visited,
    endNode,
    dfsStatus,
    displayEdgeArray
  );

  console.log(dfsStatus.endNodeFound ? "End node found" : "Not found");

  if (dfsStatus.endNodeFound === false) {
    return [];
  } else {
    return displayEdgeArray;
  }
};

const dfs_recurse = (
  adjList: number[][],
  node: number,
  visited: boolean[],
  endNode: number,
  dfsStatus: DfsStatus,
  displayEdgeArray: DisplayEdge[]
) => {
  visited[node] = true;

  console.log("called on", node);

  if (node === endNode) {
    dfsStatus.endNodeFound = true;
    return;
  }

  for (let child of adjList[node]) {
    if (!visited[child]) {
      displayEdgeArray.push(new DisplayEdge(true, node, child));
      dfs_recurse(
        adjList,
        child,
        visited,
        endNode,
        dfsStatus,
        displayEdgeArray
      );
      if (dfsStatus.endNodeFound) return;
      displayEdgeArray.push(new DisplayEdge(false, node, child));
    }
  }
};
