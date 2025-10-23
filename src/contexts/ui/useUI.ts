import { useContext } from 'react';
import { UIContext } from './UIContext';

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUi debe usarse dentro de un <UiProvider>');
  return context;
};