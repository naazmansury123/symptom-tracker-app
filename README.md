# Symptom Tracker App

A full-stack mobile application built with React Native and Firebase that allows users to track their daily health symptoms, which can be securely viewed by an admin (e.g., a doctor). This project is inspired by the innovative solutions in the health-tech industry, like those from MedRec Technology.

 
*<-- Replace this link with a real GIF of your app if you make one! -->*

---

## 🚀 Features

This application is designed with two primary user roles in mind: Patients and Doctors.

### 🧑‍💼 For Patients:
- **Secure Authentication:** Users can create an account and log in securely using Email & Password.
- **Session Persistence:** Users remain logged in even after closing the app.
- **Symptom Logging:** An intuitive form to add daily symptoms (e.g., fever, cough) along with descriptive notes.
- **Personal Dashboard:** A clean, card-based interface to view a chronological history of all logged symptoms.
- **Sleek UI:** A modern and responsive user interface.

### 👨‍⚕️ For Doctors (Admin Portal - *Future Scope*):
- **Admin Dashboard:** A secure portal to view a list of all registered patients.
- **Patient Data Vetting:** Ability to select a patient and view their complete symptom history to provide better care.
- **Role-Based Access Control:** Data is protected by Firestore Security Rules, ensuring doctors can only access patient data with proper authorization.

---

## 📸 App Screenshots

| Login Screen | Signup Screen | Dashboard | Add Symptom |
| :---: | :---: | :---: | :---: |
| ![Login Screen Screenshot](./screenshots/login.png) | ![Signup Screen Screenshot](./screenshots/signup.png) | ![Dashboard Screenshot](./screenshots/dashboard.png) | ![Add Symptom Screenshot](./screenshots/add-symptom.png) |


---

## 🛠️ Tech Stack & Architecture

This project utilizes a modern, full-stack JavaScript approach for mobile development.

- **Language:** **JavaScript (ES6+)**
- **Frontend:**
    - **Framework:** **React Native**
    - **Environment:** **Expo**
    - **UI Toolkit:** **React Native Paper**
    - **Navigation:** **Expo Router**
    - **State Management:** **React Context API**
- **Backend (BaaS):**
    - **Platform:** **Google Firebase**
    - **Services:**
        - **Firebase Authentication**
        - **Cloud Firestore**
        - **Firestore Security Rules**
- **Local Storage:**
    - **@react-native-async-storage/async-storage**

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/naazmansury123/symptom-tracker-app.git
    cd symptom-tracker-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    - Create a project on the [Firebase Console](https://console.firebase.google.com/).
    - Enable **Authentication** (Email/Password).
    - Create a **Firestore Database** (start in Test Mode).
    - Get your web app's configuration keys from Project Settings.
    - Create a `firebase.js` file in the project root and add your keys.
    - Create the required composite index in Firestore for the dashboard query.

4.  **Run the application:**
    ```bash
    npx expo start --clear
    ```
    - Scan the QR code with the Expo Go app.

---

## 👨‍💻 Author

- **Naaz Banu**
- **LinkedIn:** [https://www.linkedin.com/in/naaz-mansuri-709325301/](https://www.linkedin.com/in/naaz-mansuri-709325301/)
- **GitHub:** [https://github.com/naazmansury123](https://github.com/naazmansury123)

---

## ✨ Future Improvements

- [ ] Implement the full Admin/Doctor portal.
- [ ] Add data visualization (graphs and charts) to the patient dashboard.
- [ ] Implement push notifications to remind users to log their symptoms.
- [ ] Add a "Forgot Password" feature.
- [ ] Write unit and integration tests.
