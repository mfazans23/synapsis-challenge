import React from 'react'
import { css } from '@emotion/react'
import { RingLoader } from 'react-spinners'

const Spinner = () => {
  const spinnerCss = css`
    display: block;
    margin: 0 auto;
  `

  return (
    <div className='flex justify-center items-center h-32'>
      <RingLoader color='#4F46E5' size={80} css={spinnerCss} />
    </div>
  )
}

export default Spinner
