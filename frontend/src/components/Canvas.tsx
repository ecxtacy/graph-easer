"use client";

import { useEffect, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const Canvas = () => {
  const stageRef = useRef(null);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
      <Layer>
        {/* <Rect
          x={20}
          y={20}
          width={100}
          height={100}
          fill="green"
          draggable
        /> */}
      </Layer>
    </Stage>
  );
};

export default Canvas;
