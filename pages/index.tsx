import type { NextPage } from 'next'
import Link from 'next/link'
import ClapSVG from '../assets/clap.svg'
import BubbleSVG from '../assets/bubble.svg'
import DummyRecipeImage from '../cypress/fixtures/recipe-image.jpg'
import DummyAvatarImage from '../cypress/fixtures/tiger-avatar.png'
import {
  FeedSection,
  TopWrapper,
  Title,
  ToolBar,
  ToolBarButton,
  RecipesList,
  RecipeItem,
  RecipeImage,
  RecipeAvatar,
  AuthorLink,
  Date,
  RecipeTitle,
  ClapText,
  CommentText,
  ReadingTime,
  RecipeTitleLink,
} from './styles'

const RecipesFeed: NextPage = () => {
  return (
    <FeedSection>
      <TopWrapper>
        <Title>Recipes</Title>
        <ToolBar role="toolbar" aria-label="Sort by claps or newest date">
          <ToolBarButton>Claps</ToolBarButton>
          <ToolBarButton>Newest</ToolBarButton>
        </ToolBar>
      </TopWrapper>
      <RecipesList>
        <RecipeItem aria-label="Read the recipe Chicken Tikka">
          <RecipeImage src={DummyRecipeImage.src} alt="Chicken Tikka" />
          <RecipeAvatar src={DummyAvatarImage.src} alt="Tiger Abrodi" />
          <Link passHref href="/">
            <AuthorLink aria-label="Author: Tiger Abrodi">
              Tiger Abrodi
            </AuthorLink>
          </Link>
          <Date aria-label="Posted in 2021-09-09">2021-09-09</Date>
          <RecipeTitle>
            <Link passHref href="/">
              <RecipeTitleLink>Chicken Tikka</RecipeTitleLink>
            </Link>
          </RecipeTitle>
          <ClapText>
            <ClapSVG />
            12
          </ClapText>
          <CommentText>
            <BubbleSVG />8
          </CommentText>
          <ReadingTime>4 min read</ReadingTime>
        </RecipeItem>
        <RecipeItem aria-label="Read the recipe Chicken Tikka">
          <RecipeImage src={DummyRecipeImage.src} alt="Chicken Tikka" />
          <RecipeAvatar src={DummyAvatarImage.src} alt="Tiger Abrodi" />
          <Link passHref href="/">
            <AuthorLink aria-label="Author: Tiger Abrodi">
              Tiger Abrodi
            </AuthorLink>
          </Link>
          <Date aria-label="Posted in 2021-09-09">2021-09-09</Date>
          <RecipeTitle>
            <Link passHref href="/">
              <RecipeTitleLink>Chicken Tikka</RecipeTitleLink>
            </Link>
          </RecipeTitle>
          <ClapText>
            <ClapSVG />
            12
          </ClapText>
          <CommentText>
            <BubbleSVG />8
          </CommentText>
          <ReadingTime>4 min read</ReadingTime>
        </RecipeItem>
        <RecipeItem aria-label="Read the recipe Chicken Tikka">
          <RecipeImage src={DummyRecipeImage.src} alt="Chicken Tikka" />
          <RecipeAvatar src={DummyAvatarImage.src} alt="Tiger Abrodi" />
          <Link passHref href="/">
            <AuthorLink aria-label="Author: Tiger Abrodi">
              Tiger Abrodi
            </AuthorLink>
          </Link>
          <Date aria-label="Posted in 2021-09-09">2021-09-09</Date>
          <RecipeTitle>
            <Link passHref href="/">
              <RecipeTitleLink>Chicken Tikka</RecipeTitleLink>
            </Link>
          </RecipeTitle>
          <ClapText>
            <ClapSVG />
            12
          </ClapText>
          <CommentText>
            <BubbleSVG />8
          </CommentText>
          <ReadingTime>4 min read</ReadingTime>
        </RecipeItem>
        <RecipeItem aria-label="Read the recipe Chicken Tikka">
          <RecipeImage src={DummyRecipeImage.src} alt="Chicken Tikka" />
          <RecipeAvatar src={DummyAvatarImage.src} alt="Tiger Abrodi" />
          <Link passHref href="/">
            <AuthorLink aria-label="Author: Tiger Abrodi">
              Tiger Abrodi
            </AuthorLink>
          </Link>
          <Date aria-label="Posted in 2021-09-09">2021-09-09</Date>
          <RecipeTitle>
            <Link passHref href="/">
              <RecipeTitleLink>Chicken Tikka</RecipeTitleLink>
            </Link>
          </RecipeTitle>
          <ClapText>
            <ClapSVG />
            12
          </ClapText>
          <CommentText>
            <BubbleSVG />8
          </CommentText>
          <ReadingTime>4 min read</ReadingTime>
        </RecipeItem>
        <RecipeItem aria-label="Read the recipe Chicken Tikka">
          <RecipeImage src={DummyRecipeImage.src} alt="Chicken Tikka" />
          <RecipeAvatar src={DummyAvatarImage.src} alt="Tiger Abrodi" />
          <Link passHref href="/">
            <AuthorLink aria-label="Author: Tiger Abrodi">
              Tiger Abrodi
            </AuthorLink>
          </Link>
          <Date aria-label="Posted in 2021-09-09">2021-09-09</Date>
          <RecipeTitle>
            <Link passHref href="/">
              <RecipeTitleLink>Chicken Tikka</RecipeTitleLink>
            </Link>
          </RecipeTitle>
          <ClapText>
            <ClapSVG />
            12
          </ClapText>
          <CommentText>
            <BubbleSVG />8
          </CommentText>
          <ReadingTime>4 min read</ReadingTime>
        </RecipeItem>
      </RecipesList>
    </FeedSection>
  )
}

export default RecipesFeed
