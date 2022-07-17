import { React, useEffect } from "react";
import "./Landing.css";
import Grid from "@material-ui/core/Grid";
import Carousel from "react-material-ui-carousel";

const Landing = () => {
 

  var items = [
    {
      imgUrl: "./images/mappdev.png",
    },
    {
      imgUrl: "./images/wevdev.png",
    },
    {
      imgUrl: "./images/gdesigner.png",
    },
  ];
  return (
    <>
      {" "}
      <Grid
        container
        className="landingScreenWrapper"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Carousel className="landingCarousel" IndicatorIcon={null}>
          {items.map((item, i) => (
            <img className="carouselImg" key={i} src={item.imgUrl}></img>
          ))}
        </Carousel>
      </Grid>
    </>
  );
};

export default Landing;
