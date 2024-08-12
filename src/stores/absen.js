import { defineStore } from "pinia";
import axios from "axios";
import useFilter from "../composable/filter";
import router from "@/router";
import { setCookie, getCookie } from "../plugins/cookies";

const API = "http://localhost:4000/absen";
const { isLate } = useFilter();
export const useAbsenStore = defineStore("absen", {
  state: () => ({
    allAbsen: [],
    absen: [],
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
        this.allAbsen = res.data.data.map((absen) => {
          const isAbsenLate = isLate(absen.waktuAbsen);
          return {
            ...absen,
            keterangan: isAbsenLate,
          };
        });
      } catch (error) {
        this.errorMessages = "Get absensi gagal!";
      }
    },
    async actGetAbsenMasuk(params) {
      try {
        const res = await axios.get(API + `/masuk/${params}`);
        if (res.data.message === "Get absensi masuk karyawan berhasil") {
          this.absen = res.data.data;
          console.log(res);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        this.errorMessages = "get data gagal";
        return false;
      }
    },
    async actPatchAbsenKeluar(params) {
      try {
        const res = await axios.patch(API + "/keluar", params);
        if (res.data.message === "PATCH absensi keluar karyawan berhasil") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        this.errorMessages = "Absensi gagal";
        return false;
      }
    },
  },

  getters: {
    gtrGetAllAbsen: (state) => {
      return state.allAbsen;
    },
    gtrGetAbsenMasuk: (state) => {
      return state.absen;
    },
    gtrErrMessage: (state) => {
      return state.errorMessages;
    },
  },
});
