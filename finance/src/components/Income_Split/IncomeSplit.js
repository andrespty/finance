import React from 'react'
import { Heading, Button, Flex, Spacer, Stack, Input, Select, Box, Grid, GridItem } from '@chakra-ui/react'
import useIncomeSplit from './useIncomeSplit'
import Splits from './Splits'
import InputNumber from '../Inputs/InputNumber'
import PieChart from '../Charts/PieChart'
import { formatter } from '../../utils/utilFunctions'

function IncomeSplit() {

    const { income, change_income, splits, add, edit, remove, config, curr_split, setCurrSplit, recalculate, state, change } = useIncomeSplit()

    return (
        <Box>

            <Heading>Income Split</Heading>
            
            <Flex>
                <Heading>{ formatter(income) }</Heading>

                <Spacer />

                <Select defaultValue='percentage' maxW={150} onChange={(e) => change(e.target.value)}>
                    <option value='percentage'>Percentage</option>
                    <option value='amount'>Amount</option>
                </Select>

            </Flex>

            <Grid templateColumns="repeat(6, 1fr)" >
                <GridItem colSpan={{base:6, md:2}}>
                    <Splits splits={splits} actions={{ edit, remove }} state={state} /> 
                </GridItem>
                <GridItem colSpan={{base:6, md:4}}>
                    <PieChart config={config} /> 
                </GridItem>
            </Grid>

            {/* Form for adding splits */}
            <Box>
                <Flex direction='row' my={2} >
                
                    <InputNumber placeholder='Income' onChange={value => change_income(value)} precision={2} maxW={500} />

                    <Spacer />

                    {
                        state.hasRecalculate
                        ?<Button onClick={recalculate} >Recalculate</Button>
                        : null
                    }
                    
                </Flex>

                <Stack direction={{base:'column', sm:'row'}}>
                    
                    <Input
                        placeholder='Name'
                        value={curr_split.name}
                        onChange={e => setCurrSplit(state => ({...state, name:e.target.value}))}
                    />
                    
                    <InputNumber 
                        placeholder={capitalize(state.option)} 
                        value={curr_split[state.option]}
                        onChange={value => setCurrSplit(prevState => ({...prevState, [state.option]:value}))}
                        min={0}
                        max={state.isPercentage ? 100 - state.tracker : income - state.tracker}
                    />

                    <Button variant='outline' colorScheme='green' onClick={add} isDisabled={state.isPercentage ? state.tracker === 100 : state.tracker === parseInt(state.income)}>
                        Add Split
                    </Button>

                </Stack>
            </Box>
            

        </Box>
    )
}

export default IncomeSplit
const capitalize = (str) => {
    const lower = str.toLowerCase()
    return str.charAt(0).toUpperCase() + lower.slice(1)
}