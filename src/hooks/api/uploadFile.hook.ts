
import { useMutation } from '@vue/apollo-composable'
import uploadImageMutation from '@/graph/mutations/uploadImage.mutation.graphql'

const useUpload = () => {
  const { mutate: uploadImage } = useMutation(uploadImageMutation)

  return { uploadImage }
}

export default useUpload
