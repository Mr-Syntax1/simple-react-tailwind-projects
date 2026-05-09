import { useState, useEffect } from 'react';

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('my-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState('');


  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = () => {
    if (inputValue.trim() === '') return;
    setTasks([...tasks, { text: inputValue, done: false }]);
    setInputValue('');
  };

  // complated
  const toggleTask = (index) => {
    const newTasks = [...tasks]
    newTasks[index].done = !newTasks[index].done
    setTasks(newTasks)
  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }



  return (
    <div className="min-h-screen bg-violet-900 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-gradient-to-b from-indigo-700 to-purple-600 rounded-2xl py-16 px-6">

        <h2 className='text-center text-6xl font-bold text-indigo-800 mb-14'>
          To-Do-List
        </h2>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder='what is your mind goal for today?'
          className='w-full md:w-96 block mx-auto px-4 py-2 text-lg rounded-lg shadow-md shadow-purple-700 ease-in-out duration-300 focus:shadow-purple-900 focus:shadow-xl focus:outline-none'
        />

        <ul className='mt-8 space-y-3 max-h-96 overflow-y-auto px-2'>
          {tasks.map((task, index) => (
            <li
              key={index}
              onClick={() => toggleTask(index)}
              className={`p-3 rounded-xl flex justify-between items-center text-white max-w-md mx-auto font-medium animate-fadeIn transition-all cursor-pointer
              ${task.done ? 'bg-indigo-300 text-gray-500 line-through' : 'bg-indigo-700'}`}
            >
              <span className='text-lg'>{task.text}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
                className='bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-lg text-white font-bold ml-5 w-28'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={addTask}
          className='bg-violet-800 hover:bg-violet-900 px-8 py-3 rounded-lg text-white font-bold text-xl block mx-auto mt-10 w-48'
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;