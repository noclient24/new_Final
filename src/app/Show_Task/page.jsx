"use client";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ShowTask, DeleteTask } from "../servies/AddTask";
import Usecontext from "../context/context";
import Link from "next/link";

const Show_Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    tittle: "",
    content: "",
    status: ""
  });
  const context = useContext(Usecontext);

  // Load tasks from API
  const LoadTask = async (userId) => {
    try {
      setLoading(true);
      const response = await ShowTask(userId);
      setTasks(response || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again.");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Delete task function
  const handleDelete = async (taskId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this task?");
      if (!confirmDelete) return;
      
      await DeleteTask(taskId);
      toast.success("Task deleted successfully");
      LoadTask(context.user._id);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  // Edit task functions
  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setEditForm({
      tittle: task.tittle,
      content: task.content,
      status: task.status
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (taskId) => {
    try {
      await UpdateTask(taskId, editForm);
      toast.success("Task updated successfully");
      LoadTask(context.user._id);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Add new task function
  const handleAddNew = () => {
    // You can implement this to show a form for adding new task
    // For now we'll just show a toast message
    toast.info("Add new task functionality would go here");
  };

  useEffect(() => {
    if (context.user?._id) {
      LoadTask(context.user._id);
    } else {
      setLoading(false);
    }
  }, [context.user]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Your Tasks
          </h1>
         
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-900/20 rounded-lg shadow p-8 text-center">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && tasks.length === 0 && (
          <div className="bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-400 text-lg">No tasks found</p>
           <Link href="../add_Task">
            <button
              onClick={handleAddNew}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors"
            >
              Add Your First Task
            </button>
           </Link>
          </div>
        )}

        {/* Task Grid */}
        {!loading && !error && tasks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="p-6 flex-grow">
                  {editingTask === task._id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="tittle"
                        value={editForm.tittle}
                        onChange={handleEditChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                        placeholder="Task title"
                      />
                      <textarea
                        name="content"
                        value={editForm.content}
                        onChange={handleEditChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                        rows="3"
                        placeholder="Task description"
                      />
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleEditChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEditSubmit(task._id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {task.tittle}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4 whitespace-pre-wrap">
                        {task.content}
                      </p>
                      <div className="flex justify-between items-center text-sm mt-auto">
                        <span className="text-gray-500">
                          {new Date(task.Date).toLocaleDateString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Action Buttons - Only show when not editing */}
                {editingTask !== task._id && (
                  <div className="px-6 pb-4 flex justify-end space-x-3">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Show_Task;