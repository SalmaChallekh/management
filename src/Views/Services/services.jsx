import Cta from "../../components/cta/cta"
import Services from "../../components/Services/services"
import Titleservices from "../../components/TitleServices/titleservices"
import Footer from "../../Layouts/Footer/footer"
import Navbar from "../../Layouts/NavBar/navbar"
export default ()=>{
    return (
        <>
        <Navbar/>
        <Titleservices/>
        <Services/>
        <Cta/>
        <Footer/>
        </>
    )
}