# 🤖 Phase 4: Chatbot Integration (Floating Widget)

---

## 🎯 Objective

Integrate a floating chatbot on the platform to provide assistance, guidance, or AI-powered features using either a direct API or an advanced LLM framework like LangChain.

---

## 🧱 What I Did

### ✅ 1. Created a Floating Chatbot Component
- UI: Minimal floating chat icon or button
- When clicked, it expands to show a chat window
- Position: Fixed at the bottom-right corner of the app

---

## 🤔 Research & AI Consultation

### ❓ Should I use:
- A **direct API call** to something like OpenAI?
- Or use **LangChain** with custom prompts and memory?

### 📌 AI Recommendation:
| Approach     | When to Use                                 |
|--------------|---------------------------------------------|
| 🔹 Direct API | For basic prompts and simple use cases       |
| 🔸 LangChain  | For scalable, modular bots with memory, tools, and advanced routing logic |

LangChain was recommended for:
- Scalable architecture
- Support for memory/context retention
- Prompt engineering
- Integrating external tools or data sources

---

## ❌ Why I Didn't Continue

After creating the floating chatbot component and exploring options:

- I **did not find a suitable free API** 
---