"use client";
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../../utils/utils";

function UploadImage({
  onImageAdded,
  image,
}: {
  onImageAdded: (image: string) => void;
  image?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function onFileSelect(event: any) {
    setUploading(true);
    const file = event.target.files[0];
    const response = await axios.get(
      `http://localhost:8000/v1/user/presignedUrl`,
      {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzUwMzQ2NH0.tjl4bNX1hJQ7Suqykz5pAIO4w7S8vk1dfANZWfbZpfY"
        },
      }
    );
    console.log(response);
  }
  if (image) {
    return <img className={"p-2 w-96 rounded"} src={image} />;
  }
  return (
    <div>
      <div className="w-40 h-40 rounded border text-2xl cursor-pointer">
        <div className="h-full flex justify-center flex-col relative w-full">
          <div className="h-full flex justify-center w-full pt-16 text-4xl">
            {uploading ? (
              <div className="text-sm">Loading...</div>
            ) : (
              <>
                +
                <input
                  className="w-full h-full bg-red-400 "
                  type="file"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  onChange={onFileSelect}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
