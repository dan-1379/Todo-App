function TodosReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'UPDATE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, ...action.payload } : t
        ),
      };

    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id),
      };

    case 'COMPLETE': {
      const todo = state.todos.find(t => t.id === action.id);
      if (!todo) return state;

      const completedItem = {
        id: crypto.randomUUID(),
        item: todo.text,
        timeStarted: todo.dateAdded,
        timeCompleted: action.completedAt,
        timeStampStarted: todo.timeStamp,
        timeStampCompleted: Date.now(),
      };

      const duration = completedItem.timeStampCompleted - completedItem.timeStampStarted;

      return {
        todos: state.todos.filter(t => t.id !== action.id),
        completed: [...state.completed, completedItem],
        totalTime: state.totalTime + duration
      };
    }

    case 'RESET_COMPLETED':
      return { ...state, completed: [], totalTime: 0 };
    
    case 'RESET_ALL':
      return {
        todos: [],
        completed: [],
        totalTime: 0
      }

    case 'IMPORT': {
      const mergedCompleted = [...state.completed, ...(action.payload.completed ?? [])];
      const importedTotal = mergedCompleted.reduce(
        (sum, item) => sum + (item.timeStampCompleted - item.timeStampStarted), 0
      );

      return {
        todos: [...state.todos, ...(action.payload.todos ?? [])],
        completed: mergedCompleted,
        totalTime: importedTotal
      };
    }

    default:
      return state;
  }
}

export default TodosReducer;