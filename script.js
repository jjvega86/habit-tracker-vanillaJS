// TODO: Persist habit storage (localStorage)
// TODO: Styling (make it look awesome!)
// TODO: Persist habit storage using Firebase
// TODO: Modal component for CRUD
// TODO: Add support for users
// TODO: Off canvas sidebar (after add users)
// TODO: Form validation

let habitCount = 0;
(() => {
  // check if habit count is currently in local storage
  // if not, create the key/value and set to 0
  let storedHabitCount = localStorage.getItem("count");
  console.log(storedHabitCount);
  if (!storedHabitCount) {
    localStorage.setItem("count", "0");
  } else {
    habitCount = parseInt(storedHabitCount);
  }
})();

let listOfHabits = document.getElementById("habits-list");
let addButton = document.getElementById("add-habit");
addButton.addEventListener("click", addHabit);

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
    let currentHabit = document.querySelector(`.${habit}`);
    currentHabit.remove();
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

// When a habit is added
// I want to store the habit as an object in local storage
// When habits are rendered to the screen
// I want to grab them from local storage, and convert from JSON

// use habit count stored in local storage to dynamically generate class for each

function addHabit(event) {
  event.preventDefault();
  let habitText = document.getElementById("habit-text");
  let habit = {
    text: habitText.value,
    streak: 0,
  };
  storeHabitInLocalStorage(habit);
  updateHabitCount();
  createHabitElement(habitText);
}

function createHabitElement(habitText) {
  let newHabit = document.createElement("div");
  newHabit.className = `habit-${habitCount}`;
  newHabit.innerHTML = `
  <p class="habit-text">${habitText.value}</p>
  <p class="habit-count">0</p>
  <button class="habit-done">DONE</button
  ><button class="habit-missed">MISSED</button
  ><button class="habit-delete">DELETE</button>`;
  newHabit.addEventListener("click", habitReducer);
  listOfHabits.append(newHabit);
  habitText.value = "";
}

function storeHabitInLocalStorage(habit) {
  localStorage.setItem(`habit-${habitCount}`, JSON.stringify(habit));
}

function updateHabitCount() {
  habitCount++;
  let storedCount = parseInt(localStorage.getItem("count"));
  storedCount = habitCount;
  localStorage.setItem("count", storedCount);
}
