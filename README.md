## Steps to create the attendance app


### Core features
- This would be a Next.JS Web app
- Authentication would be powered by OAuth.
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

- NextJS Web App
- OAuth Login
- Admin Page needed
    - Dashboard Page
    - Dropdown to select the year (1st, 2nd, 3rd, 4th)
    - Dashboard page for each year student stats
- Student Page needed

