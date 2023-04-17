// 求连通分量
export function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const vis = Array(n).fill(false);
  let ans = 0;

  for (let i = 0; i < n; i++) {
    if (!vis[i]) {
      // 一定是所有连通的都搜过之后才会出来，所以出来的时候 ans++
      dfs(i);
      ans++;
    }
  }

  function dfs(x: number) {
    if (vis[x]) {
      return;
    }
    vis[x] = true;
    for (let i = 0; i < n; i++) {
      // 先搜新发现的就是深度优先
      if (isConnected[x][i]) {
        dfs(i);
      }
    }
  }

  return ans;
}

// 判断二分图
function isBipartite(graph: number[][]): boolean {
  const n = graph.length;
  let ans = true;
  const color = Array(n);

  for (let i = 0; i < graph.length; i++) {
    if (color[i] == null) {
      // 一开始的颜色无所谓，因为每次都是不同的连通分量 不会再回访之前的节点导致前后颜色不一致而出错
      dfs(i, 1);
    }
  }

  function dfs(x: number, c: number) {
    if (!ans) return;
    if (color[x] != null) {
      if (color[x] !== c) {
        ans = false;
      }
      return;
    }
    color[x] = c;
    for (const item of graph[x]) {
      dfs(item, 1 - c);
    }
  }

  return ans;
}
