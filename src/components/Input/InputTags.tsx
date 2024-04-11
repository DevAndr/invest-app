import React, {FC, Suspense, useDeferredValue, useEffect, useRef, useState, useTransition} from 'react';
import './styles.scss';
import {Chip} from '@nextui-org/chip';
import {Tag} from '@/types';
import {
    Button, CircularProgress,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectItem, Spinner
} from '@nextui-org/react';
import {MdAdd} from 'react-icons/md';
import {IoAddCircleOutline} from 'react-icons/io5';
import {IoMdAddCircle} from 'react-icons/io';
import {Input} from '@nextui-org/input';
import {useMutation} from '@apollo/client';
import {CREATE_TAG, FIND_OR_CREATE_TAG, FIND_PARTIAL_TAGS} from '@/graphql/gql';
import {
    ResponseCreateOrFindTag, ResponseCreateTag,
    ResponseFindPartialTags,
    TagQueryByValue,
    VariablesFindValueTag
} from '@/graphql/types';
import {useDebounce} from 'use-debounce';

interface InputTagsProps {
    onChange: (tags: Tag[]) => void;
}

const InputTags: FC<InputTagsProps> = ({onChange}) => {
    const listTagsRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [curTag, setCurTag] = useState('');
    const [debouncedCurTag] = useDebounce(curTag, 800);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

    const selectedTagsMemo = React.useMemo(
        () => selectedTags.join(", "),
        [selectedTags]
    );

    const [fetchCreateTag, {data: dataCreatedTag, loading: isLoadingCreatedTag}] =
        useMutation<ResponseCreateTag, TagQueryByValue>(CREATE_TAG);
    const [fetchTags, {data: dataTags, loading: isLoadingTags, error: errorTags}] =
        useMutation<ResponseFindPartialTags, TagQueryByValue>(FIND_PARTIAL_TAGS);

    useEffect(() => {
        if (debouncedCurTag) {
            setShowListTags(true);
            fetchTags({
                variables: {
                    value: debouncedCurTag
                }
            }).then((resp) => {
                console.log(resp);
            });
        } else {
            setShowListTags(false);
        }
    }, [debouncedCurTag]);

    const setShowListTags = (value: boolean) => {
        if (listTagsRef.current)
            listTagsRef.current.style.display = value ? 'block' : 'none';
    };
    const inputTagHandle = async (e: React.ChangeEvent<HTMLInputElement>) =>
        setCurTag(e.target.value);

    const addTagHandle = async () => {
        if (curTag.trim()) {
            setTags([...tags, {id: Date.now().toString(), value: curTag}]);
            await fetchCreateTag({
                variables: {
                    value: curTag
                }
            });
            setCurTag('');
            onChange(tags);
        }
    };


    return (
        <div className="input-tags">
            {
                tags.map((tag, index) => (
                    <Chip
                        key={index}
                        color="default"
                        title={tag.value}
                        onClose={() => setTags(tags.filter(t => t.id !== tag.id))}>{tag.value}</Chip>
                ))
            }
            <div>
                <Input style={{width: 120}} placeholder="Введите тег" className="input"
                       classNames={{inputWrapper: ['input']}}
                       size="sm" value={curTag} onChange={inputTagHandle}/>
                <div ref={listTagsRef} className="list-tags-container">
                    <div className="wrapper-list">
                        <Listbox selectionMode="single"
                                 aria-label="Actions"
                                 color="primary"
                                 className="list-tags"
                                 classNames={{
                                     base: "max-w-xs",
                                     list: "max-h-[320px]",
                                 }}
                                 selectedKeys={selectedTagsMemo}
                                 onAction={(key) => {
                                     const foundTag = dataTags?.findPartialTags.find(t => t.id === key);
                                     if (foundTag && !tags.filter(t => t.id === key).length) {
                                         setTags(prevState => [...prevState, foundTag]);
                                         setShowListTags(false)
                                     }
                                 }}>
                            {
                                dataTags?.findPartialTags.map(tag => (
                                    <ListboxItem key={tag.id}>{tag.value}</ListboxItem>)) || []
                            }
                        </Listbox>
                    </div>
                </div>
            </div>
            <Button isIconOnly color="default" aria-label="Add tag" size="sm" onClick={addTagHandle}>
                <MdAdd/>
            </Button>
        </div>
    );
};

export default InputTags;