import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import CalculatorDisplay from "@/components/display";
import Keyboard from "@/components/keyboard";

import styles from "./index.css?module";


@Component
export default class Calculator extends VueComponent {
  render() {
    return (
      <div class={styles.Calculator}>
        <CalculatorDisplay />
        <Keyboard />
      </div>
    );
  }
}
