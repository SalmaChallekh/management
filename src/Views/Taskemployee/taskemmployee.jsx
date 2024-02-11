import Navbar from "../../Layouts/NavBar/navbar";
import Footer from "../../Layouts/Footer/footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import { apis } from "../../config/apisUrl";
import axiosApi from "../../config/axios";
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
  const [list, setlist] = useState([]);
  const [list1, setlist1] = useState([]);
  const [task, settask] = useState("");
  const [employee, setemployee] = useState("");
  const [listemployees, setlistemployees] = useState([]);
  const [listtasks, setlisttasks] = useState([]);
  const alltasks = async () => {
    axiosApi.get(apis.tasks.alltasks).then((res) => {
      console.log("alltasks", res.data.data);
      if (res.status === 200) {
        setlisttasks(res.data.data);
      }
    });
  };
  useEffect(() => {
    alltasks();
  }, []);
  useEffect(() => {
    setlist1(
      listtasks.map((res) => {
        console.log(res, "listtasks");
        return {
          label: res.name,
          value: res._id,
        };
      })
    );
  }, [listtasks]);
  const allemployees = async () => {
    axiosApi
      .get("http://localhost:5000/users/items?items=Employee")
      .then((res) => {
        console.log("allemployees", res.data.data);
        if (res.status === 200) {
          setlistemployees(res.data.data);
        }
      });
  };
  useEffect(() => {
    allemployees();
  }, []);
  useEffect(() => {
    setlist(
      listemployees.map((res) => {
        console.log(res, "listemployees");
        return {
          label: res.fullName,
          value: res._id,
        };
      })
    );
  }, [listemployees]);
  const addtaskemployee = () => {
    let data = {
      task: task,
      employee: employee,
    };
    console.log(data, "data task");
    axiosApi
      .post("http://localhost:5000/taskemployee", data)
      .then((res) => {
        console.log(res, "Res");
        if (res.status === 201) {
          console.log("Employee attached");
          Swal.fire("Success!", "Employee Attached  Successfully", "success");
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
              to="/tasklist"
              className="btn btn-main btn-round-full float-right"
            >
              List Of Tasks
            </Link>
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h3 className="section-title bg-white text-center text-color px-3">
              {" "}
              assign task to an employee{" "}
            </h3>
          </div>
          <div className="col-lg-6 col-md-12  container">
            <div className="row g-3">
              <div className="col-12">
                <div className="form-group">
                  <Select
                    classname="form-control"
                    onChange={(e) => {
                      setemployee(e?.value);
                    }}
                    styles={styleData}
                    options={list}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <Select
                    onChange={(e) => {
                      settask(e?.value);
                    }}
                    styles={styleData}
                    options={list1}
                  />
                </div>
              </div>
            </div>
            <div className=" col-sm-8">
              <button
                className="btn btn-main"
                class="btn btn-main btn-round-full float-right"
                onClick={addtaskemployee}
              >
                Attached
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
