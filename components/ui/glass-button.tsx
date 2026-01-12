"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlassButtonProps extends ButtonProps {
  icon?: React.ReactNode
  iconColor?: string
  flipDirection?: "horizontal" | "vertical"
  blurAmount?: "sm" | "md" | "lg"
}

export function GlassButton({
  children,
  className,
  icon,
  iconColor = "text-white",
  flipDirection = "vertical",
  blurAmount = "md",
  ...props
}: GlassButtonProps) {
  const rotateProp = flipDirection === "horizontal" ? "rotateY" : "rotateX"

  const customItemVariants = {
    initial: { [rotateProp]: 0, opacity: 1 },
    hover: { [rotateProp]: -90, opacity: 0 },
  }

  const customBackVariants = {
    initial: { [rotateProp]: 90, opacity: 0 },
    hover: { [rotateProp]: 0, opacity: 1 },
  }

  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
  }

  const sharedTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.5,
  }

  const baseButtonClasses = cn(
    "bg-transparent text-white border border-white/30",
    "shadow-sm hover:shadow-md",
    "transition-all duration-300",
    blurClasses[blurAmount],
    "group",
  )

  return (
    <motion.div
      className={cn("relative inline-block", className)}
      style={{ perspective: "600px" }}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        variants={customItemVariants}
        transition={sharedTransition}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: flipDirection === "horizontal" ? "left center" : "center bottom",
        }}
      >
        <Button {...props} className={baseButtonClasses}>
          {icon && <span className={cn("mr-2", iconColor)}>{icon}</span>}
          <span>{children}</span>
        </Button>
      </motion.div>

      <motion.div
        variants={customBackVariants}
        transition={sharedTransition}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: flipDirection === "horizontal" ? "right center" : "center top",
          [rotateProp]: 90,
        }}
        className="absolute inset-0 z-10"
      >
        <Button {...props} className={baseButtonClasses}>
          {icon && <span className={cn("mr-2", iconColor)}>{icon}</span>}
          <span>{children}</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
