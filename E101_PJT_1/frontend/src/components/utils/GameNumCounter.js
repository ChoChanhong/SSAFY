import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const GameNumCounterBlock = styled.div`
  /* border: 3px solid blue; */
  width: 40vmin;
  height: 15vmin;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 5vmin;
  }
`;

const GameNumCounterLeftBtn = styled.div`
  width: 0;
  height: 0;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-right: 1rem solid grey;
`;

const GameNumCounterRightBtn = styled.div`
  width: 0;
  height: 0;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1rem solid grey;
`;

const GameNumCounter = ({count, setCount, myGamePlanList}) => { 

  const onIncrease = () => {
    if (count === 6) {
      setCount(2)
    } else {
      setCount(count + 1)
    }
  };

  const onDecrease = () => {
    if (count === 2) {
      setCount(6)
    } else {
      setCount(count - 1)
    }
  };

  return (
    <GameNumCounterBlock>
      <GameNumCounterLeftBtn onClick={onDecrease} />
      <p>각각의 게임 정보가 들어와야함
        {myGamePlanList[0]}
      </p>
      <GameNumCounterRightBtn onClick={onIncrease} />
    </GameNumCounterBlock>
  );
};

export default GameNumCounter;
