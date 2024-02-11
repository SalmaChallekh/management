import { useEffect, useState } from "react";
import axiosApi from "../../../config/axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../Layouts/NavBar/navbar";
import Footer from "../../../Layouts/Footer/footer";
import Taskgrid from "../../../components/Taskgrid/taskgrid";
export default () => {
  const { id } = useParams();
  const [listtasks, setlisttasks] = useState([]);
  const [auth, setauth] = useState({});
  useEffect(() => {
    setauth(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    axiosApi.get("http://localhost:5000/projects/employé/" + id).then((res) => {
      console.log("alltasks", res.data.data);
      if (res.status === 200) {
        setlisttasks(res.data.data);
      }
    });
  }, []);
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
  return (
    <>
      <Navbar />
      <section className="page-title bg-1">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">My Tasks</span>
                <h1 className="text-capitalize mb-4 text-lg">
                  Tasks Description
                </h1>
                <ul className="list-inline">
                  <li>
                    <Link className="nav-link" to="/" class="text-white">
                      Home
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-white">/</span>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-white-50">
                      Tasks Description
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section blog-wrap bg-gray">
        <div className="container">
          <div className="row">
            {listtasks.map((p) => (
              <Taskgrid task={p} key={p._id} />
            ))}
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-lg-6 text-center">
              <nav className="navigation pagination d-inline-block">
                <div className="nav-links">
                  <a className="prev page-numbers" href="#">
                    Prev
                  </a>
                  <span aria-current="page" className="page-numbers current">
                    1
                  </span>
                  <a className="page-numbers" href="#">
                    2
                  </a>
                  <a className="next page-numbers" href="#">
                    Next
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
