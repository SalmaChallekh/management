import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosApi from "../../config/axios";
import Select from "react-select";
export default () => {
  const Swal = require("sweetalert2");
  const styleData = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isFocused ? "bold" : "normal",
      color: state.isSelected ? "#FF4040" : "#FF4040",
      backgroundColor: state.isSelected ? "#A0A0A0" : "#FCFDFF",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "black",
      icon: state.data.icon,
    }),
    control: (provided) => ({
      ...provided,
      //borderColor:"#FF4040",
      focus: "#FF4040",
    }),
  };
  const [nationalholiday, setnationalholiday] = useState("");
  const [annualholiday, setannualholiday] = useState("");
  const [sickholiday, setsickholiday] = useState("");
  const [user, setuser] = useState("");
  const [listusers, setlistusers] = useState([]);
  const [list, setlist] = useState([]);
  const getallusers = async () => {
    axiosApi.get("http://localhost:5000/users").then((res) => {
      console.log("allusers", res.data.data);
      if (res.status === 200) {
        setlistusers(res.data.data);
      }
    });
  };
  useEffect(() => {
    getallusers();
  }, []);
  useEffect(() => {
    setlist(
      listusers.map((res) => {
        return {
          label: res.fullName,
          value: res._id,
        };
      })
    );
  }, [listusers]);
  const addholiday = () => {
    let data = {
      nationalholiday: nationalholiday,
      annualholiday: annualholiday,
      sickholiday: sickholiday,
      user: user,
    };
    console.log(data, "data holiday");
    axiosApi
      .post("http://localhost:5000/holidays", data)
      .then((res) => {
        console.log(res, "Res");
        if (res.status === 201) {
          console.log("Holiday Created");
          Swal.fire("Success!", "Holiday Added Successfully", "success");
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
            <Link
              to="/holidaylist"
              className="btn btn-main btn-round-full float-right"
            >
              holidays List
            </Link>
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h3 className="section-title bg-white text-center text-color px-3">
              Add Holiday
            </h3>
          </div>
          <div className="col-lg-6 col-md-12  container">
            <div className="row g-3">
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    id="nationalholiday "
                    placeholder="National_Holiday"
                    onChange={(e) => setnationalholiday(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    id="annualholiday "
                    placeholder="Annual_Holiday"
                    onChange={(e) => setannualholiday(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    id="sickholiday "
                    placeholder="Sick_Holiday"
                    onChange={(e) => setsickholiday(e.target.value)}
                  />
                  <Select
                    classname="form-control"
                    value={list.filter(
                      (option) => option.value === String(listusers?.fullName)
                    )}
                    onChange={(e) => {
                      setuser(e?.value);
                    }}
                    styles={styleData}
                    options={list}
                  />
                </div>
              </div>
              <div className=" col-sm-8">
                <button
                  className="btn btn-main"
                  class="btn btn-main btn-round-full float-right"
                  onClick={addholiday}
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
