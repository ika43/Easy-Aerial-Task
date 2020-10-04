const { graph } = require('./matrix');

const minDistance = (dist, sptSet, V) => {
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

const findSafeNodes = (graph, dron, homePosition, safePostitions) => {
    safePostitions.push(homePosition); // put all safe position in one array
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
    dist[dron] = 0;
    parents[dron] = -1;
    // Find shortest path for given node
    for (let j = 0; j < V - 1 ; ++j) 
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
        if (safePostitions.includes(u)) founded.push(u);
        if (founded.length === safePostitions.length) break; // If all safe nodes are found exit loop
    }
    printSolution(dron, dist, parents, founded);
}

const printSolution = (dron, dist, parents, founded) => {
    const nVertices = dist.length;
    for (let i = 0; i < nVertices; i++) {
        if(i != dron && dist[i] != Number.MAX_VALUE && founded.includes(i))
        {
            printPath(i, parents);
            console.log(dron + " -> " + i + "\tdistance: " + dist[i] + "\tpath: " + path);
            path.splice(0, path.length); // clear path array
        }
    }
}

const path = [];
const printPath = (currNode, parents) => {
    if(currNode === -1) return;
    printPath(parents[currNode], parents);
    path.push(currNode);
}

// values of dron and safe positions can be changed
findSafeNodes(graph, 12, 15, [22]);