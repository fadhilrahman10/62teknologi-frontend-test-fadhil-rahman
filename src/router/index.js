import { createRouter, createWebHistory } from "vue-router";
import BusinessPage from "../page/BusinessPage.vue";
import BusinessDetailPage from "../page/BusinessDetailPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "business-list",
            component: BusinessPage,
        },
        {
            path: "/:id",
            name: "business-detail",
            component: BusinessDetailPage,
        },
    ],
});

export default router;