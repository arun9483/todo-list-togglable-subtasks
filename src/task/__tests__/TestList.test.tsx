import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './../TaskList';

describe('test TaskList component', () => {
  test('renter all three items in TaskList', () => {
    render(<TaskList />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });
});
