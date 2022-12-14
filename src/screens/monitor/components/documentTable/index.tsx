import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { DocumentDto } from 'services/api/dtos';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material';
import styled from 'styled-components';
import { Status } from 'services/api/dtos/document';
import { FormattedDate } from 'components/formatedDate';
import { Translations } from "../../../../constants/translations";
import { DocumentMarks } from 'components/documentsTableDocumentMarks';
import { ActionButtons } from 'components/documentsTableActionButtons';

interface DocumentsTableProps {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void | undefined;
}

const columns = [
  '',
  'Identificator',
  'Titlu',
  'Proiect',
  'Data publicarii',
  'Sursa',
  'Stare',
  'Termeni identificati',
  'Actiuni',
];

export const DocumentsTable = (props: DocumentsTableProps) => {
  const { documents, totalNumberOfDocuments, page, onPageChange, pageSize } = props;

  const theme = useTheme();

    const documentRows = documents.map(document => (
      <GenericTableRow
        id={document.id}
        key={document.id}
        className={`${document.status === Status.NOU ? 'new' : ''}`}
        values={[
          <DocumentMarks document={document} key={`marks-for-${document.id}`} />,
          document.identifier,
          <StyledLink to={`/document/${document.id}`} key={document.id} theme={theme}>{document.title}</StyledLink>,
          <StyledLink to={`/project/${document.project.id}`} key={document.project.id} theme={theme}>{document.project.title}</StyledLink>,
          <FormattedDate key={`date-for-${document.id}`} date={document.publicationDate} />,
          Translations[document.source],
          document.status,
          document.numberOfIdentifiedTerms || 0,
          <ActionButtons key={`action-for-${document.id}`}/>
          ]
        }/>
  ))

  return (
    <GenericTable
      columns={columns}
      tableRows={documentRows}
      count={totalNumberOfDocuments}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={pageSize}
    ></GenericTable>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  ['&:focus, &:visited, &:active, &:active']: {
    color: theme.palette.text.primary,
  },
  ['&:hover']: {
    color: theme.palette.text.secondary,
  },
}));
