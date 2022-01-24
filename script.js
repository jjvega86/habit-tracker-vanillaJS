//Global Variables
let habits = [];
let listOfHabits = document.getElementById("habits-list");

// Event Listeners
let addButton = document.getElementById("add-habit");
addButton.addEventListener("click", addHabit);

// Functions
function addHabit(event) {
  event.preventDefault();
  let habit = document.getElementById("habit-text");
  habits.push(habit.value);
  let newHabit = document.createElement("div");
  newHabit.className = "habit";
  newHabit.innerHTML = `
  <p class="habit-text">${habit.value}</p>
  <p class="habit-count">0</p>
  <button class="habit-done">DONE</button
  ><button class="habit-missed">MISSED</button
  ><button class="habit-delete">DELETE</button>`;
  listOfHabits.append(newHabit);
  habit.value = "";
}
