import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../store/types';

// Generic List Component
export type GenericListProps<T> = {
  items: T[];
  itemRenderer: (item: T) => JSX.Element;
};

export class GenericList<T> extends React.Component<GenericListProps<T>, {}> {
  render() {
    const { items, itemRenderer } = this.props;
    return (
      <div>
        {items.map(item => itemRenderer(item))}
      </div>
    );
  }
}

// Usage with a concrete type
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// Concrete connected component using GenericList<Todo>
type OwnProps = {};

const mapStateToProps = (state: RootState, _ownProps: OwnProps): GenericListProps<Todo> => ({
  items: state.todos.items as Todo[],
  itemRenderer: (item: Todo) => (
    <div key={item.id}>
      {item.title} - {item.completed ? 'Done' : 'Pending'}
    </div>
  ),
});

// Since TypeScript doesn't support generic JSX syntax like `connect<...>()(Component<T>)`,
// we create a concrete class that extends the generic component.
class TodoList extends GenericList<Todo> {}

export const ConnectedTodoList = connect(mapStateToProps)(TodoList);
