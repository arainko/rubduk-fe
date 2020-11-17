import React from 'react'
import { usePromiseTracker } from "react-promise-tracker";

export const LoadingSpinner = (props: any) => {
const { promiseInProgress } = usePromiseTracker();
  return (
    <div>
    {
      (promiseInProgress === true) ?
        <h3>I am a spinner loader</h3>
      :
        null
    }
  </div>
  )
};