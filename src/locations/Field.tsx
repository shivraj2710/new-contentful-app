import { FieldAppSDK } from '@contentful/app-sdk';
import { Paragraph,  } from '@contentful/f36-components';
import {  useCMA,  useSDK } from '@contentful/react-apps-toolkit';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const cma = useCMA();
  const editorRef = useRef<any>(null); // Using `any` temporarily for editorRef

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
    console.log(sdk, cma);
  };

  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  return <>
  <div style={{display: 'flex', flexDirection: 'column'}}>
  <Editor
        apiKey='your-api-key'
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
  <Paragraph>Hello Entry Field Component (AppId: {sdk.ids.app})</Paragraph></>;
};

export default Field;
