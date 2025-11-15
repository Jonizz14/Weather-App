import React from 'react'
import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">An error occurred</h3>
        <p className="error-text">{message || "Error loading data"}</p>
        {onRetry && (
          <button className="retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
