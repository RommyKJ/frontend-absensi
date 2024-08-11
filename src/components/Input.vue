<template>
  <div class="text-black mb-3">
    <label for="name" class="mb-1">Nama</label>
    <input
      id="name"
      class="form-control mb-3"
      type="text"
      placeholder="Masukkan nama.."
      v-model="nama"
    />
    <label for="email" class="mb-1">Email</label>
    <input
      id="email"
      class="form-control mb-3"
      type="email"
      placeholder="Masukkan email.."
      v-model="email"
    />
    <label for="password" class="mb-1">Password</label>
    <input
      id="password"
      class="form-control mb-3"
      type="password"
      placeholder="Masukkan password.."
      v-model="password"
    />
    <label for="no" class="mb-1">No. Telepon</label>
    <input
      id="no"
      class="form-control mb-3"
      type="tel"
      placeholder="Masukkan nomor telepon.."
      v-model="phone"
    />
  </div>
  <div class="d-flex justify-content-end w-100">
    <button
      type="submit"
      class="btn btn-primary"
      style="margin-right: 10px"
      :disabled="email == '' || password == '' || nama == '' || phone == ''"
      @click="emitSubmit()"
    >
      Submit
    </button>

    <button
      type="button"
      class="btn btn-secondary ml-2"
      data-bs-dismiss="modal"
      @click="reset"
    >
      Cancel
    </button>
  </div>
</template>

<script setup>
import { defineEmits, ref } from "vue";

const props = defineProps({});

const nama = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const role = ref("");

const reset = () => {
  nama.value = "";
  email.value = "";
  phone.value = "";
  password.value = "";
};

const emit = defineEmits(["submitData"]);
const emitSubmit = () => {
  emit("submitData", {
    nama: nama.value,
    email: email.value,
    password: password.value,
    no_telepon: phone.value,
    role: "karyawan",
  });
};
</script>

<style lang="scss" scoped></style>
