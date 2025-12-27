
function ListItem(props) {
    return (
        <li className="flex items-center justify-between bg-slate-100 rounded-lg px-4 py-3 my-5">
            <p className="text-slate-800">{props.name}</p>
            <button onClick={props.onComplete} className="text-green-600 hover:bg-green-100 px-3 py-1 rounded-md transition">Complete</button>
            <button onClick={props.onDelete} className="text-red-600 hover:bg-red-100 px-3 py-1 rounded-md transition">Delete</button>
        </li>
    )
}

export default ListItem