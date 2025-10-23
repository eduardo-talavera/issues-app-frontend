import { useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer, type UIState } from '../../reducers/uiReducer';


const initialState: UIState = { showLoaderSkeleton: false };

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const setShowLoaderSkeleton = (payload: boolean) => {
    dispatch({
      type: 'SHOW_LOADER_SKELETON',
      payload
    })
  }

  return (
    <UIContext.Provider 
      value={{ 
        ...state, 
        dispatch,
        setShowLoaderSkeleton
      }}>
      {children}
    </UIContext.Provider>
  );
};
