import { Path as PathT } from 'konva/lib/shapes/Path';
import { Layer, Path, Stage } from 'react-konva';
import { calculatePath } from '@utils';
import { useRef } from 'react';

function App() {
  const pathRef = useRef<PathT>(null);

  // TODO: Calculate path with besier curves for smoothness
  // !Pay attension on a Q path shortcut https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
  const path = calculatePath(4);

  // TODO: setInterval for changing Path

  // useGSAP(() => {
  //   if (lineRef.current && lineRef.current.points().length)
  //     for (let i = 0; i < lineRef.current.points().length; i += 2) {
  //       gsap.to([i], {
  //         onUpdate: () => {
  //           if (lineRef.current?.points()) {
  //             let x = lineRef.current.points()[i];
  //             let y = lineRef.current.points()[i + 1];

  //             // Update the line's points dynamically
  //             x = x + Math.sin((Math.PI / 3) * i);
  //             y = y + Math.cos((Math.PI / 3) * i);

  //             const newPoints = lineRef.current.points() ?? [];

  //             newPoints[i] = x;
  //             newPoints[i + 1] = y;

  //             lineRef.current.points(newPoints);
  //             lineRef.current.getLayer()?.batchDraw(); // Redraw the layer
  //           }
  //         },
  //         duration: 0.5,
  //         delay: i * 0.5, // Stagger the animations
  //         // repeat: -1,
  //       });
  //     }
  // }, []);

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
        />
      </Layer>
    </Stage>
  );
}

export default App;
