"use client";

import { Provider } from "react-redux";
import makeStore from "@/lib/store";

export default function Providers({ children }) {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
}
