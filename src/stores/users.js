import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { setCookie, getCookie } from "../plugins/cookies";

const API = "http://localhost:4000/users";
export const useUsersStore = defineStore("users", {
  state: () => ({
    user: {},
    users: [],
    errMessage: "",
    isSuccess: false,
  }),
  actions: {
    async loginUser(params) {
      try {
        const res = await axios.post(API + "/login", params);
        console.log(res);
        if (res.data.message === "Login Berhasil") {
          const [data] = res.data.data;
          this.isSuccess = true;
          setCookie("data", JSON.stringify(data));
          setCookie("token", JSON.stringify(res.data.token));
          if (data.role === "karyawan") {
            router.push("/absensi");
          } else {
            router.push("/dashboard");
          }
        }
      } catch (error) {
        this.isSuccess = false;
        this.errMessage = error.response.data.message;
      }
    },
    async actGetAllUser() {
      try {
        const res = await axios.get(API);
        this.users = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async postAddUser(params) {
      try {
        const res = await axios.post(API + "/add", params);
        return true;
      } catch (error) {
        if (
          error.response.data.serverMessage.message.includes("Duplicate entry")
        ) {
          this.errMessage = "Email telah digunakan!";
        }
        return false;
      }
    },
    async actGetUserById(idUser) {
      try {
        const res = await axios.get(API + `/id=${idUser}`);
        const [data] = res.data.data;
        this.user = data;
      } catch (error) {
        console.log(error);
      }
    },
    async patchUpdateUser(params, type) {
      try {
        const res = await axios.patch(
          API + `/update/id=${params.id}`,
          params.data
        );
        if (type === "profile") {
          setCookie("data", JSON.stringify(res.data.data));
        }
        return true;
      } catch (error) {
        console.log(error);
        if (
          error?.response?.data?.serverMessage?.message?.includes(
            "Duplicate entry"
          )
        ) {
          this.errMessage = "Email telah digunakan!";
        }
        return false;
      }
    },

    logout() {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/");
    },
  },

  getters: {
    getUserData: (state) => {
      return state.user;
    },
    gtrGetAllUser: (state) => {
      return state.users;
    },
    getIsSucces: (state) => {
      return state.isSuccess;
    },
    getErrMessage: (state) => {
      return state.errMessage;
    },
  },
});
