import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanal from '../search-panel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

	maxId = 100;

	state = {
		todoData: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make awesome App'),
			this.createTodoItem('Have a lunch'),
		],
		term: '',
		filter: 'all' // active, all, done
	};

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	};

	deletItem = (id) => {
		this.setState(({todoData}) => {
			const idx = todoData.findIndex((el) => el.id === id);  

			const newArray = [
				...todoData.slice(0, idx), 
				...todoData.slice(idx + 1)];

			return {
				todoData: newArray
			}
		})
	};

	addItem = (text) => {
		// genereate id ?
		const newItem = this.createTodoItem(text)


		// add element in array ?
		this.setState(({todoData}) => {
			const newArr = [
				...todoData,
				newItem
			];
			return {
				todoData: newArr
			}
		});
		
	};

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id); 

			
			const oldItem = arr[idx];
			const newItem = {...oldItem,
							 [propName]: !oldItem[propName]};

		
			return [
				...arr.slice(0, idx),
				newItem,
				...arr.slice(idx + 1)
			];
	}

	onToggleImportant = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		});
	};

	onToggleDone = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		});
	};

	onSearchChenge = (term) => {
		this.setState({term});
	};

	onFilterChenge = (filter) => {
		this.setState({filter})
	};

	search(items, term) {
		if (term.length === 0) {
			return items;
		}

		return items.filter((item) => {
			return item.label
				.toLowerCase()
				.indexOf(term.toLowerCase()) > -1;
		});
	}

	filter(items, filter) {
		switch(filter) {
			case 'all':
				return items;
			case 'active':
				return items.filter((item) => !item.done);
			case 'done':
				return items.filter((item) => item.done);
			default:
				return items;
		}
	}

	render() {

		const { todoData, term, filter } = this.state;

		const visibleItems = this.filter(this.search(todoData, term), filter);

	

		const doneCount = todoData
						  .filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount;
		return (
			<div className="todo-app">
				<AppHeader	toDo={todoCount} done={doneCount}/>
				<div className="top-panel d-flex">
					<SearchPanal
						onSearchChenge={this.onSearchChenge}/>
					<ItemStatusFilter 
						filter={filter}
						onFilterChenge={this.onFilterChenge}/>
				</div>
				
				<ToDoList 
					todos={visibleItems}
					onDeleted={ this.deletItem }
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}/>

				<ItemAddForm
					onItemAded={ this.addItem }/>
			</div>
		)
	}
};


  