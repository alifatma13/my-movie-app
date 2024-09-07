import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Watchlist from './components/Watclist'
import Banner from './components/Banner'
import Movies from './components/Movies'

function App() {
  const [count, setCount] = useState(0)
  const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem('watchList')) || []);
  
  const addToWatchList = (movieToAdd) => {
    console.log(movieToAdd);
    const newWatchList = [...watchList, movieToAdd];
    setWatchList(newWatchList);

  }

  const removeFromWatchList = (movieToRemove) => {
    console.log(movieToRemove);
    const filteredWatchList = watchList.filter(movieObj => movieObj.id != movieToRemove.id)
    setWatchList(filteredWatchList);

  }

  useEffect(() => {
    localStorage.setItem('watchList', JSON.stringify(watchList))
  }, [watchList])

  return (
    <BrowserRouter >
     <Navbar/>
    <Routes>
      <Route path="/" element= {
              <>
              <Banner/>
              <Movies watchList={watchList} addToWatchList={addToWatchList} removeFromWatchList={removeFromWatchList}/>
             
                </>
      }/>
      <Route path="/watchlist" element={
        <><Watchlist movies={watchList} removeFromWatchList= {removeFromWatchList} setWatchList = {setWatchList}/> </>
      }/>
    </Routes>
    </BrowserRouter>
  //   <>
  //  <Navbar/>
  //   <Banner/>
  //  <Movies/>
  //  <Pagination/>
  //  <Watchlist/> 
  //   </>
  )
}

export default App
