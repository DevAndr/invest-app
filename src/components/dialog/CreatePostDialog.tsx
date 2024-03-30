import React, {FC} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea} from '@nextui-org/react';
import {Input} from '@nextui-org/input';
import {createCreatePostAction} from '@/actions';
import {useFormState, useFormStatus} from 'react-dom';
import SubmitBtn from '@/components/Button/SubmitBtn';

interface CreatePostDialogProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export type FormCreatePostState = {
    title: string,
    description: string,
    message: {
        title: string,
        description: string
    },
    isDone: boolean
}

const CreatePostDialog: FC<CreatePostDialogProps> = ({isOpen, onOpenChange}) => {
    const [state, formAction] = useFormState<FormCreatePostState>(createCreatePostAction, {
        title: '',
        description: '',
        message: {
            title: '',
            description: ''
        },
        isDone: false
    });

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
                {(onClose) => (
                    <form action={formAction}>
                        <ModalHeader className="flex flex-col gap-1">Создать пост</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                name="title"
                                placeholder="Введите название поста"
                                errorMessage={state.message.title}
                            />
                            <Textarea
                                name="description"
                                placeholder="О чем ваш пост?"
                                errorMessage={state.message.description}
                            />
                        </ModalBody>
                        <ModalFooter>
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