import axios from "axios";
import { useState, useEffect, useContext } from "react"
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import MovieContext from "../Context/MovieContext";
import { useDispatch, useSelector } from "react-redux";

export default function Movies() {
  const url = 'https://api.themoviedb.org/3/trending/movie/day';
  const tmdbBaseURL = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState(null);
  const { pageNumber } = useSelector((store) => store.paginationState);

  const {watchList} = useContext (MovieContext);
  
  useEffect(() => {
    axios.get(url + `?api_key=53757beb3490dcadccbb1f4ab805d769&page=${pageNumber}`)
      .then(function (response) {
        setMovies(response.data.results);
      })
  }, [pageNumber])






  if (!movies) {
    return (<h1>... Loading</h1>)
  }
  return (
    <div className="flex flex-wrap justify-evenly">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}  // Unique key for each MovieCard
          movie={movie}
          poster={movie.backdrop_path}
          movieTitle={movie.original_title}
          favourite={watchList.some((movieObj)=>{
            return movieObj.id === movie.id
          })}
        />
      ))}
      <Pagination/>
    </div>
  );
}