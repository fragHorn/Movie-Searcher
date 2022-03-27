import React from "react";
import styles from './Spinner.module.css';

const spinner = () => {
  return (
    <div id = {styles.backdrop}>
      <div className={styles["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default spinner;
