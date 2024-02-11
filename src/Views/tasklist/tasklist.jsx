import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Radio, Space, Modal } from "antd";
import { Table } from "antd";
import { useState, useEffect } from "react";
import axiosApi from "../../config/axios";
import Select from "react-select";
import { apis } from "../../config/apisUrl";
import { Link } from "react-router-dom";
export default () => {
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
  const Swal = require("sweetalert2");
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success primary",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  const [size, setSize] = useState("large");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasklist, settasklist] = useState([]);
  const [selectedtask, setselectedtask] = useState({});
  const [listprojects, setlistprojects] = useState([]);
  const [liststatus, setliststatus] = useState([]);
  const [list, setlist] = useState([]);
  const [list1, setlist1] = useState([]);
  const getallprojects = async () => {
    axiosApi.get("http://localhost:5000/projects").then((res) => {
      console.log("allprojects", res.data.data);
      if (res.status === 200) {
        setlistprojects(res.data.data);
      }
    });
  };
  useEffect(() => {
    alltasks();
  }, []);

  useEffect(() => {
    getallprojects();
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
        //console.log(res ,"liststatus");
        return {
          label: res.status,
          value: res._id,
        };
      })
    );
  }, [liststatus]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const alltasks = async () => {
    axiosApi.get(apis.tasks.alltasks).then((res) => {
      console.log("alltasks", res.data.data);
      if (res.status === 200) {
        settasklist(res.data.data);
      }
    });
  };

  const deletetask = (id) => {
    axiosApi
      .delete("http://localhost:5000/tasks/" + id)
      .then((res) => {
        let arr = [...tasklist];
        settasklist(arr.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  const updatetask = (id) => {
    console.log(selectedtask.project, "selectedtask.project");
    axiosApi
      .patch("http://localhost:5000/tasks/" + selectedtask._id, selectedtask)
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
        alltasks();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  console.log(selectedtask, "selected task");
  const columns = [
    {
      title: " Name",
      dataIndex: "name",
      key: " Name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "Deadline",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "Status",
      render: (text, record) => {
        //console.log("record status", record.status);
        return <>{record.status.status}</>;
      },
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      render: (text, record) => {
        //console.log("record project", record.project);
        return <>{record.project.title}</>;
      },
    },

    {
      title: "Update",
      render: (text, record) => (
        <Button
          shape="round"
          icon={<EditOutlined />}
          size={size}
          style={{ color: "#389e0d" }}
          onClick={() => {
            showModal(record._id);
            setselectedtask(record);
          }}
        ></Button>
      ),
      dataIndex: "Update",
      key: "Update",
    },
    {
      title: "Delete",
      render: (text, record) => (
        <Button
          shape="round"
          icon={<DeleteOutlined />}
          size={size}
          danger
          onClick={() =>
            swalWithBootstrapButtons
              .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  deletetask(record._id);
                  swalWithBootstrapButtons.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                  );
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    "Cancelled",
                    "Your imaginary file is safe :)",
                    "error"
                  );
                }
              })
          }
        ></Button>
      ),
      dataIndex: "Delete",
      key: "Delete",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="col-12">
            <Link
              to="/addtask"
              className="btn btn-main btn-round-full float-right"
            >
              {" "}
              Add Task
            </Link>
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-color px-3">
              {" "}
              List Of Tasks
            </h6>
          </div>
          <Table dataSource={tasklist} columns={columns} />;
        </div>
      </div>
      <Modal
        title="Update"
        open={isModalOpen}
        onOk={updatetask}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={selectedtask.name}
            onChange={(e) =>
              setselectedtask({ ...selectedtask, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            value={selectedtask.description}
            onChange={(e) =>
              setselectedtask({ ...selectedtask, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="deadline"
            placeholder="Deadline"
            value={selectedtask.deadline}
            onChange={(e) =>
              setselectedtask({ ...selectedtask, deadline: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <Select
            classname="form-control"
            onChange={(e) => {
              setselectedtask({ ...selectedtask, status: e?.value });
            }}
            styles={styleData}
            options={list1}
          />
        </div>
        <div className="form-group">
          <Select
            classname="form-control"
            onChange={(e) => {
              setselectedtask({ ...selectedtask, project: e?.value });
            }}
            styles={styleData}
            options={list}
          />
        </div>
      </Modal>
      <Footer />
    </>
  );
};
