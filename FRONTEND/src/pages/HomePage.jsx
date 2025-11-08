import {useState} from "react";
import  {useNavigate} from "react-router-dom";
import '../styles/app1.css';
import { message } from "antd";
import axios from "axios"
import Navbar from "../components/navbar";
import API_BASE_URL from '../config/api';
// const token = localStorage.getItem("token");

const HomePage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [doctorname,Setdoctorname] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const token = localStorage.getItem('token');

    try {
      await axios.post(
          `${API_BASE_URL}/appoint/book`,
          {
            firstName,
            lastName,
            address,
            phoneNumber,
            doctorname
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // or wherever you store your JWT
            }
          }
      );

      message.success("Appointment booked!");
    } catch (error) {
      message.error("Booking failed. Please try again.");
      console.error("Booking error:", error);
    }
  };


  const handlenavi = () => {
    // window.open("https://healthbooker.onrender.com/doctors", "_blank");
    navigate("/doctorspage")
  };
  const handlenav = () =>
  {
    navigate("/appointment");
  };   
  return (
    <div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  <title>HealthBooker</title>
  <header>
    {/* <nav className="section__container nav__container">
      <div className="nav__logo">Health<span>Booker</span></div>
      <Button className="footer__col">Contact Us</Button>
      <Button className="footer__col" onClick={loader}>Logout</Button>
    </nav> */}
    <Navbar></Navbar>
    <div className="section__container header__container">
      <div className="header__content">
        <h1>Providing an Exceptional Patient Experience</h1>
        <p>
          Welcome, where exceptional patient experiences are our priority.
          With compassionate care, state-of-the-art facilities, and a
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          patient-centered approach, we're dedicated to your well-being. Trust
          us with your health and experience the difference.
        </p>
        <button className="btn" onClick = {handlenavi}>See Services</button>
        <button className="btn" onClick = {handlenav}>See Appointments</button>
      </div>
      <div className="header__form">
      <form onSubmit={handleSubmit}>
      <h4>Book Now</h4>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone No."
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
       type="text"
       placeholder="Doctor Name"
       value={doctorname}
       onChange={(e)=>Setdoctorname(e.target.value)}
       required
      />
      <button className="btn form__btn">Book Appointment</button>
    </form>
      </div>
    </div>
  </header>
  <section className="section__container service__container">
    <div className="service__header">
      <div className="service__header__content">
        <h2 className="section__header">Our Special service</h2>
        <p>
          Beyond simply providing medical care, our commitment lies in
          delivering unparalleled service tailored to your unique needs.
        </p>
      </div>
      <button className="service__btn" onClick={handlenavi}>Ask A Service</button>
    </div>
    <div className="service__grid">
      <div className="service__card">
        <span><i className="ri-microscope-line" /></span>
        <h4>Laboratory Test</h4>
        <p>
          Accurate Diagnostics, Swift Results: Experience top-notch Laboratory
          Testing at our facility.
        </p>
        <a href="#">Learn More</a>
      </div>
      <div className="service__card">
        <span><i className="ri-mental-health-line" /></span>
        <h4>Health Check</h4>
        <p>
          Our thorough assessments and expert evaluations help you stay
          proactive about your health.
        </p>
        <a href="#">Learn More</a>
      </div>
      <div className="service__card">
        <span><i className="ri-hospital-line" /></span>
        <h4>General Dentistry</h4>
        <p>
          Experience comprehensive oral care with Dentistry. Trust us to keep
          your smile healthy and bright.
        </p>
        <a href="#">Learn More</a>
      </div>
    </div>
  </section>
  <section className="section__container about__container">
    <div className="about__content">
      <h2 className="section__header">About Us</h2>
      <p>
        Welcome to our healthcare website, your one-stop destination for
        reliable and comprehensive health care information. We are committed
        to promoting wellness and providing valuable resources to empower you
        on your health journey.
      </p>
      <p>
        Explore our extensive collection of expertly written articles and
        guides covering a wide range of health topics. From understanding
        common medical conditions to tips for maintaining a healthy lifestyle,
        our content is designed to educate, inspire, and support you in making
        informed choices for your health.
      </p>
      <p>
        Discover practical health tips and lifestyle advice to optimize your
        physical and mental well-being. We believe that small changes can lead
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        to significant improvements in your quality of life, and we're here to
        guide you on your path to a healthier and happier you.
      </p>
    </div>
    <div className="about__image">
      <img src="https://img.freepik.com/free-photo/handsome-smiling-medical-professional-examining-with-stethoscope-colored-background_662251-366.jpg?size=626&ext=jpg&ga=GA1.1.205164506.1710391159&semt=sph" alt="about" />
    </div>
  </section>
  <section className="section__container why__container">
    <div className="why__image">
      <img src="https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?size=626&ext=jpg" alt="why choose us" />
    </div>
    <div className="why__content">
      <h2 className="section__header">Why Choose Us</h2>
      <p>
        With a steadfast commitment to your well-being, our team of highly
        trained healthcare professionals ensures that you receive nothing
        short of exceptional patient experiences.
      </p>
      <div className="why__grid">
        <span><i className="ri-hand-heart-line" /></span>
        <div>
          <h4>Intensive Care</h4>
          <p>
            Our Intensive Care Unit is equipped with advanced technology and
            staffed by team of professionals
          </p>
        </div>
        <span><i className="ri-truck-line" /></span>
        <div>
          <h4>Free Ambulance Car</h4>
          <p>
            A compassionate initiative to prioritize your health and
            well-being without any financial burden.
          </p>
        </div>
        <span><i className="ri-hospital-line" /></span>
        <div>
          <h4>Medical and Surgical</h4>
          <p>
            Our Medical and Surgical services offer advanced healthcare
            solutions to address medical needs.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section className="section__container doctors__container">
    <div className="doctors__header">
      <div className="doctors__header__content">
        <h2 className="section__header">Our Special Doctors</h2>
        <p>
          We take pride in our exceptional team of doctors, each a specialist
          in their respective fields.
        </p>
      </div>
      <div className="doctors__nav">
        <span><i className="ri-arrow-left-line" /></span>
        <span><i className="ri-arrow-right-line" /></span>
      </div>
    </div>
    <div className="doctors__grid">
      <div className="doctors__card">
        <div className="doctors__card__image">
          <img src="https://imgs.search.brave.com/Yc60twvsCFjT05SCM2jqrUuqp-siwfzeC1Cma9q3IKk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by95/b3VuZy1oYW5kc29t/ZS1waHlzaWNpYW4t/bWVkaWNhbC1yb2Jl/LXdpdGgtc3RldGhv/c2NvcGVfMTMwMy0x/NzgxOC5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw" alt="doctor" />
        </div>
        <h4>Dr. Emily Smith</h4>
        <p>Cardiologist</p>
      </div>
      <div className="doctors__card">
        <div className="doctors__card__image">
          <img src="https://imgs.search.brave.com/ojIrFNPZMzAKvr3plYTKTle8wB2LzxX-Tvnnx19p-0k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTIz/NDcyODcvcGhvdG8v/cG9ydHJhaXQtb2Yt/YS1kb2N0b3IuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTR2/bm1MX1VyRUZ3dHhx/dVR0Mk5hRlpwQlp4/LUlXN0JQSHVaallJ/ZFh5TWM9" alt="doctor" />
        </div>
        <h4>Dr. James Anderson</h4>
        <p>ENT</p>
      </div>
      <div className="doctors__card">
        <div className="doctors__card__image">
          <img src="https://imgs.search.brave.com/0Q8RD6uDYDI1qY1l3CkHdg6MBpvE2hFQlHakwY3tSV4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pMi5i/ZWhpbmR3b29kcy5j/b20vdGFtaWwtbW92/aWVzLWNpbmVtYS1u/ZXdzLTE2L2ltYWdl/cy9hLWRvY3RvcnMt/cmV2aWV3LW9mLXZp/amF5cy1tZXJzYWwt/cGhvdG9zLXBpY3R1/cmVzLXN0aWxscy0x/LmpwZw" alt="doctor" />
        </div>
        <h4>Dr.Maraan</h4>
        <p>General Surgeon</p>
      </div>
    </div>
  </section>
  <footer className="footer">
    <div className="section__container footer__container">
      <div className="footer__col">
        <h3>Health<span>Care</span></h3>
        <p>
          We are honored to be a part of your healthcare journey and committed
          to delivering compassionate, personalized, and top-notch care every
          step of the way.
        </p>
        <p>
          Trust us with your health, and let us work together to achieve the
          best possible outcomes for you and your loved ones.
        </p>
      </div>
      <div className="footer__col">
        <h4>About Us</h4>
        <p>Home</p>
        <p>Work With Us</p>
        <p>Our Blog</p>
        <p>Terms &amp; Conditions</p>
      </div>
      <div className="footer__col">
        <h4>Services</h4>
        <p>Search Terms</p>
        <p>Advance Search</p>
        <p>Privacy Policy</p>
        <p>Suppliers</p>
        <p>Our Stores</p>
      </div>
      <div className="footer__col">
        <h4>Contact Us</h4>
        <p>
          <i className="ri-map-pin-2-fill" /> Kinathukadavu,Coimbatore
        </p>
        <p><i className="ri-mail-fill" /> supportcare@gmail.com</p>
        <p><i className="ri-phone-fill" /> 044-123-56789</p>
      </div>
    </div>
    <div className="footer__bar">
      <div className="footer__bar__content">
        <div className="footer__socials">
          <span><i className="ri-instagram-line" /></span>
          <span><i className="ri-facebook-fill" /></span>
          <span><i className="ri-heart-fill" /></span>
          <span><i className="ri-twitter-fill" /></span>
        </div>
      </div>
    </div>
  </footer>
</div>
  );
  }



export default HomePage;
