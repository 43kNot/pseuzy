"use client"

import { useEffect, useRef } from "react"

interface ConceptDiagramProps {
  lessonId: number
}

export function ConceptDiagram({ lessonId }: ConceptDiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 300

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw based on lesson ID
    if (lessonId === 1) {
      drawBooleanLogicDiagram(ctx, canvas.width, canvas.height)
    } else if (lessonId === 2) {
      drawTruthTableDiagram(ctx, canvas.width, canvas.height)
    } else {
      drawDefaultDiagram(ctx, canvas.width, canvas.height)
    }

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return

      canvasRef.current.width = canvasRef.current.offsetWidth

      // Redraw
      if (lessonId === 1) {
        drawBooleanLogicDiagram(ctx, canvas.width, canvas.height)
      } else if (lessonId === 2) {
        drawTruthTableDiagram(ctx, canvas.width, canvas.height)
      } else {
        drawDefaultDiagram(ctx, canvas.width, canvas.height)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [lessonId])

  // Draw Boolean Logic diagram
  const drawBooleanLogicDiagram = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Set colors based on our theme
    const primaryColor = "#622CA0" // UI Purple
    const accentColor = "#1868E8" // Accent Cool
    const textColor = document.documentElement.classList.contains("dark") ? "#EEECFE" : "#1B0637"
    const bgColor = document.documentElement.classList.contains("dark") ? "#2D1155" : "#DAD0F2"

    // Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    // Draw AND gate
    const andX = width * 0.25
    const gateY = height * 0.5
    const gateWidth = 80
    const gateHeight = 60

    ctx.fillStyle = primaryColor
    ctx.beginPath()
    ctx.moveTo(andX - gateWidth / 2, gateY - gateHeight / 2)
    ctx.lineTo(andX + gateWidth / 2 - gateHeight / 2, gateY - gateHeight / 2)
    ctx.arc(andX + gateWidth / 2 - gateHeight / 2, gateY, gateHeight / 2, -Math.PI / 2, Math.PI / 2)
    ctx.lineTo(andX - gateWidth / 2, gateY + gateHeight / 2)
    ctx.closePath()
    ctx.fill()

    // Draw OR gate
    const orX = width * 0.5

    ctx.fillStyle = accentColor
    ctx.beginPath()
    ctx.moveTo(orX - gateWidth / 2, gateY - gateHeight / 2)
    ctx.quadraticCurveTo(orX, gateY - gateHeight / 2, orX + gateWidth / 2, gateY)
    ctx.quadraticCurveTo(orX, gateY + gateHeight / 2, orX - gateWidth / 2, gateY + gateHeight / 2)
    ctx.quadraticCurveTo(orX - gateWidth / 4, gateY, orX - gateWidth / 2, gateY - gateHeight / 2)
    ctx.closePath()
    ctx.fill()

    // Draw NOT gate (inverter)
    const notX = width * 0.75

    ctx.fillStyle = "#D3FD53" // Accent Warm
    ctx.beginPath()
    ctx.moveTo(notX - gateWidth / 2, gateY - gateHeight / 2)
    ctx.lineTo(notX + gateWidth / 2 - gateHeight / 2, gateY)
    ctx.lineTo(notX - gateWidth / 2, gateY + gateHeight / 2)
    ctx.closePath()
    ctx.fill()

    // Draw circle for NOT gate
    ctx.beginPath()
    ctx.arc(notX + gateWidth / 2 - gateHeight / 2 + 10, gateY, 10, 0, Math.PI * 2)
    ctx.fillStyle = "#D3FD53"
    ctx.fill()
    ctx.strokeStyle = bgColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Add labels
    ctx.fillStyle = textColor
    ctx.font = "bold 16px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.fillText("AND", andX, gateY)
    ctx.fillText("OR", orX, gateY)
    ctx.fillText("NOT", notX, gateY)

    // Add title
    ctx.font = "bold 20px sans-serif"
    ctx.fillText("Basic Logic Gates", width / 2, 30)
  }

  // Draw Truth Table diagram
  const drawTruthTableDiagram = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Set colors based on our theme
    const primaryColor = "#622CA0" // UI Purple
    const borderColor = document.documentElement.classList.contains("dark") ? "#3A1A6A" : "#DAD0F2"
    const textColor = document.documentElement.classList.contains("dark") ? "#EEECFE" : "#1B0637"
    const bgColor = document.documentElement.classList.contains("dark") ? "#2D1155" : "#FFFFFF"

    // Background
    ctx.fillStyle = document.documentElement.classList.contains("dark") ? "#1B0637" : "#F8F9FA"
    ctx.fillRect(0, 0, width, height)

    // Draw table
    const tableX = width * 0.2
    const tableY = height * 0.15
    const tableWidth = width * 0.6
    const tableHeight = height * 0.7
    const rowHeight = tableHeight / 5

    // Draw table background
    ctx.fillStyle = bgColor
    ctx.fillRect(tableX, tableY, tableWidth, tableHeight)

    // Draw table borders
    ctx.strokeStyle = borderColor
    ctx.lineWidth = 2
    ctx.strokeRect(tableX, tableY, tableWidth, tableHeight)

    // Draw horizontal lines
    for (let i = 1; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(tableX, tableY + i * rowHeight)
      ctx.lineTo(tableX + tableWidth, tableY + i * rowHeight)
      ctx.stroke()
    }

    // Draw vertical lines
    const colWidth = tableWidth / 4
    for (let i = 1; i < 4; i++) {
      ctx.beginPath()
      ctx.moveTo(tableX + i * colWidth, tableY)
      ctx.lineTo(tableX + i * colWidth, tableY + tableHeight)
      ctx.stroke()
    }

    // Add headers
    ctx.fillStyle = primaryColor
    ctx.font = "bold 16px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.fillText("A", tableX + colWidth * 0.5, tableY + rowHeight * 0.5)
    ctx.fillText("B", tableX + colWidth * 1.5, tableY + rowHeight * 0.5)
    ctx.fillText("A AND B", tableX + colWidth * 2.5, tableY + rowHeight * 0.5)
    ctx.fillText("A OR B", tableX + colWidth * 3.5, tableY + rowHeight * 0.5)

    // Add data
    ctx.fillStyle = textColor
    ctx.font = "16px sans-serif"

    // Row 1
    ctx.fillText("TRUE", tableX + colWidth * 0.5, tableY + rowHeight * 1.5)
    ctx.fillText("TRUE", tableX + colWidth * 1.5, tableY + rowHeight * 1.5)
    ctx.fillText("TRUE", tableX + colWidth * 2.5, tableY + rowHeight * 1.5)
    ctx.fillText("TRUE", tableX + colWidth * 3.5, tableY + rowHeight * 1.5)

    // Row 2
    ctx.fillText("TRUE", tableX + colWidth * 0.5, tableY + rowHeight * 2.5)
    ctx.fillText("FALSE", tableX + colWidth * 1.5, tableY + rowHeight * 2.5)
    ctx.fillText("FALSE", tableX + colWidth * 2.5, tableY + rowHeight * 2.5)
    ctx.fillText("TRUE", tableX + colWidth * 3.5, tableY + rowHeight * 2.5)

    // Row 3
    ctx.fillText("FALSE", tableX + colWidth * 0.5, tableY + rowHeight * 3.5)
    ctx.fillText("TRUE", tableX + colWidth * 1.5, tableY + rowHeight * 3.5)
    ctx.fillText("FALSE", tableX + colWidth * 2.5, tableY + rowHeight * 3.5)
    ctx.fillText("TRUE", tableX + colWidth * 3.5, tableY + rowHeight * 3.5)

    // Row 4
    ctx.fillText("FALSE", tableX + colWidth * 0.5, tableY + rowHeight * 4.5)
    ctx.fillText("FALSE", tableX + colWidth * 1.5, tableY + rowHeight * 4.5)
    ctx.fillText("FALSE", tableX + colWidth * 2.5, tableY + rowHeight * 4.5)
    ctx.fillText("FALSE", tableX + colWidth * 3.5, tableY + rowHeight * 4.5)

    // Add title
    ctx.fillStyle = textColor
    ctx.font = "bold 20px sans-serif"
    ctx.fillText("Truth Table for AND and OR", width / 2, 30)
  }

  // Default diagram
  const drawDefaultDiagram = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Set colors based on our theme
    const primaryColor = "#622CA0" // UI Purple
    const textColor = document.documentElement.classList.contains("dark") ? "#EEECFE" : "#1B0637"
    const bgColor = document.documentElement.classList.contains("dark") ? "#2D1155" : "#DAD0F2"

    // Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    // Add title
    ctx.fillStyle = textColor
    ctx.font = "bold 20px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Concept Visualization", width / 2, height / 2)
  }

  return (
    <div className="my-8">
      <h3 className="text-lg font-medium text-primary-dark dark:text-white mb-3">Visual Concept Diagram</h3>
      <div className="border border-border dark:border-[#3A1A6A] rounded-md overflow-hidden bg-white dark:bg-primary-light">
        <canvas ref={canvasRef} className="w-full h-[300px]"></canvas>
      </div>
      <p className="text-sm text-muted-DEFAULT dark:text-slate-400 mt-2 text-center">
        Interactive visualization of key concepts
      </p>
    </div>
  )
}

