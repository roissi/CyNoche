import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';

const SortButtons = ({ setSort }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack mb={4} spacing={4} direction='row' align='center'>
        <Button colorScheme='teal' size='md' onClick={() => setSort('name_asc')}>Name (A-Z)</Button>
        <Button colorScheme='teal' size='md' onClick={() => setSort('name_desc')}>Name (Z-A)</Button>
        <Button colorScheme='teal' size='md' onClick={() => setSort('year_asc')}>Year (old - new)</Button>
        <Button colorScheme='teal' size='md' onClick={() => setSort('year_desc')}>Year (new - old)</Button>
      </Stack>
      <Stack mb={10} spacing={4} direction='row' align='center'>
        <Button colorScheme='teal' size='md' onClick={() => setSort('director_asc')}>Director (A-Z)</Button>
        <Button colorScheme='teal' size='md' onClick={() => setSort('director_desc')}>Director (Z-A)</Button>
        <Button colorScheme='teal' size='md' onClick={() => setSort('rating_asc')}>Rating (0-5)</Button>
        <Button colorScheme='teal' size='md' onClick={() => setSort('rating_desc')}>Rating (5-0)</Button>
      </Stack>
    </Box>
  );
};

export default SortButtons;