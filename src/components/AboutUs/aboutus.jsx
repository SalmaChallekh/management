import home7 from '../../assets/about/home7.jpg'
export default () => {
    return (
        <>
            <section className="section about-2 position-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="about-item pr-3 mb-5 mb-lg-0">
                                <span className="h6 text-color">What we are</span>
                                <h2 className="mt-3 mb-4 position-relative content-title">We are dynamic team of creative people</h2>
                                <p className="mb-5">We provide consulting services in the area of IFRS and management reporting, helping companies to reach their highest level. We optimize business processes, making them easier.</p>
                                <a href="#" className="btn btn-main btn-round-full">Get started</a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="about-item-img">
                                <img src={home7} alt className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-info section pt-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="about-info-item mb-4 mb-lg-0">
                                <h3 className="mb-3"><span className="text-color mr-2 text-md ">01.</span>Our Mission</h3>
                                <p>llum similique ducimus accusamus laudantium praesentium, impedit quaerat, itaque maxime sunt deleniti voluptas distinctio .</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="about-info-item mb-4 mb-lg-0">
                                <h3 className="mb-3"><span className="text-color mr-2 text-md">02.</span>Vission</h3>
                                <p>llum similique ducimus accusamus laudantium praesentium, impedit quaerat, itaque maxime sunt deleniti voluptas distinctio .</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="about-info-item mb-4 mb-lg-0">
                                <h3 className="mb-3"><span className="text-color mr-2 text-md">03.</span>Our Approach</h3>
                                <p>llum similique ducimus accusamus laudantium praesentium, impedit quaerat, itaque maxime sunt deleniti voluptas distinctio .</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}