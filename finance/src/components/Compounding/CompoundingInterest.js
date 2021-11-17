import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import useCompounding from './useCompounding'
import CompoundingForm from '../Forms/CompoundingForm'
import BarChart from '../Charts/BarChart'
import { formatter } from '../../utils/utilFunctions'

function CompoundingInterest() {

    const { info, modify, config, final_amount } = useCompounding()

    return (
        <Box>
            <Heading>Compounding Effect</Heading>

            <BarChart config={config} />
            
            <Text size='lg' >Final amount after {info.years} years:</Text>
            <Heading size='2xl'>{formatter(final_amount)}</Heading>
            <CompoundingForm info={info} modify={modify} />


        </Box>
    )
}

export default CompoundingInterest
