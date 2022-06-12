import { DemoData } from '../interfaces/interfaces';

export function maxStars(inputList: DemoData[]): number{
  return Math.max(...inputList.map(function(element: DemoData) { return element.Stars; }));
}
