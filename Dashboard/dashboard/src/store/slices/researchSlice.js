import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const researchSlice = createSlice({
  name: "research",
  initialState: {
    loading: false,
    research: [],
    error: null,
    message: null,
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    success(state, action) {
      state.loading = false;
      state.research = action.payload || state.research;
    },
    messageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
    reset(state) {
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state.projects;
    },
  },
});

export const getAllResearch = () => async (dispatch) => {
  dispatch(researchSlice.actions.request());
  try {
    const res = await axios.get("http://localhost:4000/api/projects/getall", {
      withCredentials: true,
    });
    dispatch(researchSlice.actions.success(res.data.research));
  } catch (err) {
    dispatch(
      researchSlice.actions.failed(err.response?.data?.message || "Error")
    );
  }
};

export const addResearch = (data) => async (dispatch) => {
  dispatch(researchSlice.actions.request());
  try {
    const res = await axios.post(
      "http://localhost:4000/api/research/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(researchSlice.actions.messageSuccess(res.data.message));
  } catch (err) {
    dispatch(
      researchSlice.actions.failed(err.response?.data?.message || "Error")
    );
  }
};

export const deleteResearch = (id) => async (dispatch) => {
  dispatch(researchSlice.actions.request());
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/research/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(researchSlice.actions.messageSuccess(res.data.message));
  } catch (err) {
    dispatch(
      researchSlice.actions.failed(err.response?.data?.message || "Error")
    );
  }
};
export const resetResearchSlice = () => (dispatch) => {
  dispatch(researchSlice.actions.reset());
};

export const clearAllResearchErrors = () => (dispatch) => {
  dispatch(researchSlice.actions.clearAllErrors());
};
``;

export const { clearErrors, reset } = researchSlice.actions;
export default researchSlice.reducer;
