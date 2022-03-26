import React, {useState, useEffect} from 'react';
import axios from 'axios';
import classes from './App.module.css';
import MovieLister from '../Components/MovieLister/MovieLister';
import SearchInput from '../Components/Util/SearchInput/SearchInput';
import {Route, Routes} from 'react-router-dom';
import Movie from '../Components/Movie/Movie';
import Spinner from '../Components/Util/Spinner/Spinner';
import Error from '../Components/Util/Error/Error';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultShown] = useState(10);

  const loadInitialData = () => {
    axios.get('https://movie-task.vercel.app/api/popular?page=1')
    .then(res => {
      setLoading(false);
      setMovies(res.data.data.results);
      setError('');
    })
    .catch(err => {
      setError(err);
    });
  }

  useEffect(() => {
    setLoading(true);
    loadInitialData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if(searchQuery === ''){
      loadInitialData();
      setCurrentPage(1);
    }
    else{
      axios.get(`https://movie-task.vercel.app/api/search?page=1&query=${searchQuery}`)
      .then(res => {
        // console.log(res);
        setLoading(false);
        setMovies(res.data.data.results);
        setError('');
      })
      .catch(err => {
        setError(err);
      });
    }
  }, [searchQuery]);

  console.log(movies);
  const search = (event) => {
    setSearchQuery(event.target.value);
  }

  const goToNextPage = () => {
    setCurrentPage( page => {
      return page + 1;
    });
  }

  const goToPreviousPage = () => {
    setCurrentPage( page => page-1 );
  }

  const goToSpecifiedPage = (event) => {
    // console.log(event.target.innerHTML);
    const pageNumber = Number(event.target.innerHTML);
    setCurrentPage(pageNumber);
  }
 
  return (
    <div>
      <SearchInput value = {searchQuery} search = {search}/>
      {loading? <Spinner/> : null}
      {error ? <Error err = {error}/> : 
        <Routes>
          <Route path = "/" 
            element = {loading ?null: <MovieLister 
            data = {movies} 
            query = {searchQuery}
            currentPage = {currentPage}
            entries = {resultShown}
            next = {goToNextPage}
            previous = {goToPreviousPage}
            specified = {goToSpecifiedPage}/>}
           />
          <Route path = "/:id" element = {<Movie/>}/>
        </Routes>
      }
    </div>
  );
}

export default App;
