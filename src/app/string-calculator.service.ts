import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringCalculatorService {

  constructor() { }

  add(numbers: string): number {
    if (numbers === "") {
      return 0;
    }

    let delimiter = /,|\n/;
    if (numbers.startsWith("//")) {
      const delimiterEndIndex = numbers.indexOf('\n');
      delimiter = new RegExp(numbers.substring(2, delimiterEndIndex));
      numbers = numbers.substring(delimiterEndIndex + 1);
    }

    const numberList = numbers.split(delimiter);
    let total = 0;
    let negatives: number[] = [];

    numberList.forEach(num => {
      if (num) {
        const n = parseInt(num, 10);
        if (n < 0) {
          negatives.push(n);
        }
        total += n;
      }
    });

    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed ${negatives.join(',')}`);
    }

    return total;
  }
}
