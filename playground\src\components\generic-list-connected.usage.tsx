import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { ConnectedTodoList, Todo } from './generic-list-connected';

type StoreState = {
  readonly todos: Todo[];
};

const initialState: StoreState = {
  todos: [
    { id: 1, title: 'Learn TypeScript', completed: true },
    { id: 2, title: 'Read react-redux-typescript-guide', completed: false },
    { id: 3, title: 'Build something great', completed: false },
  ],
};

const reducer = (state: StoreState = initialState): StoreState => state;

const store = createStore(reducer);

const itemRenderer = (item: Todo): JSX.Element => (
  <span>
    [{item.completed ? 'x' : ' '}] {item.title}
  </span>
);

export const App = () => (
  <Provider store={store}>
    <ConnectedTodoList itemRenderer={itemRenderer} />
  </Provider>
);
