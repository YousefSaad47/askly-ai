'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Icons } from '@/components/ui/icons';
import { Divider } from '@heroui/divider';

export default function SignUpPage() {
  return (
    <div className="flex justify-center mt-20">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <div className="w-[350px] md:w-[430px]">
                  <div className="flex flex-col gap-1 mb-4">
                    <h1 className="text-large font-medium">
                      Create your account
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
                    <Clerk.Field name="emailAddress" className="space-y-2 mb-6">
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
                    <Clerk.Field name="password" className="space-y-2 mb-6">
                      <Clerk.Label>Password</Clerk.Label>
                      <Clerk.Input type="password" required asChild>
                        <Input
                          label="Enter your password"
                          size="sm"
                          name="password"
                          variant="bordered"
                          radius="full"
                        />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-danger" />
                    </Clerk.Field>
                  </div>
                  <div className="grid w-full gap-y-4">
                    <SignUp.Captcha className="empty:hidden" />
                    <SignUp.Action submit asChild>
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
                    </SignUp.Action>

                    <Clerk.Link navigate="sign-in" className="text-center">
                      <p className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative after:absolute after:bg-primary text-primary cursor-pointer after:bottom-2 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 h-9 py-2 w-fit px-1">
                        Already have an account? Sign in
                      </p>
                    </Clerk.Link>
                  </div>
                </div>
              </SignUp.Step>

              <SignUp.Step name="continue">
                <div className="w-[350px] md:w-[430px]">
                  <div className="flex flex-col gap-1 mb-4">
                    <h1 className="text-large font-medium">
                      Continue registration
                    </h1>
                  </div>
                  <div className="grid gap-y-4">
                    <Clerk.Field name="username" className="space-y-2 mb-6">
                      <Clerk.Label>Username</Clerk.Label>
                      <Clerk.Input type="text" required asChild>
                        <Input
                          label="Enter your username"
                          size="sm"
                          name="username"
                          variant="bordered"
                          radius="full"
                        />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                  </div>
                  <div className="grid w-full gap-y-4">
                    <SignUp.Action submit asChild>
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
                    </SignUp.Action>
                  </div>
                </div>
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <div className="w-[350px] md:w-[430px]">
                    <div className="flex flex-col gap-1 mb-4">
                      <h1 className="text-large font-medium">
                        Verify your email
                      </h1>
                      <p className="text-small text-default-500">
                        Use the verification link sent to your email address
                      </p>
                    </div>
                    <div className="grid gap-y-4">
                      <div className="grid items-center justify-center gap-y-2">
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
                            <Clerk.FieldError className="block text-sm text-danger text-center" />
                            <SignUp.Action
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
                            </SignUp.Action>
                          </div>
                        </Clerk.Field>
                      </div>
                    </div>
                    <div>
                      <div className="grid w-full gap-y-4">
                        <SignUp.Action submit asChild>
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
                        </SignUp.Action>
                      </div>
                    </div>
                  </div>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}
