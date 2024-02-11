import { Link } from "react-router-dom"
export default () => {
    return (
        <>

            <section className="mt-70 position-relative">
                <div className="container">
                    <div className="cta-block-2 bg-gray p-5 rounded border-1">
                        <div className="row justify-content-center align-items-center ">
                            <div className="col-lg-7">
                                <span className="text-color">For Every type business</span>
                                <h2 className="mt-2 mb-4 mb-lg-0">Entrust Your Project to Our Best Team of Professionals</h2>
                            </div>
                            <div className="col-lg-4" >
                            <Link className="nav-link" to="/contact"  class="btn btn-main btn-round-full float-right">Contact Us</Link> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}