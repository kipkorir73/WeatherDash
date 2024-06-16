import React from 'react';

const ErrorDisplay = ({ error }) => {
  return (
    <div className="error-message">
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay;
