# Saad Alshlowiy - Portfolio Assignment 3

This repository contains the code for Assignment 3: Advanced Functionality. It builds upon previous portfolio iterations by introducing complex JavaScript logic, external API integrations, and robust state management.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/yourusername/id-name-assignment3.git`
2. Open the directory in your code editor (e.g., VS Code).
3. Since this relies on vanilla HTML/CSS/JS, no build step or node modules are required.
4. Run a local server to view the files correctly (especially for the GitHub API fetch). You can use the VS Code "Live Server" extension.
5. Open `index.html` in your browser.

## Features Added (Assignment 3)

* **API Integration:** Fetches live repository data dynamically from the public GitHub REST API.
* **Complex Logic:** * Combined filtering and sorting functionality for the skills grid.
  * Form validation using Regex and multi-step conditionals to prevent empty submissions.
* **State Management:**
  * Uses `localStorage` to save user theme preferences (Light/Dark mode).
  * Uses `localStorage` to store the visitor's name, replacing the hero prompt with a personalized greeting upon return visits.
* **Performance:** Cleaned DOM queries, ensured CSS transitions use transform/opacity for GPU acceleration, and optimized script execution.

## Documentation
* [AI Usage Report](./docs/ai-usage-report.md)
* [Technical Documentation](./docs/technical-documentation.md)
