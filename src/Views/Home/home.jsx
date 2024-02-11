import Navbar from "../../Layouts/NavBar/navbar";
import Footer from "../../Layouts/Footer/footer";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import Services from "../../components/Services/services";
import Latestnews from "../../components/LatestNews/latestnews";
import Comment from "../../components/Comment/comment";
import { Link } from "react-router-dom";
export default () => {
  return (
    <>
      <Navbar />
      <section className="slider">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-10">
              <div className="block">
                <span className="d-block mb-3 text-white text-capitalize">
                  Prepare for new future
                </span>
                <h1 className="animated fadeInUp mb-5">
                  Our work is <br />
                  presentation of our <br />
                  capabilities.
                </h1>
                <Link
                  className="nav-link"
                  to="/login"
                  class="btn btn-main animated fadeInUp btn-round-full"
                >
                  {" "}
                  Get started <i className="btn-icon fa fa-angle-right ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section intro">
        <div className="container">
          <div className="row ">
            <div className="col-lg-8">
              <div className="section-title">
                <span className="h6 text-color ">
                  We are creative &amp; expert people
                </span>
                <h2 className="mt-3 content-title">
                  We work with business &amp; provide solution to client with
                  their business problem{" "}
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="intro-item mb-5 mb-lg-0">
                <i className="ti-desktop color-one" />
                <h4 className="mt-4 mb-3">Modern &amp; Responsive design</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Odit, ducimus.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="intro-item mb-5 mb-lg-0">
                <i className="ti-medall color-one" />
                <h4 className="mt-4 mb-3">Awarded licensed company</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Odit, ducimus.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="intro-item">
                <i className="ti-layers-alt color-one" />
                <h4 className="mt-4 mb-3">Build your website Professionally</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Odit, ducimus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section about position-relative">
        <div className="bg-about" />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-6 offset-md-0">
              <div className="about-item ">
                <span className="h6 text-color">What we are</span>
                <h2 className="mt-3 mb-4 position-relative content-title">
                  We are dynamic team of creative people
                </h2>
                <div className="about-content">
                  <h4 className="mb-3 position-relative">
                    We are Perfect Solution
                  </h4>
                  <p className="mb-5">
                    We provide consulting services in the area of IFRS and
                    management reporting, helping companies to reach their
                    highest level. We optimize business processes, making them
                    easier.
                  </p>
                  <Link
                    className="nav-link"
                    to="/login"
                    class="btn btn-main btn-round-full"
                  >
                    {" "}
                    Get started{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Services />
      <section className="section cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="cta-item  bg-white p-5 rounded">
                <span className="h6 text-color">We create for you</span>
                <h2 className="mt-2 mb-4">
                  Entrust Your Project to Our Best Team of Professionals
                </h2>
                <p className="lead mb-4">
                  Have any project on mind? For immidiate support :
                </p>
                <h3>
                  <i className="ti-mobile mr-3 text-color" />
                  +23 876 65 455
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section testimonial">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 ">
              <div className="section-title">
                <span className="h6 text-color">Clients testimonial</span>
                <h2 className="mt-3 content-title">
                  Check what's our clients say about us
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row testimonial-wrap">
            <AliceCarousel autoPlay autoPlayInterval="1000">
              <div className="testimonial-item position-relative">
                <i className="ti-quote-left text-color" />
                <div className="testimonial-item-content">
                  <p className="testimonial-text">
                    Quam maiores perspiciatis temporibus odio reiciendis error
                    alias debitis atque consequuntur natus iusto recusandae
                    numquam corrupti facilis blanditiis.
                  </p>
                  <div className="testimonial-author">
                    <h5 className="mb-0 text-capitalize">Thomas Johnson</h5>
                    <p>Excutive Director,themefisher</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-item position-relative">
                <i className="ti-quote-left text-color" />
                <div className="testimonial-item-content">
                  <p className="testimonial-text">
                    Consectetur adipisicing elit. Quam maiores perspiciatis
                    temporibus odio reiciendis error alias debitis atque
                    consequuntur natus iusto recusandae .
                  </p>
                  <div className="testimonial-author">
                    <h5 className="mb-0 text-capitalize">Mickel hussy</h5>
                    <p>Excutive Director,themefisher</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-item position-relative">
                <i className="ti-quote-left text-color" />
                <div className="testimonial-item-content">
                  <p className="testimonial-text">
                    Quam maiores perspiciatis temporibus odio reiciendis error
                    alias debitis atque consequuntur natus iusto recusandae
                    numquam corrupti.
                  </p>
                  <div className="testimonial-author">
                    <h5 className="mb-0 text-capitalize">James Watson</h5>
                    <p>Excutive Director,themefisher</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-item position-relative">
                <i className="ti-quote-left text-color" />
                <div className="testimonial-item-content">
                  <p className="testimonial-text">
                    Consectetur adipisicing elit. Quam maiores perspiciatis
                    temporibus odio reiciendis error alias debitis atque
                    consequuntur natus iusto recusandae .
                  </p>
                  <div className="testimonial-author">
                    <h5 className="mb-0 text-capitalize">Mickel hussy</h5>
                    <p>Excutive Director,themefisher</p>
                  </div>
                </div>
              </div>
            </AliceCarousel>
          </div>
        </div>
      </section>
      <Latestnews />
      <Comment />
      <Footer />
    </>
  );
};
