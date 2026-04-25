# Saad Alshlowiy - Personal Portfolio v4

This repository contains the code for Assignment 4: Personal Web Application. It represents the final, polished iteration of my portfolio, bringing together all previous technical implementations into a production-ready application. It highlights my core competencies in full-stack web development, network engineering, and algorithm analysis.

## Features & Assignment 4 Updates

* **Innovation Feature (New):** A simulated real-time data ticker representing a high-throughput, distributed web scraping architecture project I am actively developing.
* **API Integration:** Fetches live repository data dynamically from the public GitHub REST API, now updated with robust `AbortController` timeout handling.
* **Complex Logic:** * Combined filtering and sorting functionality for the skills grid.
  * Form validation using Regex and multi-step conditionals to secure submissions via Formspree.
* **State Management:**
  * Uses `localStorage` to save user theme preferences (Light/Dark mode) across sessions.
  * Uses `localStorage` to store the visitor's name, replacing the hero prompt with a personalized greeting upon return visits.
* **Performance Optimization (New):** Scroll animations utilize the native `IntersectionObserver` API. Elements are unobserved immediately after revealing to minimize main-thread overhead.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/[your-username]/id-name-assignment4.git`
2. Open the directory in your code editor.
3. No build step or node modules are required as the project is built with vanilla web technologies.
4. Open `index.html` in your browser. (Using a local server like VS Code's "Live Server" is recommended for optimal testing of the fetch API).

## Documentation
* [AI Usage Report](./docs/ai-usage-report.md)
* [Technical Documentation](./docs/technical-documentation.md)

