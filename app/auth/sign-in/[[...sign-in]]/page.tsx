'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Icons } from '@/components/ui/icons';
import { Divider } from '@heroui/divider';

export default function SignInPage() {
  return (
    <div className="flex justify-center mt-20">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start">
                <div className="w-[430px]">
                  <div className="flex flex-col gap-1 mb-4">
                    <h1 className="text-large font-medium">
                      Sign in to your account
                    </h1>
                    <p className="text-small text-default-500">
                      to continue to AsklyAI
                    </p>
                  </div>

                  <div className="grid gap-y-4">
                    <div className="grid grid-cols-2 gap-x-4">
                      <Clerk.Connection name="google" asChild>
                        <Button
                          variant="bordered"
                          type="button"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.google className="mr-2 size-4" />
                                  Google
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name="github" asChild>
                        <Button
                          variant="bordered"
                          type="button"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading scope="provider:github">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.gitHub className="mr-2 size-4" />
                                  GitHub
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>
                    <div className="flex items-center gap-4 py-2">
                      <Divider className="flex-1" />
                      <p className="shrink-0 text-tiny text-default-500">OR</p>
                      <Divider className="flex-1" />
                    </div>
                    <Clerk.Field name="identifier" className="space-y-2 mb-6">
                      <Clerk.Label>Email</Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input
                          label="Enter your email"
                          size="sm"
                          name="email"
                          variant="bordered"
                          radius="full"
                        />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-danger" />
                    </Clerk.Field>
                  </div>
                  <div className="grid w-full gap-y-2">
                    <SignIn.Action submit asChild>
                      <Button
                        radius="full"
                        color="primary"
                        disabled={isGlobalLoading}
                      >
                        <Clerk.Loading>
                          {(isLoading) => {
                            return isLoading ? (
                              <Icons.spinner className="size-4 animate-spin" />
                            ) : (
                              'Continue'
                            );
                          }}
                        </Clerk.Loading>
                      </Button>
                    </SignIn.Action>

                    <Clerk.Link navigate="sign-up" className="text-center">
                      <p className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative after:absolute after:bg-primary text-primary cursor-pointer after:bottom-2 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 h-9 py-2 w-fit px-1">
                        Don&apos;t have an account? Sign up
                      </p>
                    </Clerk.Link>
                  </div>
                </div>
              </SignIn.Step>

              <SignIn.Step name="choose-strategy">
                <div className="w-[430px]">
                  <h1 className="mb-4">
                    Use another method Facing issues? You can use any of these
                    methods to sign in.
                  </h1>
                  <div className="grid gap-y-4">
                    <SignIn.SupportedStrategy name="email_code" asChild>
                      <Button
                        className="mb-4 w-1/2 mx-auto"
                        type="button"
                        color="warning"
                        variant="flat"
                        disabled={isGlobalLoading}
                      >
                        Email code
                      </Button>
                    </SignIn.SupportedStrategy>
                    <SignIn.SupportedStrategy name="password" asChild>
                      <Button
                        type="button"
                        className="mb-4 w-1/2 mx-auto"
                        color="warning"
                        variant="flat"
                        disabled={isGlobalLoading}
                      >
                        Password
                      </Button>
                    </SignIn.SupportedStrategy>
                  </div>
                  <div>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action navigate="previous" asChild>
                        <Button
                          color="primary"
                          radius="full"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                'Go back'
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </div>
                  </div>
                </div>
              </SignIn.Step>

              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <div className="w-[430px]">
                    <h1>Check your email</h1>
                    <h2>Enter the verification code sent to your email</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Welcome back <SignIn.SafeIdentifier />
                    </p>
                    <div className="grid gap-y-4">
                      <Clerk.Field name="password" className="space-y-2 mb-6">
                        <Clerk.Label>Password</Clerk.Label>
                        <Clerk.Input required type="password" asChild>
                          <Input
                            size="sm"
                            label="Enter your password"
                            variant="bordered"
                            radius="full"
                            name="password"
                          />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-danger" />
                      </Clerk.Field>
                    </div>
                    <div>
                      <div className="grid w-full gap-y-2">
                        <SignIn.Action submit asChild>
                          <Button
                            radius="full"
                            color="primary"
                            disabled={isGlobalLoading}
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  'Continue'
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <p className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative after:absolute after:bg-white cursor-pointer after:bottom-2 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 h-9 py-2 w-fit px-1 mx-auto">
                            Use another method
                          </p>
                        </SignIn.Action>
                      </div>
                    </div>
                  </div>
                </SignIn.Strategy>

                <SignIn.Strategy name="email_code">
                  <div className="w-full sm:w-96">
                    <h1>Check your email</h1>
                    <h2>Enter the verification code sent to your email</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Welcome back <SignIn.SafeIdentifier />
                    </p>
                    <div className="grid gap-y-4">
                      <Clerk.Field name="code" className="mb-6">
                        <Clerk.Label className="sr-only">
                          Email verification code
                        </Clerk.Label>
                        <div className="grid gap-y-2 items-center justify-center">
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring"
                                  >
                                    {value}
                                  </div>
                                );
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="block text-sm text-danger" />
                          <SignIn.Action
                            asChild
                            resend
                            className="text-muted-foreground"
                            fallback={({ resendableAfter }) => (
                              <Button
                                radius="full"
                                color="warning"
                                variant="flat"
                                size="sm"
                                disabled
                              >
                                Didn&apos;t receive a code? Resend (
                                <span className="tabular-nums">
                                  {resendableAfter}
                                </span>
                                )
                              </Button>
                            )}
                          >
                            <Button
                              radius="full"
                              color="warning"
                              variant="flat"
                              size="sm"
                            >
                              Didn&apos;t receive a code? Resend
                            </Button>
                          </SignIn.Action>
                        </div>
                      </Clerk.Field>
                    </div>
                    <div>
                      <div className="grid w-full gap-y-2">
                        <SignIn.Action submit asChild>
                          <Button
                            radius="full"
                            color="primary"
                            disabled={isGlobalLoading}
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  'Continue'
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <p className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative after:absolute after:bg-white cursor-pointer after:bottom-2 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 h-9 py-2 w-fit px-1 mx-auto">
                            Use another method
                          </p>
                        </SignIn.Action>
                      </div>
                    </div>
                  </div>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
