import React from "react";
import "./Error404.css";
import { Grid } from "@material-ui/core";

const Error404 = () => {
  return (
    <div className="Error404MainContainer">
      <Grid container direction="row" style={{ marginTop: "2rem" }}>
        <Grid item xs={12} md={6}>
          <h1
            style={{
              margin: "8rem",
              fontSize: "5rem",
              fontWeight: 300,
              color: "rgb(25,63,82)",
            }}
          >
            404 Oops! Page Not Found
          </h1>
          <h5
            style={{
              marginLeft: "8rem",
              fontSize: "2rem",
              fontWeight: 300,
              color: "rgb(110, 110, 110)",
            }}
          >
            There are two main reasons why a visitor might end up on a 404 error
            page:
            <br /> <br />
            1: A company has removed a certain content from their website or
            changed its URL <br />
            <br />
            2:a person mistyped the URL which is not uncommon in our mobile era.
            So the 404 error means someone has messed up.{" "}
          </h5>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="/images/firstlogo.png"
            style={{ width: "400px" }}
          ></img>
        </Grid>
      </Grid>
    </div>
  );
};

export default Error404;
