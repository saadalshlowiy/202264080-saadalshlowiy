# Technical Documentation

## Architecture
The application is a static, front-end only website built using standard HTML5, CSS3, and Vanilla JavaScript (ES6+). It deliberately avoids external frameworks or heavy libraries (like Bootstrap or React) to ensure maximum performance, precise DOM control, and strict alignment with course requirements.

## Key Systems

### 1. State Management (`localStorage`)
The application manages two persistent states client-side:
* **Theme:** Listens for clicks on the theme toggle button, switches the `data-theme` attribute on the root HTML element to trigger CSS variable swaps, and writes the string `'light'` or `'dark'` to `localStorage`.
* **Visitor Identity:** A lightweight form captures the visitor's name. Upon submission, it is saved to `localStorage`. On subsequent page loads, the JS checks for this key and updates the DOM greeting dynamically, bypassing the input form.

### 2. Complex Logic (Sorting & Filtering)
The Skills grid uses a dual-condition rendering system manipulated directly via the DOM.
* **Filtering:** Updates the `display` and `opacity` properties based on whether the card's `data-category` matches the active filter button.
* **Sorting:** Converts the DOM `NodeList` of project cards into a standard JavaScript Array. It utilizes `Array.prototype.sort()` to compare the `data-name` attributes alphabetically using `localeCompare()`. The sorted array is then re-appended to the parent container, shifting the visual layout without a page refresh.

### 3. External API Integration
The site connects to the `api.github.com` endpoint using the `fetch()` API asynchronously to pull recent public repositories.
* **Reliability:** Implements a `try...catch` block combined with an `AbortController`. If the network request takes longer than 6000ms, the fetch is aborted, and a graceful error message is injected into the DOM, preventing application lockup.

### 4. Scroll Reveal Animations (Performance Optimized)
Uses the native `IntersectionObserver` API to detect when elements enter the viewport. Once an element is intersected and the `active` class is applied (triggering the CSS transition), the observer immediately unobserves that specific target node. This prevents continuous, unnecessary intersection calculations during scrolling.

### 5. Form Validation
The contact form relies on client-side JavaScript to prevent default submission and ensure data integrity before sending to Formspree. It runs three distinct checks:
1. Name input is not empty.
2. Email input matches a standard Regex pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
3. Message text area is not empty.
Failed checks instantly toggle a `hidden` class on the respective error span and apply an error styling class to the input field itself.

### 6. Innovation Feature: Live Data Simulation
To showcase a large-scale data architecture project, a custom JavaScript interval runs independently, simulating active, randomized document processing throughput. It updates a specific DOM node every 1200ms using `toLocaleString()` to provide a polished, live-system aesthetic.
