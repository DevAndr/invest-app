
import 'filepond/dist/filepond.min.css';
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css";
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginImageEditor from "filepond-plugin-image-edit";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import {registerPlugin} from 'filepond';

registerPlugin(FilePondPluginFilePoster, FilePondPluginImageEditor,
    FilePondPluginImageExifOrientation, FilePondPluginFileValidateSize);