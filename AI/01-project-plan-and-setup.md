# 📦 Project Plan & Environment Setup

## 🧠 AI Usage Overview

Used AI tools (ChatGPT & CursorAI) for brainstorming, planning architecture, and breaking down the user story into clear development phases.


## AI Response
# 🧭 Project Development Plan

The app is broken into 4 phases. 

---


## 🔐 Phase 1: Authentication & Layout

### ✅ Tasks:

**Implement Login/Signup**
- Use NextAuth.js (Credentials Provider or OAuth)
- Create auth forms using ShadCN components
- Setup session handling and route protection

**Expected Outcome:**  
Users can register and log in. Sessions are persistent. Protected routes are enforced.

---

**App Layout & Navigation**
- Sidebar layout using Tailwind + ShadCN
- Navigation links: Employees, Projects, Logout
- Pages structured and reusable layout components built

**Expected Outcome:**  
Layout is consistent. Navigation works across all main pages.

👉 **Next:** Move to Phase 2 once auth and layout are working.

---

## 👥 Phase 2: Employees Management

### ✅ Tasks:

**Define Prisma Schema for Employees**
- Fields: `id`, `name`, `joiningDate`, `basicSalary`, etc.
- Run Prisma migration + seed sample employees

**Expected Outcome:**  
`employees` table exists with mock data.

---

**CRUD Employee UI**
- Table to list employees
- Modal/Form to add/edit/delete employee records

**Expected Outcome:**  
You can perform full CRUD operations from the UI.

---

**Salary Table**
- Month selector
- Salary = Basic + Bonus - Deductible
- Editable bonus/deductible fields per employee

**Expected Outcome:**  
Salary for each employee can be calculated per month dynamically.

👉 **Next:** Move to Phase 3 after CRUD and salary logic are functional.

---

## 📂 Phase 3: Projects & Tasks

### ✅ Tasks:

**Prisma Schema for Projects & Tasks**
- Projects: `id`, `name`, `description`
- Tasks: `id`, `title`, `description`, `priority`, `status`, `assignedTo`, relations

**Expected Outcome:**  
Database models created and linked properly. Seeded sample data is available.

---

**CRUD Projects UI**
- Add/edit/delete projects via form

**Expected Outcome:**  
Project list is manageable through UI.

---

**Task Management**
- Create form to add task with required fields
- Assign tasks to employees

**Expected Outcome:**  
Task creation, viewing, and assignment works.

---

**Kanban Board**
- Display tasks by status: To Do, In Progress, Done
- Optional drag-and-drop feature (if time permits)

**Expected Outcome:**  
Tasks are grouped and status is visually represented.

---

**Backlog Table**
- Tabular view with filters/sorting

**Expected Outcome:**  
Searchable and sortable list of all tasks.

👉 **Next:** Move to Phase 4 after task workflows are complete.

---

## 🤖 Phase 4: AI Chatbot (Bonus)

### ✅ Tasks:

**Basic Chatbot UI**
- Floating chat button
- Input box and reply view

---

**Chatbot Logic**
- Use basic AI logic or OpenAI API (mock if needed)
- Answer user questions like:
  - “What tasks are assigned to John?”
  - “How many projects are in progress?”

**Expected Outcome:**  
AI chatbot can respond to user questions about projects/tasks using mock or live data.