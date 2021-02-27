import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import styles from "./index.css?module";
import { CalculatorStore } from "@/store/store";
import { useStore } from "vuex-simple";

@Component
export default class CalculatorDisplay extends VueComponent {
  public store: CalculatorStore = useStore(this.$store);

  render() {
    return (
      <div class={styles.Display}>
        <p>{this.store.calculationResult}</p>
        <p>{this.store.currentInputSymbols}</p>
      </div>
    );
  }
}
