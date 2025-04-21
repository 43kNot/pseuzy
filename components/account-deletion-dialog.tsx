"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AccountDeletionDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmation, setConfirmation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    // In a real app, this would call an API to delete the account
    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(false)
      router.push("/")
    }, 2000)
  }

  const isDeleteButtonDisabled = confirmation !== "DELETE"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Your Account
          </DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone. All your data will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>Please read carefully before proceeding:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your account will be permanently deleted</li>
              <li>All your learning progress will be lost</li>
              <li>Any saved notes or custom content will be removed</li>
              <li>You won't be able to recover this information later</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Type DELETE to confirm account deletion:</p>
            <Input value={confirmation} onChange={(e) => setConfirmation(e.target.value)} className="uppercase" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleteButtonDisabled || isLoading}>
            {isLoading ? "Deleting Account..." : "Permanently Delete Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
