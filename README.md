## Steps to create the attendance app

### how the app flow should look like

- user opens the web app
- should be an pwa with mobile first design
- sees two options on the home page Register and Login
- Register form has 4 fields name, department, email, password, confirm password, role dropdown teacher or student
- once registration is done the user gets redirected to the dashboard page
- discuss the dashboard design here for teachers and for students
- students have a button on the top right to mark attendance
    - when student clicks it opens the camera to scan qr
    - when scanning done a pop up comes of attendance successful
- teachers have a button on the top right to take attendance
    - when clicked by teacher a form pops up to enter class name, semester and course type (dropdown of [Major, Minor, AEC, SEC, MDC, CVA])
    - when teacher submits the form a class attendance session is created in postgres which has sessionId, teacherId, className, semester, courseType, startedAt: new Date(), isActive: true
    - then a qr code is generated that contains sessionId and teacherId
    - then once the attendance is complete the teacher should click attendance complete button and the session ends

### Core features
- This would be react + vite for frontend in the frontend folder and a node.js backend in the backend folder
- Authentication would be manual email or phone and password and email or phone verification while registering only 
- Has two main routes user and admin
- students are users, teachers are admin
- When the student logs in he should see a screen with a button to mark his attendance
- When he clicks the button a camera should open
- He would scan the QR code, Confirm button pops up, User presses it, and that would mark his attendance
- Then a new QR code gets generated for the other student to scan and mark his attendance
- The QR Code generation process can be started by admins only
- When a Admin logs in he should see a Button to take attendance that would start the QR code generation process

### Features I want: 

- QR code based attendance
- should i make the main qr code appear on each person's phone or only on teachers phone and people one by one scans it
- decided the qr should appear on only teachers phone and would generate a new code everytime someone scans the qr and marks attendance
- the qr code needs to change once someone marks their attendance

### More clearly

- backend and frontend separate files
- manual login using bcrypt jsonwebtoken
- Admin Page needed
    - Dashboard Page
    - Dropdown to select the year (1st, 2nd, 3rd, 4th)
    - Dashboard page for each year student stats
- Student Page needed

### Backend APIs I need to write

- Authentication is sure I am writing
    - register
    - login

