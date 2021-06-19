import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseURL = 'http://192.168.18.4:4500/api';

export const setUser = async (data) => {
  await SecureStore.setItemAsync('token', data.token);
  await SecureStore.setItemAsync('user', JSON.stringify(data));
  axios.defaults.headers.common['Authorization'] = data.token;
};

export const signup = (data) => {
  return axios({
    url: `${baseURL}/users/signup`,
    method: 'POST',
    data: data,
  });
};
export const login = (data) => {
  return axios({
    url: `${baseURL}/users/login`,
    method: 'POST',
    data: data,
  });
};

// Leveltests
// export const createLeveltest = async (data) => {
//   const token = await SecureStore.getItemAsync("token");
//   return axios({
//     url: `${baseUrl}/leveltest`,
//     method: "POST",
//     data: data,
//     headers: {
//       Authorization: token,
//     },
//   });
// };
// export const getLeveltests = () => {
//   return axios({
//     url: `${baseUrl}/leveltest`,
//     method: "GET",
//   });
// };
// export const getLeveltest = (id) => {
//   return axios({
//     url: `${baseUrl}/leveltest/${id}`,
//     method: "GET",
//   });
// };
// export const updateLeveltest = (data) => {
//   return axios({
//     url: `${baseUrl}/leveltest/${data.id}`,
//     method: "PATCH",
//     data: data.payload,
//   });
// };

// // Competences
// export const createComptence = async (data) => {
//   const token = await SecureStore.getItemAsync("token");
//   return axios({
//     url: `${baseUrl}/competence`,
//     method: "POST",
//     data: data,
//     headers: {
//       Authorization: token,
//     },
//   });
// };
// export const getCompetences = () => {
//   return axios({
//     url: `${baseUrl}/competence`,
//     method: "GET",
//   });
// };
// export const getCompetence = (id) => {
//   return axios({
//     url: `${baseUrl}/competence/${id}`,
//     method: "GET",
//   });
// };
// export const updateCompetence = (data) => {
//   return axios({
//     url: `${baseUrl}/competence/${data.id}`,
//     method: "PATCH",
//     data: data.payload,
//   });
// };

// // Sub Competences
// export const createSubComptence = async (data) => {
//   const token = await SecureStore.getItemAsync("token");
//   return axios({
//     url: `${baseUrl}/subcompetence`,
//     method: "POST",
//     data: data,
//     headers: {
//       Authorization: token,
//     },
//   });
// };
// export const getSubCompetences = () => {
//   return axios({
//     url: `${baseUrl}/subcompetence`,
//     method: "GET",
//   });
// };
// export const getSubCompetence = (id) => {
//   return axios({
//     url: `${baseUrl}/subcompetence/${id}`,
//     method: "GET",
//   });
// };
// export const updateSubCompetence = (data) => {
//   return axios({
//     url: `${baseUrl}/subcompetence/${data.id}`,
//     method: "PATCH",
//     data: data.payload,
//   });
// };

// // Assessor
// export const createAssessor = async (data) => {
//   const token = await SecureStore.getItemAsync("token");
//   return axios({
//     url: `${baseUrl}/assessor`,
//     method: "POST",
//     data: data,
//     headers: {
//       Authorization: token,
//     },
//   });
// };
// export const getAssessors = () => {
//   return axios({
//     url: `${baseUrl}/assessor`,
//     method: "GET",
//   });
// };
// export const getAssessor = (id) => {
//   return axios({
//     url: `${baseUrl}/assessor/${id}`,
//     method: "GET",
//   });
// };
// export const updateAssessor = (data) => {
//   return axios({
//     url: `${baseUrl}/assessor/${data.id}`,
//     method: "PATCH",
//     data: data.payload,
//   });
// };

// // Courses
// export const createCourse = async (data) => {
//   const token = await SecureStore.getItemAsync("token");
//   return axios({
//     url: `${baseUrl}/course`,
//     method: "POST",
//     data: data,
//     headers: {
//       Authorization: token,
//     },
//   });
// };
// export const getCourses = () => {
//   return axios({
//     url: `${baseUrl}/course`,
//     method: "GET",
//   });
// };
// export const getCourse = (id) => {
//   return axios({
//     url: `${baseUrl}/course/${id}`,
//     method: "GET",
//   });
// };
// export const updateCourse = (data) => {
//   return axios({
//     url: `${baseUrl}/course/${data.id}`,
//     method: "PATCH",
//     data: data.payload,
//   });
// };
