import type { ID } from "./common"

export type SessionStatus = "scheduled" | "completed" | "cancelled" | "no_show"

export interface Session {
  id: ID
  patientId: ID
  scheduledAt: Date
  durationMinutes: number
  status: SessionStatus
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateSessionInput {
  patientId: ID
  scheduledAt: Date
  durationMinutes?: number
}
