import api from "./axios"

export const signup = async ({
  name,
  email,
  password,
}) => {
  const response = await api.post(
    "/users",
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};

export const login = async ({
  email,
  password,
}) => {
  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};