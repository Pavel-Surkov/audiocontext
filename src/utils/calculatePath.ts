const DEFAULT_POINTS_COUNT = 10;
const DEFAULT_RADIUS = 200;

const HALF_WIDTH = window.innerWidth / 2;
const HALF_HEIGHT = window.innerHeight / 2;

export function calculatePath(
  numPoints: number = DEFAULT_POINTS_COUNT,
  radius: number = DEFAULT_RADIUS
) {
  const points = [];

  const increment = (2 * Math.PI) / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const theta = increment * i;

    const x = HALF_WIDTH + Math.round(radius * Math.cos(theta));
    const y = HALF_HEIGHT + Math.round(radius * Math.sin(theta));

    points.push(x);
    points.push(y);
  }

  const path = pointsToPath(points);

  return path;
}

function pointsToPath(points: number[]) {
  let path = '';

  for (
    let i = 0, nextCoords: [number, number] = [points[0], points[1]];
    i < points.length;
    i += 2
  ) {
    const previousCoords = nextCoords;

    // points[i] = x, points[i + 1] = y
    nextCoords = [points[i], points[i + 1]];

    // Calculate coords for Bezier curve Q param
    const { dx, dy } = calculateCurveParam(previousCoords, nextCoords);

    console.log(previousCoords, dx, dy, nextCoords);

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

function calculateCurveParam(
  previousCoords: [number, number],
  nextCoords: [number, number]
) {
  // Correctly calculate radius
  const trueRadius = Math.sqrt(
    (previousCoords[0] - HALF_WIDTH) ** 2 +
      (previousCoords[1] - HALF_HEIGHT) ** 2
  );

  // Here we have a segment with coords:
  // point1 = (previousCoords[0], previousCoords[1])
  // point2 = (nextCoords[0], nextCoords[1])
  const currentSegmentCenterX = (previousCoords[0] + nextCoords[0]) / 2;
  const currentSegmentCenterY = (previousCoords[1] + nextCoords[1]) / 2;

  // Length of segment from the center of the path to currentSegmentCenter
  const minRadius = Math.sqrt(
    (currentSegmentCenterX - HALF_WIDTH) ** 2 +
      (currentSegmentCenterY - HALF_HEIGHT) ** 2
  );

  // Normalize currentSegment coords and multiply by radius
  const trueSegmentCenterCoords = [
    Math.round(
      ((currentSegmentCenterX - HALF_WIDTH) / minRadius) * trueRadius +
        HALF_WIDTH
    ),
    Math.round(
      ((currentSegmentCenterY - HALF_HEIGHT) / minRadius) * trueRadius +
        HALF_HEIGHT
    ),
  ];

  // TODO: Calculate bezier Q coords based on this coords
  return {
    dx: trueSegmentCenterCoords[0],
    dy: trueSegmentCenterCoords[1],
  };
}
