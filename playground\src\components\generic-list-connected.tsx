import * as React from 'react';
import { connect } from 'react-redux';

/** Generic List Component */
export type GenericListProps<T> = {
  readonly items: T[];
  readonly itemRenderer: (item: T) => JSX.Element;
};

export class GenericList<T> extends React.Component<GenericListProps<T>> {
  render() {
    const { items, itemRenderer } = this.props;
    return (
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{itemRenderer(item)}</li>
        ))}
      </ul>
    );
  }
}

/**
 * Connected Generic List
 *
 * TypeScript does not allow parameterized generic JSX type arguments, so we
 * cannot write: connect(...)(GenericList<Todo>)
 *
 * The recommended workaround is:
 *   1. Define the concrete item type (e.g. Todo)
 *   2. Create a concrete subclass of GenericList that fixes the type parameter
 *   3. Connect the concrete subclass
 */

export type Todo = {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
};

type StoreState = {
  readonly todos: Todo[];
};

type OwnProps = {};

// Step 1 – Concrete subclass (fixes the generic parameter to `Todo`)
class TodoList extends GenericList<Todo> {}

// Step 2 – Map Redux state to the props of the concrete list
const mapStateToProps = (
  state: StoreState,
  _ownProps: OwnProps
): Pick<GenericListProps<Todo>, 'items'> => ({
  items: state.todos,
});

// Step 3 – Connect the concrete subclass
export const ConnectedTodoList = connect(mapStateToProps)(TodoList);
