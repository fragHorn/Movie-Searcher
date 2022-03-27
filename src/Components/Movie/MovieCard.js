import React from 'react';
import star from './star.png';
import styles from './MovieCard.module.css';

const movieCard = props => {
    return (
        <div className = {styles.outer}>
            <img src = {'https://image.tmdb.org/t/p/original' + props.poster_path} className = {styles.poster}/>
            <p className= {styles.title}>{props.original_title}</p>
            <div className= {styles['movie-info']}>
                {props.release_date}
                <span><img src = {star} height = '16px' width = '16px'/>{props.vote_average}</span>
            </div>
        </div>
    );
}

export default movieCard;