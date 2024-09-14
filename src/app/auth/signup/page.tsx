"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PasswordVisibility } from "@/utils/passwordVisibility";
import { BarChart2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SignUp, SignUpSchema } from "@/schema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { userRegister } from "@/actions/register";
import { useUserStore } from "@/store/user-store";

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useUserStore();

  const defaultState: SignUp = {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    homeAddress: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<SignUp>({
    defaultValues: defaultState,
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignUp) => {
    try {
      const res = await userRegister({
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        emailAddress: values.emailAddress,
        homeAddress: values.homeAddress,
        userRole: "ROLE_FARMER",
        password: values.password,
      });
      if (res) login(res.data.dto);
      router.push("/booking");
    } catch (e) {
      toast({
        title: "Authentication failed!",
        description: "Something wrong",
      });
    }
  };

  return (
    <div className="flex screen">
      {/* Left side of the screen hidden on small & medium screens */}
      <div className="hidden lg:flex flex-[11] flex-col justify-center items-center bg-blue-600">
        <div className="info-box">
          <div className="info-content">
            <h1 className="text-blue">Already have an account? Sign in!</h1>
            <p className="text-blue pt-3">
              Enter your personal details and start a wonderful journey with us!
            </p>
          </div>

          <div className="absolute bottom-0 right-10 w-3/12">
            <Link href={`/auth/login/`}>
              <Button
                className="w-full bg-blue-800 my-5 rounded-full hover:bg-blue-900"
                variant={"default"}
              >
                Sign in
              </Button>
            </Link>
          </div>

          {/* Rating box */}
          <div className="rating-box shadow-all">
            <BarChart2Icon
              className="self-center"
              style={{ color: "blue" }}
              strokeWidth={3}
            />
            <div className="pl-5 text-blue-800">
              <span className="block text-sm"> Our rating among farms! </span>
              <span className="block text-xl font-bold"> 0.85 </span>
            </div>
          </div>
        </div>

        <div className="text-white text-center w-3/5">
          <h1 className="pt-20 pb-10 text-3xl font-bold">Come Join Us!</h1>
          <p className="text-balance">
            By signing up, you will gain access to among the most reliable, and
            experienced sprayer team, among many perks and rewards...
          </p>
        </div>
      </div>

      {/* Right side of the screen, full width on small & medium screens */}
      <div className="flex-[9] flex flex-col justify-center items-center w-full lg:w-auto">
        <h1 className="font-bold text-4xl text-blue whitespace-nowrap py-10">
          Account Creation
        </h1>

        <div className="w-4/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Full Name</FormLabel>
                    <Input {...field} placeholder="Enter your full name:" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Phone Number</FormLabel>
                    <Input {...field} placeholder="Enter your phone number:" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Address Field */}
              <FormField
                name="emailAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Email Address</FormLabel>
                    <Input {...field} placeholder="Enter your email address:" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Home Address Field */}
              <FormField
                name="homeAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Home Address</FormLabel>
                    <Input {...field} placeholder="Enter your home address:" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <PasswordVisibility
                      {...field}
                      placeholder="Enter your password:"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <PasswordVisibility
                      {...field}
                      placeholder="Confirm your password:"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-4 bg-blue-800 rounded-lg hover:bg-blue-900"
                variant={"default"}
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </div>

        {/* Separation Line */}
        <div className="w-2/5 justify-center my-5 flex items-center">
          <Separator className="ml-12" />
          <span className="text-sm"> OR </span>
          <Separator className="mr-12" />
        </div>

        {/* Social login*/}
        <div className="flex flex-col justify-center items-center ">
          <Link href={``}>
            <Button className="mx-2 rounded-full mb-2 w-96" variant={"outline"}>
              Continue with Google
            </Button>
          </Link>

          <Link href={``}>
            <Button className="mx-2 rounded-full w-96 mb-2" variant={"outline"}>
              Continue with Facebook
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
