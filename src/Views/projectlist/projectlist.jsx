import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { Table } from "antd";
import { useState, useEffect } from "react";
import axiosApi from "../../config/axios";
import { apis } from "../../config/apisUrl";
import { Link } from "react-router-dom";
import Select from "react-select";
import tasklist from "../tasklist/tasklist";
export default () => {
  const Swal = require("sweetalert2");
  const [size, setSize] = useState("large");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectlist, setprojectlist] = useState([]);
  const [selectedproject, setselectedproject] = useState({});
  const [listmanagers, setlistmanagers] = useState([]);
  const [liststatus, setliststatus] = useState([]);
  const [listtasks, setlisttasks] = useState([]);
  const [list, setlist] = useState([]);
  const [list1, setlist1] = useState([]);
  const [list2, setlist2] = useState([]);
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
        //console.log(res ,"maanagerselect");
        return {
          label: res.fullName,
          value: res._id,
        };
      })
    );
  }, [listmanagers]);

  const getalltasks = async () => {
    axiosApi.get("http://localhost:5000/tasks").then((res) => {
      console.log("alltasks", res.data.data);
      if (res.status === 200) {
        setlisttasks(res.data.data);
      }
    });
  };
  useEffect(() => {
    getalltasks();
  }, []);
  useEffect(() => {
    setlist2(
      listtasks.map((res) => {
        //console.log(res ,"maanagerselect");
        return {
          label: res.name,
          value: res._id,
        };
      })
    );
  }, [listtasks]);
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
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success primary",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  const allProjects = async () => {
    axiosApi.get(apis.projects.allprojects).then((res) => {
      console.log("allprojects", res.data.data);
      if (res.status === 200) {
        setprojectlist(res.data.data);
      }
    });
  };
  useEffect(() => {
    allProjects();
  }, []);
  const deleteproject = (id) => {
    axiosApi
      .delete("http://localhost:5000/projects/" + id)
      .then((res) => {
        //console.log("delete",id)
        let arr = [...projectlist];
        setprojectlist(arr.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log("ERROR", err.message);
      });
  };
  const updateproject = (id) => {
    console.log(selectedproject.manager);

    axiosApi
      .patch(
        "http://localhost:5000/projects/" + selectedproject._id,
        selectedproject
      )
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
        allProjects();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const columns = [
    {
      title: " Title",
      dataIndex: "title",
      key: " Title",
    },

    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "Deadline",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        console.log("record status", record.status);
        return <>{record.status.status}</>;
      },
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
      render: (text, record) => {
        console.log("record manager", record.manager);
        return <>{record.manager.fullName}</>;
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
            setselectedproject(record);
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
                  deleteproject(record._id);
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
              to="/addproject"
              className="btn btn-main btn-round-full float-right"
            >
              Add Project
            </Link>
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h3 className="section-title bg-white text-center text-color px-3">
              {" "}
              List Of Projects
            </h3>
          </div>
          <Table dataSource={projectlist} columns={columns} />;
        </div>
      </div>
      <Modal
        title="Update"
        open={isModalOpen}
        onOk={updateproject}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            value={selectedproject.title}
            onChange={(e) =>
              setselectedproject({ ...selectedproject, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            value={selectedproject.description}
            onChange={(e) =>
              setselectedproject({
                ...selectedproject,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="deadline"
            placeholder="Deadline"
            value={selectedproject.deadline}
            onChange={(e) =>
              setselectedproject({
                ...selectedproject,
                deadline: e.target.value,
              })
            }
          />
        </div>
        <Select
          classname="form-control"
          onChange={(e) => {
            setselectedproject({ ...selectedproject, status: e?.value });
          }}
          options={list1}
        />
        <br />
        <Select
          classname="form-control"
          onChange={(e) => {
            setselectedproject({ ...selectedproject, manager: e?.value });
          }}
          options={list}
        />
      </Modal>
      <Footer />
    </>
  );
};
