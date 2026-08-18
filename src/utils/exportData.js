export const exportTodosAsJSON = (todos, completed) => {
    const dataToExport = {
        todos,
        completed
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    /*
        JSON.stringify -> converts the JS object into a JSON formatted string
            null is the replacer argument so include everything as is
            2 is the indentation, pretty printing the JSON with 2 space indents for readability

        new Blob([...], { type: 'application/json' }) -> wraps the string into a blob, which is a browser object representing 
        raw file-like data and tags it with a type so the browser/any app that opens it knows what the content is
    */

    // asks the browser to generate a temp local URL that points to the blob in memory
    const url = URL.createObjectURL(blob);

    // creates an anchor tag in memory, never inserted onto the page
    // the href is pointed at the blob url
    // the download sets the filename the browser will use when saving
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-export-${new Date().toISOString().slice(0, 10)}.json`;

    // simulates a user clicking the link. the link has a download attribute so the browser treats it as a file save and not a url navigation
    link.click();

    // clean up. releases temp blob url from browser memory now that the download is done
    URL.revokeObjectURL(url);
}

export const importTodosFromJSON = (file, onSuccess, onError) => {
    // creates a file reader, a built in browser api for reading contents of files
    const reader = new FileReader();

    // registers a callback that fires once the file has been fully read into memory
    reader.onload = (e) => {
        try {
            // takes the raw text content of the file and attempts to parse as JSON into a real JS object
            const data = JSON.parse(e.target.result);

            // checks to make it is the correct json format by checking for the todos and completed arrays
            if (!Array.isArray(data.todos) || !Array.isArray(data.completed)) {
                throw new Error('Invalid file format');
            }

            onSuccess(data);
        } catch {
            onError();
        }
    };

    // fires if the file reader itself failes to read the file at all e.g. permission issues, corruption, deleted/moved
    reader.onerror = () => onError();

    // kicks off read operation, tells file reader to read files content as a plain text string
    reader.readAsText(file);
}