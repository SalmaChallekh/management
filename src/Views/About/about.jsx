import Aboutus from "../../components/AboutUs/aboutus";
import Pagetitle from "../../components/PageTitle/pagetitle";
import Team from "../../components/Team/team";
import Footer from "../../Layouts/Footer/footer";
import Navbar from "../../Layouts/NavBar/navbar";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
export default () => {
  return (
    <>
      <Navbar />
      <Pagetitle />
      <Aboutus />
      <Team />
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
      <Footer />
    </>
  );
};
