import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { Task } from '../Task'
import { TasksWorker } from '../../components/TasksWorker'

vi.mock('../components/TasksWorker.ts', () => {
  return {
    TasksWorker: vi.fn().mockImplementation(() => ({
      updateTask: vi.fn(),
      setTaskCompleted: vi.fn(),
      setTaskRepeated: vi.fn(),
    })),
  }
})

describe('Task domain model - dates', () => {
  const fixedNow = new Date('2024-03-13T10:00:00Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('uses provided dueDate in constructor', () => {
    const dueDate = new Date('2024-03-15T00:00:00Z')

    const task = new Task({
      id: 1,
      title: 'Test',
      dueDate,
    })

    expect(task.dueDate).toEqual(dueDate)
  })

  it('setTaskDueTo updates dueDate and calls TasksWorker.updateTask', () => {
    const updateTaskSpy = vi.spyOn(TasksWorker.prototype, 'updateTask')

    const task = new Task({
      id: 1,
      title: 'Update due date',
      dueDate: new Date('2024-03-10T00:00:00Z'),
    })

    const newDate = new Date('2024-03-20T00:00:00Z')

    task.setTaskDueTo(newDate)

    expect(task.dueDate).toEqual(newDate)
    expect(updateTaskSpy).toHaveBeenCalledTimes(1)
    expect(updateTaskSpy).toHaveBeenCalledWith(1, { dueDate: newDate.toISOString() })
  })

  it('isTaskOverdue returns true when due date is before today and task is not completed', () => {
    const yesterday = new Date('2024-03-12T12:00:00Z')

    const task = new Task({
      id: 1,
      title: 'Overdue task',
      checked: false,
      dueDate: yesterday,
    })

    expect(task.isTaskOverdue()).toBe(true)
  })

  it('isTaskOverdue returns false when due date is today', () => {
    const today = new Date('2024-03-13T05:00:00Z')

    const task = new Task({
      id: 1,
      title: 'Today task',
      checked: false,
      dueDate: today,
    })

    expect(task.isTaskOverdue()).toBe(false)
  })

  it('isTaskOverdue returns false when due date is in the future', () => {
    const tomorrow = new Date('2024-03-14T03:00:00Z')

    const task = new Task({
      id: 1,
      title: 'Future task',
      checked: false,
      dueDate: tomorrow,
    })

    expect(task.isTaskOverdue()).toBe(false)
  })

  it('isTaskOverdue returns false when task is completed even if due date is in the past', () => {
    const pastDate = new Date('2024-03-10T00:00:00Z')

    const task = new Task({
      id: 1,
      title: 'Completed overdue',
      checked: true,
      dueDate: pastDate,
    })

    expect(task.isTaskOverdue()).toBe(false)
  })
})

