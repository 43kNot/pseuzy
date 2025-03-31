export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string | null
          email: string | null
          avatar_url: string | null
          preferred_name: string | null
          birth_date: string | null
          postal_code: string | null
          learning_style: Json | null
          learning_goals: string[] | null
          career_path: string | null
          specific_goals: string[] | null
          time_commitment: string | null
          preferred_learning_times: string[] | null
          weekly_schedule: Json | null
          notification_preferences: string[] | null
          theme_id: string | null
          onboarding_completed: boolean
          onboarding_step: number
          onboarding_data: Json | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          preferred_name?: string | null
          birth_date?: string | null
          postal_code?: string | null
          learning_style?: Json | null
          learning_goals?: string[] | null
          career_path?: string | null
          specific_goals?: string[] | null
          time_commitment?: string | null
          preferred_learning_times?: string[] | null
          weekly_schedule?: Json | null
          notification_preferences?: string[] | null
          theme_id?: string | null
          onboarding_completed?: boolean
          onboarding_step?: number
          onboarding_data?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          preferred_name?: string | null
          birth_date?: string | null
          postal_code?: string | null
          learning_style?: Json | null
          learning_goals?: string[] | null
          career_path?: string | null
          specific_goals?: string[] | null
          time_commitment?: string | null
          preferred_learning_times?: string[] | null
          weekly_schedule?: Json | null
          notification_preferences?: string[] | null
          theme_id?: string | null
          onboarding_completed?: boolean
          onboarding_step?: number
          onboarding_data?: Json | null
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: number
          progress: number
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: number
          progress: number
          completed: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: number
          progress?: number
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

