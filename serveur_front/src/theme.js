// import the `extendTheme` function from Chakra UI, which will allow us to customize the default Chakra UI theme
import { extendTheme } from "@chakra-ui/react"

// create a new theme that extends the default Chakra UI theme
const theme = extendTheme({
  // customize the colors property
  colors: {
    // add a new color called "goldenrod" with the color code "#daa520"
    goldenrod: "#daa520",
  },
})

// export the new theme so it can be used in other parts of the application
export default theme;