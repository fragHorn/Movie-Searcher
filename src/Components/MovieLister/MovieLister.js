import React, {useEffect, useParams} from 'react';
import MovieCard from '../Movie/MovieCard';
import {Link} from 'react-router-dom';
import Paging from '../Util/Paging/Paging';

const MovieLister = props => {
    const startIndex = (props.currentPage - 1)*props.entries;
    const lastIndex = startIndex + props.entries;
    const pageNumbers = [];
    const lastPage = Math.ceil(props.data.length/props.entries);
    
    let i = props.currentPage -2 <= 0 ? 1: props.current - 2;
    while(i <= props.currentPage + 2 && i <= lastPage){
        pageNumbers.push(i);
        i++;
    }
    const movieList = props.data.slice(startIndex, lastIndex).map(movie => {
        return <Link to = {'/' + movie.id} key = {movie.id}>
                <MovieCard {...movie} />
            </Link>}
    );

    const pagesMarker = pageNumbers.map(page => {
        return <Paging key = {page} 
            pageNumber = {page}
            click = {props.specified}
            disabled = {false}/>
    });

    return(
        <div>
            {movieList}
            <div>
                <Paging pageNumber = 'Prev' 
                    click = {props.previous}
                    disabled = {props.currentPage === 1 ? true: false}/>
                {pagesMarker}
                <Paging pageNumber = 'Next'
                    click = {props.next}
                    disabled = {props.currentPage === lastPage ? true: false}/>
            </div>
        </div>
    );
}

export default MovieLister;