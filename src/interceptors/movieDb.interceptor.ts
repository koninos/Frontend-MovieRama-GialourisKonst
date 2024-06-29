import { ACCESS_TOKEN } from "../utils/API";

export const movieDbRequestInterceptor = async (
  apiUrl: string,
  options?: RequestInit
) => {
  options = options || {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const apiResponse = await fetch(apiUrl, options);
    return apiResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
