import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import styles from "./index.css?module";

@Component
export default class Loader extends VueComponent {
  render() {
    return <div class={styles.Loader} />;
  }
}
