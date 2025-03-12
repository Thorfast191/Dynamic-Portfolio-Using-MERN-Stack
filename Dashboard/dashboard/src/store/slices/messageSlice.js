import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.messages = [];
      state.error = action.payload;
      state.loading = false;
    },
    deleteMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteMessageFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetMessageSlice(state, action) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  try {
    dispatch(messageSlice.actions.getAllMessagesRequest());
    const response = await axios.get(
      "http://localhost:4000/api/message/getMessages",
      { withCredentials: true }
    );
    console.log("Messages response:", response.data); // Debug log
    dispatch(messageSlice.actions.getAllMessagesSuccess(response.data.data));
  } catch (error) {
    console.error("Error fetching messages:", error); // Debug log
    dispatch(
      messageSlice.actions.getAllMessagesFailed(
        error.response?.data?.message || "Failed to fetch messages"
      )
    );
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  try {
    dispatch(messageSlice.actions.deleteMessageRequest());
    const response = await axios.delete(
      `http://localhost:4000/api/message/deleteMessage/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(response.data.message));
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(
        error.response?.data?.message || "Failed to delete message"
      )
    );
  }
};

export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
