import React from 'react';
import classes from './SearchInput.module.css';

const search = props => {
    return(
        <React.Fragment>
            <input className = {classes.search} type = 'text' value = {props.value} onChange = {props.search} placeholder = 'Search'/>
            <i className="fa-solid fa-magnifying-glass-location"></i>
        </React.Fragment>
    );
}

export default search;