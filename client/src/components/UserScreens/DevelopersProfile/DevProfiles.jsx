import { React, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DevProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import Pcard from "../../Layout/Cards/ProfileCard/Pcard";
import {
  getAllProfile,
  resetProfile,
} from "../../../features/profile/profileSlice";
import Loader from "../../Layout/Loader/Loader";

const DevProfiles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, allProfiles } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getAllProfile());
  }, []);

  return (
    <div className="DevProfilesMainContainer">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid container justifyContent="space-evenly">
            {allProfiles
              ? allProfiles.map((value, idx) => {
                  return (
                    <>
                      <Grid item>
                        <Pcard
                          profilePic={value.avatar}
                          avatarClass={
                            value.openToWork
                              ? `cardAvatarActive`
                              : "cardAvatarDeActive"
                          }
                          subnameClass={
                            value.openToWork ? `openToWork1` : "openToWork0"
                          }
                          cardSubName={
                            value.openToWork ? `Open To Work` : "Unavailable"
                          }
                          cardName={value.name}
                          mailLink={value.email}
                          cardPic={value.avatar}
                          profession={value.status}
                          userId={value.user}
                        />
                      </Grid>
                    </>
                  );
                })
              : null}
          </Grid>
        </>
      )}
    </div>
  );
};

export default DevProfiles;
