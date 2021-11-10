import { Styleable } from '@lib/types'
import { v4 as uuidv4 } from 'uuid'

export const DotIcon = ({ className }: Styleable) => {
  const uniqueString = uuidv4()

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 4 4"
      className={className}
    >
      <g clipPath={`url(#${uniqueString})`} fill="#412D09">
        <path d="M3.411.584A2 2 0 1 0 .59 3.418 2 2 0 0 0 3.41.584Z" />
        <path d="m1.663 2.991-.221.652c.321.104.667.111.992.021l-.083-.677a1.05 1.05 0 0 1-.688.004Zm-.647-1.348L.31 1.535c-.093.334-.084.69.028 1.02l.687-.173a1.05 1.05 0 0 1-.009-.74ZM3.6 1.419l-.621.21c.1.263.09.559-.031.816l.67.084c.116-.36.11-.752-.018-1.11ZM1.426.36l.128.692a1.05 1.05 0 0 1 .806-.036l.198-.643A1.734 1.734 0 0 0 1.426.361ZM2 2.766a.766.766 0 1 0 0-1.532.766.766 0 0 0 0 1.532Z" />
      </g>
      <defs>
        <clipPath id={uniqueString}>
          <path fill="#fff" d="M0 0h4v4H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
