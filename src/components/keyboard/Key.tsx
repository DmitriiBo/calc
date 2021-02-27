import { Component, Prop } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import "./index.css";

import styles from "./index.css?module";
import { CalculatorStore } from "@/store/store";
import { useStore } from "vuex-simple";
import { AllowedSymbol } from "@/types";

type KeyProps = {
  value: string | number;
  type: "Operator" | "Operand";
};

@Component
export default class Key extends VueComponent<KeyProps> {
  @Prop() value!: AllowedSymbol;
  @Prop() type!: "Operator" | "Operand";

  public store: CalculatorStore = useStore(this.$store);

  public addSymbol(symbol: AllowedSymbol): void {
    this.store.handleKeyClick(symbol);
  }

  handleClick = () => {
    if (this.store.isCalculating) {
      return;
    }

    this.addSymbol(this.value);
  };

  render() {
    const className =
      this.type === "Operator" ? styles.Key__Operator : styles.Key__Operand;

    return (
      <div
        class={`${styles.Key} ${className}`}
        onclick={() => this.handleClick()}
      >
        {this.value}
      </div>
    );
  }
}
