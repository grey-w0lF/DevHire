import React from "react";
import "./Footer.css";
import Grid from "@material-ui/core/Grid";
import BTN_CIRCULAR from "../Buttons/BTN_CIRCULAR";
import { Link } from "react-router-dom";

const Footer = () => {
  //Fetching Current Year For CopyRight
  const currentYear = new Date();

  return (
    <>
      <div>
        <div className="footerContainer1">
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* <Grid item>
              <BTN_CIRCULAR title={<i class="fa-solid fa-arrow-up"></i>} />
            </Grid> */}
            <Grid item>
              <i className="fa-solid fa-comment-exclamation"></i>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            className="footerContainer2"
          >
            <Grid item>
              <Grid container direction="row">
                <Grid item>
                  <a href="https://twitter.com/bhv85860955" target="_blank">
                    <i className="fa-brands fa-twitter footerSocialIcons"></i>
                  </a>
                </Grid>
                <Grid item>
                  <a>
                    <i className="fa-brands fa-telegram footerSocialIcons"></i>
                  </a>
                </Grid>
                <Grid item>
                  <a
                    href="https://www.instagram.com/grey_w.0.l.f/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-instagram-square footerSocialIcons"></i>
                  </a>
                </Grid>
                <Grid item>
                  <a>
                    <i className="fa-brands fa-linkedin footerSocialIcons"></i>
                  </a>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row">
                <Grid item>
                  <h4 className="footerLinksh4">About Us || </h4>
                </Grid>
                <Grid item>
                  <h4 className="footerLinksh4">Support || </h4>
                </Grid>
                <Grid item>
                  <h4 className="footerLinksh4">Marketing || </h4>
                </Grid>
                <Grid item>
                  <h4 className="footerLinksh4">Privacy & Policy</h4>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <h4 className="copyRightString">
                &copy; {currentYear.getFullYear()} grey_w0lf
              </h4>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Footer;
