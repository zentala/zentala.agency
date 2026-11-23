/**
 * View model of the decision board: which items are asked now, how they group and what the
 * summary counts. Pure, so the page stays a template.
 */
import type { SavedAnswer } from './answers'
import type { DecideItem } from './decide'

export interface DecisionGroup {
  name: string
  items: DecideItem[]
  answered: number
}

export interface BoardModel {
  /** Open items asked now, by group in file order. */
  groups: DecisionGroup[]
  /** Open items marked "(później)": listed at the bottom, not asked now. */
  deferred: DecideItem[]
  openCount: number
  answeredCount: number
}

/** Heading used for items that stand before the first `## ` heading. */
export const UNGROUPED_NAME = 'Bez grupy'

/** Splits items into asked and deferred, groups the asked ones and counts those with a saved answer. */
export function buildBoard(items: DecideItem[], answers: SavedAnswer[]): BoardModel {
  const answeredIds = new Set(answers.map((answer) => answer.id))
  const open = items.filter((item) => !item.done)
  const asked = open.filter((item) => !item.deferred)
  const groups: DecisionGroup[] = []
  for (const item of asked) {
    const name = item.group || UNGROUPED_NAME
    let group = groups.find((candidate) => candidate.name === name)
    if (!group) groups.push((group = { name, items: [], answered: 0 }))
    group.items.push(item)
    if (answeredIds.has(item.id)) group.answered += 1
  }
  return {
    groups,
    deferred: open.filter((item) => item.deferred),
    openCount: asked.length,
    answeredCount: groups.reduce((sum, group) => sum + group.answered, 0),
  }
}
