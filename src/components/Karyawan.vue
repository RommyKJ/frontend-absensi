<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      class="form-control"
      placeholder="Search"
      @input="searchData"
    />
    <div class="form-group mt-2">
      <label for="filter" class="text-white">Filter by:</label>
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
          <td>{{ item.email }}</td>
          <td>{{ item.no_telepon }}</td>
          <td>{{ item.role }}</td>
          <td>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="$emit('tipeModal', { tipe: 'edit', idUser: item.id })"
            >
              <BIconPencilSquare /> Edit
            </button>
          </td>
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
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

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

const searchQuery = ref("");
const selectedFilter = ref("");
const filterOptions = ref(["HRD", "Karyawan"]); // Sesuaikan filter options
const currentPage = ref(1);
const itemsPerPage = ref(5);

const filteredData = computed(() => {
  let filtered = props.data;

  if (searchQuery.value) {
    filtered = filtered.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  }

  if (selectedFilter.value) {
    filtered = filtered.filter(
      (item) => item.role === selectedFilter.value.toLowerCase()
    );
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
