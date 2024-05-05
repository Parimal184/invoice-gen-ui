import React from "react";

const Popup = ({ isOpen, onClose, children }) => {
    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                <div className="bg-white rounded-lg p-8 w-1/2">
                    {children}
                    {/* <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div> */}
                </div>
            </div>
        )
    );
};

export default Popup;
