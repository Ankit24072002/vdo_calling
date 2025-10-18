**Apna Video Call**

Apna Video Call is a real-time video conferencing application built with React, WebRTC, and Socket.io. It allows multiple users to join a video call, chat, toggle camera/mic, and optionally share their screen. The application emphasizes simplicity, responsiveness, and seamless peer-to-peer video streaming.

1.Table of Contents

2.Features

3.Demo

4.Tech Stack

5.Installation

6.Usage

7.Project Structure

8.Future Enhancements

9.License

**Features**

Real-time video communication with multiple users using WebRTC.

Live chat with message notifications.

Toggle camera and microphone during the call.

Screen sharing support for presentations.

Automatic camera/mic permission handling.

Responsive UI with intuitive controls.

Clean, dark-themed interface for improved user experience.

**Demo**

A live demo can be hosted locally or on a server.  **Backend Live Link (https://vdo-calling-4.onrender.com)**
                                                     **(https://vdo-calling-5frontend.onrender.com)**

**Tech Stack**

Frontend: React.js, Material-UI (MUI), CSS Modules

Backend: Node.js, Socket.io

WebRTC: Peer-to-peer video and audio streaming

Others: Navigator MediaDevices API, MediaStream API

**Installation Prerequisites**

Node.js v18+

npm or yarn

Steps

Clone the repository

git clone <repository-url>
cd <project-folder>


Install frontend dependencies

npm install


Set up backend server (if applicable for Socket.io signaling)

cd backend
npm install
npm start


Start frontend

npm start


Access the app

Open your browser and navigate to:

http://localhost:3000

**Usage**

Enter a username to join the lobby.

Grant camera and microphone permissions.

Click Connect to join the video call.

Use the control buttons to:

Toggle camera

Mute/unmute microphone

Start/stop screen sharing

Open/close chat

**Project Structure**
/frontend
 ├─ /src
 │   ├─ /components
 │   │   └─ VideoMeetComponent.jsx
 │   ├─ /styles
 │   │   └─ videoComponent.module.css
 │   ├─ App.jsx
 │   └─ index.js
/backend (optional)
 ├─ server.js
 └─ ...


VideoMeetComponent.jsx: Main video call component with camera, mic, chat, and screen share features.

videoComponent.module.css: CSS module for styling the video call UI.

server.js: Node.js backend server for signaling with Socket.io.

Future Enhancements

Support multiple cameras and audio devices.

Recording and playback functionality.

File and screen sharing in chat.

Advanced UI customization and dark/light mode toggle.

Authentication with JWT for secure calls.

**License**
This project is licensed under the MIT License.
