import React, {FC} from 'react';
import {useTitleAppBar} from "@/providers/TitleAppBar";

interface AppbarProps {

}

const Appbar: FC<AppbarProps> = () => {
    const {title} = useTitleAppBar()
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

export default Appbar;