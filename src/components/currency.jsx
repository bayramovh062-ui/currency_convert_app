import React, { useState, useEffect } from 'react'
import '../css/currency.css'
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest'

function currency() {

    const [amount, setAmount] = useState()
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('TRY')
    const [result, setResult] = useState()
    const [currencyNames, setCurrencyNames] = useState([])

    const exchange = async () => {
        const result = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)
        setResult((result.data.data[toCurrency] * amount).toFixed(2))
    }

    useEffect(() => {
        const fetchCurriences = async () => {
            const result = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)
            let currencies = Object.keys(result.data.data)
            currencies = currencies.filter(curr => curr !== 'USD' && curr !== 'TRY' && curr !== 'EUR')
            setCurrencyNames(currencies)
        }
        fetchCurriences()
    }, [])

    const selectOptions = currencyNames.map((currency) => (
        <option key={currency} value={currency}>{currency}</option>
    ));

    return (
        <div className='currency-div'>
            <div className='currency-header'>
                <h3>Currency converter</h3>
            </div>
            <div className='currency-form'>
                <form className='main-form'>
                    <input type='number' placeholder='Amount' className='amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}>
                    </input>
                    <select className='from-currency'
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}>
                        <option>USD</option>
                        <option>TRY</option>
                        <option>EUR</option>
                        {selectOptions}
                    </select>

                    <FaArrowRight />

                    <select className='to-currency'
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}>
                        <option>TRY</option>
                        <option>USD</option>
                        <option>EUR</option>
                        {selectOptions}
                    </select>
                    <input type='number' placeholder='Result' className='result' readOnly
                        value={result}
                        onChange={(e) => setResult(e.target.value)}>

                    </input>
                </form>
            </div>
            <div className='button-wraper-div'>
                <button className='currency-converter-button' type='button' onClick={(e) => exchange()}>Convert</button>
            </div>
        </div>
    )
}

export default currency