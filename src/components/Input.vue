<template>
  <div class="text-black mb-3 w-100">
    <div class="mb-3">
      <label for="name" class="mb-1">Nama</label>
      <input
        id="name"
        class="form-control"
        type="text"
        placeholder="Masukkan nama.."
        v-model="nama"
      />
      <span class="text-danger" style="font-size: 10px" v-if="errNama">{{
        errNama
      }}</span>
    </div>
    <div class="mb-3">
      <label for="email" class="mb-1">Email</label>
      <input
        id="email"
        class="form-control"
        type="email"
        placeholder="Masukkan email.."
        v-model="email"
      />
    </div>
    <div class="mb-3" v-if="tipe === 'add' || tipe === 'edit-profile'">
      <label for="password" class="mb-1">Password</label>
      <input
        id="password"
        class="form-control"
        type="password"
        placeholder="Masukkan password.."
        v-model="password"
      />
      <span class="text-danger" style="font-size: 10px" v-if="errPassword">{{
        errPassword
      }}</span>
    </div>
    <div class="mb-3">
      <label for="no" class="mb-1">No. Telepon</label>
      <input
        id="no"
        class="form-control"
        type="tel"
        placeholder="Masukkan nomor telepon.."
        v-model="phone"
      />
      <span class="text-danger" style="font-size: 10px" v-if="errPhone">{{
        errPhone
      }}</span>
    </div>
    <div class="mb-3" v-if="tipe === 'edit' || tipe === 'edit-profile'">
      <label for="no" class="mb-1">Role</label>
      <input
        id="no"
        class="form-control"
        type="tel"
        placeholder="Masukkan nomor telepon.."
        v-model="role"
        readonly
      />
    </div>
  </div>
  <div class="d-flex justify-content-end w-100">
    <button
      type="submit"
      class="btn btn-primary"
      style="margin-right: 10px"
      :disabled="
        email == '' || errPassword !== '' || errNama !== '' || errPhone !== ''
      "
      @click="emitSubmit(tipe)"
    >
      {{ tipe === "edit" ? "Update" : "Submit" }}
    </button>

    <button
      v-if="tipe !== 'edit-profile'"
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
import { defineEmits, ref, watch } from "vue";

const props = defineProps({
  tipe: {
    default: "",
  },
  userDataById: {
    type: Object,
    default: {},
  },
});

const nama = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const role = ref("");
const errNama = ref("");
const errPassword = ref("");
const errPhone = ref("");

const reset = () => {
  nama.value = "";
  email.value = "";
  phone.value = "";
  password.value = "";
  emit("reset");
};

watch(nama, (val) => {
  const regex = /^(?!\s*$)[a-zA-Z\s]+$/;
  if (!regex.test(val)) {
    errNama.value = "Hanya boleh menggunakan huruf";
  } else {
    errNama.value = "";
  }
});

watch(password, (val) => {
  if (val.length < 8) {
    errPassword.value = "Password minimal 8 karakter";
  } else {
    errPassword.value = "";
  }
});

watch(phone, (val) => {
  const regex = /^\d+$/;
  if (!regex.test(val)) {
    errPhone.value = "Hanya boleh menggunakan angka";
  } else {
    errPhone.value = "";
  }
});

if (props.tipe === "edit" || props.tipe === "edit-profile") {
  nama.value = props.userDataById.nama;
  email.value = props.userDataById.email;
  phone.value = props.userDataById.no_telepon;
  role.value = props.userDataById.role;
  password.value = props.userDataById.password;
}

const emit = defineEmits(["submitData", "reset", "updateData"]);
const emitSubmit = (val) => {
  if (val === "add") {
    emit("submitData", {
      nama: nama.value,
      email: email.value,
      password: password.value,
      no_telepon: phone.value,
      role: "karyawan",
    });
  } else {
    const data = {
      nama: nama.value,
      email: email.value,
      password: password.value,
      no_telepon: phone.value,
      role: role.value,
      password: password.value,
    };
    emit("updateData", { id: props.userDataById.id, data: data });
  }
};
</script>

<style lang="scss" scoped></style>
