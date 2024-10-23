export async function loadAudioBuffer(
  audio: AudioContext,
  source: AudioBufferSourceNode,
  url: string
) {
  try {
    const bufferedResponse = await fetch(url).then((res) => res.arrayBuffer());

    audio.decodeAudioData(bufferedResponse, (buffer) => {
      source.buffer = buffer;

      // Toggle if needed
      source.loop = false;
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
