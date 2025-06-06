import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-in`,
    data
  );
  return res.data;
};

export const signupUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/sign-up`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(" Lỗi signupUser:", error);
    throw {
      status: "ERR",
      message: error.response?.data?.message || "Đăng ký thất bại.",
    };
  }
};

export const sendOtp = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/send-otp`,
      data
    );
    return res.data;
  } catch (error) {
    throw {
      status: "ERR",
      message: error.response?.data?.message || "Có lỗi xảy ra khi gửi OTP.",
    };
  }
};

export const resetPassword = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/reset-password`,
    data
  );
  return res.data;
};

export const resendOtp = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/resend-otp`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUser = async (id, data) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, data
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-all`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const refreshToken = async (refreshToken) => {
  console.log("refreshToken", refreshToken);
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`,
    {},
    {
      headers: {
        token: `Bearer ${refreshToken}`,
      },
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyUser = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/user/delete-many`,
    data,

    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const createTeacher = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/create-teacher`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(" Lỗi:", error);
    throw {
      status: "ERR",
      message: error.response?.data?.message || "Đăng ký thất bại.",
    };
  }
};

export const getTotalTeachers = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-total-teacher`);
  return res.data;
};