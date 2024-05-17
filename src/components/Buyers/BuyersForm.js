// import React, { useState, useEffect } from "react";

// const BuyersForm = ({ onSubmit, togglePopup }) => {
//    const [name, setName] = useState("");
//    const [address, setAddress] = useState("");
//    const [gstin, setGstin] = useState("");
//    const [email, setEmail] = useState("");
//    const [mobileNo, setMobileNo] = useState("");
//    const [isFormValid, setIsFormValid] = useState(false);

//    useEffect(() => {
//       setIsFormValid(name && address && gstin && email && mobileNo);
//    }, [name, address, gstin, email, mobileNo]);

//    const handleSubmit = (e) => {
//       e.preventDefault();
//       const buyerData = { name, address, gstin, email, mobileNo };
//       onSubmit(buyerData);
//    };

//    return (
//       <form
//          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//          onSubmit={handleSubmit}
//       >
//          <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//                Buyer Name:
//             </label>
//             <input
//                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                type="text"
//                value={name}
//                onChange={(e) => setName(e.target.value)}
//                required
//             />
//          </div>
//          <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//                Address:
//             </label>
//             <input
//                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                type="text"
//                value={address}
//                onChange={(e) => setAddress(e.target.value)}
//                required
//             />
//          </div>
//          <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//                GSTIN/UIN:
//             </label>
//             <input
//                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                type="text"
//                value={gstin}
//                onChange={(e) => setGstin(e.target.value)}
//                required
//             />
//          </div>
//          <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//                Email:
//             </label>
//             <input
//                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                type="email"
//                value={email}
//                onChange={(e) => setEmail(e.target.value)}
//                required
//             />
//          </div>
//          <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//                Mobile No:
//             </label>
//             <input
//                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                type="text"
//                value={mobileNo}
//                onChange={(e) => setMobileNo(e.target.value)}
//                required
//             />
//          </div>
//          <div className="flex items-center justify-between">
//             <button
//                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//                   !isFormValid && "opacity-50 cursor-not-allowed"
//                }`}
//                type="submit"
//                disabled={!isFormValid}
//             >
//                Add Buyer
//             </button>
//             <button
//                onClick={togglePopup}
//                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//             >
//                Cancel
//             </button>
//          </div>
//       </form>
//    );
// };

// export default BuyersForm;

import React, { useState, useEffect } from "react";

const BuyersForm = ({ onSubmit, togglePopup, initialBuyer }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [gstin, setGstin] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (initialBuyer) {
            setName(initialBuyer.name);
            setAddress(initialBuyer.address);
            setGstin(initialBuyer.gstin);
            setEmail(initialBuyer.email);
            setMobileNo(initialBuyer.mobileNo);
        }
    }, [initialBuyer]);

    useEffect(() => {
        setIsFormValid(name && address && gstin && email && mobileNo);
    }, [name, address, gstin, email, mobileNo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const buyerData = {
            id: initialBuyer?.id, // Include ID if it's an existing buyer
            name,
            address,
            gstin,
            email,
            mobileNo,
        };
        onSubmit(buyerData);
    };

    return (
        <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Buyer Name:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    GSTIN/UIN:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Mobile No:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                        !isFormValid && "opacity-50 cursor-not-allowed"
                    }`}
                    type="submit"
                    disabled={!isFormValid}
                >
                    {initialBuyer ? "Update Buyer" : "Add Buyer"}
                </button>
                <button
                    onClick={togglePopup}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default BuyersForm;
