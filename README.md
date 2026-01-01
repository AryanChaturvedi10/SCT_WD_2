# SCT_WD_2

Interactive Stopwatch This repository contains the code for a modern, interactive stopwatch application built with HTML, CSS, and JavaScript. It offers precision timing, lap recording, sound effects, theme toggling, and fullscreen mode, along with keyboard shortcuts for enhanced usability.

Table of Contents Features

Technologies Used

Project Structure

Setup and Running Locally

Usage

Customization

License

Features Precision Timing: Displays time with milliseconds accuracy.

Start/Stop Functionality: Easily start and pause the timer.

Lap Recording: Record individual lap times and view them in a list, along with split times.

Sound Effects: Audible feedback for start, stop, lap, and milestone events (can be toggled).

Theme Toggle: Switch between a default dark theme and a blue theme.

Fullscreen Mode: Toggle fullscreen viewing for an immersive experience.

Milestone Notifications: Visual and auditory alerts at specific minute intervals (e.g., 1, 5, 10 minutes).

Animated Background: Subtle floating particles in the background for a dynamic visual appeal.

Responsive Design: Adapts to different screen sizes for optimal viewing on various devices.

Keyboard Shortcuts:

Spacebar: Start/Stop the stopwatch.

L: Record a lap.

S: Toggle sound.

Visual Cues:

Time display changes color and glows when running.

Lap times are highlighted as "fastest" or "slowest".

Buttons have hover and active effects.

Technologies Used HTML5: Provides the structure and content of the stopwatch interface.

CSS3: Styles the application, including:

Custom gradients, shadows, and animations.

Responsive design using media queries.

Styling for the header, display, controls, and lap list.

Animated background particles.

JavaScript (Vanilla JS): Implements all the interactive logic:

Timer management (setInterval, Date object).

Web Audio API for sound generation.

DOM manipulation for updating the display and lap list.

Event listeners for button clicks and keyboard input.

Fullscreen API integration.

Google Fonts:

Roboto: For general text.

Share Tech Mono: For the stopwatch display, giving it a digital, techy look.

Material Icons: Used for UI elements like sound toggle, theme toggle, and fullscreen toggle.

Project Structure . ├── stopwatch.html # The main HTML file defining the stopwatch layout. ├── stopwatch.css # Contains all the custom CSS styles for the application. └── stopwatch.js # Implements the JavaScript logic for stopwatch functionality and interactions.

Setup and Running Locally To get a local copy of this project up and running, follow these simple steps:

Clone the repository:

git clone

Navigate to the project directory:

cd interactive-stopwatch # Or whatever your cloned directory is named

Open stopwatch.html in your web browser: You can simply double-click the stopwatch.html file, or right-click and choose "Open with" your preferred web browser.

No special server setup or build process is required, as this is a static web application.

Usage Start/Stop: Click the large "START" button (which changes to "STOP" when running) or press the Spacebar.

Lap: Click the "FLAG" button or press L to record a lap time. The lap list will show individual lap times and their split from the previous lap.

Sound Toggle: Click the volume_up/volume_off icon in the header or press S to enable/disable sound effects.

Theme Toggle: Click the palette icon in the header to switch between the dark and blue themes.

Fullscreen: Click the fullscreen icon to enter/exit fullscreen mode.

Customization HTML (stopwatch.html): Modify the basic structure or add new elements to the interface.

CSS (stopwatch.css): Adjust colors, fonts, sizes, animations, and overall visual appearance. All styles are custom, allowing for extensive visual customization.

JavaScript (stopwatch.js):

Modify timing logic.

Change sound frequencies or durations in createBeep().

Adjust milestone intervals in checkMilestones().

Add new keyboard shortcuts or modify existing ones.

Change the number or animation properties of background particles in createParticles().# SCT_WD_2
