import { Figure } from '@components';
import { STAGE_HEIGHT, STAGE_WIDTH } from 'constants';
import { Layer, Stage } from 'react-konva';

function App() {
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
