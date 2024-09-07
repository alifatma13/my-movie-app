import axios from "axios";
import { useState, useEffect } from "react"
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

export default function Movies({watchList, addToWatchList, removeFromWatchList}) {
  const url = 'https://api.themoviedb.org/3/trending/movie/day';
  const tmdbBaseURL = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  useEffect(() => {
    axios.get(url + `?api_key=53757beb3490dcadccbb1f4ab805d769&page=${pageNumber}`)
      .then(function (response) {
        setMovies(response.data.results);
      })
  }, [pageNumber])



  const handleNext = () => {
    console.log("next");
    setPageNumber(pageNumber + 1);
  }

  const handlePrev = () => {
    console.log("prev");
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }

  }




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
          addToWatchList={addToWatchList}
          favourite={watchList.some((movieObj)=>{
            return movieObj.id === movie.id
          })}
          removeFromWatchList={removeFromWatchList}
        />
      ))}
      <Pagination pageNumber={pageNumber} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
}