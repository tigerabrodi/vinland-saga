import * as React from 'react'
import {
  NoExistText,
  FeedContainer,
  TopWrapper,
  Title,
  RadioContainer,
  RadioLabel,
  RadioInput,
} from './styles'

type Props = {
  children: React.ReactNode
  labels: [string, string]
  title: string
  itemsLength: number
}

export const Feed = ({ children, labels, title, itemsLength }: Props) => {
  const [firstLabel, secondLabel] = labels

  const [selectedSortOption, setSelectedSortOption] = React.useState(firstLabel)

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSortOption(event.target.value)
  }

  return (
    <FeedContainer>
      <TopWrapper>
        <Title>{title}</Title>
        <RadioContainer>
          <RadioInput
            type="radio"
            id={firstLabel}
            value={firstLabel}
            checked={selectedSortOption === firstLabel}
            onChange={handleSortChange}
          />
          <RadioLabel htmlFor={firstLabel} aria-label={`Sort by ${firstLabel}`}>
            {firstLabel}
          </RadioLabel>

          <RadioInput
            type="radio"
            id={secondLabel}
            value={secondLabel}
            checked={selectedSortOption === secondLabel}
            onChange={handleSortChange}
          />
          <RadioLabel
            htmlFor={secondLabel}
            aria-label={`Sort by ${secondLabel}`}
          >
            {secondLabel}
          </RadioLabel>
        </RadioContainer>
      </TopWrapper>
      {itemsLength ? (
        children
      ) : (
        <NoExistText>Currently no {title.toLowerCase()} exist.</NoExistText>
      )}
    </FeedContainer>
  )
}
