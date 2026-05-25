import { actionResponses } from '../data/messages'
import type { ActionType } from '../types/action'
import type { LocalizedText } from '../types/i18n'

export interface DialogueProvider {
  describeAction(action: ActionType): LocalizedText
}

export class LocalDialogueProvider implements DialogueProvider {
  describeAction(action: ActionType): LocalizedText {
    return actionResponses[action]
  }
}

export const dialogueProvider = new LocalDialogueProvider()
