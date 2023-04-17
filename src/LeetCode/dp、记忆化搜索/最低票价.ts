export function mincostTickets(days: number[], costs: number[]): number {
  const [day, week, month] = costs;
  let dayIndex = 0;
  let cost: number[] = [0];
  for (let i = 1; i <= 365; i++) {
    if (days[dayIndex] === i) {
      dayIndex++;
      cost[i] = Math.min(
        (cost[i - 1] ?? 0) + day,
        (cost[i - 7] ?? 0) + week,
        (cost[i - 30] ?? 0) + month
      );
    } else {
      cost[i] = cost[i - 1];
    }
  }
  return cost[cost.length - 1];
}
