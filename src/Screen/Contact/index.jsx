import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { contactInfo } from "../../components/Constants/text";

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <section id="contact" className="py-10">
                    <h1 className="text-center text-3xl font-bold">Contact Us</h1>
                    <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
                        <div>
                            <h1 className="text-2xl font-bold">Get in Touch</h1>
                            <p className="mt-3">
                                We are always here to help you with any questions or concerns you may have. Feel free to reach out to us and we will
                                get back to you as soon as possible.
                            </p>
                            <p className="mt-3">
                                <strong>Address:</strong> {contactInfo.ADDRESS}
                            </p>
                            <p className="mt-3">
                                <strong>Phone:</strong> {contactInfo.PHONE}
                            </p>
                            <p className="mt-3">
                                <strong>Email:</strong>
                                <a href={`mailto:${contactInfo.EMAIL}`} className="ml-2">
                                    {contactInfo.EMAIL}
                                </a>
                            </p>
                            <p className="mt-3">
                                <strong>Hours:</strong> {contactInfo.HOURS}
                            </p>
                            {/* social media */}
                            <div className="mt-6 flex items-center gap-3">
                                <a href={contactInfo.FACEBOOK}>
                                    <FaInstagram className="text-3xl" />
                                </a>
                                <a href={contactInfo.INSTAGRAM}>
                                    <FaFacebook className="text-3xl" />
                                </a>
                                <a href={contactInfo.LINKEDIN}>
                                    <FaLinkedin className="text-3xl" />
                                </a>
                            </div>
                            {/* map */}
                            <div className="mt-6">
                                <iframe
                                    title="Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.4178543820344!2d105.81301857584035!3d20.975880889591643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acef8ad5350f%3A0x89435a3528118ff5!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaMSDbmcgTG9uZw!5e0!3m2!1svi!2s!4v1708443047683!5m2!1svi!2s"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <img src="https://source.unsplash.com/500x500/?contact" alt="Contact" className="h-96 w-96 rounded-full object-cover" />
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
