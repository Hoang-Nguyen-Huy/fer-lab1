import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import './Footer.css';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f4e0c1', // Light sand color
      }}
      className="footer-content"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {'No Copyright © '}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}