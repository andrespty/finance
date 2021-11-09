import React from 'react'
import { NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper } from "@chakra-ui/react"

function InputNumber({placeholder, ...props}) {
    return (
        <NumberInput {...props} >
            <NumberInputField placeholder={placeholder}/>
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}

export default InputNumber
