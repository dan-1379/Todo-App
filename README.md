
# Todolistful

A simple todo list application that allows users to keep track of items to do. Live at https://todolistful.vercel.app/


## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)



## Features

**Core todo management:**
- Add, edit, view, and delete todos.
- Todos contain: title, notes, priority, an icon, and custom todo colors.
- Mark todos as complete, which moves them into a separate "Completed" list with timestamps.
- Live preview of a todos appearance while adding or editing before saving.

**Filtering:**
- Filter the active todo list by priority level.

**Completed todos panel:**
- Shows all completed todos with start/completion times, along with the total time taken to complete.
- Displays a completion percentage.
- "Remove all" button to clear completed history.

**Data & persistence:**
- All todos, completed items, and colour theme settings persist to localStorage automatically.
- Export todos and completed to a downloable JSON file.
- Import todos from a previously exported JSON file.
- Erase all todos and completed items entirely.

**Customisation:**
- A settings modal for customising the app's entire colour scheme, including headings, backgrounds, cards, buttons, todos, and info banners.
- "Reset to default" option for colour settings.

**UX design:**
- Confirmation dialogs before actions such as deleting a todo or erasing all data.
- Toast notifications for success, warnings, and errors.
- Smooth animations for modals opening and closing.
- Congratulatory modal with confetti that triggers the moment all active todos are completed, showing the number of tasks cleared.
## Optimizations

- Centralised state management via a `useReducer` based `TodosReducer` handling Add, Update, Delete, Complete, Reset_Complete, Reset_All, and Import actions.
- Custom `useLocalStorageState` hook for persisted settings.
- Component structure split into ActiveTodosPanel, CompletedTodosPanel, TodoModal, SettingsModal, and other presentational components.

