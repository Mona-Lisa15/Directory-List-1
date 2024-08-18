document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    renderDirectory(directoryData, app);
  });

  function renderDirectory(directory, parentElement) {
    const directoryContainer = document.createElement('div');
    directoryContainer.className = 'directory';
  
    // Directory header
    const directoryHeader = document.createElement('div');
    directoryHeader.className = 'directory-header';
    directoryHeader.innerHTML = `
      <span>${directory.name}</span>
      <span>(${directory.subDirectories.length} sub-directories, ${directory.files.length} files)</span>
      <span class="info-icon">ℹ️</span>
    `;
  
    // Meta information on hover
    directoryHeader.querySelector('.info-icon').addEventListener('mouseover', () => {
      const metaInfo = calculateMeta(directory);
      alert(`Name: ${directory.name}\nTotal Subdirectories: ${metaInfo.subDirs}\nTotal Files: ${metaInfo.files}`);
    });
  
    directoryContainer.appendChild(directoryHeader);
    parentElement.appendChild(directoryContainer);
  
    // Child container (recursive rendering)
    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'directory-children';
    directoryContainer.appendChild(childrenContainer);
  
    // Event to toggle children visibility
    directoryHeader.addEventListener('click', () => {
      childrenContainer.classList.toggle('visible');
    });
  
    // Recursively render sub-directories
    directory.subDirectories.forEach(subDir => {
      renderDirectory(subDir, childrenContainer);
    });
  
    // Render files
    const fileList = document.createElement('ul');
    directory.files.forEach(file => {
      const fileItem = document.createElement('li');
      fileItem.textContent = file;
      fileList.appendChild(fileItem);
    });
    childrenContainer.appendChild(fileList);
  
    // Add "Add Directory/File" and "Delete" buttons
    const addDirectoryBtn = document.createElement('button');
    addDirectoryBtn.textContent = '+ Add Directory';
    addDirectoryBtn.addEventListener('click', () => {
      directory.subDirectories.push({ name: `New Folder`, subDirectories: [], files: [] });
      renderDirectory(directory, parentElement);
    });
    directoryContainer.appendChild(addDirectoryBtn);
  
    const addFileBtn = document.createElement('button');
    addFileBtn.textContent = '+ Add File';
    addFileBtn.addEventListener('click', () => {
      directory.files.push(`NewFile.txt`);
      renderDirectory(directory, parentElement);
    });
    directoryContainer.appendChild(addFileBtn);
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      parentElement.removeChild(directoryContainer);
    });
    directoryContainer.appendChild(deleteBtn);
  }
  
  // Calculate Meta Information (Recursive)
  function calculateMeta(directory) {
    let subDirCount = directory.subDirectories.length;
    let fileCount = directory.files.length;
    let totalSubDirs = subDirCount;
    let totalFiles = fileCount;
  
    directory.subDirectories.forEach(subDir => {
      const { subDirs, files } = calculateMeta(subDir);
      totalSubDirs += subDirs;
      totalFiles += files;
    });
  
    return { subDirs: totalSubDirs, files: totalFiles };
  }
  

  const directoryData = {
    name: "Root",
    subDirectories: [
      {
        name: "Folder 1",
        subDirectories: [
          { name: "Subfolder 1-1", subDirectories: [], files: ["file1.txt", "file2.txt"] },
          { name: "Subfolder 1-2", subDirectories: [], files: [] }
        ],
        files: ["file3.txt"]
      },
      {
        name: "Folder 2",
        subDirectories: [],
        files: ["file4.txt", "file5.txt"]
      }
    ],
    files: ["rootFile1.txt"]
  };
  