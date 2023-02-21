import React from 'react';
import { AppContainer } from './style';
import { ColumnContainer } from './style';
import { ColumnTitle } from './style';
import { CardContainer } from './style';

export function App() {
  return (
    <AppContainer>
      <ColumnContainer>
        <ColumnTitle>标题</ColumnTitle>
        <CardContainer>内容</CardContainer>
      </ColumnContainer>
    </AppContainer>
  );
}
