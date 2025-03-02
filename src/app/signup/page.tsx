import { AnimatedBackground } from "@/components/animated-background";
import { HotTakesLogo } from "@/components/hot-takes-logo";
import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-md mx-auto">
          <HotTakesLogo className="mb-4" />
          <div className="w-full p-8 bg-card border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">create an account</h1>
            <SignupForm />
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-muted-foreground">
          <p>© 2025 hot takes. moderated by AI.</p>
        </footer>
      </div>
    </>
  );
}
