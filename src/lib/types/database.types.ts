export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      manga: {
        Row: {
          check_every_number: string
          check_every_period: Database["public"]["Enums"]["check_every_period"]
          created_at: string
          description: string
          id: string
          image_url: string
          last_time_checked: string
          latest_chapter: string | null
          manga_status: Database["public"]["Enums"]["manga_status"] | null
          mangadex_id: string
          title: string
        }
        Insert: {
          check_every_number?: string
          check_every_period?: Database["public"]["Enums"]["check_every_period"]
          created_at?: string
          description: string
          id?: string
          image_url: string
          last_time_checked?: string
          latest_chapter?: string | null
          manga_status?: Database["public"]["Enums"]["manga_status"] | null
          mangadex_id: string
          title: string
        }
        Update: {
          check_every_number?: string
          check_every_period?: Database["public"]["Enums"]["check_every_period"]
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          last_time_checked?: string
          latest_chapter?: string | null
          manga_status?: Database["public"]["Enums"]["manga_status"] | null
          mangadex_id?: string
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          status: Database["public"]["Enums"]["notification_status"]
          subscription: Json | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          status?: Database["public"]["Enums"]["notification_status"]
          subscription?: Json | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          status?: Database["public"]["Enums"]["notification_status"]
          subscription?: Json | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string | null
          receive_singular_notifications: boolean
          role: Database["public"]["Enums"]["profile_role"]
          subscriptions: Json
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          name?: string | null
          receive_singular_notifications?: boolean
          role?: Database["public"]["Enums"]["profile_role"]
          subscriptions?: Json
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string | null
          receive_singular_notifications?: boolean
          role?: Database["public"]["Enums"]["profile_role"]
          subscriptions?: Json
          username?: string
        }
        Relationships: []
      }
      profile_manga: {
        Row: {
          created_at: string
          id: string
          is_favorite: boolean
          is_following: boolean
          is_in_library: boolean
          is_updated: boolean
          latest_chapter_read: string | null
          manga_id: string
          priority: Database["public"]["Enums"]["priority"] | null
          profile_id: string
          reading_status: Database["public"]["Enums"]["reading_status"] | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_favorite?: boolean
          is_following?: boolean
          is_in_library?: boolean
          is_updated?: boolean
          latest_chapter_read?: string | null
          manga_id: string
          priority?: Database["public"]["Enums"]["priority"] | null
          profile_id: string
          reading_status?: Database["public"]["Enums"]["reading_status"] | null
        }
        Update: {
          created_at?: string
          id?: string
          is_favorite?: boolean
          is_following?: boolean
          is_in_library?: boolean
          is_updated?: boolean
          latest_chapter_read?: string | null
          manga_id?: string
          priority?: Database["public"]["Enums"]["priority"] | null
          profile_id?: string
          reading_status?: Database["public"]["Enums"]["reading_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_manga_manga_id_fkey"
            columns: ["manga_id"]
            isOneToOne: false
            referencedRelation: "manga"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_manga_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      check_every_period: "months" | "weeks" | "days"
      manga_status: "completed" | "ongoing" | "hiatus" | "cancelled" | "unknown"
      notification_status: "pending" | "error" | "sent"
      priority: "high" | "normal" | "low"
      profile_role: "admin" | "editor" | "viewer"
      reading_status:
        | "reading"
        | "want to read"
        | "finished reading"
        | "postponed"
        | "dropped"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

