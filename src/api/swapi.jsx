import Instance from "./Instance";

export const getCharacters = async (page = 1) => {
  const res = await Instance.get(`/people/?page=${page}`);
  return res.data;
};

export const getHomeworld = async (url) => {
  const res = await Instance.get(url);
  return res.data;
};
