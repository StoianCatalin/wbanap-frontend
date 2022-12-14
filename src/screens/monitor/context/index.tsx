import React, { createContext } from 'react';
import { DocumentDto, QueryAll, } from 'services/api/dtos';
import { documentApiService } from 'services/api/DocumentApiService';
import { useDocumentsFilters } from '../hooks/useDocumentsFilters';
import { usePaginatedApiService } from 'hooks/usePaginatedApiService';

export interface MonitorProviderState {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  error?: string;
  sourcesOfInterest: string[];
  fetch: (page: number, pageSize: number, sourceOfInterest?: string[]) => void;
  onPageChange: (page: number) => void;
  updateSourcesOfInterest: (sources: string[]) => void;
}

const defaultState: MonitorProviderState = {
  documents: [],
  totalNumberOfDocuments: 0,
  page: 0,
  pageSize: 2,
  sourcesOfInterest: [],
  fetch: () => { console.log('method not implemented') },
  onPageChange: (page: number) => { console.log(`method not implemented. page: ${page}`) },
  updateSourcesOfInterest: (sources: string[]) => { console.log(`method not implemented. sources: ${sources}`) }
};

export const MonitorContext = createContext(defaultState);

const MonitorDataProvider = ({ children }: any) => {

  const { sourcesOfInterest, updateSourcesOfInterest } = useDocumentsFilters()

  const { page, pageSize, data, fetch, error, onPageChange } = usePaginatedApiService<QueryAll<DocumentDto>>(documentApiService, documentApiService.getDocuments, sourcesOfInterest);

  const state: MonitorProviderState = {
    documents: data?.results ?? defaultState.documents,
    totalNumberOfDocuments: data?.totalNumberOfResults ?? defaultState.totalNumberOfDocuments,
    error,
    page,
    fetch,
    pageSize: pageSize ||  defaultState.pageSize,
    sourcesOfInterest,
    onPageChange: onPageChange || defaultState.onPageChange,
    updateSourcesOfInterest: updateSourcesOfInterest || defaultState.updateSourcesOfInterest
  };


  return <MonitorContext.Provider value={state}>{children}</MonitorContext.Provider>;
};

export default MonitorDataProvider;
