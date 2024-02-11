import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Layouts/NavBar/navbar";

export default () => {
  const [auth, setauth] = useState({});
  useEffect(() => {
    setauth(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <>
      <Navbar />
      <section>
        <div className="container py-5">
          <div className="row">
            <div className="billing-details">
              <div className="section-title">
                <h3 className="section-title bg-white text-center text-color mb-2">
                  Profile
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid "
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3">{auth?.user?.fullName}</h5>
                  <p className="text-muted mb-1">{auth?.user?.userName}</p>
                  <p className="text-muted mb-4">{auth?.user?.adress}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <Link to={`/updateprofile/${auth?.user?._id}`}>
                      <button type="button" className="btn btn-main">
                        Update
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{auth?.user?.fullName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">User Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{auth?.user?.userName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{auth?.user?.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{auth?.user?.phone}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">City</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{auth?.user?.city}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{auth?.user?.adress}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">ZipCode</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{auth?.user?.zipCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
