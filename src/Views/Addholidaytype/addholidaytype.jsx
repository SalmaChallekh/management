import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import axiosApi from "../../config/axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default () => {
  const Swal = require("sweetalert2");
  const [holiday, setholiday] = useState("");
  const addType = () => {
    let data = {
      holiday: holiday,
    };
    console.log(data, "data project");
    axiosApi
      .post("http://localhost:5000/holidays", data)
      .then((res) => {
        console.log(res, "Res");
        if (res.status === 201) {
          console.log("holiday Created");
          Swal.fire("Success!", "Type Added Successfully", "success");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <Navbar />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="col-12"></div>
          <div className="text-center " data-wow-delay="0.1s">
            <h3 className="section-title bg-white text-center text-color px-3">
              Add Type Of Holiday
            </h3>
          </div>
          <div className="col-lg-6 col-md-12  container">
            <div className="row g-3">
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="holiday"
                    placeholder="Type of holiday"
                    onChange={(e) => setholiday(e.target.value)}
                  />
                </div>
              </div>
              <div className=" col-sm-8">
                <button
                  className="btn btn-main"
                  class="btn btn-main btn-round-full float-right"
                  onClick={addType}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
