import React, { useEffect, useState, useRef } from 'react';
// --- The Corrected Imports ---
import { Network } from 'vis-network';
import { DataSet } from 'vis-data/esnext';
import 'vis-network/styles/vis-network.css';

interface GraphData {
  nodes: any[];
  edges: any[];
}

const GraphVisualizer: React.FC = () => {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const networkContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('graph-data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const graphData: GraphData = await response.json();
        setData(graphData);
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data && networkContainer.current) {
      const nodes = new DataSet(data.nodes);
      const edges = new DataSet(data.edges);

      const networkData = {
        nodes: nodes,
        edges: edges,
      };

      const options = {
        nodes: {
          shape: 'dot',
          size: 20,
          font: { size: 14 },
          borderWidth: 2,
        },
        edges: {
          width: 2,
          color: { inherit: 'from' },
        },
        physics: {
          enabled: true,
          forceAtlas2Based: {
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springLength: 100,
            damping: 0.4,
          },
          solver: 'forceAtlas2Based',
        },
        interaction: {
          hover: true,
          tooltipDelay: 200,
        },
        height: '100%',
        width: '100%',
      };
      
      new Network(networkContainer.current, networkData, options);
    }
  }, [data]);

  if (loading) {
    return <div className="loading-message">Loading the cosmos...</div>;
  }

  if (!data) {
    return <div className="error-message">Failed to load data.</div>;
  }

  return <div ref={networkContainer} style={{ height: '100%', width: '100%' }} />;
};

export default GraphVisualizer;