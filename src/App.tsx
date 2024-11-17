import { Circle } from '@components';
import { useAudioContext } from '@hooks';

import { STAGE_HEIGHT, STAGE_WIDTH } from 'constants';
import { Layer, Stage } from 'react-konva';

function App() {
  // The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
  const context = useAudioContext();

  return (
    <>
      {!context.loading && (
        // No API for pause and resume provided
        // The only way to do it is create a new AudioBufferSourceNode and then start it from previous stop time
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
        </Layer>
      </Stage>
    </>
  );
}

export default App;
