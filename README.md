# MindCare Wellness System 💙
**Full-Stack Mental Health & Online Wellness Platform (MERN Stack)**

A modern, responsive, and secure digital wellness ecosystem designed to connect patients with certified therapists, streamline appointment booking, provide psychoeducational resources, and offer immediate interactive chatbot support.

---

## 🌟 Key Features & Modules

1. **User Management & Authentication**:
   - Secure registration & login with **JWT** and **bcrypt** password hashing.
   - Dual role support: **Admin / Clinic Staff** and **Patient**.
   - Session persistence and role-based route access.

2. **Therapist Catalog & Discovery**:
   - Searchable and filterable directory of certified clinical psychologists and social workers.
   - Full practitioner profiles including years of experience, credentials, specializations, and bios.

3. **Multi-Step Appointment Booking System**:
   - **Step 1: Basic Details** (Patient name, contact, reason for consultation).
   - **Step 2: Schedule & Practitioner** (Select doctor, preferred date, time slot, and session mode).
   - **Step 3: Confirmation** (Review summary and instant scheduling with unique appointment IDs).

4. **Clinic Staff & Patient Dashboard**:
   - **Live Metric Counters**: Patients Today, In Session, Waiting Room, Providers Active.
   - **Detailed Patient Roster**: Status lifecycle tracking (*Upcoming*, *In Session*, *Completed*).
   - **Add Patient Modal**: Quickly register new patients directly into the clinical roster.
   - **Master Weekly Schedule Modal**: Monday to Friday comprehensive schedule breakdown.

5. **Wellness Blog & Psychoeducation Library**:
   - Categorized articles (Anxiety & Stress, Burnout, Personal Growth, Relationships).
   - Searchable library with read-time estimates and therapist authors.
   - Interactive article reader modal.
   - Newsletter subscription form.

6. **MindCare AI Assistant (Chatbot)**:
   - Interactive floating assistant with compassionate replies, quick actions, and direct page routing.

7. **Contact & Location Services**:
   - Direct communication form, office hours, and embedded interactive map.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Axios, React Router 6.
- **Backend**: Node.js, Express.js, RESTful API architecture.
- **Database**: MongoDB & Mongoose ODM (with auto-seeder and resilient connection fallback).
- **Security**: JWT (stateless bearer tokens), bcryptjs password encryption.

---

## ⚡ Quick Start Guide

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install-all
```
*(Or install in both folders: `cd server && npm install` then `cd ../client && npm install`)*

### 2. Run Both Server & Client Concurrently
From the root directory:
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 🔑 Demo & Presentation Login Credentials

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Admin / Clinic Staff** | `admin@mindcare.com` (or `kp123@me.com`) | `admin123` | Clinic Roster, Master Schedule, Add Patients |
| **Patient** | `patient@mindcare.com` | `patient123` | Book Appointments, View Blogs, AI Chat |

*(Quick-login one-click buttons are also provided on the Login screen for smooth demonstrations!)*
