import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Radio, Space, Modal } from "antd";
import { Table } from "antd";
import { useState, useEffect } from "react";
import axiosApi from "../../config/axios";
import Select from "react-select";
export default () => {
  const Swal = require("sweetalert2");
  const [size, setSize] = useState("large");
  const [employeeslist, setemployeeslist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list1, setlist1] = useState([]);
  const [listsituation, setlistsituation] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
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
  const getallsituation = async () => {
    axiosApi.get("http://localhost:5000/situationprof").then((res) => {
      console.log("allsituation", res.data.data);
      if (res.status === 200) {
        setlistsituation(res.data.data);
      }
      console.log(res.response, "erroorrrr");
    });
  };
  useEffect(() => {
    getallsituation();
  }, []);
  useEffect(() => {
    setlist1(
      listsituation.map((res) => {
        console.log(res, "listsituation");
        return {
          label: res.situationprof,
          value: res._id,
        };
      })
    );
  }, [listsituation]);
  const allemployees = async () => {
    axiosApi
      .get("http://localhost:5000/users/items?items=Employee")
      .then((res) => {
        console.log("allemployees", res.data.data);
        if (res.status === 200) {
          setemployeeslist(res.data.data);
        }
      });
  };
  useEffect(() => {
    allemployees();
  }, []);
  const deleteemployee = (id) => {
    axiosApi
      .delete("http://localhost:5000/users/" + id)
      .then((res) => {
        let arr = [...employeeslist];
        setemployeeslist(arr.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  const [selectedemployee, setselectedemployee] = useState({});
  const updateemployee = (id) => {
    console.log("updated situation employee ", selectedemployee);

    axiosApi
      .patch(
        "http://localhost:5000/users/" + selectedemployee._id,
        selectedemployee
      )
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
        employeeslist();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const columns = [
    {
      title: " FullName",
      dataIndex: "fullName",
      key: " FullName",
    },
    {
      title: "UserName",
      dataIndex: "userName",
      key: "UserName",
    },
    {
      title: "Professional status",
      dataIndex: "situationprof",
      key: "situationprof",
      render: (text, record) => {
        console.log("record Situation", record?.situationprof);
        return <>{record?.situationprof?.situationprof}</>;
      },
    },
    {
      title: "E_mail",
      dataIndex: "email",
      key: "E_mail",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "Phone",
    },
    {
      title: "adress",
      dataIndex: "adress",
      key: "adress",
    },
    {
      title: "city",
      dataIndex: "city",
      key: "city",
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
            console.log(record, "record update user");
            setselectedemployee(record);
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
                  deleteemployee(record._id);
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
            {/*  <Link to="/addemployee" className="btn btn-main btn-round-full float-right">Add Employee</Link> */}
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-color px-3">
              {" "}
              List of Employees
            </h6>
          </div>
          <Table dataSource={employeeslist} columns={columns} />;
        </div>
      </div>
      <Modal
        title="Add/Update professional status"
        open={isModalOpen}
        onOk={updateemployee}
        onCancel={handleCancel}
      >
        <Select
          classname="form-control"
          onChange={(e) => {
            setselectedemployee({
              ...selectedemployee,
              situationprof: e?.value,
            });
          }}
          options={list1}
        />
      </Modal>
      <Footer />
    </>
  );
};
