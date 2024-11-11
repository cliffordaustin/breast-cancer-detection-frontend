import MakePrediction from "@/components/MakePrediction";
import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";

function Home() {
  return (
    <div>
      <div className="h-[60px] px-12 flex items-center justify-between bg-gray-50 border-b border-gray-200 border-solid">
        <h1 className="font-bold text-xl font-mono">Breast cancer detection</h1>
        <Link href="/history">
          <Button>View history</Button>
        </Link>
      </div>
      <div className="w-[1000px] mx-auto">
        <MakePrediction></MakePrediction>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
export default Home;
