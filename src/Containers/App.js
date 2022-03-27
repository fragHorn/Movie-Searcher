import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './App.module.css';
import MovieLister from '../Components/MovieLister/MovieLister';
import SearchInput from '../Components/Util/SearchInput/SearchInput';
import FilterInput from '../Components/Util/FilterInput/FilterInput';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Movie from '../Components/Movie/Movie';
import Spinner from '../Components/Util/Spinner/Spinner';
import Error from '../Components/Util/Error/Error';
import Page404 from '../Components/Util/Page404/Page404';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultShown] = useState(10);
  const [filterByYear, setFilterYear] = useState('');
  const [prevData, setPrevData] = useState([]);
  let navigate = useNavigate();

  const loadInitialData = () => {
    axios.get('https://movie-task.vercel.app/api/popular?page=1')
    .then(res => {
      setLoading(false);
      setMovies(res.data.data.results);
      setPrevData(res.data.data.results);
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
      navigate('/');
      axios.get(`https://movie-task.vercel.app/api/search?page=1&query=${searchQuery}`)
      .then(res => {
        // console.log(res);
        setLoading(false);
        setMovies(res.data.data.results);
        setPrevData(res.data.data.results);
        setError('');
      })
      .catch(err => {
        setError(err);
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    if(filterByYear.length === 0){
      setMovies(prevData);
      // loadInitialData();
      setLoading(false);
      setCurrentPage(1); 
    }
    else if(filterByYear.length === 4){
      navigate('/');
      const newData = movies.filter(movie => {
      const year = movie.release_date.split('-')[0];
        // console.log(year);
        console.log(year, filterByYear);
        return Number(year) === Number(filterByYear);
      });
      console.log(newData, movies, prevData);
      setMovies(newData);
      setCurrentPage(1);
      setLoading(false);
    }
    else{
      setMovies(prevData);
      setLoading(false);
      // setCurrentPage(1);
    }
  }, [filterByYear]);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage]);

  const search = (event) => {
    setSearchQuery(event.target.value);
  }

  const filterHandler = event => {
    setFilterYear(event.target.value);
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
    <div id = {styles['outer-main']}>
      <div id  = {styles['input-container']}>
        <SearchInput value = {searchQuery} search = {search}/>
        <FilterInput value = {filterByYear} filter = {filterHandler}/>
      </div>
      {loading? <Spinner/> : null}
      {error !== '' ? <Error err = {error}/> : 
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
          <Route path = "/movie/:id" element = {<Movie/>}/>
          <Route path = "/*" element = {<Page404 />} />
        </Routes>
      }
    </div>
  );
}

export default App;
