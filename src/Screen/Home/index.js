import { connect } from "react-redux";
import Banner from "../../components/Banner";
import BestBooks from "../../components/BestBooks";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import Testimonial from "../../components/Testimoial";
import TopBooks from "../../components/TopBooks";

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
