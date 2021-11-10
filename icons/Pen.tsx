import { v4 as uuidv4 } from 'uuid'

export const PenIcon = () => {
  const uniqueId = uuidv4()

  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <g clipPath={`url(#${uniqueId})`}>
        <path
          d="M1.198 14.06 0 20l5.94-1.198L16.473 8.268l-4.742-4.741L1.198 14.06Zm1.893 1.877-.709-.707 9.285-9.27.707.707-9.283 9.27ZM20 4.742 17.652 7.09l-4.741-4.742L15.258 0 20 4.74Z"
          fill="#F4A7A3"
        />
      </g>
      <defs>
        <clipPath id={uniqueId}>
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
