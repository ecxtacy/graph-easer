import { edgeListAtom } from "@/atoms/graph";
import { NodePoint } from "@/interfaces/NodePoint";
import { useAtom } from "jotai";

export const generateEdgeList = (adjList: number[][]) => {
  let edgeList: Set<string> = new Set();
  for (let i = 0; i < adjList.length; i++) {
    for (let neighbor of adjList[i]) {
      let a = Math.min(i, neighbor);
      let b = Math.max(i, neighbor);
      edgeList.add(`${a}-${b}`);
    }
  }
  return edgeList;
};

// ! Pass the width as an integer.
export const getNodeCoordinates = (
  width: number,
  height: number,
  nodeCount: number,
  edgeList: Set<string>
) => {
  if (width === 0 || height === 0) return null;

  let coords: NodePoint[] = [];

  const X_BORDER_GAP = 40;
  const Y_BORDER_GAP = 40;
  const MIN_EDGE_NODE_PROXIMITY = 70;
  const MIN_NODES_PROXIMITY = 60;

  // TODO: Call this on each edge inside the edge list.
  function pointNearEdge(A: NodePoint, B: NodePoint, P: NodePoint) {
    // Calculate A, B, C for the line equation Ax + By + C = 0
    const a = B.y - A.y;
    const b = A.x - B.x;
    const c = B.x * A.y - A.x * B.y;

    // Calculate the perpendicular distance from point P(x3, y3) to the line
    const distance = Math.abs(a * P.x + b * P.y + c) / Math.sqrt(a * a + b * b);

    return distance < MIN_EDGE_NODE_PROXIMITY;
  }

  function goodPointPosition(x: number, y: number) {
    let valid = true;

    if (
      !(
        x > X_BORDER_GAP &&
        width - x > X_BORDER_GAP &&
        y > Y_BORDER_GAP &&
        height - y > Y_BORDER_GAP
      )
    ) {
      return (valid = false);
    }

    for (let node of coords) {
      if (
        Math.sqrt((x - node.x) * (x - node.x) + (y - node.y) * (y - node.y)) <
        MIN_NODES_PROXIMITY
      ) {
        return (valid = false);
      }
    }

    if (!edgeList) {
      return [];
    }

    for (let edge of edgeList) {
      let [node1, node2] = edge.split("-").map((val) => parseInt(val));

      if (node1 < coords.length && node2 < coords.length) {
        if (pointNearEdge(coords[node1], coords[node2], { x, y })) {
          return (valid = false);
        }
      }
    }
    // todo: Use the edge list here.
    // for (let i = 0; i < coords.length; i++) {
    //   for (let j = i + 1; j < coords.length; j++) {
    //     if (pointNearEdge(coords[i], coords[j], { x, y })) {
    //       return (valid = false);
    //     }
    //   }
    // }

    return valid;
  }

  for (let i = 0; i < nodeCount; i++) {
    let nx = Math.round(Math.random() * 10000000) % width;
    let ny = Math.round(Math.random() * 10000000) % height;

    let maxIterations = 100;

    while (!goodPointPosition(nx, ny)) {
      if (maxIterations <= 0) break;
      nx = Math.round(Math.random() * 10000000) % width;
      ny = Math.round(Math.random() * 10000000) % height;
      maxIterations--;
    }

    coords.push({ x: nx, y: ny });
  }

  return coords;
};
