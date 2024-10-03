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
  let path = `M${points[0]} ${points[1]}`;

  // i = 2 because we already added two first coords to path varibale
  for (
    let i = 2, nextCoords: [number, number] = [points[0], points[1]];
    i < points.length;
    i += 2
  ) {
    const previousCoords = nextCoords;
    nextCoords = [points[i], points[i + 1]];

    // Calculate coords for 2nd point of quadratic Bezier curve
    const { dx, dy } = calculateQuadraticCurveParam(previousCoords, nextCoords);

    path = `${path} Q${dx} ${dy} ${points[i]} ${points[i + 1]}`;
  }

  // Close the line
  const { dx, dy } = calculateQuadraticCurveParam(
    [points[points.length - 2], points[points.length - 1]],
    [points[0], points[1]]
  );

  path = `${path} Q${dx} ${dy} ${points[0]} ${points[1]}`;

  return path;
}

function calculateQuadraticCurveParam(
  firstPointCoords: [number, number],
  thirdPointCoords: [number, number]
) {
  // Center coords for segment between firstPoint and thirdPoint
  const currentSegmentCenterX = (firstPointCoords[0] + thirdPointCoords[0]) / 2;
  const currentSegmentCenterY = (firstPointCoords[1] + thirdPointCoords[1]) / 2;

  // Radius of calculated circle
  const trueRadius = Math.sqrt(
    (firstPointCoords[0] - HALF_WIDTH) ** 2 +
      (firstPointCoords[1] - HALF_HEIGHT) ** 2
  );

  // Distance from currentSegmentCenter to the center of the calculated circle
  const minRadius = Math.sqrt(
    (currentSegmentCenterX - HALF_WIDTH) ** 2 +
      (currentSegmentCenterY - HALF_HEIGHT) ** 2
  );

  // In De Casteljau’s algorithm, quadratic Bezier curve's 2nd point is 2 times higher than the heighest curve point
  // https://javascript.info/bezier-curve#de-casteljau-s-algorithm
  const bezierDelta = (trueRadius - minRadius) * 2;

  const bezierRadius = minRadius + bezierDelta;

  // Normalize currentSegment coords and multiply by radius
  const trueSegmentCenterCoords = [
    Math.round(
      ((currentSegmentCenterX - HALF_WIDTH) / minRadius) * bezierRadius +
        HALF_WIDTH
    ),
    Math.round(
      ((currentSegmentCenterY - HALF_HEIGHT) / minRadius) * bezierRadius +
        HALF_HEIGHT
    ),
  ];

  return {
    dx: trueSegmentCenterCoords[0],
    dy: trueSegmentCenterCoords[1],
  };
}
