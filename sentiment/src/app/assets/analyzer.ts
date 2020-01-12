import {sentimentGermanPositive} from './sentiment_german_positive';
import {sentimentGermanNegative} from './sentiment_german_negative';

export class Analyzer {
  constructor(
    private positive: {[label: string]: number},
    private negative: {[label: string]: number},
    private batcher: (text: string) => string[],
    private batchSize = 1000
  ) {}

  static german(): Analyzer {
    return new Analyzer(
        sentimentGermanPositive,
        sentimentGermanNegative,
        text => text.toLocaleLowerCase().split(/[^a-zäöüß]/)
      );
  }

  public analyze(text: string): {sentiment: number, spread: number} {
    const batch = this.batcher(text);
    const pos = batch.map(e => this.positive[e] || 0).filter(e => e !== 0);
    const neg = batch.map(e => this.negative[e] || 0).filter(e => e !== 0);
    const posSum = pos.reduce(((previousValue, currentValue) => currentValue + previousValue), 0);
    const negSum = neg.reduce(((previousValue, currentValue) => currentValue + previousValue), 0);
    return {sentiment: posSum + negSum, spread: Math.sqrt(posSum * posSum - negSum * negSum)};
  }
}
