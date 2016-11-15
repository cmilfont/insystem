import React, { PropTypes } from 'react';

class Base extends React.Component {

  static propTypes = {
    children: PropTypes.element,
  }

  render () {
    const { children } = this.props;
    return (
      <div className="mdl-layout mdl-layout--fixed-header">
        <main className="mdl-layout__content">
          {children}
        </main>
      </div>
    )
  }
}

export default Base;
