import React, { useState } from 'react'
import { Input, Stack, IconButton, Text, ButtonGroup } from '@chakra-ui/react'
import { CloseIcon, EditIcon, CheckIcon, MinusIcon } from '@chakra-ui/icons'
import InputNumber from '../Inputs/InputNumber'

function EditableSplit({ split, actions, state }) {
    const isEqual = state.isPercentage ? state.tracker === 100 : state.tracker === parseInt(state.income)
    const isLess = state.isPercentage ? state.tracker < 100 : state.tracker < parseInt(state.income)
    const bar = state.isPercentage ? 100 : state.income
    const { edit, remove } = actions
    const [ info, setInfo ] = useState({...split})
    const [ isEditing, setIsEditing ] = useState(false)

    let difference =  parseInt(info[state.option]) - parseInt(split[state.option])

    const submit = () => {
        if (isEqual && info[state.option] > split[state.option]){
            // do nothing
            console.log('Do Nothing 1')
        }
        else if ( isLess && difference + state.tracker > bar){
            // do nothing
            console.log('Do Nothing 2')
        }
        else if ( isLess && difference + state.tracker <= bar ){
            // Accept change
            let newPercentage = state.tracker + difference
            edit(split.id, info, newPercentage)
            setIsEditing(false)
        }
        else if ( isEqual && info[state.option] < split[state.option]){
            // Accept change
            let newPercentage = state.tracker + difference
            edit(split.id, info, newPercentage)
            setIsEditing(false)
        }
        else{
            console.log('Nothing')
            console.log(isEqual)
        }
    }

    const cancel = () => {
        setIsEditing(false)
        setInfo({...split})
    }

    const handle_remove = () => remove(split.id)

    if (isEditing){
        return(
            <Stack direction='row'>
                <Input 
                    placeholder='Name' 
                    value={info.name} 
                    onChange={e => setInfo(state => ({...state, name:e.target.value}))}
                />

                <InputNumber 
                    placeholder={capitalize(state.option)} 
                    value={info[state.option]} 
                    onChange={value => setInfo(prevState => ({...prevState, [state.option]:value}))}
                    min={0}
                />

                <ButtonGroup>
                    <IconButton icon={<CheckIcon />} onClick={submit} />
                    <IconButton icon={<CloseIcon />} onClick={cancel} />
                </ButtonGroup>

            </Stack>
        )
    }
    else{
        return (
            <Stack direction='row' alignItems='center'>
                <IconButton icon={<MinusIcon />} variant='ghost' onClick={handle_remove} />
                
                <Text fontSize='xl' fontWeight='bold' >
                    {
                        state.isPercentage
                        ? `${split.percentage}% ($${get_amount(split.percentage, state.income)})  ${split.name}`
                        : `$${split.amount} (${get_percentage(split.amount, state.income)}%) ${split.name}`
                    }
                </Text>
                
                <IconButton onClick={() => setIsEditing(true)} icon={<EditIcon />} variant='ghost' />
            </Stack>
        )
    }
    
}

export default EditableSplit

const capitalize = (str) => {
    const lower = str.toLowerCase()
    return str.charAt(0).toUpperCase() + lower.slice(1)
}

const get_percentage = (portion, total) => {
    return (100 * (portion/total)).toFixed(2)
}

const get_amount = (percentage, total) => {
    return ((percentage/100) * total).toFixed(2)
}