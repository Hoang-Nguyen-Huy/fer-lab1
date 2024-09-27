import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import './Footer.css';
import { useContext } from 'react';
import { ThemeContext } from '../../themes/ThemeContext';

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.footer.backgroundColor, // Light sand color
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