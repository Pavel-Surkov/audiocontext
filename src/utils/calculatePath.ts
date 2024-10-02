const DEFAULT_POINTS_COUNT = 10;
const DEFAULT_RADIUS = 200;

export function calculatePath(
  numPoints: number = DEFAULT_POINTS_COUNT,
  radius: number = DEFAULT_RADIUS
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
  let path = '';

  for (let i = 0; i < points.length; i += 2) {
    // Start of the line
    if (i === 0) {
      path = `M${points[i]} ${points[i + 1]}`;
      continue;
    }

    // End of the line
    if (i === points.length - 2) {
      path = `${path} ${points[i]} ${points[i + 1]} Z`;
      continue;
    }

    // points[i] = x
    // points[i + 1] = y
    path = `${path} L${points[i]} ${points[i + 1]}`;
  }

  return path;
}

// return points.reduce((res, point, index) => {
//   // Start of the line
//   if (index === 0) {
//     return `M${point}`;
//   }

//   // End of the line
//   else if (index === points.length - 1) {
//     return `${res} ${point} Z`;
//   }

//   // Evens = y
//   // Odd = x
//   if (index % 2) {
//     return `${res} ${point}`;
//   } else {
//     return `${res} L${point}`;
//   }
// }, '');
