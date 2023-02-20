import { useContext } from 'react';

import { GlobalContext } from '../../shared/context/global.context';

export const useGlobalContext = () => useContext(GlobalContext);
