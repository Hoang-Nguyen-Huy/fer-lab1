import { Grid } from '@mui/joy'
import React from 'react'
import { Orchids } from '../../ListOfOrchids'
import OrchidCard from './OrchidCard'

export default function Content() {
  return (
    <div>
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ flexGrow: 1 }}
        >
            {
              Orchids.map(orchid => {
                return (
                    <OrchidCard key={orchid.Id} orchid={ orchid }/>
                )
              })  
            }
        </Grid>
    </div>
  )
}
