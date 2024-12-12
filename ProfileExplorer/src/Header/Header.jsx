import React, { useState } from "react";
import "./Header.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Link } from "react-router-dom";
const Header = () => {
  //modal states
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");

  //field value trackers
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setphoto] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAction("");
  };

  const handleAction = (type) => {
    setAction(type);
  };

  //method which handles adding profile
  const handleAddProfile = async () => {
    const newProfile = { id, name, description, address, photo };
    console.log(newProfile);
    if (name === "" || description === "" || address === "" || photo === "") {
      return;
    }
    console.log(newProfile);

    try {
      // Send POST request using axios
      const response = await axios.post(
        "http://localhost:5000/api/profile",
        newProfile
      );

      if (response.status === 201) {
        alert("Profile added successfully");
        handleClose();
        window.location.reload();
      } else {
        alert("Failed to add profile: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding profile");
    }
  };
  //method which handles deleting of profiles
  const handleRemoveProfile = async () => {
    if (!id) {
      alert("Please provide a valid ID to remove the profile");
      return;
    }

    try {
      // Send DELETE request using axios
      const response = await axios.delete(
        `http://localhost:5000/api/profile/${id}`
      );

      if (response.status === 200) {
        alert("Profile removed successfully");
        handleClose();
        window.location.reload();
      } else {
        alert("Failed to remove profile: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error removing profile");
    }
  };

  //method which handles updating of profiles
  const handleUpdateProfile = async () => {
    if (!id) {
      alert("Please provide a valid ID to update the profile");
      return;
    }

    const updatedProfile = {};

    // Only add fields that are not empty
    if (name) updatedProfile.name = name;
    if (description) updatedProfile.description = description;
    if (address) updatedProfile.address = address;
    if (photo) updatedProfile.photo = photo;

    if (Object.keys(updatedProfile).length === 0) {
      alert("Please provide at least one field to update.");
      return;
    }

    try {
      // Send PUT request using axios to update the profile by ID
      const response = await axios.put(
        `http://localhost:5000/api/profile/${id}`,
        updatedProfile
      );
      if (response.status === 200) {
        alert("Profile updated successfully");
        handleClose();
        window.location.reload();
      } else {
        alert("Failed to update profile: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating profile");
    }
  };

  const renderFields = () => {
    switch (action) {
      case "add":
        return (
          <>
            <p>Adding Profile :</p>

            <TextField
              label="Id"
              fullWidth
              margin="normal"
              onChange={(e) => setId(e.target.value)}
              required
            />
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <TextField
              label="Photo URL"
              fullWidth
              margin="normal"
              onChange={(e) => setphoto(e.target.value)}
              required
            />
            <button className="summary-button" onClick={handleAddProfile}>
              Add
            </button>
          </>
        );
      case "update":
        return (
          <>
            <p>Updating Profile :</p>
            <TextField
              label="ID"
              fullWidth
              margin="normal"
              required
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="Photo URL"
              fullWidth
              margin="normal"
              onChange={(e) => setphoto(e.target.value)}
            />
            <button className="summary-button" onClick={handleUpdateProfile}>
              Update
            </button>
          </>
        );
      case "remove":
        return (
          <>
            <p>Removing Profile :</p>
            <TextField
              label="ID"
              fullWidth
              margin="normal"
              required
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <button className="summary-button" onClick={handleRemoveProfile}>
              Remove
            </button>
          </>
        );
      default:
        return (
          <DialogContentText>
            Choose an action to manage the profiles.
          </DialogContentText>
        );
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>ProfileExplorer</h1>
          <p className="tagline">Discover Profiles. Explore Locations.</p>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {/* <a href="#profiles" className="nav-link">
                Profiles
              </a> */}
              <Link to="/Profiles" className="nav-link">
                Profiles
              </Link>
            </li>
            <li className="nav-item">
              {/* Link to About Page */}
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Edit
        </Button>
      </header>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="manage-profiles-dialog"
      >
        <DialogTitle id="manage-profiles-dialog">Manage Profiles</DialogTitle>
        <DialogContent>
          {renderFields()}
          <div className="btn-grp">
            <Button
              onClick={() => handleAction("add")}
              variant="outlined"
              color="success"
            >
              Add Profile
            </Button>
            <Button
              onClick={() => handleAction("update")}
              variant="outlined"
              color="info"
            >
              Update Profile
            </Button>
            <Button
              onClick={() => handleAction("remove")}
              variant="outlined"
              color="error"
            >
              Remove Profile
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
