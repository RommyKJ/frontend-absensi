<template>
  <div class="container">
    <div class="w-100 d-flex justify-content-between mb-5">
      <div style="width: 30%">
        <h2 class="text-white">Total Pegawai</h2>
        <div class="info-container">
          <p class="text-100 mb-0">{{ userData.length }}</p>
          <p>Pegawai</p>
        </div>
      </div>
      <div style="width: 30%">
        <h2 class="text-white">Total HRD</h2>
        <div class="info-container">
          <p class="text-100 mb-0">{{ hrd.length }}</p>
          <p>Pegawai</p>
        </div>
      </div>
      <div style="width: 30%">
        <h2 class="text-white">Total Karyawan</h2>
        <div class="info-container">
          <p class="text-100 mb-0">{{ karyawan.length }}</p>
          <p>Pegawai</p>
        </div>
      </div>
    </div>
    <h4 class="text-white">Hari: {{ newDate }}</h4>
    <div class="w-100 d-flex justify-content-between">
      <div style="width: 45%">
        <h2 class="text-white">Total Pegawai Telat</h2>
        <div class="info-container">
          <p class="text-100 mb-0">{{ empLate.length }}</p>
          <p>Pegawai</p>
        </div>
      </div>
      <div style="width: 45%">
        <h2 class="text-white">Total Pegawai WFH</h2>
        <div class="info-container">
          <p class="text-100 mb-0">{{ empWFH.length }}</p>
          <p>Pegawai</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useAbsenStore } from "@/stores/absen";
import { useUsersStore } from "@/stores/users";
import useFilter from "@/composable/filter";

const { formatDate } = useFilter();
const absenStore = useAbsenStore();
const dataAbsensi = computed(() => {
  return absenStore.gtrGetAllAbsen;
});

const date = ref(new Date());
const newDate = computed(() => {
  const thisDay = formatDate(date.value);
  const hariIni = thisDay.split(",");
  return hariIni[0] + ", " + hariIni[1];
});

const karyawan = computed(() => {
  return userData.value.filter((item) => item.role === "karyawan");
});
const hrd = computed(() => {
  return userData.value.filter((item) => item.role === "hrd");
});

const empLate = computed(() => {
  const thisDay = date.value.toISOString().split("T")[0];
  return dataAbsensi.value.filter((item) => {
    const itemDateString = new Date(item.absen_masuk)
      .toISOString()
      .split("T")[0];
    return item.keterangan === "Telat" && itemDateString === thisDay;
  });
});

const empWFH = computed(() => {
  const thisDay = date.value.toISOString().split("T")[0];
  return dataAbsensi.value.filter((item) => {
    const itemDateString = new Date(item.absen_masuk)
      .toISOString()
      .split("T")[0];
    return item.is_wfh === "yes" && itemDateString === thisDay;
  });
});

const userStore = useUsersStore();
const userData = computed(() => {
  return userStore.gtrGetAllUser;
});

onMounted(async () => {
  await absenStore.actGetAllAbsen();
  await userStore.actGetAllUser();
});
</script>

<style lang="css" scoped>
.info-container {
  width: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  flex-direction: column;
}

.mb-5 {
  margin-bottom: 2rem;
}

.text-100 {
  font-size: 100px;
}
</style>
