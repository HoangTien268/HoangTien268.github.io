// cartState.ts
import { atom } from "recoil";

export const cartState = atom({
  key: "cartState",
  default: [] as any[],
});
