import { Styleable } from '@lib/types'
import { v4 as uuidv4 } from 'uuid'

export const SpinnerIcon = ({ className }: Styleable) => {
  const uniqueString = uuidv4()

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 27"
      className={className}
    >
      <g clipPath={`url(#${uniqueString})`} fill="#412D09">
        <path d="M13.792 6.164a3.082 3.082 0 1 0 0-6.164 3.082 3.082 0 0 0 0 6.164ZM13.792 26.35a1.849 1.849 0 1 0 0-3.698 1.849 1.849 0 0 0 0 3.698ZM6.219 8.992a2.774 2.774 0 1 0 0-5.548 2.774 2.774 0 0 0 0 5.548ZM21.365 22.904a1.541 1.541 0 1 0 0-3.082 1.541 1.541 0 0 0 0 3.082ZM3.082 16.257a2.465 2.465 0 1 0 0-4.93 2.465 2.465 0 0 0 0 4.93ZM24.501 15.023a1.232 1.232 0 1 0 0-2.464 1.232 1.232 0 0 0 0 2.464ZM4.694 19.84a2.155 2.155 0 0 0 1.525 3.682 2.155 2.155 0 0 0 2.157-2.157 2.155 2.155 0 0 0-.632-1.525 2.145 2.145 0 0 0-3.05 0ZM21.364 7.142a.924.924 0 1 0 0-1.848.924.924 0 0 0 0 1.848Z" />
      </g>
      <defs>
        <clipPath id={uniqueString}>
          <path fill="#fff" d="M0 0h26.349v26.35H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
