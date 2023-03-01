import { AddNewItem } from './AddNewItem';
import { Column } from './Column';
import { CustomDragLayer } from './CustomDragLayer';
import { addList } from './state/actions';
import { useAppState } from './state/AppStateContext';
import { AppContainer } from './style';

export function App() {
  const { lists, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map(list => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={text => dispatch(addList(text))} />
    </AppContainer>
  )
}
