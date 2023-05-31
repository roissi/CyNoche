// Import necessary components from Chakra UI and Font Awesome
import { Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// The StarRating component receives the rating and size as props
const StarRating = ({ rating, size }) => {
  return (
    // Box acts as a container for the star icons
    <Box as="span" className="rating">
      {/* [...Array(5)] creates an array of five undefined elements. map() is used to create a star icon for each element in the array. */}
      {[...Array(5)].map((_, i) => {
        // If the current index is less than the rating, create a filled star or a half-filled star
        if (rating > i) {
          // If the rating has a decimal part greater than or equal to 0.5, and the current index is equal to the floor value of the rating, create a half-filled star
          if (i === Math.floor(rating) && rating % 1 >= 0.5) {
            return <FontAwesomeIcon key={i} icon={['fas', 'star-half-alt']} color="goldenrod" size={size} />
          }

          // Else, create a full filled star
          return <FontAwesomeIcon key={i} icon={['fas', 'star']} color="goldenrod" size={size} />
        }

        // If the current index is greater or equal to the rating, create an empty star
        return <FontAwesomeIcon key={i} icon={['far', 'star']} color="#808080" size={size} />
      })}
    </Box>
  )
}

export default StarRating;