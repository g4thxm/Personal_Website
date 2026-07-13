const username = "g4thxm";
const repoList = document.getElementById("repo-list");

/* ==========================================
   FEATURED PROJECTS
========================================== */

const projectData = {

    "Personal_Website": {
        title: "Personal Portfolio",
        description: "Modern responsive portfolio showcasing my projects and skills.",
        tech: ["HTML", "CSS", "JavaScript"],
        gradient: "linear-gradient(135deg,#111827,#374151)"
    },

    "info_trial": {
        title: "File Tracking System",
        description: "Laravel office file management system.",
        tech: ["Laravel", "PHP", "MySQL"],
        gradient: "linear-gradient(135deg,#0F172A,#1E293B)"
    },

    "Valentines-day": {
        title: "Valentine's Day",
        description: "A fun website for Valentine's Day.",
        tech: ["HTML", "CSS"],
        gradient: "linear-gradient(135deg,#3B82F6,#2563EB)"
    },

    "youtube_project": {
        title: "YouTube Project",
        description: "Responsive YouTube-inspired interface.",
        tech: ["HTML"],
        gradient: "linear-gradient(135deg,#FF512F,#F97316)"
    }

};

/* ==========================================
   LOGOS
========================================== */

function getLogo(name) {

    if (!name) return "Assets/icons/github.svg";

    const logos = {

        "HTML": "Assets/icons/html5.svg",     
        "CSS": "Assets/icons/css.svg",
        "JavaScript": "Assets/icons/javascript.svg",
        "TypeScript": "Assets/icons/typescript.svg",
        "PHP": "Assets/icons/php.svg",
        "Laravel": "Assets/icons/laravel.svg",
        "Python": "Assets/icons/python.svg",
        "MySQL": "Assets/icons/mysql.svg",
        "C++": "Assets/icons/cplusplus.svg",
        "C": "Assets/icons/c.svg",
        "Java": "Assets/icons/java.svg",
        "GitHub": "Assets/icons/github.svg"

    };

    return logos[name] || "Assets/icons/github.svg";

}

function getTechIcons(techArray){

    return techArray.map(tech => {

        const logo = getLogo(tech);

        return `
            <img
                src="${logo}"
                alt="${tech}"
                title="${tech}"
                class="tech-icon"
            >
        `;

    }).join("");

}

/* ==========================================
   GRADIENTS
========================================== */

function getGradient(language) {

    const gradients = {

        "JavaScript": "linear-gradient(135deg,#F7DF1E,#F0B90B)",
        "TypeScript": "linear-gradient(135deg,#3178C6,#4FA3FF)",
        "PHP": "linear-gradient(135deg,#777BB4,#4F5B93)",
        "Laravel": "linear-gradient(135deg,#FF2D20,#FF6B6B)",
        "Python": "linear-gradient(135deg,#3776AB,#FFD43B)",
        "HTML": "linear-gradient(135deg,#E34F26,#F16529)",
        "CSS": "linear-gradient(135deg,#264DE4,#2965F1)",
        "C++": "linear-gradient(135deg,#00599C,#3A8DDE)",
        "C": "linear-gradient(135deg,#00599C,#6DA9FF)",
        "Java": "linear-gradient(135deg,#F89820,#E76F00)",
        "MySQL": "linear-gradient(135deg,#00758F,#F29111)"

    };

    return gradients[language] ||
        "linear-gradient(135deg,#232526,#414345)";

}

/* ==========================================
   FETCH REPOSITORIES
========================================== */

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)

.then(response => response.json())

.then(repos => {

    repoList.innerHTML = "";

    repos
        .filter(repo => !repo.fork)
        .slice(0, 6)
        .forEach(repo => {

            const featured = projectData[repo.name];

            const project = featured || {

                title: repo.name.replace(/[-_]/g, " "),

                description:
                    repo.description ||
                    "GitHub Repository",

                tech: [
                    repo.language || "GitHub"
                ],

                gradient:
                    getGradient(repo.language)

            };

            // Automatically choose logo
            const logo =
                getLogo(project.tech[0]) ||
                getLogo(repo.language) ||
                "Assets/icons/github.svg";

            const card = document.createElement("a");

            card.href = repo.html_url;
            card.target = "_blank";
            card.rel = "noopener noreferrer";

            card.className = "project-card";

            card.style.background = project.gradient;

            card.innerHTML = `

                <div class="project-watermark">

                    <img src="${logo}" alt="${project.title}">

                </div>

                <div class="project-content">

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <div class="project-tech">

                        ${getTechIcons(project.tech)}

                    </div>

                    <div class="project-arrow">

                        View Project →

                    </div>

                </div>

            `;

            repoList.appendChild(card);

        });

})

.catch(error => {

    console.error(error);

    repoList.innerHTML = `
        <p style="text-align:center;color:red;">
            Failed to load repositories 😞
        </p>
    `;

});