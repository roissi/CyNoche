import { Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarRating = ({ rating, size }) => {
  return (
    <Box as="span" className="rating">
      {[...Array(5)].map((_, i) => {
        if (rating > i) {
          if (i === Math.floor(rating) && rating % 1 >= 0.5) {
            return <FontAwesomeIcon key={i} icon={['fas', 'star-half-alt']} color="goldenrod" size={size} />
          }

          return <FontAwesomeIcon key={i} icon={['fas', 'star']} color="goldenrod" size={size} />
        }
        
        return <FontAwesomeIcon key={i} icon={['far', 'star']} color="#808080" size={size} />
      })}
    </Box>
  )
}

export default StarRating;