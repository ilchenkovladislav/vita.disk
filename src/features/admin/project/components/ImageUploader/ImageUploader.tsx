import { useState } from 'react';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { imageAsyncActions } from 'store/slices/imageSlice';
import { useActionCreators } from 'store/hooks';
import styles from './ImageUploader.module.scss';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface ImageUploaderProps {
  projectId: number;
  folderId: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  projectId,
  folderId
}) => {
  const [files, setFiles] = useState([]);
  const actions = useActionCreators(imageAsyncActions);

  function submitFiles() {
    // @ts-ignore
    const readyFiles = files.map((el) => el.file);
    if (!readyFiles) return;

    console.log(readyFiles);
    actions.addImage({ projectId, folderId, images: readyFiles });
    setFiles([]);
  }

  return (
    <div>
      <FilePond
        files={files}
        // @ts-ignore
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={10}
        name="files"
        allowReorder
        instantUpload={false}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <button onClick={submitFiles}>Отправить</button>
    </div>
  );
};
