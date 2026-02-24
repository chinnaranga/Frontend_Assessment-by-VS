from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "VectorShift Backend is running",
        "status": "OK"
    }

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    graph = defaultdict(list)
    indegree = {n["id"]: 0 for n in nodes}

    for e in edges:
        graph[e["source"]].append(e["target"])
        indegree[e["target"]] += 1

    queue = deque([n for n in indegree if indegree[n] == 0])
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1
        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)

    return visited == len(nodes)

@app.post("/pipelines/parse")
def parse_pipeline(data: Dict):
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag(nodes, edges),
    }