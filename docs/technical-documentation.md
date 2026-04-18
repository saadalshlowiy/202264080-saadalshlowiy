# Technical Documentation

## Architecture
The application is built using standard HTML5, CSS3, and Vanilla JavaScript (ES6+). It does not rely on external frameworks or libraries, ensuring maximum performance and alignment with course requirements.

## Key Systems

### 1. State Management (`localStorage`)
The application manages two primary states:
* **Theme:** Listens for clicks on the theme toggle button, switches the `data-theme` attribute on the root HTML element, and writes the string `'light'` or `'dark'` to `localStorage`.
* **Visitor Identity:** A form captures the visitor's name. Upon submission, it is saved to `localStorage`. On subsequent page loads, the JS checks for this key and updates the DOM greeting, bypassing the input form.

### 2. Complex Logic (Sorting & Filtering)
The Skills grid uses a dual-condition rendering system.
* **Filtering:** Updates the `display` and `opacity` properties based on `data-category` matching the active button.
* **Sorting:** Converts the DOM `NodeList` to a standard JavaScript Array. It then uses the `Array.prototype.sort()` method, comparing the `data-name` attributes alphabetically using `localeCompare()`. Finally, it re-appends the sorted elements to the parent container.

### 3. External API Integration
The site connects to the `api.github.com` endpoint using the `fetch()` API asynchronously. 
* Uses a `try...catch` block to handle network failures or API rate limits gracefully, injecting an error message into the DOM rather than breaking the application.

### 4. Form Validation
The contact form prevents default submission. It runs three checks:
1. Name is not empty.
2. Email matches standard Regex pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
3. Message text area is not empty.
If any check fails, it toggles a `hidden` class on the respective error span and outlines the input in red.
