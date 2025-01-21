import { createAudioContext, loadAudioBuffer } from '@utils';
import { useMemo, useState } from 'react';

export function useAudioContext() {
  const [loading, setLoading] = useState(true);

  const context = useMemo(() => {
    const context = createAudioContext();

    loadAudioBuffer(context.audio, context.source, '/music.mp3').then(() =>
      setLoading(false)
    );

    return context;
  }, []);

  return { ...context, loading };
}
