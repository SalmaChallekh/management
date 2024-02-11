import { Link } from "react-router-dom";
export default () => {
  return (
    <>
      <footer className="footer section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget">
                <h4 className="text-capitalize mb-4">Company</h4>
                <ul className="list-unstyled footer-menu lh-35">
                  <li>
                    <a href="#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="widget">
                <h4 className="text-capitalize mb-4">Quick Links</h4>
                <ul className="list-unstyled footer-menu lh-35">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                  <Link className="nav-link" to="/project">
                    Project
                  </Link>
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget">
                <h4 className="text-capitalize mb-4">Subscribe Us</h4>
                <p>Subscribe to get latest news article and resources</p>
                <form action="#" className="sub-form">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Subscribe Now ..."
                  />
                  <a href="#" className="btn btn-main btn-small">
                    subscribe
                  </a>
                </form>
              </div>
            </div>
            <div className="col-lg-3 ml-auto col-sm-6">
              <div className="widget">
                <div className="logo mb-4">
                  <h3>
                    Optima<span>Tech</span>
                  </h3>
                </div>
                <h6>
                  <a href="tel:+23-345-67890">Support@optimatech.com</a>
                </h6>
                <a href="mailto:support@gmail.com">
                  <span className="text-color h4">+23-456-6588</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
