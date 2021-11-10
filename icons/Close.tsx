import { v4 as uuidv4 } from 'uuid'

export const CloseIcon = () => {
  const uniqueId = uuidv4()

  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <g clipPath={`url(#${uniqueId})`}>
        <path
          d="M18 15.141l-6.236-6.157 6.15-6.211L15.14 0 8.982 6.239 2.75.086 0 2.836l6.24 6.18L.087 15.25 2.836 18l6.178-6.239 6.213 6.153L18 15.14z"
          fill="#F4A7A3"
        />
      </g>
      <defs>
        <clipPath id={uniqueId}>
          <path fill="#fff" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
