import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import "./index.css";

import Key from "@/components/keyboard/Key";

import styles from "./index.css?module";
import { operands, operators } from "@/constants";

@Component
export default class Keyboard extends VueComponent {
  render() {
    return (
      <div class={styles.Keyboard}>
        <div class={styles.Numbers}>
          {operands.map(operand => {
            return <Key type={"Operand"} value={operand} />;
          })}
        </div>

        <div>
          {operators.map(operator => {
            return <Key type={"Operator"} value={operator} />;
          })}
        </div>
      </div>
    );
  }
}
