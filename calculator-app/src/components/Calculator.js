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
                {[1, 2, 3, 4].map((item) => {
                    return <button value={item} onClick={handleClick}>{item}</button>
                })}
            </div>
            <div className="row">
                {[5, 6, 7, 8].map((item) => {
                    return <button value={item} onClick={handleClick}>{item}</button>
                })}
            </div>
            <div className="row">
                {[9, 0, 'c', '.'].map((item) => {
                    return <button value={item} onClick={handleClick}>{item}</button>
                })}
            </div>
            <div className="row">
                {['+', '-', '*', '/'].map((item) => {
                    return <button value={item} onClick={handleClick}>{item}</button>
                })}
            </div>
            <div className="row">
                <button value={'='} onClick={handleClick} >=</button>
            </div>
        </div>
    </div>
}

export default Calculator;