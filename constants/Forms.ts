import { ThemedInputProps } from "@/components/ui/ThemedInput";

// Login Fields
export const loginFields: ThemedInputProps[] = [
  {
    label: "Email",
    name: "email",
    autoComplete: "email",
    helperText: "you@gmail.com",
    leftIcon: "envelope",
    keyboardType: "email-address",
  },
  {
    label: "Password",
    name: "password",
    autoComplete: "current-password",
    helperText: "Enter your password",
    leftIcon: "lock",
    keyboardType: "default",
    isPassword: true,
  },
];

// SignUp Fields
export const signupFields: ThemedInputProps[] = [
  {
    label: "First Name",
    name: "firstName",
    helperText: "John",
    keyboardType: "default",
    leftIcon: "user",
  },
  {
    label: "Last Name",
    name: "lastName",
    helperText: "Doe",
    leftIcon: "user",
  },
  {
    label: "Email Address",
    name: "email",
    helperText: "john.doe@example.com",
    leftIcon: "envelope",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
  {
    label: "Password",
    name: "password",
    helperText: "Create a strong password",
    leftIcon: "lock",
    keyboardType: "default",
    isPassword: true,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    helperText: "Confirm your password",
    leftIcon: "lock",
    keyboardType: "default",
    isPassword: true,
  },
];
