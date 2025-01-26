"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const blog_router_1 = require("../modules/blog/blog.router");
const auth_router_1 = require("../modules/auth/auth.router");
const admin_router_1 = require("../modules/admin/admin.router");
const product_router_1 = require("../modules/products/product.router");
const order_router_1 = require("../modules/orders/order.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users/",
        routes: user_router_1.userRoutes
    },
    {
        path: "/blogs",
        routes: blog_router_1.blogRoutes
    },
    {
        path: "/products",
        routes: product_router_1.productRoutes
    },
    {
        path: "/orders",
        routes: order_router_1.orderRoutes
    },
    {
        path: "/auth",
        routes: auth_router_1.authRoutes
    },
    {
        path: "/admin",
        routes: admin_router_1.AdminRoutes
    }
];
moduleRoutes.forEach(({ path, routes }) => {
    router.use(path, routes);
});
exports.default = router;
