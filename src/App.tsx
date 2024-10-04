import { Path as PathT } from 'konva/lib/shapes/Path';
import { Layer, Path, Stage } from 'react-konva';
import { calculatePath } from '@utils';
import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { HALF_HEIGHT, HALF_WIDTH, STAGE_HEIGHT, STAGE_WIDTH } from 'constants';

function App() {
  const pathRef = useRef<PathT>(null);

  const [pathData, setPathData] = useState(calculatePath(20));

  useEffect(() => {
    const animation = new Konva.Animation((frame) => {
      const delta = frame?.time ?? 0;

      const multiplyer = Math.sin((delta * 2 * Math.PI) / 10000) - 0.25;

      const transformedCurvePoints = pathData.qCoords.map(
        ({ dx, dy }, index) => {
          const indexParam = index % 2 ? 1 : -1;

          return {
            dx: dx + (((dx - HALF_WIDTH) * multiplyer) / 10) * indexParam,
            dy: dy + (((dy - HALF_HEIGHT) * multiplyer) / 10) * indexParam,
          };
        }
      );

      const updatedPath = pathData.path
        .split('Q')
        .map((pathPart, index) => {
          if (index === 0) return pathPart;

          // eslint-disable-next-line
          const [_pastDx, _pastDy, x1, x2] = pathPart.split(' ');

          return `${transformedCurvePoints[index - 1].dx} ${
            transformedCurvePoints[index - 1].dy
          } ${x1} ${x2}`;
        })
        .join('Q');

      setPathData({ ...pathData, path: updatedPath });
    }, pathRef.current?.getLayer());

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
      <Layer>
        <Path
          ref={pathRef}
          data={pathData.path}
          stroke="blue"
          strokeWidth={2}
        />
      </Layer>
    </Stage>
  );
}

export default App;
