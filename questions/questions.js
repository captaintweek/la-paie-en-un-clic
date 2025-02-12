const GITHUB_USER = "captaintweek";
const GITHUB_REPO = "la-paie-en-un-clic";
const GITHUB_PATH = "questions/postits.json";
const GITHUB_TOKEN = "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"; // ⚠ Ne JAMAIS exposer ce token publiquement !

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
    const headers = { 
        Authorization: `token ${GITHUB_TOKEN}`, 
        Accept: "application/vnd.github.v3+json" 
    };

    try {
        const fileResponse = await fetch(url, { headers });
        if (!fileResponse.ok) throw new Error("Erreur lors de la récupération du fichier JSON.");

        const fileData = await fileResponse.json();
        const sha = fileData.sha;

        const updateData = {
            message: "Mise à jour des post-its",
            content: btoa(unescape(encodeURIComponent(jsonData))), // ✅ Évite les bugs avec accents
            sha: sha
        };

        const updateResponse = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(updateData)
        });

        if (!updateResponse.ok) throw new Error("Erreur lors de la sauvegarde des post-its.");
        console.log("Post-its sauvegardés avec succès !");
        
    } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
    }
}

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
