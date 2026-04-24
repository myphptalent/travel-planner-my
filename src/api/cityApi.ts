import { cityApi } from "./axiosInstance";
export const searchCities = async (query: string) => {
  
  const res = await cityApi.get(`/cities`, {
    params: {
      namePrefix: query,
      limit: 10,
    },

  });

  return res.data.data;
};