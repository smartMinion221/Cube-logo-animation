import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CubeScene from "../CubeScene";
import "./myCSS.css";

const HeroPage = () => {
  return (
    <div className="bg-black text-white min-vh-100">
      {/* Header Section */}
      <header className="container-fluid py-3" style={{zIndex:10000, position:"sticky"}}>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            {/* Mobile Menu Toggle */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navigation Links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Company
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Resources
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Docs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Sign In & CTA */}
            <div className="d-flex align-items-center">
              <a href="#" className="text-white text-decoration-none me-4">
                Sign in
              </a>
              <button className="btn btn-light rounded-pill px-4">
                Get Started &gt;
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="container text-center text-lg-start mt-5">
        {/* Launch Button */}
        <button className="btn btn-outline-light rounded-pill mb-3 px-5">
          Get ready for Launch Week &gt;
        </button>
        <div className="d-flex align-items-center">
          {/* Left Content */}
          <div className="col-lg-6">
            <h1 className="display-3 fw-bold my-4">
              The Bitcoin-Backed Yield Protocol for Web3
            </h1>
            <p className="fs-5">
              A fully decentralized, trustless protocol that emulates Bitcoin
              mining economics—providing real Bitcoin-backed incentives without
              inflation or speculation.
            </p>
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-lg-start mt-4">
              <button className="btn btn-light rounded-pill px-4 py-2">
                Get Started &gt;
              </button>
              <button className="btn btn-outline-light text-white">
                Documentation &gt;
              </button>
            </div>
          </div>

          {/* Right 3D Cube Image */}
          <div className="col-lg-6 mt-5">
            <div className="first-element">
              {/* <CubeScene className="second-element" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="first-element">
        <div className="second-element">
          <CubeScene />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
