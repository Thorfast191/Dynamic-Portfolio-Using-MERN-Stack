import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    getAllProjectsRequest(state, action) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectsFailed(state, action) {
      state.projects = state.projects;
      state.error = action.payload;
      state.loading = false;
    },
    getSingleProjectRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getSingleProjectSuccess(state, action) {
      state.singleProject = action.payload;
      state.error = null;
      state.loading = false;
    },
    getSingleProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    updateProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetProjectSlice(state, action) {
      state.error = null;
      state.projects = state.projects;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state.projects;
    },
    clearAllProjectErrors: (state) => {
      state.error = null;
    },
    resetProjectSlice: (state) => {
      state.message = null;
      state.error = null;
    },
  },
});

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const response = await axios.get(
      "http://localhost:4000/api/projects/getall",
      { withCredentials: true }
    );
    dispatch(
      projectSlice.actions.getAllProjectsSuccess(response.data.projects)
    );
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};

// Add this action creator
export const getSingleProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.getSingleProjectRequest());
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/projects/get/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getSingleProjectSuccess(data.project));
  } catch (error) {
    dispatch(
      projectSlice.actions.getSingleProjectFailed(
        error.response?.data?.message || "Failed to fetch project"
      )
    );
  }
};

export const addNewProject = (data) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/projects/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(error.response.data.message)
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/projects/delete/${id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(getAllProjects()); // Refresh the list after deletion
    dispatch(projectSlice.actions.deleteProjectSuccess(response.data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(
        error.response?.data?.message || "Failed to delete project"
      )
    );
  }
};

export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const response = await axios.put(
      `http://localhost:4000/api/projects/update/${id}`, // Fixed URL formatting
      newData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(projectSlice.actions.updateProjectSuccess(response.data.message));
    dispatch(getAllProjects());
    return response.data; // Return for proper promise handling
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Update failed";
    dispatch(projectSlice.actions.updateProjectFailed(errorMessage));
    throw new Error(errorMessage); // Throw error for catch block
  }
};
export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;
