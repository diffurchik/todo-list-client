import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { taskDTOToTaskMapper, taskMapper, getFormattedDueDate } from '../utils'

describe('taskMapper and taskDTOToTaskMapper', () => {
  const fixedNow = new Date('2024-03-13T00:00:00Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('taskMapper maps TaskDTO to Task with Date dueDate', () => {
    const dto = {
      id: 1,
      title: 'Mapped task',
      completed: true,
      description: 'desc',
      priority: 2,
      dueDate: '2024-03-20T00:00:00.000Z',
      repeated: false,
    }

    const task = taskMapper(dto)

    expect(task.id).toBe(dto.id)
    expect(task.title).toBe(dto.title)
    expect(task.checked).toBe(dto.completed)
    expect(task.description).toBe(dto.description)
    expect(task.priority).toBe(dto.priority)
    expect(task.repeated).toBe(dto.repeated)
    expect(task.dueDate instanceof Date).toBe(true)
    expect(task.dueDate.toISOString()).toBe(dto.dueDate)
  })

  it('taskMapper uses current date when dueDate is not provided', () => {
    const dto = {
      id: 1,
      title: 'No due date',
      completed: false,
      description: 'desc',
      priority: 1,
      repeated: false,
    } as const

    const task = taskMapper(dto as any)

    expect(task.dueDate.toISOString()).toBe(fixedNow.toISOString())
  })

  it('taskDTOToTaskMapper returns undefined for empty array', () => {
    const result = taskDTOToTaskMapper([])
    expect(result).toBeUndefined()
  })

  it('taskDTOToTaskMapper maps array of DTOs to Tasks', () => {
    const dtos = [
      {
        id: 1,
        title: 'One',
        completed: false,
        description: 'a',
        priority: 1,
        dueDate: '2024-03-21T00:00:00.000Z',
        repeated: false,
      },
      {
        id: 2,
        title: 'Two',
        completed: true,
        description: 'b',
        priority: 3,
        dueDate: '2024-03-22T00:00:00.000Z',
        repeated: true,
      },
    ]

    const tasks = taskDTOToTaskMapper(dtos)

    expect(tasks).toHaveLength(2)
    expect(tasks?.[0].title).toBe('One')
    expect(tasks?.[1].title).toBe('Two')
  })
})

describe('getFormattedDueDate', () => {
  it('formats date as \"13 March\" in en-GB locale', () => {
    const date = new Date('2024-03-13T00:00:00.000Z')
    const formatted = getFormattedDueDate(date)

    // In UTC we expect consistent result regardless of local environment
    expect(formatted).toBe('13 March')
  })

  it('returns empty string for falsy date', () => {
    // @ts-expect-error testing runtime behaviour with falsy input
    const formatted = getFormattedDueDate(undefined)
    expect(formatted).toBe('')
  })
})

