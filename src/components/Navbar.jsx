import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <div className="flex items-center"> 
            <img className="h-12 " src="https://cdn-icons-png.flaticon.com/512/2503/2503508.png"/>
            <Link className="m-4 text-blue-500 font-bold text-3xl" to="/">Movies</Link>
            <Link className="m-4 text-blue-500 font-bold text-3xl"  to="/watchlist">Watchist</Link>
        </div>
    )
}