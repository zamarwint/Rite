// Hand-written to match 001_init_rite_schema.sql.
// Once the migration is applied, regenerate this file from the real schema
// instead of maintaining it by hand:
//
//   supabase gen types typescript --project-id <project-ref> > lib/supabase/types.ts
//
// or, for local dev against the Supabase CLI:
//
//   supabase gen types typescript --local > lib/supabase/types.ts

export type Priority = 'high' | 'medium' | 'low'

export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string
          user_id: string
          name: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['workspaces']['Insert']>
      }
      folders: {
        Row: {
          id: string
          user_id: string
          workspace_id: string
          parent_folder_id: string | null
          name: string
          icon_color: string
          position: number
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          workspace_id: string
          parent_folder_id?: string | null
          name: string
          icon_color?: string
          position?: number
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['folders']['Insert']>
      }
      documents: {
        Row: {
          id: string
          user_id: string
          folder_id: string | null
          title: string
          content: Record<string, unknown> // Tiptap/ProseMirror JSON doc
          tags: string[]
          word_count: number
          is_favorite: boolean
          position: number
          search_vector: unknown | null // tsvector — not queried client-side
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          folder_id?: string | null
          title?: string
          content?: Record<string, unknown>
          tags?: string[]
          is_favorite?: boolean
          position?: number
          created_at?: string
          deleted_at?: string | null
          // word_count, updated_at, search_vector are set by DB triggers — omit on insert/update
        }
        Update: Partial<Database['public']['Tables']['documents']['Insert']>
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          folder_id: string | null
          text: string
          completed: boolean
          priority: Priority | null
          due_date: string | null
          position: number
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          folder_id?: string | null
          text: string
          completed?: boolean
          priority?: Priority | null
          due_date?: string | null
          position?: number
          created_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>
      }
    }
  }
}
