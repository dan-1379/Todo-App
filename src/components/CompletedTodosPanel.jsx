import CompletedTodoItem from './CompletedTodoItem';
import InfoCard from './InfoCard';
import ResetButton from './ResetButton';

const CompletedTodosPanel = ({ completed, activeCount, colourSettings, onReset }) => {
  const completionPercent = completed.length > 0
    ? Math.round((completed.length / (activeCount + completed.length)) * 100)
    : 0;

  return (
    <div className='flex-1 bg-white rounded-2xl shadow-lg p-6'>
      <h1 className='text-2xl md:text-3xl font-bold mb-4' style={{ color: colourSettings.cardHeadingColour }}>
        Completed Todos
      </h1>

      {completed.length > 0 && (
        <InfoCard textContent={`${completionPercent}% completed`} colourModes={colourSettings} />
      )}

      {completed.length === 0 && (
        <InfoCard textContent="Your completed todos will appear here" colourModes={colourSettings} />
      )}

      {completed.length > 0 && (
        <div className='flex justify-end'>
          <ResetButton resetTodos={onReset} textContent="Remove All" colourModes={colourSettings} />
        </div>
      )}

      <ul className='space-y-2 text-slate-600'>
        {completed.map((element) => (
          <CompletedTodoItem
            key={element.id}
            item={element.item}
            timeStarted={element.timeStarted}
            timeCompleted={element.timeCompleted}
            timeStampStarted={element.timeStampStarted}
            timeStampCompleted={element.timeStampCompleted}
            colourModes={colourSettings}
          />
        ))}
      </ul>
    </div>
  );
};

export default CompletedTodosPanel;