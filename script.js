/* =====================================================
   FRIENDLY AI
   Frontend JavaScript
   ===================================================== */


/* ================= GLOBAL STATE ================= */

let currentModel =
    localStorage.getItem("friendly_model") || "demo";


let memories =
    JSON.parse(
        localStorage.getItem("friendly_memories")
    ) || [

        "You prefer practical examples and concise explanations.",

        "Current goal: build an AI project that solves a real problem for someone you care about.",

        "You like seeing progress visually and finishing small milestones."

    ];


/* ================= SELECTORS ================= */

const $ = selector =>
    document.querySelector(selector);


const $$ = selector =>
    [...document.querySelectorAll(selector)];


/* ================= TOAST ================= */

function toast(message) {

    const element =
        $("#toast");

    element.textContent =
        message;

    element.classList.add("show");

    setTimeout(() => {

        element.classList.remove("show");

    }, 2500);

}


/* ================= NAVIGATION ================= */

function openPage(page) {

    $$(".page").forEach(section => {

        section.classList.remove("active");

    });


    const selected =
        $("#" + page);

    if (selected) {

        selected.classList.add("active");

    }


    $$(".nav").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === page
        );

    });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* Sidebar navigation */

$$(".nav").forEach(button => {

    button.addEventListener("click", () => {

        openPage(
            button.dataset.page
        );

    });

});


/* Other navigation buttons */

$$("[data-page-target]").forEach(button => {

    button.addEventListener("click", () => {

        openPage(
            button.dataset.pageTarget
        );

    });

});


/* Open chat */

$$("[data-open-chat]").forEach(button => {

    button.addEventListener("click", () => {

        openPage("chat");

    });

});


/* ================= THEME ================= */

$("#themeBtn").addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        toast(
            document.body.classList.contains("light")
                ? "Light mode enabled"
                : "Dark mode enabled"
        );

    }
);


/* ================= MODEL ================= */

const modelSelect =
    $("#modelSelect");


modelSelect.value =
    currentModel;


modelSelect.addEventListener(
    "change",
    () => {

        currentModel =
            modelSelect.value;


        localStorage.setItem(
            "friendly_model",
            currentModel
        );


        $("#modelLabel").textContent =
            currentModel === "demo"
                ? "Demo mode"
                : currentModel;


        $("#connectionText").textContent =
            currentModel === "demo"
                ? "Demo AI active"
                : "Local model selected";


        if (currentModel === "demo") {

            toast(
                "Demo AI enabled"
            );

        } else {

            toast(
                `${currentModel} selected`
            );

        }

    }
);


/* ================= NEW CHAT ================= */

$("#newChatBtn").addEventListener(
    "click",
    () => {

        $("#messages").innerHTML = `

            <div class="message assistant">

                <div class="avatar">
                    ✦
                </div>

                <div class="bubble">

                    <p>
                        Fresh conversation.
                        I'm listening — what do
                        you want to work through?
                    </p>

                    <small>
                        just now
                    </small>

                </div>

            </div>

        `;


        openPage("chat");

    }
);


/* ================= ESCAPE HTML ================= */

function escapeHTML(text) {

    return text
        .replace(
            /[&<>"']/g,
            character => {

                const map = {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"

                };

                return map[character];

            }
        );

}


/* ================= ADD MESSAGE ================= */

function addMessage(
    text,
    sender
) {

    const container =
        $("#messages");


    const message =
        document.createElement("div");


    message.className =
        `message ${sender}`;


    const safeText =
        escapeHTML(text)
        .replace(/\n/g, "<br>");


    message.innerHTML = `

        <div class="avatar">

            ${sender === "assistant"
                ? "✦"
                : "A"}

        </div>

        <div class="bubble">

            <p>
                ${safeText}
            </p>

            <small>
                just now
            </small>

        </div>

    `;


    container.appendChild(
        message
    );


    container.scrollTop =
        container.scrollHeight;

}


/* ================= DEMO AI ================= */

function demoAI(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("overwhelmed") ||
        text.includes("stress") ||
        text.includes("stressed")
    ) {

        return `Let's make this smaller.

Pick just one thing that matters in the next 30 minutes.

Don't solve the entire day.

Solve the next step.

I'll help you break it down.`;

    }


    if (
        text.includes("study") ||
        text.includes("physics") ||
        text.includes("exam")
    ) {

        return `Try a 45-minute focus block:

5 min → recall formulas

30 min → solve questions

10 min → check mistakes

Start with the hardest question instead of rereading everything.`;

    }


    if (
        text.includes("idea") ||
        text.includes("project")
    ) {

        return `Build something your friend would actually use this week.

Ask:

"What problem keeps appearing in their life?"

Then build the smallest useful version.

Don't build everything first.`;

    }


    if (
        text.includes("hello") ||
        text.includes("hi")
    ) {

        return `
Hey! 👋

I'm here.

Tell me what you're working on,
how you're feeling,
or what you need to get done.
`;

    }


    return `
I hear you.

Let's keep this practical.

Define the smallest next action,
give it 20–30 minutes,
then reassess.

If you want, I can turn your situation
into a simple step-by-step plan.
`;

}


