import React from 'react';
import classes from './Paging.module.css';

const paging = props => {
    return (
        <button onClick = {props.click}
            disabled = {props.disabled}>
            {props.pageNumber}
        </button>
    );
}

export default paging;