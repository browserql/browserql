import Slide from '@material-ui/core/Slide'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import React from 'react'

interface Props {
  children: React.ReactElement
}

export default function HideOnScroll(props: Props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
