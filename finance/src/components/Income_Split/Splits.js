import React from 'react'
import { Box } from '@chakra-ui/react'
import EditableSplit from './EditableSplit'


function Splits({ splits, actions, state }) {

    return (
        <Box>

            {
                splits.map((split, key) => (
                    <EditableSplit key={key} split={split} actions={actions} state={state} />
                ))
            }

        </Box>
    )
}

export default Splits