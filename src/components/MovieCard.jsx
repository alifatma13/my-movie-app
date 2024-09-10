import { useContext } from "react";
import MovieContext from "../Context/MovieContext";

export default function MovieCard({ movie, poster, movieTitle, favourite }) {
    const tmdbBaseURL = "https://image.tmdb.org/t/p/original";
    const {addToWatchList, removeFromWatchList} = useContext(MovieContext);

    return (
        <div className="relative m-4 hover:scale-110 duration-200 cursor-pointer">
            <img className="h-[20rem] w-[13rem] object-cover rounded-xl" src={tmdbBaseURL + poster}></img>
            <p className="absolute p-2 rounded-b-xl bottom-0 left-[50%] bg-black opacity-75  w-[100%] text-white translate-x-[-50%]">  {movieTitle}</p>

            {favourite ? <div><img onClick={() => removeFromWatchList(movie)} className="absolute bg-white bg-opacity-50 top-2 right-2 h-6 w-6 rounded-md flex  items-center justify-center" src="/assets/filled_heart.png"></img>
            </div> : <div><img onClick={() => addToWatchList(movie)} className="absolute bg-white bg-opacity-50 top-2 right-2 h-6 w-6 rounded-md flex  items-center justify-center" src="/assets/black_heart.png"></img>
            </div>}

        </div>);

}