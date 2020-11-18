import React from 'react'
import { usePromiseTracker } from "react-promise-tracker";

export const LoadingSpinner = (props: any) => {
const { promiseInProgress } = usePromiseTracker();
  return (
    <div style={{textAlign: "center"}}>
    {
      (promiseInProgress === true) ?
      <h1>I am a spinner loader</h1>
      :
        null
    }
  </div>
  )
};