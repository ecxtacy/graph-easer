import { Request, Response } from "express";
import {
  InitGraphDataSchema,
  InitGraphInterface,
} from "../interfaces/InitGraphData";
import { generateGraph } from "../lib/graph/initGraph";
import { StatusCodes, StatusMessage } from "../utils/statusCodes";

export const initGraph = (req: Request, res: Response) => {
  const requestData: InitGraphInterface = req.body as InitGraphInterface;
  const { success, data } = InitGraphDataSchema.safeParse(requestData);

  if (!success) {
    // todo: make this modular and clean
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: StatusMessage[StatusCodes.BAD_REQUEST],
    });
    return;
  }

  const adjList = generateGraph(data);

  res.status(StatusCodes.SUCCESS).json({
    success: true,
    message: StatusMessage[StatusCodes.SUCCESS],
    adjList,
  });
};
export { generateGraph };

export function getRandInt(arg0: number) {
  throw new Error("Function not implemented.");
}
