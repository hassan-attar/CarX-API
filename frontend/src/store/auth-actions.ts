import { AppDispatch } from "./store";
import { authActions } from "./auth-slice";

import axios from "axios";

const api = axios.create({
  baseURL: "https://carxapi-h5d5fhhbc4hpc5fc.eastus-01.azurewebsites.net",
  withCredentials: true,
});

export const fetchAuthToken = () => {
  return (dispatch: AppDispatch) => {
    api
      .get("")
      .then((res) => {
        dispatch(authActions.setToken(res.data.accessToken));
      })
      .catch((error) => {
        authActions.setToken(null);
        console.error("Failed to fetch token:", error);
      });
  };
};

export const authInterceptor = (token: string | null) => {
  const configuration = api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return () => {
    api.interceptors.request.eject(configuration);
  };
};

export const refreshInterceptor = () => {
  const configuration = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === "401" &&
        error.response.message === "unauthorized"
      ) {
        try {
          api.get("").then((res) => {
            authActions.setToken(res.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          });
        } catch {
          authActions.setToken(null);
        }
      }
      return Promise.reject(error);
    }
  );
  return () => {
    api.interceptors.response.eject(configuration);
  };
};
