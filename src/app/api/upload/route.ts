import {NextRequest, NextResponse} from 'next/server';
import {join} from 'path';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';

type FileStatus = {
    name: string,
    uploading: boolean
}

type DataResponse = {
    result: boolean,
    files: FileStatus[]
}

const checkBasePath = () => {
    const pathStorage = process.env.PATH_STORE_IMAGES || 'D:\\invest-attachments';

    if (!fs.existsSync(pathStorage)) {
        // Если путь не существует, создаем его
        fs.mkdirSync(pathStorage, {recursive: true});
        console.log('Путь создан:', pathStorage);
    } else {
        console.log('Путь уже существует:', pathStorage);
    }

    return pathStorage;
};

export async function POST(req: NextRequest) {
    const respData: DataResponse = {
        result: true,
        files: []
    };

    const formData: FormData = await req.formData();
    const files = Array.from(formData.values()).filter(f => f instanceof File);
    console.log(files);

    const promises = files.map(async f => {
        const file: File | null = f as unknown as File;

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const path = join(checkBasePath(), 'images', `${file.name}`);

            try {
                await fsPromises.writeFile(path, buffer);
                respData.files.push({
                    name: file.name,
                    uploading: true
                });
            } catch (error) {
                console.error(error);
                respData.files.push({
                    name: file.name,
                    uploading: false
                });
            }
            return path;
        }
    });

    try {
        await Promise.all(promises);
        return NextResponse.json(respData, {status: 200})
    } catch (error) {
        console.error(error);
        return  NextResponse.json(respData, {status: 500});
    }
}