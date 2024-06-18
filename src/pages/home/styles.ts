import { styled, Heading, Text } from '@ignite-ui/react'

export const HomeContainer = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1168px) / 2)',
  height: '100vh',
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})
export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`> ${Heading}`]: {
    '@media(max-width:600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    marginTOp: '$2',
    color: '$gray200',
  },
})
export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width:600px)': {
    display: 'none',
  },
})
