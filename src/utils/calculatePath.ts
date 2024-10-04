import { calculateQuadraticCurveParam } from '@utils';
import {
  DEFAULT_POINTS_COUNT,
  DEFAULT_RADIUS,
  HALF_HEIGHT,
  HALF_WIDTH,
} from 'constants';

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

  const { path, qCoords } = pointsToPath(points);

  return { path, qCoords };
}

function pointsToPath(points: number[]) {
  let path = `M${points[0]} ${points[1]}`;
  const qCoords: { dx: number; dy: number }[] = [];

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

    qCoords.push({ dx, dy });
    path = `${path} Q${dx} ${dy} ${points[i]} ${points[i + 1]}`;
  }

  // Close the line
  const { dx, dy } = calculateQuadraticCurveParam(
    [points[points.length - 2], points[points.length - 1]],
    [points[0], points[1]]
  );

  qCoords.push({ dx, dy });
  path = `${path} Q${dx} ${dy} ${points[0]} ${points[1]}`;

  return { path, qCoords };
}
