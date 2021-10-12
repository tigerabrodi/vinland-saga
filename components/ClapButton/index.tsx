import ClapSVG from '../../assets/clap.svg'
import ClapFilledSVG from '../../assets/clap-filled.svg'
import { Button } from './styles'

type Props = {
  clapCount: number
  isDocExist: boolean
  handleClap: () => void
  label: string
  isDark?: boolean
  className?: string
}

export const ClapButton = ({
  label,
  clapCount,
  handleClap,
  isDocExist,
  isDark,
  className,
}: Props) => {
  return (
    <Button
      aria-label={`${label} ${clapCount} claps`}
      aria-pressed={isDocExist}
      onClick={() => handleClap()}
      isDark={isDark}
      className={className}
    >
      {isDocExist ? <ClapFilledSVG /> : <ClapSVG />}
      {clapCount}
    </Button>
  )
}
