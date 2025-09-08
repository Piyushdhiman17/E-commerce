import Image from "next/image";
import { images } from "~/assets/images";
import { svgs } from "~/assets/svgs";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { signIn } from "~/lib/auth";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 px-6 py-12 md:py-20">
      <Card className="w-full max-w-7xl rounded-3xl shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
        <CardContent className="p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
          {/* Left content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-4">
              Welcome Back 👋
            </h1>
            <p className="mb-8 max-w-sm text-gray-600 dark:text-gray-300">
              Sign in to your account to access your dashboard and personalized
              features.
            </p>
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
              className="w-full max-w-xs"
            >
              <Button
                type="submit"
                variant="outline"
                size="lg"
                className="flex items-center justify-center gap-3 w-full border-indigo-500 text-indigo-700 hover:text-indigo-800 hover:border-indigo-600 dark:text-indigo-400 dark:border-indigo-400 dark:hover:text-indigo-300"
              >
                <Image
                  src={svgs.google}
                  alt="Google Logo"
                  width={20}
                  height={20}
                  className="inline-block"
                  priority
                />
                Continue with Google
              </Button>
            </form>
            <p className="mt-6 text-xs text-gray-400 max-w-xs leading-relaxed">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-indigo-600"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-indigo-600"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Right image */}
          <div className="hidden md:block flex-1 relative w-full max-w-lg h-80 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={images.e_commerce}
              alt="E-Commerce Illustration"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg filter brightness-90 dark:brightness-75 grayscale-0 dark:grayscale"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
