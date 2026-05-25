import type { RoleId } from './role'

export type RoleController = { type: 'ai'; providerId: string } | { type: 'human'; playerId: string }

export type RoomSeat = {
  roleId: RoleId
  controller: RoleController
  ready: boolean
}

export type MatchTicket = {
  desiredRoleIds: RoleId[]
  language: string
  episodeId: string
}

export type EpisodeDraft = {
  authorId: string
  title: string
  status: 'draft' | 'validation' | 'approved' | 'rejected'
  canonicalPayload: unknown
}
