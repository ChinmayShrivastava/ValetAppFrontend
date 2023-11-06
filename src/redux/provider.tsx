"use client"

import { store } from "./store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {

  const [isclient, setisclient] = useState(false)

  useEffect(() => {
    setisclient(true)
  }, [])

  return (
    <>
    { isclient &&
    <Provider store={store}>
      {children}
    </Provider>}
    </>
  )
}