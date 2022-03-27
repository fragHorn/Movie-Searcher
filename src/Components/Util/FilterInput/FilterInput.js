import React from 'react';
import styles from './FilterInput.module.css';

const filter = props => {
    return (
        <input id = {styles.filter} type = 'text' value = {props.value} onChange = {props.filter} placeholder = 'Filter By Year'/>
    );
}

export default filter;