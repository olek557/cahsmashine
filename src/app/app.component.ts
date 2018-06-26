import { Component, OnInit } from '@angular/core';

export interface IBankMoney {
  1: number;
  2: number;
  5: number;
  10: number;
  20: number;
  50: number;
  100: number;
  200: number;
  500: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent  implements OnInit {
  public moneyToTake: number;
  public bankMoney: IBankMoney = {
    1: 3,
    2: 3,
    5: 3,
    10: 3,
    20: 3,
    50: 3,
    100: 3,
    200: 2,
    500: 0
  };
  public availableBanknotes: number[];
  public allMoneyInCashmashine: number;
  private getAvailableBanknotes(): void {
    this.availableBanknotes = [];
    this.allMoneyInCashmashine = 0;
    Object.keys(this.bankMoney).forEach((i) => {
      if (this.bankMoney[+i] > 0) {
        this.availableBanknotes.push(+i);
        this.allMoneyInCashmashine = this.allMoneyInCashmashine + (this.bankMoney[+i] * +i);
      }
    });
  }

  private maxBanknote(sum: number, availableBanknotes: number[]) {
    let maxB = 0;
    availableBanknotes.forEach((i) => {
      if (sum >= i && i > maxB) {
        maxB = +i;
      }
    });
    return maxB;
  }
  public takeMoney(value) {
    let sum = value;
    this.getAvailableBanknotes();
    const maxB = this.maxBanknote(sum, this.availableBanknotes);
    if (this.availableBanknotes.length === 0 || maxB === 0) {
      return;
    }
    this.bankMoney[maxB] = this.bankMoney[maxB] - 1;
    sum = sum - maxB;
    console.log('maxB' + maxB);
    if (sum > 0) {
      this.takeMoney(sum);
    } else {
      return false;
    }
  }
  ngOnInit() {
    this.getAvailableBanknotes();
  }

}
