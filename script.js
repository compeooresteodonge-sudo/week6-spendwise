const budgetForm = document.querySelector("#budget-form");
const budgetInput = document.querySelector("#budget-input");
const expenseForm = document.querySelector("#expense-form");
const expenseNameInput = document.querySelector("#expense-name");
const expenseAmountInput = document.querySelector("#expense-amount");
const expenseCategoryInput = document.querySelector("#expense-category");
const expenseDateInput = document.querySelector("#expense-date");
const budgetTotalElement = document.querySelector("#budget-total");
const spentTotalElement = document.querySelector("#spent-total");
const remainingTotalElement = document.querySelector("#remaining-total");
const budgetMessageElement = document.querySelector("#budget-message");
const expenseListElement = document.querySelector("#expense-list");
const expenseCountElement = document.querySelector("#expense-count");
const emptyMessageElement = document.querySelector("#empty-message");

let budget = 0;
const expenses = [];

function formatMoney(amount) {
  return `KSh ${amount.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function setExpenseDateToToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  expenseDateInput.value = `${year}-${month}-${day}`;
}

function updateDashboard() {
  let totalSpent = 0;

  for (let index = 0; index < expenses.length; index += 1) {
    totalSpent += expenses[index].amount;
  }

  const moneyLeft = budget - totalSpent;
  budgetTotalElement.textContent = formatMoney(budget);
  spentTotalElement.textContent = formatMoney(totalSpent);
  remainingTotalElement.textContent = formatMoney(moneyLeft);
  expenseCountElement.textContent = `${expenses.length} ${
    expenses.length === 1 ? "expense" : "expenses"
  }`;

  if (budget <= 0) {
    budgetMessageElement.textContent = "Set your budget to get started.";
    budgetMessageElement.classList.remove("is-warning");
  } else if (moneyLeft < 0) {
    budgetMessageElement.textContent = `You are ${formatMoney(Math.abs(moneyLeft))} over your budget. Try to spend less.`;
    budgetMessageElement.classList.add("is-warning");
  } else if (moneyLeft === 0) {
    budgetMessageElement.textContent = "You have used your full budget. Be careful with more spending.";
    budgetMessageElement.classList.add("is-warning");
  } else {
    budgetMessageElement.textContent = `Good work! You have ${formatMoney(moneyLeft)} left in your budget.`;
    budgetMessageElement.classList.remove("is-warning");
  }

  displayExpenses();
}

function displayExpenses() {
  expenseListElement.replaceChildren();
  emptyMessageElement.hidden = expenses.length > 0;

  for (let index = 0; index < expenses.length; index += 1) {
    const expense = expenses[index];
    const listItem = document.createElement("li");
    const info = document.createElement("div");
    const name = document.createElement("p");
    const meta = document.createElement("p");
    const actions = document.createElement("div");
    const amount = document.createElement("span");
    const deleteButton = document.createElement("button");

    listItem.className = "expense-item";
    info.className = "expense-info";
    name.className = "expense-name";
    meta.className = "expense-meta";
    actions.className = "expense-actions";
    amount.className = "expense-amount";
    deleteButton.className = "delete-button";

    name.textContent = expense.name;
    const formattedDate = new Date(`${expense.date}T00:00:00`).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    meta.textContent = `${expense.category} · ${formattedDate}`;
    amount.textContent = `-${formatMoney(expense.amount)}`;
    deleteButton.type = "button";
    deleteButton.textContent = "Remove";
    deleteButton.setAttribute("aria-label", `Remove ${expense.name}`);
    deleteButton.addEventListener("click", function () {
      expenses.splice(index, 1);
      updateDashboard();
    });

    info.append(name, meta);
    actions.append(amount, deleteButton);
    listItem.append(info, actions);
    expenseListElement.append(listItem);
  }
}

budgetForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newBudget = Number(budgetInput.value);

  if (!Number.isFinite(newBudget) || newBudget <= 0) {
    budgetMessageElement.textContent = "Please enter a budget greater than zero.";
    budgetMessageElement.classList.add("is-warning");
    return;
  }

  budget = newBudget;
  budgetForm.reset();
  updateDashboard();
});

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = expenseNameInput.value.trim();
  const amount = Number(expenseAmountInput.value);
  const date = expenseDateInput.value;

  if (name.length === 0 || !Number.isFinite(amount) || amount <= 0 || date.length === 0) {
    budgetMessageElement.textContent = "Please enter an expense name, a date, and an amount greater than zero.";
    budgetMessageElement.classList.add("is-warning");
    return;
  }

  expenses.push({
    name: name,
    amount: amount,
    category: expenseCategoryInput.value,
    date: date
  });

  expenseForm.reset();
  setExpenseDateToToday();
  updateDashboard();
  expenseNameInput.focus();
});

setExpenseDateToToday();
updateDashboard();