import React from 'react';
import css from './Select.module.css';





const Select = (props) => {

    return (
        <div className={css.selectPair}>
            <label htmlFor="cars">{props.choosingItem}</label>

            <select className={css.select}
                // props.choosed !== '' &&
                value={props.choosed}
                onChange={(e) => {
                    props.changed(e)
                }}
            >

                {props.options.map(op => {
                    return (

                        <option key={op.value + op.label + Math.random()} value={op.value} title={op.value}>{op.label}</option>
                    )

                })}


            </select>
        </div>
    );
};

export default Select;