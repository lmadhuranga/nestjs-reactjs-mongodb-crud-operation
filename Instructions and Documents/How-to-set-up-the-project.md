# Nest.js and React Project Setup with MongoDB

This repository contains a sample project setup using Nest.js for the backend, React for the frontend, and MongoDB for the database. Follow the steps below to get the project up and running.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Server

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-project.git
    cd your-project
    ```

2. **Install Dependencies:**

    Install dependencies for both the backend (Nest.js) and the frontend (React):

    ```bash
    cd backend
    npm install

    cd ../frontend
    npm install
    ```

3. **Configure Environment Variables:**

    Rename the `.env.example` files in the `backend` and `frontend` directories to `.env` and fill in the required configuration values.

4. **Database Setup:**

    Install MongoDB and ensure it's running. Update the database configuration in the `backend/config/database.config.ts` file.



5. **Generate Private and Public Keys:**

    Open a terminal and navigate to the root directory of your Nest.js project.

6. **Generate Keys:**

    Run the following command to generate a private key (`private.key`) and a public key (`public.key`):

    ```bash
    openssl genpkey -algorithm RSA -out server/keys/private.key
    openssl rsa -pubout -in server/keys/private.key -out server/keys/public.key
    ```

    This will create `server/keys/private.key` (the private key) and `server/keys/public.key` (the corresponding public key) in the same directory. 


7. **Run the Application:**

    Run the backend and frontend servers in separate terminal tabs:

    ```bash
    # Terminal 1: Run the backend server
    cd backend
    npm run start:dev

    # Terminal 2: Run the frontend server
    cd frontend
    npm start
    ```

8. **Access the Application:**

    Open your web browser and navigate to `http://localhost:3001` to access the React frontend. The Nest.js backend will be running on `http://localhost:3000`.

