import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import NavTab from "../NavTab/NavTab";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Footer from '../Footer/Footer'

function Main() {
    return (
        <section className="main">
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />  
            <Footer/>
        </section>
    )
}
export default Main;