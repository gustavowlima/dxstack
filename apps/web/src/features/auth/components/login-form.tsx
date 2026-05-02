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
import { IconBrandGoogle, IconLoader2 } from "@tabler/icons-react";
import { useAuth } from "../hooks/use-auth";
import { loginSchema, signUpSchema } from "../schemas/auth";

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
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await loginWithEmail(value.email, value.password);
    },
  });

  const signUpForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      await signUpWithEmail(value.email, value.password, value.name);
    },
  });

  if (isSessionLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <IconLoader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (session) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            You are signed in as {session.user.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-sm text-muted-foreground">
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
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Access your account
        </CardTitle>
        <CardDescription>
          Enter your credentials below to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                signInForm.handleSubmit();
              }}
              className="space-y-4"
            >
              <signInForm.Field
                name="email"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="m@example.com"
                    />
                    {field.state.meta.errors ? (
                      <em className="text-[0.8rem] font-medium text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}
                  </div>
                )}
              />
              <signInForm.Field
                name="password"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors ? (
                      <em className="text-[0.8rem] font-medium text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}
                  </div>
                )}
              />
              {authError && (
                <p className="text-sm text-destructive font-medium">
                  {authError}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isAuthLoading}>
                {isAuthLoading && (
                  <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
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
              className="space-y-4"
            >
              <signUpForm.Field
                name="name"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="John Doe"
                    />
                    {field.state.meta.errors ? (
                      <em className="text-[0.8rem] font-medium text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}
                  </div>
                )}
              />
              <signUpForm.Field
                name="email"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={`${field.name}-signup`}>Email</Label>
                    <Input
                      id={`${field.name}-signup`}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="m@example.com"
                    />
                    {field.state.meta.errors ? (
                      <em className="text-[0.8rem] font-medium text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}
                  </div>
                )}
              />
              <signUpForm.Field
                name="password"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={`${field.name}-signup`}>Password</Label>
                    <Input
                      id={`${field.name}-signup`}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors ? (
                      <em className="text-[0.8rem] font-medium text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}
                  </div>
                )}
              />
              {authError && (
                <p className="text-sm text-destructive font-medium">
                  {authError}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isAuthLoading}>
                {isAuthLoading && (
                  <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isAuthLoading}
        >
          {!isAuthLoading && <IconBrandGoogle className="mr-2 h-4 w-4" />}
          {isAuthLoading && (
            <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Google
        </Button>
      </CardContent>
      <CardFooter>
        <p className="px-8 text-center text-sm text-muted-foreground leading-relaxed">
          By clicking continue, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
