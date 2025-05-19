# 📁 Phase 3: Projects Section & Task Management

---

## 🎯 Objective

Enable users to manage multiple projects and related tasks using clean UI layouts, real-world UX patterns, and interactive functionality like drag-and-drop Kanban boards.

---

## 🛠️ What I Did

In this phase, I wasn't sure how the page should look, so I asked the AI for **real-world examples** and **best practices**. Here's the UI breakdown and development steps:

---

## 🧱 UI Structure

### 🔹 **Header**
- **Title:** “Projects”
- **Button:** `+ New Project` → Opens a modal or navigates to `/projects/create`

---

### 🔹 **Project List (Grid or Table)**
Each project displays:

| Field         | Description                             |
|---------------|-----------------------------------------|
| 🏷️ Name        | Project title                          |
| 📝 Description | Short or truncated text                 |
| 📅 Dates       | Start and end dates                    |
| 👥 Team/Tasks  | Number of assigned tasks or team       |
| 📌 Status      | Active / Completed / Overdue           |
| 🔧 Actions     | Show, Edit, Delete per project          |

✅ Display as **cards** or **table** depending on how much info to show.

---

## 📂 Project Detail Page (on “Show”/“View”)

When the user clicks **View**, they are taken to a **Project Detail Page**.

### 📍 Top Section: Project Overview
- Project Name + Description
- Start & End Dates
- Status (In Progress, Done, Late)
- ✏️ Edit Project Info Button

---

### 📦 Tasks Section (Tabs / Segmented Control)

Organized using tabs or segmented controls:

---

#### 🟦 1. **Kanban Board**
- Columns: To Do, In Progress, Done
- 🟰 Drag and drop between columns
- Task Cards: Show title, priority, assignee

---

#### 🟨 2. **Backlog / Task Table**
- Table View: Sortable / Filterable
- Bulk updates or overviews
- Fields: Title, Priority, Status, Assignee

---


### ➕ "Add Task" Button
- Shown in top-right or as floating action button

---

## 👨‍💻 Development Workflow

### 1. **Schema Definition**
Asked Cursor to generate the **Prisma schema** for Projects and Tasks.

---

### 2. **UI Implementation (Projects Page)**
Started with the **Project List UI** → built header, cards/table layout, action buttons.

---

### 3. **Added Logic for Project Overview**
- Connected UI to the backend
- Enabled project editing and data fetching

---

### 4. **Added Task Creation Functionality**
- “Add Task” button triggers task creation modal/form
- Connected to backend using project ID

---

### 5. **Implemented Backlog Table**
- Allows task updates (status, priority, etc.)
- Sortable, filterable task list

---

### 6. **Built Drag-and-Drop (Kanban Board)**
- Columns: To Do, In Progress, Done
- Task cards are draggable
- Dropping updates task status accordingly

---

### 7. **Refactored with AI Help**
- Initial code had too much logic in a single file
- Asked AI to **refactor code for better modularity**
  - Extracted components
  - Improved separation of concerns
  - Cleaned up state and logic handlers

---


## 🤖 AI Involvement Summary

- Helped structure real-world UI/UX patterns
- Provided schema & design suggestions
- Assisted with implementation (CRUD, drag-and-drop)
- Offered code refactoring to improve readability and maintainability

---

