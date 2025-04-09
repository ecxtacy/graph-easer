import { CanvasComponent } from "@/components/CanvasComponent";
import GraphInput from "@/components/GraphInput";


export default function Home() {
  return (
    <div className="h-screen bg-blue-100 flex flex-col">
      {/* PUT NAVBAR HERE */}
      <div className="2xl:container mx-auto">
        <h1 className="mx-auto text-3xl text-center py-4">Graph Easer: Learn graphs with visuals</h1>
      </div>

      <div className="2xl:container mx-auto">
        <GraphInput/>
      </div>

      <section>
        <CanvasComponent/>
      </section>
    </div>
  );
}


