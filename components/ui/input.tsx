"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  divClassName?: string;
  divStyle?: object;
  unit?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, divClassName, divStyle, unit, ...props }, ref) => {
    const [passwordType, setType] = React.useState("password");
    const isPassword = type === "password";
    const changeType = () => {
      return passwordType === "password"
        ? setType("text")
        : setType("password");
    };

    return (
      <div className={cn("relative", divClassName)} style={divStyle}>
        <input
          type={isPassword ? passwordType : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={changeType}
            className="absolute top-0 right-2 hover:bg-inherit"
          >
            {passwordType === "password" ? (
              <FaRegEye className="h-4 w-4" color="rgb(75 85 99)" />
            ) : (
              <FaEyeSlash className="h-4 w-4" color="rgb(75 85 99)" />
            )}
          </Button>
        )}
        {unit && (
          <div className="absolute top-0 right-0 h-full">
            <div className="flex w-full h-full items-center justify-end pr-4">
              <p className="text-slate-500">{unit}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
