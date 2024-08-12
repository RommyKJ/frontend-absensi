<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between mb-3 text-white">
      <h2>Data Karyawan</h2>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        @click="typeModal = 'add'"
      >
        + Karyawan
      </button>
    </div>
    <div
      v-if="isSuccess === true"
      class="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      <strong>{{ message }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <Karyawan
      :data="userData"
      :spesifikasi="spesifikasiTable"
      @tipe-modal="tipeModal"
    />

    <!-- Modal -->

    <div
      ref="modal"
      class="modal fade"
      id="staticBackdrop"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Data karyawan
            </h1>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" role="alert" v-if="getErrMessage">
              {{ getErrMessage }}
            </div>
            <div v-if="typeModal !== ''">
              <Input
                :tipe="typeModal"
                :user-data-by-id="userDataById"
                @reset="typeModal = ''"
                @submit-data="postAddUser"
                @update-data="patchUpdateUser"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import Input from "@/components/Input.vue";
import { getCookie } from "@/plugins/cookies";
import Karyawan from "@/components/Karyawan.vue";
import router from "@/router";
import { onMounted, computed, ref, watch } from "vue";
import { useUsersStore } from "@/stores/users";

const userStore = useUsersStore();
const typeModal = ref("");
const userData = computed(() => {
  return userStore.gtrGetAllUser;
});

const isSuccess = ref(false);

const message = computed(() => {
  return userStore.getSuccessMessage;
});
const tipeModal = async (val) => {
  await userStore.actGetUserById(val.idUser);
  typeModal.value = val.tipe;
};

const userDataById = computed(() => userStore.getUserData);

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
  if (res) {
    isSuccess.value = true;
  }
};

const patchUpdateUser = async (data) => {
  const res = await userStore.patchUpdateUser(data, "");
  if (res) {
    isSuccess.value = true;
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
