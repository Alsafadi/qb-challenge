# QB Coding Challenge

My submission for the QB code challenge.

_Clone the repo and run `docker-compose up --build`_

**Access the application**:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)
- MySQL Database: localhost:3306

## 📋 Updated State after Challenge completion:

### Backend (`/backend`)

The backend is a **Node.js/Express** application that provides a REST API for products.

The backennd has been updated to include:

- clean file structure with added security and organization.
- error handling and proper logging.
- middleware for error handling and rate limitation.
- routes, query parameter validation, controllers, and services.

**Updated API Endpoints:**

- `/products`: endpoint for getting a set amount of products in each api request.
- `/productinfo`: endpoint to get information about a specific array of products.
- `/categories`: endpoint to get unique categories from all products.
- `/health` endpoint for monitoring
- Docker configuration for easy deployment

### Frontend (`/frontend`)

The frontend is a **Next.js 14** application with React 19.
The front end has been updated as follow:

### UI/UX updates:

- HeroUI has been added as a component library. Changes to docker set up has been implemented to allow for its installation.
- Framer motion is used to add animation for a pleasent UX.
- Toast Provider used to provide info to user (current use case: item added to cart)
- Grid and List view can be toggled through a button on the top of the page.
- List vew automatically selected for mobile view.
- Fuzzy search using Fuse.js has been implemented to search through the already loaded products (does NOT search through database; can be implemented).  
  _NOTE: search prevents infinite scrolling._
- category filtration has been implemented for loaded products.
- Cart can now be opened in a modal to show information on the items in the cart. `/productinfo` endpoint is used to get information on item and prices. (the current state retrieves all product info, future improvement: update backend to only get name and price to lowr api response size).
- Items that are added to cart are marked.

### Implementation of useContext to handle Cart items addition:

In order to handle addition of items to the cart, `useCart()` Context provider has been implemented.
The cart is automatically updated when user clicks add to cart.
Item Deletion and Cart emptying was NOT implemented as API file had a note to ensure keeping it unchanged. (In a real life situation, changing this file would require coordination with others).

### Implementation of Infinite Scroll.

Infinite scrool has been implemented in the ProductGrid component:

1. **Loads more products** as the user scrolls down
2. HeroUI `<Spinner />` component added while loading
3. New fetched products are added to the current product list.
4. Framer motion animation is added and calculated to smooething add items one after another.
5. Image blur is used to load images.

## Room for improvements in a real life situation:

1. Product image optimization to fix the slow loading of images. (Current fix is to use blur image placeholder.)
2. More reporting in the `Toaster` to provide info to userr.
3. Add (+/-) buttons to allow adding more than 1 count of a product.
4. Pre-loading of products before user reaches the end of the page.

---

_This challenge is designed to evaluate your practical skills with modern web technologies. Focus on creating a working solution that demonstrates your understanding of React, state management, and API integration._
