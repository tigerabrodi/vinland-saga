import ClapSVG from '../../assets/clap.svg'
import ClapFilledSVG from '../../assets/clap-filled.svg'
import { Button } from './styles'

type Props = {
  clapCount: number
  isDocExist: boolean
  handleClap: () => void
  label: string
  isDark?: boolean
}

export const ClapButton = ({
  label,
  clapCount,
  handleClap,
  isDocExist,
  isDark,
}: Props) => {
  return (
    <Button
      aria-label={`${label} ${clapCount} claps`}
      aria-pressed={isDocExist}
      onClick={() => handleClap()}
      isDark={isDark}
    >
      {isDocExist ? <ClapFilledSVG /> : <ClapSVG />}
      {clapCount}
    </Button>
  )
}
