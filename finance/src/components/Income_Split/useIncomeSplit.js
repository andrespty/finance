import { useReducer, useState, useRef, useEffect } from "react"

const useIncomeSplit = () => {
    const [ state, setState ] = useState({isPercentage: true, tracker:0, hasRecalculate:false, option:'percentage'})
    const [ income, setIncome ] = useState(0)
    const [ curr_split, setCurrSplit ] = useState(initial_curr_split)
    const [ splits, setSplits ] = useReducer(reducer, initialSplit)
    const [ config, setConfig ] = useState(initialPieChart)

    const id_split = useRef(0)

    useEffect(() => {
        if (splits.length !== 0){
            // setHasRecalculate(true)
            setState(state => ({...state, hasRecalculate:true}))
        }
    }, [income])

    const change_income = (value) => {
        setState(state => ({...state, income:value}))
        setIncome(value)
    }

    const change = (option) =>{
        setSplits(initialSplit)
        setConfig(state => ({
            labels:[],
            datasets:[
                state.datasets[0] = {
                    ...state.datasets[0],
                    data:[]
                }
            ]
        }))
        if (option === 'percentage'){
            setState(state => ({...state, option:option, tracker:0, isPercentage:true}))
        }
        else{
            setState(state => ({...state, option:option, tracker:0, isPercentage:false}))
        }

    }

    const add = () => {
        if (curr_split.name !== '' && curr_split[state.option] !== ''){
            // Add data in pie chart
            setConfig(prevState => ({
                labels: [...prevState.labels, curr_split.name],
                datasets: [
                    prevState.datasets[0] = {
                        ...prevState.datasets[0],
                        data: [...prevState.datasets[0].data, state.isPercentage ? income * (parseInt(curr_split.percentage)/100) : 100 * (parseInt(curr_split.amount)/income)],
                    }
                ]
            }))
            setState(prevState => ({...prevState, tracker: prevState.tracker + (state.isPercentage ? parseInt(curr_split.percentage) : parseInt(curr_split.amount)) }))
            // setPercentage(prev => prev += parseInt(curr_split.percentage))
            setSplits({type:'add', id:id_split.current, value:curr_split})  // Add split to render list
            setCurrSplit(initial_curr_split)    // Resets the form
            id_split.current += 1 
        }
    }

    const edit = (id, info, newTracker) => {
        let index = splits.findIndex(split => split.id === id)
        setConfig(prevState => {
            let labels = prevState.labels
            let datasets = prevState.datasets[0]
            labels[index] = info.name
            datasets.data[index] = state.isPercentage ? income * (parseInt(info.percentage)/100) : (info.amount/income) * 100
            return { labels, datasets:[datasets] }
        })
        setState(state => ({...state, tracker:newTracker}))
        // setPercentage(newPercentage)
        setSplits({type:'edit', value: info, id:id})
    }

    const remove = (id) => {
        let index = splits.findIndex(split => split.id === id)
        setConfig(state => {
            let labels = [...state.labels]
            const datasets = [...state.datasets]
            const dataset = {...datasets[0]}
            const data = [...dataset.data]
            labels.splice(index, 1)
            data.splice(index, 1)
            console.log(data)
            return {labels, datasets:[
                {
                    ...dataset,
                    data: [...data]
                }
            ]}
        })
        setSplits({'type':'remove', 'id': id})
    }

    const recalculate = () => {
        setState(state => ({...state, hasRecalculate:false}))
        
        let newData = []
        splits.forEach(split => {
            state.isPercentage
            ?   newData.push(income * (parseInt(split.percentage)/100))
            :   newData.push(100 * (parseInt(split.amount)/income))
        })
        setConfig(state => ({
            ...state, 
            datasets: [
                state.datasets[0] = {
                    ...state.datasets[0],
                    data: [...newData]
                }
            ]
        }))
    }
    return { income, change_income, splits, add, edit, remove, config, curr_split, setCurrSplit, recalculate, state, change }
}

export default useIncomeSplit

const initial_curr_split = {
    id: 0,
    name:'',
    percentage:'',
    amount:'',
    color:''
}

const initialSplit = []

const reducer = (state, action) => {
    switch(action.type){

        case 'add':
            return [
                ...state,
                {
                    ...action.value,
                    id: action.id
                }
            ]
        case 'remove':
            var newState = state.filter(split => split.id !== action.id)
            return [
                ...newState
            ]

        case 'edit':
            let object = state.filter(split => split.id === action.id)[0]
            object.name = action.value.name
            object.percentage = action.value.percentage
            object.amount = action.value.amount
            return [
                ...state
            ]

        default:
            return initialSplit
    }
}

const initialPieChart = {
    labels:[],
    datasets:[{
        label:'Income Distribution',
        data: [],
        backgroundColor:[
            "#ffd700",
            "#ffb14e",
            "#fa8775",
            "#ea5f94",
            "#cd34b5",
            "#9d02d7",
            "#0000ff"
    ],
        hoverOffset:5
    }],
}
// 'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',