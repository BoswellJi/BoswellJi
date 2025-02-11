import { createApp } from "vue";
import { App } from "@celljs/vue";
import Root from "./App.vue";

@App(createApp(Root))
export default class {}