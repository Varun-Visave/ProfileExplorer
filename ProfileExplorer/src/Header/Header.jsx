import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <h1>ProfileExplorer</h1>
        <p style={taglineStyle}>Discover Profiles. Explore Locations.</p>
      </div>
      <nav style={navStyle}>
        <ul style={navListStyle}>
          <li style={navItemStyle}><a href="#home" style={linkStyle}>Home</a></li>
          <li style={navItemStyle}><a href="#profiles" style={linkStyle}>Profiles</a></li>
          <li style={navItemStyle}><a href="#about" style={linkStyle}>About</a></li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#f8f9fa",
  borderBottom: "2px solid #e9ecef"
};

const logoStyle = {
  textAlign: "left"
};

const taglineStyle = {
  margin: "0",
  fontSize: "14px",
  color: "#6c757d"
};

const navStyle = {
  textAlign: "center",
  flex:1,
};

const navListStyle = {
  listStyleType: "none",
  margin: "0",
  justifyContent: "center",
  padding: "0",
  display: "flex",
  flex: "1",
  gap: "5em"
};

const navItemStyle = {};

const linkStyle = {
  textDecoration: "none",
  color: "#007bff",
  fontSize: "16px"
};

export default Header;
