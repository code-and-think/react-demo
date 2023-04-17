// 最大匹配问题：总结就是：先到先得，能让则让
export function Hungarian(
  // 邻接矩阵存图
  grid: number[][]
) {
  // n表示左侧点个数，m表示右侧点个数
  const [n, m] = [grid.length, grid[0].length];
  // 当前右侧元素对应的左侧元素
  const p = Array(m).fill(undefined);
  // 记录右侧元素是否已被访问过
  let vis = Array(m).fill(false);
  let ans = 0;

  function match(i: number) {
    for (let j = 0; j < m; j++) {
      // 有边且未访问
      if (grid[i][j] && !vis[j]) {
        // 标记为 true 表示右边点分配给当前点
        vis[j] = true;
        // 此时会出现两种情况：
        // 1. 右边点没有分配过，那么直接分配
        // 2. 右边点分配过，那么尝试将其他的分配给属于点，可能成功也可能失败
        if (p[j] == null || match(p[j])) {
          p[j] = i;
          return true;
        }
      }
    }
    return false;
  }

  for (let i = 0; i < n; i++) {
    // 每轮都要重置
    vis = Array(m).fill(false);
    if (match(i)) {
      ans++;
    }
  }

  return ans;
}

// 最小点覆盖问题：找到最小的一些点，删除它们就可以删除二分图的所有边
// König定理：一个二分图中的最大匹配数等于这个图中的最小点覆盖数。


  