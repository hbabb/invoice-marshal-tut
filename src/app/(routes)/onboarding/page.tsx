"use client";

import { SubmitButton } from "@/components/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onboardUser } from "@/lib/actions/actions";
import { onboardingSchema } from "@/lib/schemas/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

export default function Onboarding() {
  const [lastResult, action] = useActionState(onboardUser, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="-z-10 absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] bg-white">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]" />
      </div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">You are almost finished!</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input
                  name={fields.firstName.name}
                  key={fields.firstName.key}
                  defaultValue={fields.firstName.initialValue}
                  placeholder="John"
                />
                <p className="text-red-500 text-sm">{fields.firstName.errors}</p>
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  name={fields.lastName.name}
                  key={fields.lastName.key}
                  defaultValue={fields.lastName.initialValue}
                  placeholder="Doe"
                />
                <p className="text-red-500 text-sm">{fields.lastName.errors}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Address</Label>
              <Input
                name={fields.address.name}
                key={fields.address.key}
                defaultValue={fields.address.initialValue}
                placeholder="Chad street 123"
              />
              <p className="text-red-500 text-sm">{fields.address.errors}</p>
            </div>

            <SubmitButton text="Finish onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
