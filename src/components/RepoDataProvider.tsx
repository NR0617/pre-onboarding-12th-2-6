import React, { useState, useMemo } from 'react';

interface IContextValue {
  detailDataState: any[];
  setDetailDataState: React.Dispatch<React.SetStateAction<object[]>>;
}

export const MyContext = React.createContext<IContextValue | null>(null);

const RepoDataProvider = ({ children }) => {
  const [detailDataState, setDetailDataState] = useState<any[]>([]);
  const value = useMemo(() => ({ detailDataState, setDetailDataState }), [detailDataState]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default RepoDataProvider;
