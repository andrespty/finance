import { Box, Center, Heading } from '@chakra-ui/layout';
import Homepage from './views/Homepage/Homepage';

function App() {
  return (
    <Box paddingTop='env(safe-area-inset-top)'>

    <Center>
      <Heading>Finance</Heading>
    </Center>

    <Homepage />

    </Box>
  );
}

export default App;
