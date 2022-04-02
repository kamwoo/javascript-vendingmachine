import { CoinsType } from '../types/types';
import { COINS } from '../constants/vendingMachineConstants';
import { generateRandom } from '../utils/common';

export default class CoinManager {
  private _coins: CoinsType = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };

  get coins() {
    return this._coins;
  }

  get coinsSum() {
    return this.getSumCoins(this._coins);
  }

  chargeCoin(inputMoney: number) {
    this.addRandomCoins(inputMoney);
  }

  private addRandomCoins(money: number) {
    let restMoney = money;

    Object.keys(this.coins).forEach(key => {
      if (key === 'ten') {
        this.coins[key] += restMoney / COINS[key];
        return;
      }
      const randomNumber = generateRandom(Math.floor(restMoney / COINS[key]));
      restMoney -= randomNumber * COINS[key];
      this.coins[key] += randomNumber;
    });
  }

  private getSumCoins(coins: CoinsType) {
    const initialAmount = 0;

    return Object.keys(coins).reduce(
      (previous, current) => previous + COINS[current] * this._coins[current],
      initialAmount
    );
  }
}
