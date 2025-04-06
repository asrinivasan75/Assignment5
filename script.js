window.addEventListener("load", () => {
  const bubbles = document.querySelectorAll(".bubble");
  const shuffleBtn = document.querySelector(".shuffle-btn");
  const addBtn = document.querySelector(".add-btn");

  // Dynamically position bubbles in a grid.
  function placeBubbles() {
    const total = bubbles.length;
    const padding = 20;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const maxBubblesPerRow = Math.ceil(Math.sqrt(total));
    const bubbleSize = Math.min(
      (screenW - (maxBubblesPerRow + 1) * padding) / maxBubblesPerRow,
      (screenH - (maxBubblesPerRow + 1) * padding) / maxBubblesPerRow
    );
    let placed = 0;
    const rows = Math.ceil(Math.sqrt(total));

    // Reset bubble styles.
    bubbles.forEach(bubble => {
      bubble.style.opacity = "0";
      bubble.classList.remove("animate");
      bubble.style.width = `${bubbleSize}px`;
      bubble.style.height = `${bubbleSize}px`;
    });

    setTimeout(() => {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < rows; col++) {
          if (placed >= total) break;
          const bubble = bubbles[placed];
          const x = padding + col * (bubbleSize + padding);
          const y = padding + row * (bubbleSize + padding);
          bubble.style.left = `${x}px`;
          bubble.style.top = `${y}px`;
          bubble.style.opacity = "1";
          bubble.classList.add("animate");
          placed++;
        }
      }
    }, 50);
  }

  placeBubbles();

  // Re-layout bubbles on window resize.
  window.addEventListener("resize", placeBubbles);

  // Shuffle button repositions the bubbles.
  shuffleBtn.addEventListener("click", placeBubbles);

  // Placeholder for adding a new journal entry.
  addBtn.addEventListener("click", () => {
    alert("Open journaling input (text/voice/etc)");
  });

  // On clicking a bubble, navigate to the journal page with the category as a query parameter.
  bubbles.forEach(bubble => {
    bubble.addEventListener("click", () => {
      const titleElement = bubble.querySelector("strong");
      const category = titleElement ? titleElement.textContent.trim() : "Unknown";
      window.location.href = "journal.html?category=" + encodeURIComponent(category);
    });
  });
});
