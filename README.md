# 🎯 EventFinder - Local Event Discovery Platform

> A simple web application that helps users discover local events based on categories and preferences. Designed to provide an intuitive and visually appealing way to explore events happening nearby.

🔗 **Live Demo:** [EventFinder](https://gdg-beginner-hackathon.github.io/Local-Events-Finder/)

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Functionality](#-pages--functionality)
- [How It Works](#-how-it-works)
- [Key Components](#-key-components)
- [Use Cases](#-use-cases)
- [Testing](#-testing)
- [Limitations](#-limitations)
- [Future Enhancements](#-future-enhancements)
- [Team Members](#-team-members)

---

## 🎯 Overview

**EventFinder** is a modern event discovery platform built to connect people with experiences that matter. Users can browse events across multiple categories (Music, Sports, Tech, Religion, Business, Health), view event details, register for tickets, and manage their bookings—all with a seamless dark mode experience.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎟️ **Event Discovery** | Browse events by category (Music, Tech, Business, Religion, Sports, Health & Wellness) |
| 🔍 **Search & Filter** | Search events by name, location, or description |
| 🌙 **Dark Mode** | Toggle between light and dark themes (persists across pages) |
| 📱 **Fully Responsive** | Works perfectly on desktop, tablet, and mobile devices |
| 🎫 **Ticket Registration** | Register for events with multiple ticket types (Free, Regular, VIP) |
| 💳 **Payment Options** | TeleBirr, CBE Birr, or Pay at Venue |
| ✏️ **User-Generated Events** | Add, edit, and delete your own events |
| 📋 **My Tickets** | View and manage all your registered events |
| 👤 **Authentication** | Sign up and login functionality (localStorage-based) |
| ⚡ **Lightweight** | Pure HTML, CSS, JavaScript (no external dependencies) |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript** | Interactivity, DOM manipulation, localStorage |
| **LocalStorage** | User data, events, ticket registrations persistence |

---

## 📁 Project Structure

Local-Events-Finder/
│
├── 📄 index.html # Homepage (event listing)
├── 📄 about-us.html # About Us page
├── 📄 categories.html # Browse by category
├── 📄 login.html # User login
├── 📄 signup.html # User registration
├── 📄 register.html # Event registration & ticket booking
├── 📄 my-tickets.html # View/manage booked tickets
│
├── 📁 styles/
│ ├── base.css # Global styles + dark mode
│ ├── home-auth.css # Homepage, login, signup styles
│ ├── about.css # About page styles
│
├── 📁 scripts/
│ ├── theme.js # Dark mode toggle logic
│ ├── main.js # Homepage functionality
│ └── (other JS files)
│
├── 📁 assets/
│ └── images/ # Image assets
│
└── 📄 README.md # Project documentation

---


---

## 📄 Pages & Functionality

| Page | Description | Key Features |
|------|-------------|--------------|
| **Home (index.html)** | Main event discovery page | Event grid, category filters, search, add/edit/delete events |
| **Register (register.html)** | Ticket booking | Ticket types (Free/Regular/VIP), quantity selector, payment methods |
| **My Tickets (my-tickets.html)** | View booked tickets | Ticket listing, delete tickets, confirmation dialog |
| **Login (login.html)** | User authentication | Email/password validation, localStorage persistence |
| **Signup (signup.html)** | Create account | Name, email, password with validation |
| **About Us (about-us.html)** | Platform info | Mission, vision, team, features |
| **Categories (categories.html)** | Browse by category | Quick navigation to filtered events |

---

## 🚀 How It Works

1. **Browse Events** – Users land on the homepage and see all available events
2. **Filter Events** – Click category cards or use search to filter events
3. **View Details** – Click on any event card to see full details in a modal
4. **Register for Event** – Click "Register / Get Tickets" to book tickets
5. **Select Ticket Type** – Choose Free, Regular, or VIP (VIP = 2× Regular price)
6. **Enter Details** – Fill in personal information and payment method
7. **Confirmation** – Get a success message and view tickets in "My Tickets"
8. **Manage Tickets** – Delete unwanted tickets from My Tickets page
9. **Dark Mode** – Toggle theme using the button in navbar (persists across pages)
10. **Create Events** – Logged-in users can add their own events to the grid

---

## 🧩 Key Components

Component	Description	Location
Navbar	Navigation between pages + dark mode toggle	All pages
Event Cards	Display event image, title, date, location, description	index.html
Category Filters	Filter events by category (Music, Tech, etc.)	index.html, categories.html
Search Box	Search events by title, location, or description	index.html
Event Modal	Popup with full event details and register button	index.html
Ticket Form	Multi-step registration with ticket selection	register.html
My Tickets Grid	List of user's booked tickets with delete option	my-tickets.html
Auth Forms	Login/Signup with validation	login.html, signup.html

---

## 📌 Use Cases

✅ Discover local events happening near you

✅ Register for events with multiple ticket tiers

✅ View and manage your booked tickets

✅ Create and promote your own events

✅ Browse events by category (Music, Tech, Business, etc.)

✅ Toggle dark mode for night-time browsing

✅ Practice front-end development concepts

---

## 🧪 Testing

Browsers Tested
Browser	Status
Google Chrome	✅ Fully functional
Mozilla Firefox	✅ Fully functional
Microsoft Edge	✅ Fully functional
Safari	✅ Fully functional
Responsive Breakpoints Tested
Device	Screen Width	Status
Desktop	1200px+	✅ Perfect
Laptop	1024px	✅ Perfect
Tablet	768px	✅ 2-column layout
Mobile	480px	✅ 1-column layout
Small Phone	360px	✅ Optimized

---

## Features Tested

✅ Dark mode toggle and persistence

✅ Event filtering by category

✅ Search functionality

✅ Add/Edit/Delete user events

✅ Ticket registration with pricing (Free/Regular/VIP)

✅ Payment method selection

✅ LocalStorage data persistence

✅ Responsive layout across all devices

---

## 🚧 Limitations

Limitation	Description
No Backend	All data stored in localStorage (clears when browser data is cleared)
No Real Authentication	Simple localStorage-based auth (not secure for production)
Static Events	Events are hardcoded + user-added (no API integration)
No Payment Gateway	Payment methods are simulated (not real transactions)
No Email Notifications	Confirmation messages only shown on screen
Single User Session	Multiple users on same device share localStorage

---

## 🔮 Future Enhancements

Enhancement	Priority	Description
Backend Integration	High	Use Node.js/Express + MongoDB for real data persistence
API Integration	High	Fetch real events from Ticketmaster, Eventbrite APIs
Google Maps Integration	Medium	Show event locations on an interactive map
Email Confirmation	Medium	Send real email confirmations for registrations
User Profiles	Medium	Allow users to save preferences and view history
Social Sharing	Low	Share events on Facebook, Twitter, WhatsApp
Mobile App	Low	Convert to React Native or Flutter app
Multi-language	Low	Support Amharic and English

---

## 👥 Team Members
         Name              Role
1)   Ermiyas Getachew – Team leader

2)   Christian Amare - member
3)   Betelhem Solomon  - member
