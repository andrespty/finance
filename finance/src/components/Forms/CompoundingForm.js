import React from 'react'
import { FormControl, FormLabel, FormHelperText, Box, Select, Stack } from "@chakra-ui/react"
import InputNumber from '../Inputs/InputNumber'

function CompoundingForm({ info, modify }) {
    return (
        <Box>
            <FormField label='Initial Investment' helper='Initial investment' isRequired={true}>
                <InputNumber precision={2} placeholder='Initial Investment' min={0} value={info.initial} onChange={value => modify('initial', value)} />
            </FormField>
            
            <FormField label='Monthly contribution' helper='Recurrent contribution each month' isRequired={false}>
                <InputNumber precision={2} placeholder='Monthly Contribution' min={0} value={info.recurrent} onChange={value => modify('recurrent', value)} />
            </FormField>

            <Stack direction='row' align='center' spacing={3} >
                <FormField label='Time (in years)' helper='Length of time in years' isRequired={true}>
                    <InputNumber placeholder='Time' min={0} value={info.years} onChange={value => modify('years', parseInt(value))} />
                </FormField>

                <FormField label='Interest Rate' helper='Estimated interest rate' isRequired={true}>
                    <InputNumber precision={2} placeholder='Interest rate' min={0} value={info.rate} onChange={value => modify('rate', value)} />
                </FormField>
            </Stack>

            <FormField label='Frequency' helper='Compounding frequency' isRequired={true}>
                <Select value={info.frequency} onChange={e => modify('frequency', e.target.value)} >
                    <option value='anually'>Anually</option>
                    <option value='semianually'>Semianually</option>
                    <option value='quarterly'>Quarterly</option>
                    <option value='monthly'>Monthly</option>
                </Select>
            </FormField>
        </Box>
    )
}

export default CompoundingForm

const FormField = ({ label, helper, isRequired, children }) => {
    return (
        <FormControl isRequired={isRequired} my={2}>
            <FormLabel m={0}>{label}</FormLabel>
            { children }
            <FormHelperText m={0}>{helper}</FormHelperText>
        </FormControl>
    )
}