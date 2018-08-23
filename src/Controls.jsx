import React from 'react';
import PropTypes from 'prop-types';

export default function Controls({ handleSubmit }) {
  return (
    <div className="Controls">
      <button type="submit" onClick={handleSubmit}>
        Solve Puzzle
      </button>
    </div>);
}
Controls.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
