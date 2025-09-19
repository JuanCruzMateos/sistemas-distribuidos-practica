import GenericComponent from "./components/genericComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: "24px", fontFamily: "Arial, sans-serif" }}>
      <GenericComponent txt="Sistemas Distribuidos 2025 FIUNMdP" />
      <GenericComponent txt="Actividad 3 - Next.js" />
      <GenericComponent txt="Alumno: Juan Cruz Mateos" />
      <br></br>
      <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
    </div>
  );
}
