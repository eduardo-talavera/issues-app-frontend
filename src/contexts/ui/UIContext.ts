import type { UIState, UIAction } from '@/reducers/uiReducer';
import { createContext } from 'react';


export interface UIContextProps extends UIState {
  dispatch: React.Dispatch<UIAction>;
  showLoaderSkeleton: boolean;
  setShowLoaderSkeleton: (payload: boolean) => void;
}

export const UIContext = createContext<UIContextProps | undefined>(undefined);