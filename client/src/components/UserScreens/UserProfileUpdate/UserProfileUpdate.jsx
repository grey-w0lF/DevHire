import { React, useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfileUpdate.css";
import { Grid, TextField, Radio } from "@material-ui/core";
import { toast } from "react-toastify";
import Alert from "../../../components/Layout/Buttons/Alert";
import BTN_PRIMARY from "../../Layout/Buttons/BTN_PRIMARY";
// import {
//   updateUserProfile,
//   getUserProfile,
// } from "../../../features/auth/authSlice";
import {
  updateUserProfile,
  getUserProfile,
  resetProfile,
} from "../../../features/profile/profileSlice";

const UserProfileUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoading, message, userProfile } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(getUserProfile());
      navigate("/my-profile");
    }
    dispatch(resetProfile());
  }, [isSuccess, userProfile, dispatch, navigate]);

  const [avatarImage, setAvatarImage] = useState();
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [website, setWebsite] = useState();
  const [location, setLocation] = useState();
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState();
  const [openToWork, setOpenToWork] = useState();
  const [status, setStatus] = useState();
  const [bio, setBio] = useState();
  const [skills, setSkills] = useState();
  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  const [linkedin, setLinkedin] = useState();
  const [instagram, setInstagram] = useState();
  const [telegram, setTelegram] = useState();
  const [github, setGithub] = useState();
  const [imageSelected, setImageSelected] = useState();

  const onProfileimgUpload = async () => {
    try {
      if (!name) {
        toast.error("Name Field is Required Field");
      } else if (!imageSelected) {
        toast.error("Please Select an image To Upload");
      } else {
        if (imageSelected) {
          const formData = new FormData();
          formData.append("file", imageSelected);
          formData.append(
            "upload_preset",
            `${process.env.REACT_APP_UPLOAD_PRESET}`
          );
          const response = await axios.post(
            "//api.cloudinary.com/v1_1/devhire/image/upload",
            formData
          );
          if (response) {
            // console.log(response.data.secure_url);
            setAvatarImage(response.data.secure_url);
            toast.info("Image Uploaded");
            // console.log(avatarImage);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable To Upload The image");
    }
  };
  const onFormSubmit = async () => {
    if (imageSelected && !avatarImage) {
      toast.error("Please Upload The Selected Image First");
    } else {
      const updateData = {
        avatar: avatarImage,
        name: name,
        company: company,
        website: website,
        gender: gender,
        dob: dob,
        openToWork: openToWork,
        status: status,
        bio: bio,
        skills: skills,
        facebook: facebook,
        linkedin: linkedin,
        twitter: twitter,
        instagram: instagram,
        github: github,
        telegram: telegram,
      };

      try {
        const response = dispatch(updateUserProfile(updateData));
        if (response) {
        }
      } catch (error) {
        console.log(error);
        toast.error("Unable To Update Profile");
      }
    }
  };

  //
  const inputLabelStyles = {
    color: "grey",
    fontWeight: "900",
    fontFamily: "IBM Plex Sans",
    fontSize: "1.7rem",
  };
  const inputStyles = {
    fontSize: 18,
    width: "35rem",
    margin: "0.2rem",
  };
  return (
    <div className="updateProfileMainContainer">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid
          container
          className="updateProfileUpperContainer"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <h5 className="updateProfileHeader">Update Your Profile</h5>
          </Grid>
          <Grid item>
            <img
              className="updateProfileImg"
              alt="profileImg"
              src="./images/blank-user.png"
            ></img>
          </Grid>
          <Grid item>
            <input
              type="file"
              className="profileImgInput"
              onChange={(e) => {
                setImageSelected(e.target.files[0]);
              }}
              // onClick={()=>{}}
            />
            <i
              className="fas fa-cloud-upload"
              onClick={onProfileimgUpload}
              title="Upload"
            ></i>
          </Grid>
          <Grid item>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <h5 className="Gender">Gender</h5>
              </Grid>
              <Grid item>
                <span className="genderOpt">M</span>
                <Radio
                  className="genderRadio"
                  onChange={(e) => {
                    setGender("Male");
                  }}
                />
                <span className="genderOpt">F</span>
                <Radio
                  className="genderRadio"
                  onChange={(e) => {
                    setGender("Female");
                  }}
                />
                <span className="genderOpt">T</span>
                <Radio
                  className="genderRadio"
                  onChange={(e) => {
                    setGender("Transgender");
                  }}
                />
              </Grid>
              <Grid item>
                <span className="dateOfBirth">Date of Birth</span>
                <input
                  type="date"
                  value={dob}
                  className="datePicker"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                ></input>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          className="updateProfileLowerContainer"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item className="openToWork" style={{ marginTop: "1.2rem" }}>
            <span className="AvailableToWork">Available To Work</span>
            <Radio
              style={{ color: "green" }}
              onChange={(e) => {
                setOpenToWork(true);
              }}
            />
            <Radio
              style={{ color: "red" }}
              onChange={(e) => {
                setOpenToWork(false);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-helperText"
              label="Your Name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              style={{ marginTop: "1rem" }}
              inputProps={{ style: inputStyles }}
              defaultValue=""
              helperText=""
              InputLabelProps={{ style: inputLabelStyles }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-helperText"
              label="Your Company"
              name="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              defaultValue=""
              helperText=""
              InputLabelProps={{ style: inputLabelStyles }}
              style={{ marginTop: "2rem" }}
              inputProps={{ style: inputStyles }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-helperText"
              inputProps={{ style: inputStyles }}
              label="Your Website Link"
              name="website"
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
              defaultValue=""
              helperText=""
              style={{ marginTop: "2rem" }}
              InputLabelProps={{ style: inputLabelStyles }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-helperText"
              inputProps={{ style: inputStyles }}
              label="Your Skills"
              name="skills"
              value={skills}
              onChange={(e) => {
                setSkills(e.target.value);
              }}
              defaultValue=""
              onClick={() => {
                toast.info(
                  "Enter Your Skills Seperated By Single Comma example: html,css,javascript"
                );
              }}
              style={{ marginTop: "2rem" }}
              InputLabelProps={{ style: inputLabelStyles }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-select-currency-native"
              inputProps={{ style: inputStyles }}
              select
              label="Profession"
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              SelectProps={{
                native: true,
              }}
              style={{ marginTop: "2rem" }}
              InputLabelProps={{ style: inputLabelStyles }}
            >
              <option></option>
              <option>Software Developer</option>
              <option>Software Tester</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Database Handler</option>
              <option>Software Quality Assurencer</option>
              <option>Software Developer</option>
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Bio"
              name="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
              multiline
              maxRows={4}
              inputProps={{ style: inputStyles }}
              style={{ marginTop: "2rem" }}
              InputLabelProps={{ style: inputLabelStyles }}
            />
          </Grid>
          <Grid item style={{ marginTop: "20px", marginBottom: "20px" }}>
            <h5
              className="updateProfileHeader"
              style={{ color: "darkslategray", fontWeight: "600" }}
            >
              Update Your Social Media Information
            </h5>
            <Grid item>
              <TextField
                id="outlined-helperText"
                label="Facebook Profile Link"
                name="facebook"
                value={facebook}
                onChange={(e) => {
                  setFacebook(e.target.value);
                }}
                style={{ marginTop: "2rem" }}
                inputProps={{ style: inputStyles }}
                defaultValue=""
                helperText=""
                InputLabelProps={{ style: inputLabelStyles }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-helperText"
                label="Twitter Profile Link "
                name="twitter"
                value={twitter}
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
                style={{ marginTop: "2rem" }}
                inputProps={{ style: inputStyles }}
                defaultValue=""
                helperText=""
                InputLabelProps={{ style: inputLabelStyles }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-helperText"
                label="LinkedIn Profile Link"
                name="linkedin"
                value={linkedin}
                onChange={(e) => {
                  setLinkedin(e.target.value);
                }}
                style={{ marginTop: "2rem" }}
                inputProps={{ style: inputStyles }}
                defaultValue=""
                helperText=""
                InputLabelProps={{ style: inputLabelStyles }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-helperText"
                label="Instagram Profile Link"
                name="instagram"
                value={instagram}
                onChange={(e) => {
                  setInstagram(e.target.value);
                }}
                style={{ marginTop: "2rem" }}
                inputProps={{ style: inputStyles }}
                defaultValue=""
                helperText=""
                InputLabelProps={{ style: inputLabelStyles }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-helperText"
                label="Telegram Profile Link"
                name="telegram"
                value={telegram}
                onChange={(e) => {
                  setTelegram(e.target.value);
                }}
                style={{ marginTop: "2rem" }}
                inputProps={{ style: inputStyles }}
                defaultValue=""
                helperText=""
                InputLabelProps={{ style: inputLabelStyles }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-helperText"
                label="Github Profile Link"
                name="github"
                value={github}
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
                style={{ marginTop: "2rem" }}
                inputProps={{ style: inputStyles }}
                defaultValue=""
                helperText=""
                InputLabelProps={{ style: inputLabelStyles }}
              />
            </Grid>
          </Grid>
          <BTN_PRIMARY
            type="submit"
            title="Submit"
            className="submitButton"
            onClick={onFormSubmit}
          />
        </Grid>
      </Grid>
      <Alert />
    </div>
  );
};

export default UserProfileUpdate;
