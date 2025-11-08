import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Modal, Input, Button, Typography, message, List } from "antd";
import Navbar from "../components/navbar.jsx";
import API_BASE_URL from '../config/api';

const { Title, Text } = Typography;

const DoctorPage = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [appointments, setAppointments] = useState([]); // ✅ new state
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        name: "",
        qualification: "",
        title: "",
        experience: "",
        languages: "",
        location: "",
        fees: "",
        imageUrl: "",
        KnowYourDoctor: "",
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const loggedInDoctorEmail = user.name;

    //Fetch doctor profile
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/doctor`);
                const doctorsList = data.doctors;
                const matchedDoctor = doctorsList.find(
                    (doctor) => doctor.name === loggedInDoctorEmail
                );

                if (matchedDoctor) {
                    setDoctorData(matchedDoctor);
                    setIsModalVisible(false);
                } else {
                    setIsModalVisible(true);
                }
            } catch (err) {
                console.error("Error fetching doctor data:", err);
                message.error("Failed to fetch doctor data");
            }
        };

        if (loggedInDoctorEmail) {
            fetchDoctor();
        }
    }, [loggedInDoctorEmail]);

    // Fetch appointments once doctor data is loaded
    useEffect(() => {
        const fetchAppointments = async () => {
            if (!doctorData?._id) return;

            try {
                const { data } = await axios.get(
                    `${API_BASE_URL}/appoint/doctor/${doctorData._id}`
                );
                setAppointments(data);
            } catch (err) {
                console.error("Error fetching appointments:", err);
                message.error("Failed to fetch appointments");
            }
        };

        fetchAppointments();
    }, [doctorData]);

    const handleInputChange = (e) => {
        setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const payload = { ...newDoctor, fees: Number(newDoctor.fees) };
            const { data } = await axios.post(
                `${API_BASE_URL}/doctor/add-doctors`,
                payload
            );
            message.success("Doctor profile created successfully!");
            setDoctorData(data.doctor || payload);
            setIsModalVisible(false);
        } catch (err) {
            console.error("Error adding doctor:", err);
            message.error("Failed to add doctor profile");
        }
    };

    return (
        <>
            <Navbar />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "100vh",
                    background: "#f4f4f4",
                    padding: "20px",
                }}
            >
                {doctorData ? (
                    <>
                        <Card
                            style={{
                                width: 400,
                                textAlign: "center",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                marginBottom: "20px",
                            }}
                            cover={
                                <img
                                    alt="Doctor"
                                    src={doctorData.imageUrl}
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "50%",
                                        margin: "20px auto",
                                        objectFit: "cover",
                                    }}
                                />
                            }
                        >
                            <Title level={3}>Dr. {doctorData.name}</Title>
                            <Text type="secondary">{doctorData.qualification}</Text>
                            <p>
                                <strong>Specialization:</strong> {doctorData.title}
                            </p>
                            <p>
                                <strong>Experience:</strong> {doctorData.experience} Years
                            </p>
                            <p>
                                <strong>Languages:</strong> {doctorData.languages}
                            </p>
                            <p>
                                <strong>Location:</strong> {doctorData.location}
                            </p>
                            <p>
                                <strong>Consultation Fees:</strong> ₹{doctorData.fees}
                            </p>
                            <p>
                                <strong>About Doctor:</strong>{" "}
                                {doctorData.KnowYourDoctor || "No details provided"}
                            </p>
                        </Card>

                        {/*Appointments list */}
                        <div style={{ width: "400px" }}>
                            <Title level={4}>Your Appointments</Title>
                            {appointments.length === 0 ? (
                                <Text>No appointments found.</Text>
                            ) : (
                                <List
                                    bordered
                                    dataSource={appointments}
                                    renderItem={(item) => {
                                        const scheduled = new Date(item.scheduledTime);

                                        const formattedDate = scheduled.toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        });

                                        const formattedTime = scheduled.toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        });

                                        return (
                                            <List.Item>
                                                <div>
                                                    <p>
                                                        <strong>Patient:</strong> {item.firstName}
                                                    </p>
                                                    <p>
                                                        <strong>Date:</strong> {formattedDate}
                                                    </p>
                                                    <p>
                                                        <strong>Time:</strong> {formattedTime}
                                                    </p>
                                                    <p>
                                                        <strong>Status:</strong> {item.status}
                                                    </p>
                                                </div>
                                            </List.Item>
                                        );
                                    }}
                                />

                            )}
                        </div>
                    </>
                ) : (
                    <p>Loading doctor data...</p>
                )}

                {/* Modal for adding doctor profile */}
                <Modal
                    title="Complete Your Doctor Profile"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleInputChange}
                        value={newDoctor.name}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        name="qualification"
                        placeholder="Qualification"
                        onChange={handleInputChange}
                        value={newDoctor.qualification}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        name="title"
                        placeholder="Specialization"
                        onChange={handleInputChange}
                        value={newDoctor.title}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        name="experience"
                        placeholder="Experience (Years)"
                        onChange={handleInputChange}
                        value={newDoctor.experience}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        name="languages"
                        placeholder="Languages Known"
                        onChange={handleInputChange}
                        value={newDoctor.languages}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        name="location"
                        placeholder="Location"
                        onChange={handleInputChange}
                        value={newDoctor.location}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        name="fees"
                        placeholder="Consultation Fees (₹)"
                        type="number"
                        onChange={handleInputChange}
                        value={newDoctor.fees}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        name="imageUrl"
                        placeholder="Image URL"
                        onChange={handleInputChange}
                        value={newDoctor.imageUrl}
                        style={{ marginBottom: 10 }}
                    />
                    <Input.TextArea
                        name="KnowYourDoctor"
                        placeholder="About Doctor"
                        onChange={handleInputChange}
                        value={newDoctor.KnowYourDoctor}
                        rows={3}
                        style={{ marginBottom: 10 }}
                    />

                    <Button type="primary" block onClick={handleSubmit}>
                        Save Profile
                    </Button>
                </Modal>
            </div>
        </>
    );
};

export default DoctorPage;
