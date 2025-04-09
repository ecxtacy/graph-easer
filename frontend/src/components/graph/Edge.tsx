import { NodePoint } from '@/interfaces/NodePoint'
import React from 'react'
import { Line } from 'react-konva'

interface EdgePropsInterface {
  a: NodePoint,
  b: NodePoint,
};

const Edge: React.FC<EdgePropsInterface> = ({ a, b }) => {

  const coordinates = [a.x, a.y, b.x, b.y];
  console.log(coordinates)
  console.log('first')
  return (
    <Line
      points={coordinates} // the coordinates for the line
      stroke="black"       // line color
      strokeWidth={2}
    />
  )
}

export default Edge