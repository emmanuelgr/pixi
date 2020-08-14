/**
 * Interface for game elements
 */
export interface LifeCycle {
  init: () => void
  start?: () => void
  update: (deltaMS: number, lastTime: number) => void
  stop?: () => void
}
