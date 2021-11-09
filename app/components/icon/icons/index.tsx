import Back from './back.svg'
import WhiteBack from './white-back.svg'
import React from 'react'
export const icons = {
  back: <Back />,
  bullet: require("./bullet.png"),
  whiteBack: <WhiteBack />,
}

export type IconTypes = keyof typeof icons
