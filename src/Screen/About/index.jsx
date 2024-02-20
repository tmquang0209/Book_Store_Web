import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const About = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <section id="about" className="py-10">
                    <h1 className="text-center text-3xl font-bold">About Us</h1>
                    <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
                        <div className="flex items-center justify-center">
                            <img src="https://source.unsplash.com/500x500/?book" alt="About" className="h-96 w-96 rounded-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Our Story</h1>
                            <p className="mt-3">
                                Welcome to the TLU Bookstore, where literature comes to life! Nestled in the heart of our community, our bookstore is
                                a haven for book enthusiasts of all genres. Whether you're a fan of captivating anime, enchanted by fantastical
                                worlds, or engrossed in the rich narratives of novels, we have a diverse collection that caters to every literary
                                taste. Step into our shelves and explore a universe of imagination and storytelling. From the latest releases to
                                timeless classics, the TLU Bookstore is not just a place to buy books; it's a destination for literary discovery and a
                                haven for bibliophiles.
                            </p>
                            <p className="mt-3">
                                At the TLU Bookstore, we take pride in curating a diverse selection that goes beyond the pages of books. Our shelves
                                are not just filled with stories; they are adorned with the vibrant tapestry of anime worlds, the mystical allure of
                                fantasy realms, and the depth of emotions found in novels. We believe in creating a haven for not only readers but
                                also for those seeking a respite from the ordinary. Immerse yourself in the enchanting artistry of anime, traverse
                                unexplored realms through the pages of fantasy, and embark on emotional journeys within the narratives of novels. The
                                TLU Bookstore is more than a store; it's a celebration of the myriad worlds that words can unfold.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default About;
