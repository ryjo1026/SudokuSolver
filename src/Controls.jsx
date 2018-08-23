import React from 'react';
import PropTypes from 'prop-types';

export default function Controls({ animate, handleSubmit, handleAnimateChange }) {
  return (
    <div className="Controls">
      <form>
        <label style={{ display: 'block' }}>
          Animate solution:
          <input
            style={{ display: 'block' }}
            name="animate"
            type="checkbox"
            checked={animate}
            onChange={handleAnimateChange}
          />
        </label>
      </form>
      <button type="submit" onClick={handleSubmit}>
        Solve Puzzle
      </button>
    </div>);
}
Controls.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleAnimateChange: PropTypes.func.isRequired,
  animate: PropTypes.bool.isRequired,
};
