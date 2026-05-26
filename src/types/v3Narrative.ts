export type V3RoleId =
  | 'outsiderInvestigator'
  | 'streetLeaker'
  | 'storeKeeper'
  | 'nightBroker'
  | 'linxiaProtector'
  | 'systemModerator'

export type V3CharacterId =
  | 'linxia'
  | 'aRan'
  | 'xuMian'
  | 'laoZhou'
  | 'jiangChi'
  | 'administrator'
  | 'fourteenthPerson'
  | 'unknown'

export type V3NarrativeText = {
  id: string
  body: string
  sourceSection: string
}

export type V3RoleNarrative = {
  id: V3RoleId
  name: string
  roleCardText: string
  briefingText: string
  personalGoalText: string
  failureRiskText: string
  keywords: string[]
  difficulty: 'low-medium' | 'medium' | 'medium-high' | 'high'
  sourceSection: string
}

export type V3TruthVariant = {
  id: 'misunderstanding' | 'protection' | 'trade' | 'systemInterference'
  name: string
  summary: string
  envelopeMeaning: string
  trueThreat: string
  endingBias: string[]
  sourceSection: string
}

export type V3LocationNarrative = {
  id: string
  name: string
  body: string
  sourceSection: string
}

export type V3ClueNarrative = {
  id: string
  name: string
  body: string
  kind: 'clue' | 'redHerring'
  sourceSection: string
}

export type V3NarrativeMessage = {
  id: string
  sender: V3CharacterId
  channel: 'public' | 'private' | 'system'
  trigger: string
  body: string
  sourceSection: string
}

export type V3AutonomousAction = {
  actor: V3CharacterId
  beats: string[]
  sourceSection: string
}

export type V3ActionFeedback = {
  action:
    | 'ask'
    | 'probe'
    | 'disguise'
    | 'trade'
    | 'follow'
    | 'reveal'
    | 'protect'
    | 'disrupt'
  body: string
  sourceSection: string
}

export type V3StreetMeterCopy = {
  id: 'streetHeat' | 'adminAttention' | 'evidenceRisk' | 'publicOpinion'
  name: string
  levels: Array<{ label: string; body: string }>
  sourceSection: string
}

export type V3EndingNarrative = {
  id: string
  name: string
  body: string
  sourceSection: string
}

export type V3ControlType =
  | 'aiAgent'
  | 'fixedNpc'
  | 'systemProxy'
  | 'vacantHumanSlot'

export type V3ExtraNpc = {
  id: 'fourteenthPerson'
  name: string
  activationRules: string[]
  entranceMessage: string
  anomalyText: string
  privateMessage: string
  purpose: string[]
  sourceSection: string
}
