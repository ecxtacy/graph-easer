"use client";

import { adjListAtom, edgeListAtom } from "@/atoms/graph";
import CONFIG from "@/config/config";
import { getNodeCoordinates } from "@/lib/graphRenderer";
import clsx from "clsx";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { Circle, Layer, Stage, Text } from "react-konva";
import Edge from "./graph/Edge";

const Canvas = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  const [canvasDetails, setCanvasDetails] = useState({ width: 0, height: 0 });
  const [adjList, setAdjList] = useAtom(adjListAtom);
  const [edgeList] = useAtom(edgeListAtom);

  useEffect(() => {
    if (stageRef.current) {
      console.log("CALLED");

      setCanvasDetails({
        width: Math.round(stageRef.current.offsetWidth),
        height: Math.round(stageRef.current.offsetHeight),
      });
    }
  }, [setCanvasDetails]);

  const nodeCoordinates =
    adjList && edgeList
      ? getNodeCoordinates(
          canvasDetails.width,
          canvasDetails.height,
          adjList.length,
          edgeList
        )
      : null;

  // ? DEBUG
  // nodeCoordinates?.push({x: 0, y: 0})
  // nodeCoordinates?.push({x: canvasDetails.width, y: canvasDetails.height})

  return (
    <div className="mx-auto w-5xl h-[32rem]" ref={stageRef}>
      <Stage
        className={clsx(`mx-auto mt-8 bg-amber-50 flex-grow rounded-xl`)}
        width={canvasDetails.width}
        height={canvasDetails.height}
      >
        <Layer>
          {edgeList &&
            nodeCoordinates &&
            Array.from(edgeList).map((edge, idx) => {
              let [node1, node2] = edge.split("-").map((val) => parseInt(val));
              console.log(node1, node2);
              return (
                <Edge a={nodeCoordinates[node1]} b={nodeCoordinates[node2]} />
              );
            })}
        </Layer>

        <Layer>
          {edgeList &&
            nodeCoordinates &&
            nodeCoordinates.map((point, index) => {
              console.log(point);
              return (
                <React.Fragment key={index}>
                  <Circle
                    key={index}
                    x={point.x}
                    y={point.y}
                    radius={10}
                    fill="red"
                  />
                  {CONFIG.DEBUG_MODE === "development" && (
                    <Text
                      text={index.toString()}
                      fontSize={20}
                      fontFamily="Arial"
                      fill="black"
                      x={point.x - 30}
                      y={point.y - 30}
                      width={60}
                      height={20}
                      align="center"
                      verticalAlign="middle"
                    />
                  )}
                </React.Fragment>
              );
            })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
