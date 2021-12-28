const profile_info = document.querySelector("#profile_info");
const menu_button = document.querySelector("#menu_button");


menu_button.onclick = () => {
  profile_info.classList.toggle("active");
  menu_button.classList.toggle("active");
};
