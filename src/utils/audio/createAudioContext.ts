// TODO: Figure out what is this
const FFT_POWER = 8;

export function createAudioContext() {
  const audio = new AudioContext();
  const source = audio.createBufferSource();

  // Create two separate analyzers for left and right channel.
  const analyserL = audio.createAnalyser();
  analyserL.smoothingTimeConstant = 0.25;
  analyserL.fftSize = Math.pow(2, FFT_POWER) * 2;

  const analyserR = audio.createAnalyser();
  analyserR.smoothingTimeConstant = analyserL.smoothingTimeConstant;
  analyserR.fftSize = analyserL.fftSize;

  // Create the buffer to receive the analyzed data.
  // const freqByteData = new Uint8Array(analyserL.frequencyBinCount);

  // Create a splitter to feed them both
  const splitter = audio.createChannelSplitter();

  // Connect audio processing graph
  source.connect(splitter);
  splitter.connect(analyserL, 0, 0);
  splitter.connect(analyserR, 1, 0);

  // Connect source to output also so we can hear it
  source.connect(audio.destination);

  return { source, audio };
}
