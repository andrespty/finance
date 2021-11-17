import React from 'react'
import { Box, Center } from '@chakra-ui/layout';
import { Pie } from 'react-chartjs-2';

function PieChart({config}) {

    return (
        <Center>
            <Box w={400}>
                <Pie  data={config}/>
            </Box>
        </Center>
    )
}

export default PieChart
