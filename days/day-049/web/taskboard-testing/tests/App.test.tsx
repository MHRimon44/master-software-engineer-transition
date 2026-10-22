import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import App from '../src/App';
import { server } from './setup';

describe('TaskBoard user behavior', () => {
  it('loads tasks from mocked network', async () => {
    render(<App />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading tasks');
    expect(await screen.findByText('Review tests')).toBeInTheDocument();
  });
  it('validates an empty task title', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Add task' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Task title is required');
  });
  it('adds a task and can complete and delete it', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Review tests');
    await user.type(screen.getByRole('textbox', { name: 'New task' }), 'Write RTL tests');
    await user.click(screen.getByRole('button', { name: 'Add task' }));
    expect(screen.getByText('Write RTL tests')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Write RTL tests' }));
    expect(screen.getByRole('checkbox', { name: 'Write RTL tests' })).toBeChecked();
    await user.click(screen.getByRole('button', { name: 'Delete Write RTL tests' }));
    expect(screen.queryByText('Write RTL tests')).not.toBeInTheDocument();
  });
  it('shows a helpful API error on network failure', async () => {
    server.use(http.get('/api/tasks', () => HttpResponse.error()));
    render(<App />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load tasks');
  });
  it('renders empty state when API returns no tasks', async () => {
    server.use(http.get('/api/tasks', () => HttpResponse.json([])));
    render(<App />);
    expect(await screen.findByText('No tasks yet')).toBeInTheDocument();
  });
});
