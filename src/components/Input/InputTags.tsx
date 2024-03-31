import React, {FC, useState} from 'react';
import './styles.scss';
import {Chip} from '@nextui-org/chip';
import {Tag} from '@/types';
import {Button, Select, SelectItem} from '@nextui-org/react';
import {MdAdd} from 'react-icons/md';
import {IoAddCircleOutline} from 'react-icons/io5';
import {IoMdAddCircle} from 'react-icons/io';
import {Input} from '@nextui-org/input';

interface InputTagsProps {
onChange: (tags: Tag[]) => void
}

const InputTags: FC<InputTagsProps> = ({onChange}) => {
    const [curTag, setCurTag] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);

    const inputTagHandle = (e: React.ChangeEvent<HTMLInputElement>) => setCurTag(e.target.value)

    const addTagHandle = () => {
        if (curTag.trim()) {
            setTags([...tags, {id: Date.now().toString(), value: curTag}]);
            setCurTag('');
            onChange(tags)
        }
    }

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
            <Input placeholder='Введите тег' className='input' classNames={{inputWrapper: ['input']}}
                   size="sm" value={curTag} onChange={inputTagHandle}/>
            <Button isIconOnly color="default" aria-label="Add tag" size="sm" onClick={addTagHandle}>
                <MdAdd/>
            </Button>
        </div>
    );
};

export default InputTags;