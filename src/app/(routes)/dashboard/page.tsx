import { signOut } from "@/utils/auth";
import { requireUser } from "@/utils/hooks";

export default async function Dashboard() {
    const session = await requireUser();

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <h1>Dashboard Page</h1>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
                >
                <button type="submit">Sign Out</button>
            </form>
        </div>
    )
}
