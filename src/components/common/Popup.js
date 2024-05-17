import React from "react";

const Popup = ({ isOpen, onClose, children, customStyles }) => {
    return (
        isOpen && (
            <div className="z-20 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                <div
                    className="relative bg-white rounded-lg p-8 w-1/2 "
                    style={{ ...customStyles }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-0 right-0 m-2 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        &#x2715;
                    </button>
                    {children}
                </div>
            </div>
        )
    );
};

export default Popup;
