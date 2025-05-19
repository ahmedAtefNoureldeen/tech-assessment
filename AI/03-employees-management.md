# 👥 Employee Management System

## 🧩 Subdivided Into:
- **Part A:** Employee CRUD & Data Schema
- **Part B:** Payroll System (Bonus, Deductions, and Payable Salary)
---

## 🎯 Objective
Enable users to manage employee records and calculate monthly salary details, including bonuses and deductions. Ensure database normalization, clean UI logic, and scalable schema structure.

---

## 🔀 Phase 1: Employee Logic

### ✅ Tasks Implemented:

* Defined **Prisma schema** for `Employee`:
  * `id`, `name`, `employeeId`, `joiningDate`, `basicSalary`, etc.
* Implemented **full CRUD UI**:
  * Add, Edit, Delete employee using modal forms
  * Display employee list in a responsive table (ShadCN)

### 🧠 AI-Guided Decisions

#### ❓ Should salary be stored inside the employee model?

> **AI Answer: NO – Use separate schemas**

#### ✅ Reasoning:

| Point | Explanation |
|-------|-------------|
| 🧼 Separation of Concerns | Employee = mostly static data; Salary = dynamic, monthly records |
| 🔁 One-to-Many Logic | One employee → many salaries (per month) |
| 🔎 Easier Querying | Fetching salaries per month or generating reports is easier |
| 📈 Scalability | Clean separation allows future extensions like payslips or tax data |
| 📊 Relational DB Norms | Aligns with SQL normalization: separate `employees` and `salaries` tables |

### Prisma Schema (Simplified)

```prisma
model Employee {
  id           String   @id @default(uuid())
  employeeId   String   @unique
  name         String
  joiningDate  DateTime
  basicSalary  Int
  salaries     Salary[] // one-to-many
}
```

## 💰 Phase 2: Payroll Logic

### ✅ Tasks Implemented:

* Created **Salary model** with dynamic fields:
  * `month`, `bonus`, `deductible`, `payable`, `employeeId` (FK)
* User selects a month → triggers salary generation for all employees
* Salary is calculated as:
  ```
  payable = basicSalary + bonus - deductible
  ```

### 🧠 AI-Guided Decisions

#### ❓ Should I auto-generate salary records every month or on-demand?

> **AI Answer: Use Lazy Initialization (on-demand)**

#### ✅ Reasoning:

| Point | Explanation |
|-------|-------------|
| ⚡ Performance | Avoid bloating the DB with unused salary entries |
| 🔄 On-Demand Logic | Create only when user picks a month |
| 📊 Easier Maintenance | No need to deal with empty salary records |
| 💡 Better UX | Generate only what's needed and display immediately |

### Prisma Schema (Simplified)

```prisma
model Salary {
  id          String   @id @default(uuid())
  employee    Employee @relation(fields: [employeeId], references: [id])
  employeeId  String
  month       String   // e.g., "2025-05"
  bonus       Int
  deductible  Int
  payable     Int
  createdAt   DateTime @default(now())
}
```

## 🧠 AI Reflection

### Prompts Used:
* "Should salary records be inside the Employee model in Prisma?"
* "Is it better to auto-create salary entries per month or create on user action?"
* "How to structure payroll system in Prisma for monthly bonuses and deductions?"

### 🤖 Summary:
The AI emphasized modular schemas, normalized data structures, and lazy-generation of time-sensitive records. These principles enable performance, maintainability, and scalability.

## 💡 Prompting Tips & Development Workflow

To maximize AI assistance and maintain quality during development, I follow an iterative, structured approach:

### 1. Start with a Static UI 
* Ask AI to generate basic static components (tables, forms) without logic.
* This helps visualize the feature early and set clear UI expectations.

### 2. Add Business Logic Step-by-Step
* Next, prompt AI to implement the underlying logic (CRUD operations, data fetching).
* Focus on one logical piece at a time (e.g., employee creation, then editing).

### 3. Test Each Feature 
* After adding logic, manually test the feature in the app.
* Identify edge cases or bugs to address.

### 4. Iterate and Refine
* Use AI to fix issues or enhance features based on test results.
* Adjust prompts to clarify intent or add missing details.

### 5. Repeat Testing and Refinement
* Continue iterating until the feature is stable and meets acceptance criteria.

## ✅ Deliverables & Status

| Task | Status | Notes |
|------|--------|-------|
| Create Employee schema | ✅ | Normalized model |
| Build Employee CRUD UI | ✅ | Tailwind + ShadCN |
| Define Salary schema | ✅ | Linked to Employee |
| Lazy salary record generation | ✅ | Triggered by month selector |
| Calculate bonuses & deductions | ✅ | Dynamic form inputs per row |
| Total payable calculation | ✅ | Auto-updated and displayed |