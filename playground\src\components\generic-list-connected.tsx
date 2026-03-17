import * as React from 'react';
import { connect } from 'react-redux';

// Generic List Component
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

// Concrete type to be used in the connected example
export type Todo = {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
};

// Connected Component
// TypeScript does not support parameterized generic arguments in JSX,
// e.g.: connect(...)(GenericList<Todo>) is not valid syntax.
// Workaround: Create a concrete subclass that fixes the generic parameter,
// then connect the concrete subclass.

type ConnectedState = {
  todos: {
    items: Todo[];
  };
};

type OwnProps = {
  readonly title?: string;
};

// Step 1: Create a concrete (non-generic) subclass
class TodoList extends GenericList<Todo> {}

// Step 2: Map state to the props of the concrete subclass
const mapStateToProps = (
  state: ConnectedState,
  _ownProps: OwnProps
): GenericListProps<Todo> => ({
  items: state.todos.items,
  itemRenderer: (item: Todo) => (
    <div key={item.id}>
      [{item.completed ? 'x' : ' '}] {item.title}
    </div>
  ),
});

// Step 3: Connect the concrete subclass
export const ConnectedTodoList = connect(mapStateToProps)(TodoList);
