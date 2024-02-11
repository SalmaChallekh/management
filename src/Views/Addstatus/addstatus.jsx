import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import axiosApi from "../../config/axios";
import { useState, useEffect } from "react";
export default () => {
  const Swal = require("sweetalert2");
  const [status, setstatus] = useState("");
  const addStatus = () => {
    let data = {
      status: status,
    };
    console.log(data, "data project");
    axiosApi
      .post("http://localhost:5000/status", data)
      .then((res) => {
        console.log(res, "Res");
        if (res.status === 201) {
          console.log("status Created");
          Swal.fire("Success!", "status Added Successfully", "success");
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
          <div className="col-12">
            {/*   <Link to="/projectlist" className="btn btn-main btn-round-full float-right">List Of  Projects</Link> */}
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h3 className="section-title bg-white text-center text-color px-3">
              Add Status
            </h3>
          </div>
          <div className="col-lg-6 col-md-12  container">
            <div className="row g-3">
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    placeholder="Status"
                    onChange={(e) => setstatus(e.target.value)}
                  />
                </div>
              </div>
              <div className=" col-sm-8">
                <button
                  className="btn btn-main"
                  class="btn btn-main btn-round-full float-right"
                  onClick={addStatus}
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
