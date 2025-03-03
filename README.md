JobConnect-API

🚀 JobConnect API is a RESTful backend for a job board platform where employers can post jobs, job seekers can apply, and admins manage users and listings.

📌 Features

✅ User Authentication – JWT-based login & registration✅ Role-Based Access Control (RBAC) – Admin, Employer, Job Seeker✅ CRUD Operations – Manage jobs, applications & users✅ Soft Delete – Restore deleted jobs & users✅ Redis Caching – Faster job retrieval✅ API Versioning – Future-proof structure✅ Postman Documentation – Easy API testing

🛠 Tech Stack

Backend: Node.js (TypeScript) + Express.js

Database: MongoDB (Mongoose ORM)

Authentication: JWT + bcrypt

Caching: Redis

🚀 Installation & Setup

# Clone the repository
git clone https://github.com/your-username/JobConnect-API.git
cd JobConnect-API

# Install dependencies
npm install

# Create a .env file and add the required environment variables

# Start the server (development mode)
npm run dev

# Start the server (production mode)
npm start

🔗 API Endpoints

🔹 Authentication (/api/v1/auth)

POST /register – User registration

POST /login – User login

GET /profile – Get user profile

🔹 Jobs (/api/v1/jobs)

POST /jobs – Create job (Employer only)

GET /jobs – Get all jobs

GET /jobs/:id – Get job by ID

PUT /jobs/:id – Update job (Employer/Admin only)

DELETE /jobs/:id – Soft delete job

🔹 Applications (/api/v1/applications)

POST /jobs/:id/apply – Apply for a job

GET /jobs/:id/applications – View applicants (Employer/Admin)

DELETE /applications/:id – Withdraw application

📜 License

This project is licensed under the MIT License.

🔥 Contributions are welcome! Feel free to fork and submit a PR. Happy coding! 🚀

