import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { parseAction } from '../engine/actionParser'
import { ruleAction } from '../engine/rulingEngine'
import { activateSession, createSession } from '../engine/sessionEngine'
import { createRandomSeed } from '../engine/seedEngine'
import type { ActionType, ParsedAction } from '../types/action'
import type { Language } from '../types/i18n'
import type { RoleId } from '../types/role'
import type { SessionState } from '../types/world'

type Preferences = {
  language: Language
  audioEnabled: boolean
  volume: number
  reducedMotion: boolean
}

type GameStore = Preferences & {
  seed: string
  selectedRoleId?: RoleId
  selectedTargetId: RoleId
  session?: SessionState
  pendingAction?: ParsedAction
  setLanguage: (language: Language) => void
  setAudioEnabled: (enabled: boolean) => void
  setVolume: (volume: number) => void
  setReducedMotion: (reduced: boolean) => void
  setSeed: (seed: string) => void
  randomizeSeed: () => void
  chooseRole: (roleId: RoleId) => void
  beginIncident: () => void
  setTarget: (roleId: RoleId) => void
  setLocation: (locationId: string) => void
  previewRecommended: (action: ActionType) => void
  previewText: (input: string) => void
  cancelPreview: () => void
  commitAction: () => SessionState | undefined
  resetRun: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      language: 'zhCN',
      audioEnabled: false,
      volume: 0.55,
      reducedMotion: false,
      seed: 'D7-NIGHT',
      selectedTargetId: 'keeper',
      setLanguage: (language) => set({ language }),
      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
      setVolume: (volume) => set({ volume }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setSeed: (seed) => set({ seed: seed.trim() || 'D7-NIGHT' }),
      randomizeSeed: () => set({ seed: createRandomSeed() }),
      chooseRole: (selectedRoleId) =>
        set((state) => ({
          selectedRoleId,
          session: createSession(selectedRoleId, state.seed),
          pendingAction: undefined,
        })),
      beginIncident: () => set((state) => (state.session ? { session: activateSession(state.session) } : state)),
      setTarget: (selectedTargetId) => set({ selectedTargetId }),
      setLocation: (locationId) =>
        set((state) => (state.session ? { session: { ...state.session, locationId } } : state)),
      previewRecommended: (action) =>
        set((state) => ({
          pendingAction: parseAction(action, 'recommended', action, state.selectedTargetId),
        })),
      previewText: (input) =>
        set((state) => ({
          pendingAction: parseAction(input, 'freeText', undefined, state.selectedTargetId),
        })),
      cancelPreview: () => set({ pendingAction: undefined }),
      commitAction: () => {
        const { session, pendingAction } = get()
        if (!session || !pendingAction) return undefined
        const nextState = ruleAction(session, pendingAction).nextState
        set({ session: nextState, pendingAction: undefined })
        return nextState
      },
      resetRun: () =>
        set((state) => ({
          selectedRoleId: undefined,
          session: undefined,
          pendingAction: undefined,
          seed: createRandomSeed(),
          selectedTargetId: state.selectedTargetId,
        })),
    }),
    {
      name: 'seventh-district-preferences',
      partialize: (state): Preferences => ({
        language: state.language,
        audioEnabled: state.audioEnabled,
        volume: state.volume,
        reducedMotion: state.reducedMotion,
      }),
    },
  ),
)
