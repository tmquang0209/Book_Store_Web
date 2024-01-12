import { connect } from "react-redux";
import Banner from "../../components/Home/Banner";
import BestBooks from "../../components/Home/BestBooks";
import Footer from "../../components/Footer";
import Hero from "../../components/Home/Hero";
import Navbar from "../../components/Navbar";
import Testimonial from "../../components/Home/Testimoial";
import TopBooks from "../../components/Home/TopBooks";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <BestBooks />
            <Banner />
            <TopBooks />
            <Testimonial />
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(Home);
