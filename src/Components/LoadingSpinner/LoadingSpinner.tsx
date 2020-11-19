import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react'
import { usePromiseTracker } from "react-promise-tracker";

export const LoadingSpinner = (props: any) => {
const { promiseInProgress } = usePromiseTracker();
  return (
    <div style={{textAlign: "center"}}>
    {
      (promiseInProgress === true) ?
      <CircularProgress color="secondary" />
      :
        null
    }
  </div>
  )
};