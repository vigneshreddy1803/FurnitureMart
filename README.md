# 🪑 FurnitureMart

**Live Demo:** [https://furnituremart1.netlify.app/](https://furnituremart1.netlify.app/)
FurnitureMart is a modern **Furniture E-Commerce Web Application** developed using **React.js**. The application allows users to browse furniture products, register, log in, and interact with the platform.

The project also includes an **Admin Dashboard** where administrators can monitor registered users, logged-in users, products, and sales-related information.

---

## 🚀 Features

### 👤 User Features

* User Registration
* User Login
* User Authentication
* Browse Furniture Products
* View Product Details
* Responsive User Interface
* Easy Navigation Between Pages

### 🛠️ Admin Features

* Admin Dashboard
* View Total Registered Users
* Monitor User Login Information
* View Available Products
* Monitor Product Requirements Based on Sales
* Manage and View Dashboard Information

### 🔗 API Integration

* Axios is used for fetching and sending data.
* Data can be transferred between different parts of the application through API requests.
* Separate service/API handling can be used for better code organization.

### 🎨 Styling

* Separate CSS files are used for individual pages and components.
* CSS is linked directly to the required pages.
* No unnecessary main CSS file is used for all page styling.
* The project structure is maintained without changing existing modules or folders.

---

## 🛠️ Technologies Used

* **React.js**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Axios**
* **React Router DOM**
* **JSON Server / Backend API** *(depending on project configuration)*

---

## 📂 Project Structure

```text
FurnitureMart/
│
├── public/
│
├── src/
│   ├── components/
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── Login
│   │   ├── Register
│   │   ├── Products
│   │   └── Admin Dashboard
│   │
│   ├── services/
│   │   └── API / Axios Configuration
│   │
│   ├── css/
│   │   └── Separate CSS files for pages
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
│
└── README.md
```

> The existing project folder and module structure should be maintained as required.

---

## ⚙️ Installation

### 1. Clone or Download the Project

Download the FurnitureMart project and open it in **Visual Studio Code**.

### 2. Open the Project Folder

```bash
cd FurnitureMart
```

### 3. Install Dependencies

```bash
npm install
```

---

## ▶️ Run the Application

Start the React development server:

```bash
npm run dev
```

After running the command, open the URL displayed in the terminal.

Usually, Vite applications run on:

```text
http://localhost:5173
```

---

## 🗄️ Run the Database

If the project uses **JSON Server**, run the database in a separate terminal:

```bash
npx json-server --watch db.json --port 3000
```

The API server will usually run at:

```text
http://localhost:3000
```

Make sure the React application and database server are running at the same time.

---

## 🔄 Axios Usage

Axios is used to communicate with the backend or JSON server.

Example operations include:

* **GET** → Fetch users and products
* **POST** → Add registration or login data
* **PUT/PATCH** → Update product information
* **DELETE** → Remove data when required

Example:

```javascript
import axios from "axios";

const response = await axios.get(
  "http://localhost:3000/products"
);

console.log(response.data);
```

---

## 📊 Admin Dashboard

The Admin Dashboard helps the administrator monitor important information such as:

* 👥 Total Registered Users
* 🔐 User Login Details
* 🪑 Total Products
* 📦 Product Availability
* 📈 Sales Requirements
* 📊 Overall Application Information

This makes it easier for the administrator to understand the current status of the FurnitureMart application.

---

## 🎯 Project Objective

The main objective of **FurnitureMart** is to create a user-friendly furniture shopping platform while also providing an admin interface for managing and monitoring application data.

The project demonstrates important frontend development concepts such as:

* React Components
* React Routing
* State Management
* User Authentication
* Axios API Integration
* CRUD Operations
* Admin Dashboard Development
* Responsive Web Design
* Separate CSS Styling

---

## 👨‍💻 How to Use

### For Users

1. Open the FurnitureMart application.
2. Register for a new account.
3. Log in using your credentials.
4. Browse available furniture products.
5. View product information.

### For Admin

1. Log in as an administrator.
2. Open the Admin Dashboard.
3. View registered users.
4. Monitor user information.
5. View available products.
6. Check product requirements based on sales.

---

## 📌 Future Improvements

The following features can be added in the future:

* 🛒 Shopping Cart
* ❤️ Wishlist
* 💳 Online Payment Integration
* 📦 Order Management
* 🔍 Product Search and Filtering
* ⭐ Product Reviews and Ratings
* 📈 Advanced Sales Analytics
* 🔐 Role-Based Authentication
* 📱 Improved Mobile Responsiveness

---

## 👨‍💻 Developer

**Vignesh Reddy**

FurnitureMart was developed as a frontend project to practice and demonstrate skills in:

* React.js
* JavaScript
* HTML
* CSS
* Axios
* API Integration
* Admin Dashboard Development

---

## 📄 Conclusion

FurnitureMart is a React-based furniture shopping application designed with both **user functionality** and **administrative management** in mind.

The project provides a practical implementation of modern frontend development concepts, including authentication, API communication using Axios, separate CSS styling, product management, and an admin dashboard.

⭐ If you like this project, feel free to support it!

