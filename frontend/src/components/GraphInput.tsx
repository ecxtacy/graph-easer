"use client";
import { adjListAtom, edgeListAtom } from '@/atoms/graph';
import { InitGraphInterface } from '@/interfaces/InitGraphData';
import API from '@/lib/api';
import { generateEdgeList } from '@/lib/graphRenderer';
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react'

interface ErrorStateInterface {
  message: string | null;
};

const GraphInput = () => {

  const formRef = useRef<HTMLFormElement>(null);

  const [adjList, setAdjList] = useAtom(adjListAtom);
  const [, setEdgeList] = useAtom(edgeListAtom);
  const [error, setError] = useState<ErrorStateInterface>({
    message: null,
  });

  useEffect(() => {
    if(adjList !== null) {
      const edgeList = generateEdgeList(adjList);
      setEdgeList(edgeList);
      console.log("EDGE LIST:")
      console.log(edgeList)
    }
  }, [adjList])

  const handleGraphGeneration = async () => {
    const form = formRef.current;
    if(form === null) {
      setError({
        message: "Unable to load form, please refresh"
      });
      return;
    }

    const nodeCount = form.nodeCount.value;

    
    if(Number.isInteger(Number(nodeCount))) {
      setError({ message: null });
      // todo: send api request to server.
      const data: InitGraphInterface = {
        nodes: Number(nodeCount),
        sparseness: 25,
      }
      const resp = await fetch(API.initGraph, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      const respData = await resp.json();

      const adjacencyList = respData.adjList;
      setAdjList(adjacencyList);
    } else {
      setError({
        message: "Kindly enter a number."
      })
    }

  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <form className='flex justify-center items-center gap-6' ref={formRef}>
        <input name='nodeCount' className='w-32 bg-white text-slate-800 border rounded-lg px-3 py-1' placeholder='Nodes'></input>
        <button type='button' className='px-3 py-2 rounded-xl hover:bg-purple-800 bg-purple-700 text-white' onClick={handleGraphGeneration}>Generate graph</button>
      </form>
      {error.message !== null && <p className='text-red-500 text-sm'>{error.message}</p>}
    </div>
  )
}

export default GraphInput;