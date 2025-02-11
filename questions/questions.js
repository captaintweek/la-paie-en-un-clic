document.getElementById("add-postit-btn").addEventListener("click", function() {
    const text = document.getElementById("postit-text").value;
    if (text.trim() !== "") {
        addPostit(text);
    }
});

function addPostit(text) {
    const postit = document.createElement("div");
    postit.classList.add("postit");

    // Création de la case à cocher
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            postit.querySelector("p").classList.add("striked-through");
        } else {
            postit.querySelector("p").classList.remove("striked-through");
        }
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
    });

    // Choix d'une couleur aléatoire pour le post-it
    const color = getRandomColor();
    postit.style.backgroundColor = color;

    // Ajout des éléments au post-it
    postit.appendChild(checkbox);
    postit.appendChild(p);
    postit.appendChild(closeBtn); // Ajout de la croix

    // Positionnement aléatoire sur l'écran
    const x = Math.floor(Math.random() * (window.innerWidth - 220));
    const y = Math.floor(Math.random() * (window.innerHeight - 300));

    postit.style.left = `${x}px`;
    postit.style.top = `${y}px`;

    document.getElementById("postits-container").appendChild(postit);
}

function getRandomColor() {
    const colors = ["#FFEB3B", "#FF5722", "#4CAF50", "#2196F3", "#9C27B0"];
    return colors[Math.floor(Math.random() * colors.length)];
}
