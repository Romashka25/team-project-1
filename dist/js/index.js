const burger = document.querySelector(".nav-burger");
const navList = document.querySelector(".nav-list");

burger.addEventListener("click", function () {
  const prevActive = burger.querySelector(".show");
  const nextActive = burger.querySelector(".hide");
  prevActive.classList.replace("show", "hide");
  nextActive.classList.replace("hide", "show");
  navList.classList.toggle("active");
});
