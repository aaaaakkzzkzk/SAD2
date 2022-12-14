import React from "react";
import './HomePage.css';

function HomePage() {
    return (
        <>
            <section>
                <h3 className="text-center fw-bold m-5">Custom-made Designs</h3>
                <div className="homepage-content m-5">
                    <div className="feed-frame mb-5">
                        <img className="homepage-img" src={process.env.PUBLIC_URL + '/images/sample1.jpg'} alt="Debut Invitation" />
                        <h5 className="">Debut Invitation</h5>
                    </div>
                    <div className="feed-frame mb-5">
                        <img className="homepage-img" src={process.env.PUBLIC_URL + '/images/sample2.jpg'} alt="Debut Invitation" />
                        <h5 className="">Wedding Invitation</h5>
                    </div>
                    <div className="feed-frame mb-5">
                        <img className="homepage-img" src={process.env.PUBLIC_URL + '/images/sample3.jpg'} alt="Debut Invitation" />
                        <h5 className="">Wedding Invitation</h5>
                    </div>
                    <div className="feed-frame mb-5">
                        <img className="homepage-img" src={process.env.PUBLIC_URL + '/images/sample4.jpg'} alt="Birthday Invitation" />
                        <h5 className="">Birthday Invitation</h5>
                    </div>
                    <div className="feed-frame mb-5">
                        <img className="homepage-img" src={process.env.PUBLIC_URL + '/images/sample5.jpg'} alt="Debut Invitation" />
                        <h5 className="">Wedding Invitation</h5>
                    </div>
                </div>
            </section>

        </>
    );
}

export default HomePage;