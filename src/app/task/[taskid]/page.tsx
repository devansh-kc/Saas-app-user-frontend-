"use client";
import React from "react";
import AppBar from "@/components/AppBar/AppBar";

function Page() {
  return (
    <div>
      <AppBar />
      <div className="text-2xl pt-20 flex justify-center">
        {/* // {taskDetails.title} */}
      </div>
      <div className="flex justify-center pt-8">
        {" "}
        {/* {Object.keys(result || {}).map((taskId) => (
          <Task
            imageUrl={result[taskId].option.imageUrl}
            votes={result[taskId].count}
          />
        ))} */}
      </div>
    </div>
  );
}

function Task({ imageUrl, votes }: { imageUrl: string; votes: number }) {
  return (
    <div>
      <img className={"p-2 w-96 rounded-md"} src={imageUrl} />
      <div className="flex justify-center">{votes}</div>
    </div>
  );
}

export default Page;
