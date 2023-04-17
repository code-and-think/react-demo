

// 多源最短路：求 n 个节点相互之间的最短路
// Floyd本质上是一个动态规划的思想，每一次循环更新经过前k个节点，i到j的最短路径。
// 初始化的时候，我们把每个点到自己的距离设为0，每新增一条边，就把从这条边的起点到终点的距离设为此边的边权（类似于邻接矩阵）
// 其他距离初始化为INF（一个超过边权数据范围的大整数，注意防止溢出）。
// 比如 n = 4 则有
// dist[0][0] = 0 dist[1][1] = 0 dist[2][2] = 0 dist[3][3] = 0
// dist[1][2] = 1  dist[1][3] = 4   dist[1][4] = 6  dist[2][4] = 2  dist[3][4] = 1
// 复杂度为 O(n^3)
export function Floyd(dist: number[][]) {
  const n = dist.length;
  for (let k = 0; k < n; ++k) {
    // 每一趟二重循环，实际上都是在考察，能不能经由k点，把i到j的距离缩短？
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
}

// 单源最短路：起点固定，取起点到所有其他点的最短路
// 因为起点固定了，我们现在只需要一个一维数组dist[i]来存储每个点i 到起点的距离，默认为最大值
// 现在我们定义对点x, y的松弛操作是：
// dist[y] = min(dist[y], dist[x] + e[x][y]);//这里的e[x][y]表示x、y之间的距离，具体形式可能根据存图方法不同而改变
// 松弛操作就相当于考察能否经由x点使起点到y点的距离变短。Bellman-Ford算法就是把所有边松弛 n - 1 遍
// 复杂度 O(mn)
function BellmanFord(
  start: number,
  n: number,
  edge: Array<{ from: number; to: number; w: number }>
) {
  const dist: number[] = Array(n).fill(Number.MAX_SAFE_INTEGER);
  dist[start] = 0;
  // 松弛 n - 1 遍
  for (let j = 0; j < n - 1; ++j) {
    for (let i = 0; i < edge.length; ++i) {
      const { from, to, w } = edge[i];
      dist[to] = Math.min(dist[to], dist[from] + w);
    }
  }

  // BellmanFord 不考虑负权环，但其实Bellman-Ford算法是可以很简单地处理负权环的，只
  // 需要再多对每条边松弛一遍，如果这次还有点被更新，就说明存在负权环。因为没有负权环时，最短路上的顶点数一定小于n，
  // 而存在负权环时，可以无数次地环绕这个环获取最小值
}

// SPFA算法
// 相对于 BellmanFord 我们每次不松弛所有点，而只松弛可能更新的点？
// SPFA算法，也就是队列优化的Bellman-Ford算法，维护一个队列。一开始，把起点放进队列：
// 我们现在考察1号点，它可以到达点2、3、4。于是1号点出队，2、3、4号点依次入队，入队时松弛相应的边。
// 现在队首是2号点，2号点出队。2号点可以到达4号点，我们松弛2, 4，但是4号点已经在队列里了，所以4号点就不入队了（之后解释原因）。
// 1. 只让当前点能到达的点入队 2. 已在队里未遍历到的不重复入队，已出队的可重复入队 3. 如果一条边未被更新，那么它的终点不入队
function SPFA(start: number, n: number, edges: Array<{ from: number; to: number; w: number }>) {
  const dequeue = new Dequeue();
  const dist: number[] = Array(n).fill(Number.MAX_SAFE_INTEGER);
  dist[start] = 0;
  const inQueue = Array(dist.length).fill(false);
  dequeue.push(start);
  const fromEdges = new Map<number, Array<{ from: number; to: number; w: number }>>();
  for (const edge of edges) {
    fromEdges.set(edge.from, (fromEdges.get(edge.from) ?? []).concat(edge));
  }

  while (!dequeue.empty()) {
    const p = dequeue.dequeue();
    inQueue[p] = false;

    // 获取以当前点p为 from 的所有边依次遍历
    for (const { to, w } of fromEdges.get(p) ?? []) {
      // 松弛成功
      if (dist[to] > dist[p] + w) {
        dist[to] = dist[p] + w;
        if (!inQueue[to]) {
          inQueue[to] = true;
          dequeue.enqueue(to);
        }
      }
    }
  }
  // SPFA也可以判负权环，我们可以用一个数组记录每个顶点进队的次数，当一个顶点进队超过n次时，
  // 就说明存在负权环。（这与Bellman-Ford判负权环的原理类似）
}

// Dijkstra算法
// Dij基于一种贪心的思想，我们假定有一张没有负边的图。首先，起点到起点的距离为0，现在我们对起点和它能直接到达的所有点进行松弛。
// 因为没有负边，这时我们可以肯定，离起点最近的那个顶点的dist一定已经是最终结果。为什么？因为没有负边，所以不可能再经由其他点，使起点到该点的距离变得更短。
// 如果有负边，就不能保证离源点最近的那个点的dist不会被更新了。
// 所以核心流程就是：不断取出离顶点最近而没有被访问过的点，松弛它和它能到达的所有点。
function Dijkstra(start: number, n: number, edges: Array<{ from: number; to: number; w: number }>) {
  const dist = Array(n).fill(Number.MAX_SAFE_INTEGER);
  const pq = new PriorityQueue<[number, number]>((a, b) => a[1] - b[1]);
  const fromEdges = new Map<number, Array<{ from: number; to: number; w: number }>>();
  for (const edge of edges) {
    fromEdges.set(edge.from, (fromEdges.get(edge.from) ?? []).concat(edge));
  }
  // 打印路径
  const pre: number[] = [];

  const vis = Array(n).fill(false);
  dist[start] = 0;
  pq.enqueue([start, 0]);
  while (!pq.empty()) {
    const [p] = pq.dequeue() ?? [];
    if (p == null || vis[p]) {
      continue;
    }
    vis[p] = true;
    for (const { to, w } of fromEdges.get(p) ?? []) {
      dist[to] = Math.min(dist[to], dist[p] + w);
      // 队里可能出现多个to相同的节点是没关系的，因为先出队的一定是最小的，它会把 vis 直接设置为 true 然后后面的就不看了
      if (!vis[to]) pq.enqueue([to, dist[to]]);

      // 带路径版本
      // if (dist[p] + w < dist[to]) {
      //   pre[to] = p;
      //   dist[to] = w + dist[p];
      //   if (!vis[to]) {
      //     pq.enqueue([to, dist[to]]);
      //   }
      // }
    }
  }
}
