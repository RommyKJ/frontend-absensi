<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between mb-3 text-white">
      <h2>Data Karyawan</h2>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        + Karyawan
      </button>
    </div>
    <Karyawan :data="userData" :spesifikasi="spesifikasiTable" />

    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Tambah data karyawan
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" role="alert" v-if="getErrMessage">
              {{ getErrMessage }}
            </div>
            <Input @submit-data="postAddUser" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Input from "@/components/Input.vue";
import { getCookie } from "@/plugins/cookies";
import Karyawan from "@/components/Karyawan.vue";
import router from "@/router";
import { onMounted, computed, ref } from "vue";
import { useUsersStore } from "@/stores/users";

const userStore = useUsersStore();

const userData = computed(() => {
  return userStore.gtrGetAllUser;
});

const spesifikasiTable = [
  "#",
  "Nama Karyawan",
  "Email",
  "No. Telepon",
  "Role",
  "Action",
];

const postAddUser = async (data) => {
  const res = await userStore.postAddUser(data);
  if (res === true) {
    router.go(0);
  }
};

const getErrMessage = computed(() => {
  return userStore.getErrMessage;
});

onMounted(async () => {
  const res = JSON.parse(getCookie("data"));
  if (res.role === "karyawan") {
    router.push("/absensi");
  }
  await userStore.actGetAllUser();
});
</script>

<style lang="scss" scoped></style>
