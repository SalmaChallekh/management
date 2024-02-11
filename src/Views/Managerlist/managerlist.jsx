import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Table } from "antd";
import { useState, useEffect } from "react";
import axiosApi from "../../config/axios";
import { Link } from "react-router-dom";
export default () => {
  const Swal = require("sweetalert2");
  const [managerslist, setmanagerslist] = useState("");
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success primary",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  const allmanagers = async () => {
    axiosApi
      .get("http://localhost:5000/users/items?items=Manager")
      .then((res) => {
        console.log("allmanagers", res.data.data);
        if (res.status === 200) {
          setmanagerslist(res.data.data);
        }
      });
  };
  useEffect(() => {
    allmanagers();
  }, []);
  const deletemanager = (id) => {
    axiosApi
      .delete("http://localhost:5000/users/" + id)
      .then((res) => {
        //console.log("delete",id)
        let arr = [...managerslist];
        setmanagerslist(arr.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log("ERROR", err.message);
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
                  deletemanager(record._id);
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
              List of Managers
            </h6>
          </div>
          <Table dataSource={managerslist} columns={columns} />;
        </div>
      </div>
      <Footer />
    </>
  );
};
