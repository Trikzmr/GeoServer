# Geo Location Based Attendance Tracking System (User Side)

## 1. Project Summary

This repository implements a location-based attendance tracking system for employees. The user side includes:
- Login and authentication
- Home dashboard with attendance stats and daily check-in/out activity
- Monthly attendance calendar
- Leave request management
- Holiday listing
- Profile management
- Monthly user attendance report

## 2. User Features

### 2.1 Login

Route: `POST /api/login`
- Request: `{ email, password }`
- Response: `200 OK` with `{ message, token, user }` on success
- Token is stored in an HTTP-only cookie and returned in body for client use
- User must have `status: approved` (admin-approved account)

### 2.2 Home Page (Dashboard)

The home page should show:
- User basic details: name, email, role, status, employee ID/name
- Current day attendance status (in/out/absent/present)
- Today's check-in and check-out timestamps
- Attendance activity list for the day
- Quick summary cards:
  - Today Present
  - Today Absent
  - Pending Leave Requests
  - Total check-ins

#### Data sources
- `GET /api/getAttendanceByUsername` (via `AttendanceRoutes` controller `getUserDatas`)
- `GET /api/attendanceByDay` (via `GetDataBYDay`)
- Monthly calendar from general data (`/api/allcalenders` and `/api/monthCalender`)

### 2.3 Monthly Calendar

Routes:
- `GET /api/allcalenders` -> all months calendar stored in `workingCalander` model
- `POST /api/monthCalender` -> single month calendar (body: `{ year, month }`)
- `POST /api/yearWeekend` -> weekends for year

In UI:
- month grid with statuses (workday / weekend / holiday)
- navigation for month/year filter

### 2.4 Attendance Check-in / Check-out

Route: `POST /api/markAttendance`
- Body: `{ userName, date, month, year, latitude, longitude, ... }`
- Geofence-based validation in `AttendanceController.markAttendances`
- Saves status `check-in` or `check-out` automatically

### 2.5 Activity List (Check-in / Check-out)

Route: `POST /api/getAttendanceByUsernameWithDayMonthAndYear` or `/api/getAttendanceByUsername` + query params
- Use this endpoint to show daily activity entries with timestamps
- In UI: scrollable list of attendance events (with location tags)

### 2.6 Leave Page

Leave views:
- all leave requests for the user
- leave request form
- status (Pending, Approved, Rejected)

Routes:
- `POST /api/addLeaveRequest` (create) : `employeeAddLeaveRequest`
- `GET /api/getAllLeaveRequest` (all user leave requests)
- `POST /api/LeaveDataByuserId` (by user ID)
- `POST /api/getLeaveRequestByid` for detail
- `PUT /api/approveLeaveRequest/:id` (admin), `PUT /api/RejectLeaveRequest/:id`
- `DELETE /api/DeleteLeaveRequest/:id`

Form fields for request:
- `userId`, `userName`, `title`, `leaveType`, `startingDate`, `endingDate`, `message`, `number`

### 2.7 Holiday List

Holiday data is derived from the working calendar in `GenralDataController`:
- `GET /api/allcalenders` gives monthly data including special days
- Cross-check `dayCalander[].dayType` to identify holidays

### 2.8 Profile Page

Show user profile fields from `User` model:
- `userName`, `firstName`, `lastName`, `email`, `number`, `dob`, `qualification`, `skills`, `presentAddress`, `permanentAddress`, `role`, `status`
- Option to update user details can be implemented with a new route (not currently in codebase)

### 2.9 Monthly User Report

Routes:
- `GET /api/allMonthlyReport` (all users monthly report)
- `GET /api/monthlyReportThroughUserName/user/:userName`
- `GET /api/findSpecificMonthReportOfUsers/month/:month/year/:year`
- `GET /api/findSpecificMonthReportThrouthUsername/user/:username/month/:month/year/:year`

Data from `monthlyAttendanceReport` collection.

### 2.10 API Reference (Full Guide)

