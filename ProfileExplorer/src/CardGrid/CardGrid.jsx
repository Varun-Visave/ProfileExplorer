import React from "react";
import ProfileCard from "./ProfileCard/ProfileCard.jsx";
import profiles from "../assets/Profile.js";
import './CardGrid.css';

const CardGrid = () => {
  return (
    <div className="card-grid">
      {profiles.map(profile => (
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
  );
};

export default CardGrid;
