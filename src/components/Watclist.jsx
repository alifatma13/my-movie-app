import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { GENRE_ID_MAPPING } from "./constant"
import { useContext, useEffect, useState } from 'react';
import MovieContext from '../Context/MovieContext';


export default function Watchlist() {
    const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
    const tmdbBaseURL = "https://image.tmdb.org/t/p/original";
    const allGenres = "All Genres";

    const [genres, setGenres] = useState([allGenres])
    const [selectedGenre, setSelectedGenre] = useState(allGenres);
    const [search, setSearch] = useState('');
    const { watchList:movies, removeFromWatchList , setWatchList} = useContext(MovieContext);

    useEffect(() => {
        const genreList = movies.map((movieObj) => GENRE_ID_MAPPING[movieObj.genre_ids[0]])
        const uniqueGenreList = new Set(genreList);
        setGenres([allGenres, ...uniqueGenreList]);

    }, [movies]);

    const sortAscending = (key)=>{
       const sortedMovies =  [...movies].sort((movieA, movieB)=>{
                return movieA[key] - movieB[key];
        })
        setWatchList(sortedMovies);

    }

    const sortDescending = (key)=>{
        const sortedMovies =  [...movies].sort((movieA, movieB)=>{
                    return movieB[key] - movieA[key];
            })
            setWatchList(sortedMovies);

    }


    return (<div className="flex item-center justify-center flex-wrap">
        <div className='flex my-8 w-[90%] flex-wrap gap-8 justify-evenly'>
            {genres.map((genre, index) => {
                return (<div key={index}
                    onClick={() => setSelectedGenre(genre)}
                    className={`h-[3rem] w-[12rem] rounded-xl
                     flex items-center justify-center bg-slate-400 
                     text-2xl cursor-pointer text-white ${genre === selectedGenre ? 'bg-blue-400' : ''}`}>{genre}</div>);
            })}
        </div>
        <input value={search}
            placeholder='Search...'
            className='bg-slate-200 h-[4rem] p-4 w-[24rem] my-8 text-2xl outline-none rounded-l'
            onChange={(e)=>{setSearch(e.target.value)}} />

        <table className="border-2  border-black rounded-lg w-[90%] overflow-hidden">
            <thead className="bg-slate-200 h-12 rounded-lg text-center">
                <tr className="border-b-2">
                    <th>Name</th>
                    <th>
                        <FontAwesomeIcon onClick={()=>sortAscending('vote_average')} className='gap-8 mx-4' icon={faAngleUp} />
                        Rating
                        <FontAwesomeIcon  onClick={()=>sortDescending('vote_average')} className='gap-8 mx-4' icon={faAngleDown} />
                    </th>
                    <th className='gap-8 mx-4'>
                        <FontAwesomeIcon onClick={()=>sortAscending('popularity')} className='gap-8 mx-4' icon={faAngleUp} />
                        Popularity
                        <FontAwesomeIcon onClick={()=>sortDescending('popularity')} className='gap-8 mx-4' icon={faAngleDown} /></th>
                    <th>Genre</th>
                    <th>Remove</th>
                </tr></thead>
            <tbody>

                {
                    movies
                        .filter((movieObj) => {
                            if (selectedGenre === allGenres) {
                                return true;
                            } else {
                                return selectedGenre === GENRE_ID_MAPPING[movieObj.genre_ids[0]]
                            }
                        })
                        .filter((movieObj) => {
                            return movieObj.title.toLowerCase().includes(search.toLowerCase());
                          })
                        .map((movie) => {
                            return (
                                <tr key={movie.id} className="border-b-2 text-center hover:bg-slate-50">
                                    <td className="flex gap-[12%] items-center">
                                        <img className="h-[10rem] w-[15rem] rounded-xl " src={tmdbBaseURL + movie.backdrop_path} alt="poster" />
                                        {movie.title}
                                    </td>
                                    <td>
                                        {movie.vote_average}
                                    </td>
                                    <td>
                                        {movie.popularity}
                                    </td>
                                    <td>
                                        {GENRE_ID_MAPPING[movie.genre_ids[0]]}
                                    </td>
                                    <td className="text-red-500"><FontAwesomeIcon onClick={() => removeFromWatchList(movie)} icon={faTrash} ></FontAwesomeIcon></td>
                                </tr>
                            )
                        })
                }

            </tbody>
        </table>
    </div>)
}