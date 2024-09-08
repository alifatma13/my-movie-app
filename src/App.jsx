import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Watchlist from './components/Watclist'
import Banner from './components/Banner'
import Movies from './components/Movies'
import MovieContext from './Context/MovieContext'
import Pagination from './components/Pagination'
import PaginationContext from './Context/PaginationContext'

function App() {
  const [count, setCount] = useState(0)
  const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem('watchList')) || []);
  const [pageNumber, setPageNumber] = useState(1);



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
      <Navbar />
      <MovieContext.Provider value={{ watchList, addToWatchList, removeFromWatchList, setWatchList }}>
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <PaginationContext.Provider value={{handleNext, handlePrev}}>
              <Movies
                // watchList={watchList} 
                // addToWatchList={addToWatchList} 
                // removeFromWatchList={removeFromWatchList}
                pageNumber={pageNumber} 
              />
              </PaginationContext.Provider>

            </>
          } />
          <Route path="/watchlist" element={
            <><Watchlist
            // movies={watchList} 
            // removeFromWatchList={removeFromWatchList} 
            // setWatchList={setWatchList} 
            /> </>
          } />
        </Routes>
      </MovieContext.Provider>
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
