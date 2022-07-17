import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import Alert from "../../../components/Layout/Buttons/Alert";
import BTN_PRIMARY from "../../Layout/Buttons/BTN_PRIMARY";
import { resetProfile } from "../../../features/profile/profileSlice";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userProfile, isError, isSuccess, isLoading } = useSelector(
    (state) => state.profile
  );
  useEffect(() => {
    if (isSuccess) {
      dispatch(resetProfile());
    }
  }, [isSuccess]);
  if (isError) {
    toast.info("Please Add Your Profile First");
  }
  return (
    <div className="UserProfileMainContainer">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid
          container
          justifyContent="flex-end"
          className="editButtonContainer"
        >
          <Grid item style={{ margin: "2rem 2rem 0 0" }}>
            <BTN_PRIMARY
              title="Edit Profile"
              className="editProfileButton"
              onClick={() => {
                navigate("/update-profile");
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
          className="profileContainer"
        >
          <Grid item>
            <img
              src={
                userProfile
                  ? `${userProfile.avatar}`
                  : "./images/blank-user.png"
              }
              className="userProfileImage"
              alt="profile-image"
            ></img>
          </Grid>
          <Grid item>
            {userProfile ? (
              <h5 className="userName">{userProfile.name}</h5>
            ) : (
              "Your Name"
            )}
          </Grid>
          <Grid item>
            {userProfile ? (
              <h5 className="userBio">{userProfile.bio}</h5>
            ) : (
              "Bio"
            )}
          </Grid>
          <Grid item>
            <h5 className="profession">
              {userProfile ? `${userProfile.status}` : "Profession"}
            </h5>
          </Grid>
          <Grid item>
            <span className="user-email">
              {userProfile ? `${userProfile.email}` : "Your Email"}
            </span>
            <a
              href="mailto: abc@example.com"
              style={{
                marginLeft: "1rem",
                fontSize: "1.8rem",
                color: "rgb(25,63,82)",
              }}
            >
              <i className="fas fa-envelope"></i>
            </a>
          </Grid>
          <Grid item>
            <h5 className="user-gender-Dob">Gender DateofBirth</h5>
          </Grid>
          <Grid item>
            <h5 className="gender-Dob-Data">
              {userProfile ? userProfile.gender : ""}{" "}
              {userProfile ? userProfile.dob : ""}
            </h5>
          </Grid>
          <Grid item>
            <Grid container direction="row" style={{ marginTop: "3rem" }}>
              <Grid item>
                {userProfile ? (
                  <a href={`${userProfile.social.facebook}`} target="_blank">
                    <i className="fab fa-facebook-square socialMediaIcons"></i>
                  </a>
                ) : null}
              </Grid>
              <Grid item>
                {userProfile ? (
                  <a href={`${userProfile.social.twitter}`} target="_blank">
                    <i className="fab fa-twitter-square socialMediaIcons"></i>
                  </a>
                ) : null}
              </Grid>
              <Grid item>
                <a
                  href={userProfile ? `${userProfile.social.linkedin}` : ""}
                  target="_blank"
                >
                  <i className="fab fa-linkedin socialMediaIcons"></i>
                </a>
              </Grid>
              <Grid item>
                <a
                  href={userProfile ? `${userProfile.social.telegram}` : ""}
                  target="_blank"
                >
                  <i className="fab fa-telegram socialMediaIcons"></i>
                </a>
              </Grid>
              <Grid item>
                <a
                  href={userProfile ? `${userProfile.social.instagram}` : ""}
                  target="_blank"
                >
                  <i className="fab fa-instagram-square socialMediaIcons"></i>
                </a>
              </Grid>
              <Grid item>
                <a
                  href={userProfile ? `${userProfile.social.github}` : ""}
                  target="_blank"
                >
                  <i className="fab fa-github-square socialMediaIcons"></i>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              style={{ marginTop: "2rem" }}
            >
              <Grid item>
                <h5 className="company">
                  Company : {userProfile ? userProfile.company : ""}
                  <a
                    href={userProfile ? `${userProfile.company}` : ""}
                    target="_blank"
                  >
                    {" "}
                    <i
                      className="fas fa-link"
                      style={{ marginLeft: "1rem" }}
                    ></i>
                  </a>
                </h5>
              </Grid>
              <Grid item>
                <h5 className="website">
                  Website : {userProfile ? userProfile.website : ""}
                  <a
                    href={userProfile ? `${userProfile.website}` : ""}
                    target="_blank"
                  >
                    <i
                      className="fas fa-link"
                      style={{ marginLeft: "1.5rem" }}
                    ></i>
                  </a>
                </h5>
              </Grid>
            </Grid>
          </Grid>
          {userProfile ? (
            <Grid item xs={12} md={6}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <Grid item>
                  <h5 className="userSkillHeader">Skills</h5>
                </Grid>

                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={5}
                  style={{ marginTop: "0.5rem" }}
                >
                  <Grid item>
                    {userProfile.skills.map((item, i) => {
                      return (
                        <h6 className="SkillItem" key={i}>
                          {item}
                        </h6>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      /
      <Alert />
    </div>
  );
};

export default UserProfile;
