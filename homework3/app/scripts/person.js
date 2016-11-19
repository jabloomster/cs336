import React from 'react';
import Remarkable from 'remarkable';

module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    var md = new Remarkable();
    return (
      <div className="person">
        <h4 className="personName">
          {this.props.fname} {this.props.lname}
        </h4>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
