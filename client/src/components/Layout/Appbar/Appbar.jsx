import { React, useState } from "react";
import "./Appbar.css";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ToolBar from "@material-ui/core/ToolBar";
import Grid from "@material-ui/core/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser, reset } from "../../../features/auth/authSlice";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { toast } from "react-toastify";

const Appbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { User } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.profile);

  const onLogout = () => {
    dispatch(logOutUser());
    window.reload();
    dispatch(reset());
    navigate("/");
  };
  const onMyProfile = () => {
    if (!userProfile) {
      toast.info("Please Add Your Profile First");
    }
  };

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openNavDrawer, setOpenNavDrawer] = useState(false);

  return (
    <>
      <AppBar position="static" style={{ boxShadow: "none" }}>
        <div className="Appbar">
          <ToolBar disableGutters>
            <Link to="/">
              <img
                alt="Company Logo"
                src="./images/navLogo.png"
                className="navLogo"
              />
            </Link>
            <Link to="/" className="brandName">
              DevHire
            </Link>
            <Grid container>
              <Grid container justifyContent="flex-end" alignItems="center">
                {User ? (
                  <>
                    <Grid item className="userNameOnNavbar">
                      {User.name}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item>
                      <Link to="/register" className="navTabs MediumScreenTabs">
                        <i className="fa-solid fa-user-plus"></i> Register
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/login" className="navTabs MediumScreenTabs">
                        <i className="fas fa-angle-double-down"></i> Login
                      </Link>
                    </Grid>
                  </>
                )}
                <Grid item>
                  <img
                    className="UserProfilePic"
                    alt="User Profile Pic"
                    src={
                      userProfile
                        ? `${userProfile.avatar}`
                        : "./images/blank-user.png"
                    }
                    onClick={() => {
                      setOpenNavDrawer(!openNavDrawer);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </ToolBar>
        </div>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={openNavDrawer}
          onClose={() => {
            setOpenNavDrawer(false);
          }}
          onOpen={() => {
            setOpenNavDrawer(true);
          }}
        >
          <Grid
            container
            direction="column"
            className="UserDrawerContainer"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item className={User ? null : "UserDrawerDisplay"}>
              <img
                className="UserProfilePicDrawer"
                alt="User Profile Pic"
                src={
                  userProfile
                    ? `${userProfile.avatar}`
                    : "./images/blank-user.png"
                }
              />
            </Grid>
            <Grid item>
              {User ? <h1 className="UserNameDrawer">{User.name}</h1> : null}
            </Grid>
          </Grid>
          <List className="SwipeableDrawer">
            {User ? (
              <>
                <ListItem>
                  <Link
                    to="/my-profile"
                    onClick={onMyProfile}
                    className="SwipableDrawerItems"
                  >
                    <i className="fa-solid fa-id-card"></i> My Profile
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    to=""
                    className="SwipableDrawerItems"
                    onClick={onLogout}
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </Link>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Link
                    to="/register"
                    className="SwipableDrawerItems"
                    onClick={() => {
                      setOpenNavDrawer(false);
                    }}
                  >
                    <i className="fa-solid fa-user-plus"></i> Register
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="/login"
                    className="SwipableDrawerItems"
                    onClick={() => {
                      setOpenNavDrawer(false);
                    }}
                  >
                    <i className="fas fa-angle-double-down"></i> Login
                  </Link>
                </ListItem>
              </>
            )}
            <ListItem>
              <Link
                to="/aboutus"
                className="SwipableDrawerItems"
                onClick={() => {
                  setOpenNavDrawer(false);
                }}
              >
                <i className="fa-solid fa-magnifying-glass-location"></i> About
                Us
              </Link>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </AppBar>
    </>
  );
};

export default Appbar;
