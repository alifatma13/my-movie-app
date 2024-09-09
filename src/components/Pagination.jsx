import { useContext} from "react"
import paginationSlice from "../redux/paginationSlice";
import { useDispatch, useSelector } from "react-redux";

const actions = paginationSlice.actions;

export default function Pagination(){
    const { pageNumber } = useSelector((store)=>store.paginationState);
    const dispatch = useDispatch();

    return (
    <div className="flex justify-center gap-4 p-[1rem] text-2xl h-[4rem] w-screen bg-slate-200 item-center">
        <img onClick={()=>dispatch(actions.handlePrev())} className="h-[2rem] w-[2rem] cursor-pointer" src="../src/assets/left-arrow.png"></img>
        <div >{pageNumber}</div>
        <img onClick={()=>dispatch(actions.handleNext())} className="h-[2rem] w-[2rem] cursor-pointer" src="../src/assets/right-arrow.png"></img>
    </div>
    )

}