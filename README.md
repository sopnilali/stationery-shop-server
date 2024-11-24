# 🎉 Welcome to My Stationary Shop !!
<h2>Stationary Shop API</h2>
<p>Assalamu Alaikum! My Name is Md Abdul Adud. Project Name: Stationery Shop. I am Develop an Express application with TypeScript, integrating MongoDB with Mongoose to manage a Stationery Shop.</p>

<h2>Project Name: Stationery Shop</h2>

<strong>GitHub Repository Link</strong> : https://github.com/sopnilali/stationery-shop-server

 <strong>Live: URL</strong> : https://stationery-shop-server.vercel.app/

 <strong>Video Explanation</strong>: https://drive.google.com/file/d/1fwnAzfQg8IbDaHqYAYTKJoC4eAn1c-IR/view

<h2> Technology Used ⚙️</h2>
<li>Node.js</li>
<li>Express.js</li>
<li>Mongoose</li>
<li>TypeScript</li>

# Folder Structure 📂
<p>I organized the project by creating this folder structure. The folders here are product, order and user. All of them are crated in different files, so that they can be controlled and handled very easily.</p>

<pre>
src/
├── modules/
│   ├── products/
│   │   ├── product.controller.ts
│   │   ├── product.interface.ts
│   │   ├── product.model.ts
│   │   ├── product.router.ts
│   │   ├── product.service.ts
│   ├── orders/
│   │   ├── order.controller.ts
│   │   ├── order.interface.ts
│   │   ├── order.model.ts
│   │   ├── order.router.ts
│   │   ├── order.service.ts
│   ├── users/
│   │   ├── user.controller.ts
│   │   ├── user.interface.ts
│   │   ├── user.model.ts
│   │   ├── user.router.ts
│   │   ├── user.service.ts
├── app.ts
├── server.ts
</pre>

# Stationary Shop Product Model 🚟
<pre>
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number,required: true},
    category: {type: String,required: true},
    description: { type: String, required: true },
    quantity: { type: Number,required: true,},
    inStock: { type: Boolean, default: true },
</pre>
 
# Order Model 🚟
<p> I created the order model with validation.</p>
<pre>
    email: { type: String, required: true},
    product: { type: Schema.Types.ObjectId, required: true},
    quantity: { type: Number, required: true},
    totalPrice: { type: Number, required: true},
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
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
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





