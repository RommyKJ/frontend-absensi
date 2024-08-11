import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/User/LoginView.vue";
import AbsensiView from "../views/User/AbsensiView.vue";
import DashboardView from "@/views/HRD/DashboardView.vue";
import DataKaryawan from "@/views/HRD/DataKaryawan.vue";
import DataAbsensi from "@/views/HRD/DataAbsensi.vue";
import ProfileView from "@/views/USer/Profile.vue";
import { getCookie } from "@/plugins/cookies";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/absensi",
      name: "Absensi",
      component: AbsensiView,
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
      children: [
        {
          path: "/datakaryawan",
          name: "DataKaryawan",
          component: DataKaryawan,
        },
        {
          path: "/dataabsensi",
          name: "DataAbsensi",
          component: DataAbsensi,
        },
      ],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   // Cek apakah route memerlukan autentikasi
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // Cek token di cookie
//     const token = getCookie("token");

//     if (!token) {
//       // Jika token tidak ada, arahkan ke halaman login
//       next({ name: "Login" });
//     } else {
//       // Jika token ada, lanjutkan ke route yang diminta
//       next();
//     }
//   } else {
//     // Jika route tidak memerlukan autentikasi, lanjutkan ke route yang diminta
//     next();
//   }
// });

export default router;
