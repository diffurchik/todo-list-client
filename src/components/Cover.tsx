import {useAppContext} from "./appContext.tsx";
import {useCallback, useEffect, useState} from "react";
import styles from './input-style.module.css'


export const Cover: React.FC = () => {
    const {image, setImage} = useAppContext()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/uploads/lastfile')
            .then((res) => res.json())
            .then((data) => setImage(`http://localhost:3000/uploads/file/${data.file}`))
            .catch((err) => console.log(err));
    }, [setImage])

    const handleUpload =useCallback( async (file: File) => {
        if (!selectedFile) return
        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                console.log('File uploaded successfully')
                const data = await response.json();
                const fileName = data.filePath.split('/')[2]
                console.log(data)
                setImage(`http://localhost:3000/uploads/file/${fileName}`);
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log('error', error)
        }

    }, [setImage, selectedFile])

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setSelectedFile(file)

            const reader = new FileReader()
            reader.readAsDataURL(file)
            handleUpload(file)
        }
    }, [setImage, handleUpload])

    return <div className={styles.coverContainer}>{image &&
        <img className={styles.image} src={image} alt={'cover image'}/>}
        <input className={styles.hiddenInput} type="file" accept="image/*" onChange={handleFileChange}
               id='cover-input'/>
        <label htmlFor='cover-input' className={styles.imageUploadButton}>upload image</label>
    </div>
}

