const graph = require('./matrix');

function minDistance(dist, sptSet, V) {
    let min = Number.MAX_VALUE;
    let minIndex = 0;

    for (let i = 0; i < V; ++i) 
    {
      if (!sptSet[i] && dist[i] <= min)
        {
            min = dist[i];
            minIndex = i;
        }
    }
    return minIndex;
}

function dijsktra(graph, src, home, safe) {
    safe.push(home); // put all safe vertices in one array
    const V = graph.length;
    const dist = [];
    const sptSet = [];
    const parents = [];
    const founded = [];

    for (let i = 0; i < V; i++) 
    {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }
    dist[src] = 0;
    parents[src] = -1;
    // Find shortest path for given vertices
    for (let count = 0; count < V - 1 ; ++count) 
    {
        let u = minDistance(dist, sptSet, V);
        sptSet[u] = true;
        for (let v = 0; v < V; ++v) 
        {
            if (!sptSet[v] && Boolean(graph[u][v])
                && dist[u] != Number.MAX_VALUE && dist[u] + graph[u][v] < dist[v]) 
                {
                    dist[v] = dist[u] + graph[u][v];
                    parents[v]  = u;
                }
        }
        if (safe.includes(u)) founded.push(u);
        if (founded.length === safe.length) break; // If all safe vertices are found exit loop
    }
    printSolution(src, dist, parents, founded);
}

function printSolution(src, dist, parents, founded) {
    const nVertices = dist.length;
    for (let i = 0; i < nVertices; i++) {
        if(i != src && dist[i] != Number.MAX_VALUE && founded.includes(i))
        {
            printPath(i, parents);
            console.log(src + " -> " + i + "\tdistance: " + dist[i] + "\tpath: " + path);
            path.splice(0, path.length); // clear path array
        }
    }
}

const path = [];
function printPath (currentVertex, parents) {
    if(currentVertex === -1) return;
    printPath(parents[currentVertex], parents);
    path.push(currentVertex);
}

dijsktra(graph, 12, 15, [22]);