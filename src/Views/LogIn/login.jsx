import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import login from "../../assets/logiin.png";
import * as Yup from "yup";
import axiosApi from "../../config/axios";
import { Formik, Field } from "formik";
export default () => {
  const SigninSchema = Yup.object().shape({
    userName: Yup.string().required("Username required"),
    password: Yup.string().required("Password required"),
  });
  const navigate = useNavigate();
  const signin = (data) => {
    console.log(data, "data user");
    axiosApi
      .post("http://localhost:5000/auth/signIn", {
        userName: data.userName,
        password: data.password,
      })
      .then((res) => {
        console.log(res, "Res");
        if (res.status === 201) {
          localStorage.setItem("user", JSON.stringify(res.data));
          if (res.data.user.items === "Admin") {
            navigate("/employeelist");
          } else {
            navigate("/project");
          }
        }
      })
      .catch((err) => {
        console.log(err.response, "error login");
      });
  };
  return (
    <>
      <Navbar />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center " data-wow-delay="0.1s">
            <h4 className="section-title bg-white text-center text-color px-4">
              {" "}
              Sign In
            </h4>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <Formik
                  initialValues={{
                    userName: "",
                    password: "",
                  }}
                  validationSchema={SigninSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    //alert(JSON.stringify(values, null, 2));
                    console.log("vvvaaaaaallll", values);
                    //!fonctionregister
                    signin(values);
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="userName"
                              placeholder="username"
                              name="userName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.userName}
                            />
                            {errors.userName && touched.userName ? (
                              <span className="haserror">
                                {errors.userName}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            {errors.password && touched.password ? (
                              <span className="haserror">
                                {errors.password}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-lg-5 col-sm-12">
                          <button
                            className="btn btn-main btn-round-full"
                            type="submit"
                            onClick={handleSubmit}
                          >
                            LogIn
                          </button>
                        </div>
                        <span className="mt-3">
                          {" "}
                          Already Have An Account?{" "}
                          <Link to="/authentication" className="text-color ">
                            Sign Up{" "}
                          </Link>
                        </span>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
              <div className="col-6">
                <div className="row justify-content-center align-items-center ml-5">
                  <div>
                    <img src={login} alt className="img-fluid rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
