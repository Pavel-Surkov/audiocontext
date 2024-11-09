import { Circle } from '@components';
import { useAudioContext } from '@hooks';

import { STAGE_HEIGHT, STAGE_WIDTH } from 'constants';
import { Layer, Stage } from 'react-konva';

function App() {
  // TODO: Solve the problem with:
  // The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
  const context = useAudioContext();

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
        <button
          className="toggle-button"
          onClick={() => context.source.start(0)}
        >
          Start
        </button>
      )}
      <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
        <Layer>
          <Circle audioContext={context} radius={100} fill="#eb689b" />
          {/* <Figure
            sphereNumber={0}
            audioContext={context}
            radius={220}
            fill="#99f628"
          />
          <Figure
            sphereNumber={}
            audioContext={context}
            radius={150}
            fill="#5f27c3"
          />
          <Figure
            sphereNumber={10}
            audioContext={context}
            radius={80}
            fill="#eb689b"
          /> */}
        </Layer>
      </Stage>
    </>
  );
}

export default App;
