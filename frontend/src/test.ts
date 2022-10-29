import { decorator } from "./decorator";

export class Test {
  @decorator("decorator")
  testCallback() {
    console.log("callback");
  }
}
