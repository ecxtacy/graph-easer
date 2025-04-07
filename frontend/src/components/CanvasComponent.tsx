"use client";


import dynamic from "next/dynamic";

export const CanvasComponent = dynamic(() => import("./Canvas"), {
  ssr: false,
});