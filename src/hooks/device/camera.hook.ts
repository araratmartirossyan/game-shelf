import { Ref, ref } from 'vue'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { uploadFile } from '@/utils/uplodFile';

// types
import { Image, Photo } from '@/types/games-shelf';

declare type UsePhotoGalleryResult = {
  takePhoto: Function;
  image: Ref;
}

export function usePhotoGallery(): UsePhotoGalleryResult {
  const { Camera } = Plugins
  const image = ref<Image>({});
  const fileName = new Date().getTime() + '.jpeg';

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    })

    const savedFileImage: Photo = {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };

    const file = await uploadFile(savedFileImage)
    image.value = { photo: savedFileImage, imageId: file[0]._id };
  }

  return {
    takePhoto,
    image
  }
}
