interface Metrics {
  cycleTime: number
  leadTime: number
  completion: number
  scopeChange: number
  carryOver: number
}

export const sprint = (days: number): Metrics => {
  return {
    cycleTime: 5,
    leadTime: 36,
    completion: 0.8,
    scopeChange: 15,
    carryOver: 0.2,
  }
}
