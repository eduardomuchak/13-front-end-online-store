import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsStar } from 'react-icons/bs';

class Evaluation extends Component {
  render() {
    const { assessments } = this.props;
    return (
      <div>
        {
          assessments.map((evaluation, index) => (
            <div key={ index }>
              <p>
                { evaluation.email }
              </p>
              <p>
                { evaluation.comment }
              </p>
              <p>
                { evaluation.star }
                <BsStar />
              </p>
            </div>
          ))
        }
      </div>
    );
  }
}

Evaluation.propTypes = {
  assessment: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Evaluation;
