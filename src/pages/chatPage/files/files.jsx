import './files.css';
import { useEffect, useState } from 'react';
import { baseURL } from '../../../components/auth/auth';
import { useCookies } from 'react-cookie';

function Files({ conversation }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [files, setFiles] = useState([]);

    useEffect(() => {
        baseURL.get('/api/v1/chats/fetch-file-message/conversationId=' + conversation, {
            headers: {
                Authorization: 'Bearer ' + cookies
            }
        }).then((response) => {
            setFiles(response.data);
        })
    }, [conversation, cookies])

    return (
        <div className='chatPageFileList'>
            {
                files.map((file) => (
                    <img key={file.id} className='chatPageFileItems' src={file.media_file_name} alt="" />
                ))
            }
        </div>
    )
}

export default Files;