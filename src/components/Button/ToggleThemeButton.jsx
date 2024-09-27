import React, { useContext } from 'react'
import { ThemeContext } from '../../themes/ThemeContext'
import { Button } from '@mui/material';

export default function ToggleThemeButton() {
  const { light, toggle } = useContext(ThemeContext);
  return (
    <Button onClick={toggle} sx={{ color: 'white' }}>
        Swith to {light ? 'Dark' : 'Light'} Mode
    </Button>
  )
}
