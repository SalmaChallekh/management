import { Link } from "react-router-dom"
export default () => {
    return (
        <>
            <section className="cta-2">
                <div className="container">
                    <div className="cta-block p-5 rounded">
                        <div className="row justify-content-center align-items-center ">
                            <div className="col-lg-7">
                                <span className="text-color">For Every type business</span>
                                <h2 className="mt-2 text-white">Entrust Your Project to Our Best Team of Professionals</h2>
                            </div>
                            <div className="col-lg-4">
                            <Link className="nav-link" to="/contact"  class="btn btn-main btn-round-full float-right">Contact Us</Link> 
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}