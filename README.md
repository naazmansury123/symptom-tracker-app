# Symptom Tracker App

A full-stack mobile application built with React Native and Firebase that allows users to track their daily health symptoms, which can be securely viewed by an admin (e.g., a doctor). This project is inspired by the innovative solutions in the health-tech industry, like those from MedRec Technology.

![Symptom Tracker App Demo](https://your-image-hosting-link.com/app-demo.gif)  
*<-- Tip: Add a GIF of your app in action here! It's very impressive. If not, use a collage of screenshots. -->*

---

## 🚀 Features

This application is designed with two primary user roles in mind: Patients and Doctors.

### 🧑‍💼 For Patients:
- **Secure Authentication:** Users can create an account and log in securely using Email & Password.
- **Session Persistence:** Users remain logged in even after closing the app.
- **Symptom Logging:** An intuitive form to add daily symptoms (e.g., fever, cough) along with descriptive notes.
- **Personal Dashboard:** A clean, card-based interface to view a chronological history of all logged symptoms.
- **Sleek UI:** A modern and responsive user interface built with React Native Paper (Material Design).

### 👨‍⚕️ For Doctors (Admin Portal - *Future Scope*):
- **Admin Dashboard:** A secure portal to view a list of all registered patients.
- **Patient Data Vetting:** Ability to select a patient and view their complete symptom history to provide better care.
- **Role-Based Access Control:** Data is protected by Firestore Security Rules, ensuring doctors can only access patient data with proper authorization.

---

## 📸 App Screenshots

| Login Screen | Signup Screen | Dashboard | Add Symptom |
| :---: | :---: | :---: | :---: |
| ![Login Screen Screenshot](screenshots/login.png) | ![Signup Screen Screenshot](screenshots/signup.png) | ![Dashboard Screenshot](screenshots/dashboard.png) | ![Add Symptom Screenshot](screenshots/add-symptom.png) |

*<-- Replace the paths above with the actual paths to your screenshots in the repository. -->*

---

## 🛠️ Tech Stack & Architecture

This project utilizes a modern, full-stack JavaScript approach for mobile development.

- **Language:** **JavaScript (ES6+)**
- **Frontend:**
    - **Framework:** **React Native**
    - **Environment:** **Expo**
    - **UI Toolkit:** **React Native Paper** (for Material Design components)
    - **Navigation:** **Expo Router** (for file-based routing)
    - **State Management:** **React Context API** (for managing auth state)
- **Backend (BaaS):**
    - **Platform:** **Google Firebase**
    - **Services:**
        - **Firebase Authentication:** For secure user management.
        - **Cloud Firestore:** A NoSQL database for storing all symptom data.
        - **Firestore Security Rules:** To protect user data.
- **Local Storage:**
    - **@react-native-async-storage/async-storage:** To persist user login sessions across app restarts.

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/SymptomTrackerApp.git
    cd SymptomTrackerApp
    ```

2.  **Install dependencies:**
    *This command installs all the required libraries from `package.json`.*
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    - Enable **Authentication** (Email/Password provider).
    - Create a **Firestore Database** and start in "Test Mode".
    - Create a Web App in your Firebase project settings to get your configuration keys.
    - Create a `firebase.js` file in the root of the project and paste your Firebase config object there, like so:
    ```javascript
    // firebase.js
    import { initializeApp } from "firebase/app";
    import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
    import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      // Paste your keys here
      apiKey: "...",
      authDomain: "...",
      // ...
    };

    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    const db = getFirestore(app);

    export { auth, db };
    ```
    - **Important:** Don't forget to set up the composite index in Firestore for the dashboard query!

4.  **Run the application:**
    *This will start the Metro Bundler.*
    ```bash
    npx expo start --clear
    ```
    - Scan the QR code with the Expo Go app on your Android or iOS device.

---

## 👨‍💻 Author

- **[Your Name]**
- **LinkedIn:** [Link to your LinkedIn profile]
- **GitHub:** [Link to your GitHub profile]

---

## ✨ Future Improvements

- [ ] Implement the full Admin/Doctor portal.
- [ ] Add data visualization (graphs and charts) to the patient dashboard.
- [ ] Implement push notifications to remind users to log their symptoms.
- [ ] Add a "Forgot Password" feature.
- [ ] Write unit and integration tests.
