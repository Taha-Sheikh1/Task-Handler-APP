

import UseHttp from '../../Hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
 

  const {isLoading, error, sendRequest : sendTask} = UseHttp();

  const enterTaskHandler = async (taskText) => {
    const createTask  = (taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText 
      };

      props.onAddTask(createdTask);
    }
    sendTask(
      {
      url: 'https://react-http-6b4a6.firebaseio.com/tasks.json',
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: { text: taskText },
    },
    createTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
