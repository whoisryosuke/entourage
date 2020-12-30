import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { History } from 'history';
import { Store } from '../store';
import Routes from '../Routes';
import ThemeProvider from '../components/ThemeProvider';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider>
        <DndProvider backend={HTML5Backend}>
          <Routes />
        </DndProvider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
