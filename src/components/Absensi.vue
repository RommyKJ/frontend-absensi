<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      class="form-control"
      placeholder="Search"
      @input="searchData"
    />
    <div class="form-group mt-2 d-flex justify-content-between w-100">
      <div style="width: 45%">
        <label for="filter">Filter by:</label>
        <select
          v-model="selectedFilter"
          @change="filterData"
          class="form-control"
        >
          <option value="">All</option>
          <option
            v-for="(value, index) in filterOptions"
            :key="index"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </div>
      <div style="width: 45%">
        <label for="filter">Filter Tanggal:</label>
        <input
          type="date"
          class="form-control"
          id="dateInput"
          v-model="selectedDate"
        />
      </div>
    </div>

    <table class="table table-responsive table-bordered mt-3">
      <thead>
        <tr>
          <th v-for="(item, i) in spesifikasi" :key="i">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="index">
          <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ formatDate(item.absen_masuk) }}</td>
          <td>
            {{ item.absen_keluar === "" ? "" : formatDate(item.absen_keluar) }}
          </td>
          <td>{{ item.is_wfh }}</td>
          <td class="text-center">
            <img
              v-if="item.is_wfh === 'yes'"
              :src="fetchImgURL(item.img_wfh)"
              width="50px"
              height="50px"
              @click="openGambar(fetchImgURL(item.img_wfh))"
              data-bs-toggle="modal"
              data-bs-target="#modalGambar"
            />
          </td>
          <td>{{ item.keterangan }}</td>
        </tr>
      </tbody>
    </table>

    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(currentPage - 1)"
          >Previous</a
        >
      </li>
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(currentPage + 1)"
          >Next</a
        >
      </li>
    </ul>

    <div
      class="modal fade"
      id="modalGambar"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="modalGambarLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-body">
            <img :src="imgURLPath" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useFilter from "@/composable/filter";

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  spesifikasi: {
    type: Array,
    default: [],
  },
});
const { formatDate, isLate } = useFilter();
const searchQuery = ref("");
const selectedFilter = ref("");
const filterOptions = ref(["WFH", "Telat"]); // Sesuaikan filter options
const currentPage = ref(1);
const itemsPerPage = ref(5);
const imgURLPath = ref("");
const selectedDate = ref("");

const fetchImgURL = (imgPath) => {
  let imgName = imgPath.split("/").pop();
  return `http://localhost:4000/img/${imgName}`;
};

const openGambar = (imgURL) => {
  console.log(imgURL);
  imgURLPath.value = imgURL;
};

const filteredData = computed(() => {
  let filtered = props.data;

  if (searchQuery.value) {
    filtered = filtered.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  }

  if (selectedFilter.value === "WFH") {
    filtered = filtered.filter((item) => item.is_wfh === "yes");
  } else if (selectedFilter === "Telat") {
    filtered = filtered.filter((item) => item.keterangan === "telat");
  }

  if (selectedDate.value) {
    filtered = filtered.filter((item) => {
      const itemDateString = new Date(item.absen_masuk)
        .toISOString()
        .split("T")[0];
      return itemDateString === selectedDate.value;
    });
  }

  return filtered;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredData.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / itemsPerPage.value)
);

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const searchData = () => {
  currentPage.value = 1;
};

const filterData = () => {
  currentPage.value = 1;
};
</script>

<style>
/* Tambahkan gaya khusus jika diperlukan */
</style>
