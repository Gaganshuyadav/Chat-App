
# Chat Application

## Overview

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to engage in group chats, send friend requests,  send photos, audios and videos and receive notifications. The application includes robust authentication and authorization mechanisms, error handling, and a user-friendly interface built with Material UI.

## Features

- **Group Chat**: Users can create and participate in group chats.
- **Group Chat Creators**: admins can add members Max 100, and remove members, rename group.
- **Friend Requests**: Users can send and receive requests to join as friends.
- **Notifications**: Real-time notifications for messages and friend requests.
- **Authentication & Authorization**: Secure login and registration using JWT and Bcrypt.
- **Admin Panel**: the entire control of the site is with the administrator( charts, panel, secret Key). 
- **Media Share**: users can share photos, videos and audio.
- **Error Handling**: Comprehensive error handling throughout the application.
- **Select Messages**: Deleting messages by selecting it(multiple)
- **Responsive UI**: Built with Material UI for a seamless user experience.
- **Infinite Scrolling**: Used in UI for Fetching Old chats, 20 messages per page.
- **Admin Control Panel**: Manage Users, messages and groups, last 7 days activities, charts.

## Tech Stack

- **Frontend**: 
  - React
  - @reduxjs/toolkit
  - RTK Query
  - React Router DOM
  - Material UI
  - Axios
  - Moment.js
  - chart.js

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Socket.io
  - Bcrypt
  - JSON Web Token
  - Multer
  - Cookie-parser
  - CORS
  - Dotenv
  - Express-validator
  - cloudinary

## Installation

### Prerequisites

- Node.js
- MongoDB
- NPM or Yarn

### Steps to Run the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Gaganshuyadav/Chat-App.git
   cd chat-app
  