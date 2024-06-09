"use client";
import React, { useEffect, useState } from "react";
import AppBar from "../../../../components/Appbar/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../../../../utils/utils";
import { useParams } from "next/navigation";

async function getTaskDetails(taskId: string) {
  const response = await axios.get(
    `${BACKEND_URL}/v1/user/task?taskId=${taskId}`,
    {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzUwMzQ2NH0.tjl4bNX1hJQ7Suqykz5pAIO4w7S8vk1dfANZWfbZpfY",
      },
    }
  );
  return response.data;
}
function Page() {
  const { taskid } = useParams();
  const [result, setResult] = useState<
    Record<
      string,
      {
        count: number;
        option: {
          imageUrl: string;
        };
      }
    >
  >({});
  const [taskDetails, setTaskDetails] = useState<{
    title?: string;
  }>({});

  useEffect(() => {
    getTaskDetails(taskid.toString()).then((data) => {
      setResult(data.data.result);
      setTaskDetails(data.taskDetails);
    });
  }, [taskid]);
  console.log(result)
  return (
    <div>
      <AppBar />
      <div className="text-2xl pt-20 flex justify-center">
        {taskDetails?.title}
      </div>
      <div className="flex justify-center pt-8">
        {" "}
        {Object.keys(result || {}).map((taskId) => (
          <Task
            key={taskId}
            imageUrl={result[taskId].option.imageUrl}
            votes={result[taskId].count}
          />
        ))}
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
