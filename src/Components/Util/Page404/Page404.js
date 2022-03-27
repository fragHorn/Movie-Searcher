import React from 'react';
import styles from './Page404.module.css';
import image404 from './404.png';

const page404 = () => {
    return (
        <div id = {styles.error}>
            <img id = {styles.errImage} src = {image404}/>
        </div>
    );
}

export default page404;