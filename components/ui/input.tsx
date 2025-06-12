import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, prefix, suffix, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      {prefix && <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500">{prefix}</div>}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm ring-offset-slate-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          prefix && "pl-9",
          suffix && "pr-9",
          className,
        )}
        ref={ref}
        {...props}
      />
      {suffix && <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500">{suffix}</div>}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
