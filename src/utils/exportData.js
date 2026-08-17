export const exportTodosAsJSON = (todos, completed) => {
    const dataToExport = {
        todos,
        completed
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-export-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();

    URL.revokeObjectURL(url);
}

export const importTodosFromJSON = (file, onSuccess, onError) => {
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            if (!Array.isArray(data.todos) || !Array.isArray(data.completed)) {
                throw new Error('Invalid file format');
            }

            onSuccess(data);
        } catch {
            onError();
        }
    };

    reader.onerror = () => onError();

    reader.readAsText(file);
}