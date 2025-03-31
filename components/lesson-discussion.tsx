"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, ThumbsUp, Flag, Send } from "lucide-react"

interface LessonDiscussionProps {
  lessonId: number
}

export function LessonDiscussion({ lessonId }: LessonDiscussionProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I found the explanation of AND vs OR operators really helpful. The visual diagrams made it much clearer!",
      timestamp: "2 days ago",
      likes: 5,
      replies: [
        {
          id: 101,
          author: "Sam Taylor",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "Agreed! The truth tables were especially useful for me.",
          timestamp: "1 day ago",
          likes: 2,
        },
      ],
    },
    {
      id: 2,
      author: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "I'm still confused about XOR. Is it covered in a future lesson?",
      timestamp: "1 day ago",
      likes: 0,
      replies: [],
    },
  ])

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const newCommentObj = {
      id: comments.length + 1,
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      replies: [],
    }

    setComments([...comments, newCommentObj])
    setNewComment("")
  }

  const handleLike = (commentId: number) => {
    setComments(
      comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-primary-light dark:text-slate-300">
        Discuss this lesson with other learners. Ask questions, share insights, or help others.
      </p>

      {/* Comment input */}
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Add to the discussion..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] border-border dark:border-[#3A1A6A] bg-white dark:bg-[#2D1155]"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="bg-ui-purple hover:bg-[#7A3BC8]"
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comment list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            {/* Main comment */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.avatar} alt={`${comment.author}'s avatar`} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-primary-dark dark:text-white">{comment.author}</h4>
                    <p className="text-xs text-muted-DEFAULT dark:text-slate-400">{comment.timestamp}</p>
                  </div>
                </div>
                <p className="mt-2 text-primary-light dark:text-slate-300">{comment.content}</p>
                <div className="flex gap-4 mt-2">
                  <button
                    className="flex items-center gap-1 text-xs text-muted-DEFAULT hover:text-accent-cool transition-colors"
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{comment.likes > 0 ? comment.likes : "Like"}</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-DEFAULT hover:text-accent-cool transition-colors">
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-DEFAULT hover:text-red-500 transition-colors">
                    <Flag className="h-3.5 w-3.5" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="ml-12 space-y-4 pl-4 border-l-2 border-border dark:border-[#3A1A6A]">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.avatar} alt={`${reply.author}'s avatar`} />
                      <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-primary-dark dark:text-white">{reply.author}</h4>
                          <p className="text-xs text-muted-DEFAULT dark:text-slate-400">{reply.timestamp}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-primary-light dark:text-slate-300">{reply.content}</p>
                      <div className="flex gap-4 mt-2">
                        <button className="flex items-center gap-1 text-xs text-muted-DEFAULT hover:text-accent-cool transition-colors">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>{reply.likes > 0 ? reply.likes : "Like"}</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs text-muted-DEFAULT hover:text-red-500 transition-colors">
                          <Flag className="h-3.5 w-3.5" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

