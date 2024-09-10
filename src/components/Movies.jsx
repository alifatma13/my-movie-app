import { useEffect, useContext } from "react"
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import MovieContext from "../Context/MovieContext";
import { useDispatch, useSelector } from "react-redux";
import movieMiddleware from "../redux/movieMiddleware";


export default function Movies() {
  const url = 'https://api.themoviedb.org/3/trending/movie/day';
  const tmdbBaseURL = "https://image.tmdb.org/t/p/original";
  const { pageNumber } = useSelector((store) => store.paginationState);
  const { movies, loading, error } = useSelector((store) => store.moviesState);
  const dispatch = useDispatch();
  const {watchList} = useContext (MovieContext);
  
  useEffect(() => {
    dispatch(movieMiddleware(pageNumber));
  }, [pageNumber])

  if (loading) {
    return <h1>...Loading</h1>;
  }
  if (error) {
    return <h1>OPS... Error Occured</h1>;
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