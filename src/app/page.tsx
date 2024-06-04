import AppBar from "@/components/AppBar/AppBar";
import { Hero } from "@/components/Hero/hero";
import Upload from "@/components/UploadImg/upload";
import UploadImage from "@/components/uploadImage/uploadImage";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <AppBar />
      <Hero />
      <Upload />
    </main>
  );
}
