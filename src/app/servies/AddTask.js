import { HttpasAxios } from "../Helper/Httpsreponse";

export const AddTask = async (taskData) => {
  const reponse = await HttpasAxios.post("/api/Tasks", taskData);
  return reponse;
};

export const ShowTask = async (userId) => {
  try {
    const response = await HttpasAxios.get(`/api/user/${userId}/task`);
    if (!response.data) {
      throw new Error("No data received");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw to handle in component
  }
};



export const DeleteTask = async (taskId) => {
  try {
    const response = await HttpasAxios.delete(`/api/Tasks/${taskId}`);
    if (!response.data) {
      throw new Error("No data received");
    }
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw to handle in component
  }
};