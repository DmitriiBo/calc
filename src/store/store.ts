import { Action, Mutation, State, Getter } from "vuex-simple";
import { AllowedSymbol, CurrentInputSymbols } from "@/types";
import { operators } from "@/constants";

export class CalculatorStore {
  @State()
  private _currentInputSymbols: CurrentInputSymbols = [];

  @State()
  private _calculationResult: number = 0;

  @State()
  private _isCalculating: boolean = false;

  private get lasInputSymbolIndex(): number {
    const index = this._currentInputSymbols.length - 1;

    return index >= 0 ? index : 0;
  }

  private get lastInputSymbol(): AllowedSymbol {
    return this._currentInputSymbols[this.lasInputSymbolIndex];
  }

  @Getter()
  public get currentInputSymbols(): CurrentInputSymbols {
    return this._currentInputSymbols;
  }

  @Getter()
  public get calculationResult(): number | 0 {
    return this._calculationResult;
  }

  @Getter()
  public get isCalculating(): boolean {
    return this._isCalculating;
  }

  @Mutation()
  private calculate(): void {
    if (!this._currentInputSymbols.length) {
      return;
    }

    if (["+", "-"].includes(this.lastInputSymbol as string)) {
      this._currentInputSymbols.splice(this.lasInputSymbolIndex);
    }

    this._isCalculating = true;

    setTimeout(() => {
      this._calculationResult = eval(this._currentInputSymbols.join(""));

      this._isCalculating = false;
    }, 1000);
  }

  @Mutation()
  private addInputSymbols(symbol: AllowedSymbol): void {
    this._currentInputSymbols.push(symbol);
  }

  @Mutation()
  private clear(): void {
    this._currentInputSymbols = [];
  }

  @Mutation()
  private toggleOperation(operator: "+" | "-"): void {
    this._currentInputSymbols.splice(this.lasInputSymbolIndex, 1, operator);
  }

  private isRepeatedOperator(symbol: AllowedSymbol) {
    return this.lastInputSymbol === symbol;
  }

  private isSwitched(): boolean {
    return this.lastInputSymbol === "+" || this.lastInputSymbol === "-";
  }

  public handleKeyClick(key: AllowedSymbol) {
    if (typeof key === "number") {
      this.addInputSymbols(key);

      return;
    }

    if (operators.includes(key)) {
      if (this.isRepeatedOperator(key)) {
        return;
      }

      switch (key) {
        case "C":
          this.clear();

          break;
        case "+":
        case "-":
          if (this.isSwitched()) {
            this.toggleOperation(key);

            break;
          }

          this.addInputSymbols(key);

          break;
        case "=":
          this.calculate();

          break;
        default:
          this.clear();
      }
    }
  }
}
