import { calculatePath, getEqualizerBands } from '@utils';
import { useEffect, useRef, useState } from 'react';
import { Path as PathT } from 'konva/lib/shapes/Path';
import Konva from 'konva';
import { useAudioContext } from '@hooks';
import {
  NUMBER_OF_POINTS,
  DEFAULT_RADIUS,
  DEFAULT_ANIM_SPEED_DIVIDER,
  HALF_HEIGHT,
  HALF_WIDTH,
} from 'constants';

type Props = {
  radius?: number;
  speedDivider?: number;
  audioContext?: ReturnType<typeof useAudioContext>;
  sphereNumber?: number;
};

export function usePath({
  radius = DEFAULT_RADIUS,
  speedDivider = DEFAULT_ANIM_SPEED_DIVIDER,
  sphereNumber = 0,
  audioContext,
}: Props) {
  const pathRef = useRef<PathT>(null);

  const [pathData, setPathData] = useState(
    // Calculate initial coords for a circle
    calculatePath(NUMBER_OF_POINTS, radius)
  );

  useEffect(() => {
    const animation = new Konva.Animation((frame) => {
      const delta = frame?.time ?? 0;

      const multiplyer = Math.sin((delta * 2 * Math.PI) / speedDivider);

      // const step = 1;
      // const scale = 1;

      let leftBands: number[] = [];
      // let rightBands: number[] = [];

      if (audioContext && !audioContext.loading) {
        const { analyserL, freqByteData } = audioContext;

        analyserL.getByteFrequencyData(freqByteData);
        leftBands = getEqualizerBands(freqByteData);
        // analyserR.getByteFrequencyData(freqByteData);
        // rightBands = getEqualizerBands(freqByteData);
      }

      console.log(leftBands);

      const transformedCurvePoints = pathData.qCoords.map(
        ({ dx, dy }, index) => {
          const indexParam = index % 2 ? 1 : -1;

          const audioMultiplyer = leftBands.length
            ? 1 + (leftBands[sphereNumber] ?? 0) * 3
            : 1;

          return {
            dx:
              dx +
              (((dx - HALF_WIDTH) * multiplyer) / 10) *
                indexParam *
                audioMultiplyer,
            dy:
              dy +
              (((dy - HALF_HEIGHT) * multiplyer) / 10) *
                indexParam *
                audioMultiplyer,
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
  }, [audioContext, sphereNumber]);

  return { pathRef, pathData };
}
