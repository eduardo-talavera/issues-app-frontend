export type UIAction =
  | { type: 'SHOW_LOADER_SKELETON', payload: boolean };

export interface UIState {
  showLoaderSkeleton: boolean;
}

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'SHOW_LOADER_SKELETON':
      return { showLoaderSkeleton: action.payload };

    default:
      return state;
  }
}