import React from 'react'
import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">Xatolik yuz berdi</h3>
        <p className="error-text">{message || "Ma'lumotlarni yuklashda xatolik yuz berdi"}</p>
        {onRetry && (
          <button className="retry-btn" onClick={onRetry}>
            Qayta urinib ko'ring
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
