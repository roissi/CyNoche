import { useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue("black", "white");

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      color={iconColor}
    />
  );
};

export default ColorModeToggle;