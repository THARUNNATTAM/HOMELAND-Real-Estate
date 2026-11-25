
// ======================================
// HOMELAND - USER DASHBOARD
// ======================================

const currentUser = JSON.parse(
    localStorage.getItem("homelandCurrentUser")
);

if (!currentUser || currentUser.role !== "user") {
    window.location.href = "login.html";
} else {
    document.getElementById("userName").textContent =
        currentUser.fullName;

    document.getElementById("userEmail").textContent =
        currentUser.email;

    displayMyProperties();
}

// ======================================
// DISPLAY USER PROPERTIES
// ======================================

function displayMyProperties() {

    const allProperties = JSON.parse(
        localStorage.getItem("properties")
    ) || [];

    const myProperties = allProperties.filter(property =>
        property.ownerEmail === currentUser.email
    );

    const container = document.getElementById("myProperties");

    document.getElementById("totalProperties").textContent =
        myProperties.length;

    document.getElementById("activeProperties").textContent =
        myProperties.filter(property =>
            property.status === "Available"
        ).length;

    document.getElementById("pendingProperties").textContent =
        myProperties.filter(property =>
            property.status === "Pending"
        ).length;

    container.innerHTML = "";

    if (myProperties.length === 0) {
        container.textContent = "You haven't added any properties yet.";
        return;
    }

    myProperties.forEach(property => {

        const card = document.createElement("div");
        card.className = "my-property-card";

        const heading = document.createElement("h3");
        heading.textContent = property.name;

        const location = document.createElement("p");
        location.textContent = "Location: " + property.location;

        const price = document.createElement("p");
        price.textContent =
            "Price: ₹" + Number(property.price).toLocaleString("en-IN");

        const details = document.createElement("p");
        details.textContent =
            property.type + " | " + property.purpose;

        const status = document.createElement("p");
        status.textContent = "Status: " + property.status;

        // EDIT BUTTON
        const editButton = document.createElement("button");
        editButton.textContent = "Edit Property";
        editButton.className = "edit-btn";

        editButton.addEventListener("click", function() {
            editProperty(property.id);
        });

        // DELETE BUTTON
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Property";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteProperty(property.id);
        });

        card.append(
            heading,
            location,
            price,
            details,
            status,
            editButton,
            deleteButton
        );

        container.appendChild(card);
    });
}

// ======================================
// EDIT PROPERTY
// ======================================

function editProperty(propertyId) {

    const properties = JSON.parse(
        localStorage.getItem("properties")
    ) || [];

    const property = properties.find(item =>
        item.id === propertyId &&
        item.ownerEmail === currentUser.email
    );

    if (!property) {
        alert("Property not found!");
        return;
    }

    const newName = prompt("Enter property name:", property.name);

    if (newName === null) return;

    const newLocation = prompt("Enter location:", property.location);

    if (newLocation === null) return;

    const newPrice = prompt("Enter price:", property.price);

    if (newPrice === null) return;

    if (
        newName.trim() === "" ||
        newLocation.trim() === "" ||
        !Number.isFinite(Number(newPrice)) ||
        Number(newPrice) <= 0
    ) {
        alert("Please enter valid property details.");
        return;
    }

    property.name = newName.trim();
    property.location = newLocation.trim();
    property.price = Number(newPrice);

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

    alert("Property updated successfully!");

    displayMyProperties();
}

// ======================================
// DELETE PROPERTY
// ======================================

function deleteProperty(propertyId) {

    const confirmation = confirm(
        "Are you sure you want to delete this property?"
    );

    if (!confirmation) return;

    let properties = JSON.parse(
        localStorage.getItem("properties")
    ) || [];

    properties = properties.filter(property =>
        !(
            property.id === propertyId &&
            property.ownerEmail === currentUser.email
        )
    );

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

    alert("Property deleted successfully!");

    displayMyProperties();
}

// ======================================
// LOGOUT
// ======================================

document.getElementById("logoutBtn").addEventListener("click", function() {

    localStorage.removeItem("homelandCurrentUser");

    window.location.href = "login.html";

});
