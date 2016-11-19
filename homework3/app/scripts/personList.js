import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Person from './person';

module.exports = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <Person fname={person.fname} lname={person.lname} key={person.id}>
          {'ID#: ' + person.id}
        </Person>
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});
