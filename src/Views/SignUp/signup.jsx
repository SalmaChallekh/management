import { Link, useNavigate } from "react-router-dom";
import signup1 from "../../assets/signup1.png";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axiosApi from "../../config/axios";
export default () => {
  const Swal = require("sweetalert2");
  const SignupSchema = Yup.object().shape({
    fullName: Yup.string().required("FullName required"),
    userName: Yup.string().required("Username required"),
    adress: Yup.string().required("Adress required"),
    city: Yup.string().required("City required"),
    zipCode: Yup.number().required("ZipCode required"),
    email: Yup.string().email("Invalid Email").required("Email required"),
    phone: Yup.number().required("Phone required"),
    password: Yup.string()
      .min(6, "Password must contain at least 6 characters")
      .required("Password required"),
    passwordConfirm: Yup.string()
      .required("Confirmation required")
      .oneOf([Yup.ref("password")], "Password and confirmation must match"),
    //tick: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });

  const navigate = useNavigate();

  const signup = (data) => {
    console.log(data, "data user");
    axiosApi
      .post("http://localhost:5000/users", {
        items: "Employee",
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        city: data.city,
        zipCode: data.zipCode,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      })
      .then((res) => {
        console.log(res, "Res");
        if (res.status === 201) {
          console.log("User Created");
          Swal.fire("Success!", "User Added Successfully", "success");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.response, "Error create employee");
      });
  };
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center " data-wow-delay="0.1s">
            <div className="col-6">
              <h4 className="section-title bg-white text-center text-color px-4">
                {" "}
                Sign Up Employee
              </h4>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-12">
                <Formik
                  initialValues={{
                    fullName: "",
                    userName: "",
                    password: "",
                    email: "",
                    phone: "",
                    adress: "",
                    city: "",
                    zipCode: "",
                    //tick: false,
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    //alert(JSON.stringify(values, null, 2));
                    console.log("vvvaaaaaallll", values);
                    //!fonctionregister
                    signup(values);
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
                              id="fullname"
                              placeholder="FullName"
                              name="fullName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.fullName}
                            />
                            {errors.fullName && touched.fullName ? (
                              <span className="haserror">
                                {errors.fullName}
                              </span>
                            ) : null}
                          </div>
                        </div>
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
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            {errors.email && touched.email ? (
                              <span className="haserror">{errors.email}</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              id="phone"
                              placeholder="Phone"
                              name="phone"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phone}
                            />
                            {errors.phone && touched.phone ? (
                              <span className="haserror">{errors.phone}</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="adress"
                              placeholder="Adress"
                              name="adress"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.adress}
                            />
                            {errors.adress && touched.adress ? (
                              <span className="haserror">{errors.adress}</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              placeholder="City"
                              name="city"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.city}
                            />
                            {errors.city && touched.city ? (
                              <span className="haserror">{errors.city}</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              id="zipcode"
                              placeholder="ZipCode"
                              name="zipCode"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.zipCode}
                            />
                            {errors.zipCode && touched.zipCode ? (
                              <span className="haserror">{errors.zipCode}</span>
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
                        <div className="col-12">
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              id="passwordConfirm"
                              placeholder="Confirm Password"
                              name="passwordConfirm"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.passwordConfirm}
                            />
                            {errors.passwordConfirm &&
                            touched.passwordConfirm ? (
                              <span className="haserror">
                                {errors.passwordConfirm}
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
                            Sign Up Employee
                          </button>
                        </div>
                        <span className="mt-3">
                          {" "}
                          Already Have An Account?{" "}
                          <Link to="/login" className="text-color ">
                            Log In{" "}
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
                    <img
                      src={signup1}
                      alt
                      className="img-fluid rounded"
                      width="80%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
