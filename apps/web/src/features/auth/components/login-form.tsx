import { useForm } from "@tanstack/react-form";
import { Button } from "@stack/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@stack/ui/components/card";
import { Input } from "@stack/ui/components/input";
import { Label } from "@stack/ui/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@stack/ui/components/tabs";
import {
  IconBrandGoogle,
  IconLoader2,
  IconShieldLock,
} from "@tabler/icons-react";
import { useAuth } from "../hooks/use-auth";
import { loginSchema, signUpSchema } from "../schemas/auth";

function FieldError({ errors }: { errors: unknown[] | undefined }) {
  if (!errors?.length) return null;
  const messages = errors.map((e) =>
    typeof e === "string" ? e : (e as { message: string }).message
  );
  return <p className="text-xs text-destructive">{messages.join(", ")}</p>;
}

export function LoginForm() {
  const {
    session,
    isSessionLoading,
    isLoading: isAuthLoading,
    error: authError,
    handleGoogleLogin,
    loginWithEmail,
    signUpWithEmail,
    logout,
  } = useAuth();

  const signInForm = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onChange: loginSchema },
    onSubmit: async ({ value }) => {
      await loginWithEmail(value.email, value.password);
    },
  });

  const signUpForm = useForm({
    defaultValues: { name: "", email: "", password: "" },
    validators: { onChange: signUpSchema },
    onSubmit: async ({ value }) => {
      await signUpWithEmail(value.email, value.password, value.name);
    },
  });

  if (isSessionLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <IconLoader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (session) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconShieldLock className="size-6" />
          </div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Signed in as{" "}
            <span className="font-medium text-foreground">
              {session.user.name}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background font-semibold text-primary shadow-sm">
              {session.user.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{session.user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={logout}
            disabled={isAuthLoading}
          >
            {isAuthLoading && (
              <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign out
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Stack Start</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-6 p-6">
          <Tabs defaultValue="signin" className="flex-col">
            <TabsList className="flex w-full">
              <TabsTrigger value="signin" className="flex-1">Sign in</TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  signInForm.handleSubmit();
                }}
                className="flex flex-col gap-4 pt-4"
              >
                <signInForm.Field
                  name="email"
                  children={(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor={field.name}>Email</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                />
                <signInForm.Field
                  name="password"
                  children={(field) => (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={field.name}>Password</Label>
                        <a
                          href="#"
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        autoComplete="current-password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                />
                {authError && (
                  <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {authError}
                  </p>
                )}
                <Button type="submit" className="w-full" disabled={isAuthLoading}>
                  {isAuthLoading ? (
                    <IconLoader2 className="size-4 animate-spin" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  signUpForm.handleSubmit();
                }}
                className="flex flex-col gap-4 pt-4"
              >
                <signUpForm.Field
                  name="name"
                  children={(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor={field.name}>Full name</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="John Doe"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                />
                <signUpForm.Field
                  name="email"
                  children={(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor={`${field.name}-signup`}>Email</Label>
                      <Input
                        id={`${field.name}-signup`}
                        name={field.name}
                        type="email"
                        placeholder="name@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                />
                <signUpForm.Field
                  name="password"
                  children={(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor={`${field.name}-signup`}>Password</Label>
                      <Input
                        id={`${field.name}-signup`}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                />
                {authError && (
                  <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {authError}
                  </p>
                )}
                <Button type="submit" className="w-full" disabled={isAuthLoading}>
                  {isAuthLoading ? (
                    <IconLoader2 className="size-4 animate-spin" />
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isAuthLoading}
            >
              {isAuthLoading ? (
                <IconLoader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <IconBrandGoogle className="mr-2 size-4" />
                  Continue with Google
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="#" className="underline hover:text-foreground">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
