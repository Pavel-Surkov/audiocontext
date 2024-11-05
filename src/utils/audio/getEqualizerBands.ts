// freqData is an array of (analyzer.fftSize / 2) items [MDN Reference](https://developer.mozilla.org/docs/Web/API/AnalyserNode/getByteFrequencyData)
// The function transforms it into array of NUMBER_OF_POINTS length by calculating average value
// for each (analyzer.fftSize / 2 / NUMBER_OF_POINTS) items

import { NUMBER_OF_POINTS } from 'constants';

const freqStripes = NUMBER_OF_POINTS / 2;

export function getEqualizerBands(freqData: Uint8Array<ArrayBuffer>) {
  const bands = [];

  const itemsToAvgValue = freqData.length / freqStripes;

  // const amount = Math.sqrt(freqData.length) / 2; // sqrt(256) / 2 -> 8

  // TODO: Figure out why does it work this way
  // for (let i = 0; i < amount; i++) {
  //   const start = Math.pow(2, i) - 1;
  //   const end = start * 2 + 1;
  //   let sum = 0;

  //   for (let j = start; j < end; j++) {
  //     sum += freqData[j];
  //   }

  //   const avg = sum / (255 * (end - start));
  //   bands[i] = Math.sqrt(avg / Math.sqrt(2));
  // }

  for (let i = 0; i < freqStripes; i++) {
    const start = i * itemsToAvgValue;
    const end = start + itemsToAvgValue;
    let sum = 0;

    for (let j = start; j < end; j++) {
      sum += freqData[j];
    }

    // Normalized average value
    const avg = sum / (255 * itemsToAvgValue);
    bands[i] = avg;
  }

  return bands;
}
