import type { AudioCue } from '../types/audio'

let context: AudioContext | undefined
let ambience: { oscillator: OscillatorNode; gain: GainNode } | undefined

const audioContext = (): AudioContext | undefined => {
  if (typeof window === 'undefined' || !window.AudioContext) return undefined
  context ??= new AudioContext()
  return context
}

const tone = (frequency: number, duration: number, volume: number, type: OscillatorType) => {
  const ctx = audioContext()
  if (!ctx) return
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
  gain.gain.setValueAtTime(0.001, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  oscillator.connect(gain).connect(ctx.destination)
  oscillator.start()
  oscillator.stop(ctx.currentTime + duration + 0.02)
}

export const startAmbience = async (volume: number) => {
  const ctx = audioContext()
  if (!ctx) return
  await ctx.resume()
  if (ambience) {
    ambience.gain.gain.setTargetAtTime(volume * 0.025, ctx.currentTime, 0.1)
    return
  }
  const oscillator = ctx.createOscillator()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()
  oscillator.type = 'sawtooth'
  oscillator.frequency.value = 43
  filter.type = 'lowpass'
  filter.frequency.value = 115
  gain.gain.value = volume * 0.025
  oscillator.connect(filter).connect(gain).connect(ctx.destination)
  oscillator.start()
  ambience = { oscillator, gain }
}

export const stopAmbience = () => {
  if (!ambience) return
  ambience.oscillator.stop()
  ambience = undefined
}

export const setAmbienceVolume = (volume: number) => {
  const ctx = audioContext()
  if (ambience && ctx) ambience.gain.gain.setTargetAtTime(volume * 0.025, ctx.currentTime, 0.1)
}

export const playCue = (cue: AudioCue, volume: number) => {
  const level = Math.max(0.015, volume * 0.12)
  switch (cue) {
    case 'message':
      tone(420, 0.15, level, 'sine')
      window.setTimeout(() => tone(540, 0.12, level * 0.7, 'sine'), 80)
      break
    case 'clue':
      tone(510, 0.22, level, 'triangle')
      window.setTimeout(() => tone(760, 0.28, level, 'triangle'), 100)
      break
    case 'warning':
      tone(150, 0.36, level, 'sawtooth')
      break
    case 'round':
      tone(260, 0.1, level * 0.5, 'triangle')
      break
    case 'conclusion':
      tone(330, 0.42, level, 'sine')
      window.setTimeout(() => tone(495, 0.55, level * 0.85, 'sine'), 130)
      break
  }
}
