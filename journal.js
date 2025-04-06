window.addEventListener("load", () => {
    // Utility function to get query parameter by name.
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }
    
    const category = getQueryParam("category") || "Unknown";
  
    // Set journal page header.
    const journalTitle = document.getElementById("journalTitle");
    journalTitle.textContent = category + " Journal Entries";
  
    // AI Insight text to be animated.
    const aiInsightText = "Your journal entries show a consistent tone of optimism and deep reflection.";
  
    // Typewriter effect for the AI insight box.
    function typeWriter(element, text, delay = 50) {
      let i = 0;
      let currentText = "";
      function typeNextLetter() {
        if (i < text.length) {
          currentText += text.charAt(i);
          // Update the element's HTML so that the strong label remains.
          element.innerHTML = "<strong>AI Insight:</strong> " + currentText;
          i++;
          setTimeout(typeNextLetter, delay);
        }
      }
      typeNextLetter();
    }
  
    // Animate the AI insight text.
    const aiInsightElement = document.querySelector(".ai-insight p");
    if (aiInsightElement) {
      // Clear any existing text and start the typewriter animation.
      aiInsightElement.innerHTML = "<strong>AI Insight:</strong> ";
      setTimeout(() => {
        typeWriter(aiInsightElement, aiInsightText, 40);
      }, 500);
    }
  
    // Sample journal entries data per category.
    // Each entry object contains: date (ISO format), summary, and fullText (in Markdown).
    const journalData = {
      "Graduating College": [
        {
          date: "2025-04-06",
          summary: "Graduation was inspiring and emotional.",
          fullText: "# Graduation Day Reflections\n\nToday was one of those days I’ll remember forever. I had a **great day at graduation** — the atmosphere was electric with excitement and bittersweet goodbyes.\n\n## A Ceremony of Emotions\n\nThe ceremony was filled with a spectrum of emotions:\n- **Joyful laughter** from the crowd\n- **Heartfelt tears** as we said our goodbyes\n- A deep sense of **accomplishment** and hope for the future\n\n## Significant Moments\n\nEvery moment felt significant:\n- **Walking across the stage:** A powerful symbol of achievement.\n- **Hearing my name called:** A personal moment of recognition.\n- **Receiving my diploma:** Marking the end of one chapter and the beginning of another.\n\n## Lasting Memories\n\nThe memories of shared struggles, late-night study sessions, and endless support from loved ones mingled with that overwhelming sense of achievement. I left the venue with a heart full of gratitude and anticipation for the future, knowing these memories will last a lifetime and continue to inspire me as I move forward.\n\n---\n\n*Grateful for the past, excited for the future.*"
        },
        {
          date: "2025-03-28",
          summary: "Preparations were stressful but rewarding.",
          fullText: "Today was challenging as I prepared for graduation, but every stressful moment felt worth it. I learned so much about resilience and growth."
        },
        {
          date: "2025-03-15",
          summary: "Final exam results brought relief and joy.",
          fullText: "The results from my final exams arrived today, bringing both relief and a sense of accomplishment after months of hard work."
        }
      ],
      // Additional categories can be added here.
    };
  
    // Retrieve entries for the selected category.
    let entries = journalData[category] || [];
    // Sort entries from newest to oldest.
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    // Helper function to format an ISO date to "April 6th, 2025".
    function formatDate(isoDate) {
      const dateObj = new Date(isoDate);
      const options = { month: "long" };
      const month = new Intl.DateTimeFormat("en-US", options).format(dateObj);
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();
      let suffix = "th";
      if (day === 1 || day === 21 || day === 31) {
        suffix = "st";
      } else if (day === 2 || day === 22) {
        suffix = "nd";
      } else if (day === 3 || day === 23) {
        suffix = "rd";
      }
      return `${month} ${day}${suffix}, ${year}`;
    }
  
    // Render journal entries as squares in a grid.
    const entriesContainer = document.getElementById("journalEntries");
    entriesContainer.innerHTML = "";
    entries.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.className = "entry-box";
  
      const header = document.createElement("h3");
      header.textContent = formatDate(entry.date);
  
      const subheading = document.createElement("p");
      subheading.textContent = entry.summary;
  
      entryDiv.appendChild(header);
      entryDiv.appendChild(subheading);
  
      // On click, open the pop-out modal with full entry text.
      entryDiv.addEventListener("click", () => {
        openEntryModal(entry);
      });
  
      entriesContainer.appendChild(entryDiv);
    });
  
    // Modal elements for displaying the full entry.
    const entryModal = document.getElementById("entryModal");
    const modalContent = document.getElementById("modalContent");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
  
    function openEntryModal(entry) {
      modalContent.innerHTML = "";
      const modalHeader = document.createElement("h2");
      modalHeader.textContent = formatDate(entry.date);
      modalContent.appendChild(modalHeader);
  
      // Use Marked.js to convert Markdown to HTML.
      const fullTextHtml = marked.parse(entry.fullText);
      const fullTextContainer = document.createElement("div");
      fullTextContainer.innerHTML = fullTextHtml;
      modalContent.appendChild(fullTextContainer);
  
      entryModal.style.display = "block";
      modalContent.focus();
    }
  
    function closeEntryModal() {
      entryModal.style.display = "none";
    }
  
    modalCloseBtn.addEventListener("click", closeEntryModal);
  
    // Close modal when clicking outside the modal content.
    window.addEventListener("click", (event) => {
      if (event.target === entryModal) {
        closeEntryModal();
      }
    });
  
    // Back button navigates to the home page.
    const backBtn = document.querySelector(".back-btn");
    backBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  });
  