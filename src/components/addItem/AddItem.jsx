import { useState } from "react";
import { commonClassNameOfInput, PrimaryButton, Button } from "../shared/Design";
import DatePicker from 'react-datepicker';
// import moment from 'moment';

const AddItem = ({ isOpen, closeModal }) => {

    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        prize: "",
        status: "new", // Default to 'active'
        images: [],
        lastDate: "",
    });

    const handleDateChange = (date) => {
        setSelectedDateTime(date);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files) {
            setFormData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...Array.from(files)],
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form Data:", formData);
        closeModal(); // Close modal after submission
    };

    if (!isOpen) return null; // Don't render the modal if isOpen is false

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-lg relative  max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4 text-black">Create New Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={commonClassNameOfInput}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className={commonClassNameOfInput}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="prize" className="block text-sm font-medium text-gray-700">
                            Prize
                        </label>
                        <input
                            type="number"
                            id="prize"
                            name="prize"
                            value={formData.prize}
                            onChange={handleInputChange}
                            className={commonClassNameOfInput}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="prize" className="block text-sm font-medium text-gray-700">
                            Last Date
                        </label>
                        <DatePicker
                            selected={selectedDateTime}
                            onChange={handleDateChange}
                            dateFormat="Pp"  // `Pp` is the format that includes both date and time
                            timeFormat="HH:mm"
                            timeIntervals={15}  // Optional: Set time interval to 15 minutes
                            className={commonClassNameOfInput}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                         Condition
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className={commonClassNameOfInput}
                        >
                            <option value="new">New</option>
                            <option value="refurbished">Refurbished</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                            Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            onChange={handleImageChange}
                            className={commonClassNameOfInput}
                        />
                        <div className="mt-2 text-sm text-gray-500">
                            {formData.images.length > 0 ? `${formData.images.length} files selected` : "No files selected"}
                        </div>
                    </div>

                    <div className="flex justify-between mt-6 gap-2">
                        <Button
                            type="button"
                            onClick={closeModal}
                            className="w-2/4 my-5"
                        >
                            Cancel
                        </Button>
                        <PrimaryButton
                            type="submit"
                            className="w-2/4 my-5"
                        >
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
