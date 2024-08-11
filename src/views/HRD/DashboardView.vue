<template>
  <div
    class="container-fluid w-100 p-4"
    style="background-color: black; height: 100vh"
  >
    <div class="d-flex align-items-start navbar-custom">
      <div
        class="nav flex-column nav-pills me-3 h-custom p-4"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <RouterLink to="/" style="text-decoration: none">
          <button
            class="nav-link"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          ></button>
        </RouterLink>
        <RouterLink to="/datakaryawan" style="text-decoration: none">
          <button
            class="nav-link active"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            Karyawan
          </button>
        </RouterLink>
        <RouterLink to="/dataabsensi" style="text-decoration: none">
          <button
            class="nav-link"
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          >
            Absensi
          </button>
        </RouterLink>
        <button class="nav-link" @click="logout">Logout</button>
      </div>
      <div
        class="tab-content w-100 h-100 align-item-center p-4"
        id="v-pills-tabContent"
      >
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCookie } from "@/plugins/cookies";
import router from "@/router";
import { onMounted, computed } from "vue";
import { useUsersStore } from "@/stores/users";

const userStore = useUsersStore();

const logout = () => {
  userStore.logout();
};
onMounted(async () => {
  const res = JSON.parse(getCookie("data"));
  if (res.role === "karyawan") {
    router.push("/absensi");
  }
  router.push("/datakaryawan");
});
</script>

<style lang="css" scoped>
.navbar-custom {
  border-radius: 10px;
  height: 100%;
  background-color: #c15959;
}
.h-custom {
  height: 100%;
  border-radius: 10px 0px 0px 10px;
  background-color: #ffffff;
}

.custom-tabs {
  border-radius: 10px;
  height: 100%;
  background-color: white;
  width: 100%;
}
</style>
