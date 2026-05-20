import React, { useState, useEffect } from 'react';

interface Task {
  text: string;
  done: boolean;
}

function App() {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('my-tasks')
    return saved ? JSON.parse(saved) : [];
  })

  const [inputValue, setInputValue] = useState<string>('')

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState<string>('')


  // When tasks change you put it in localstorage
  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks))
  }, [tasks])

  //Add tasks to list
  const addTask = (): void => {
    if (inputValue.trim() === '') return;
    setTasks([...tasks, { text: inputValue, done: false }])
    setInputValue('')
  }

  // Select tasks to Complete or not Complete
  const toggleTask = (index: number): void => {
    const newTasks = [...tasks]
    newTasks[index].done = !newTasks[index].done
    setTasks(newTasks)
  }

  //Deleting tasks we choose
  const deleteTask = (index: number): void => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }


  const startEdit = (index: number, currentText: string) => {
    setEditingIndex(index)
    setEditValue(currentText)
  }

  const saveEdit = (index: number) => {
    if (editValue.trim() === '') return
    const newTasks = [...tasks]
    newTasks[index].text = editValue;
    setTasks(newTasks)
    setEditingIndex(null)
    setEditValue('')
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditValue('')
  }


  return (
    <div className="min-h-screen bg-violet-900 flex justify-center items-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-3xl bg-gradient-to-b from-indigo-700 to-purple-600 rounded-2xl py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">

        {/* title */}
        <h2 className='text-center text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-800 mb-8 sm:mb-10 md:mb-14'>
          To-Do-List
        </h2>

        {/* input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder='what is your mind goal for today?'
          className='w-full md:w-96 block mx-auto px-4 py-2 text-base sm:text-lg rounded-lg shadow-md shadow-purple-700 ease-in-out duration-300 focus:shadow-purple-900 focus:shadow-xl focus:outline-none'
        />

        {/* tasks list */}
        <ul className='mt-6 sm:mt-8 space-y-3 max-h-96 overflow-y-auto px-1 sm:px-2'>
          {tasks.map((task: Task, index: number) => (
            <li
              key={index}
              className={`p-2 sm:p-3 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center text-white max-w-xl mx-auto font-medium transition-all gap-2 sm:gap-3
              ${task.done ? 'bg-indigo-300 text-gray-500 line-through' : 'bg-indigo-700'}`}
            >
              {editingIndex === index ? (
                <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(index)}
                    className="flex-1 px-3 py-2 text-gray-800 rounded-lg focus:outline-none text-sm sm:text-base"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(index)}
                      className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg text-white font-bold text-sm sm:text-base flex-1"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-red-400 hover:bg-red-600 px-3 py-2 rounded-lg text-white font-bold text-sm sm:text-base flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span
                    onClick={() => toggleTask(index)}
                    className='text-sm sm:text-base md:text-lg flex-1 cursor-pointer break-words w-full sm:w-auto'
                  >
                    {task.text}
                  </span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => startEdit(index, task.text)}
                      className='bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-lg text-white font-bold text-sm sm:text-base flex-1'
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        deleteTask(index);
                      }}
                      className='bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded-lg text-white font-bold text-sm sm:text-base flex-1'
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Add button */}
        <button
          onClick={addTask}
          className='bg-violet-800 hover:bg-violet-900 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-white font-bold text-lg sm:text-xl block mx-auto mt-8 sm:mt-10 w-40 sm:w-48'
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;