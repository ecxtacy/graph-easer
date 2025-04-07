"use client";
import { InitGraphInterface } from '@/interfaces/InitGraphData';
import API from '@/lib/api';
import React, { useRef, useState } from 'react'

interface ErrorStateInterface {
  message: string | null;
};

const GraphInput = () => {

  const formRef = useRef<HTMLFormElement>(null);

  const [error, setError] = useState<ErrorStateInterface>({
    message: null,
  });

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
      console.log(respData);

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