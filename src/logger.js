const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', 'logs', 'error_log.csv');

// Ensure header exists
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, 'Timestamp,Operation,ErrorType,Message,URL,Method,StatusCode,StatusText\n');
}

function logError(operation, error, context = {}) {
  const timestamp = new Date().toISOString();
  const message = (error?.message || 'Unknown error').replace(/[\r\n]+/g, ' ');
  const url = context.url || error?.config?.url || 'N/A';
  const method = context.method || error?.config?.method?.toUpperCase() || 'N/A';
  const status = error?.response?.status || 'N/A';
  const statusText = error?.response?.statusText || 'N/A';

  let errorType = 'Unknown';
  if (error.code === 'ENOTFOUND') errorType = 'DNS Resolution Failed';
  else if (error.code === 'ECONNABORTED') errorType = 'Timeout';
  else if (error.response) errorType = 'HTTP Error';
  else if (error.request) errorType = 'Network Error';
  else errorType = 'Runtime Error';

  const line = `"${timestamp}","${operation}","${errorType}","${message}","${url}","${method}","${status}","${statusText}"\n`;
  fs.appendFileSync(logPath, line);
}

module.exports = { logError };
