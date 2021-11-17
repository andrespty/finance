import { useReducer, useEffect, useState } from "react"
import { initial_config } from "../Charts/BarChart"

const useCompounding = () => {
    const [ info, setInfo ] = useReducer(reducer, initialInfo)
    const [ config, setConfig ] = useState(initial_config)
    const [ final_amount, setFinalAmount ] = useState(0)

    useEffect(() => {

        let P = info.initial
        let A = info.recurrent
        let r = info.rate / 100
        let n = compounding_frequency[info.frequency]
        let y = info.years
        let final = parseFloat(calculate_compound_amount(P,r,n, y)) + parseFloat(calculate_recurrent_amount(A, r,n ,y))
        let bar = final ? final : 0
        // console.log(parseFloat(calculate_invested_amount(P, y, A)))
        setFinalAmount(bar)

        if (final_amount !== 0) {
            let labels = range(1, info.years)
            let invested = []
            let compounded = []
            for (let i = 1; i <= info.years; i++){
                invested.push(calculate_invested_amount(P, i, A))
                compounded.push(parseFloat(calculate_compound_amount(P,r,n, i)) + parseFloat(calculate_recurrent_amount(A, r,n ,i)))
            }

            setConfig({
                labels:labels,
                datasets: [
                    {
                        label:'Compounded',
                        data:compounded,
                        backgroundColor:['rgba(255, 99, 132, 0.2)',],
                        borderColor:['rgba(255, 99, 132, 0.2)',]
                    },
                    {
                        label:'Total Contributed',
                        data:invested,
                        backgroundColor:['rgba(255, 159, 64, 0.2)',],
                        borderColor:['rgba(255, 159, 64, 0.2)',]
                    }
                ]
            })
        }

    }, [info, final_amount])

    const modify = (attribute, value) => setInfo({[attribute]:value})

    return { info, modify, config, final_amount }
}

export default useCompounding

const initialInfo = {
    initial: '',
    recurrent:'',
    rate: '',
    years: 20,
    total: '', 
    frequency:'anually'
}

const compounding_frequency = {
    anually: 1,
    semianually:2,
    quarterly:4,
    monthly:12
}

const reducer = (state, action) => {
    return {
        ...state,
        ...action
    }
}


const calculate_compound_amount = (P, r, n, t) => {
    let A = P * (( 1 + (r/n)) ** (n*t))
    return A.toFixed(2)
}

const calculate_recurrent_amount = (A, rate, frequency ,years) => {
    // console.log(A)
    // console.log(rate)
    // console.log(years)
    let newRate = rate/frequency
    let n_compounds = years * frequency
    let recurrent_sum = A * (12/frequency)

    let fututre_amount = recurrent_sum * ((((1 + newRate) ** (n_compounds)) - 1) / newRate)
    return fututre_amount.toFixed(2)
}

const calculate_invested_amount = (P, years, monthly) => {
    return parseFloat(P) + (monthly * 12 * years)
}

const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}