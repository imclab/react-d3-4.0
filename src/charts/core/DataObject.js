
export class DataObject {
  constructor() {
    this.series = [];
  }

  get dataLength() {
    return this.series.reduce((m, n) => m + n.length, 0);
  }

  export() {
    let result = [];

    for (let i = 0; i < this.series.length; i++) {
      for (let j = 0; j < this.series[i].length; j++) {
        result.push(this.series[i][j]);
      }
    }

    return result;
  }

  get minSeriesLength() {
    let min = null;

    for (let i = 0;i < this.series.length; i++) {
      if (min === null || this.series[i].length < min) {
        min = this.series[i].length;
      }
    }

    return min;
  }

}
