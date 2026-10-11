/**
 * Calculates (x, y) offset in pixels relative to table center for an 8-ball
 * triangular rack configuration.
 *
 * Rows:
 * - Row 0: 1 ball (Apex)
 * - Row 1: 2 balls
 * - Row 2: 3 balls
 * - Row 3: 2 balls (nestled under row 2)
 */
export function getRackPosition(index, ballSize) {
  const dy = ballSize * (Math.sqrt(3) / 2);
  const layout = [
    { row: 0, col: 0, count: 1 },
    { row: 1, col: 0, count: 2 },
    { row: 1, col: 1, count: 2 },
    { row: 2, col: 0, count: 3 },
    { row: 2, col: 1, count: 3 },
    { row: 2, col: 2, count: 3 },
    { row: 3, col: 0, count: 2 },
    { row: 3, col: 1, count: 2 },
  ];

  const item = layout[index] || { row: 0, col: 0, count: 1 };
  const centerYOffset = (3 * dy) / 2;
  const x = (item.col - (item.count - 1) / 2) * ballSize;
  const y = item.row * dy - centerYOffset;

  return { x, y };
}

/**
 * Generates scattered positions inside table inner bounds with minimum overlap
 * and staggered delay.
 */
export function generateScatteredPositions(tableWidth, tableHeight, ballSize, count) {
  const radius = ballSize / 2;
  // Margin of ball radius plus cushion safety clearance
  const padding = radius + 10;

  const minX = -tableWidth / 2 + padding;
  const maxX = tableWidth / 2 - padding;
  const minY = -tableHeight / 2 + padding;
  const maxY = tableHeight / 2 - padding;

  const positions = [];
  const targetMinDist = ballSize * 1.12;

  for (let i = 0; i < count; i++) {
    let bestCandidate = null;
    let maxDistFound = -1;

    for (let attempt = 0; attempt < 80; attempt++) {
      const candX = minX + Math.random() * (maxX - minX);
      const candY = minY + Math.random() * (maxY - minY);

      let closest = Infinity;
      for (const p of positions) {
        const d = Math.hypot(candX - p.x, candY - p.y);
        if (d < closest) closest = d;
      }

      if (positions.length === 0 || closest >= targetMinDist) {
        bestCandidate = { x: candX, y: candY };
        break;
      }

      if (closest > maxDistFound) {
        maxDistFound = closest;
        bestCandidate = { x: candX, y: candY };
      }
    }

    const chosen = bestCandidate || {
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY),
    };

    // Stagger delay up to ~0.15s and slight random rotation
    const delay = (i / Math.max(1, count - 1)) * 0.12 + Math.random() * 0.025;
    const rotate = Math.round((Math.random() - 0.5) * 60);

    positions.push({
      x: Math.round(chosen.x),
      y: Math.round(chosen.y),
      rotate,
      delay: Number(Math.min(0.15, delay).toFixed(3)),
    });
  }

  return positions;
}
