"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { Toaster } from 'sonner';
import { store } from "@/redux/store";

function RootProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any;
}) {
  return (
    <>
    
    {/* <SessionProvider session={session}> */}
      <Provider store={store}>{children}</Provider>
    {/* </SessionProvider> */}
          <Toaster />

    </>
  );
}

export default RootProviders;
