import './Calculator.css';
import React, { useState } from 'react';
const Calculator = () => {
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleClick = (e) => {
        let existingInput = input;
        if (e.target.value === 'c') {
            return setInput('');
        } else if (e.target.value === '=') {
            return handleSubmit();
        }
        if (e.target.value) {
            existingInput = existingInput + e.target.value;
            setInput(existingInput);
        }
    }

    const handleSubmit = (e) => {
        e?.preventDefault();
        try {
            const result = eval(input);
            if (result) {
                setInput(result);
            }
        } catch (err) {
            console.log('Error ', err);
            alert('Invalid input');
            setInput('');
        }
    }

    return <div className="container">
        <div className="top-box">
            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    onChange={handleChange}
                    type="text" />
            </form>
        </div>
        <div className="bottom-box">
            <div className="row">
                <button value={1} onClick={handleClick} >1</button>
                <button value={2} onClick={handleClick} >2</button>
                <button value={3} onClick={handleClick} >3</button>
                <button value={4} onClick={handleClick} >4</button>
            </div>
            <div className="row">
                <button value={5} onClick={handleClick} >5</button>
                <button value={6} onClick={handleClick} >6</button>
                <button value={7} onClick={handleClick} >7</button>
                <button value={8} onClick={handleClick} >8</button>
            </div>
            <div className="row">
                <button value={9} onClick={handleClick} >9</button>
                <button value={0} onClick={handleClick} >0</button>
                <button value={'c'} onClick={handleClick} >C</button>
                <button value={'.'} onClick={handleClick} >.</button>
            </div>
            <div className="row">
                <button value={'+'} onClick={handleClick} >+</button>
                <button value={'-'} onClick={handleClick} >-</button>
                <button value={'*'} onClick={handleClick} >X</button>
                <button value={'/'} onClick={handleClick} >/</button>
            </div>
            <div className="row">
                <button value={'='} onClick={handleClick} >=</button>
            </div>
        </div>
    </div>
}

export default Calculator;