import Header from "./Header/Header.jsx";
import CardGrid from "./CardGrid/CardGrid.jsx";
import "./App.css";
import About from "./About/About.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header /> {/* Include Header component */}
        <Routes>
          {/* Define the home route with CardGrid */}
          <Route path="/" element={<CardGrid />} />
          <Route path="/home" element={<CardGrid />} />

          {/* Define the About page route */}
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
