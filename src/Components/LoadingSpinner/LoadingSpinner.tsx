import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react'
import { usePromiseTracker } from "react-promise-tracker";

export const LoadingSpinner = (props: any) => {
const { promiseInProgress } = usePromiseTracker();
  return (
    <div style={{textAlign: "center"}}>
    {
      (promiseInProgress === true) ?
      <LinearProgress color="secondary" />
      :
        null
    }
  </div>
  )
};