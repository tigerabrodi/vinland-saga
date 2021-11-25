export const theme = {
  Pink: 'var(--pink)',
  LightPink: 'var(--lightPink)',
  DarkPink: 'var(--darkPink)',
  Brown: 'var(--brown)',
  Yellow: 'var(--yellow)',
  LightYellow: 'var(--lightYellow)',
  Green: 'var(--green)',
  Inter: 'Inter',
}

export const ToastOptions = {
  duration: 3000,
  style: {
    color: theme.Brown,
    fontSize: '1.4rem',
    borderRadius: '0.1rem',
    boxShadow: '0 0.1em 0.4rem black',
  },
  success: {
    style: {
      backgroundColor: theme.Green,
      border: '0.1rem solid darkgreen',
    },
  },
  error: {
    style: {
      backgroundColor: theme.LightPink,
      border: '0.1rem solid darkpink',
    },
  },
}

export const defaultAvatar = '/assets/default-avatar.png'
