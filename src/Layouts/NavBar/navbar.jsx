import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosApi from "../../config/axios";
export default () => {
  const [auth, setauth] = useState({});
  useEffect(() => {
    setauth(JSON.parse(localStorage.getItem("user")));
  }, []);
  console.log(auth, "auth from local storage");
  const navigate = useNavigate();
  const logout = () => {
    axiosApi
      .get("http://localhost:5000/auth/logOut", {
        headers: {
          Authorization: `Bearer ${auth?.tokens}`,
        },
      })
      .then((res) => {
        console.log("logout");
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response, "error in logout");
      });
  };
  return (
    <>
      <header className="navigation">
        <nav className="navbar navbar-expand-lg  py-4" id="navbar">
          <div className="container">
            <a className="navbar-brand" href="/">
              <Link className="nav-link" to="/" class="navbar-brand" />
              Optima<span>Tech</span>
            </a>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample09"
              aria-controls="navbarsExample09"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars" />
            </button>
            <div
              className="collapse navbar-collapse text-center"
              id="navbarsExample09"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <Link className="nav-link" to="/services">
                  Services
                </Link>
                {auth?.user?.items === "Employee" ? (
                  <li className="nav-item active">
                    <Link
                      className="nav-link"
                      to={`/listtaskemploye/${auth?.user?._id}`}
                    >
                      Tasks
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {auth?.user?.items === "Manager" ? (
                  <li className="nav-item active">
                    <Link className="nav-link" to="/project">
                      Projects
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {auth?.user?.items === "Employee" ? (
                  <Link className="nav-link" to="/dmholiday">
                    Ask for Leave
                  </Link>
                ) : (
                  ""
                )}
                {auth?.user?.items == "Manager" ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="dropdown05"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Dashboard
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdown05">
                      <Link className="dropdown-item" to="/addproject">
                        Add Project
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={`/listprojectmanager/${auth?.user?._id}`}
                      >
                        List of projects
                      </Link>
                      <Link className="dropdown-item" to="/taskemployee">
                        Assign Task to an employee
                      </Link>
                      <Link className="dropdown-item" to="/addtask">
                        Add task
                      </Link>
                      <Link className="dropdown-item" to="/tasklist">
                        List of tasks
                      </Link>
                    </ul>
                  </li>
                ) : (
                  ""
                )}
                {auth?.user?.items == "Admin" ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="dropdown05"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Dashboard
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdown05">
                      <Link className="dropdown-item" to="/employeelist">
                        List of employees
                      </Link>
                      <Link className="dropdown-item" to="/managerlist">
                        List of managers
                      </Link>
                      <Link className="dropdown-item" to="/holidaylist">
                        List of dm Holidays
                      </Link>
                      <Link className="dropdown-item" to="/addstatus">
                        Add Status
                      </Link>
                      <Link className="dropdown-item" to="/addholidaytype">
                        Add Type Of Holiday
                      </Link>
                      <Link className="dropdown-item" to="/listtypes">
                        List of Holidays Type
                      </Link>
                      <Link className="dropdown-item" to="/liststatus">
                        List of Status
                      </Link>
                    </ul>
                  </li>
                ) : (
                  ""
                )}

                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </ul>
              <>
                {auth ? (
                  <div className="nav-item dropdown ">
                    <div
                      className=" dropdown-toggle btn btn-solid-border btn-round-full"
                      id="dropdown05"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {auth?.user?.fullName}
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropdown05">
                      <Link className="dropdown-item" to="/profile">
                        {" "}
                        Profile
                      </Link>
                      <div className="dropdown-item" onClick={logout}>
                        {" "}
                        logout{" "}
                      </div>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/authentication"
                    className="btn btn-solid-border btn-round-full nav-link"
                  >
                    Login/Register
                  </Link>
                )}
              </>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
