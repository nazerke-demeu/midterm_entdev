import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log('Получение задач...'); // Отладка: начало получения
    axios.get('http://localhost:8080/tasks')
      .then(response => {
        console.log('Получены задачи:', response.data); // Отладка: данные от бэкенда
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Ошибка получения задач:', error); // Отладка: ошибка
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.ID !== id)))
      .catch(error => console.error('Ошибка удаления задачи:', error));
  };

  return (
    <div>
      <Link to="/add" className="btn btn-primary mb-3">Add Task</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.ID}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.completed ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/edit/${task.ID}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <button onClick={() => handleDelete(task.ID)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;