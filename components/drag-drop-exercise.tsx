"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DragItem {
  id: string
  label: string
  type: string
}

interface DropTarget {
  id: string
  description: string
  acceptedItemId: string
}

interface DragDropExerciseProps {
  instructions: string
  items: DragItem[]
  targets: DropTarget[]
  difficulty?: string
}

export function DragDropExercise({ instructions, items, targets, difficulty }: DragDropExerciseProps) {
  const [dragItems, setDragItems] = useState<DragItem[]>(items)
  const [dropTargets, setDropTargets] = useState<(DropTarget & { itemId?: string; correct?: boolean })[]>(targets)
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DragItem | null>(null)
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null)

  useEffect(() => {
    // Check if we're on mobile
    setIsMobile(window.innerWidth < 768)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()

    if (!draggedItem) return

    const updatedTargets = dropTargets.map((target) => {
      if (target.id === targetId) {
        const correct = target.acceptedItemId === draggedItem.id
        return {
          ...target,
          itemId: draggedItem.id,
          correct,
        }
      }
      return target
    })

    setDropTargets(updatedTargets)

    // Remove the item from available items
    setDragItems(dragItems.filter((item) => item.id !== draggedItem.id))
    setDraggedItem(null)

    // Check if all targets have items
    const allFilled = updatedTargets.every((target) => target.itemId)
    if (allFilled) {
      setIsComplete(true)
      // Calculate score
      const correctCount = updatedTargets.filter((target) => target.correct).length
      setScore(Math.round((correctCount / updatedTargets.length) * 100))
    }
  }

  const handleMobileItemSelect = (item: DragItem) => {
    setSelectedItem(item)
    setSelectedTarget(null)
  }

  const handleMobileTargetSelect = (targetId: string) => {
    if (!selectedItem) return

    setSelectedTarget(targetId)

    // Place the item in the target
    const updatedTargets = dropTargets.map((target) => {
      if (target.id === targetId) {
        const correct = target.acceptedItemId === selectedItem.id
        return {
          ...target,
          itemId: selectedItem.id,
          correct,
        }
      }
      return target
    })

    setDropTargets(updatedTargets)

    // Remove the item from available items
    setDragItems(dragItems.filter((item) => item.id !== selectedItem.id))
    setSelectedItem(null)

    // Check if all targets have items
    const allFilled = updatedTargets.every((target) => target.itemId)
    if (allFilled) {
      setIsComplete(true)
      // Calculate score
      const correctCount = updatedTargets.filter((target) => target.correct).length
      setScore(Math.round((correctCount / updatedTargets.length) * 100))
    }
  }

  const resetExercise = () => {
    setDragItems(items)
    setDropTargets(targets.map((target) => ({ ...target })))
    setDraggedItem(null)
    setSelectedItem(null)
    setSelectedTarget(null)
    setIsComplete(false)
    setScore(0)
  }

  return (
    <div className="space-y-6">
      <p className="text-primary-light dark:text-slate-300">{instructions}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-primary-dark dark:text-white">Items to Drag</h4>
          <div className="flex flex-wrap gap-3">
            {dragItems.map((item) => (
              <div
                key={item.id}
                draggable={!isMobile}
                onDragStart={() => handleDragStart(item)}
                onClick={() => isMobile && handleMobileItemSelect(item)}
                className={cn(
                  "px-4 py-2 bg-white dark:bg-[#3A1A6A] border border-border dark:border-[#4A2A7A] rounded-md shadow-sm cursor-grab",
                  selectedItem?.id === item.id && "ring-2 ring-accent-cool",
                )}
              >
                {item.label}
              </div>
            ))}
            {dragItems.length === 0 && !isComplete && (
              <p className="text-sm text-muted-DEFAULT dark:text-slate-400 italic">All items have been placed</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-primary-dark dark:text-white">Drop Targets</h4>
          <div className="space-y-3">
            {dropTargets.map((target) => (
              <div
                key={target.id}
                onDragOver={(e) => handleDragOver(e, target.id)}
                onDrop={(e) => handleDrop(e, target.id)}
                onClick={() => isMobile && handleMobileTargetSelect(target.id)}
                className={cn(
                  "p-4 bg-accent-lighter dark:bg-[#2D1155] border border-border dark:border-[#3A1A6A] rounded-md min-h-[80px] flex items-center",
                  target.itemId &&
                    (target.correct
                      ? "border-accent-cool dark:border-accent-cool"
                      : "border-red-500 dark:border-red-500"),
                  !target.itemId && selectedItem && "border-ui-purple dark:border-ui-lavender",
                  selectedTarget === target.id && "ring-2 ring-accent-cool",
                )}
              >
                <div className="flex-1">
                  <p className="text-primary-light dark:text-slate-300">{target.description}</p>

                  {target.itemId && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="px-3 py-1 bg-white dark:bg-[#3A1A6A] border border-border dark:border-[#4A2A7A] rounded-md inline-block">
                        {items.find((item) => item.id === target.itemId)?.label}
                      </div>
                      {isComplete &&
                        (target.correct ? (
                          <CheckCircle className="h-5 w-5 text-accent-cool" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isComplete && (
        <div className="mt-6 p-4 bg-accent-lighter dark:bg-[#3A1A6A] rounded-md border border-border dark:border-[#4A2A7A]">
          <h4 className="font-medium text-primary-dark dark:text-white mb-2">Exercise Complete!</h4>
          <p className="text-primary-light dark:text-slate-300 mb-4">
            Your score: <span className="font-bold">{score}%</span>
          </p>
          <Button onClick={resetExercise} className="bg-ui-purple hover:bg-[#7A3BC8]">
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}

