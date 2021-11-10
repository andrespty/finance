import { Box, Center, Heading, ButtonGroup, Button, Divider, Stack } from '@chakra-ui/react';
import Homepage from './views/Homepage/Homepage';
import CompoundingPage from './views/Compounding_Interest/CompoundingPage';
import { Routes, Route, Link } from 'react-router-dom'
function App() {
  return (
    <Box h='100vh'>

    <Center m={3} >
      <Stack direction='column' w='40%'>
        <Heading align='center'>Finance</Heading>
        <Divider />
      </Stack>
    </Center>

    <Center>
      <ButtonGroup variant='ghost' size='sm'>
        <Link to='/'><Button>Split</Button></Link>
        <Link to='/compounding'><Button>Compounding</Button></Link>
      </ButtonGroup>
    </Center>
    
    <Routes>

      <Route path='compounding' element={<CompoundingPage />} /> 
    
      <Route path='/' element={<Homepage />} /> 
    
    </Routes>

    </Box>
  );
}

export default App;
