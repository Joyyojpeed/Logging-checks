# CRUD API Error Handling & Logging System

A robust error handling and logging system for JSONPlaceholder API interactions.

## 📌 Overview
This project demonstrates error handling and logging for a CRUD (Create, Read, Update, Delete) application using the JSONPlaceholder API. It includes:
- ✅ Error handling for network failures, invalid responses, and malformed data.
- ✅ Structured logging with timestamps, error types, and request metadata.
- ✅ Test cases simulating API failures (timeouts, DNS errors, invalid data).

## ⚙️ Features

| Feature         | Implementation Details                                                                 |
|------------------|----------------------------------------------------------------------------------------|
| **Error Handling** | Catches network errors (timeouts, DNS), HTTP errors (404, 500), and invalid responses. |
| **Logging**       | Logs errors to `logs/error_log.csv` with timestamps, error types, and request context. |
| **Test Coverage** | `errorTests.js` simulates API failures (timeouts, bad requests, invalid data).         |
| **Modular Design**| Separates CRUD logic (`crud.js`), logging (`logger.js`), and tests (`errorTests.js`).   |

## 🚀 Setup

### Install dependencies
```bash
npm install axios
```

### Run the demo
```bash
node index.js
```

### Test error scenarios
```bash
node errorTests.js
```

### Check logs
Errors are saved in `logs/error_log.csv`.

---

## 📂 Code Structure

| File           | Purpose                                                                          |
|-----------------|----------------------------------------------------------------------------------|
| **`crud.js`**   | CRUD functions (`fetchPost`, `createPost`, etc.) with error handling.            |
| **`logger.js`** | Logs errors with timestamps, error types, and request details (CSV).            |
| **`errorTests.js`** | Tests network failures, invalid responses, and data format issues.             |
| **`index.js`**  | Demo workflow (fetch, create, update, delete).                                  |

---

## 📝 Logging Strategy

Logs are stored in CSV format (`logs/error_log.csv`) with the following fields:
- **Timestamp**
- **Operation** (e.g., `fetchPost`)
- **Error Type** (e.g., `Timeout`, `HTTP Error`)
- **Message**
- **Request Details** (URL, method, status code, status text)

### Example Log Entry:
```csv
Timestamp,Operation,ErrorType,Message,URL,Method,StatusCode,StatusText
"2024-05-03T12:00:00Z","fetchPost","Timeout","timeout of 1ms exceeded","https://jsonplaceholder.typicode.com/posts/1","GET","N/A","N/A"
```

---

## 🔍 Evaluation & Improvements

### Strengths
- ✔ Comprehensive error detection (network, HTTP, data validation).
- ✔ Structured logs with machine-readable CSV format.
- ✔ Modular design for maintainability.

### Suggested Improvements
- 🔸 Add response validation (ensure API responses match the expected schema).
- 🔸 Implement a retry mechanism for transient errors (e.g., timeouts).
- 🔸 Introduce log rotation to prevent oversized log files.
- 🔸 Add input validation in CRUD functions (e.g., check `postData` structure).

---

## 📜 License
MIT © Joydeep Sen
