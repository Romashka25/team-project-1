const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", function (event) {
  burger.classList.toggle("header__burger--active");
  nav.classList.toggle("header__nav--active");
  event.clickBurger = true;
});

document.body.addEventListener("click", function (event) {
  if (
    event.clickBurger === true ||
    event.target.classList.contains(
      "header__nav-link",
      "header__nav-list-item",
      "header__nav"
    )
  )
    return;
  burger.classList.remove("header__burger--active");
  nav.classList.remove("header__nav--active");
});
