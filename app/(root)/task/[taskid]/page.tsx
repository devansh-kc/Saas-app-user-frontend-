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
        localStorage.getItem("token")
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
      console.log(data)
      setResult(data.data.result);
      setTaskDetails(data.data.taskDetails);
    });
  }, [taskid]);

  return (
    <div>
      <AppBar />
      <div className="text-5xl pt-20 flex font-bold font-mono  justify-center">
        {taskDetails.title}
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
