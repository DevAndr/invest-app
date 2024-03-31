import 'filepond/dist/filepond.min.css'
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css";

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginImageEditor from "filepond-plugin-image-edit";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {registerPlugin} from 'react-filepond';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFilePoster, FilePondPluginImageEditor,
    FilePondPluginFileValidateSize, FilePondPluginFileRename)