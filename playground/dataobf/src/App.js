import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

const App = () => {
  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
    onDrop,
    accept: 'text/csv',
    minSize: 0,
    maxSize,
  });

  const uploadFile = (file) => {
    var data = new FormData()
    data.append("file", file)

    fetch('http://localhost:8000/uploadfile', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(success => {
      })
      .catch(error => console.log(error)
    );
  }

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!isDragActive && 'Click here or drop a file to upload!'}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
        {(rejectedFiles > 0 && rejectedFiles[0].size > maxSize) && (
          <div className="text-danger mt-2">
            File is too large.
          </div>
        )}
      </div>
      <ul>
        {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
          <li >
            {acceptedFile.name}
            {uploadFile(acceptedFile)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;