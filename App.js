import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import UseHttp from './Hooks/use-http';

function App() {

  const [tasks, setTasks] = useState([]);


  const { isLoading, error, sendRequest : fetchTasks } = UseHttp();


  useEffect(() => {

    const TransformTask = ObjTask => {
      const loadedTasks = [];
  
        for (const taskKey in ObjTask) {
          loadedTasks.push({ id: taskKey, text: ObjTask[taskKey].text });
        }
        setTasks(loadedTasks);
    };

    fetchTasks({url : 'https://react-http-6b4a6.firebaseio.com/tasks.json'}, TransformTask);

  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
