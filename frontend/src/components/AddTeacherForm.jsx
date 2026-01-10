import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddTeacherForm = ({ setShowAddTeacherForm, setTeachers }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/teachers", formData);

      if (res.status === 201 || res.status === 200) {
        toast.success("Teacher added successfully!");
        setTeachers((prev) => [...prev, res.data]);
        setShowAddTeacherForm(false);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.error("Error adding teacher", err);
      toast.error("Error adding teacher.");
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 500, damping: 60 }}
        >
          <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddTeacherForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Teacher
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AddTeacherForm;
