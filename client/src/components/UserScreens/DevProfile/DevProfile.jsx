import { React, useEffect, useState } from "react";
import "./DevProfile.css";
import { useParams } from "react-router-dom";
import {
  getDevProfileById,
  resetProfile,
} from "../../../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@material-ui/core";

const DevProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDevProfileById(userId));
    // dispatch(resetProfile());
  }, []);

  const { currDevProfile } = useSelector((state) => state.profile);
  console.log(currDevProfile);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "5rem", marginBottom: "5rem" }}
      >
        <Grid item className="mainInfo" xs={12} md={6}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="imgContainer"
          >
            <Grid item>
              <img
                className="userImg"
                src={
                  currDevProfile
                    ? currDevProfile
                      ? currDevProfile.avatar
                      : "/Images/blank-user.png"
                    : null
                }
              ></img>
            </Grid>
            <Grid item>
              <Grid container direction="row" className="subInformation">
                <Grid item>
                  {currDevProfile ? <h1>{currDevProfile.gender}</h1> : null}
                </Grid>
                <Grid item>
                  {currDevProfile ? <h1>{currDevProfile.dob}</h1> : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {currDevProfile ? (
                <h1 className="emailInfo">{currDevProfile.email}</h1>
              ) : null}
            </Grid>
            <Grid item style={{ marginBottom: "0.8rem" }}>
              {currDevProfile ? (
                currDevProfile.openToWork ? (
                  <h1 className="emailInfo">
                    Available To Work{" "}
                    <i
                      className="fa-solid fa-circle"
                      style={{
                        color: "green",
                        fontSize: "1.2rem",
                        marginLeft: "0.5rem",
                      }}
                    ></i>
                  </h1>
                ) : (
                  <h1 className="emailInfo">
                    Currently Unavailable{" "}
                    <i
                      style={{
                        color: "red",
                        fontSize: "1.2rem",
                        marginLeft: "0.5rem",
                      }}
                      className="fa-solid fa-circle"
                    ></i>
                  </h1>
                )
              ) : null}
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              backgroundColor: "#65fefe",
              minWidth: "30rem",
              borderRadius: "5px",
            }}
            justifyContent="space-evenly"
            alignItems="center"
            direction="row"
          >
            <Grid item className="profileKey">
              <h1>Name</h1>
              <h1>Profession</h1>
              <h1>Company</h1>
              <h1>Website</h1>
            </Grid>
            <Grid item className="profileKeyValues">
              {currDevProfile ? <h1>{currDevProfile.name}</h1> : null}
              {currDevProfile ? <h1>{currDevProfile.status}</h1> : null}
              {currDevProfile ? (
                <a href={currDevProfile.company}>{currDevProfile.company}</a>
              ) : null}
              <h1>
                {" "}
                {currDevProfile ? (
                  <a href={currDevProfile.website}>{currDevProfile.website}</a>
                ) : null}
              </h1>
            </Grid>
          </Grid>
          <Grid item>
          <h1 className="skillHeader">Skills</h1>
            <ul className="skillList">
              {currDevProfile
                ? currDevProfile.skills.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })
                : null}
            </ul>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className="socialBar1">
            {/* <Grid item>
              <a href="www.telegram.com">
                <i className="fab fa-telegram"></i>
              </a>
            </Grid>
            <Grid item>
              <a>
                <i className="fab fa-facebook"></i>
              </a>
            </Grid>
            <Grid item>
              <a>
                <i className="fab fa-instagram-square"></i>
              </a>
            </Grid>
            <Grid item>
              <a>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </Grid>
            <Grid item>
              <a>
                <i className="fab fa-github-square"></i>
              </a>
            </Grid>
            <Grid item>
              <a>
                <i className="fab fa-twitter-square"></i>
              </a>
            </Grid> */}
            <ul className="socialList">
              <li>
                <a
                  href={currDevProfile ? currDevProfile.social.telegram : null}
                  target="_blank"
                >
                  <i className="fab fa-telegram"></i>
                </a>
              </li>
              <li>
                {" "}
                <a
                  href={currDevProfile ? currDevProfile.social.facebook : null}
                  target="_blank"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href={currDevProfile ? currDevProfile.social.linkedin : null}
                  target="_blank"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                {" "}
                <a
                  href={currDevProfile ? currDevProfile.social.instagram : null}
                  target="_blank"
                >
                  <i className="fab fa-instagram-square"></i>
                </a>
              </li>
              <li>
                {" "}
                <a
                  href={currDevProfile ? currDevProfile.social.github : null}
                  target="_blank"
                >
                  <i className="fab fa-github-square"></i>
                </a>
              </li>
              <li>
                {" "}
                <a
                  href={currDevProfile ? currDevProfile.social.twitter : null}
                  target="_blank"
                >
                  <i className="fab fa-twitter-square"></i>
                </a>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DevProfile;
