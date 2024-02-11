import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import axiosApi from "../../config/axios";
import { useEffect, useState } from "react";
export default () => {
  const location = useLocation();
  const [id, setid] = useState("");
  const [projectbyid, setprojectbyid] = useState("");
  useEffect(() => {
    setid(location.state.id);
    console.log("id location", location.state.id);
    getprojectbyid();
  }, []);
  //const navigate=useNavigate()
  const getprojectbyid = (id = location.state.id) => {
    axiosApi
      .get("http://localhost:5000/projects/" + id, { state: { id: id } })
      .then((res) => {
        console.log(res.data.data, "project by id");
        if (res.status === 200) {
          setprojectbyid(res.data.data);
        }
      });
  };
  console.log(id, "id project");
  return (
    <>
      <Navbar />
      <section className="page-title bg-1">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">Project</span>
                <h1 className="text-capitalize mb-4 text-lg">Project Detail</h1>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <Link className="nav-link" to="/" class="text-white">
                      Home
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-white">/</span>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-white-50">
                      Project
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
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-12 mb-5">
                  <div className="single-blog-item">
                    <div className="blog-item-content bg-white p-5">
                      <div className="blog-item-meta bg-gray py-1 px-2">
                        <span className="text-muted text-capitalize mr-3">
                          <i className="ti-pencil-alt mr-2" />
                          {projectbyid?.manager?.fullName}
                        </span>
                        <span className="text-muted text-capitalize mr-3">
                          <i className="ti-comment mr-2" />
                          {projectbyid?.status?.status}{" "}
                        </span>
                        <span className="text-black text-capitalize mr-3">
                          <i className="ti-time mr-1" /> {projectbyid?.deadline}
                        </span>
                      </div>
                      <h2 className="mt-3 mb-4">
                        <a href="blog-single.html">{projectbyid?.title}</a>
                      </h2>
                      <p className="lead mb-4">{projectbyid?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
