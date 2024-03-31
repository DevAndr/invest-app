import React, {FC, useRef, useState} from 'react';
import './styles.scss';
import {FilePond, FilePondProps,} from 'react-filepond';
import './FilePondInstance';
import {ActualFileObject, FilePondFile} from 'filepond';

interface DropDownAttachmentProps {
    onUploadFiles: (files: ActualFileObject[]) => void
}

const DropDownAttachment: FC<DropDownAttachmentProps> = ({onUploadFiles}) => {
    const ref = useRef<FilePond | null>(null);
    const [files, setFiles] = useState<ActualFileObject[]>([]);

    const handleOnUpdateFiles = (fileItems: FilePondFile[]) => {
        const localFiles = fileItems.map((fileItem: FilePondFile) => fileItem.file)
        setFiles(localFiles);
        onUploadFiles(localFiles)
    };

    return (
        <div className="uploader">
            <FilePond
                ref={ref}
                files={files}
                onupdatefiles={handleOnUpdateFiles}
                maxFiles={3}
                maxParallelUploads={3}
                filePosterHeight={128}
                filePosterMaxHeight={128}
                maxFileSize={'2MB'}
                allowMultiple={true}
                allowReorder={true}
                allowFileRename={true}
                fileRenameFunction={(options) => `${Date.now()}-${options.name}`}
                acceptedFileTypes={['image/*']}
                labelMaxFileSizeExceeded={'Файл слишком большой'}
                labelMaxFileSize={'Maximum file size is {filesize}'}
                labelMaxTotalFileSizeExceeded={'Превышен общий максимальный размер'}
                labelMaxTotalFileSize={'Макимальный общий размер {filesize}'}
                dropOnPage
                server="/api/upload"
                name="img"
                allowDrop
                dropOnElement
                dropValidation
                labelIdle='Перенесите фото или <span class="filepond--label-action">Обзор</span>'
            />
        </div>
    );
};

export default DropDownAttachment;