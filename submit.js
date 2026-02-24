import { useStore } from "./store";

export function SubmitButton() {
  const handleSubmit = async () => {
    const { nodes, edges } = useStore.getState();

    try {
      const res = await fetch("http://127.0.0.1:8001/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await res.json();

      alert(
        `Pipeline Summary:\n\nNumber of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs Directed Acyclic Graph (DAG): ${data.is_dag}`
      );
    } catch (err) {
      alert("Failed to connect to backend. Is FastAPI running?");
      console.error(err);
    }
  };

  return (
    <button className="primary" onClick={handleSubmit}>
      Submit Pipeline
    </button>
  );
}
