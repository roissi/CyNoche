// Import the `extendTheme` function from Chakra UI, which will allow us to customize the default Chakra UI theme
import { extendTheme } from "@chakra-ui/react"

// Create a new theme that extends the default Chakra UI theme
const theme = extendTheme({
  // Customize the colors property
  colors: {
    // Add a new color called "goldenrod" with the color code "#daa520"
    goldenrod: "#daa520",
  },
})

// Export the new theme so it can be used in other parts of the application
export default theme;