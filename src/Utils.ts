export function easeInOutCubic(
  start: number,
  end: number,
  val: number,
): number {
  val /= 0.5
  end -= start
  if (val < 1) return (end / 2) * val * val * val + start
  val -= 2
  return (end / 2) * (val * val * val + 2) + start
}

export function easeInOutQuad(start: number, end: number, val: number): number {
  val /= 0.5
  end -= start
  if (val < 1) return (end / 2) * val * val + start
  val--
  return (-end / 2) * (val * (val - 2) - 1) + start
}
