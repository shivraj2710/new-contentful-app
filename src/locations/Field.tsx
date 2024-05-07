import { FieldAppSDK } from '@contentful/app-sdk';
import { useAutoResizer, useFieldValue, useSDK } from '@contentful/react-apps-toolkit';
import { useMemo, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const editorRef = useRef<any>(null);
  const [value, setValue] = useFieldValue<string>(sdk.field.id, 'en-US');
  const initialValue = useMemo(() => value, []);
  useAutoResizer();

  const log = () => {
    if (editorRef.current) {
      setValue(editorRef.current.getContent());
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Editor
        onKeyUp={log}
        apiKey='ew3aymb0j6kompypnggrtkkk90goygpbj5fz3hz6cd57d5gy'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={initialValue ?? ''}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: red; }'
        }}
      />
    </div>)
};

export default Field;
