const GITHUB_USER = "TON_USER";
const GITHUB_REPO = "TON_REPO";
const GITHUB_PATH = "questions/postits.json";
const GITHUB_TOKEN = "TON_TOKEN"; // 🚨 Ne pas exposer ce token publiquement !

// Bouton d'ajout de post-it
document.getElementById("add-postit-btn").addEventListener("click", function() {
    const text = document.getElementById("postit-text").value;
    if (text.trim() !== "") {
        addPostit(text);
        savePostits(); // Sauvegarde sur GitHub
    }
});

// Fonction pour ajouter un post-it
function addPostit(text, x = null, y = null, color = null, checked = false) {
    const postit = document.createElement("div");
    postit.classList.add("postit");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.addEventListener("change", savePostits);

    const p = document.createElement("p");
    p.textContent = text;

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.classList.add("close-btn");
    closeBtn.addEventListener("click", function() {
        postit.remove();
        savePostits();
    });

    postit.style.backgroundColor = color || getRandomColor();
    postit.style.left = `${x || Math.floor(Math.random() * (window.innerWidth - 220))}px`;
    postit.style.top = `${y || Math.floor(Math.random() * (window.innerHeight - 300))}px`;

    postit.appendChild(checkbox);
    postit.appendChild(p);
    postit.appendChild(closeBtn);
    document.getElementById("postits-container").appendChild(postit);
}

function getRandomColor() {
    const colors = ["#FFEB3B", "#FF5722", "#4CAF50", "#2196F3", "#9C27B0"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Fonction pour sauvegarder les post-its sur GitHub
async function savePostits() {
    const postits = [];
    document.querySelectorAll(".postit").forEach(postit => {
        postits.push({
            p: postit.querySelector("p").textContent,
            x: parseInt(postit.style.left),
            y: parseInt(postit.style.top),
            color: postit.style.backgroundColor,
            checkbox: postit.querySelector("input[type='checkbox']").checked
        });
    });

    const jsonData = JSON.stringify(postits, null, 2);
    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`;
    const headers = { Authorization: `token ${GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json" };

    const fileResponse = await fetch(url, { headers });
    if (!fileResponse.ok) {
        console.error("Erreur lors de la récupération du fichier JSON.");
        return;
    }
    
    const fileData = await fileResponse.json();
    const sha = fileData.sha;

    const updateData = {
        message: "Mise à jour des post-its",
        content: btoa(jsonData),
        sha: sha
    };

    const updateResponse = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(updateData)
    });
    
    if (!updateResponse.ok) {
        console.error("Erreur lors de la sauvegarde des post-its.");
    }
}

// Fonction pour charger les post-its depuis GitHub
async function loadPostits() {
    const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/${GITHUB_PATH}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur de chargement");
        const postits = await response.json();
        postits.forEach(postit => addPostit(postit.p, postit.x, postit.y, postit.color, postit.checkbox));
    } catch (error) {
        console.error("Impossible de charger les post-its depuis GitHub", error);
    }
}

// Charger les post-its au démarrage
window.onload = loadPostits;
