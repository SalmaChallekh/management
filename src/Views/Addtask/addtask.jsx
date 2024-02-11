import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosApi from "../../config/axios";
import Select from "react-select";
import { apis } from "../../config/apisUrl";
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
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [deadline, setdeadline] = useState("");
  const [listprojects, setlistprojects] = useState([]);
  const [liststatus, setliststatus] = useState([]);
  const [task, settask] = useState("");
  const [project, setproject] = useState("");
  const [status, setstatus] = useState("");
  const [list, setlist] = useState([]);
  const [listofstatus, setlistofstatus] = useState([]);

  const getallprojects = async () => {
    axiosApi.get(apis.projects.allprojects).then((res) => {
      console.log("allprojects", res.data.data);
      if (res.status === 200) {
        setlistprojects(res.data.data);
      }
    });
  };
  useEffect(() => {
    getallprojects();
  }, []);
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
    setlist(
      listprojects.map((res) => {
        //console.log(res ,"projectlist");
        return {
          label: res.title,
          value: res._id,
        };
      })
    );
  }, [listprojects]);
  useEffect(() => {
    setlistofstatus(
      liststatus.map((sa) => {
        console.log(sa, "statuslist");
        return {
          label: sa.status,
          value: sa._id,
        };
      })
    );
  }, [liststatus]);
  const addTask = () => {
    let data = {
      name: name,
      description: description,
      deadline: deadline,
      status: status,
      project: project,
    };
    console.log(data, "data task");
    axiosApi
      .post("http://localhost:5000/tasks", data)
      .then((res) => {
        console.log(res, "Res");
        if (res.status === 201) {
          console.log("Task Created");
          Swal.fire("Success!", "Task Added Successfully", "success");
        }

        /*   axiosApi.post("http://localhost:5000/taskemployee" , {
                employee:,
                task:

            }) */
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
              to="/tasklist"
              className="btn btn-main btn-round-full float-right"
            >
              List Of Tasks
            </Link>
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h3 className="section-title bg-white text-center text-color px-3">
              Add Task
            </h3>
          </div>
          <div className="col-lg-6 col-md-12  container">
            <div className="row g-3">
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    onChange={(e) => setname(e.target.value)}
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
                    onChange={(e) => setdeadline(e.target.value)}
                  />
                </div>
                <Select
                  classname="form-control"
                  onChange={(e) => {
                    setproject(e?.value);
                  }}
                  styles={styleData}
                  options={list}
                />
                <br />
                <Select
                  classname="form-control"
                  onChange={(e) => {
                    setstatus(e?.value);
                  }}
                  styles={styleData}
                  options={listofstatus}
                />
              </div>

              <div className=" col-sm-8">
                <button
                  className="btn btn-main"
                  class="btn btn-main btn-round-full float-right"
                  onClick={addTask}
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
