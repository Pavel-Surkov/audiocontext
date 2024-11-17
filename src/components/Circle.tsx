import { Circle as C } from 'react-konva';

import Konva from 'konva';
import { useAudioContext } from '@hooks';
import { useEffect, useRef } from 'react';

import { Circle as CircleT } from 'konva/lib/shapes/Circle';
import { DEFAULT_RADIUS, HALF_HEIGHT, HALF_WIDTH } from 'constants';
import { getEqualizerBands } from '@utils';

type Props = Konva.PathConfig & {
  radius?: number;
  audioContext?: ReturnType<typeof useAudioContext>;
};

const getBandsSum = (arr: number[]) =>
  arr.reduce((sum, current) => sum + current, 0);

export function Circle({
  radius = DEFAULT_RADIUS,
  audioContext,
  ...rest
}: Props) {
  const circleRef = useRef<CircleT>(null);

  useEffect(() => {
    const animation = new Konva.Animation(() => {
      if (audioContext && !audioContext.loading && circleRef.current) {
        const { analyserL, analyserR, freqByteData } = audioContext;

        analyserL.getByteFrequencyData(freqByteData);
        const leftBands = getEqualizerBands(freqByteData);
        analyserR.getByteFrequencyData(freqByteData);
        const rightBands = getEqualizerBands(freqByteData);

        const leftBandsSum = getBandsSum(leftBands);
        const rightBandsSum = getBandsSum(rightBands);

        const audioMultiplyer = 1 + (leftBandsSum + rightBandsSum) * 10;

        circleRef.current.radius(radius + audioMultiplyer);
      }
    }, circleRef.current?.getLayer());

    animation.start();

    return () => {
      animation.stop();
    };
  }, [audioContext, radius]);

  return (
    <C
      ref={circleRef}
      x={HALF_WIDTH}
      y={HALF_HEIGHT}
      radius={radius}
      {...rest}
    />
  );
}
