import { v4 as uuidv4 } from 'uuid'

export const EyeIcon = () => {
  const uniqueString = uuidv4()

  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11">
      <g clipPath={`url(#${uniqueString})`}>
        <path
          d="M5.5 2.52c-1.91 0-3.643 1.045-4.922 2.743a.396.396 0 0 0 0 .472C1.857 7.435 3.59 8.48 5.5 8.48c1.91 0 3.643-1.045 4.922-2.743a.396.396 0 0 0 0-.472C9.143 3.565 7.41 2.52 5.5 2.52Zm.137 5.079a2.105 2.105 0 0 1-2.236-2.236A2.108 2.108 0 0 1 5.363 3.4a2.105 2.105 0 0 1 2.236 2.236A2.115 2.115 0 0 1 5.637 7.6Zm-.063-.97A1.13 1.13 0 0 1 4.37 5.426 1.137 1.137 0 0 1 5.428 4.37a1.13 1.13 0 0 1 1.203 1.203 1.137 1.137 0 0 1-1.057 1.057Z"
          fill="#EFD582"
        />
      </g>
      <defs>
        <clipPath id={uniqueString}>
          <path fill="#fff" transform="translate(.5 .5)" d="M0 0h10v10H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