/* ================= OLLAMA CONNECTION ================= */

async function askOllama(message) {

    try {

        const response =
            await fetch(
                "http://localhost:11434/api/chat",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        model:
                            currentModel,

                        stream: false,

                        messages: [

                            {

                                role: "system",

                                content:
                                    `
You are FRIENDLY,
a warm personal AI companion.

Be concise,
practical,
supportive,
and human.

The user's data is private.

Never pretend to be a doctor,
therapist,
or emergency service.
`

                            },

                            {

                                role: "user",

                                content:
                                    message

                            }

                        ]

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Ollama unavailable"
            );

        }


        const data =
            await response.json();


        return (
            data.message?.content ||
            "I couldn't generate a response."
        );

    }


    catch (error) {

        toast(
            "Local model unavailable — using demo AI"
        );


        return demoAI(message);

    }

}


/* ================= SEND MESSAGE ================= */

async function sendMessage(message) {

    if (!message.trim()) {

        return;

    }


    addMessage(
        message,
        "user"
    );


    $("#chatInput").value =
        "";


    const typing =
        document.createElement("div");


    typing.className =
        "message assistant";


    typing.id =
        "typing";


    typing.innerHTML = `

        <div class="avatar">
            ✦
        </div>

        <div class="bubble">

            <p>
                Thinking...
            </p>

        </div>

    `;


    $("#messages").appendChild(
        typing
    );


    $("#messages").scrollTop =
        $("#messages").scrollHeight;


    let reply;


    if (
        currentModel === "demo"
    ) {

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    650
                )
        );


        reply =
            demoAI(message);

    }

    else {

        reply =
            await askOllama(
                message
            );

    }


    $("#typing")?.remove();


    addMessage(
        reply,
        "assistant"
    );

}


/* ================= CHAT FORM ================= */

$("#chatForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            sendMessage(
                $("#chatInput").value
            );

        }
    );


/* Enter to send */

$("#chatInput")
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                $("#chatForm")
                    .requestSubmit();

            }

        }
    );


/* ================= QUICK PROMPTS ================= */

$$("[data-prompt]").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                sendMessage(
                    button.dataset.prompt
                );

            }
        );

    }
);


/* ================= MEMORY ================= */

function renderMemories() {

    const list =
        $("#memoryList");


    list.innerHTML = "";


    memories.forEach(
        (memory, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "memory-row";


            row.innerHTML = `

                <div class="memory-symbol">
                    ◈
                </div>

                <div>

                    <strong>
                        Personal memory
                    </strong>

                    <p>
                        ${escapeHTML(memory)}
                    </p>

                </div>

                <button
                    class="delete-memory"
                    data-index="${index}"
                >
                    ×
                </button>

            `;


            list.appendChild(row);

        }
    );


    $$(".delete-memory").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    memories.splice(
                        index,
                        1
                    );


                    localStorage.setItem(
                        "friendly_memories",
                        JSON.stringify(
                            memories
                        )
                    );


                    renderMemories();


                    toast(
                        "Memory removed"
                    );

                }
            );

        }
    );

}


renderMemories();


/* ================= MEMORY MODAL ================= */

const memoryModal =
    $("#memoryModal");


$("#addMemory")
    .addEventListener(
        "click",
        () => {

            memoryModal.classList.add(
                "show"
            );

        }
    );


$("#closeModal")
    .addEventListener(
        "click",
        () => {

            memoryModal.classList.remove(
                "show"
            );

        }
    );


memoryModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            memoryModal
        ) {

            memoryModal.classList.remove(
                "show"
            );

        }

    }
);


/* Save memory */

$("#saveMemory")
    .addEventListener(
        "click",
        () => {

            const input =
                $("#memoryInput");


            const value =
                input.value.trim();


            if (!value) {

                toast(
                    "Write something first"
                );

                return;

            }


            memories.push(
                value
            );


            localStorage.setItem(
                "friendly_memories",
                JSON.stringify(
                    memories
                )
            );


            input.value = "";


            memoryModal.classList.remove(
                "show"
            );


            renderMemories();


            toast(
                "Memory saved locally"
            );

        }
    );


/* ================= BREAK ================= */

$("#breakBtn")
    .addEventListener(
        "click",
        () => {

            toast(
                "Break started 🌿 Take 15 minutes."
            );

        }
    );


/* ================= GOAL ================= */

$("#goalButton")
    .addEventListener(
        "click",
        () => {

            toast(
                "Goal creator coming with the backend."
            );

        }
    );