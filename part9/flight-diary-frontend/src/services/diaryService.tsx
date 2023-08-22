import axios from "axios";
import { API_BASE_URL } from "../constants";
import { DiaryEntry, NewDiary } from "../types";

const baseURL = `${API_BASE_URL}/diaries`

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseURL)
    .then(response => response.data);
};

export const createDiary = (object: NewDiary) => {
  return axios
    .post<DiaryEntry>(baseURL, object)
    .then(response => response.data);
}