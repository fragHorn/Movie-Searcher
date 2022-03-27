import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Error from '../Util/Error/Error';
import MovieInfo from './MovieInfo';
import { useParams } from 'react-router-dom';

const Movie = props => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://movie-task.vercel.app/api/movie?movieId=${id}`)
        .then(res => {
            setData(res.data.data);
            setError('');
        })
        .catch(err => {
            setError(err);
        });
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, []);

    // console.log(data);

    return (
        <div>
            {error !== '' ? <Error err = {error}/> : <MovieInfo {...data}/>}
        </div>
    )
}

export default Movie;