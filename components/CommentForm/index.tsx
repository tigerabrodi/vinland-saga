import { Form, Label, Textarea, PostButton } from './styles'
import PenSVG from '../../assets/pen.svg'
import { useFormState } from '@hooks/useFormState'

export const CommentForm = () => {
  const {
    formState: { textarea },
    handleChange,
  } = useFormState({ textarea: '' })

  return (
    <Form>
      <Label htmlFor="textarea">Comment</Label>
      <Textarea
        id="textarea"
        name="textarea"
        onChange={handleChange}
        value={textarea}
        placeholder="I liked this recipe of yours, because..."
      />
      <PostButton type="submit">
        <PenSVG /> Post
      </PostButton>
    </Form>
  )
}
