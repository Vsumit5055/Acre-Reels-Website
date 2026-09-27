const WHATSAPP_NUMBER = "917709415350";

const properties = [
  {
    id: 1, title: "Skyline Heights", location: "Vasai West", area: 1120, beds: 2,
    price: 68, priceLabel: "₹68 Lakh", type: "Apartment", status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85",
    description: "A spacious 2 BHK apartment in a well-connected Vasai West location. Ideal for families looking for comfort, convenience and everyday connectivity."
  },
  {
    id: 2, title: "Green Valley Homes", location: "Virar West", area: 1350, beds: 3,
    price: 82, priceLabel: "₹82 Lakh", type: "Apartment", status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
    description: "A modern 3 BHK home with generous living space and contemporary finishes, located in Virar West."
  },
  {
    id: 3, title: "Palm Grove Villa", location: "Naigaon", area: 2100, beds: 3,
    price: 98, priceLabel: "₹98 Lakh", type: "Villa", status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85",
    description: "A peaceful 3 BHK villa offering more privacy and space. Suitable for buyers seeking a larger home away from the city rush."
  },
  {
    id: 4, title: "Aster Residency", location: "Nalasopara West", area: 890, beds: 2,
    price: 49, priceLabel: "₹49 Lakh", type: "Apartment", status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    description: "A value-focused 2 BHK apartment with essential amenities and easy access to local transport and daily conveniences."
  },
  {
    id: 5, title: "Sunrise Enclave", location: "Vasai East", area: 760, beds: 1,
    price: 42, priceLabel: "₹42 Lakh", type: "Apartment", status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    description: "A practical 1 BHK apartment for first-time buyers and investors, with convenient access to major local roads."
  },
  {
    id: 6, title: "Orchid Grand", location: "Virar East", area: 1180, beds: 2,
    price: 59, priceLabel: "₹59 Lakh", type: "Apartment", status: "New Launch",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
    description: "A newly launched 2 BHK development with a modern layout and a convenient Virar East location."
  },
  {
    id: 7, title: "Meadow View Plot", location: "Vasai", area: 1500, beds: 0,
    price: 45, priceLabel: "₹45 Lakh", type: "Plot", status: "Available",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",
    description: "A residential plot option for buyers who want to plan and build a home according to their own requirements."
  },
  {
    id: 8, title: "Lakeview Residency", location: "Nalasopara", area: 1020, beds: 2,
    price: 55, priceLabel: "₹55 Lakh", type: "Apartment", status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    description: "A comfortable 2 BHK apartment option with a practical layout and access to nearby shops, schools and transport."
  },
  {
    id: 9, title: "Royal Palm House", location: "Virar", area: 2450, beds: 4,
    price: 125, priceLabel: "₹1.25 Crore", type: "Villa", status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1000&q=85",
    description: "A large 4 BHK villa for families seeking additional bedrooms, living space and a private residential setting."
  },
  {
    id: 10, title: "Cedar Court", location: "Vasai West", area: 1280, beds: 3,
    price: 76, priceLabel: "₹76 Lakh", type: "Apartment", status: "New Launch",
    image: "https://images.unsplash.com/photo-1600566753051-7f64b1f0d0f8?auto=format&fit=crop&w=1000&q=85",
    description: "A stylish 3 BHK apartment designed for modern family living, with a sought-after Vasai West address."
  }
];

const grid = document.getElementById("propertyGrid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const budgetFilter = document.getElementById("budgetFilter");

function formatBeds(beds) {
  return beds ? `${beds} BHK` : "Residential Plot";
}

function renderProperties(list = properties) {
  grid.innerHTML = list.map(p => `
    <article class="property-card">
      <div class="property-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="tag">${p.type}</span>
      </div>
      <div class="property-body">
        <h3>${p.title}</h3>
        <p class="location">📍 ${p.location}</p>
        <div class="property-meta">
          <span>⌂ ${formatBeds(p.beds)}</span>
          <span>▦ ${p.area.toLocaleString()} sq.ft.</span>
        </div>
        <div class="price-row">
          <strong class="price">${p.priceLabel}</strong>
          <button class="view-btn" data-id="${p.id}">View Details →</button>
        </div>
      </div>
    </article>
  `).join("");

  resultCount.textContent = `${list.length} ${list.length === 1 ? "property" : "properties"} found`;
  emptyState.classList.toggle("hidden", list.length !== 0);
  grid.classList.toggle("hidden", list.length === 0);

  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => openModal(Number(btn.dataset.id)));
  });
}

function applyFilters() {
  const loc = locationFilter.value;
  const type = typeFilter.value;
  const budget = budgetFilter.value;

  const filtered = properties.filter(p => {
    const locationMatch = loc === "all" || p.location.includes(loc);
    const typeMatch = type === "all" || p.type === type;
    const budgetMatch = budget === "all" || p.price <= Number(budget);
    return locationMatch && typeMatch && budgetMatch;
  });

  renderProperties(filtered);
}

const modal = document.getElementById("propertyModal");
const modalImage = document.getElementById("modalImage");
const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalPrice = document.getElementById("modalPrice");
const modalArea = document.getElementById("modalArea");
const modalBeds = document.getElementById("modalBeds");
const modalStatus = document.getElementById("modalStatus");
const modalDescription = document.getElementById("modalDescription");
const modalWhatsapp = document.getElementById("modalWhatsapp");

function openModal(id) {
  const p = properties.find(item => item.id === id);
  if (!p) return;

  modalImage.src = p.image;
  modalImage.alt = p.title;
  modalType.textContent = p.type;
  modalTitle.textContent = p.title;
  modalLocation.textContent = `📍 ${p.location}`;
  modalPrice.textContent = p.priceLabel;
  modalArea.textContent = `${p.area.toLocaleString()} sq.ft.`;
  modalBeds.textContent = formatBeds(p.beds);
  modalStatus.textContent = p.status;
  modalDescription.textContent = p.description;

  const message = `Hi Acre Reels, I'm interested in ${p.title}.
Location: ${p.location}
Price: ${p.priceLabel}
Area: ${p.area.toLocaleString()} sq.ft.
Please share more details and site visit availability.`;

  modalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("searchBtn").addEventListener("click", applyFilters);
document.getElementById("resetBtn").addEventListener("click", () => {
  locationFilter.value = "all";
  typeFilter.value = "all";
  budgetFilter.value = "all";
  renderProperties();
});
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

document.querySelector(".menu-btn").addEventListener("click", () => {
  const nav = document.querySelector("nav");
  const visible = getComputedStyle(nav).display !== "none";
  nav.style.display = visible ? "none" : "flex";
  nav.style.position = "absolute";
  nav.style.top = "68px";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.background = "#fff";
  nav.style.padding = "20px 5%";
  nav.style.flexDirection = "column";
});

document.getElementById("year").textContent = new Date().getFullYear();
renderProperties();
