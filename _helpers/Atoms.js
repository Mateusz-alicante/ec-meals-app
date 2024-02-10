import { atomWithStorage } from "jotai/utils";

export const authAtom = atomWithStorage("auth", {
  token: undefined,
  username: undefined,
  role: undefined,
});
