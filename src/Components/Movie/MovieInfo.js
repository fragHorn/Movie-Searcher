import React, {Fragment} from 'react';
import styles from './MovieInfo.module.css';
import star from './star.png';
import {Link} from 'react-router-dom';

const movieInfo = props => {
    return (
        <React.Fragment>
            <Link to ="/">Home</Link>
            <div id = {styles.outer}>
                {/* <div> */}
                    <img id = {styles.image} src = {'https://image.tmdb.org/t/p/original' + props.poster_path} />
                {/* </div> */}
                <div id = {styles.details}>
                    <p id = {styles.title}>{props.title}</p>
                    {/* < */}
                    <div id = {styles['sub-details']}>
                        <p>Duration: {props.runtime} minutes</p>
                        <p>Release Date: {props.release_date}</p>
                        Rating: <span><img src = {star} height = '16px' width = '16px'/>{props.vote_average}</span>
                        <p>Language: {props.original_language}</p>
                        <p>Visit Website: <a href = {props.homepage} target = '_blank'>Go</a></p>
                    </div>
                    <div id = 'overview'>
                        {props.overview}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default movieInfo;