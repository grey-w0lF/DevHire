import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Register.css";
import validator from "validator";
import BTN_PRIMARY from "../../Layout/Buttons/BTN_PRIMARY";
import Alert from "../../../components/Layout/Buttons/Alert";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@material-ui/core/Grid";
import { useFormik, Formik, Form, Field } from "formik";
import { registerUser, reset } from "../../../features/auth/authSlice";
import mailService from "../../../features/emailJs";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { User, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  //**********Animate Form Spinner */

  const [formSpinner, setFormSpinner] = useState(false);

  //otp Validation
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [sotp, setSOtp] = useState("");
  const [matchOtp, setMatchOtp] = useState("");

  const sendOtp = () => {
    if (!formik.values.email) {
      toast.error("Email Field is Required");
    } else if (!formik.values.userName) {
      toast.error("Name Field is Required");
    } else if (!formik.values.password) {
      toast.error("Password Field is Required");
    } else {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }

      let otpParam = {
        user_name: formik.values.userName,
        user_email: formik.values.email,
        gen_otp: OTP,
      };
      // console.log(OTP);

      //
      if (mailService.sendMail(otpParam)) {
        setIsOtpSent(true);
        setMatchOtp(OTP);

        toast.info("Otp Sent Sucessfully");
      } else {
        setIsOtpSent(false);
      }
    }
  };

  //Form Validation*************************
  let formValidate = true;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || User) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, User, message, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      if (!values.userName) {
        toast.error("Name Field is Required");
        formValidate = false;
      }
      if (!values.email) {
        toast.error("Email Field is Required");
        formValidate = false;
      }
      if (!values.password) {
        toast.error("Password Field is Required");
        formValidate = false;
      }
      if (
        validator.isStrongPassword(values.password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
      } else {
        toast.error(
          "Min Password Length 8, Must contain a Uppercase,a LowerCase,a symbol character and a digit"
        );
        formValidate = false;
      }
      if (values.password != values.confirmPassword) {
        toast.error("Both Password Field Not Matched");
        formValidate = false;
      }
      if (sotp == matchOtp && formValidate) {
        console.log(values);
        dispatch(registerUser(values));
      } else {
        toast.error("Entered Otp Doesn't Matched");
        setFormSpinner(false);
      }
    },
  });

  return (
    <div className="loginScreenMainContainer">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="mainFormContainer"
      >
        <div className="FormContainer">
          <Grid item className="inputContainer">
            <Formik>
              <Form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src="./images/firstlogo.png"
                    alt="companyLogo"
                    className={
                      formSpinner
                        ? `loginFormSpinner1 rotate`
                        : `loginFormSpinner1`
                    }
                  ></img>
                  <Grid item className="emailInputField">
                    <i class="fa-solid fa-user-pen"></i>
                    <Field
                      name="userName"
                      value={formik.values.userName}
                      type="text"
                      placeholder="Username"
                      className="loginInputField"
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item className="emailInputField">
                    <i className="fa-solid fa-at"></i>
                    <Field
                      name="email"
                      value={formik.values.email}
                      type="email"
                      placeholder="Email"
                      className="loginInputField"
                      onChange={formik.handleChange}
                    />
                  </Grid>

                  <Grid item className="emailInputField">
                    <i className="fa-solid fa-key"></i>
                    <Field
                      name="password"
                      value={formik.values.password}
                      type="password"
                      placeholder="Password"
                      className="loginInputField"
                      onChange={formik.handleChange}
                    />
                  </Grid>

                  <Grid item className="emailInputField">
                    <i className="fa-solid fa-key"></i>
                    <Field
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      type="password"
                      placeholder="Confirm Password"
                      className="loginInputField"
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid
                    item
                    onClick={() => {
                      sendOtp();
                    }}
                  >
                    <p className="otpQuery">
                      Send Otp{" "}
                      <span>
                        {isOtpSent ? (
                          <>
                            <i className="fas fa-check-square"></i>
                          </>
                        ) : (
                          <i className="fas fa-external-link-square"></i>
                        )}
                      </span>
                    </p>
                  </Grid>
                  {isOtpSent ? (
                    <>
                      <p className="loginFormQuery">Please Enter The otp</p>
                      <input
                        type="text"
                        onChange={(e) => {
                          setSOtp(e.target.value);
                          console.log(sotp);
                        }}
                      ></input>
                    </>
                  ) : null}

                  <Grid item className="emailInputField">
                    <BTN_PRIMARY
                      title="SIGN UP"
                      type="submit"
                      className={sotp ? `` : "btn-disable"}
                      onClick={() => {
                        setFormSpinner(true);
                      }}
                    />
                  </Grid>
                  <Grid item className="emailInputField">
                    <p className="loginFormQuery">
                      Already have an account ?{" "}
                      <Link to="/login" className="loginFormQueryLink">
                        Login
                      </Link>{" "}
                    </p>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </div>
      </Grid>
      <Alert />
    </div>
  );
};

export default Register;
