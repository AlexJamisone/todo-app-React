import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanal extends Component  {

	state = {
		term: ''
	}

	onSearchChenge = (e) => {
		const term = e.target.value;
		this.setState({term});
		this.props.onSearchChenge(term);
	};

	render() {
		return (
			<input  type="text"
					placeholder="type to search"
					className="form-control search-input"
					value={this.state.term}
					onChange={this.onSearchChenge}/>
		)
	}
};
