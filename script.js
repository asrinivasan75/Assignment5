window.addEventListener("load", () => {
    const bubbles = document.querySelectorAll(".bubble");
    const shuffleBtn = document.querySelector(".shuffle-btn");
    const addBtn = document.querySelector(".add-btn");
  
    function placeBubbles() {
      const total = bubbles.length;
      const padding = 20;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
  
      // Dynamically scale bubble size
      const maxBubblesPerRow = Math.ceil(Math.sqrt(total));
      const bubbleSize = Math.min(
        (screenW - (maxBubblesPerRow + 1) * padding) / maxBubblesPerRow,
        (screenH - (maxBubblesPerRow + 1) * padding) / maxBubblesPerRow
      );
  
      const positions = [];
      let placed = 0;
      const rows = Math.ceil(Math.sqrt(total));
  
      // Clear and prepare
      bubbles.forEach(b => {
        b.style.opacity = "0";
        b.classList.remove("animate");
        b.style.width = `${bubbleSize}px`;
        b.style.height = `${bubbleSize}px`;
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
  
    shuffleBtn.addEventListener("click", placeBubbles);
    addBtn.addEventListener("click", () => {
      alert("Open journaling input (text/voice/etc)");
    });
  
    // Optional: Re-layout on resize
    window.addEventListener("resize", () => {
      placeBubbles();
    });
  });
  