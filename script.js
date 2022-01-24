// Global Variables
let habits = [];
let habitCount = 0;
let listOfHabits = document.getElementById("habits-list");

// Menu Function Reducer

let habitActions = {
  done: function (habit) {
    alert(`DONE: ${habit}`);
  },
  missed: function (habit) {
    alert(`MISSED: ${habit}`);
  },
  delete: function (habit) {
    alert(`DELETE: ${habit}`);
  },
};

function habitReducer(event) {
  let currentHabit = event.currentTarget.className;
  if (event.target.className === "habit-done") {
    habitActions.done(currentHabit);
  } else if (event.target.className === "habit-missed") {
    habitActions.missed(currentHabit);
  } else if (event.target.className === "habit-delete") {
    habitActions.delete(currentHabit);
  } else {
    alert("Default!");
  }
}

// Event Listeners
let addButton = document.getElementById("add-habit");
addButton.addEventListener("click", addHabit);

/* let habitContainer = document.getElementById("habits-list");
habitContainer.addEventListener("click", habitReducer); */

// Functions
function addHabit(event) {
  event.preventDefault();
  let habit = document.getElementById("habit-text");
  habits.push(habit.value);
  let newHabit = document.createElement("div");
  habitCount++;
  newHabit.className = `habit-${habitCount}`;
  newHabit.innerHTML = `
  <p class="habit-text">${habit.value}</p>
  <p class="habit-count">0</p>
  <button class="habit-done">DONE</button
  ><button class="habit-missed">MISSED</button
  ><button class="habit-delete">DELETE</button>`;
  newHabit.addEventListener("click", habitReducer);
  listOfHabits.append(newHabit);
  habit.value = "";
}
