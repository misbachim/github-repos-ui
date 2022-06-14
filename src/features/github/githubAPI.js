import axios from "axios";

const baseURL = 'https://api.github.com/users';

export const fetchProfile = async (username) => {
  try {
    const response = await axios.get(`${baseURL}/${username}`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const fetchRepos = async (reposUrl) => {
  try {
    const response = await axios.get(`${reposUrl}`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}
