"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & {
    statusCode?: number;
  };
}

export default function ErrorPage({ error }: ErrorPageProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return <NextError statusCode={error.statusCode || 500} title={error.message || "Something went wrong"} />;
}
