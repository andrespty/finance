import { Box, Center, Heading } from '@chakra-ui/layout';
import Homepage from './views/Homepage/Homepage';

function App() {
  return (
    <Box style={{padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'}}>

    <Center>
      <Heading>Finance</Heading>
    </Center>

    <Homepage />

    </Box>
  );
}

export default App;
