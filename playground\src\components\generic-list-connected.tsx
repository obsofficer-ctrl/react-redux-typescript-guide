import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../store/types';

// Generic List Component (reusable)
export type GenericListProps<T> = {
  readonly items: T[];
  readonly itemRenderer: (item: T) => JSX.Element;
};

export class GenericList<T> extends React.Component<GenericListProps<T>> {
  render() {
    const { items, itemRenderer } = this.props;
    return (
      <ul>
        {items.map((item, i) => (
          <li key={i}>{itemRenderer(item)}</li>
        ))}
      </ul>
    );
  }
}

// Concrete type for the connected example
export type Todo = {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
};

// State shape expected (you would normally import from store types)
type OwnProps = {
  readonly title: string;
};

// Since TypeScript does not support parameterized generic JSX in connect(),
// the workaround is to create a concrete subclass and connect that instead.
class TodoList extends GenericList<Todo> {}

const mapStateToProps = (state: RootState, ownProps: OwnProps): GenericListProps<Todo> => ({
  items: state.todos.items as Todo[],
  itemRenderer: (item: Todo) => (
    <div key={item.id}>
      [{item.completed ? 'x' : ' '}] {item.title}
    </div>
  ),
});

export const ConnectedTodoList = connect(mapStateToProps)(TodoList);
