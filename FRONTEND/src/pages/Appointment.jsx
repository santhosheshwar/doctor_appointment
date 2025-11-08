import { useState, useEffect } from "react";
import "../styles/appointment.css";
import { message, Button, Modal, DatePicker, TimePicker } from "antd";
import axios from "axios";
import API_BASE_URL from '../config/api';
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faUserAltSlash,
  faUserCheck,
  faClock,
  faPhone,
  faMapMarkerAlt,
  faCalendarAlt,
  faUserMd,
  faCalendarPlus
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/navbar";
import dayjs from "dayjs";

const Appointment = () => {
  const [response, setResponse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState(null);

  const handleAppointment = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
          `${API_BASE_URL}/appoint/showbookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      setResponse(data.appointments);
      message.success("Appointments fetched successfully");
    } catch (error) {
      message.error("Error fetching appointments");
    }
  };

  useEffect(() => {
    handleAppointment();
  }, []);

  const showChangeModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleRequestChange = async () => {
    if (!newDate || !newTime) {
      message.warning("Please select new date and time");
      return;
    }

    try {
        await axios.post(
            `${API_BASE_URL}/admin/appointment/${selectedAppointment._id}/request-change`,
            {
                newDate,
                newTime,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );


        message.success("Request for date/time change sent!");
      setIsModalOpen(false);
      handleAppointment();
    } catch (err) {
      message.error("Failed to send change request");
    }
  };

  return (
      <>
        <Navbar />
        <div className="appointment-container">
          {response.length === 0 ? (
              <p style={{ textAlign: "center" }}>No appointments found.</p>
          ) : (
              response.map((appointment, index) => (
                  <div key={index} className="appointment-card">
                    <div className="appointment-card-header">
                      <div className="status-icon">
                        {appointment.status === "approved" ? (
                            <FontAwesomeIcon icon={faUserCheck} color="green" />
                        ) : (
                            <FontAwesomeIcon icon={faUserAltSlash} color="red" />
                        )}
                      </div>
                    </div>

                    <div className="appointment-card-body">
                      <h3>
                        {appointment.firstName} {appointment.lastName}
                      </h3>
                      <p>
                        <FontAwesomeIcon icon={faUserMd} /> Doctor:{" "}
                        {appointment.doctorname}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Address:{" "}
                        {appointment.address}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faPhone} /> Phone:{" "}
                        {appointment.phoneNumber}
                      </p>

                      <p>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Booking Date:{" "}
                        {dayjs(appointment.createdAt).format("DD-MM-YYYY")}
                      </p>

                      {appointment.status === "approved" && (
                          <>
                            <p>
                              <FontAwesomeIcon icon={faCalendarAlt} /> Scheduled Date:{" "}
                              {appointment.scheduledTime
                                  ? dayjs(appointment.scheduledTime).format(
                                      "DD-MM-YYYY"
                                  )
                                  : "Not scheduled"}
                            </p>
                            <p>
                              <FontAwesomeIcon icon={faClock} /> Scheduled Time:{" "}
                              {appointment.scheduledTime
                                  ? dayjs(appointment.scheduledTime).format("hh:mm A")
                                  : "Not scheduled"}
                            </p>
                          </>
                      )}

                      <Button
                          type="link"
                          icon={<FontAwesomeIcon icon={faCalendarPlus} />}
                          onClick={() => showChangeModal(appointment)}
                      >
                        Request Date Change
                      </Button>
                    </div>
                  </div>
              ))
          )}
        </div>

        <Modal
            title="Request Change of Date & Time"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={handleRequestChange}
        >
          <p>Select new date:</p>
          <DatePicker onChange={(date) => setNewDate(date)} />
          <p style={{ marginTop: "10px" }}>Select new time:</p>
          <TimePicker use12Hours format="h:mm a" onChange={(time) => setNewTime(time)} />
        </Modal>
      </>
  );
};

export default Appointment;
