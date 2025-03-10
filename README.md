﻿# Task Notification Project

This project is a task notification application built with **Next.js** for the frontend and **Express.js** for the backend. It allows users to manage notifications and perform various tasks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Clone the Repository

    bash
    git clone https://github.com/shashishsoni/task-notification-menn.git
    cd task-notification-menn


### Install Server Dependencies

Navigate to the server directory and install the dependencies:

    bash
    cd server
    npm install


### Install Client Dependencies

Navigate to the client directory and install the dependencies:
    
    bash
    cd client
    npm install


## Usage

### Running the Server

To start the server, navigate to the server directory and run:

    bash
    cd server
    npm start

The server will run on `http://localhost:5000` (or the port specified in your environment variables).

### Running the Client

To start the client, navigate to the client directory and run:

    bash
    cd client
    npm run dev


The client will run on `http://localhost:3000`.

### Accessing the Application

Once both the server and client are running, you can access the application in your browser at `http://localhost:3000`.

## API Endpoints

Here are some of the available API endpoints:
    
    - **GET** `/api/notifications`: Retrieve all notifications.
    - **POST** `/api/notifications/send-sms`: Send an SMS notification.
    - **GET** `/api/users`: Retrieve all users.
    - **POST** `/api/createuser`: Create a new user.

## Project Structure

Here’s a brief overview of the project structure:

    task-notification-menn/
    ├── client/ # Frontend application (Next.js)
    │ ├── src/
    │ │ ├── components/ # React components
    │ │ ├── pages/ # Next.js pages
    │ │ └── styles/ # CSS styles
    │ ├── package.json # Client dependencies and scripts
    │ └── README.md # Client README
    ├── server/ # Backend application (Express.js)
    │ ├── routes/ # API routes
    │ ├── index.js # Main server file
    │ └── package.json # Server dependencies and scripts
    ├── vercel.json # Vercel deployment configuration
    └── README.md # Project README

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
