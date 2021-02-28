import { Component, Prop } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import "./index.css";

// @ts-ignore
import classNames from "classnames";
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
    const className = classNames({
      [styles.Key]: true,
      [styles.Key__Operator]: this.type === "Operator",
      [styles.Key__Operand]: this.type === "Operand"
    });

    return (
      <div class={className} onclick={() => this.handleClick()}>
        <p class={styles.KeyValue}>{this.value}</p>
      </div>
    );
  }
}
