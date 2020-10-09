import React from 'react';
import css from './Input.module.css';



const Input = (props) => {
    return (
        <div className={css.inputContainer}>
            <input className={css.input} />
        </div>
    );
};

export default Input;