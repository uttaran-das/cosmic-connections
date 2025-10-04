import fs from 'fs/promises';
import path from 'path';

interface Sukta {
  mandala: number;
  sukta: number;
  text: string;
}

interface Node {
  id: string;
  label: string;
  group: string;
  color: string;
  font: { color: string };
  title?: string;
}

interface Edge {
  from: string;
  to: string;
}

const DEITY_COLOR = "#FFC300";
const RISHI_COLOR = "#C70039";
const HYMN_COLOR = "#1B4F72";

function parseMetadata(text: string): { rishi: string | null; devata: string | null } {
    if (!text) return { rishi: null, devata: null };

    const metadataBlock = text.split('\n\n')[0];
    const singleLineMeta = metadataBlock.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ');
    const parts = singleLineMeta.split('।');

    if (parts.length < 2) return { rishi: null, devata: null };

    const rishi = parts[0].replace(/^[०-९\s]+/, '').trim();
    const devata = parts.slice(1).join('।').replace(/\([^)]*\)/g, '').replace(/^[\s,०-९-]+/, '').split(',')[0].replace(/^[०-९\s-]+/, '').trim();

    if (rishi && devata) return { rishi, devata };
    return { rishi: null, devata: null };
}


async function createGraphData() {
  console.log("Starting data processing...");
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeIds = new Set<string>();

  const dataDir = path.join(process.cwd(), 'data');
  const outputDir = path.join(process.cwd(), 'public');
  const outputFile = path.join(outputDir, 'graph-data.json');

  for (let i = 1; i <= 10; i++) {
    const filePath = path.join(dataDir, `rigveda_mandala_${i}.json`);
    
    try {
        console.log(`Processing ${path.basename(filePath)}...`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const mandalaData: Sukta[] = JSON.parse(fileContent);

        if (!Array.isArray(mandalaData)) {
            console.warn(`Warning: Skipping ${path.basename(filePath)} because it is not a valid JSON array.`);
            continue;
        }

        for (const sukta of mandalaData) {
            const { rishi, devata } = parseMetadata(sukta.text);

            if (!rishi || !devata) {
                console.warn(`Could not parse metadata for M${sukta.mandala} H${sukta.sukta}. Skipping.`);
                continue;
            }

            const { mandala, sukta: hymnNumber } = sukta;
            const hymnId = `M${mandala} H${hymnNumber}`;
            const hymnTitle = `Mandala ${mandala}, Hymn ${hymnNumber}\nDeity: ${devata}\nRishi: ${rishi}`;

            if (!nodeIds.has(devata)) {
                nodes.push({ id: devata, label: devata, group: "deity", color: DEITY_COLOR, font: { color: "#db9c71ff" } });
                nodeIds.add(devata);
            }
            if (!nodeIds.has(rishi)) {
                nodes.push({ id: rishi, label: rishi, group: "rishi", color: RISHI_COLOR, font: { color: "white" } });
                nodeIds.add(rishi);
            }
            if (!nodeIds.has(hymnId)) {
                nodes.push({ id: hymnId, label: `Hymn ${hymnNumber}`, title: hymnTitle, group: "hymn", color: HYMN_COLOR, font: { color: "white" } });
                nodeIds.add(hymnId);
            }
            
            edges.push({ from: rishi, to: hymnId });
            edges.push({ from: hymnId, to: devata });
        }
    } catch (error) {
        console.error(`Error processing file ${path.basename(filePath)}:`, error);
        continue;
    }
  }

  const graphData = { nodes, edges };
  
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(graphData, null, 2));

  console.log(`Graph data saved to ${outputFile}`);
}

createGraphData().catch(error => {
  console.error("Error processing data:", error);
  process.exit(1);
});