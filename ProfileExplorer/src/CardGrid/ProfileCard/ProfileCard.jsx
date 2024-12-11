import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import "./ProfileCard.css";
import Spinner from 'react-bootstrap/Spinner';

const ProfileCard = ({ id, name, description, address, image }) => {
  const [showModal, setShowModal] = useState(false);
  const [latLong, setLatLong] = useState(null);  // To store latitude and longitude
  const [loading, setLoading] = useState(false);

  // Function to get latitude and longitude from address using Nominatim API
  const getCoordinates = async (address) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];  // Get the first result
        setLatLong({ lat: parseFloat(lat), lon: parseFloat(lon) });
      } else {
        alert("Address not found.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    getCoordinates(address);  // Fetch coordinates when modal opens
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="profile-card">
      <div className="container">
        <div className="profile-image">
          <img
            src={image || "https://via.placeholder.com/150"}
            alt={`${name}'s profile`}
          />
        </div>

        {/* Displaying the profile details */}
        <div className="profile-details">
          <h3>Name: {name}</h3>
          <p>
            <b>Description:</b> {description}
          </p>
          <p>
            <b>Address:</b> {address}
          </p>
        </div>
      </div>
      {/* Summary button */}
      <button className="summary-button" onClick={handleOpenModal}>
        Summary
      </button>

      {/* Modal for displaying profile summary */}
      <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogTitle>Profile Summary</DialogTitle>
        <DialogContent>
          <img
            src={image || "https://via.placeholder.com/150"}
            alt={`${name}'s profile`}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <div className="modal-content">
            <h3>Name: {name}</h3>
            <p>
              <b>Description:</b> {description}
            </p>
            <p>
              <b>Address:</b> {address}
            </p>
          </div>

          {/* Conditionally render the map based on latitude and longitude */}
          {latLong ? (
            <MapContainer
              center={[latLong.lat, latLong.lon]}
              zoom={13}
              style={{ width: "100%", height: "300px", marginTop: "20px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[latLong.lat, latLong.lon]}>
                <Popup>{name}'s Location</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p>{loading ? <>Loading map...<Spinner animation="grow" /></> : "Unable to load map."}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileCard;
