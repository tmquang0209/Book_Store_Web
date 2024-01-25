import React from "react";
import { connect } from "react-redux";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const OrdersHistory = (props) => {
    return (
        <>
            <Navbar />
            <div className="container my-10">
                <div>
                    <h1>Orders history</h1>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(OrdersHistory);
