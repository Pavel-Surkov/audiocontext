import { HALF_HEIGHT, HALF_WIDTH } from 'constants';

export function calculateQuadraticCurveParam(
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
    bezierDelta,
  };
}
