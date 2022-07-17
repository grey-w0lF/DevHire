import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import "./UserLanding.css";

const UserLanding = () => {
  const { User } = useSelector((state) => state.auth);
  const [landingSearchBar, setLandingSearchBar] = useState("");

  const onSearch = () => {
    console.log(landingSearchBar);
  };
  return (
    <div className="userLandingMainContainer">
      <div className="topBorder"></div>
      <Grid
        container
        direction="column"
        alignItems="center"
        className="firstBox"
      >
        <Grid item>
          <h1 className="userWelcome">Welcome Back {`${User.name}`} !</h1>
        </Grid>
        <Grid item>
          <img
            alt="Company Logo"
            src="./images/firstLogo.png"
            className="landingLogo"
          ></img>
        </Grid>
        <Grid item>
          <input
            className="landingSearchBar"
            placeholder="Search Your Requirement"
            name="searchBar"
            value={landingSearchBar}
            onChange={(e) => {
              setLandingSearchBar(e.target.value);
            }}
          />
          <span>
            <i className="fas fa-search" onClick={onSearch}></i>
          </span>
        </Grid>

        <Grid item>
          <img className="landingImg1" src="./images/landingImg1.png"></img>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "2rem" }}
        >
          <Grid item style={{ marginRight: "5rem" }}>
            <i className="fas fa-users landingIcons"></i>
            <br />
            <Button component={Link} to="./hireteam" className="landingBtn">
              Hire a team
            </Button>
          </Grid>
          <Grid item style={{ marginLeft: "5rem" }}>
            <i class="fas fa-user-cog landingIcons"></i>
            <br />
            <Button component={Link} to="./hirenow" className="landingBtn">
              Hire Now
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserLanding;
