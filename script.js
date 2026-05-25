// ---- Theme toggle (light / dark, persisted, defaults to system) ----
(function setupThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function currentTheme() {
    return (
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  }

  btn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// ---- Render projects from data.json ----
function getUrlParameter(name) {
  return new URLSearchParams(window.location.search).get(name);
}

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("calendar-container");
    container.innerHTML = "";

    const openYear = getUrlParameter("year") || (data.years[0] && data.years[0].year);

    data.years.forEach((yearData) => {
      const details = document.createElement("details");
      details.open = yearData.year === openYear;

      const summary = document.createElement("summary");
      summary.textContent = yearData.title;
      details.appendChild(summary);

      const body = document.createElement("div");
      body.className = "year-body";

      if (yearData.assignment) {
        const assignment = document.createElement("p");
        assignment.className = "assignment";
        assignment.innerHTML = yearData.assignment;
        body.appendChild(assignment);
      }

      yearData.groups.forEach((group) => {
        if (group.label) {
          const heading = document.createElement("h2");
          heading.className = "group-label";
          heading.textContent = group.label;
          body.appendChild(heading);
        }

        const grid = document.createElement("ul");
        grid.className = "grid";

        group.projects.forEach((project) => {
          const li = document.createElement("li");
          li.className = "card";

          const figure = document.createElement("div");
          figure.className = "card__media";

          project.images.forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = project.name
              ? `${project.name}'s Halloween animation`
              : "Halloween animation";
            img.loading = "lazy";
            figure.appendChild(img);
          });

          li.appendChild(figure);

          if (project.name) {
            const caption = document.createElement("p");
            caption.className = "card__name";
            caption.textContent = project.name;
            li.appendChild(caption);
          }

          grid.appendChild(li);
        });

        body.appendChild(grid);
      });

      details.appendChild(body);
      container.appendChild(details);
    });
  })
  .catch((error) => {
    console.error("Error loading project data:", error);
    document.getElementById("calendar-container").innerHTML =
      '<p class="status">Could not load projects.</p>';
  });
