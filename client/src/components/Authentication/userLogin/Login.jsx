import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { loginUser, reset } from "../../../features/auth/authSlice";
import { useFormik, Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Alert from "../../../components/Layout/Buttons/Alert";
import BTN_PRIMARY from "../../Layout/Buttons/BTN_PRIMARY";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserProfile } from "../../../features/profile/profileSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isLoading, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(getUserProfile());
      navigate("/");
    }
    dispatch(reset());
  }, [isSuccess, message, navigate, dispatch]);

  //**********Animate Form Spinner */

  const [formSpinner, setFormSpinner] = useState(false);

  //Login Form Validations
  let formValidate = true;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (!values.email) {
        toast.error("Email Field is Required");
        formValidate = false;
      }
      if (!values.password) {
        toast.error("Password Field is Required");
        formValidate = false;
      }

      if (formValidate) {
        dispatch(loginUser(values));
      } else {
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
          <Formik>
            <Form onSubmit={formik.handleSubmit}>
              <Grid item className="inputContainer">
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
                    <i className="fa-solid fa-at"></i>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      placeholder="Email"
                      className="loginInputField"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email ? (
                      <Alert message={formik.errors.email} />
                    ) : null}
                  </Grid>

                  <Grid item className="emailInputField">
                    <i className="fa-solid fa-key"></i>
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      placeholder="Password"
                      className="loginInputField"
                    />
                    {formik.errors.password ? (
                      <Alert message={formik.errors.password} />
                    ) : null}
                  </Grid>

                  <Grid item className="emailInputField">
                    {/* <Button variant="contained" className="loginButton">
                  Login
                </Button> */}
                    <BTN_PRIMARY
                      title="LOGIN"
                      type="submit"
                      onClick={() => {
                        setFormSpinner(true);
                      }}
                    />
                  </Grid>
                  <Grid item className="emailInputField">
                    <p className="loginFormQuery">
                      Don't have an account ?{" "}
                      <Link to="/register" className="loginFormQueryLink">
                        Sign Up
                      </Link>{" "}
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </Grid>
      <Alert />
    </div>
  );
};

export default Login;
