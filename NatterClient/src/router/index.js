import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import HomeView from "../views/HomeView.vue";
import { fetchUser } from "./profile/fetch";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                title: "Home",
            },
        },

        // Auth Routes
        {
            path: "/auth",
            name: "auth",
            component: () => import("@/views/AuthView.vue"),
            meta: {
                title: "Login or Register",
            },
        },

        // Profile Page Route
        {
            path: "/profile/:username?",
            name: "profile",
            component: () => import("@/views/ProfileView.vue"),
            props: async (route) => ({
                userInfo: await fetchUser(route.query.username),
            }),
            children: [
                {
                    path: "info",
                    name: "profileInfo",
                    component: () => import("@/components/profile/Info.vue"),
                    props: true,
                },
                {
                    path: "activity",
                    name: "profileActivity",
                    component: () =>
                        import("@/components/profile/UserActivity.vue"),
                    props: true,
                },
                {
                    path: "update-user",
                    name: "updateUser",
                    component: () =>
                        import("@/components/profile/UpdateUser.vue"),
                    props: true,
                },
                {
                    path: "update-password",
                    name: "updatePassword",
                    component: () =>
                        import("@/components/profile/UpdatePassword.vue"),
                    props: true,
                },
                {
                    path: "delete-user",
                    name: "deleteUser",
                    component: () =>
                        import("@/components/profile/DeleteUser.vue"),
                    props: true,
                },
            ],
            meta: {
                title: "User Profile",
                requiresAuth: true,
            },
        },

        // Chat Routes
        {
            path: "/chats",
            name: "chats",
            component: () => import("@/views/ChatsView.vue"),
            meta: {
                title: "Natter Chat",
                hideNav: true,
                requiresAuth: true,
            },
        },
    ],
});

router.beforeEach((to, from) => {
    document.title = to.meta?.title ? `${to.meta.title} - Natter` : "Natter";
});

export default router;
