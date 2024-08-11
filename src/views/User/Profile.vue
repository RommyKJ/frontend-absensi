<template>
  <div class="bg-container">
    <div class="container">
      <div class="container-absen">
        <div class="w-100 d-flex flex-cols justify-content-between">
          <div
            style="width: 100px; height: 100px"
            @click="router.push('/absensi')"
          >
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="63.46 221.97 953.09 636.06"
              viewBox="63.46 221.97 953.09 636.06"
              xmlns="http://www.w3.org/2000/svg"
              data-type="color"
              role="presentation"
              aria-hidden="true"
            >
              <g>
                <path
                  d="M764.14 553.08V221.97s-81.61 6.7-103.89 59.78c-22.24 53.09-52.69 128.53-52.69 128.53V233.95s-86.01-1.84-113.42 70.07c-22.13 58.11-56.83 132.62-56.83 132.62l-.78 116.44h26.52l79.53-187.4v187.4s80.04-4.14 103.99-58.95c23.97-54.8 44.88-107.07 44.88-107.07v166.02h72.69z"
                  fill="#ec1c24"
                  data-color="1"
                ></path>
                <path
                  d="M359.11 333.98c-20.39 45.91-72.87 150.3-72.87 150.3l12.1 68.81s13.1-.92 21.1-17.24c8.01-16.36 18.63-39.81 18.63-39.81h51.36v57.05h56.91V280.51s-67.49 9.14-87.23 53.47zm31 117.58h-28.8l28.8-56.43v56.43z"
                  fill="#006ab5"
                  data-color="2"
                ></path>
                <path
                  d="M1016.55 504.41s-18.3 107.9-104.13 112.23c-56.94 2.88-39.56 1.41-103.57 1.55-286.56.47-535.38 96.41-745.39 239.84C255.02 686.7 423.63 566.04 830.39 519.65c60.19-6.84 129.12-13.08 186.16-15.24z"
                  fill="#ec1c24"
                  data-color="1"
                ></path>
                <path
                  d="M224.95 366.58C195.5 409.45 99.12 551.25 99.12 551.25s38.2 6.06 64.23-11.57c15.03-10.2 36.91-35.85 36.91-35.85h48.52l-.24 49.25h49.86V326.04s-43.92-2.33-73.45 40.54zm23.18 96.41h-31l31-49.08v49.08z"
                  fill="#ec1c24"
                  data-color="1"
                ></path>
              </g>
            </svg>
          </div>
          <div @click="logout">
            <span class="text-primary" style="cursor: pointer"
              ><b>Logout</b> <BIconArrowRight
            /></span>
          </div>
        </div>
        <div class="container-absen-form">
          <div
            class="alert alert-success"
            role="alert"
            v-if="isSuccess == true"
          >
            Update Berhasil!
          </div>
          <div
            class="alert alert-danger"
            role="alert"
            v-if="isSuccess == false"
          >
            Update Gagal!
          </div>
          <Input
            :user-data-by-id="userData"
            tipe="edit-profile"
            @update-data="patchUpdateUser"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Input from "@/components/Input.vue";
import { getCookie } from "@/plugins/cookies";
import { computed, onMounted, ref, onBeforeUnmount, watch } from "vue";
import router from "@/router";
import { useUsersStore } from "@/stores/users";

const storeUser = useUsersStore();
const isSuccess = ref(null);

const userData = ref(JSON.parse(getCookie("data")));

const logout = () => storeUser.logout();

const patchUpdateUser = async (data) => {
  console.log(data);
  const res = await storeUser.patchUpdateUser(data, "profile");
  if (res) {
    isSuccess.value = true;
  } else {
    isSuccess.value = false;
  }
};
</script>

<style lang="css" scoped>
.bg-container {
  background-image: url("https://png.pngtree.com/thumb_back/fh260/background/20230314/pngtree-beautiful-background-of-high-rise-buildings-image_1947772.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-absen {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  background-color: #fff;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  padding: 40px;
}

.container-absen-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
}
</style>
