import { FieldAppSDK } from '@contentful/app-sdk';
import { Paragraph,  } from '@contentful/f36-components';
import {  useAutoResizer, useCMA,  useFieldValue,  useSDK } from '@contentful/react-apps-toolkit';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const cma = useCMA();
  const editorRef = useRef<any>(null); 
  const [value, setValue] = useFieldValue<string>(sdk.field.id, 'en-US');
  useAutoResizer();

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current, "SDTEST");
      setValue(editorRef.current.getContent());
    }
  };

  return <>
  <div style={{display: 'flex', flexDirection: 'column'}}>
  <Editor
        apiKey='ew3aymb0j6kompypnggrtkkk90goygpbj5fz3hz6cd57d5gy'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </div>
    <input value={value ?? ''} onChange={(e) => setValue(e.target.value)} />
  <Paragraph>Hello Entry Field Component (AppId: {sdk.ids.app})</Paragraph></>;
};

export default Field;
