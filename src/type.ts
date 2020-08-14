export interface LifeCycle {
  start?: (deltaMS: number, lastTime: number) => void
  update: (deltaMS: number, lastTime: number) => void
  stop?: (deltaMS: number, lastTime: number) => void
}
