import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/tasks/${id}`)
        .then(response => setTask(response.data))
        .catch(error => console.error('Error fetching task:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`http://localhost:8080/tasks/${id}`, task)
      : axios.post('http://localhost:8080/tasks', task);
    request
      .then(() => navigate('/'))
      .catch(error => console.error('Error saving task:', error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
        />
        <label className="form-check-label">Completed</label>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
      <Link to="/" className="btn btn-secondary ms-2">Cancel</Link>
    </form>
  );
};

export default TaskForm;