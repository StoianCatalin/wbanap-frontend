import { Box, IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import styled from 'styled-components';
import DownloadButton from 'components/downloadButton';
import DownloadDocumentButton from 'components/downloadDocumentButton';

const StyledBox = styled(Box)`
  display: flex;
`;

export const ActionButtons = () => {
  return (
    <StyledBox>
      <DownloadButton fileUrl='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' />
      <DownloadDocumentButton fileUrl='src/static/dummy.pdf' />
      <IconButton>
        <SearchIcon fontSize='small' />
      </IconButton>
    </StyledBox>
  );
};
