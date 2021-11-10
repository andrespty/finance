import React from 'react'
import { Box, Heading, Button } from '@chakra-ui/react'
import useCompounding from './useCompounding'
import CompoundingForm from '../Forms/CompoundingForm'

function CompoundingInterest() {

    const { info, modify} = useCompounding()

    return (
        <Box>
            <Heading>Compounding Effect</Heading>

            <CompoundingForm info={info} modify={modify} />

            <Button onClick={() => console.log(info)}>Log</Button>

        </Box>
    )
}

export default CompoundingInterest
