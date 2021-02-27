import { Component, Vue } from "vue-property-decorator";

import "./App.css";
import Calculator from "@/components/calculator";

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <Calculator />
      </div>
    );
  }
}
