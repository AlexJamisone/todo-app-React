import React from 'react';
import TodoListItem from '../todo-list-item';

import './todo-list.css';

const ToDoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

	
	const elements = todos.map((item) => {
		const { id, ...itemProps } = item;
		return (
		  <li key={id} className="list-group-item">
			<TodoListItem
			  { ...itemProps }
			  onToggleImportant={ () => onToggleImportant(id) }
			  onToggleDone={ () => onToggleDone(id) }
			  onDelete={ () => onDeleted(id) } />
		  </li>
		);
	  });
    return (
		<ul className="list-group todo-list">
			{ elements }
		</ul>
    );
  }

  export default ToDoList;