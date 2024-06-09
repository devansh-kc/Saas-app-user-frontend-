"use client";
import AppBar from "../../components/Appbar/Appbar";
import { Hero } from "../../components/hero/Hero";
import Upload from "../../components/uploadImg/Upload";
export default function Home() {

  return (
    <main>
      <AppBar />
      <Hero />
      <Upload />
    </main>
  );
}