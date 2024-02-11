import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import Select from "react-select";
import { useState, useEffect } from "react";
import axiosApi from "../../config/axios";
import { CheckOutlined } from "@ant-design/icons";

export default () => {
  const Swal = require("sweetalert2");
  const [dmholidayslist, setdmholidayslist] = useState([]);
  const [size, setSize] = useState("large");
  const [list1, setlist1] = useState([]);
  const [listholidays, setlistholidays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success primary",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const alldmholidays = async () => {
    axiosApi.get("http://localhost:5000/dmholiday").then((res) => {
      console.log("alldmholidays", res.data.data);
      if (res.status === 200) {
        setdmholidayslist(res.data.data);
      }
    });
  };
  useEffect(() => {
    alldmholidays();
  }, []);

  const getallholidays = async () => {
    axiosApi.get("http://localhost:5000/holidays").then((res) => {
      console.log("allholidays", res.data.data);
      if (res.status === 200) {
        setlistholidays(res.data.data);
      }
      console.log(res.response, "erroorrrr");
    });
  };
  useEffect(() => {
    getallholidays();
  }, []);
  useEffect(() => {
    setlist1(
      listholidays.map((res) => {
        console.log(res, "listholidays");
        return {
          label: res.holiday,
          value: res._id,
        };
      })
    );
  }, [listholidays]);

  /*     const [selecteddmholiday, setselecteddmholiday] = useState({})
    const updatedmholiday=(id)=>{
        console.log("updated holiday",selecteddmholiday);
    
             axiosApi.patch("http://localhost:5000/dmholiday/"+selecteddmholiday._id,selecteddmholiday)
            .then((res)=>{
                console.log(res);
                setIsModalOpen(false);
                alldmholidays();
            }).catch((err=>{
                console.log(err.response)
            })) 
        } */
  const deleteholiday = (id) => {
    axiosApi
      .delete("http://localhost:5000/dmholiday/" + id)
      .then((res) => {
        let arr = [...dmholidayslist];
        setdmholidayslist(arr.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  const [selectedholiday, setselectedholiday] = useState({});
  console.log(
    selectedholiday._id,
    "SELECTEDHOLIDAY************************************"
  );

  const updateholiday = (id) => {
    axiosApi
      .patch("http://localhost:5000/dmholiday/" + selectedholiday._id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const columns = [
    {
      title: " dateofleave",
      dataIndex: "dateofleave",
      key: " Dateofleave",
    },
    {
      title: "numberofdays",
      dataIndex: "numberofdays",
      key: "Numberofdays",
    },

    {
      title: "holiday",
      dataIndex: "holiday",
      key: "Holiday",
      render: (text, record) => {
        console.log("record holiday", record.holiday);
        return <>{record.holiday.holiday}</>;
      },
    },
    {
      title: "Accept",
      render: (text, record) => (
        <Button
          shape="round"
          icon={<CheckOutlined />}
          size={size}
          style={{ color: "#389e0d" }}
          onClick={() => {
            console.log(record, "record update order");
            setselectedholiday(record);
            updateholiday(record._id);
          }}
        />
      ),
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
                  deleteholiday(record._id);
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
            {/* <Link to="/addholiday" className="btn btn-main btn-round-full float-right">Add holiday</Link> */}
          </div>
          <div className="text-center " data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-color px-3">
              {" "}
              List of Holidays
            </h6>
          </div>
          <Table dataSource={dmholidayslist} columns={columns} />;
        </div>
      </div>

      <Footer />
    </>
  );
};
