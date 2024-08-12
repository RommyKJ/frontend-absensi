<template>
  <div class="bg-container">
    <div class="container">
      <div class="container-absen">
        <div class="w-100 d-flex flex-cols justify-content-between">
          <div class="mb-3" @click="router.push('/absensi')">
            <span class="text-primary" style="cursor: pointer">
              <BIconArrowLeft /> <b>Absensi</b></span
            >
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