#### Auth
- `POST /api/register`
  - body: `{ userName, firstName, lastName, email, password, number, dob, qualification, skills, presentAddress, permanentAddress }`
  - response: created user object, `status: pending`.

- `POST /api/login`
  - body: `{ email, password }`
  - response: `{ message, token, user }` (user profile + JWT)

- `POST /api/loginAdmin`
  - body: `{ email, password }` (admin user)
  - response: `gotuser` object

- `POST /api/loginManager`
  - body: `{ email, password }` (manager user)
  - response: `gotuser` object

#### Attendance
- `POST /api/markAttendance`
  - body: `{ userName, date, month, year, latitude, longitude }`
  - response success: `{ message, attendance, locationStatus }`

- `GET /api/getAllAttendance`
  - response: all attendance records

- `GET /api/getAllAttendanceByMonth?month=<month>&year=<year>`
  - response: attendance records of requested month

- `GET /api/getAllAttendanceByYear?year=<year>`
  - response: attendance records of requested year

- `POST /api/getAllAttendanceByUsername`
  - body: `{ userName }`
  - response: user's attendance

- `GET /api/getAllAttendanceByMonthAndYear?month=<month>&year=<year>`
  - response: attendance records of month+year

- `POST /api/getAttendanceByUsernameWithMonthAndYear`
  - body: `{ userName, month, year }`
  - response: attendance records

- `POST /api/daymonthYearUsername`
  - body: `{ userName, day, month, year }`
  - response: attendance day record

- `POST /api/attendanceByDay`
  - body: `{ date }`
  - response: all attendance records for that date

#### General Calendar & Holidays
- `GET /api/allcalenders`
  - response: all monthly calendars

- `POST /api/monthCalender`
  - body: `{ year, month }`
  - response: calendar for that month

- `POST /api/yearWeekend`
  - body: `{ year }`
  - response: weekend days by month

#### Leave Requests
- `POST /api/addLeaveRequest`
  - body: `{ userId, userName, title, leaveType, startingDate, endingDate, message, number }`
  - response: created leave request

- `GET /api/getAllLeaveRequest`
  - response: all leave requests

- `POST /api/getLeaveRequestByid`
  - body: `{ id }`
  - response: leave request by ID

- `PUT /api/approveLeaveRequest/:id`
  - body: `{ approvalStatus, adminId }` (manager/admin approve)
  - response: updated request

- `PUT /api/RejectLeaveRequest/:id`
  - body: `{ approvalStatus, adminNote, adminId }`
  - response: updated request

- `DELETE /api/DeleteLeaveRequest/:id`
  - response: deletion message

- `POST /api/LeaveDataByuserId`
  - body: `{ userId }`
  - response: leave requests for that user

#### Monthly Reports
- `GET /api/allMonthlyReport`
  - response: all user monthly reports

- `GET /api/monthlyReportThroughUserName/user/:userName`
  - response: monthly reports for user

- `GET /api/findSpecificMonthReportOfUsers/month/:month/year/:year`
  - response: reports by month+year

- `GET /api/findSpecificMonthReportThrouthUsername/user/:username/month/:month/year/:year`
  - response: specific user report for month/year

## 3. Models (User-Facing)

### 3.1 User
`models/User.js`
- userName: String (required, unique)
- firstName: String (required)
- lastName: String
- email: String (required)
- number: Number (required)
- password: String (required, hashed)
- dob: String (required)
- qualification: [String]
- skills: [String]
- presentAddress: String
- permanentAddress: String
- role: String (`admin`, `employ`, `manager`) default `employ`
- status: String (`pending`, `approved`, `rejected`, `Terminated`) default `pending`
- createdAt: Date default now
- updatedAt: Date default now

### 3.2 Attendance
`models/Attendance.js`
- userName: String (required)
- date: String (required, unique)
- status: [String] (`check-in`, `check-out`) required
- time: [String] required
- locationLogs: [{ latitude: Number (required), longitude: Number (required) }]
- locationName: String
- month: String required
- year: String required

