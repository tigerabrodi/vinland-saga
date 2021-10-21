import * as React from 'react'
import {
  NoFoundText,
  FeedContainer,
  TopWrapper,
  Title,
  ToolBar,
  ToolBarButton,
} from './styles'

type Props = {
  children: React.ReactNode
  toolbarButtonLabels: [string, string]
  title: string
  itemsLength: number
}

export const Feed = ({
  children,
  toolbarButtonLabels,
  title,
  itemsLength,
}: Props) => {
  const [firstLabel, secondLabel] = toolbarButtonLabels

  return (
    <FeedContainer>
      <TopWrapper>
        <Title>{title}</Title>
        <ToolBar
          role="toolbar"
          aria-label={`Sort by ${firstLabel} or ${secondLabel}`}
        >
          <ToolBarButton>{firstLabel}</ToolBarButton>
          <ToolBarButton>{secondLabel}</ToolBarButton>
        </ToolBar>
      </TopWrapper>
      {itemsLength ? (
        children
      ) : (
        <NoFoundText>Currently no {title.toLowerCase()} exist.</NoFoundText>
      )}
    </FeedContainer>
  )
}
