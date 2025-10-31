import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">HNB</div>
          <nav className="nav">
            <a href="#home">Personal</a>
            <a href="#home">Wholesale Banking</a>
            <a href="#home">SME Banking</a>
            <a href="#home">Digital Banking</a>
            <a href="#home">Private Banking</a>
            <a href="#home">About Us</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Hatton National Bank Test 123</h1>
          <p>Your trusted banking partner since 1888</p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="profile">
        <div className="container">
          <h2>Our Profile</h2>
          <h3>Who we are.</h3>
          <p>
            Hatton National Bank PLC is a premier private sector commercial bank operating in Sri Lanka 
            with over 250 Customer Centres and 820 ATMs spread across the island.
          </p>
          <p>
            Over the years, HNB has continued to serve as a catalyst in the local economy - an agent 
            of change that shapes the way Sri Lankans across the island live, work and play. Our dynamic, 
            transformative services extend beyond banking, and have been a growth catalyst for generations 
            of customers, businesses and the economy.
          </p>
          <p>
            Armed with the power of transformative banking, we're poised to serve you with progressive, 
            future ready strategies designed to make banking enjoyable and to empower the nation with new 
            possibilities of growth.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="card">
              <h3>OUR VISION</h3>
              <p>
                To be the acknowledged leader and chosen partner in providing financial solutions 
                through inspired people.
              </p>
            </div>
            <div className="card">
              <h3>OUR MISSION</h3>
              <p>
                Combining entrepreneurial spirit with empowered people and leading edge technology 
                to constantly exceed stakeholder expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <div className="container">
          <h2>Values</h2>
          <h3>Leading with courage.</h3>
          <div className="values-grid">
            <div className="value-item">Commitment</div>
            <div className="value-item">Teamwork</div>
            <div className="value-item">Excellence</div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="history">
        <div className="container">
          <h2>History</h2>
          <div className="timeline">
            <div className="timeline-item">
              <h4>1888 ~ 1900</h4>
              <p>
                In 1888 the hill station of Hatton saw the genesis of a bank; the first of its kind 
                within the burgeoning tea plantations of the then Ceylon. Aptly named Hatton Bank, 
                this bank became the lifeline to thousands of plantation workers.
              </p>
            </div>
            <div className="timeline-item">
              <h4>1901 ~ 1975</h4>
              <p>
                HNB explored and widened new avenues of opportunity for its customers in 1971. 
                The opening of its 1st branches were at Pussellawa, Gampola and Maskeliya. 
                HNB pioneered the concept of 'Mobile Banking' – which continues to be a boon 
                to people particularly in rural areas.
              </p>
            </div>
            <div className="timeline-item">
              <h4>1976 ~ 1995</h4>
              <p>
                The Bank sponsored the First ever official Test Match played by the National 
                side against England.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="help">
        <div className="container">
          <h2>How can we help you?</h2>
          <div className="help-grid">
            <button className="help-btn">Find a branch</button>
            <button className="help-btn">Give your feedback</button>
            <button className="help-btn">Contact Us</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Contact Information</h4>
              <p>No. 479, T B Jayah Mawatha, Colombo 10.</p>
              <p>Phone: 0112462462</p>
              <p>Email: hnbconnect@hnb.lk</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>About the Bank</li>
                <li>Contact Us</li>
                <li>Branch Locator</li>
                <li>Exchange Rates</li>
                <li>Interest Rates</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>Retail Services</li>
                <li>Corporate Banking</li>
                <li>Digital Banking</li>
                <li>Treasury</li>
                <li>Trade Services</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Hatton National Bank PLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
