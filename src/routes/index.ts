import { Router } from "express";
import { userRoutes } from "../modules/user/user.router";
import { blogRoutes } from "../modules/blog/blog.router";
import { authRoutes } from "../modules/auth/auth.router";
import { AdminRoutes } from "../modules/admin/admin.router";
import { productRoutes } from "../modules/products/product.router";
import { orderRoutes } from "../modules/orders/order.router";

const router = Router();

const moduleRoutes = [
    {
        path: "/users/",
        routes: userRoutes
    },
    {
        path: "/blogs",
        routes: blogRoutes
    },
    {
        path: "/products",
        routes: productRoutes
    },
    {
        path: "/orders",
        routes: orderRoutes
    },
    {
        path: "/auth",
        routes: authRoutes
    },
    {
        path: "/admin",
        routes: AdminRoutes
    }
]

moduleRoutes.forEach(({ path, routes }) => {
    router.use(path, routes);
});

export default router;