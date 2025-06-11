"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddTask } from "../servies/AddTask";

const AddTaskPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [taskData, setTaskData] = useState({
    tittle: "",
    content: "",
    status: "none",
    UserId: "6844802bc75ab35b01c60c74", // Dynamic user ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    // Validate form
    if (!taskData.tittle.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    if (!taskData.content.trim()) {
      toast.error("Please enter task content");
      return;
    }

    if (taskData.status === "none") {
      toast.error("Please select a task status");
      return;
    }

    if (!taskData.UserId) {
      toast.error("User not authenticated");
      return;
    }

    setIsLoading(true);

    try {
      const result = await AddTask(taskData);
      console.log("Task creation result:", result);

      if (result?.data) {
        toast.success("Task added successfully!");
        router.push("/add_Task");
      } else {
        toast.error(result?.message || "Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error(error.message || "An error occurred while adding the task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-red-500 to-amber-500 flex items-center justify-center p-4">
      {/* 3D Card Container */}
      <div className="relative w-full max-w-md">
        {/* Back Card (3D effect) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-200"></div>

        {/* Main Card */}
        <div className="relative bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-lg shadow-2xl overflow-hidden p-8 border border-orange-500 border-opacity-20 transform transition-all hover:scale-[1.02] duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">
              <i className="fas fa-plus-circle mr-2"></i> Add New Task
            </h2>
            <p className="text-orange-200">Organize your work efficiently</p>
          </div>

          {/* Task Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center bg-gray-800 rounded-lg px-4 py-3">
                <i className="fas fa-heading text-orange-400 mr-3"></i>
                <input
                  type="text"
                  name="tittle"
                  value={taskData.tittle}
                  onChange={handleChange}
                  placeholder="Task Title"
                  className="w-full bg-transparent text-white placeholder-orange-200 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Content Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-gray-800 rounded-lg px-4 py-3">
                <div className="flex items-start">
                  <i className="fas fa-align-left text-red-400 mr-3 mt-1"></i>
                  <textarea
                    name="content"
                    value={taskData.content}
                    onChange={handleChange}
                    placeholder="Task Description"
                    rows="4"
                    className="w-full bg-transparent text-white placeholder-orange-200 focus:outline-none resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Status Selection */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center bg-gray-800 rounded-lg px-4 py-3">
                <i className="fas fa-tasks text-amber-400 mr-3"></i>
                <select
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white focus:outline-none appearance-none"
                  required
                >
                  <option value="none" className="bg-gray-800 text-orange-300">
                    ----- select status -----
                  </option>
                  <option
                    value="pending"
                    className="bg-gray-800 text-orange-300"
                  >
                    Pending
                  </option>
                  <option
                    value="completed"
                    className="bg-gray-800 text-green-400"
                  >
                    Completed
                  </option>
                </select>
                <i className="fas fa-chevron-down text-orange-300 ml-2"></i>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-orange-800/50 hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-2"></i> Save Task
                </>
              )}
            </button>
          </form>
        </div>
      </div>
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
    
  );
};

export default AddTaskPage;
