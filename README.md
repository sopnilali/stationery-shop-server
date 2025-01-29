# 🎉 Welcome to My Stationary Shop !!
<h2>Stationary Shop API</h2>
<p>Assalamu Alaikum! My Name is Md Abdul Adud. Project Name: Stationery Shop. I am Develop an Express application with TypeScript, integrating MongoDB with Mongoose to manage a Stationery Shop.</p>

<h2>Project Name: Stationery Shop</h2>

<strong>GitHub Repository Link</strong> : https://github.com/sopnilali/stationery-shop-server

 <strong>Live: URL</strong> : https://stationery-shop-server.vercel.app/

 <strong>Video Explanation</strong>: https://drive.google.com/file/d/1T1gZgC2GYnobyTviYXZuG1ZKCiOfoCfy/view?usp=sharing

<h2>Technology Used ⚙️</h2>
<li>Node</li>
<li>Express</li>
<li>React</li>
<li>Mongoose</li>
<li>Redux</li>
<li>TypeScript</li>

# Folder Structure 📂
<p>I organized the project by creating this folder structure. The folders here are product, order and user. All of them are crated in different files, so that they can be controlled and handled very easily.</p>

<pre>
src/
├── modules/
│   ├── admin/
│   │   ├── admin.controller.ts
│   │   ├── admin.router.ts
│   │   ├── admin.service.ts
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.interface.ts
│   │   ├── auth.model.ts
│   │   ├── auth.router.ts
│   │   ├── auth.service.ts
│   │   ├── auth.utils.ts
│   │   ├── auth.validation.ts
│   ├── blog/
│   │   ├── blog.constant.ts
│   │   ├── blog.controller.ts
│   │   ├── blog.interface.ts
│   │   ├── blog.model.ts
│   │   ├── blog.router.ts
│   │   ├── blog.service.ts
│   ├── orders/
│   │   ├── order.controller.ts
│   │   ├── order.interface.ts
│   │   ├── order.model.ts
│   │   ├── order.router.ts
│   │   ├── order.service.ts
│   ├── products/
│   │   ├── product.controller.ts
│   │   ├── product.interface.ts
│   │   ├── product.model.ts
│   │   ├── product.router.ts
│   │   ├── product.service.ts
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.interface.ts
│   │   ├── user.model.ts
│   │   ├── user.router.ts
│   │   ├── user.service.ts
│   │   ├── user.validation.ts
├── app.ts
├── server.ts
</pre>

# Product Model 🚟
<pre>
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'], // if price is negative then price must be positive message show.
    },
    category: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    productImg: { type: String, default: 'https://i.ibb.co.com/F40Mt4Y/touchicon-180.png'},
    author: {
      type: Schema.Types.ObjectId,
        ref: 'users',
    },
    stock: { type: Number, required: true, default: 0 }
</pre>
 
# Order Model 🚟
<p> I created the order model.</p>
<pre>
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
</pre>

# User Model 👥
<pre>
name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photoURL: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'], // user role admin or user
      default: 'user', // default user role
    },
    phone: { type: String, required: true, default: "N/A" },
    address: { type: String, required: true, default: "N/A" },
    city: { type: String, required: true, default: "N/A" },
    isBlocked: {
      type: Boolean,
      default: false,
    }
</pre>

# Blog Model

<pre>
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    isPublished: {
        type: Boolean,
        default: true
    },
</pre>

# Features of Products ⚡
<li>Create Products</li>
<li>Get All Products by Search Terms (ex: name, category, brand)</li>
<li>Update Products. To update products, you need to update the product using productid.</li>
<li>Delete Products. To delete products, you need to delete the product using productid.</li>

# Features of Orders 🕎
<li>Create Orders from customer</li>
<li>Get All Orders</li>
<li>Calculate Total Prices each product by the quantity ordered. I am use MongoDB aggregation pipeline </li>

# Features of Blog 🕎
<li>Create Blog from user</li>
<li>Get All Blog</li>
<li>Update Blog. To update Blog, you need to update the blog using blogid.</li>
<li>Delete blogs. To delete blogs, you need to delete the blog using blogid.</li>

# Features of Users 👥
<li>Create Users (ex: name, email, address, phone, role (default role --> user))</li>
<li>Get All Users</li>
<li>Update User route access only admin user. If user role to admin, then show error "Admin role cannot be updated". Because, user can not be access update User Route </li>

# Error Handling ⚠️
<li>I am implement error handling for invalid input, missing data, invalid email and insufficient stock.</li>
<pre>
     "errors": {
            "email": {
                "name": "ValidatorError",
                "message": "sopnilstar is not a valid email type",
                "properties": {
                    "message": "sopnilstar is not a valid email type",
                    "type": "user defined",
                    "path": "email",
                    "value": "sopnilstar"
                },
                "kind": "user defined",
                "path": "email",
                "value": "sopnilstar"
            },
            "quantity": {
                "name": "ValidatorError",
                "message": "Quantity must be a positive number",
                "properties": {
                    "message": "Quantity must be a positive number",
                    "type": "min",
                    "min": 0,
                    "path": "quantity",
                    "value": -50
                },
                "kind": "min",
                "path": "quantity",
                "value": -50
            }
        }
</pre>
<li><strong>Not Found:</strong> If you hit a wrong route, it will send a message and tell you your status, and which route you hit. </li>
<pre>
{
    "status": false,
    "message": "Could not found /api/mylove",
    "stack": "Error: Could not found /api/mylove\n    at C:\\new ts assignmet\\stationery-shop-server\\src\\app.ts:30:17\n
}
</pre>

# Thanks you Sir/Mam 💕




