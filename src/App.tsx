import { Path as PathT } from 'konva/lib/shapes/Path';
import { Layer, Path, Stage } from 'react-konva';
import { calculatePath } from '@utils';
import { useRef } from 'react';

function App() {
  const pathRef = useRef<PathT>(null);

  // TODO: Calculate path with besier curves for smoothness
  // !Pay attension on a Q path shortcut https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
  const path = calculatePath(8);

  // TODO: setInterval for path change

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Path
          ref={pathRef}
          data={path}
          stroke="blue"
          strokeWidth={2}
          tension={0.35}
          lineCap="round"
          lineJoin="round"
          closed={true}
          fill="blue"
        />
      </Layer>
    </Stage>
  );
}

export default App;
