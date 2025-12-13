# MithaWala - Sweet Shop Management System

A modern, full-stack web application for managing a sweet shop's inventory, sales, and customer interactions. Built with love and the latest web technologies.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage Guide](#usage-guide)
  - [Admin Panel](#admin-panel)
  - [Customer View](#customer-view)
- [Screenshots](#screenshots)
- [My AI Usage](#my-ai-usage)

## 🍬 About the Project

**MithaWala** is a robust platform designed to bridge the gap between traditional sweet shops and modern e-commerce. It offers a seamless experience for customers to browse, filter, and purchase sweets, while providing shop administrators with powerful tools to manage inventory, track stock levels, and update prices in real-time.

## 🛠 Tech Stack

**Frontend:**

- **React 18** (Vite) - Fast, component-based UI
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Modern, utility-first styling
- **Axios** - API communication
- **React Router** - Single Page Application routing

**Backend:**

- **Node.js & Express** - Scalable server architecture
- **Prisma ORM** - Type-safe database access
- **SQLite** - Lightweight, zero-config database
- **JWT** - Secure authentication
- **Jest** - Testing framework

## ✨ Features

- **Authentication**: Secure Customer Registration & Login, plus a protected Admin Portal.
- **Dynamic Inventory**: Real-time stock tracking. Items auto-update to "Out of Stock".
- **Smart Search & Filter**: Instant search by name and filtering by categories (Sugar Free, Packed, Traditional).
- **Shopping Cart**: Persistent cart with quantity controls and real-time total calculation.
- **Admin Dashboard**:
  - Add/Edit/Delete products.
  - Image upload support (URL or File).
  - One-click Restocking.
  - Secure Route protection.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Initialize the database:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```
4.  Seed the database (Optional but recommended):
    ```bash
    node seed_sweets.js
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```
    _Server runs on port 3000._

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    _App runs on port 5173 (usually)._

## 📖 Usage Guide

### Admin Panel

1.  Go to `/login`.
2.  Click **"Admin Login"** or login with credentials:
    - **Email**: `admin@mithawla.com`
    - **Password**: `admin`
3.  Manage inventory, update prices, and view stock status.

### Customer View

1.  Visit the home page.
2.  Browse sweets by category or search.
3.  Add items to cart (Login required for checkout).
4.  View cart and adjust quantities.

## 📸 Screenshots

### Home Page

> Display showing the hero section and product grid with filters.
> ![Home Page](path/to/screenshot_home.png)

### Admin Dashboard

> Interface for adding and editing sweets with image preview.
> ![Admin Dashboard](path/to/screenshot_admin.png)

### Shopping Cart

> Cart view with quantity adjustments and total summary.
> ![Shopping Cart](path/to/screenshot_cart.png)

## 🤖 My AI Usage

**Code Assistance:**
This project leveraged **AGI (Advanced General Intelligence)** agents for:

- **Scaffolding**: Generating initial boilerplate for Express and React.
- **Debugging**: Identifying and fixing type errors in TypeScript and resolving React hook dependency issues.
- **Refactoring**: Converting CSS to Tailwind utility classes for a consistent design system.
- **Testing**: Writing Jest unit tests for backend API endpoints.


**Security Reviews:**

- The AI assisted in identifying potential security gaps in the Admin Route protection and recommended implementing double-checked locking mechanisms.

---

_Built with ❤️ by the Harshit Kumar Mehta_
