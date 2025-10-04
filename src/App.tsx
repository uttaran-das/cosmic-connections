import GraphVisualizer from './components/GraphVisualizer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Cosmic Connections</h1>
        <p>An Interactive Visualizer for the Rig Veda</p>
      </header>
      <main className="graph-wrapper">
        <GraphVisualizer />
      </main>
    </div>
  );
}

export default App;