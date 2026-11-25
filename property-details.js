
// ======================================
// HOMELAND - PROPERTY DETAILS
// ======================================

// Get property ID from URL
const urlParameters = new URLSearchParams(
    window.location.search
);

const propertyId = urlParameters.get("id");

// Get all properties
const properties = JSON.parse(
    localStorage.getItem("properties")
) || [];

// Find selected property
const property = properties.find(item =>
    String(item.id) === String(propertyId)
);

// Display property information
const container = document.getElementById("propertyDetails");

if (!property) {

    const message = document.createElement("div");
    message.className = "not-found";

    const heading = document.createElement("h2");
    heading.textContent = "Property Not Found";

    const paragraph = document.createElement("p");
    paragraph.textContent = "This property may have been removed.";

    message.append(heading, paragraph);
    container.replaceChildren(message);

} else {

    const image = document.createElement("img");
    image.className = "details-image";
    image.src = property.image;
    image.alt = property.name;
    image.onerror = function() {
        this.style.display = "none";
    };

    const content = document.createElement("div");
    content.className = "details-content";

    const name = document.createElement("h1");
    name.textContent = property.name;

    const location = document.createElement("p");
    location.textContent = "Location: " + property.location;

    const price = document.createElement("p");
    price.className = "details-price";
    price.textContent =
        "₹" + Number(property.price).toLocaleString("en-IN");

    const grid = document.createElement("div");
    grid.className = "details-grid";

    const details = [
        ["Property Type", property.type || "Not specified"],
        ["Purpose", property.purpose || "Not specified"],
        ["Bedrooms", property.bedrooms ?? "Not specified"],
        ["Bathrooms", property.bathrooms ?? "Not specified"],
        ["Area", property.area ? property.area + " sq.ft." : "Not specified"],
        ["Status", property.status || "Available"]
    ];

    details.forEach(item => {

        const detailItem = document.createElement("div");
        detailItem.className = "detail-item";

        const label = document.createElement("p");
        label.textContent = item[0];

        const value = document.createElement("h3");
        value.textContent = item[1];

        detailItem.append(label, value);
        grid.appendChild(detailItem);

    });

    const owner = document.createElement("p");
    owner.textContent =
        "Listed by: " + (property.ownerName || "HOMELAND");

    content.append(name, location, price, grid, owner);

    container.replaceChildren(image, content);
}
