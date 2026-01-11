let courseLessons = [];
let studentUsers = [];

// Navigation Controls
function toggleAdminMenu() {
    const menu = document.getElementById('adminMenu');
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function openLogin() { 
    document.getElementById('adminModal').style.display = 'block'; 
    document.getElementById('adminMenu').style.display = 'none';
}

function closeAdmin() { document.getElementById('adminModal').style.display = 'none'; }
function openStudentPortal() { document.getElementById('studentLoginPortal').style.display = 'block'; }
function closeStudentPortal() { document.getElementById('studentLoginPortal').style.display = 'none'; }
function closeClassTab() { document.getElementById('studentClassTab').style.display = 'none'; }

// Admin Logic
function checkLogin() {
    if(document.getElementById('adminUser').value === "admin" && 
       document.getElementById('adminPass').value === "skillbee2026") {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('managementTab').style.display = 'block';
        updateAdminTables();
    } else { alert("Login Failed"); }
}

function addCourseClass() {
    const course = document.getElementById('contentCourse').value;
    const topic = document.getElementById('classTopic').value;
    const link = document.getElementById('youtubeLink').value;
    if(topic && link) {
        courseLessons.push({ id: Date.now(), course, topic, link });
        updateAdminTables();
        alert("Class Added Successfully!");
    }
}

function addStudentAccess() {
    const user = document.getElementById('stdUser').value;
    const pass = document.getElementById('stdPass').value;
    const course = document.getElementById('stdCourse').value;
    if(user && pass) {
        studentUsers.push({ id: Date.now(), user, pass, course });
        updateAdminTables();
        alert("Student Account Created!");
    }
}

function updateAdminTables() {
    const vBody = document.getElementById('videoTableBody');
    vBody.innerHTML = courseLessons.map(l => `
        <tr><td>${l.course}</td><td>${l.topic}</td>
        <td><button class="btn-del-mini" onclick="deleteLesson(${l.id})">Del</button></td></tr>
    `).join('');

    const sBody = document.getElementById('studentTableBody');
    sBody.innerHTML = studentUsers.map(s => `
        <tr><td>${s.user}</td><td>${s.course}</td>
        <td><button class="btn-del-mini" onclick="deleteStudent(${s.id})">Del</button></td></tr>
    `).join('');
}

function deleteLesson(id) { courseLessons = courseLessons.filter(l => l.id !== id); updateAdminTables(); }
function deleteStudent(id) { studentUsers = studentUsers.filter(s => s.id !== id); updateAdminTables(); }

// Student Portal Logic
function verifyStudentLogin() {
    const u = document.getElementById('studentUser').value;
    const p = document.getElementById('studentPass').value;
    const student = studentUsers.find(s => s.user === u && s.pass === p);

    if(student) {
        const filtered = courseLessons.filter(l => l.course === student.course);
        document.getElementById('courseWelcomeTitle').innerText = student.course + " - " + student.user;
        const listDiv = document.getElementById('videoStepList');
        listDiv.innerHTML = filtered.length > 0 ? filtered.map(l => `
            <div class="video-step-item">
                <h4>${l.topic}</h4>
                <iframe width="100%" height="300" src="${l.link}" frameborder="0" allowfullscreen></iframe>
            </div>
        `).join('') : "<p>No classes uploaded for this course yet.</p>";
        
        closeStudentPortal();
        document.getElementById('studentClassTab').style.display = 'block';
    } else { alert("Access Denied: Invalid Username or Password"); }
}

function buyCourse(courseName) {
    const phoneNumber = "917907287563"; 
    const message = `Hi SkillBee, I want to enroll in ${courseName}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}