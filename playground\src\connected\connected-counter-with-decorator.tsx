import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../store/types';
import { countersActions } from '../features/counters';

// Props from the parent component
interface OwnProps {
  label: string;
}

// Props from Redux state
interface StateProps {
  count: number;
}

// Props from Redux dispatch
interface DispatchProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  count: state.counters.reduxCounter,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      onIncrement: countersActions.increment,
      onDecrement: countersActions.decrement,
    },
    dispatch
  );

@connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)
class ConnectedCounterWithDecorator extends Component<Props> {
  render() {
    const { label, count, onIncrement, onDecrement } = this.props;
    return (
      <div>
        <span>
          {label}: {count}
        </span>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </div>
    );
  }
}

export default ConnectedCounterWithDecorator;
