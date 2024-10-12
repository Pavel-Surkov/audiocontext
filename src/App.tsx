import { Figure } from '@components';
import { createAudioContext } from '@utils';
import { STAGE_HEIGHT, STAGE_WIDTH } from 'constants';
import { useEffect } from 'react';
import { Layer, Stage } from 'react-konva';

function App() {
  // TODO: Solve the problem with:
  // The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
  useEffect(() => {
    createAudioContext();
    console.count();
  }, []);

  return (
    <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
      <Layer>
        <Figure numPoints={20} radius={220} fill="#99f628" />
        <Figure numPoints={20} radius={150} fill="#5f27c3" />
        <Figure numPoints={20} radius={80} fill="#eb689b" />
      </Layer>
    </Stage>
  );
}

export default App;
