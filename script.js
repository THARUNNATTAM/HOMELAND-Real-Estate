
// ===================================
// 1. CHECK LOGIN SESSION
// ===================================

const currentUser = JSON.parse(
    localStorage.getItem("homelandCurrentUser")
);

// Update homepage login buttons
if (currentUser) {

    const navActions = document.querySelector(".nav-actions");

    if (navActions) {

        navActions.innerHTML = `
            <a href="${currentUser.role === "admin" ? "admin-dashboard.html" : "user-dashboard.html"}"
               class="btn btn-outline">
                Dashboard
            </a>

            <button id="homeLogoutBtn" class="btn btn-primary">
                Logout
            </button>
        `;

        document.getElementById("homeLogoutBtn")
            .addEventListener("click", function() {

                localStorage.removeItem("homelandCurrentUser");
                window.location.reload();

            });
    }
}


// ===================================
// 2. SAMPLE PROPERTY DATA
// ===================================

const sampleProperties = [

    {
        id: 101,
        name: "Luxury Family Villa",
        location: "Hyderabad",
        price: 8500000,
        type: "Villa",
        purpose: "Buy",
        bedrooms: 3,
        bathrooms: 3,
        area: 2400,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700"
    },

    {
        id: 102,
        name: "Modern City Apartment",
        location: "Vijayawada",
        price: 4500000,
        type: "Apartment",
        purpose: "Buy",
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700"
    },

    {
        id: 103,
        name: "Premium Rental House",
        location: "Nellore",
        price: 18000,
        type: "House",
        purpose: "Rent",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700"
    }

];


// ===================================
// 3. SAVE DATA IN LOCAL STORAGE
// ===================================

if (localStorage.getItem("properties") === null) {

    localStorage.setItem(
        "properties",
        JSON.stringify(sampleProperties)
    );

}


// ===================================
// 4. GET PROPERTY DATA
// ===================================

function getProperties() {

    return JSON.parse(
        localStorage.getItem("properties")
    ) || [];

}


// ===================================
// 5. DISPLAY PROPERTY CARDS
// ===================================

function displayProperties(properties) {

    const propertyGrid = document.getElementById("propertyGrid");

    if (!propertyGrid) return;

    propertyGrid.innerHTML = "";

    if (properties.length === 0) {

        propertyGrid.innerHTML =
            "<p>No properties found. Try another search.</p>";

        return;

    }

    properties.forEach(property => {

        const card = document.createElement("div");

        card.className = "property-card";

        card.innerHTML = `

            <img
                src="${property.image || "https://placehold.co/700x400?text=No+Image"}"
                alt="${property.name}"
            >

            <div class="property-info">

                <span class="property-type">
                    ${property.type} · ${property.purpose}
                </span>

                <h3>${property.name}</h3>

                <p class="property-location">
                    📍 ${property.location}
                </p>

                <div class="property-price">

                    ₹${Number(property.price).toLocaleString("en-IN")}

                    ${property.purpose === "Rent" ? "/month" : ""}

                </div>

                <div class="property-meta">

                    <span>🛏 ${property.bedrooms || "N/A"} Beds</span>

                    <span>🚿 ${property.bathrooms || "N/A"} Baths</span>

                    <span>${property.area || "N/A"} sq.ft</span>

                </div>

                <button
                    class="details-btn"
                    type="button"
                    data-id="${property.id}"
                >
                    View Details
                </button>

            </div>

        `;

        propertyGrid.appendChild(card);

    });

}


// ===================================
// 6. SEARCH AND FILTER
// ===================================

const searchForm = document.getElementById("searchForm");

if (searchForm) {

    searchForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const location = document
            .getElementById("location")
            .value.trim().toLowerCase();

        const purpose =
            document.getElementById("purpose").value;

        const type =
            document.getElementById("propertyType").value;

        const filteredProperties = getProperties().filter(property => {

            const matchesLocation =
                (property.location || "")
                    .toLowerCase()
                    .includes(location);

            const matchesPurpose =
                purpose === "" || property.purpose === purpose;

            const matchesType =
                type === "" || property.type === type;

            return matchesLocation && matchesPurpose && matchesType;

        });

        displayProperties(filteredProperties);

        const resultMessage =
            document.getElementById("resultMessage");

        if (resultMessage) {

            resultMessage.textContent =
                `${filteredProperties.length} properties found`;

        }

    });

}


// ===================================
// 7. PROPERTY DETAILS PAGE CONNECTION
// ===================================

const propertyGrid = document.getElementById("propertyGrid");

if (propertyGrid) {

    propertyGrid.addEventListener("click", function(event) {

        const detailsButton =
            event.target.closest(".details-btn");

        if (detailsButton) {

            const id = detailsButton.dataset.id;

            // Open selected property's details page
            window.location.href =
                "property-details.html?id=" +
                encodeURIComponent(id);

        }

    });

}


// ===================================
// 8. MOBILE NAVIGATION
// ===================================

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function() {

        navLinks.classList.toggle("active");

    });

}


// ===================================
// 9. CURRENT YEAR
// ===================================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// ===================================
// 10. INITIALIZE WEBSITE
// ===================================

displayProperties(getProperties());
