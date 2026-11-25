
// ======================================
// HOMELAND - ADMIN DASHBOARD
// ======================================

// Check logged-in account
const currentUser = JSON.parse(
    localStorage.getItem("homelandCurrentUser")
);

// Only admins can access this page
if (!currentUser || currentUser.role !== "admin") {

    window.location.href = "login.html";

} else {

    document.getElementById("adminName").textContent =
        currentUser.fullName || currentUser.name || "Admin";

    loadAdminDashboard();
}


// ======================================
// LOAD ADMIN DASHBOARD
// ======================================

function loadAdminDashboard() {

    const users = JSON.parse(
        localStorage.getItem("homelandUsers")
    ) || [];

    const properties = JSON.parse(
        localStorage.getItem("properties")
    ) || [];

    const normalUsers = users.filter(
        user => user.role === "user"
    );

    const admins = users.filter(
        user => user.role === "admin"
    );

    // Display statistics
    document.getElementById("totalUsers").textContent =
        normalUsers.length;

    document.getElementById("totalProperties").textContent =
        properties.length;

    document.getElementById("totalAdmins").textContent =
        admins.length;


    // ==================================
    // DISPLAY REGISTERED USERS
    // ==================================

    const usersTable = document.getElementById("usersTable");

    usersTable.innerHTML = "";

    if (users.length === 0) {

        usersTable.innerHTML =
            '<tr><td colspan="4">No users registered.</td></tr>';

    } else {

        users.forEach(user => {

            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            const emailCell = document.createElement("td");
            const phoneCell = document.createElement("td");
            const roleCell = document.createElement("td");

            nameCell.textContent = user.fullName || user.name || "N/A";
            emailCell.textContent = user.email || "N/A";
            phoneCell.textContent = user.phone || "N/A";
            roleCell.textContent = user.role || "N/A";

            row.append(
                nameCell,
                emailCell,
                phoneCell,
                roleCell
            );

            usersTable.appendChild(row);

        });

    }

    // Display all properties
    displayAdminProperties();

}


// ======================================
// DISPLAY ALL PROPERTIES
// ======================================

function displayAdminProperties() {

    const adminProperties =
        document.getElementById("adminProperties");

    if (!adminProperties) return;

    const properties = JSON.parse(
        localStorage.getItem("properties")
    ) || [];

    adminProperties.innerHTML = "";

    if (properties.length === 0) {

        adminProperties.textContent =
            "No properties available.";

        return;

    }

    properties.forEach(property => {

        const card = document.createElement("div");

        card.className = "my-property-card";

        const heading = document.createElement("h3");
        heading.textContent = property.name || "Untitled Property";

        const location = document.createElement("p");
        location.textContent =
            "Location: " + (property.location || "N/A");

        const price = document.createElement("p");
        price.textContent =
            "Price: ₹" +
            Number(property.price || 0).toLocaleString("en-IN");

        const owner = document.createElement("p");
        owner.textContent =
            "Owner: " + (property.ownerName || "Admin / Sample");

        const status = document.createElement("p");
        status.textContent =
            "Status: " + (property.status || "Available");

        const approveButton = document.createElement("button");
        approveButton.className = "edit-btn";
        approveButton.textContent = "Approve";

        approveButton.addEventListener("click", function() {
            updatePropertyStatus(property.id, "Available");
        });

        const rejectButton = document.createElement("button");
        rejectButton.className = "delete-btn";
        rejectButton.textContent = "Reject";

        rejectButton.addEventListener("click", function() {
            updatePropertyStatus(property.id, "Rejected");
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteAdminProperty(property.id);
        });

        card.append(
            heading,
            location,
            price,
            owner,
            status,
            approveButton,
            rejectButton,
            deleteButton
        );

        adminProperties.appendChild(card);

    });

}


// ======================================
// APPROVE OR REJECT PROPERTY
// ======================================

function updatePropertyStatus(propertyId, newStatus) {

    const properties = JSON.parse(
        localStorage.getItem("properties")
    ) || [];

    const property = properties.find(
        item => String(item.id) === String(propertyId)
    );

    if (!property) return;

    property.status = newStatus;

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

    alert("Property status updated to " + newStatus);

    loadAdminDashboard();

}


// ======================================
// DELETE PROPERTY
// ======================================

function deleteAdminProperty(propertyId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    let properties = JSON.parse(
        localStorage.getItem("properties")
    ) || [];

    properties = properties.filter(
        property => String(property.id) !== String(propertyId)
    );

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

    alert("Property deleted successfully!");

    loadAdminDashboard();

}


// ======================================
// ADMIN LOGOUT
// ======================================

document.getElementById("logoutBtn").addEventListener(
    "click",
    function() {

        localStorage.removeItem("homelandCurrentUser");

        window.location.href = "login.html";

    }
);
