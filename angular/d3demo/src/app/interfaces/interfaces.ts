export interface DemoData {
  Framework: string;
  Stars: number;
  Release: number;
}

export interface Fruit {
  id: number
  name: string;
  country: string;
}


export interface IPerson {
  firstName: string;
  lastName: string;
  city: string;
  birthday: Date;
  guid: string,
}


enum Direction {
  Sell = "SELL",
  Buy = "BUY"
}
