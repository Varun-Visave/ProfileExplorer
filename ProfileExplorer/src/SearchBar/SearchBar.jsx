import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { List, ListItemText, ListItem } from "@mui/material";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // User input
  const [profiles, setProfiles] = useState([]); // All profiles from the backend
  const [filteredProfiles, setFilteredProfiles] = useState([]); // Filtered profiles to display

  // Fetch profiles from the backend once when the component is mounted
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profiles");
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on the search query
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredProfiles([]); // Clear the filtered results when search is empty
    } else {
      // Filter profiles by id or name
      const filtered = profiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.id.toString().includes(searchQuery)
      );
      setFilteredProfiles(filtered); // Update the filtered profiles list
    }
  };

  return (
    <div className="profile-search">
      {/* Search Bar */}
      <TextField
        label="Search by ID or Name"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleSearch} // Call handleSearch on each input change
      />

      {/* Display search results */}
      <List>
        {query.trim() && filteredProfiles.length > 0
          ? filteredProfiles.map((profile) => (
              <ListItem key={profile._id}>
                <ListItemText
                  primary={`${profile.name} (${profile.id})`}
                  secondary={profile.description}
                />
              </ListItem>
            ))
          : query.trim() === "" && (
              <></>
            )
        }
      </List>
    </div>
  );
};

export default SearchBar;
