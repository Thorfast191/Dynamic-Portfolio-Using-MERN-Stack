import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const publicationSlice = createSlice({
  name: "publication",
  initialState: {
    loading: false,
    publications: [],
    singlePublication: null,
    error: null,
    message: null,
  },
  reducers: {
    // GET ALL
    getAllPublicationsRequest(state) {
      state.publications = [];
      state.error = null;
      state.loading = true;
    },
    getAllPublicationsSuccess(state, action) {
      state.publications = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllPublicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // GET SINGLE
    getSinglePublicationRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getSinglePublicationSuccess(state, action) {
      state.singlePublication = action.payload;
      state.error = null;
      state.loading = false;
    },
    getSinglePublicationFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // ADD
    addNewPublicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewPublicationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addNewPublicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // UPDATE
    updatePublicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePublicationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updatePublicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // DELETE
    deletePublicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletePublicationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deletePublicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // RESET
    resetPublicationSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Action Creators
export const {
  getSinglePublicationRequest,
  getSinglePublicationSuccess,
  getSinglePublicationFailed,
} = publicationSlice.actions;

export const getAllPublications = () => async (dispatch) => {
  try {
    dispatch(publicationSlice.actions.getAllPublicationsRequest());
    const response = await axios.get(
      "http://localhost:4000/api/publications/getall",
      { withCredentials: true }
    );
    dispatch(
      publicationSlice.actions.getAllPublicationsSuccess(
        response.data.publications
      )
    );
  } catch (error) {
    dispatch(
      publicationSlice.actions.getAllPublicationsFailed(
        error.response?.data?.message || "Failed to fetch publications"
      )
    );
  }
};

export const getSinglePublication = (id) => async (dispatch) => {
  try {
    if (!id) {
      throw new Error("No publication ID provided");
    }

    dispatch(publicationSlice.actions.getSinglePublicationRequest());
    const response = await axios.get(
      `http://localhost:4000/api/publications/get/${id}`,
      { withCredentials: true }
    );

    dispatch(
      publicationSlice.actions.getSinglePublicationSuccess(
        response.data.publication
      )
    );
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch publication";
    dispatch(publicationSlice.actions.getSinglePublicationFailed(errorMessage));
    throw error; // Rethrow for component handling
  }
};

export const addNewPublication = (formData) => async (dispatch) => {
  try {
    dispatch(publicationSlice.actions.addNewPublicationRequest());
    const { data } = await axios.post(
      "http://localhost:4000/api/publications/add",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(publicationSlice.actions.addNewPublicationSuccess(data.message));
    dispatch(getAllPublications()); // Refresh list
  } catch (error) {
    dispatch(
      publicationSlice.actions.addNewPublicationFailed(
        error.response?.data?.message || "Failed to add publication"
      )
    );
  }
};

export const updatePublication = (id, formData) => async (dispatch) => {
  try {
    dispatch(publicationSlice.actions.updatePublicationRequest());
    const { data } = await axios.put(
      `http://localhost:4000/api/publications/update/${id}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(publicationSlice.actions.updatePublicationSuccess(data.message));
    dispatch(getAllPublications()); // Refresh list
  } catch (error) {
    dispatch(
      publicationSlice.actions.updatePublicationFailed(
        error.response?.data?.message || "Failed to update publication"
      )
    );
  }
};

export const deletePublication = (id) => async (dispatch) => {
  try {
    dispatch(publicationSlice.actions.deletePublicationRequest());
    await axios.delete(`http://localhost:4000/api/publications/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(
      publicationSlice.actions.deletePublicationSuccess("Publication deleted")
    );
    dispatch(getAllPublications()); // Refresh list
  } catch (error) {
    dispatch(
      publicationSlice.actions.deletePublicationFailed(
        error.response?.data?.message || "Failed to delete publication"
      )
    );
  }
};

export const clearAllPublicationErrors = () => (dispatch) => {
  dispatch(publicationSlice.actions.clearAllErrors());
};

export const resetPublicationSlice = () => (dispatch) => {
  dispatch(publicationSlice.actions.resetPublicationSlice());
};

export default publicationSlice.reducer;
