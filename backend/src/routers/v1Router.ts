import express from "express";
import { initGraph } from "../controllers/initGraph.controller";

const v1Router = express.Router();

v1Router.post("/init", initGraph);
v1Router.post("/dfs", () => {});
v1Router.post("/bfs", () => {});

export default v1Router;
