// SuccessPopup.js
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import "../../App.css";

const SuccessPopup = ({ message, duration = 3000, onClose, type }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 500); // Delay to match the fade-out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`fixed top-4 left-1/2 flex items-center text-white py-3 px-5 rounded-lg shadow-lg transition-transform ${
                isVisible ? "fade-in" : "fade-out"
            } ${type}`}
        >
            <FaCheckCircle className="mr-2 text-xl" />
            <span>{message}</span>
            <button
                onClick={() => setIsVisible(false)}
                className="ml-4 text-xl font-bold focus:outline-none"
            >
                &times;
            </button>
        </div>
    );
};

SuccessPopup.propTypes = {
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["popup-success", "popup-update", "popup-delete"])
        .isRequired,
};

export default SuccessPopup;
