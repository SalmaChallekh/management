import Navbar from "../../Layouts/NavBar/navbar";
import Footer from "../../Layouts/Footer/footer";
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
  const [auth, setauth] = useState({});
  useEffect(() => {
    setauth(JSON.parse(localStorage.getItem("user")));
  }, []);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [status, setstatus] = useState("");
  const [manager, setmanager] = useState("");
  const [employee, setemployee] = useState("");

  const [listmanagers, setlistmanagers] = useState([]);
  const [liststatus, setliststatus] = useState([]);
  const [list, setlist] = useState([]);
  const [list1, setlist1] = useState([]);
  const getallManagers = async () => {
    axiosApi
      .get("http://localhost:5000/users/items?items=Manager")
      .then((res) => {
        console.log("allmanagers", res.data.data);
        if (res.status === 200) {
          setlistmanagers(res.data.data);
        }
      });
  };
  useEffect(() => {
    getallManagers();
  }, []);
  useEffect(() => {
    setlist(
      listmanagers.map((res) => {
        console.log(res, "maanagerselect");
        return {
          label: res.fullName,
          value: res._id,
        };
      })
    );
  }, [listmanagers]);

  const getallstatus = async () => {
    axiosApi.get("http://localhost:5000/status").then((res) => {
      console.log("allstatus", res.data.data);
      if (res.status === 200) {
        setliststatus(res.data.data);
      }
    });
  };
  useEffect(() => {
    getallstatus();
  }, []);
  useEffect(() => {
    setlist1(
      liststatus.map((res) => {
        console.log(res, "statusselect");
        return {
          label: res.status,
          value: res._id,
        };
      })
    );
  }, [liststatus]);
  const addProject = () => {
    let data = {
      title: title,
      description: description,
      deadline: date,
      status: status,
      // manager:manager,
      manager: auth?.user?._id,
    };
    console.log(data, "data project");
    axiosApi
      .post("http://localhost:5000/projects", data)
      .then((res) => {
        console.log(res, "Res");
        if (res.status === 201) {
          console.log("Project Created");
          Swal.fire("Success!", "Project Added Successfully", "success");
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
              to="/projectlist"
              className="btn btn-main btn-round-full float-right"
            >
              List Of Projects
            </Link>
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h3 className="section-title bg-white text-center text-color px-3">
              Add Project
            </h3>
          </div>
          <div className="col-lg-6 col-md-12  container">
            <div className="row g-3">
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title"
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="deadline"
                    placeholder="Deadline"
                    onChange={(e) => setdate(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <Select
                    classname="form-control"
                    onChange={(e) => {
                      setstatus(e?.value);
                    }}
                    styles={styleData}
                    options={list1}
                  />
                </div>
              </div>

              <div className=" col-sm-8">
                <button
                  className="btn btn-main"
                  class="btn btn-main btn-round-full float-right"
                  onClick={addProject}
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
