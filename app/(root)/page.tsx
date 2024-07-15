"use client";
import AppBar from "../../components/Appbar/Appbar";
import { Hero } from "../../components/hero/Hero";
import Upload from "../../components/uploadImg/Upload";
export default function Home() {

  return (
    <main  >
      <AppBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

      <Hero />
      <Upload />
      </div>
    </main>
  );
}