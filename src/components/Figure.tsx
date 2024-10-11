import { Path } from 'react-konva';

import Konva from 'konva';
import { usePath } from '@hooks';

type Props = Konva.PathConfig & {
  numPoints: number;
  radius: number;
};

const shadowProps = {
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 20,
  shadowOpacity: 1,
};

export function Figure({ numPoints, radius, ...rest }: Props) {
  const { pathRef, pathData } = usePath({ numPoints, radius });

  return <Path ref={pathRef} data={pathData.path} {...rest} {...shadowProps} />;
}
