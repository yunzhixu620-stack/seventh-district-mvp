import { npcProfiles } from '../data/npcs'
import { v3RoleForRuntimeId } from '../data/narrative/v3'
import { roleById } from '../data/roles'
import { localize, type Language } from '../types/i18n'
import type { RoleId } from '../types/role'

export function PixelPortrait({
  roleId,
  language,
  active = false,
  onClick,
}: {
  roleId: RoleId
  language: Language
  active?: boolean
  onClick?: () => void
}) {
  const content = (
    <>
      <span className={`pixel-face ${roleId}`} aria-hidden="true">
        <i className="hair" />
        <i className="eye eye-left" />
        <i className="eye eye-right" />
        <i className="coat" />
      </span>
      <strong>{localize(npcProfiles[roleId].callSign, language)}</strong>
      <small>
        {language === 'zhCN' ? v3RoleForRuntimeId(roleId).name : localize(roleById[roleId].name, language)}
      </small>
    </>
  )
  return onClick ? (
    <button className={`portrait ${active ? 'active' : ''}`} onClick={onClick}>{content}</button>
  ) : (
    <div className={`portrait ${active ? 'active' : ''}`}>{content}</div>
  )
}
