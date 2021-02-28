import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import styles from "./index.css?module";
import { CalculatorStore } from "@/store/store";
import { useStore } from "vuex-simple";
import Loader from "@/components/loader";

@Component
export default class CalculatorDisplay extends VueComponent {
  public store: CalculatorStore = useStore(this.$store);

  render() {
    const {
      currentInputSymbols,
      calculationResult,
      isCalculating,
      incomingDigitBuffer
    } = this.store;

    const calculationResultString = () => {
      if (calculationResult === undefined) {
        return "";
      }

      return `= ${calculationResult}`;
    };

    const inputString = () => {
      console.log(currentInputSymbols, incomingDigitBuffer);
      const includedDigits = currentInputSymbols || "";
      const incomingDigits = incomingDigitBuffer || "";

      return `${includedDigits} ${incomingDigits}`;
    };

    return (
      <div class={styles.Display}>
        <div class={styles.DisplayValue}>
          <span class={styles.Input}>{inputString()}</span>
        </div>

        <div class={styles.DisplayValue}>
          {isCalculating ? <Loader /> : calculationResultString()}
        </div>
      </div>
    );
  }
}
