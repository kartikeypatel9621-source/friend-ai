# FRIENDLY — A Private, Local-First AI Companion

> **Built for a Friend. Powered by Open-Source AI. Designed for Privacy.**

FRIENDLY is a local-first AI companion designed to provide personalized support based on a person's goals, preferences, routines, and everyday needs.

Instead of treating AI like a generic chatbot, FRIENDLY is designed around one simple idea:

**AI should understand the person it is helping — while the person remains in control of their data.**

---

## ✨ What It Does

FRIENDLY provides a personal AI experience through a clean web dashboard.

### Core Features

* 🤖 **AI Companion Chat** — Have natural conversations and receive personalized support.
* 🧠 **Smart Memory** — Store useful preferences, goals, and personal context.
* 🎯 **Goal Tracking** — Keep track of important goals and progress.
* 📅 **Today Dashboard** — View personalized suggestions and daily priorities.
* 💡 **Personalized Suggestions** — Get recommendations based on goals and routines.
* 🔒 **Local-First Privacy** — Designed to keep personal information on the user's device.
* 🌐 **Open-Source AI** — Connect to open-weight models through local inference.
* 🔄 **Model Flexibility** — Switch between compatible local AI models.
* 📱 **Responsive Interface** — Designed for desktop and smaller screens.

---

## 🧩 Why FRIENDLY?

Most AI assistants are built for a huge audience and provide broadly similar experiences.

FRIENDLY takes a different approach:

> **Build the AI around the person, not the other way around.**

A friend may have a specific study schedule, career goal, routine, interests, or personal preferences. FRIENDLY uses that context to make its assistance more relevant.

The project was created for the **Hacktoberfest Weekend Challenge: Build for a Friend**.

---

## 🏗️ Architecture

The current prototype is intentionally lightweight and easy to run.

```text
                    ┌──────────────────────┐
                    │        User          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   FRIENDLY Web UI    │
                    │     HTML / CSS / JS  │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
             Browser Memory          Local AI
              localStorage            Ollama
                                          │
                                          ▼
                                  Open-Weight Model
                                Llama / Qwen / Mistral
```

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Browser Local Storage
* Responsive UI

### AI Layer

FRIENDLY is designed to connect to local AI through **Ollama**.

Compatible open-weight models can include:

* Llama
* Qwen
* Mistral

The application also includes a demo/fallback mode so the interface can be explored without running a local model.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/FRIENDLY_AI.git
cd FRIENDLY_AI
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Open the Project

```text
FRIENDLY_AI/
├── index.html
├── style.css
├── script.js
└── README.md
```

You can open `index.html` directly, or preferably run it using **VS Code Live Server**.

### 3. Run with Live Server

In VS Code:

1. Open the project folder.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

---

## 🤖 Running Local AI with Ollama

To use an actual local AI model, install Ollama:

https://ollama.com/

Then download an open-weight model.

For example:

```bash
ollama pull llama3.2
```

Start the Ollama server:

```bash
ollama serve
```

FRIENDLY communicates with the local Ollama API:

```text
http://localhost:11434
```

The frontend sends chat requests to the local AI endpoint and displays the generated response.

---

## 🔐 Privacy & Local-First Design

Privacy is a core part of FRIENDLY's concept.

Personal information such as memories, goals, and preferences does not need to leave the user's device for the core experience.

The prototype uses browser storage for local memory, while AI inference can be performed locally through Ollama.

### Benefits

* 🔒 Personal context can remain local.
* 💻 AI can run on the user's own computer.
* 💰 No per-request cloud AI cost is required for local inference.
* 🔄 Users can experiment with different open-weight models.
* 🛠️ Developers can customize the AI experience.

> **Local-first does not automatically mean perfectly private. Always review the configuration of the models, tools, browser, and operating system you use.**

---

## 🌱 Why Open Innovation Matters

Open innovation makes FRIENDLY possible in ways that a closed AI API alone would not.

### 🔄 Model Freedom

Users can experiment with different open-weight models instead of being permanently tied to one provider.

### 🛠️ Customization

Developers can modify prompts, memory systems, model selection, and application behavior.

### 💻 Local Inference

AI can run directly on a user's computer when the hardware supports it.

### 💰 Cost Control

Local inference can reduce dependence on usage-based API pricing.

### 🔒 Privacy

Sensitive personal context can remain on-device when the entire workflow is configured locally.

---

## 🎨 Project Interface

FRIENDLY includes a dashboard-oriented interface with:

* 🏠 Home
* 🤖 AI Companion
* 📅 Today
* 🧠 Memory
* 🎯 Goals
* 🔄 Model Selection
* 🟢 Local AI Status
* ⚡ Quick Prompts
* 💡 Personalized Cards
* 🌙 Dark/Light Theme

The interface is designed to feel more like a **personal digital companion** than a traditional developer-focused chatbot.

---

## 📁 Project Structure

```text
FRIENDLY_AI/
│
├── index.html      # Main application interface
├── style.css       # UI styling and responsive layout
├── script.js       # Application logic, memory and Ollama integration
└── README.md       # Project documentation
```

---

## 🔮 Future Improvements

FRIENDLY can be extended into a more complete personal AI platform.

* [ ] Friend onboarding flow
* [ ] Persistent encrypted memory
* [ ] IndexedDB-based memory system
* [ ] Local FastAPI backend
* [ ] Ollama model health/status detection
* [ ] Voice input
* [ ] Voice responses
* [ ] Offline Progressive Web App
* [ ] Calendar integration
* [ ] Habit tracking
* [ ] Mood check-ins
* [ ] Custom AI personalities
* [ ] Local document/RAG support
* [ ] Fine-tuned personal models
* [ ] Multi-model comparison
* [ ] Advanced privacy controls

---

## 🧪 Demo Mode

FRIENDLY can operate in **Demo Mode** without a local AI model.

This makes it possible to:

* Explore the interface.
* Demonstrate the concept.
* Test the user experience.
* Present the project during a hackathon.

For actual local AI responses, connect the application to Ollama and select a supported local model.

---

## 🏆 Hackathon

This project was created for:

### Hacktoberfest Weekend Challenge — Build for a Friend

The challenge focuses on building something with **open-source AI at its core** that solves a real problem for a friend or loved one.

FRIENDLY focuses on:

* 🌐 Open-source/open-weight AI
* 💻 Local inference
* 🧠 Personalization
* 🔒 Privacy
* ❤️ Human-centered AI
* 📚 Everyday productivity and support

---

## 👨‍💻 Author

**Kartikey Patel**

Built with curiosity, open-source AI, and the idea that technology should feel personal.

---

## 📜 License

This project can be released under the **MIT License**.

If you choose MIT, add a `LICENSE` file to the repository containing the standard MIT License text.

---

## ⭐ Support

If you like the idea of a personal, local-first AI companion, consider **starring the repository** and sharing your feedback.

> **FRIENDLY — Your goals. Your context. Your AI.**
