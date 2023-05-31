import { useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

// The ColorModeToggle component allows the user to toggle the color mode (light/dark) of the app
const ColorModeToggle = () => {
  // Chakra-UI's useColorMode hook provides colorMode (current color mode) and toggleColorMode (function to toggle the color mode)
  const { colorMode, toggleColorMode } = useColorMode();
  
  // useColorModeValue is a Chakra-UI hook that returns the first argument if the current color mode is light, 
  // and the second argument if the current color mode is dark. In this case, it is used to adjust the color of the icon.
  const iconColor = useColorModeValue("black", "white");

  return (
    <IconButton
      aria-label="Toggle color mode"
      // Icon is chosen based on the current color mode
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      // onClick handler toggles the color mode
      onClick={toggleColorMode}
      color={iconColor}
    />
  );
};

export default ColorModeToggle;