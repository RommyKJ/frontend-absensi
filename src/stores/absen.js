import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { setCookie, getCookie } from "../plugins/cookies";

const API = "http://localhost:4000/absen";
export const useAbsenStore = defineStore("absen", {
  state: () => ({
    allAbsen: [],
    isSuccess: false,
    errorMessages: "",
  }),
  actions: {
    async postAbsenUser(params) {
      try {
        const res = await axios.post(API, params);
        if (res.data.message === "POST absensi masuk karyawan berhasil") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        this.errorMessages = "Absensi gagal";
        return false;
      }
    },
    async actGetAllAbsen() {
      try {
        const res = await axios.get(API + "/all");
        this.allAbsen = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    gtrGetAllAbsen: (state) => {
      return state.allAbsen;
    },
    gtrErrMessage: (state) => {
      return state.errorMessages;
    },
  },
});
