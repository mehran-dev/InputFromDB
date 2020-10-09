import React, { Component } from 'react'
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import css from './Panel.module.css';
import Axios from 'axios';


export default class Panel extends Component {

    state = {
        error: false,
        spinner: false,
        inputNeeded: true,
        op1: [
            { val: "53b3e4c5-00ae-11eb-9c81-3f23acb642db", label: "انتخاب اول" },
            { val: "21a2e655-00b0-11eb-9c81-819afa016b02", label: "انتخاب دوم" },
        ],
        choosedItemOp1: '',
        op2: [],
        choosedItemOp2: '',
    }


    optionChangeHandler = (e) => {
        this.setState({
            spinner: true,
            error: false
        })
        const { value } = e.target;

        const selectedOp = this.state.op1.filter(op => {

            return (op.label === value)
        }
        )
        const choosed1 = selectedOp[0].label;
        Axios.get('https://jsonblob.com/api/' + selectedOp[0].val)
            .then(response => {
                //console.log("response", response.data)
                const data = response.data;
                const inputShow = data.display === "hidden" ? false : true;

                const ops = data.options;
                this.setState(prevState => {
                    return {
                        spinner: false,
                        op2: ops,
                        inputNeeded: inputShow,
                        choosedItemOp1: choosed1
                    }
                })
            })
            .catch(error => {
                this.setState({ spinner: false, error: true })
                console.warn("err", error)

            }

            )



    }




    render() {


        return (
            <div className={css.Panel}>
                {this.state.spinner && <div className={css.wait}> please wait ...</div>}
                {this.state.error && <div className={css.error}> An Error Accured !!!</div>}

                <Select
                    changed={(e) => this.optionChangeHandler(e)}
                    options={this.state.op1}
                    choosed={this.state.choosedItemOp1}
                    choosingItem="نوع حمل یار "
                />
                {this.state.inputNeeded && <Input />}

                <Select
                    options={
                        this.state.op2
                    }
                    changed={(e) => {
                        console.log("you selected ", e.target.value);
                    }}
                    choosingItem="باربری"
                    choosed={this.state.choosedItemOp2}
                />
            </div>
        )
    }
}
