// Global Variables
let habits = [];
let habitCount = 0;
let listOfHabits = document.getElementById("habits-list");

// Menu Function Reducer

let habitActions = {
  done: function (habit) {
    let currentCount = document.querySelector(`.${habit} > .habit-count `);
    let convertedCount = parseInt(currentCount.textContent);
    convertedCount++;
    let newCount = document.createElement("p");
    newCount.innerHTML = `${convertedCount}`;
    newCount.className = "habit-count";
    currentCount.replaceWith(newCount);
  },
  missed: function (habit) {
    let currentCount = document.querySelector(`.${habit} > .habit-count `);
    let newCount = document.createElement("p");
    newCount.innerHTML = "0";
    newCount.className = "habit-count";
    currentCount.replaceWith(newCount);
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
