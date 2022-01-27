// TODO: Persist habit storage (localStorage)
// TODO: Styling (make it look awesome!)
// TODO: Persist habit storage using Firebase
// TODO: Modal component for CRUD
// TODO: Add support for users
// TODO: Off canvas sidebar (after add users)
// TODO: Form validation
// TODO: Add regions and comments
// TODO: DEPLOY

//import { app } from "./utils/firebase";
import { testValue } from "./utils/firebase";
console.log("Test value", testValue);
let habitCount = 0;
let listOfHabits = document.getElementById("habits-list");
let addButton = document.getElementById("add-habit");
addButton.addEventListener("click", addHabit);

(() => {
  let storedHabitCount = localStorage.getItem("count");
  if (!storedHabitCount) {
    localStorage.setItem("count", "0");
  } else {
    habitCount = parseInt(storedHabitCount);
    renderHabits(habitCount);
  }
})();

function renderHabits(habitCount) {
  for (let index = 0; index < habitCount; index++) {
    let habit = JSON.parse(localStorage.getItem(`habit-${index}`));
    createHabitElement(habit.text, index, habit.streak);
  }
}

let habitActions = {
  done: function (habit) {
    // get current habit, parse, and update streak value
    let currentHabit = JSON.parse(localStorage.getItem(`${habit}`));
    currentHabit.streak++;
    localStorage.setItem(`${habit}`, JSON.stringify(currentHabit));

    // create a new count element for the current habit and replace old
    let selectedHabitCount = document.querySelector(`.${habit} > .habit-count`);
    let newStreak = document.createElement("p");
    newStreak.innerHTML = `${currentHabit.streak}`;
    newStreak.className = "habit-count";
    selectedHabitCount.replaceWith(newStreak);
  },
  missed: function (habit) {
    // get current habit, parse, and zero out streak value
    let currentHabit = JSON.parse(localStorage.getItem(`${habit}`));
    currentHabit.streak = 0;
    localStorage.setItem(`${habit}`, JSON.stringify(currentHabit));

    // replace old count element with 0 content
    let currentCount = document.querySelector(`.${habit} > .habit-count `);
    let newCount = document.createElement("p");
    newCount.innerHTML = "0";
    newCount.className = "habit-count";
    currentCount.replaceWith(newCount);
  },
  delete: function (habit) {
    // remove current habit from localStorage and render habits
    localStorage.removeItem(`${habit}`);
    habitCount--;
    localStorage.setItem("count", habitCount);
    let currentHabit = document.querySelector(`.${habit}`);
    currentHabit.remove();
  },
};

function habitReducer(event) {
  let habitName = event.currentTarget.className;
  if (event.target.className === "habit-done") {
    habitActions.done(habitName);
  } else if (event.target.className === "habit-missed") {
    habitActions.missed(habitName);
  } else if (event.target.className === "habit-delete") {
    habitActions.delete(habitName);
  } else {
    alert("Default!");
  }
}

function addHabit(event) {
  event.preventDefault();
  let habitInput = document.getElementById("habit-text");
  let habit = {
    text: habitInput.value,
    streak: 0,
  };
  storeHabitInLocalStorage(habit);
  createHabitElement(habitInput.value, habitCount, 0);
  updateHabitCount();
  habitInput.value = "";
}

function createHabitElement(habitText, currentCount, streak) {
  let newHabit = document.createElement("div");
  newHabit.className = `habit-${currentCount}`;
  newHabit.innerHTML = `
  <p class="habit-text">${habitText}</p>
  <p class="habit-count">${streak}</p>
  <button class="habit-done">DONE</button
  ><button class="habit-missed">MISSED</button
  ><button class="habit-delete">DELETE</button>`;
  newHabit.addEventListener("click", habitReducer);
  listOfHabits.append(newHabit);
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
