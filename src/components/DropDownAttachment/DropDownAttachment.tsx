import React, {FC, useRef, useState} from 'react';
import './styles.scss';
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginImageEditor from "filepond-plugin-image-edit";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond/dist/filepond.min.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css";
import {FilePondFile} from 'filepond';


registerPlugin(FilePondPluginFilePoster, FilePondPluginImageEditor,
    FilePondPluginImageExifOrientation, FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

// import './FilePondInstance'
interface DropDownAttachmentProps {

}

const DropDownAttachment: FC<DropDownAttachmentProps> = ({}) => {
    const ref = useRef<FilePond|null>(null)
    const [files, setFiles] = useState<any[]>([]);

    const handleOnUpdateFiles = (fileItems: FilePondFile[]) => {
        setFiles(fileItems.map((fileItem: FilePondFile) => fileItem.file));
    };

    return (
        <div className="uploader">
            <FilePond
                ref={ref}
                files={files}
                onupdatefiles={handleOnUpdateFiles}
                maxFiles={1}
                maxParallelUploads={3}
                filePosterHeight={128}
                filePosterMaxHeight={128}
                maxFileSize={'2MB'}
                allowMultiple={false}
                allowReorder={true}
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/*']}
                labelMaxFileSizeExceeded={'Файл слишком большой'}
                labelMaxFileSize={'Maximum file size is {filesize}'}
                labelMaxTotalFileSizeExceeded={'Превышен общий максимальный размер'}
                labelMaxTotalFileSize={'Макимальный общий размер {filesize}'}
                dropOnPage
                // server="/api"
                server={{
                    // fake server to simulate loading a 'local' server file and processing a file
                    process: (fieldName, file, metadata, load) => {
                        // simulates uploading a file
                        setTimeout(() => {
                            load(Date.now().toString());
                        }, 1500);
                    },
                    load: (source, load) => {
                        // simulates loading a file from the server
                        fetch(source)
                            .then((res) => res.blob())
                            .then(load);
                    },
                }}
                name="files"
                allowDrop
                dropOnElement
                dropValidation
                labelIdle='Перенесите фото или <span class="filepond--label-action">Обзор</span>'
            />
        </div>
    );
};

export default DropDownAttachment;