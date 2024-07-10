import axios from "axios";
import { getToken } from "./util/auth";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
const baseUrl = "http://localhost:8000";

export const signup = async (userData) => {
  const result = await axios.post(`${baseUrl}/auth/signup`, userData);
  return result.data;
};

export const login = async (userData) => {
  const result = await axios.post(`${baseUrl}/auth/login`, userData);
  return result.data;
};

export const userDetails = async () => {
  const token = getToken();
  const result = await axios(`${baseUrl}/user/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

export const addBlog = async (blogData) => {
  const token = getToken();

  const result = await axios.post(`${baseUrl}/blog/create`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

export const editBlog = async (blogData) => {
  const token = getToken();

  const result = await axios.put(`${baseUrl}/blog/edit`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

export const fetchBlogs = async () => {
  const token = getToken();

  const result = await axios(`${baseUrl}/blog/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data.data;
};

export const deleteBlog = async (_id) => {
  const token = getToken();

  const result = await axios.delete(`${baseUrl}/blog/` + _id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

export const uploadProfile = async (profilePicture) => {
  const token = getToken();
  const result = await axios.post(
    `${baseUrl}/user/upload-profile-picture`,
    profilePicture,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return result.data;
};
