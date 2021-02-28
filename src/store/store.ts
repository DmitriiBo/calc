import { Mutation, State, Getter } from "vuex-simple";
import {
  AllowedSymbol,
  CurrentInputSymbols,
  ExistsKeys,
  IntermediateOperator
} from "@/types";
import { operators } from "@/constants";

export class CalculatorStore {
  @State()
  private _currentInputSymbols: CurrentInputSymbols = [];

  @State()
  private _calculationResult: number | undefined;

  @State()
  private _isCalculating: boolean = false;

  @State()
  private _incomingDigitBuffer: string = '';

  // Utils
  private get lasInputSymbolIndex(): number {
    const index = this._currentInputSymbols.length - 1;

    return index >= 0 ? index : 0;
  }

  private get lastInputSymbol(): AllowedSymbol {
    return this._currentInputSymbols[this.lasInputSymbolIndex];
  }

  static isIntermediateOperator(symbol: AllowedSymbol): boolean {
    return ["+", "-"].includes(symbol as string);
  }

  private isRepeatedOperator(symbol: ExistsKeys) {
    return this.lastInputSymbol === symbol;
  }

  private isSwitched(): boolean {
    return this.lastInputSymbol === "+" || this.lastInputSymbol === "-";
  }

  private getSum() {
    let result = 0;
    let currentOperation: IntermediateOperator;

    this._currentInputSymbols.forEach((symbol, index) => {
      if (index === 0 && typeof symbol === "number") {
        result = symbol;

        return;
      }

      if (typeof symbol === "number") {
        currentOperation === "+" ? (result += symbol) : (result -= symbol);

        return;
      }

      currentOperation = symbol;
    });

    return result;
  }

  @Getter()
  public get currentInputSymbols(): string {
    let resultStr = "";

    this._currentInputSymbols.forEach(symbol => {
      if (CalculatorStore.isIntermediateOperator(symbol)) {
        resultStr += ` ${symbol} `;

        return;
      }

      resultStr += symbol;
    });

    return resultStr;
  }

  @Getter()
  public get calculationResult(): number | undefined {
    return this._calculationResult;
  }

  @Getter()
  public get isCalculating(): boolean {
    return this._isCalculating;
  }

  @Getter()
  public get incomingDigitBuffer(): string | undefined {
    return this._incomingDigitBuffer;
  }

  @Mutation()
  private calculate(): void {
    if (!this._currentInputSymbols.length) {
      return;
    }

    if (CalculatorStore.isIntermediateOperator(this.lastInputSymbol)) {
      this._currentInputSymbols.splice(this.lasInputSymbolIndex);
    }

    this._isCalculating = true;

    setTimeout(() => {
      this._calculationResult = this.getSum();

      this._isCalculating = false;
    }, 2000);
  }

  @Mutation()
  private addInputSymbols(symbol: AllowedSymbol): void {
    this._currentInputSymbols.push(symbol);
  }

  @Mutation()
  private clear(): void {
    this._currentInputSymbols = [];
    this._calculationResult = undefined;
    this._incomingDigitBuffer = '';
  }

  @Mutation()
  private toggleOperation(operator: IntermediateOperator): void {
    this._currentInputSymbols.splice(this.lasInputSymbolIndex, 1, operator);
  }

  public handleKeyClick(key: ExistsKeys) {
    if (typeof key === "number") {
      this._incomingDigitBuffer += key.toString();

      return;
    }

    if (operators.includes(key)) {
      if (!this._incomingDigitBuffer && this.isRepeatedOperator(key)) {
        return;
      }

      switch (key) {
        case "C":
          this.clear();

          break;
        case "+":
        case "-":
          if (!this._incomingDigitBuffer && this.isSwitched()) {
            this.toggleOperation(key);

            break;
          }

          if (this._incomingDigitBuffer) {
            this.addInputSymbols(parseInt(this._incomingDigitBuffer));

            this._incomingDigitBuffer = '';
          }

          this.addInputSymbols(key);

          break;
        case "=":
          if (this._incomingDigitBuffer) {
            this.addInputSymbols(parseInt(this._incomingDigitBuffer));

            this._incomingDigitBuffer = '';
          }

          this.calculate();

          break;
        default:
          this.clear();
      }
    }
  }
}
