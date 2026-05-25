import { linxiaEnvelope } from '../data/episode001_linxiaEnvelope'
import type { TruthVariant } from '../types/episode'

export const hashSeed = (seed: string): number => {
  let hash = 0
  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }
  return hash
}

export const selectTruthBySeed = (seed: string): TruthVariant =>
  linxiaEnvelope.variants[hashSeed(seed) % linxiaEnvelope.variants.length]

export const createRandomSeed = (): string =>
  `D7-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
