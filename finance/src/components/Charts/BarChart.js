import React from 'react'
import { Box, Center } from '@chakra-ui/layout';
import { Line } from 'react-chartjs-2';

function BarChart({config}) {
    return (
        <Center>
            <Box w={400}>
                <Line  data={config} options={options}  />
            </Box>
        </Center>
    )
}

export default BarChart

export const initial_config = {
    labels: [],
    datasets: [],
}

const options = {
    plugins: {
        tooltip: {
            intersect:false,
            position:'nearest',
            callbacks:{
                title: function(context) {
                    let label = context[0].label || ''
                    let newLabel = 'Year ' + label
                    return newLabel;
                },
                label: (context) => {
                    return context.dataset.label + ': $' + context.formattedValue
                }
            }
        }
    },
    scales: {
        y: {
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return '$' + value;
                }
            },
            display:(context) => {
                if (context.scale.ticks.length > 0){
                    return true
                }
                return false
            }
        },
        xAxis:{
            title:{
                display:true,
                text:'Years'
            },
            display: (context) => {
                if (context.scale.ticks.length > 0){
                    return true
                }
                return false
            }
        }
    }
}
