import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchNewsIds = async () => {
  const response = await axios.get(`${BASE_URL}/newstories.json?print=pretty`);
  return response.data.slice(0, 100); 
};


export const fetchNewsItem = async (id) => {
  const response = await axios.get(`${BASE_URL}/item/${id}.json`);
  return response.data;
};
