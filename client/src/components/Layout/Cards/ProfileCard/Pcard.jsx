import React from "react";
import "./Pcard.css";
import { Card, Grid } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const Pcard = (props) => {
  const navigate = useNavigate();

  return (
    <div className="cardOuter">
      <Card className="Pcard">
        <Grid container justifyContent="" AlignItems="left">
          <Grid item>
            <img className={props.avatarClass} src={props.profilePic} />
          </Grid>
          <Grid item>
            <p className="devName">{props.cardName}</p>
            <p className={props.subnameClass}>{props.cardSubName}</p>
          </Grid>
          <Grid item>
            <i className="fas fa-ellipsis-v"></i>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <img className="cardMedia" src={props.cardPic}></img>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Grid item style={{ merginTop: "0.5rem" }}>
            <p className="Profession">
              Profession :
              <span style={{ color: "#f8f9fa", marginLeft: "0.5rem" }}>
                {props.profession}
              </span>
            </p>
          </Grid>
          <Grid item>
            <Grid container style={{ marginTop: "1rem" }}>
              <Grid item>
                <Link to={`/profile/${props.userId}`}>
                  <i className="fas fa-address-card"></i>
                </Link>
              </Grid>
              <Grid item>
                <i className="fab fa-hire-a-helper"></i>
              </Grid>
              <Grid item>
                <a href={"mailto:" + props.mailLink} target="_blank">
                  <i className="fas fa-envelope cardenvelopeIcon"></i>
                </a>
              </Grid>
              <Grid item>
                <i className="fas fa-plus"></i>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Pcard;
