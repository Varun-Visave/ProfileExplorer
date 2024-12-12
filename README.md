# Profile Explorer

Profile Explorer is a web application that allows users to view a collection of user profiles and explore their associated addresses interactively on a map. Designed using React and Vite, this project demonstrates robust front-end development and user-friendly features.

---

## Features

1. **Profile Display**: View a list of profiles with names, photographs, and brief descriptions.
2. **Interactive Mapping**: Explore addresses interactively using a map integrated with Leaflet.js.
3. **Summary Button**: A dedicated button displays the map with a marker for the selected profile's address.
4. **Profile Management**: Admin panel to add, edit, or delete profiles efficiently.
5. **Search and Filter**: Search and filter profiles by name or location to enhance navigation.
6. **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
7. **Profile Details**: Detailed view of profiles, including contact information and interests.
8. **Loading Indicators**: Feedback indicators for data fetching and map rendering.
9. **Error Handling**: Robust validation for invalid addresses or map service errors.
10. **Integration**: Uses external mapping services like Leaflet for rendering locations dynamically.

---

## Tech Stack

- **Frontend**: React, Vite, Leaflet.js, React-Leaflet, MUI (Material-UI)
- **Backend**: Node.js, Express, MongoDB
- **Styling**: Emotion, Styled Components
- **State Management**: React Hooks and Context API

---



## Installation Guide

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB instance or Atlas connection string.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/profile-explorer.git

Or download the repository as a ZIP file and extract it.

2. Navigate to the project directory:
    ```
    cd ProfileExplorer

3. Install the dependencies:
    ```
    npm install

4. Set up the .env file:

    Create a .env file in the root of the project.
    Add the following variable:
    ```
    MONGO_URI=<your_mongo_db_connection_string>

    Replace <your_mongo_db_connection_string> with your MongoDB connection string.

5. Run the development server:
    ```
    npm run dev

This starts both the Node.js backend and the Vite-powered frontend.

6.  Build the project for production:
    ```
    npm run build

---    

### Folder Structure:
```
└── 📁ProfileExplorer
    └── 📁public
        └── vite.svg
    └── 📁src
        └── 📁About
            └── About.css
            └── About.jsx
        └── 📁assets
            └── Profile.js
        └── 📁CardGrid
            └── 📁ProfileCard
                └── ProfileCard.css
                └── ProfileCard.jsx
            └── CardGrid.css
            └── CardGrid.jsx
        └── 📁Header
            └── Header.css
            └── Header.jsx
        └── 📁SearchBar
            └── SearchBar.css
            └── SearchBar.jsx
        └── App.css
        └── App.jsx
        └── index.css
        └── main.jsx
        └── Profile.js
        └── server.js
    └── .env
    └── .gitignore
    └── eslint.config.js
    └── index.html
    └── package-lock.json
    └── package.json
    └── README.md
    └── vite.config.js
```
