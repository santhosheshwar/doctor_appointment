import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Input } from "antd";
import Navbar from "../components/navbar";
import Doctospage from "../components/Doctospage";
import "../styles/doctors.css";
import {useNavigate} from "react-router-dom";
import API_BASE_URL from '../config/api';

const Doctors = () => {
    const [doctorsData, setDoctorsData] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`${API_BASE_URL}/doctor`);
            setDoctorsData(data.doctors);
            setFilteredDoctors(data.doctors);
        };
        fetchData();
    }, []);

    const handleKnowYourDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
        setShowAbout(false);
    };

    const handleBookNow = () => {
        // alert(`Booking appointment for ${selectedDoctor.name}`);
        try{
            navigate('/homepage');
        }catch(e){
            console.error('Navigation error:', e);
        }

    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = doctorsData.filter(
            (doctor) =>
                doctor.name.toLowerCase().includes(value) ||
                doctor.title.toLowerCase().includes(value) ||
                doctor.location.toLowerCase().includes(value)
        );
        setFilteredDoctors(filtered);
    };

    return (
        <>
            <Navbar />

            {/*Search bar */}
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Input
                    placeholder="Search doctors by name, specialization, or location"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: "400px" }}
                />
            </div>

            <div className="doctors_page">
                <div className="all-doctors-container">
                    <div className="doctor-cards">
                        {filteredDoctors.map((doctor) => (
                                <div key={doctor._id} className="doctor-card-wrapper">
                                    <Doctospage onBookNowClick={() => handleBookNow(doctor)} onKnowYourdoctor={()=>handleKnowYourDoctor(doctor)} doctor={doctor} />
                                </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                {selectedDoctor && (
                    <div className="doctor-details-modal">
                        <img
                            src={selectedDoctor.imageUrl}
                            alt={selectedDoctor.name}
                            className="modal-doctor-image"
                        />
                        <h2>{selectedDoctor.name}</h2>
                        <p><b>Qualification:</b> {selectedDoctor.qualification}</p>
                        <p><b>Specialization:</b> {selectedDoctor.title}</p>
                        <p><b>Experience:</b> {selectedDoctor.experience} Years</p>
                        <p><b>Languages:</b> {selectedDoctor.languages}</p>
                        <p><b>Location:</b> {selectedDoctor.location}</p>
                        <p><b>Fees:</b> ₹{selectedDoctor.fees}</p>

                        <Button
                            type="link"
                            onClick={() => setShowAbout(!showAbout)}
                            style={{ marginTop: "10px" }}
                        >
                            {showAbout ? "Hide About Doctor" : "Show About Doctor"}
                        </Button>

                        {showAbout && (
                            <div className="about-section">
                                <h4>About Doctor</h4>
                                <p>{selectedDoctor.about || "No additional details provided."}</p>
                            </div>
                        )}

                        <Button
                            type="primary"
                            onClick={handleBookNow}
                            style={{ marginTop: "12px" }}
                        >
                            Book Appointment
                        </Button>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Doctors;
