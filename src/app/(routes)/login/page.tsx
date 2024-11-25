

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/SubmitButton";
import { auth, signIn } from "@/utils/auth";



export default function Login() {
  return (
    <>
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="max-w-sm lg:max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Login
                    </CardTitle>
                    <CardDescription>
                        Please enter your email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={async (formData) => {
                        "use server";
                        await signIn("nodemailer", formData);
                        }}
                        className="flex flex-col gap-y-4"
                    >
                        <div className="flex flex-col gap-y-2">
                            <Label>Email</Label>
                            <Input
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <SubmitButton text="Login" />
                    </form>
                </CardContent>
            </Card>
        </div>
    </>
  )
}
