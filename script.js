// REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL FROM STEP 1
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzhucfleCerlaui5RzGuGxEdG0Zz9QsDLJHvxbDc7J38Vmg0Or50vMvtR1zLvAlhaWn/exec";

// Items Instrument List
const INSTRUMENT_ITEMS = [
  {
    id: "Item 1",
    scale: "Scale 1: Pedagogical competence",
    question: "How do you perceive that your bachelor's degree program prepared you to manage pedagogical challenges in your current professional practice?"
  },
  {
    id: "Item 2",
    scale: "Scale 1: Pedagogical competence",
    question: "Could you walk me through your typical process for planning a unit, from selecting the methodology to finalizing the lesson plan?"
  },
  {
    id: "Item 3",
    scale: "Scale 1: Pedagogical competence",
    question: "Can you give me a specific example of a time you had to adapt a face-to-face classroom lesson to a fully online format using digital technology?"
  },
  {
    id: "Item 4",
    scale: "Scale 1: Pedagogical competence",
    question: "What types of assessment tools do you rely on to design personalized tasks for professional or academic English learners?"
  },
  {
    id: "Item 5",
    scale: "Scale 1: Pedagogical competence",
    question: "How does your approach differ from being an instructional designer to a traditional classroom teacher?"
  },
  {
    id: "Item 6",
    scale: "Scale 1: Pedagogical competence",
    question: "Could you share an example of a classroom problem you identified and systematically researched to improve your teaching?"
  },
  {
    id: "Item 7",
    scale: "Scale 1: Pedagogical competence",
    question: "How does your lesson planning process differ between preparing tasks for a standard group and for students with special educational needs?"
  },
  {
    id: "Item 8",
    scale: "Scale 2: Linguistic competence",
    question: "How do you perceive that your bachelor's degree program prepared you to apply your English language proficiency in academic and/or professional contexts?"
  },
  {
    id: "Item 9",
    scale: "Scale 3: Intercultural competence",
    question: "How do you perceive your bachelor's degree program prepared you for intercultural competence to integrate it into your teaching practice?"
  }
];

// Initialize DOM elements
document.addEventListener("DOMContentLoaded", () => {
  renderItems();
  setupEventListeners();
});

// Render Items Cards
function renderItems() {
  const container = document.getElementById("items-container");
  container.innerHTML = "";

  INSTRUMENT_ITEMS.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "item-card bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6";
    
    card.innerHTML = `
      <div class="flex justify-between items-start mb-3 gap-2">
        <span class="bg-slate-800 text-white font-bold text-xs px-3 py-1 rounded-full">${item.id}</span>
        <span class="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md">${item.scale}</span>
      </div>
      <p class="text-slate-800 font-medium mb-5 leading-relaxed text-sm md:text-base">${item.question}</p>
      
      <!-- Scores Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Relevance *</label>
          <select id="rel-${index}" required class="item-rel w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm outline-none">
            <option value="">Select (1-4)</option>
            <option value="4">4 - Highly Relevant</option>
            <option value="3">3 - Relevant (Minor Revision)</option>
            <option value="2">2 - Needs Major Revision</option>
            <option value="1">1 - Not Relevant</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Clarity *</label>
          <select id="cla-${index}" required class="item-cla w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm outline-none">
            <option value="">Select (1-4)</option>
            <option value="4">4 - Highly Clear</option>
            <option value="3">3 - Clear (Minor Revision)</option>
            <option value="2">2 - Needs Major Revision</option>
            <option value="1">1 - Not Clear</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Sufficiency *</label>
          <select id="suf-${index}" required class="item-suf w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm outline-none">
            <option value="">Select (1-4)</option>
            <option value="4">4 - Highly Sufficient</option>
            <option value="3">3 - Sufficient (Minor Revision)</option>
            <option value="2">2 - Needs Major Revision</option>
            <option value="1">1 - Insufficient</option>
          </select>
        </div>
      </div>

      <!-- Observations -->
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Qualitative Comments / Observations</label>
        <input type="text" id="obs-${index}" placeholder="Write observations or leave as N/A" value="N/A" class="item-obs w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm outline-none">
      </div>
    `;
    container.appendChild(card);
  });
}

// Navigation & Event Listeners
function setupEventListeners() {
  const btnStep2 = document.getElementById("btn-to-step-2");
  const btnBackStep1 = document.getElementById("btn-back-to-step-1");
  const btnSubmit = document.getElementById("btn-submit");

  btnStep2.addEventListener("click", () => {
    const name = document.getElementById("evaluator-name").value.trim();
    const email = document.getElementById("evaluator-email").value.trim();
    const id = document.getElementById("evaluator-id").value.trim();

    if (!name || !email || !id) {
      alert("Please complete all evaluator information fields.");
      return;
    }

    goToStep(2);
  });

  btnBackStep1.addEventListener("click", () => goToStep(1));
  btnSubmit.addEventListener("click", submitEvaluation);
}

function goToStep(step) {
  document.getElementById("step-1").classList.add("hidden");
  document.getElementById("step-2").classList.add("hidden");
  document.getElementById("step-3").classList.add("hidden");

  const progressBar = document.getElementById("progress-bar");
  const progressLabel = document.getElementById("progress-label");
  const progressPercent = document.getElementById("progress-percent");

  if (step === 1) {
    document.getElementById("step-1").classList.remove("hidden");
    progressBar.style.width = "33%";
    progressLabel.innerText = "Step 1 of 3: Evaluator Information";
    progressPercent.innerText = "33%";
  } else if (step === 2) {
    document.getElementById("step-2").classList.remove("hidden");
    progressBar.style.width = "66%";
    progressLabel.innerText = "Step 2 of 3: CVI Assessment";
    progressPercent.innerText = "66%";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (step === 3) {
    document.getElementById("step-3").classList.remove("hidden");
    progressBar.style.width = "100%";
    progressLabel.innerText = "Step 3 of 3: Complete";
    progressPercent.innerText = "100%";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Submit Data to Google Sheets API
async function submitEvaluation() {
  // Validate all dropdowns
  let allValid = true;
  const evaluations = [];

  INSTRUMENT_ITEMS.forEach((item, index) => {
    const rel = document.getElementById(`rel-${index}`).value;
    const cla = document.getElementById(`cla-${index}`).value;
    const suf = document.getElementById(`suf-${index}`).value;
    const obs = document.getElementById(`obs-${index}`).value.trim() || "N/A";

    if (!rel || !cla || !suf) {
      allValid = false;
    }

    evaluations.push({
      itemId: item.id,
      scale: item.scale,
      question: item.question,
      relevance: parseInt(rel, 10),
      clarity: parseInt(cla, 10),
      sufficiency: parseInt(suf, 10),
      observations: obs
    });
  });

  if (!allValid) {
    alert("Please ensure all Relevance, Clarity, and Sufficiency scores are selected for all 9 items.");
    return;
  }

  const payload = {
    evaluatorName: document.getElementById("evaluator-name").value.trim(),
    evaluatorEmail: document.getElementById("evaluator-email").value.trim(),
    evaluatorID: document.getElementById("evaluator-id").value.trim(),
    evaluations: evaluations
  };

  goToStep(3);

  try {
    // Send data to Apps Script Web App
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors", // Bypasses CORS restrictions for Apps Script
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // Show success message
    document.getElementById("submission-loading").classList.add("hidden");
    document.getElementById("submission-success").classList.remove("hidden");

  } catch (error) {
    console.error("Submission error:", error);
    alert("There was an error submitting your response. Please try again.");
    goToStep(2);
  }
}
