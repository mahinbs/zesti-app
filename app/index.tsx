import { Redirect } from "expo-router";
import React from "react";

/**
 * Root index — redirects to the home screen.
 */
export default function Index() {
    return <Redirect href={"/(tabs)/home" as any} />;
}
