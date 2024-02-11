import { Link } from "react-router-dom"
export default () => {
    return (
        <>
            <section className="page-title bg-1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Latest works</span>
                                <h1 className="text-capitalize mb-4 text-lg">Portfolio</h1>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><Link className="nav-link" to="/" class="text-white">Home</Link></li>
                                    <li className="list-inline-item"><span className="text-white">/</span></li>
                                    <li className="list-inline-item"><a href="#" className="text-white-50">Latest works</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}