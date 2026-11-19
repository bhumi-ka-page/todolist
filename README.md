# Taskflow

A responsive MERN to-do application. The React client talks to an Express REST API, and task data is persisted in MongoDB through Mongoose.

## Requirements

- Node.js 18 or newer and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Setup

1. From the project root, install both client and server dependencies:

   ```sh
   npm install
   ```

2. Create `server/.env` from `server/.env.example` and set `MONGODB_URI`. The example points to a local database; for Atlas, use your connection string and keep credentials out of source control.

3. Optionally create `client/.env` from `client/.env.example` to configure `VITE_API_URL`. The default is `http://localhost:5000/api`.

4. Start the API and client from the project root in separate terminals:

   ```sh
   # Terminal 1
   npm run dev:server
   ```

   ```sh
   # Terminal 2
   npm run dev:client
   ```

   Open the Vite URL shown in the client terminal (normally `http://localhost:5173`). The API health check is at `http://localhost:5000/api/health`.

## API

All task endpoints are prefixed with `/api/tasks`.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/tasks` | List tasks, newest first |
| GET | `/api/tasks/:id` | Get a task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task or completion state |
| DELETE | `/api/tasks/:id` | Delete a task |

Task fields: `title` (required, up to 120 characters), `description` (up to 1000 characters), `priority` (`Low`, `Medium`, or `High`), `dueDate` (date or `null`), and `completed` (boolean). `createdAt` and `updatedAt` are managed by Mongoose.

Example:

```json
{
  "title": "Plan the week",
  "description": "Review priorities and block focus time",
  "priority": "High",
  "dueDate": "2026-11-16",
  "completed": false
}
```

## Production build

```sh
npm run build
```
