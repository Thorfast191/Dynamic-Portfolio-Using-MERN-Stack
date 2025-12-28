import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const publicationSlice = createSlice({
  name: "publication",
  initialState: {
    loading: false,
    publications: [],
    error: null,
    message: null,
    singlePublication: {},
  },
  reducers: {
    // Get all publications
    getAllPublicationsRequest(state) {
      state.publications = [];
      state.error = null;
      state.loading = true;
    },
    getAllPublicationsSuccess(state, action) {
      console.log("Reducer: Received publications:", action.payload);
      console.log("Type of payload:", typeof action.payload);
      console.log("Is array?", Array.isArray(action.payload));

      // Ensure we always have an array
      let publicationsArray = [];

      if (Array.isArray(action.payload)) {
        publicationsArray = action.payload;
      } else if (action.payload && typeof action.payload === "object") {
        // Try to extract publications from object
        publicationsArray =
          action.payload.publications || action.payload.data || [];
      }

      console.log("Processed publications array:", publicationsArray);

      // Transform each publication to ensure all fields exist
      const safePublications = publicationsArray.map((pub) => {
        // Create a safe copy with defaults - FIXED VERSION
        const safePub = {
          _id: pub._id ?? pub.id ?? "",
          title: pub.title ?? "",
          description: pub.description ?? "",
          paperId: pub.paperId ?? "",
          platform: pub.platform ?? "",
          program: pub.program ?? "",
          status: pub.status ?? "Ongoing",
          createdAt: pub.createdAt ?? new Date().toISOString(),
          updatedAt: pub.updatedAt ?? pub.createdAt ?? new Date().toISOString(),
          paperAttachment: pub.paperAttachment ?? null,
          codeAttachment: pub.codeAttachment ?? null,
          images: pub.images ?? [],
        };

        console.log("Transformed publication:", safePub);
        return safePub;
      });

      state.publications = safePublications;
      state.error = null;
      state.loading = false;
    },
    getAllPublicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // Get single publication
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

    // Add new publication
    addNewPublicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewPublicationSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewPublicationFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },

    // Delete publication
    deletePublicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletePublicationSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deletePublicationFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },

    // Update publication
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
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },

    // Reset and clear
    resetPublicationSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllPublicationErrors(state) {
      state.error = null;
    },
  },
});

// Action creators for publications
export const getAllPublications = () => async (dispatch) => {
  dispatch(publicationSlice.actions.getAllPublicationsRequest());
  try {
    console.log("Fetching publications from API...");

    const response = await axios.get(
      "http://localhost:4000/api/publications/getall",
      { withCredentials: true }
    );

    console.log("API Response:", response);
    console.log("Response data:", response.data);
    console.log("Response data publications:", response.data?.publications);

    if (response.data?.publications) {
      console.log("Publications count:", response.data.publications.length);
      if (response.data.publications.length > 0) {
        console.log("First publication raw:", response.data.publications[0]);
        console.log(
          "First publication keys:",
          Object.keys(response.data.publications[0])
        );
      }
    }

    dispatch(
      publicationSlice.actions.getAllPublicationsSuccess(
        response.data.publications
      )
    );
    dispatch(publicationSlice.actions.clearAllPublicationErrors());
  } catch (error) {
    console.error("Error fetching publications:", error);
    console.error("Error response:", error.response?.data);

    dispatch(
      publicationSlice.actions.getAllPublicationsFailed(
        error.response?.data?.message || "Failed to fetch publications"
      )
    );
  }
};

export const getSinglePublication = (id) => async (dispatch) => {
  dispatch(publicationSlice.actions.getSinglePublicationRequest());
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/publications/get/${id}`,
      { withCredentials: true }
    );
    dispatch(
      publicationSlice.actions.getSinglePublicationSuccess(data.publication)
    );
  } catch (error) {
    dispatch(
      publicationSlice.actions.getSinglePublicationFailed(
        error.response?.data?.message || "Failed to fetch publication"
      )
    );
  }
};

export const addNewPublication = (formData) => async (dispatch) => {
  dispatch(publicationSlice.actions.addNewPublicationRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/publications/add",
      formData, // SEND AS-IS
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(publicationSlice.actions.addNewPublicationSuccess(data.message));
    dispatch(getAllPublications());
  } catch (error) {
    dispatch(
      publicationSlice.actions.addNewPublicationFailed(
        error.response?.data?.message || "Failed to add publication"
      )
    );
    throw error;
  }
};

export const deletePublication = (id) => async (dispatch) => {
  dispatch(publicationSlice.actions.deletePublicationRequest());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/publications/delete/${id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(
      publicationSlice.actions.deletePublicationSuccess(response.data.message)
    );
    dispatch(getAllPublications()); // Refresh the list after deletion
  } catch (error) {
    dispatch(
      publicationSlice.actions.deletePublicationFailed(
        error.response?.data?.message || "Failed to delete publication"
      )
    );
  }
};

export const updatePublication = (id, newData) => async (dispatch) => {
  dispatch(publicationSlice.actions.updatePublicationRequest());
  try {
    const response = await axios.put(
      `http://localhost:4000/api/publications/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(
      publicationSlice.actions.updatePublicationSuccess(response.data.message)
    );
    dispatch(getAllPublications());
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Update failed";
    dispatch(publicationSlice.actions.updatePublicationFailed(errorMessage));
    throw new Error(errorMessage);
  }
};

export const resetPublicationSlice = () => (dispatch) => {
  dispatch(publicationSlice.actions.resetPublicationSlice());
};

export const clearAllPublicationErrors = () => (dispatch) => {
  dispatch(publicationSlice.actions.clearAllPublicationErrors());
};

export default publicationSlice.reducer;
