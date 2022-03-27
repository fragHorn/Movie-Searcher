import React from 'react';
import classes from './Paging.module.css';

const paging = props => {
    return (
        <button className = {classes.page} onClick = {props.click}
            disabled = {props.disabled}>
            {props.pageNumber}
        </button>
    );
}

export default paging;