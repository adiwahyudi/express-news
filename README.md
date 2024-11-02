# Express News

## Tech Stack
- ExpressJS 
- [Prisma (ORM)](https://prisma.io)
- Postgres
- Auth with JWT

## Getting Started

### 1. Install dependencies
```shell
    npm install
```

### 2. Create .env file
```shell
    cp .env.example .env
```

### 3. Set up database
- make sure the database already created.
```shell
    npx prisma migrate dev
```

### 4. Seed data
```shell
    npx prisma db seed
```

### 5. Run the server
```shell
    npm run dev
```
## Credential Users from Seeders
- Admin
    - username: `admin`
    - password: `123123`
- User 
    - username: `user`
    - password: `123123`
## API Endpoints
### Auth
- `POST /auth/login`
- `POST /auth/register`

### News
- `GET /news`
  - Query Params
    - `search` (String) will be searched through `title` or `content` -> `GET /news?search=keyword`
- `GET /news/:id`
- `POST /news`
- `PUT /news/:id`
- `DELETE /news/:id`

### Categories
- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

## Model Schema
### User
- `id` - Primary Key (Integer)
- `username` (String)
- `email` (String)
- `password` (String)
- `role` (Enum)[admin, user]
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### News
- `id` - Primary Key (Integer)
- `title` (String)
- `content` (Text)
- `categoryId` - Foreign Key (Null/Integer)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Category
- `id` - Primary Key (Integer)
- `name` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## Documentation
[Postman Collection](https://github.com/adiwahyudi/express-news/tree/master/express-news.postman_collection.json) Import in Postman.