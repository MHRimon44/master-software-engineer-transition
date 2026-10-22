import React from 'react';
import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from '../components/TaskForm';
it('shows validation error and does not submit invalid title', async () => {
  const onCreate = vi.fn();
  render(<TaskForm onCreate={onCreate} />);
  await userEvent.type(screen.getByLabelText('Task title'), 'ab');
  await userEvent.click(screen.getByRole('button', { name: 'Add task' }));
  expect(screen.getByRole('alert')).toHaveTextContent('At least 3 characters');
  expect(onCreate).not.toHaveBeenCalled();
});
it('submits a valid title', async () => {
  const onCreate = vi.fn().mockResolvedValue(undefined);
  render(<TaskForm onCreate={onCreate} />);
  await userEvent.type(screen.getByLabelText('Task title'), 'Write tests');
  await userEvent.click(screen.getByRole('button', { name: 'Add task' }));
  expect(onCreate).toHaveBeenCalledWith('Write tests');
});
