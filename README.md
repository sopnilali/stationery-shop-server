# 🎉 Welcome to My Blog Project !!
<h2>Project Overview</h2>
<p>Assalamu Alaikum! My Name is Md Abdul Adud. Project Name: Blog Project. I am Develop an Express application with TypeScript, integrating MongoDB with Mongoose to manage a Blog Project.</p>

<p>Develop a backend for a blogging platform with two roles: Admin (manages users and blogs) and User (CRUD on their blogs). Features include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter options.</p>

<h2>Project Name: Blog Project </h2>

<strong>GitHub Repository Link</strong> : https://github.com/sopnilali/blog-projects

 <strong>Live: URL</strong> : https://blog-projects.vercel.app/

 <strong>Video Explanation</strong>: https://drive.google.com/file/d/1o8kTxMshSuzYhJuqlAuUHS50C5PC5B94/view

<h2> Technology Used ⚙️</h2>
<li>Node.js</li>
<li>Express.js</li>
<li>MongoDB with Mongoose</li>
<li>TypeScript</li>

# Folder Structure 📂
<p>I organized the project by creating this folder structure. The folders here are admin, auth, user and blog. All of them are crated in different files, so that they can be controlled and handled very easily.</p>

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
│   │   ├── auth.router.ts
│   │   ├── auth.service.ts
│   │   ├── auth.utils.ts
│   │   ├── auth.validation.ts
│   ├── blog/
│   │   ├── blog.controller.ts
│   │   ├── blog.interface.ts
│   │   ├── blog.model.ts
│   │   ├── blog.router.ts
│   │   ├── blog.service.ts
│   │   ├── blog.validation.ts
│   ├── user/
│   │   ├── user.constant.ts
│   │   ├── user.controller.ts
│   │   ├── user.interface.ts
│   │   ├── user.model.ts
│   │   ├── user.router.ts
│   │   ├── user.service.ts
│   │   ├── auth.validation.ts
│   ├── routes/
│   │   ├── index.ts
│   ├── utils/
│   │   ├── catchAsync.ts
│   │   ├── sendResponse.ts
├── app.ts
├── server.ts
</pre>

# Blog Model 🚟
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
 
# User Model 👥
<p> I created the order model with validation.</p>
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'], // user role admin or user
      default: 'user', // default user role
    },
    isBlocked: {
      type: Boolean,
      default: false,
    }
</pre>

# Features of Blog ⚡
<li>Create Blog</li>
<li>Get All Blog by Search Terms (ex: blogtitle, sortBy=title, Filter blogs by author ID)</li>
<li>Update Blog. To update blog, you need to update the blog using blogid. But You can must first login user and then user Authorization Bearer token. And then if this token is valid so you can update blog content otherwise not delete blog content</li>
<li>Delete Blog. To delete blogs, you need to delete the blogs using blog. But You can must first login user and then user Authorization Bearer token. And then if this token is valid so you can update blog content otherwise not delete blog content</li>
<li>If a user is blocked, that user will not be able to post blogs.</li>

# Features of Admin 👤

<li>Admin can block any user at any time if that user discloses any irrelevant information. For this you must use the Admin Authorization Bearer token. </li>
<li>Admin can delete any blog content post if they want. For this you must use admin Authorization Bearer token. Otherwise you will be kicked out with a consolation prize</li>


# Features of Users 👥
<li>Create Users (ex: name, email, password, role (default role --> user))</li>
<li>Only the admin can see all user data. For this, the admin must use the Authorization Bearer token. Otherwise, you will be kicked out with a consolation prize.</li>
<li>User Login using email and password (ex: example@example.com, example1234) </li>
<li>If a user is blocked, that user will not receive any services.</li>

# Error Handling ⚠️
<li>I am implement error handling for invalid authorization. If your token is invalid or not assign authorization token , then show this error message</li>
<pre>
     {
    "success": false,
    "message": "You are not authorized!",
    "errorSources": [
        {
            "path": "",
            "message": "You are not authorized!"
        }
    ],
    "err": {
        "statusCode": 401
    },
    "stack": "Error: You are not authorized!\n    at /var/task/dist/middlewares/auth.js:30:19\n...."
}
</pre>
<li>I am implement error handling for invalid ObjectId</li>
<pre>
    {
    "message": "An error occurred while deleting product",
    "status": false,
    "error": {
        "stringValue": "\"6766a0b2b3a8c4c9015aff1\"",
        "valueType": "string",
        "kind": "ObjectId",
        "value": "6766a0b2b3a8c4c9015aff1",
        "path": "_id",
        "reason": {},
        "name": "CastError",
        "message": "Cast to ObjectId failed for value \"6766a0b2b3a8c4c9015aff1\" (type string) at path \"_id\" for model \"blogs\""
    },
    "stack": "Error: \n    at C:\\new ts assignmet\\blog-project-server\\src\\modules\\blog\\blog.controller.ts:103:24\n....
}
</pre>

<li>I am implement error handling for invalid Authorization token</li>
<pre>
    {
    "success": false,
    "message": "invalid signature",
    "errorSources": [
        {
            "path": "",
            "message": "invalid signature"
        }
    ],
    "err": {
        "name": "JsonWebTokenError",
        "message": "invalid signature"
    },
    "stack": "JsonWebTokenError: invalid signature\n    at C:\\new ts assignmet\\blog-project-server\\node_modules\\jsonwebtoken\\verify.js:171:19\n.....
}
</pre>

<li>I am implement error handling for user block from admin</li>
<pre>
    {
    "success": false,
    "message": "This user is blocked ! !",
    "errorSources": [
        {
            "path": "",
            "message": "This user is blocked ! !"
        }
    ],
    "err": {
        "statusCode": 403
    },
    "stack": "Error: This user is blocked ! !\n    at /var/task/dist/modules/auth/auth.service.js:31:15\n ...."
}
</pre>

<li><strong>API Not Found:</strong> If you hit a wrong route, it will send a message and tell you your status, and which route you hit. </li>
<pre>
{
"success": false,
"message": "API Not Found /gh",
"error": "Error: API Not Found /gh\n    at notFound (/var/task/dist/middlewares/notFound.js:10:19)\n ..."
}
</pre>

# Thanks you Sir/Mam 💕





