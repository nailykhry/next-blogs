import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ value, onChange }) => {
  const handleEditorChange = (content) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Editor
      apiKey="niz29b5fs89xadxvyhljxb0ddrqkzw7qna270gppkh5dauin"
      value={value}
      init={{
        height: 400,
        menubar: false,
        plugins: ['image'],
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough  | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TextEditor;
