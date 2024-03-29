import * as React from "react";
import StackNavigator from "./navigators/StackNavigators";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import AuthContext from "./context/auth";
import { useState } from "react";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <ApolloProvider client={client}>
        <StackNavigator />
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
