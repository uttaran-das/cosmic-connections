# Cosmic Connections: An Interactive Visualizer for the Rig Veda

An interactive network graph that maps the cosmic connections between deities (Devatas), sages (Rishis), and hymns (Suktas) of the Rig Veda.

## About The Project

This project was built for the **"Build anything that makes the Rig Veda delightful to explore"** hackathon. Instead of presenting the Rig Veda as a linear text, Cosmic Connections transforms its metadata into a living, interactive universe.

The goal is to provide a user with immediate, visual insight into the intricate web of relationships within the Rig Veda Samhita. By exploring the graph, one can quickly see which deities were praised by which rishis, and which hymns connect them.

This visualization aims to create a "wow, this is fun and insightful" moment, making the vast and ancient text more approachable and engaging for a curious person without requiring any prior knowledge.

### Key Features:

*   **Interactive Graph Visualization:** Nodes represent Deities, Rishis, and Hymns, with edges showing their relationships (Rishi → composed → Hymn → is dedicated to → Deity).
*   **Data-Driven:** The entire graph is dynamically generated from the Rig Veda Samhita data (Mandalas 1-10).
*   **Minimalist & Performant:** A clean, dark-themed UI that focuses on the data. Built as a static, serverless application for lightning-fast loading and smooth interaction.
*   **Insightful Tooltips:** Hover over any hymn to see its details, including the Mandala, Sukta number, Rishi, and Devata.

### Built With

*   [React](https://reactjs.org/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Vite](https://vitejs.dev/)
*   [Vis.js Network](https://visjs.github.io/vis-network/docs/network/)
*   [Node.js](https://nodejs.org/) (for the data pre-processing script)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm (which comes with Node.js) installed on your system.
*   [Download Node.js](https://nodejs.org/en/download/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/uttaran-das/cosmic-connections.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd cosmic-connections
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Process the Rig Veda Data:**
    This project uses a one-time script to read the raw JSON data and convert it into an optimized format for the web application. You must run this command once before starting the app.
    ```sh
    npm run process:data
    ```

5.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Your application will be available at `http://localhost:5173` (or the URL specified in your terminal).

---

## Hackathon Submission Details

This project was built to meet the specific judging criteria of the hackathon.

*   **Design:** A minimalist, elegant, and dark-themed design that emphasizes the data. Typography is clean and readable.
*   **Usability:** The application is immediately useful. A curious person can start exploring the graph by clicking and dragging nodes within seconds, no manual required.
*   **Performance:** Built with Vite and deployed as a static site, ensuring quick load times and smooth interactions, even with thousands of nodes.
*   **Rigor:** All data is sourced from a public dataset and attributed correctly. The connections shown (Rishi-Sukta-Devata) are based directly on the provided metadata.
*   **Originality:** Presents a novel, non-linear way to explore the structure of the Rig Veda, moving beyond simple text search and providing a macro-level view of its internal world.
*   **User Delight:** The "wow" factor comes from seeing the vast, interconnected web of Vedic wisdom come to life and discovering surprising connections between its core figures.

---

## Data Source & Attributions

This project would not be possible without high-quality, structured data.

*   The Rig Veda Samhita JSON files were sourced from the **[DharmicData GitHub repository](https://github.com/bhavykhatri/DharmicData/tree/main/Rigveda)** by **Bhavy Khatri**.
*   The data in that repository is, in turn, sourced from the **Vedic Heritage Portal** by the Indira Gandhi National Centre for the Arts (IGNCA).