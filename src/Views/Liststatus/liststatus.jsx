import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { Table } from "antd";
import { useState, useEffect } from "react";
import axiosApi from "../../config/axios";
import { Link } from "react-router-dom";
export default () => {
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const Swal = require("sweetalert2");
  const [size, setSize] = useState("large");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statuslist, setstatuslist] = useState("");
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success primary",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  const allstatus = async () => {
    axiosApi.get("http://localhost:5000/status").then((res) => {
      console.log("allstatus", res.data.data);
      if (res.status === 200) {
        setstatuslist(res.data.data);
      }
    });
  };
  useEffect(() => {
    allstatus();
  }, []);
  const deletestatus = (id) => {
    axiosApi
      .delete("http://localhost:5000/status/" + id)
      .then((res) => {
        //console.log("delete",id)
        let arr = [...statuslist];
        setstatuslist(arr.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log("ERROR", err.message);
      });
  };
  const [selectedstatus, setselectedstatus] = useState({});
  const updatestatus = (id) => {
    console.log("updated status ", selectedstatus);

    axiosApi
      .patch(
        "http://localhost:5000/status/" + selectedstatus._id,
        selectedstatus
      )
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
        statuslist();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const columns = [
    {
      title: " Status",
      dataIndex: "status",
      key: " status",
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
            console.log(record, "record update status");
            setselectedstatus(record);
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
                  deletestatus(record._id);
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
            {/* <Link to="/addmanager" className="btn btn-main btn-round-full float-right"> Add Manager</Link> */}
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-color px-3">
              {" "}
              List of Status
            </h6>
          </div>
          <Table dataSource={statuslist} columns={columns} />;
        </div>
      </div>
      <Modal
        title="Update Status"
        open={isModalOpen}
        onOk={updatestatus}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="status"
            placeholder="Status"
            value={selectedstatus.status}
            onChange={(e) =>
              setselectedstatus({ ...selectedstatus, status: e.target.value })
            }
          />
        </div>
      </Modal>
      <Footer />
    </>
  );
};
