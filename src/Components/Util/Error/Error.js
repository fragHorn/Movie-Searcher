import React from 'react';
import styles from './Error.module.css';
import errImg from './error.png';

const error = props => {
    return (
        <div id = {styles.error}>
            <img id = {styles.errImage} src = {errImg}/>
            <p id = {styles.errP}>Couldn't Load Data</p>
        </div>
    );
}

export default error;