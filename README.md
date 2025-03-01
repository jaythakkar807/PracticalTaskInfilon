🔹 app.component.ts (Main Logic & Data Handling)

- Fetched tram departures from JSON.
- Filtered only relevant trams from Luma station to Linde.
- Extracted and converted "display" time into seconds.
- Implemented real-time countdown (setInterval).
- Removed expired departures when time reaches 0.
- Provided utility functions for formatting time and status styling.
- We have shown creativity by adding logic of ATSTOP tram will be departs in 2 minutes by default.

🔹 app.component.html (UI & Display)
- Displayed tram departures dynamically.
- Used countdown timers that update every second.
- Applied color-coded status indicators (EXPECTED / DELAYED).
- Ensured clear, readable departure information.

🔹 app.component.scss (Styling & UX Enhancements)
- Styled the tram departure list for a modern look.
- Added color themes for different statuses.
- Ensured mobile responsiveness for better user experience.