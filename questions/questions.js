document.getElementById("add-postit-btn").addEventListener("click", function() {
    const text = document.getElementById("postit-text").value;
    if (text.trim() !== "") {
        addPostit(text);
        savePostits(); // Sauvegarder après chaque ajout
    }
});

// Fonction pour ajouter un post-it
function addPostit(text, x = null, y = null, color = null, checked = false) {
    const postit = document.createElement("div");
    postit.classList.add("postit");

    // Création de la case à cocher
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            postit.querySelector("p").classList.add("striked-through");
        } else {
            postit.querySelector("p").classList.remove("striked-through");
        }
        savePostits(); // Sauvegarder après modification
    });

    // Création du texte du post-it
    const p = document.createElement("p");
    p.textContent = text;

    // Ajout de la croix de suppression
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.classList.add("close-btn");
    closeBtn.addEventListener("click", function() {
        postit.remove(); // Supprime le post-it
        savePostits(); // Sauvegarder après suppression
    });

    // Choix d'une couleur aléatoire pour le post-it ou utiliser la couleur sauvegardée
    const colorPostit = color || getRandomColor();
    postit.style.backgroundColor = colorPostit;

    // Positionnement des post-its : utilise la position sauvegardée si disponible
    const xPos = x || Math.floor(Math.random() * (window.innerWidth - 220));
    const yPos = y || Math.floor(Math.random() * (window.innerHeight - 300));

    postit.style.left = `${xPos}px`;
    postit.style.top = `${yPos}px`;

    // Ajout des éléments au post-it
    postit.appendChild(checkbox);
    postit.appendChild(p);
    postit.appendChild(closeBtn);

    // Ajout du post-it au conteneur
    document.getElementById("postits-container").appendChild(postit);
}

// Fonction pour obtenir une couleur aléatoire
function getRandomColor() {
    const colors = ["#FFEB3B", "#FF5722", "#4CAF50", "#2196F3", "#9C27B0"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Fonction pour sauvegarder les post-its dans le localStorage
function savePostits() {
    const postits = [];
    document.querySelectorAll(".postit").forEach(postit => {
        const p = postit.querySelector("p").textContent;
        const checkbox = postit.querySelector("input[type='checkbox']").checked;
        const color = postit.style.backgroundColor;
        const x = parseInt(postit.style.left);
        const y = parseInt(postit.style.top);

        postits.push({ p, x, y, color, checkbox });
    });

    // Sauvegarder dans localStorage
    localStorage.setItem("postits", JSON.stringify(postits));
}

// Fonction pour charger les post-its à partir du localStorage
function loadPostits() {
    const postits = JSON.parse(localStorage.getItem("postits"));
    if (postits) {
        postits.forEach(postit => {
            addPostit(postit.p, postit.x, postit.y, postit.color, postit.checkbox);
        });
    }
}

// Charger les post-its au démarrage
window.onload = loadPostits;
