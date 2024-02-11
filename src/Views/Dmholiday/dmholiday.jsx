import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
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
  const [dateofleave, setdateofleave] = useState("");
  const [numberofdays, setnumberofdays] = useState(0);
  const [list, setlist] = useState([]);
  const [list1, setlist1] = useState([]);
  const [holiday, setholiday] = useState("");
  const [listholidays, setlistholidays] = useState([]);
  const getallholidays = async () => {
    axiosApi.get("http://localhost:5000/holidays").then((res) => {
      console.log("allholidays", res.data.data);
      if (res.status === 200) {
        setlistholidays(res.data.data);
      }
    });
  };
  useEffect(() => {
    getallholidays();
  }, []);
  useEffect(() => {
    setlist1(
      listholidays.map((res) => {
        //console.log(res ,"listholidays");
        return {
          label: res.holiday,
          value: res._id,
        };
      })
    );
  }, [listholidays]);
  const adddmholiday = () => {
    let data = {
      dateofleave: dateofleave,
      numberofdays: numberofdays,
      holiday: holiday,
      accepted: false,
    };
    console.log(data, "data dmholiday");
    axiosApi
      .post("http://localhost:5000/dmholiday", data)
      .then((res) => {
        console.log(res, "Res");
        if (res.status === 201) {
          console.log("dmholiday Created");
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
            {/* <Link to="/tasklist" className="btn btn-main btn-round-full float-right">Ask For Holiday</Link> */}
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h3 className="section-title bg-white text-center text-color px-3">
              Ask For Holiday
            </h3>
          </div>
          <div className="col-lg-6 col-md-12  container">
            <div className="row g-3">
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="dateofabsence"
                    placeholder="Date of absence"
                    onChange={(e) => setdateofleave(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    id="numberofdays"
                    placeholder="Number of days "
                    onChange={(e) => setnumberofdays(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Select
              classname="form-control"
              onChange={(e) => {
                setholiday(e?.value);
              }}
              styles={styleData}
              options={list1}
            />
            <div className=" col-sm-8">
              <button
                className="btn btn-main"
                class="btn btn-main btn-round-full float-right"
                onClick={adddmholiday}
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
