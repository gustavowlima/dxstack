import type { ID } from "./common"

export interface Patient {
  id: ID
  name: string
  email: string
  phone?: string
  birthDate?: Date
  cpf?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreatePatientInput {
  name: string
  email: string
  phone?: string
  birthDate?: Date
  cpf?: string
  notes?: string
}

export type UpdatePatientInput = Partial<CreatePatientInput> & { id: ID }
