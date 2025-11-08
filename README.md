# How to Run the Project:

git clone https://github.com/gargiPunyani/frontend-assessment-gargi.git

cd star-wars-app-assessmennt

npm install

npm run dev

## Login credentials

username: admin@gmail.com

password: admin123

## Features Implemented:

1. Fetch & Display Characters
Use the /people endpoint to list Star Wars characters.
Implement pagination (since the API is paginated).
Include loading and error handling states (e.g., when the API fails).
2. Character Cards
Show each character’s name and a random image (you can use Picsum Photos or similar).
Each card should have a distinct background or accent color based on species.
Clicking on a card should open a modal or expanded section showing more details.
3. Character Details
In the modal/expanded view, display the following:
  Name, Height, Mass, Date added, Number of films the person appears in Birth year, Homeworld details: name, terrain, climate, and population
4. Responsiveness
The UI should look clean and work seamlessly on mobile, tablet, and desktop screen sizes.

## Bonus Features

Pagination + Search

Fetches all characters once and handles pagination + search locally.

Allows real-time filtering on the same page (no API re-calls).

### Mock Authentication:
Implemented a simple login/logout using fake credentials and a mocked JWT token.
  
Protected Routes

Characters page is accessible only when logged in.

Token persists after refresh.

Reusable Axios Instance

Configured base URL, headers, and error handling in a single file for scalability.

# Design & Code Decisions

All characters fetched once to make search and filters instant and avoid API pagination complexity.

Used Context API instead of Redux/React Query to keep state management lightweight.

Tailwind CSS used for faster, consistent styling with responsive design in mind.

Split into modular, reusable components (Card, HeroModal, SearchBar, FilterModal) to maintain code clarity.

Login flow mimics a real-world token-based system but fully mocked — ideal for demo purposes.
