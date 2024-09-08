import { useContext} from "react"
import PaginationContext from "../Context/PaginationContext"

export default function Pagination({pageNumber}){

    const {handleNext, handlePrev} = useContext(PaginationContext);

    return (
    <div className="flex justify-center gap-4 p-[1rem] text-2xl h-[4rem] w-screen bg-slate-200 item-center">
        <img onClick={handlePrev} className="h-[2rem] w-[2rem] cursor-pointer" src="../src/assets/left-arrow.png"></img>
        <div >{pageNumber}</div>
        <img onClick={handleNext} className="h-[2rem] w-[2rem] cursor-pointer" src="../src/assets/right-arrow.png"></img>
    </div>
    )

}