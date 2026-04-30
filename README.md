<p align="center">
  <img src="assets/logo.svg" alt="CodePharos" width="120" />
</p>

<h1 align="center">CodePharos</h1>

<p align="center">
  A knowledge-sharing platform for software engineers. Mentors post guides, tips, and resources. Junior engineers find answers, ask questions, and grow. An AI assistant trained on the platform's content answers questions in context, an always-on engineering mentor.
</p>

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** PostgreSQL (via Docker)
- **DB Library:** pg-promise

## Getting Started

### Prerequisites

- Node.js (v20+)
- Docker & Docker Compose

### 1. Clone the repo

```bash
git clone git@github.com:FK78/CodePharos.git
cd CodePharos
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `POSTGRES_USER` | Database username |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_PORT` | Port to expose Postgres (e.g. `5432`) |
| `POSTGRES_HOST` | Database host (e.g. `localhost`) |
| `POSTGRES_NAME` | Database name |

### 4. Start the database

```bash
docker compose up -d
```

This starts PostgreSQL.

### 5. Run the server

```bash
npm run start-server
```

Server starts on [http://localhost:3000](http://localhost:3000) with file watching enabled.

## API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users/register` | Register a user |
| DELETE | `/users/:id` | Delete a user |

Registering a user requires `username`, `email`, and `password`. New users default to the `mentee` role.

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get post by ID |
| POST | `/posts` | Create a post |
| DELETE | `/posts/:id` | Delete a post |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/comments` | Get all comments |
| GET | `/comments/:id` | Get comment by ID |
| POST | `/comments` | Create a comment |
| DELETE | `/comments/:id` | Delete a comment |

## License

MIT
