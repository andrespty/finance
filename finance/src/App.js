import { Box, Center, Heading } from '@chakra-ui/layout';
import Homepage from './views/Homepage/Homepage';
import CompoundingPage from './views/Compounding_Interest/CompoundingPage';
import { Routes, Route, Link } from 'react-router-dom'
function App() {
  return (
    <Box h='100vh'>

    <Center>
      <Heading>Finance</Heading>
    </Center>

    <Routes>

      <Route path='compounding' element={<CompoundingPage />} /> 
    
      <Route path='/' element={<Homepage />} /> 
    
    </Routes>

    </Box>
  );
}

export default App;
