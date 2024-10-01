const DEFAULT_RADIUS = 200;
const DEFAULT_POINTS_COUNT = 10;

export function calculatePath(
  radius: number = DEFAULT_RADIUS,
  numPoints: number = DEFAULT_POINTS_COUNT
) {
  const points = [];

  const increment = (2 * Math.PI) / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const theta = increment * i;

    const x = window.innerWidth / 2 + Math.round(radius * Math.cos(theta));
    const y = window.innerHeight / 2 + Math.round(radius * Math.sin(theta));

    points.push(x);
    points.push(y);
  }

  const path = pointsToPath(points);

  return path;
}

function pointsToPath(points: number[]) {
  return points.reduce((res, point, index) => {
    // Start of the line
    if (index === 0) {
      return `M${point}`;
    }

    // End of the line
    else if (index === points.length - 1) {
      return `${res} ${point} Z`;
    }

    // Evens = y
    // Odd = x
    if (index % 2) {
      return `${res} ${point}`;
    } else {
      return `${res} L${point}`;
    }
  }, '');
}
