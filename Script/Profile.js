const profile_info = document.querySelector("#profile_info");
const menu_button = document.querySelector("#menu_button");

const easter_egg = document.querySelector("#easter_egg");
const easter_egg_button = document.querySelector(".easter-egg-btn");


menu_button.onclick = () => {
  profile_info.classList.toggle("active");
  menu_button.classList.toggle("active");
};

easter_egg_button.onclick = () => {
  easter_egg.classList.toggle("hide")
}
