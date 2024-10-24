import { Path } from 'react-konva';

import Konva from 'konva';
import { usePath } from '@hooks';

type Props = Konva.PathConfig & {
  radius?: number;
};

const shadowProps = {
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 20,
  shadowOpacity: 1,
};

export function Figure({ radius, ...rest }: Props) {
  const { pathRef, pathData } = usePath({ radius });

  // TODO: Understand how to rotate paths correcty
  // Maybe wrap it into another element and rotate it?

  return <Path ref={pathRef} data={pathData.path} {...rest} {...shadowProps} />;
}
