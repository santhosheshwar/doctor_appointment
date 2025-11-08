import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faVideo, faHospital } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Doctospage = ({ doctor, onBookNowClick, onKnowYourdoctor }) => {
    return (
        <div className="doctor-card">
            <div className="doctor-card-image">
                <img src={doctor.imageUrl} alt={doctor.name} />
            </div>
            <div className="doctor-card-content">
                <h4>{doctor.title}</h4>
                <h2>{doctor.name} <span className="verified-icon">✔️</span></h2>
                <p>{doctor.about?.substring(0, 120)}... <span className="read-more">Read more</span></p>

                <p className="clinic-name">{doctor.clinicName || "Clinic Name Here"}</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {doctor.location}</p>

                <div className="consultation-types">
                    <span><FontAwesomeIcon icon={faVideo} /> Video Consultation</span>
                    <span><FontAwesomeIcon icon={faHospital} /> Clinic/Hospital Consultation</span>
                </div>

                <p><FontAwesomeIcon icon={faCalendarAlt} /> Wed: 10:00 AM - 07:00 PM</p>

                {/* ✅ ONLY Book Now inside the card, no Know your doctor here */}
                <div className="doctor-card-actions">
                    <Button type="primary" onClick={onBookNowClick}>Book Now</Button>
                    <Button type="primary" onClick={onKnowYourdoctor}>Know Your Doctor</Button>
                </div>
            </div>
        </div>
    );
};

Doctospage.propTypes = {
    doctor: PropTypes.shape({
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        title: PropTypes.string,
        about: PropTypes.string,
        clinicName: PropTypes.string,
        location: PropTypes.string,
    }).isRequired,
    onBookNowClick: PropTypes.func.isRequired,
    onKnowYourdoctor: PropTypes.func.isRequired,
};

export default Doctospage;
