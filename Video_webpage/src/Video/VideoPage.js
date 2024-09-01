import React, { useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import DatePicker from "react-datepicker";
import { FaHeartbeat, FaTint } from "react-icons/fa"; // Import icons
import "react-datepicker/dist/react-datepicker.css";
import "./VideoPage.css";
 import LocationMap from "../Map/Map"

export default function VideoPage() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

  const handleArchiveClick = () => {
    setShowDatePicker(true);
    setIsLive(false);
  };

  const handleWatchLiveClick = () => {
    setIsLive(true);
    setShowDatePicker(false);
    setSelectedDate(new Date());
  };

  const handlePreviousDayClick = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
    setIsLive(false);
  };

  const handleNextDayClick = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
    setIsLive(false);
  };

  const isNextDayDisabled = () => {
    const today = new Date();
    return isLive || selectedDate.toDateString() === today.toDateString();
  };

  return (
    <div className="container">
      
      <div className="video-page">
        <div className="button-group">
          <button className="vid-but" onClick={handleArchiveClick}>
            Archive Video
          </button>
          <button
            className="vid-but"
            onClick={handleWatchLiveClick}
            disabled={isLive}
          >
            Watch Live
          </button>
          <button className="vid-but" onClick={handlePreviousDayClick}>
            Previous Day
          </button>
          <button
            className="vid-but"
            onClick={handleNextDayClick}
            disabled={isNextDayDisabled()}
          >
            Next Day
          </button>
          <button
            className="vid-but"
            // onClick={handleNextDayClick}
            // disabled={isNextDayDisabled()}
          >
            Download
          </button>
        </div>
        <div className="video-container">
          <VideoPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
          {showDatePicker && (
            <div className="date-picker-overlay">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <button
                className="close-button"
                onClick={() => setShowDatePicker(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
        <h1 className="title">
          {isLive ? "Live Video" : selectedDate.toDateString()}
        </h1>
        <button    style={styles.button} >
        Request Unmasked Data for Investigation
      </button>
        {/* Health Metrics Section */}
       
      </div>
      <div className="side-container">
       <div className="health-metrics">
          <div className="metric">
            <FaHeartbeat className="metric-icon" />
            <p className="metric-value">Heart Rate: 72 bpm</p>
          </div>
          <div className="metric">
            <FaTint className="metric-icon" />
            <p className="metric-value">SpO2: 98%</p>
          </div>
        </div>
        {/* Google Map Section */}
    <LocationMap selectedDate={selectedDate} isLive={isLive} />

        </div>
    </div>
  );
}
const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    transition: "background-color 0.3s",
  }
}