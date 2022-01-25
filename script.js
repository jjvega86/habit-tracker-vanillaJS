// TODO: Persist habit storage (localStorage)
// TODO: Styling (make it look awesome!)
// TODO: Persist habit storage using Firebase
// TODO: Modal component for CRUD
// TODO: Add support for users
// TODO: Off canvas sidebar (after add users)
// TODO: Form validation
// TODO: Add regions and comments

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

function addHabit(event) {
  event.preventDefault();
  let habitText = document.getElementById("habit-text");
  let habit = {
    text: habitText.value,
    streak: 0,
  };
  storeHabitInLocalStorage(habit);
  updateHabitCount();
  createHabitElement(habitText.value, habitCount, 0);
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
