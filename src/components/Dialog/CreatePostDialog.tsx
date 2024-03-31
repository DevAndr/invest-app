import React, {FC, useState} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea} from '@nextui-org/react';
import {Input} from '@nextui-org/input';
import SubmitBtn from '@/components/Button/SubmitBtn';
import InputTags from '@/components/Input/InputTags';
import './styles.scss';
import DropDownAttachment from '@/components/DropDownAttachment/DropDownAttachment';
import {ActualFileObject, FilePondFile} from 'filepond';
import {Tag} from '@/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {createCreatePostAction, CreateCreatePostActionProps} from '@/actions';

interface CreatePostDialogProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export type FormCreatePostState = {
    title: string,
    description: string,
}

const createPostSchema = Yup.object().shape({
    title: Yup.string().required('Заполните поле').nullable(),
    description: Yup.string().required('Заполните поле').min(20,
        'Описание слишком короткое')
});

const CreatePostDialog: FC<CreatePostDialogProps> = ({isOpen, onOpenChange}) => {
    const formik = useFormik<FormCreatePostState>({
        initialValues: {
            title: '',
            description: '',
        },
        initialErrors: {
            title: '',
            description: ''
        },
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        validationSchema: createPostSchema,
        onSubmit: async values => {
            const data: CreateCreatePostActionProps = {
                ...values,
                files: files.map(f => f.name),
                tags
            }
            await createCreatePostAction(data)
        },
    });
    const [files, setFiles] = useState< ActualFileObject[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    const onUploadFilesHandler = (fileList: ActualFileObject[]) => {
        setFiles(fileList)
        console.log('onUploadFilesHandler', fileList);
    };

    const onChangeTagsHandler = (tags: Tag[]) => {
        setTags(tags)
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}
               className="dialog create-post">
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={formik.handleSubmit}>
                        <ModalHeader className="head"><h3 className="title">Создать пост</h3></ModalHeader>
                        <ModalBody className="body">
                            <Input
                                autoFocus
                                name="title"
                                placeholder="Введите название поста"
                                value={formik.values.title}
                                errorMessage={formik.errors.title}
                                onChange={formik.handleChange}
                            />
                            <DropDownAttachment onUploadFiles={onUploadFilesHandler}/>
                            <Textarea
                                name="description"
                                placeholder="О чем ваш пост?"
                                value={formik.values.description}
                                errorMessage={formik.errors.description}
                                onChange={formik.handleChange}
                            />
                            <InputTags onChange={onChangeTagsHandler}/>
                        </ModalBody>
                        <ModalFooter className="footer">
                            <Button color="danger" variant="light" onPress={onClose}>
                                Отмена
                            </Button>
                            <SubmitBtn/>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CreatePostDialog;