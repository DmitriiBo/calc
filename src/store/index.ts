import Vue from "vue";
import Vuex from "vuex";
import { createVuexStore } from "vuex-simple";
import { CalculatorStore } from "@/store/store";

const instance = new CalculatorStore();

Vue.use(Vuex);

export default createVuexStore(instance);
