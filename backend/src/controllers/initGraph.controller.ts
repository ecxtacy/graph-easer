import { Request, Response } from "express";
import {
  InitGraphDataSchema,
  InitGraphInterface,
} from "../interfaces/InitGraphData";
import { generateGraph } from "../lib/graph/initGraph";

export const initGraph = (req: Request, res: Response) => {
  const requestData: InitGraphInterface = req.body as InitGraphInterface;
  const { success, data } = InitGraphDataSchema.safeParse(requestData);

  if (!success) {
    // todo: make this modular and clean
    res.status(400).json("Bad Data sent");
    return;
  }

  const adjList = generateGraph(data);

  res.status(200).json({
    adjList,
  });
};
export { generateGraph };

export function getRandInt(arg0: number) {
  throw new Error("Function not implemented.");
}
