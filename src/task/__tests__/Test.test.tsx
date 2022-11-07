import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Task from './../Task';
import { ITaskDetails } from './../types';

const mockData: ITaskDetails = {
  title: 'Organize closet',
  subtasks: [
    { 'Donate old clothes and shoes': false },
    { 'Buy new shelf': true },
    { 'Put in shelf by color': false },
    { 'fold sheet covers': true },
  ],
};
describe('test Task component', () => {
  test('renter task heading', () => {
    render(<Task taskDetails={mockData} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Organize closet'
    );
  });

  test('render heading Not yet completed', () => {
    render(<Task taskDetails={mockData} />);
    expect(
      screen.getByRole('heading', { level: 4, name: 'Not yet completed' })
    ).toBeInTheDocument();
  });

  test('render heading Completed', () => {
    render(<Task taskDetails={mockData} />);
    expect(
      screen.getByRole('heading', { level: 4, name: 'Completed' })
    ).toBeInTheDocument();
  });

  test('render Not yet completed list', () => {
    render(<Task taskDetails={mockData} />);
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(2);
    const pendingItems = within(lists[0]).getAllByRole('listitem');
    // assert two items are in Not yet completed list
    expect(pendingItems).toHaveLength(2);
    // assert second item's text in Not yet completed list
    expect(pendingItems[1]).toHaveTextContent('Put in shelf by color');
  });

  test('render Completed list', () => {
    render(<Task taskDetails={mockData} />);
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(2);

    // assert one items are in Completed list
    const completedItems = within(lists[1]).getAllByRole('listitem');
    expect(completedItems).toHaveLength(2);
    // assert first item's text in Completed list
    expect(completedItems[0]).toHaveTextContent('Buy new shelf');
  });

  test('click on not yet completed list item', () => {
    render(<Task taskDetails={mockData} />);
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(2);

    const pendingItems = within(lists[0]).getAllByRole('listitem');
    expect(pendingItems).toHaveLength(2);

    const pendingItem = within(lists[0])
      .getAllByRole('listitem')
      .find((item) => item.textContent === 'Donate old clothes and shoes');

    expect(pendingItem).toBeInTheDocument();
    userEvent.click(pendingItem as HTMLElement);

    const newList = screen.getAllByRole('list');
    expect(newList).toHaveLength(2);

    const newPendingItems = within(newList[0]).getAllByRole('listitem');
    expect(newPendingItems).toHaveLength(1);

    const nonExistedItem = within(newList[0])
      .getAllByRole('listitem')
      .find((item) => item.textContent === 'Donate old clothes and shoes');

    // assert that element is not found in pending list after click on element.
    expect(nonExistedItem).toBeUndefined();

    const existedItem = within(newList[1])
      .getAllByRole('listitem')
      .find((item) => item.textContent === 'Donate old clothes and shoes');
    // assert that element is found in Completed list after click on element.
    expect(existedItem).not.toBeUndefined();
  });

  test('click on completed list item', () => {
    render(<Task taskDetails={mockData} />);
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(2);

    const completedItems = within(lists[1]).getAllByRole('listitem');
    expect(completedItems).toHaveLength(2);

    const completedItem = within(lists[1])
      .getAllByRole('listitem')
      .find((item) => item.textContent === 'fold sheet covers');

    expect(completedItem).toBeInTheDocument();
    userEvent.click(completedItem as HTMLElement);

    const newList = screen.getAllByRole('list');
    expect(newList).toHaveLength(2);

    const newCompletedItems = within(newList[1]).getAllByRole('listitem');
    expect(newCompletedItems).toHaveLength(1);

    const nonExistedItem = within(newList[1])
      .getAllByRole('listitem')
      .find((item) => item.textContent === 'fold sheet covers');

    // assert that element is not found in Completed list after click on element.
    expect(nonExistedItem).toBeUndefined();

    const existedItem = within(newList[0])
      .getAllByRole('listitem')
      .find((item) => item.textContent === 'fold sheet covers');
    // assert that element is found in Pending list after click on element.
    expect(existedItem).not.toBeUndefined();
  });
});
