import React from 'react';
import { Tab as MuiTab } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTab = styled(MuiTab)(({ theme }) => ({
  minHeight: 44
}));

export default function Tab( props ) {
  return <CustomTab {...props} />;
}