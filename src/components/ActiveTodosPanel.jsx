import AddButton from './AddButton';
import FilterButton from './FilterButton';
import FilterModal from './FilterModal';
import InfoCard from './InfoCard';
import ListItem from './ListItem';

const ActiveTodosPanel = ({ todos, completed, colourSettings, filterOption, isOpenFilter, onToggleFilter, onSelectFilter, onAdd, onView, onViewDetails, onComplete, onDelete }) => {
    return (
        <div className='flex-1 rounded-2xl shadow-lg p-6' style={{ backgroundColor: colourSettings.cardBgColour }}>
            <div>
                <h1 className='text-2xl md:text-3xl font-bold mb-4' style={{ color: colourSettings.cardHeadingColour }}>Todo List</h1>

                {todos.length === 0 && !completed ? (
                    <InfoCard textContent="Enter a todo item to begin" colourModes={colourSettings} />
                    ) 
                    : (
                    <InfoCard textContent={`Todo items for completion: ${todos.length}`} colourModes={colourSettings} />
                )}

                <div className='flex gap-2 justify-end items-end'>
                    <div className='relative'>
                        {todos.length > 0 && <FilterButton handleInput={onToggleFilter} />}
                        {isOpenFilter && <FilterModal handleInput={onSelectFilter} />}
                    </div>

                    <AddButton
                        handleInput={onAdd}
                        textContent="Add new todo"
                        colourModes={colourSettings}
                    />
                </div>
            </div>

            <div>
                <ul className='my-2'>
                    {todos.map((element) => (
                        <ListItem
                        key={element.id}
                        icon={element.icon}
                        name={element.text}
                        notes={element.notes}
                        color={element.color}
                        textColor={element.textColor}
                        dateAdded={element.dateAdded}
                        priority={element.priority}
                        iconBg={element.iconBg}
                        iconColor={element.iconColor}
                        onView={() => onView(element.id)}
                        onViewDetails={() => onViewDetails(element.id)}
                        onComplete={() => onComplete(element.id)}
                        onDelete={() => onDelete(element.id)}
                        />
                    ))}
                </ul>

                {todos.length === 0 && filterOption && (
                    <div className='bg-slate-200 p-2 rounded-sm text-left my-5'>
                        <p>No <span className='font-bold'>{filterOption}</span> priority todos</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ActiveTodosPanel;