"use client";
import React, { useState } from "react";
import UploadImage from "../uploadImage/UploadImage";
import axios from "axios";
import { BACKEND_URL } from "../../utils/utils";
import { useRouter } from "next/navigation";

import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function Upload() {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [txSignature, setTxSignature] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit() {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/v1/user/task`,
        {
          options: images.map((image) => ({
            imageUrl: image,
          })),
          title,
          signature: txSignature,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      router.push(`/task/${response.data.message}`);
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function makePayment() {
    try {
      setLoading(true);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: new PublicKey(process.env.NEXT_PUBLIC_PUBLIC_KEY!),
          lamports: 100000000,
        })
      );
      console.log(transaction);

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();
      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });
      setTxSignature(signature);
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>Create a task</CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label>Task Details</Label>

          <Input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            id="first_name"
            placeholder="What is your task?"
            required
          />
        </div>

        <div className="flex justify-center pt-4 max-w-screen-lg">
          {images.map((image, index) => (
            <div key={index}>
              <UploadImage
                image={image}
                onImageAdded={(imageUrl) => {
                  setImages((i) => [...i, imageUrl]);
                }}
              />
            </div>
          ))}
        </div>

        <div className="ml-4 pt-2 flex justify-center">
          <UploadImage
            onImageAdded={(imageUrl) => {
              setImages((i) => [...i, imageUrl]);
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={txSignature ? onSubmit : makePayment}
          className="bg-blue-600 text-white hover:bg-blue-700"
          disabled={Loading}
        >
          {txSignature ? "Submit Task" : "Pay 0.1 SOL"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Upload;
