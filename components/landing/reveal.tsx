"use client"

import * as React from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

type RevealDirection = "up" | "down" | "left" | "right" | "none"

const OFFSET = 24

const directionOffset: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: OFFSET },
  down: { x: 0, y: -OFFSET },
  left: { x: OFFSET, y: 0 },
  right: { x: -OFFSET, y: 0 },
  none: { x: 0, y: 0 },
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Direction the element travels from as it enters. */
  direction?: RevealDirection
  /** Delay in seconds before the animation starts. */
  delay?: number
  /** Adds a gentle scale-in alongside the fade. */
  scale?: boolean
  as?: "div" | "section" | "span"
}

/**
 * Scroll-triggered entrance animation used across the landing page.
 * Fires once, stays subtle, and disables itself when the user prefers
 * reduced motion.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  scale = false,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[as]

  if (prefersReducedMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const offset = directionOffset[direction]

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: scale ? 0.98 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  )
}
