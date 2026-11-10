# SpendWise Budget Tracker

SpendWise is a small budgeting app made with HTML, CSS, and JavaScript. It helps you set a budget and keep a list of expenses.

## What changed this week

- Added a form to set a budget.
- Added a form to enter an expense name, amount, category, and date. The date starts as today and can be changed.
- Added dashboard cards for the budget, total spending, and money left.
- Added a message that changes when spending is within or above the budget.
- Added a list of expenses and a button to remove each expense.
- Made the page work on small screens.

## How the JavaScript works

### Decisions with conditionals

The app uses `if`, `else if`, and `else` statements to check the budget. It shows a different message when no budget is set, when the user has money left, when the budget is used, or when spending is over the budget. It also checks that amounts are greater than zero.

### Arrays and loops

The `expenses` array stores many expense records. Each record has a name, amount, category, and date. A `for` loop adds the amounts together and another `for` loop makes a webpage row for each expense.

### Updating the webpage

The app uses DOM tools such as `textContent`, `createElement`, and `append` to update the dashboard and expense list. The totals and message change when the data changes.

### User actions and events

Event listeners watch for the budget form and expense form being submitted. They read the form values, check them, update the data, and refresh the page. Each Remove button has a click event listener that deletes one expense.

## Challenges and solutions

- **Showing the right budget message:** I used conditional statements to check if the budget is missing, has money left, is fully used, or has been passed.
- **Keeping totals correct:** I calculate the total from the expense array each time the dashboard changes. This also keeps the total correct after an expense is removed.
- **Showing user text safely:** I use `textContent` when adding expense names to the page. This displays the text without treating it as HTML.

## How to run

1. Download or clone this repository.
2. Open `index.html` in a web browser.
3. Enter a budget, then add or remove expenses.

The app keeps data while the page is open. Refreshing the page starts a new budget.