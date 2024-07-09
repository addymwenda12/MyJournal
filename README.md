# MyJournal

A cross-platform mobile application for personal journaling, built with React Native and backed by a Node.js server.

## Project Overview

This application allows users to create, manage, and reflect on their personal journal entries. It features a mobile app for easy access and a robust backend for data management and security.

### Key Features

- User authentication (sign-up, login)
- Create, read, update, and delete journal entries
- Categorize entries for better organization
- View summaries of journal entries (daily, weekly, monthly)
- Secure data storage and access

## Technology Stack

- **Mobile App**: React Native with TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL
- Expo CLI (for mobile app development)

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/addymwenda12/MyJournal.git

cd MyJournal/server
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
- Copy `.env.example` to `.env`
- Fill in the required variables (database credentials, JWT secret, etc.)

4. Set up the database:
```sql
psql -U your_username -d your_database -a -f schema.sql
```
5. Start the server:
```bash
npm run start
```
The server should now be running on `http://localhost:3000`.

### Mobile App Setup

1. Navigate to the mobile app directory:
```bash
cd myjournal
```
2. Install dependencies:
```bash
npm install
```
3. Start the Expo development server:
```bash
expo start
```
4. Use the Expo Go app on your mobile device or an emulator to run the application.

## API Documentation

Detailed API documentation can be found in the `docs/api.md` file.

## Contributing

We welcome contributions! Please see our `CONTRIBUTING.md` file for details on how to contribute to this project.

## Testing

- Backend: Run `npm test` in the backend directory
- Mobile App: Run `npm test` in the mobile directory

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.


Happy Journaling!
