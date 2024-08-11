<template>
  <RouterView />
</template>
<script setup>
import { getCookie } from "./plugins/cookies";
import { onMounted } from "vue";
import router from "./router";

onMounted(() => {
  if (!getCookie("token")) {
    router.push("/");
  }
});
</script>

<style scoped></style>
