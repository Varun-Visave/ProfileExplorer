import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard/ProfileCard.jsx";
import "./CardGrid.css";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar.jsx";

const CardGrid = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Profiles");
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []); // Run once on component mount

  return (
    <>
      <SearchBar />
      <div className="card-grid">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            id={profile.id}
            name={profile.name}
            image={profile.photo}
            description={profile.description}
            address={profile.address}
          />
        ))}
      </div>
    </>
  );
};

export default CardGrid;
