import { useEffect, useState } from "react";
import Projectgrid from "../../components/Projectgrid/projectgrid";
import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import axiosApi from "../../config/axios";
import { apis } from "../../config/apisUrl";
import { Link, useNavigate } from "react-router-dom";

export default () => {
  const [projectlist, setprojectlist] = useState([]);
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

  return (
    <>
      <Navbar />
      <section className="page-title bg-1">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">Our Projects</span>
                <h1 className="text-capitalize mb-4 text-lg">
                  Projects Description
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
                      Projects Description
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
            {projectlist.map((p) => (
              <Projectgrid project={p} key={p._id} />
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
