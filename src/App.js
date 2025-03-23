import React from "react";
import CubeScene from "./CubeScene";
import "./App.css"; // Import the CSS for styling
import HeroSection from "./components/dashboard";
const App = () => {
  return (
    // <div className="app-container">
    //   {/* Header Section */}
    //   <header className="header">
    //     <h1 className="title">Resend - Email for Developers</h1>
    //     <p className="subtitle">
    //       The best way to reach humans instead of spam folders. Deliver
    //       transactional and marketing emails at scale.
    //     </p>
    //     <div className="cta-buttons">
    //       <button className="cta-button">Get Started</button>
    //       <button className="cta-button secondary">Documentation</button>
    //     </div>
    //   </header>
    //   <CubeScene />

    //   {/* Footer Section */}
    //   <footer className="footer">
    //     <p>&copy; 2025 Resend, All Rights Reserved.</p>
    //   </footer>
    // </div>
    <HeroSection />
  );
};

export default App;
