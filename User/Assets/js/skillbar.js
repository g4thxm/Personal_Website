document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".skill-bars .progress");

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          const el = entry.target;
          const percent = [...el.classList].find(c => c.includes("percent")).replace("percent", "");
          el.style.width = percent + "%";
          el.classList.add("active");
        }, i * 200); // stagger delay
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
});
