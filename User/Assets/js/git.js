
        const username = "g4thxm"; 
        const repoList = document.getElementById("repo-list");

        const cardImages = [
            "Assets/images/card.jpg",
            "Assets/images/card.jpg",
            "Assets/images/card.jpg",
            "Assets/images/card.jpg",
            "Assets/images/card.jpg",
            "Assets/images/card.jpg"
        ];

        fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
            .then(res => res.json())
            .then(repos => {
                repos.slice(0, 6).forEach((repo, index) => {
                    const card = document.createElement("a");
                    card.href = repo.html_url;
                    card.target = "_blank";
                    card.style.cssText = `
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;
                        background: url('${cardImages[index % cardImages.length]}') center/cover no-repeat;
                        border-radius: 15px;
                        width: 280px;
                        height: 180px;
                        text-decoration: none;
                        color: #fff;
                        padding: 15px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        position: relative;
                    `;

                    // Dark overlay
                    const overlay = document.createElement("div");
                    overlay.style.cssText = `
                        position: absolute;
                        top:0; left:0; right:0; bottom:0;
                        background: rgba(0,0,0,0.4);
                        border-radius: 15px;
                    `;
                    card.appendChild(overlay);

                    // Repo name
                    const repoName = document.createElement("div");
                    repoName.innerText = repo.name;
                    repoName.style.cssText = `
                        position: relative;
                        z-index: 1;
                        font-size: 1.1rem;
                        font-weight: bold;
                        text-align: center;
                        width: 100%;
                    `;
                    card.appendChild(repoName);

                    // Hover animation
                    card.addEventListener("mouseover", () => {
                        card.style.transform = "translateY(-5px)";
                        card.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                    });
                    card.addEventListener("mouseout", () => {
                        card.style.transform = "translateY(0)";
                        card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
                    });

                    repoList.appendChild(card);
                });
            })
            .catch(err => {
                console.error(err);
                repoList.innerHTML = `<p style="color:red;">Failed to load repositories 😞</p>`;
            });
