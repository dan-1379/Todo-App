const ListItemEllipsis = ({ openOptionsModal }) => {
    return (
        <button
            type="button"
            onClick={openOptionsModal}
            className="flex gap-0.5 items-center p-2 cursor-pointer bg-transparent border-none group"
            aria-label="More options"
        >
            <div className="listItemEllipses bg-slate-900 w-[0.4em] h-[0.4em] rounded-full group-hover:animate-dot-pulse"></div>
            <div className="listItemEllipses bg-slate-900 w-[0.4em] h-[0.4em] rounded-full group-hover:animate-dot-pulse"></div>
            <div className="listItemEllipses bg-slate-900 w-[0.4em] h-[0.4em] rounded-full group-hover:animate-dot-pulse"></div>
        </button>
    )
}

export default ListItemEllipsis;