// Import the library function from the @fortawesome/fontawesome-svg-core module
import { library } from '@fortawesome/fontawesome-svg-core';

// Import the specific icons from the @fortawesome/free-solid-svg-icons and @fortawesome/free-regular-svg-icons module.
// Note that we are renaming the faStar from the free-solid-svg-icons as solidStar to avoid a naming collision with the faStar from free-regular-svg-icons
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

// Call the add function on the library object, passing the icons we wish to use.
// This function essentially registers these icons with the library, so we can use them elsewhere in my app.
library.add(solidStar, regularStar, faStarHalfAlt);