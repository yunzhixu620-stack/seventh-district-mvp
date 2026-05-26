import type { RoleId } from '../../../types/role'
import type { V3RoleId, V3RoleNarrative } from '../../../types/v3Narrative'
import { v3Roles } from './roles'

const v3RoleIdByRuntimeId: Record<RoleId, V3RoleId> = {
  investigator: 'outsiderInvestigator',
  keeper: 'storeKeeper',
  seeker: 'nightBroker',
  protector: 'linxiaProtector',
  leaker: 'streetLeaker',
  systemProxy: 'systemModerator',
}

const v3RoleById = new Map(v3Roles.map((role) => [role.id, role]))

export function v3RoleForRuntimeId(roleId: RoleId): V3RoleNarrative {
  const role = v3RoleById.get(v3RoleIdByRuntimeId[roleId])

  if (!role) {
    throw new Error(`Missing V3 narrative mapping for runtime role: ${roleId}`)
  }

  return role
}
