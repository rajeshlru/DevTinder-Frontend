<!-- README-TOP -->
<a name="readme-top"></a>

<!-- PROJECT LOGO AND TITLE -->
<br />
<div align="center">
  <a href="https://github.com/rajeshlru/DevTinder-Frontend">
    <img src="https://i.imgur.com/gO2y0e9.png" alt="Logo" width="120" height="120">
  </a>

  <h1 align="center">🎨 DevTinder Frontend 🎨</h1>

  <p align="center">
    The Sleek, Responsive, and Intuitive User Interface for Developer Connections.
    <br />
    <br />
    <a href="YOUR_LIVE_DEMO_URL_HERE"><strong>🚀 View Live Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/rajeshlru/Devtinder-Backend">Explore the Backend</a>
    ·
    <a href="https://github.com/rajeshlru/DevTinder-Frontend/issues">Report a Bug</a>
  </p>
</div>

<!-- TECH STACK SHIELDS -->
<div align="center">
  <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  </a>
  &nbsp;
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  </a>
  &nbsp;
  <a href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit">
  </a>
  &nbsp;
  <a href="https://reactrouter.com/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
  </a>
  &nbsp;
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  </a>
  &nbsp;
  <a href="https://daisyui.com/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="Daisy UI">
  </a>
</div>

---

### 🧐 About The Project

Tired of swiping through endless vacation photos and cliché bios? **DevTinder** flips the script, creating a space where developers connect based on what truly matters: skills, projects, and passion.

This repository contains the complete source code for the DevTinder user interface. It's a modern, single-page application (SPA) built with React and Vite, focusing on a seamless user experience, responsive design, and real-time interactivity. From the satisfying swipe animations to the live chat, every component is crafted to make professional networking engaging and fun.

---

### 📸 Project Gallery

Here's a sneak peek into the DevTinder experience.

| **Authentication** | **Core Experience** |
| :---: | :---: |
| _Secure & Simple Sign Up_ | _Interactive Developer Feed_ |
| <img src="https://raw.githubusercontent.com/rajeshlru/DevTinder-Frontend/main/DevTinder-SignUp.jpg" alt="Sign Up Page" width="100%"> | <img src="https://raw.githubusercontent.com/rajeshlru/DevTinder-Frontend/main/DevTinder-Feed.jpg" alt="Feed Page" width="100%"> |
| _Easy Login_ | _Manage Your Connections_ |
| <img src="https://raw.githubusercontent.com/rajeshlru/DevTinder-Frontend/main/DevTinder-Login.jpg" alt="Login Page" width="100%"> | <img src="https://raw.githubusercontent.com/rajeshlru/DevTinder-Frontend/main/DevTinder-Connections.jpg" alt="Connections Page" width="100%"> |

| **Networking & Communication** | **Profile & Management** |
| :---: | :---: |
| _Handle Incoming Requests_ | _Comprehensive User Profile_ |
| <img src="https://raw.githubusercontent.com/rajeshlru/DevTinder-Frontend/main/DevTinder-Requests.jpg" alt="Requests Page" width="100%"> | <img src="https://raw.githubusercontent.com/rajeshlru/DevTinder-Frontend/main/DevTinder-About.jpg" alt="About/Profile Page" width="100%"> |
| _Real-Time Chat with Connections_ | _Intuitive Side Panel Navigation_ |
| <img src="https://raw.githubusercontent.com/rajeshlru/DevTinder-Frontend/main/DevTinder-Chat.jpg" alt="Chat Interface" width="100%"> | <img src="https://raw.githubusercontent.com/rajeshlru/DevTinder-Frontend/main/DevTinder-Contact&SidePanelShow.jpg" alt="Side Panel" width="100%"> |

---

### ✨ Core Features

*   **👨‍💻 Interactive User Feed:** A dynamic, scrollable feed of developer profiles. Engage with the classic "swipe right for interested, swipe left to ignore" gesture.
*   **🔐 Secure Authentication Flow:** A complete user authentication system with signup, login, and logout, powered by a robust Redux state management system.
*   **🛡️ Protected Routes:** Users are intelligently redirected to the login page if they attempt to access protected areas without being authenticated.
*   **✍️ Full Profile Management:** A dedicated page for users to view and edit their profiles, including skills, projects, and personal information.
*   **🤝 Connection Management:** Intuitive dashboards to view all established connections and manage incoming connection requests with accept or reject actions.
*   **💬 Real-Time Chat:** Once a connection is made, users can engage in instant, one-on-one conversations powered by a Socket.IO WebSocket integration.
*   **💡 User-Friendly Notifications:** Non-intrusive toast notifications provide instant feedback for actions like saving a profile or sending a connection request.
*   **📱 Fully Responsive Design:** Built with Tailwind CSS and Daisy UI, the entire application is beautifully responsive and accessible on all devices, from mobile phones to widescreen desktops.

---

### ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

#### Prerequisites

You'll need Node.js and npm/yarn installed. The backend server must also be running.
*   **Node.js** (v16 or later)
*   **npm** or **yarn**
*   A running instance of the [DevTinder Backend](https://github.com/rajeshlru/Devtinder-Backend)

#### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/rajeshlru/DevTinder-Frontend.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd DevTinder-Frontend
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your environment variables**
    Create a `.env.local` file in the root and add the backend API URL:
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
5.  **Start the development server**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

---

### 🌳 Project Structure

The project follows a standard Vite + React structure, with all application logic located in the `src` directory.
---
/
├── 📁 public/ # Static assets accessible from the root URL
├── 📁 src/
│ ├── 📁 assets/ # Images, fonts, and other static assets
│ ├── 📁 components/ # Reusable UI components (NavBar, UserCard, etc.)
│ ├── 📁 constants/ # Application-wide constants
│ ├── 📁 pages/ # Top-level page components (Login, Feed, Profile)
│ ├── 📁 redux/ # Redux Toolkit store, slices, and configuration
│ ├── 📁 services/ # API communication logic (Axios instances)
│ └── 📜 main.jsx # Application entry point
├── 📜 .gitignore
├── 📜 App.jsx # Main application component with routing
├── 📜 components.json # Configuration for UI components (e.g., shadcn/ui)
├── 📜 eslint.config.js # ESLint configuration
├── 📜 index.html # Main HTML entry point for Vite
├── 📜 package.json
├── 📜 tailwind.config.js # Tailwind CSS configuration
├── 📜 vite.config.js # Vite build configuration
└── 📜 README.md

text
---

### 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

### 📜 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

### 🙏 Support & Contact

Rajesh Elluru - [LinkedIn](https://www.linkedin.com/in/your-linkedin-profile/) - rajeshelluru143@gmail.com

Project Link: [https://github.com/rajeshlru/DevTinder-Frontend](https://github.com/rajeshlru/DevTinder-Frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
