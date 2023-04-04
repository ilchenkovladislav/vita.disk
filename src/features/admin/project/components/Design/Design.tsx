import React, { useState, createContext } from 'react';
import styles from './Design.module.scss';

import { FieldsetList } from '../FieldsetList/FieldsetList';

export interface Setting {
  img: string;
  value: string;
  label: string;
}

export interface Fieldset {
  title: string;
  name: string;
  settings: Setting[];
}

export type HandleInputChange = (name: string, value: string) => void;

interface IitialState {
  pclayout: 'horizontal' | 'vertical' | 'none';
  moblayout: 'horizontal' | 'vertical' | 'none';
  colorScheme: 'light' | 'dark';
  mobImageLayout: 'grid' | 'full';
  gapSize: 'sm' | 'md' | 'lg';
}

const INITIAL_STATE: IitialState = {
  pclayout: 'horizontal',
  moblayout: 'horizontal',
  colorScheme: 'light',
  mobImageLayout: 'grid',
  gapSize: 'sm'
};

interface IDesignContext {
  settings: IitialState;
  setSettings: (settings: IitialState) => void;
  handleInputChange: HandleInputChange;
}

export const DesignContext = createContext<IDesignContext>({
  settings: INITIAL_STATE,
  setSettings: () => {},
  handleInputChange: () => {}
});

export const Design: React.FC = () => {
  const [settings, setSettings] = useState<IitialState>(INITIAL_STATE);

  const handleInputChange: HandleInputChange = (name, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value
    }));
  };

  return (
    <DesignContext.Provider
      value={{ settings, setSettings, handleInputChange }}
    >
      <form className={styles.form}>
        <FieldsetList />
      </form>
    </DesignContext.Provider>
  );
};
