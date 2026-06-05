const optionLabels = {
  A: "A 市區穩健版",
  B: "B 七股海線版",
  C: "C 高鐵周邊版",
};

const note = document.querySelector("#selectedNote");
const cards = [...document.querySelectorAll(".option-card")];

cards.forEach((card) => {
  const button = card.querySelector(".select-button");
  button.addEventListener("click", () => {
    cards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    const option = card.dataset.option;
    note.textContent = `目前選擇：${optionLabels[option]}。`;
  });
});

