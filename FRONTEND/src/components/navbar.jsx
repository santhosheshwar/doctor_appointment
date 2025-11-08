import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import '../styles/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        message.success("Logged out successfully");
        localStorage.removeItem('token');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    const handleHome = () => {
        message.success("Home page");
        navigate('/homepage');
    };

    const handleAppointment = () => {
        message.success("Appointment page");
        navigate('/appointment');
    };

    const handleServices = () => {
        message.success("Services page");
        navigate('/doctorspage');
    };

    return (
        <nav className="section__container nav__container">
            <div className="nav__logo-container">
                <div className="nav__logo">Health<span>Booker</span></div>
            </div>
            <div className="nav__buttons">
                <Button className="nav__button" onClick={handleHome}>Home</Button>
                <Button className="nav__button" onClick={handleAppointment}>Appointment</Button>
                <Button className="nav__button" onClick={handleServices}>Services</Button>
                <Button className="nav__button" onClick={handleLogout}>Logout</Button>
            </div>
        </nav>
    );
};

export default Navbar;
