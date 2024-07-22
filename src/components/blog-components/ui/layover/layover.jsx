"use client";
import { useLayoverGlobal } from "@/context/layover/LayoverGlobalContext";

export default function LayOverSection() {
  function handleCloseLayover() {
    setLayoverObject(null);
  }
  const { layoverObject, setLayoverObject } = useLayoverGlobal();
  return (
    layoverObject && (
      <section className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center content-center" onClick={handleCloseLayover}>
        <div className="w-[80vw] h-[80vh] bg-mainBrand">{layoverObject.link}</div>
      </section>
    )
  )
}