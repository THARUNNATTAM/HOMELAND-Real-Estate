
// ======================================
// HOMELAND - AUTHENTICATION SYSTEM
// ======================================

// ADMIN ACCOUNT DETAILS
const adminName = "Nattam Tharun";
const adminEmail = "tharun@sigma.com";
const adminPassword = "tharunmouli69";
const oldAdminEmail = "admin@homeland.com";

// ======================================
// GET AND SAVE USERS
// ======================================

function getUsers() {
    return JSON.parse(localStorage.getItem("homelandUsers")) || [];
}

function saveUsers(users) {
    localStorage.setItem("homelandUsers", JSON.stringify(users));
}

// ======================================
// CREATE / UPDATE MAIN ADMIN
// ======================================

let users = getUsers();

const adminIndex = users.findIndex(user =>
    user.email === oldAdminEmail ||
    user.email === adminEmail ||
    (user.role === "admin" && user.fullName === "HOMELAND Admin")
);

if (adminIndex !== -1) {

    users[adminIndex].fullName = adminName;
    users[adminIndex].email = adminEmail;
    users[adminIndex].password = adminPassword;
    users[adminIndex].role = "admin";

} else {

    users.push({
        fullName: adminName,
        email: adminEmail,
        phone: "9999999999",
        password: adminPassword,
        role: "admin"
    });

}

saveUsers(users);

// ======================================
// REDIRECT ALREADY LOGGED-IN USERS
// ======================================

const existingSession = JSON.parse(
    localStorage.getItem("homelandCurrentUser")
);

if (existingSession && window.location.pathname.endsWith("login.html")) {

    window.location.href =
        existingSession.role === "admin"
        ? "admin-dashboard.html"
        : "user-dashboard.html";
}

// ======================================
// USER REGISTRATION
// ======================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match!";
            return;
        }

        const users = getUsers();

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            message.textContent = "This email is already registered!";
            return;
        }

        const newUser = {
            fullName: fullName,
            email: email,
            phone: phone,
            password: password,
            role: "user"
        };

        users.push(newUser);

        saveUsers(users);

        message.style.color = "green";
        message.textContent =
            "Registration successful! Redirecting to login...";

        registerForm.reset();

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1500);

    });
}

// ======================================
// USER AND ADMIN LOGIN
// ======================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");

        const users = getUsers();

        const loggedInUser = users.find(user =>
            user.email === email && user.password === password
        );

        if (!loggedInUser) {
            message.style.color = "red";
            message.textContent = "Invalid email or password!";
            return;
        }

        const sessionUser = {
            fullName: loggedInUser.fullName,
            email: loggedInUser.email,
            role: loggedInUser.role
        };

        localStorage.setItem(
            "homelandCurrentUser",
            JSON.stringify(sessionUser)
        );

        message.style.color = "green";
        message.textContent = "Login successful!";

        if (loggedInUser.role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else {
            window.location.href = "user-dashboard.html";
        }

    });
}
