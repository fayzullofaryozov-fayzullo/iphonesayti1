
const iphoneImage =
"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900";

const iphoneImage2 =
"https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=900";

const phones = [
    { name: "iPhone 13", price: 499, image: iphoneImage },
    { name: "iPhone 13 Pro", price: 599, image: iphoneImage2 },
    { name: "iPhone 14", price: 599, image: iphoneImage },
    { name: "iPhone 14 Pro", price: 699, image: iphoneImage2 },
    { name: "iPhone 15", price: 699, image: iphoneImage },
    { name: "iPhone 15 Pro Max", price: 899, image: iphoneImage2 },
    { name: "iPhone 16", price: 799, image: iphoneImage },
    { name: "iPhone 16 Pro", price: 999, image: iphoneImage2 },
    { name: "iPhone 17 Pro", price: 1099, image: iphoneImage },
    { name: "iPhone 17 Pro Max", price: 1199, image: iphoneImage2 }
];

// NAVBAR
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

// CAROUSEL
const track = document.getElementById("carouselTrack");

phones.forEach(phone => {
    track.innerHTML += `
        <div class="carousel-item">
            <img src="${phone.image}" alt="${phone.name}">
            <h3>${phone.name}</h3>
            <p>$${phone.price}</p>
        </div>
    `;
});

let position = 0;

function visiblePhones() {
    if (window.innerWidth <= 550) return 1;
    if (window.innerWidth <= 850) return 2;
    return 3;
}

function moveCarousel() {
    const item = track.querySelector(".carousel-item");

    if (!item) return;

    const step = item.offsetWidth + 20;

    track.style.transform =
        `translateX(-${position * step}px)`;
}

function nextPhone() {
    const max = phones.length - visiblePhones();

    position = position >= max ? 0 : position + 1;
    moveCarousel();
}

function previousPhone() {
    const max = phones.length - visiblePhones();

    position = position <= 0 ? max : position - 1;
    moveCarousel();
}

document.getElementById("next")
.addEventListener("click", nextPhone);

document.getElementById("prev")
.addEventListener("click", previousPhone);

// AUTO CAROUSEL
setInterval(nextPhone, 3000);

window.addEventListener("resize", () => {
    position = 0;
    moveCarousel();
});

// PHONE MODELS
const modelGrid = document.getElementById("modelGrid");

phones.forEach((phone, index) => {
    modelGrid.innerHTML += `
        <div class="model-card">
            <img src="${phone.image}" alt="${phone.name}">

            <h3>${phone.name}</h3>

            <p>From $${phone.price}</p>

            <button onclick="selectPhone(${index})">
                Choose iPhone
            </button>
        </div>
    `;
});

// CONFIGURATOR
let selectedPhone = phones[9];
let selectedColor = "Black";

function selectPhone(index) {
    selectedPhone = phones[index];

    document.getElementById("selectedName")
    .textContent = selectedPhone.name;

    document.getElementById("selectedImage").src =
        selectedPhone.image;

    document.getElementById("heroImage").src =
        selectedPhone.image;

    document.getElementById("storage").value = "0";

    updatePrice();

    document.getElementById("configurator")
    .scrollIntoView({ behavior: "smooth" });
}

// COLOR SELECTION
const colorFilters = {
    Black: "none",
    White: "grayscale(1) brightness(1.7)",
    Blue: "hue-rotate(190deg)",
    Gold: "sepia(.7) saturate(1.5)",
    Purple: "hue-rotate(250deg)"
};

document.querySelectorAll(".color").forEach(button => {

    button.addEventListener("click", () => {

        selectedColor = button.dataset.color;

        document.getElementById("colorName")
        .textContent = selectedColor;

        document.querySelectorAll(".color")
        .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        document.getElementById("selectedImage")
        .style.filter = colorFilters[selectedColor];
    });
});

// STORAGE AND PRICE
const storage = document.getElementById("storage");

function updatePrice() {
    const extra = Number(storage.value);
    const total = selectedPhone.price + extra;

    document.getElementById("selectedPrice")
    .textContent = "$" + total.toLocaleString("en-US");
}

storage.addEventListener("change", updatePrice);

// BUY BUTTON
document.getElementById("buyBtn")
.addEventListener("click", () => {

    const storageName =
        storage.options[storage.selectedIndex].text;

    const total =
        selectedPhone.price + Number(storage.value);

    alert(
        "Your iPhone selection:\n\n" +
        "Model: " + selectedPhone.name + "\n" +
        "Color: " + selectedColor + "\n" +
        "Storage: " + storageName + "\n" +
        "Price: $" + total.toLocaleString("en-US") +
        "\n\nThank you for choosing iPhone!"
    );
});

// INITIALIZATION
window.addEventListener("load", () => {
    updatePrice();
    moveCarousel();
});

