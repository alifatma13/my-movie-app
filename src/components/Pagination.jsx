import { useState, useEffect} from "react"

export default function Pagination({pageNumber, handleNext, handlePrev}){


    return (
    <div className="flex justify-center gap-4 p-[1rem] text-2xl h-[4rem] w-screen bg-slate-200 item-center">
        <img onClick={handlePrev} className="h-[2rem] w-[2rem] cursor-pointer" src="../src/assets/left-arrow.png"></img>
        <div >{pageNumber}</div>
        <img onClick={handleNext} className="h-[2rem] w-[2rem] cursor-pointer" src="../src/assets/right-arrow.png"></img>
    </div>
    )

}