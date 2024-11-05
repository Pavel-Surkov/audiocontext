import { Path } from 'react-konva';

import Konva from 'konva';
import { useAudioContext, usePath } from '@hooks';

type Props = Konva.PathConfig & {
  radius?: number;
  audioContext?: ReturnType<typeof useAudioContext>;
  sphereNumber?: number;
};

const shadowProps = {
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 20,
  shadowOpacity: 1,
};

export function Figure({ radius, audioContext, sphereNumber, ...rest }: Props) {
  const { pathRef, pathData } = usePath({ radius, audioContext, sphereNumber });

  // TODO: Understand how to rotate paths correcty
  // Maybe wrap it into another element and rotate it?

  return <Path ref={pathRef} data={pathData.path} {...rest} {...shadowProps} />;
}
