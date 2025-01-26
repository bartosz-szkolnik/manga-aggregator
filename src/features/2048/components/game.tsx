'use client';

import { initialState, MAX_GRID_WIDTH, MIN_GRID_WIDTH, reducer } from '@2048/state/reducer';
import { ReactNode, useEffect, useReducer } from 'react';
import { Grid } from './grid';
import { Square } from './square';
import {
  decreaseGridWidth,
  increaseGridWidth,
  initializeGame,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  undo,
} from '@2048/state/actions';
import { Button } from '@components/ui/button';
import {
  KEY_ARROW_DOWN,
  KEY_ARROW_LEFT,
  KEY_ARROW_RIGHT,
  KEY_ARROW_UP,
  KEY_BACKSPACE,
  KEY_ENTER,
  useShortcut,
} from '@utils/hooks';
import { State } from '@2048/types';
import { Minus, Plus, RefreshCw, Undo } from 'lucide-react';
import { useSwipe } from '@utils/hooks/swipe';

export function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    dispatch(initializeGame());
    return () => {
      document.body.style.overflowY = 'visible';
    };
  }, []);

  useShortcut(KEY_ARROW_RIGHT, () => {
    const { status } = state;
    if (status === 'LOSE') {
      return;
    }

    dispatch(moveRight());
  });

  useShortcut(KEY_ARROW_LEFT, () => {
    const { status } = state;
    if (status === 'LOSE') {
      return;
    }

    dispatch(moveLeft());
  });

  useShortcut(KEY_ARROW_UP, () => {
    const { status } = state;
    if (status === 'LOSE') {
      return;
    }

    dispatch(moveUp());
  });

  useShortcut(KEY_ARROW_DOWN, () => {
    const { status } = state;
    if (status === 'LOSE') {
      return;
    }

    dispatch(moveDown());
  });

  useShortcut(KEY_ENTER, () => {
    const { status } = state;
    if (status === 'LOSE' || status === 'WIN') {
      handleNewGame();
    }
  });

  const undoButtonEnabled = state.status !== 'LOSE' && Boolean(state.previousGrid);
  useShortcut(KEY_BACKSPACE, () => {
    if (undoButtonEnabled) {
      dispatch(undo());
    }
  });

  useSwipe(direction => {
    switch (direction) {
      case 'right':
        return dispatch(moveRight());
      case 'left':
        return dispatch(moveLeft());
      case 'up':
        return dispatch(moveUp());
      case 'down':
        return dispatch(moveDown());
    }
  });

  function handleNewGame() {
    dispatch(initializeGame());
  }

  function handleUndo() {
    dispatch(undo());
  }

  function handleIncreaseGridWidth() {
    dispatch(increaseGridWidth());
  }

  function handleDecreaseGridWidth() {
    dispatch(decreaseGridWidth());
  }

  const increaseButtonDisabled = state.gridWidth >= MAX_GRID_WIDTH;
  const decreaseButtonDisabled = state.gridWidth <= MIN_GRID_WIDTH;
  return (
    <>
      <div className="mx-5 mb-5 flex justify-between">
        <h1 className="m-0 text-[5rem] font-bold leading-[0.7] text-[#776E65]">2048</h1>
        <div className="h-[60px] w-[120px] rounded-[3px] bg-[#8f7a66] text-center text-[#fff]">
          <p className="m-0 text-[16px]">score</p>
          <h2 id="score" className="m-0 mt-[-8px] text-[30px] font-bold">
            {state.score}
          </h2>
        </div>
      </div>
      <Status state={state}>
        <div className="flex gap-2">
          <Button onClick={handleUndo} disabled={!undoButtonEnabled}>
            <Undo />
          </Button>
          <Button onClick={handleNewGame}>
            <RefreshCw />
          </Button>
        </div>
      </Status>
      <Grid>
        {state.grid.map((value, i) => (
          <Square key={i} value={value} gridWidth={state.gridWidth} />
        ))}
      </Grid>
      <div className="m-5 flex gap-2">
        <Button disabled={decreaseButtonDisabled || true} onClick={handleDecreaseGridWidth}>
          <Minus />
        </Button>
        <Button disabled={increaseButtonDisabled || true} onClick={handleIncreaseGridWidth}>
          <Plus />
        </Button>
      </div>
    </>
  );
}

function Status({ state, children }: { state: State; children: ReactNode }) {
  const { status } = state;

  if (status === 'LOSE') {
    return (
      <div className="mx-5 flex items-center justify-between">
        <p className="m-0">You lose! (Click Enter to start over)</p>
        {children}
      </div>
    );
  }

  if (status === 'WIN') {
    return (
      <div className="mx-5 flex items-center justify-between">
        <p className="m-0">You win! (Click Enter to start over)</p>
        {children}
      </div>
    );
  }

  return (
    <div className="mx-5 flex items-center justify-between">
      <p className="m-0">
        Join the numbers and get to the <b>2048</b> tile!
      </p>
      {children}
    </div>
  );
}
