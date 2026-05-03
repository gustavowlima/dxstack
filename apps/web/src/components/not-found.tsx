import { buttonVariants } from "@stack/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@stack/ui/components/card";
import { IconHome, IconQuestionMark } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@stack/ui/utils";

export function NotFound() {
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/90 backdrop-blur-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="text-center pt-10">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl bg-primary/10 text-primary ring-8 ring-primary/5">
            <IconQuestionMark className="size-10 stroke-[2.5]" />
          </div>
          <CardTitle className="text-4xl font-black tracking-tight text-foreground">
            404
          </CardTitle>
          <p className="mt-2 text-lg font-bold text-muted-foreground">
            Page not found
          </p>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-muted-foreground font-medium leading-relaxed">
            The page you are looking for doesn't exist or has been moved. Please
            check the URL or return home.
          </p>
        </CardContent>
        <CardFooter className="bg-muted/30 p-8 border-t border-muted/50">
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-full h-12 rounded-2xl shadow-xl shadow-primary/20 font-bold transition-all active:scale-[0.98]",
            )}
          >
            <IconHome className="mr-2 size-5" />
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
