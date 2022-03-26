import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Error from '../Util/Error/Error';
import { useParams } from 'react-router-dom';

const Movie = props => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://movie-task.vercel.app/api/movie?movieId=${id}`)
        .then(res => {
            setData(res.data.data);
        })
        .catch(err => {
            setError(err);
        })
    }, []);

    console.log(data);

    return (
        <div>
            {error ? <Error err = {error}/> : <h1>Movie</h1>}
        </div>
    )
}

export default Movie;