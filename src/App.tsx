import { Figure } from '@components';
import { useAudioContext } from '@hooks';
import { getEqualizerBands } from '@utils';

import { STAGE_HEIGHT, STAGE_WIDTH } from 'constants';
import Konva from 'konva';
import { useEffect } from 'react';
import { Layer, Stage } from 'react-konva';

function App() {
  // TODO: Solve the problem with:
  // The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
  const context = useAudioContext();

  useEffect(() => {
    const { analyserL, analyserR, freqByteData, FFT_POWER } = context;

    if (!analyserL || !analyserR) return;

    const animation = new Konva.Animation(() => {
      const step = 1;
      const scale = 1;

      analyserL.getByteFrequencyData(freqByteData);
      const leftBands = getEqualizerBands(freqByteData);
      analyserR.getByteFrequencyData(freqByteData);
      const rightBands = getEqualizerBands(freqByteData);

      // console.log(leftBands);

      // for (let i = 1; i <= FFT_POWER; i++) {
      //   leftPath.segments[i].point = [i * step, -leftBands[i - 1] * scale];
      //   rightPath.segments[i].point = [i * step, -rightBands[i - 1] * scale];
      // }
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [context]);

  // view.onFrame = function() {
  // 	var step = view.size.width / (amount + 1);
  // 	var scale = view.size.height / 1.75;
  // 	analyserL.getByteFrequencyData(freqByteData);
  // 	var leftBands = getEqualizerBands(freqByteData, true);
  // 	analyserR.getByteFrequencyData(freqByteData);
  // 	var rightBands = getEqualizerBands(freqByteData, true);
  // 	for (var i = 1; i <= amount; i++) {
  // 		leftPath.segments[i].point = [i * step, -leftBands[i - 1] * scale];
  // 		rightPath.segments[i].point = [i * step, -rightBands[i - 1] * scale * (flip ? -1 : 1)];
  // 	}
  // 	leftPath.smooth();
  // 	rightPath.smooth();
  // 	group.pivot = [leftPath.position.x, 0];
  // 	group.position = view.center;
  // }

  return (
    <>
      {!context.loading && (
        <button onClick={() => context.source.start(0)}>Start</button>
      )}
      <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
        <Layer>
          <Figure radius={220} fill="#99f628" />
          <Figure radius={150} fill="#5f27c3" />
          <Figure radius={80} fill="#eb689b" />
        </Layer>
      </Stage>
    </>
  );
}

export default App;
