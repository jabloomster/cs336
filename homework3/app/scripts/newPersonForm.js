import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
  getInitialState: function() {
    return {fname: '', lname: '', start: ''};
  },
  handleFnameChange: function(e) {
    this.setState({fname: e.target.value});
  },
  handleLnameChange: function(e) {
    this.setState({lname: e.target.value});
  },
  handleStartChange: function(e) {
	this.setState({start: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var fname = this.state.fname.trim();
    var lname = this.state.lname.trim();
	var start = this.state.start.trim();
    if (!lname || !fname || !start) {
      return;
    }
    this.props.onPersonSubmit({fname: fname, lname: lname, start: start});
    this.setState({fname: '', lname: '', start: ''});
  },
  render: function() {
    return (
      <form className="newPersonForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={this.state.fname}
          onChange={this.handleFnameChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={this.state.lname}
          onChange={this.handleLnameChange}
        />
		<input
		  type="date"
		  value={this.state.start}
		  onChange={this.handleStartChange}
		/>
        <input type="submit" value="Add Person" />
      </form>
    );
  }
});
