import axios from "axios";
import { useState, useEffect } from "react";

export default function Banner(){

    const url = 'https://api.themoviedb.org/3/trending/movie/day';
    const tmdbBaseURL = "https://image.tmdb.org/t/p/original";
    let [trendingMovie, setTrendingMovie] = useState(null);
    
    useEffect(()=>{
        axios.get(url+"?api_key=53757beb3490dcadccbb1f4ab805d769")
        .then(function(response){
           let randomMovie= response.data.results[Math.floor(Math.random()*20)];
            setTrendingMovie(randomMovie);
        })
    },[]);


    if(!trendingMovie){
        return <h1>... Loading</h1>
    }else{
    return (<div className="relative ">
        <img className="h-[32rem] w-screen object-inherit" src={tmdbBaseURL+trendingMovie.backdrop_path}/> 
        <p className="absolute bg-black opacity-75 left-[50%] bottom-0 text-white text-4xl translate-x-[-50%] w-[100%] p-4">{trendingMovie.original_title} </p>

    </div>)
    }

}