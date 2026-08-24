const ListItemEllipsis = ({ openOptionsModal, colour }) => {
    return (
        <button
            type="button"
            onClick={openOptionsModal}
            className="flex gap-0.5 items-center p-2 cursor-pointer bg-transparent border-none group"
            aria-label="More options"
        >
            <div className={`listItemEllipses w-[0.4em] h-[0.4em] rounded-full group-hover:animate-dot-pulse`} style={{ backgroundColor: colour }}></div>
            <div className={`listItemEllipses w-[0.4em] h-[0.4em] rounded-full group-hover:animate-dot-pulse`} style={{ backgroundColor: colour }}></div>
            <div className={`listItemEllipses w-[0.4em] h-[0.4em] rounded-full group-hover:animate-dot-pulse`} style={{ backgroundColor: colour }}></div>
        </button>
    )
}

export default ListItemEllipsis;