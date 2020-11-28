import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react'

export const LoadingSpinner = () => {

return (
    <div style={{textAlign: "center"}}>
      <CircularProgress color="secondary" />
  </div>
  )
};