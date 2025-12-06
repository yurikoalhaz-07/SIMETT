// Tutup accordion lain saat satu dibuka
document.querySelectorAll("[data-accordion]").forEach(section => {
  const folds = section.querySelectorAll("details");
  folds.forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      folds.forEach(other => {
        if (other !== item) other.removeAttribute("open");
      });
    });
  });
});
