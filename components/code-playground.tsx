"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, RefreshCw } from "lucide-react"

interface CodePlaygroundProps {
  initialCode: string
  language: string
}

export function CodePlayground({ initialCode, language }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    // Create a safe console.log that captures output
    const originalConsoleLog = console.log
    const outputs: string[] = []

    console.log = (...args) => {
      const output = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" ")
      outputs.push(output)
    }

    try {
      // Execute the code
      const result = new Function(code)()

      // Display any console.log outputs
      setOutput(outputs.join("\n"))

      // If there's a return value, add it to the output
      if (result !== undefined) {
        setOutput((prev) => prev + (prev ? "\n" : "") + `Return value: ${result}`)
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    } finally {
      // Restore original console.log
      console.log = originalConsoleLog
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput("")
  }

  return (
    <div className="border border-border dark:border-[#3A1A6A] rounded-md overflow-hidden">
      <div className="bg-accent-lighter dark:bg-[#2D1155] p-2 flex justify-between items-center">
        <span className="text-sm font-medium text-primary-dark dark:text-white">
          {language === "javascript" ? "JavaScript" : language}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={resetCode}
            className="h-8 px-2 bg-white dark:bg-[#3A1A6A] border-border dark:border-[#4A2A7A]"
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Reset
          </Button>
          <Button size="sm" onClick={runCode} disabled={isRunning} className="h-8 px-3 bg-ui-purple hover:bg-[#7A3BC8]">
            <Play className="h-4 w-4 mr-1" /> Run
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Code editor */}
        <div className="flex-1 min-h-[200px] md:min-h-[300px]">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-[#1E0D40] text-primary-dark dark:text-white resize-none focus:outline-none focus:ring-1 focus:ring-ui-purple"
            spellCheck="false"
          />
        </div>

        {/* Output panel */}
        <div className="flex-1 border-t md:border-t-0 md:border-l border-border dark:border-[#3A1A6A]">
          <div className="bg-accent-lighter dark:bg-[#2D1155] p-2">
            <span className="text-sm font-medium text-primary-dark dark:text-white">Output</span>
          </div>
          <pre className="p-4 font-mono text-sm bg-white dark:bg-[#1E0D40] text-primary-dark dark:text-white h-full min-h-[200px] overflow-auto whitespace-pre-wrap">
            {output || "// Run the code to see output here"}
          </pre>
        </div>
      </div>
    </div>
  )
}

