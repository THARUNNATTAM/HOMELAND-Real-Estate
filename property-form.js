
// Check current login session
const currentUser = JSON.parse(
    localStorage.getItem("homelandCurrentUser")
);

// Only logged-in users can add properties
if (!currentUser || currentUser.role !== "user") {
    window.location.href = "login.html";
}

// Get property form
const propertyForm = document.getElementById("propertyForm");

propertyForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const properties = JSON.parse(
        localStorage.getItem("properties")
    ) || [];

    // Collect property information
    const newProperty = {
        id: Date.now(),

        name: document.getElementById("propertyName").value.trim(),

        location: document.getElementById("location").value.trim(),

        price: Number(document.getElementById("price").value),

        type: document.getElementById("type").value,

        purpose: document.getElementById("purpose").value,

        bedrooms: Number(document.getElementById("bedrooms").value),

        bathrooms: Number(document.getElementById("bathrooms").value),

        area: Number(document.getElementById("area").value),

        image: document.getElementById("image").value.trim(),

        ownerName: currentUser.fullName,

        ownerEmail: currentUser.email,

        status: "Available"
    };

    // Save property
    properties.push(newProperty);

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

    const message = document.getElementById("propertyMessage");

    message.style.color = "green";
    message.textContent = "Property added successfully!";

    propertyForm.reset();

});
