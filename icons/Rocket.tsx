import { v4 as uuidv4 } from 'uuid'

export const RocketIcon = () => {
  const uniqueId = uuidv4()

  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12">
      <g clipPath={`url(#${uniqueId})`} fill="#F18E89">
        <path d="M12.486.896a.933.933 0 0 0-.882-.882C10.642-.038 8.76.013 6.96.944c-.917.474-1.888 1.279-2.662 2.207l-.028.034-1.758.136a.928.928 0 0 0-.707.416L.606 5.55a.64.64 0 0 0 .438.99l1.48.23-.015.086a.932.932 0 0 0 .262.81L4.833 9.73a.935.935 0 0 0 .811.261l.086-.015.23 1.48a.64.64 0 0 0 .989.438l1.813-1.199a.928.928 0 0 0 .416-.707l.136-1.757.035-.028c.928-.775 1.732-1.745 2.207-2.662.93-1.8.982-3.682.93-4.644Zm-4.111 9.212L6.64 11.254l-.223-1.442a7.876 7.876 0 0 0 2.149-1.024l-.089 1.145a.229.229 0 0 1-.102.175ZM5.33 9.232 3.268 7.169a.228.228 0 0 1-.065-.198c.061-.366.156-.715.274-1.044l3.095 3.094a6.073 6.073 0 0 1-1.044.276.228.228 0 0 1-.198-.065Zm-2.764-5.21 1.145-.088a7.875 7.875 0 0 0-1.023 2.149L1.245 5.86l1.147-1.735a.229.229 0 0 1 .174-.103Zm6.332 3.64a8.06 8.06 0 0 1-1.627 1.064L3.773 5.229A8.2 8.2 0 0 1 4.838 3.6c.716-.859 1.608-1.6 2.445-2.033 1.652-.854 3.392-.9 4.282-.852a.23.23 0 0 1 .218.218c.049.89.003 2.63-.851 4.282-.434.838-1.175 1.73-2.034 2.446Z" />
        <path d="M8.72 5.537a1.753 1.753 0 0 0 1.758-1.757 1.76 1.76 0 0 0-3.516 0c0 .47.183.91.515 1.243.343.343.793.514 1.243.514Zm-.746-2.503c.206-.205.476-.308.746-.308A1.051 1.051 0 0 1 9.775 3.78a1.056 1.056 0 1 1-1.8-.746ZM.865 9.89a.35.35 0 0 0 .248-.103l1.148-1.148a.352.352 0 0 0-.497-.497L.616 9.289a.352.352 0 0 0 .249.6ZM3.307 9.193a.352.352 0 0 0-.497 0L.603 11.4a.352.352 0 1 0 .498.497L3.307 9.69a.352.352 0 0 0 0-.497ZM3.862 10.245l-1.148 1.148a.351.351 0 1 0 .497.497l1.148-1.148a.351.351 0 1 0-.497-.497Z" />
      </g>
      <defs>
        <clipPath id={uniqueId}>
          <path fill="#fff" transform="translate(.5)" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
