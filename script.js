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
    let currentHabit = JSON.parse(localStorage.getItem(`${habit}`));
    currentHabit.streak++;
    localStorage.setItem(`${habit}`, JSON.stringify(currentHabit));

    let selectedHabitCount = document.querySelector(`.${habit} .habit-count`);
    let newStreak = document.createElement("p");
    newStreak.innerHTML = `${currentHabit.streak}`;
    newStreak.className =
      currentHabit.streak > 5 ? "habit-count habit-streak" : "habit-count";
    selectedHabitCount.replaceWith(newStreak);
  },
  missed: function (habit) {
    let currentHabit = JSON.parse(localStorage.getItem(`${habit}`));
    currentHabit.streak = 0;
    localStorage.setItem(`${habit}`, JSON.stringify(currentHabit));

    let currentCount = document.querySelector(`.${habit} .habit-count `);
    let newCount = document.createElement("p");
    newCount.innerHTML = "0";
    newCount.className = "habit-count habit-zero";
    currentCount.replaceWith(newCount);
  },
  delete: function (habit) {
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
  <div class="habit-card">
  <p class="habit-text">${habitText}</p>
  <p class="habit-count habit-zero">${streak}</p>
  <button class="habit-done">DONE</button
  ><button class="habit-missed">MISSED</button
  ><button class="habit-delete">DELETE</button></div>`;
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
