"use client";
import React, { useEffect } from "react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/utils";
function AppBar() {
  const { publicKey, signMessage } = useWallet();
  async function signAndSend() {
    try {
      if (!publicKey) {
        return;
      }
      const message = new TextEncoder().encode("Sign into mechanical turks");
      const signature = await signMessage?.(message);
      const response = await axios.post(`${BACKEND_URL}/v1/user/sign-up`, {
        signature,
        publicKey: publicKey?.toString(),
      });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    signAndSend();
  }, [publicKey]);
  return (
    <header className="w-full flex justify-between items-center p-4 bg-white border-b">
      <h1 className="text-2xl font-bold">Turkify</h1>
      <button className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700">
        {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
      </button>
    </header>
  );
}

export default AppBar;
