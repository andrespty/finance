import { useReducer } from "react"

const useCompounding = () => {
    const [ info, setInfo ] = useReducer(reducer, initialInfo)

    const modify = (attribute, value) => setInfo({[attribute]:value})

    return { info, modify }
}

export default useCompounding

const initialInfo = {
    initial: '',
    rate: '',
    years: 20,
    total: '', 
    frequency:'anually'
}

const reducer = (state, action) => {
    return {
        ...state,
        ...action
    }
}