### 3.3 WorkingCalendar
`models/workingCalander.js`
- year: Number required
- month: String required
- dayCalander: [{ date: Date, dayType: Number (0 or 1), title: String }]
- createdAt: Date default now
- updatedAt: Date default now

### 3.4 EmployeeLeaveRequest
`models/employeeLeaveRequest.js`
- userId: String required
- userName: String required
- title: String required
- leaveType: String required
- startingDate: Date required
- endingDate: Date required
- message: String
- number: Number required
- approvalStatus: String default `Pending`
- adminName: String
- adminId: String
- requestedDate: Date default now

### 3.5 MonthlyAttendanceReport
`models/monthlyAttendanceReport.js`
- userName: String required
- month: Number (1-12) required
- year: Number required
- present: [String] default []
- absent: [String] default []
- leaves: [String] default []
- leaveAvailable: Number default 5
- leavesType: [String]
- createdAt: Date default now

## 4. API Reference (Postman Style)

### 4.1 Common base
Base URL: `{{baseUrl}}/api`
Headers:
- `Content-Type: application/json`
- `Authorization: Bearer {{token}}` (if not using cookies)

Cookies:
- `token`: jwt in HTTP-only cookie from login

---

### 4.2 Auth APIs

#### `POST /api/register`

Request body
```
{
  "userName": "jdoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "jdoe@example.com",
  "password": "P@ssw0rd",
  "number": 9999999999,
  "dob": "1990-01-01",
  "qualification": ["B.Tech"],
  "skills": ["JavaScript","Node.js"],
  "presentAddress": "Home",
  "permanentAddress": "Permanent"
}
```

Success response 201
```
{ "_id": "...", "userName": "jdoe", "status": "pending", ... }
```

Errors:
- 400 user exists
- 500 server error

#### `POST /api/login`

Request body
```
{ "email": "jdoe@example.com", "password": "P@ssw0rd" }
```

Success response 200
```
{
  "message": "Login successful",
  "token": "...",
  "user": { "id":"...", "userName":"jdoe", "email":"...", "role":"employ", "status":"approved" }
}
```

Errors:
- 401 invalid password
- 403 user not approved
- 500 server error

#### `POST /api/loginAdmin`, `POST /api/loginManager`
Same contract as `/api/login` but role is validated (`admin` or `manager`).

---

### 4.3 Attendance APIs

#### `POST /api/markAttendance`

Request body
```
{
  "userName": "jdoe",
  "date": "2025-06-10",
  "month": "06",
  "year": "2025",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "locationName": "Office"
}
```

Success response 201
```
{
  "message": "Attendance marked successfully",
  "attendance": { ... },
  "locationStatus": "inside" // or outside
}
```

Errors:
- 400 invalid/missing fields
- 400 duplicate date
- 500 server error

#### `GET /api/getAllAttendance`
- Response 200: `[{ attendanceEntry }, ...]`

#### `GET /api/getAllAttendanceByMonth?month=06&year=2025`
- Response 200: entries for month

#### `GET /api/getAllAttendanceByYear?year=2025`
- Response 200: entries by year

#### `POST /api/getAllAttendanceByUsername`

Request body
```
{ "userName": "jdoe" }
```

Response 200: `[{ ... }, ...]`

#### `GET /api/getAllAttendanceByMonthAndYear?month=06&year=2025`
- Response 200

#### `POST /api/getAttendanceByUsernameWithMonthAndYear`

Request body
```
{ "userName": "jdoe", "month": "06", "year": "2025" }
```

Response 200: filtered entries

#### `POST /api/daymonthYearUsername`

Request body
```
{ "userName": "jdoe", "day": "10", "month": "06", "year": "2025" }
```

Response 200: day-specific entry

#### `POST /api/attendanceByDay`

Request body
```
{ "date": "2025-06-10" }
```

Response 200: attendance entries for date

---

### 4.4 Calendar & Holiday APIs

#### `GET /api/allcalenders`
- Response 201: all calendars

#### `POST /api/monthCalender`

