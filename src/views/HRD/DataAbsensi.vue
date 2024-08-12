<template>
  <div class="container mt-3 text-white">
    <h2>Data Absensi</h2>
    <Absensi :data="dataAbsensi" :spesifikasi="spesifikasiTable" />
  </div>
</template>

<script setup>
import { getCookie } from "@/plugins/cookies";
import router from "@/router";
import { onMounted, computed } from "vue";
import { useAbsenStore } from "@/stores/absen";
import Absensi from "@/components/Absensi.vue";

const absenStore = useAbsenStore();
const dataAbsensi = computed(() => {
  return absenStore.gtrGetAllAbsen;
});

const spesifikasiTable = [
  "#",
  "Nama Karyawan",
  "Absen Masuk",
  "Absen Keluar",
  "WFH",
  "Bukti WFH",
  "Keterangan",
];
onMounted(async () => {
  const res = JSON.parse(getCookie("data"));
  if (res.role === "karyawan") {
    router.push("/absensi");
  }
  await absenStore.actGetAllAbsen();
});
</script>

<style lang="scss" scoped></style>
