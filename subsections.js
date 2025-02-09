document.addEventListener("DOMContentLoaded", function() {
    const sections = [
        { title: "SMIC, PMSS et autres données utiles", link: "smic-pmss.html" },
        { title: "Elements du brut", link: "elements-du-brut.html" },
        { title: "Les cotisations de sécurité sociale, retraite, prévoyance, mutuelle", link: "cotisations.html" },
        { title: "Taxes, impôts et autres cotisations", link: "taxes-impots.html" },
        { title: "Les salariés en situations particulières et les non salariés", link: "salaires-situations-particulières.html" },
        { title: "Le paramétrage DSN", link: "parametrage-dsn.html" },
        { title: "Les effectifs", link: "effectifs.html" },
        { title: "Les échéances et déclarations", link: "echeances-declarations.html" },
        { title: "Les procédures sauvegarde, RJ et liquidation", link: "procedures-sauvegarde.html" },
        { title: "L'embauche du salarié", link: "embauche-salarie.html" },
        { title: "La sortie du salarié", link: "sortie-salarie.html" },
        { title: "Les audits et contrôles", link: "audits-controles.html" }
    ];

    const container = document.getElementById("subsection-buttons-container");

    // Créer un bouton pour chaque section
    sections.forEach(section => {
        const button = document.createElement("button");
        button.textContent = section.title;
        button.onclick = () => window.location.href = section.link; // Redirige vers la sous-section correspondante
        container.appendChild(button);
    });
});