Request body
```
{ "month": "06", "year": "2025" }
```

Response 201: month calendar with entries

#### `POST /api/yearWeekend`

Request body
```
{ "year": "2025" }
```

Response 200: weekends solved from dayType=0

---

### 4.5 Leave APIs

#### `POST /api/addLeaveRequest`

Request body
```
{
  "userId": "...",
  "userName": "jdoe",
  "title": "Sick Leave",
  "leaveType": "Sick",
  "startingDate": "2025-06-20",
  "endingDate": "2025-06-22",
  "message": "Flu symptoms",
  "number": 9999999999
}
```

Response 201: created leave request

#### `GET /api/getAllLeaveRequest`
- Response 200: all leave requests

#### `POST /api/getLeaveRequestByid`

Request body
```
{ "id": "<leaveId>" }
```

Response 200: leave request object

#### `PUT /api/approveLeaveRequest/:id`

Request body
```
{ "approvalStatus": "Approved", "adminId": "..." }
```

Response 200: updated object

#### `PUT /api/RejectLeaveRequest/:id`

Request body
```
{ "approvalStatus": "Rejected", "adminNote": "No backup", "adminId": "..." }
```

Response 200: updated object

#### `DELETE /api/DeleteLeaveRequest/:id`
- Response 200: deletion message

#### `POST /api/LeaveDataByuserId`

Request body
```
{ "userId": "..." }
```

Response 200: leave requests array

---

### 4.6 Monthly Report APIs

#### `GET /api/allMonthlyReport`
- Response 200: all monthly reports

#### `GET /api/monthlyReportThroughUserName/user/:userName`
- Response 200: reports for user

#### `GET /api/findSpecificMonthReportOfUsers/month/:month/year/:year`
- Response 200: specific month/year

#### `GET /api/findSpecificMonthReportThrouthUsername/user/:username/month/:month/year/:year`
- Response 200: user report

## 5. Tech Stack

- Node.js + Express
- MongoDB (Mongoose) ORM
- JWT authentication
- `bcryptjs` password hashing
- REST endpoints under `/api`

## 5. Setup (Developer)

1. Copy `.env.example` to `.env` and set:
   - `MONGO_URI`, `PORT`, `JWT_SECRET` (`aman` in code default)
2. `npm install`
3. `node app.js` or `npm start`
4. Open at `http://localhost:8000` (or set `PORT`)

## 6. UI Implementation Guidance

### Login screen
- Inputs: email, password
- Submit -> `/api/login`
- On success: store JWT token + user info (localStorage/cookies)
- Redirect to `/dashboard`

### Dashboard screen
- call `/api/getAttendanceByUsername` with logged user name
- call `/api/attendanceByDay` using current date
- call `/api/monthCalender` for active month
- show widget cards + timeline

### Leave page
- list: `/api/LeaveDataByuserId` (userId)
- new request: POST `/api/addLeaveRequest`

### Holiday page
- call `/api/allcalenders`; filter dayType=0 or holiday flags

### Profile page
- load user from login response or `GET /api/user/:id` (not currently present)
- allow editing UI (needs new API endpoint)

### Monthly report page
- call `/api/monthlyReportThroughUserName/user/:userName`
- show totals: working days, present, absent, leaves, overtime

## 7. Security and Notes

- JWT token is signed with `aman`; migrate to env var for production.
- Cookie uses `secure: true` and `sameSite: none`; requires HTTPS in browser.
- API use bearer auth if frontend does not use cookies.

## 8. Future Enhancements

- Add explicit `GET /api/user/profile` and `PUT /api/user/profile`
- Build a `GET /api/holidayList` for clean holiday endpoint
- Add role-based access guard middleware for user vs manager vs admin
- Add real-time attendance notifications while tracking location
- Add international date & timezone handling for check-in/out

---

> This user-side README is a fully detailed design/usage guide for the existing project features requested:
> login, home dashboard, user details, monthly calendar, today's attendance, activity list, leave page, holiday list, profile, and monthly report.
