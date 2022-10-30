import { decorator } from "./decorator";
// require("dotenv").config();

export class Test {
  @decorator("decorator")
  testCallback() {
    console.log("callback", process.env.API_URI);
  }
}
