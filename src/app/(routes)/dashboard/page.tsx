import { signOut } from "@/utils/auth";
import { requireUser } from "@/utils/hooks";

export default async function Dashboard() {
  const _session = await requireUser();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="font-bold text-4xl">Dashboard Page</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
