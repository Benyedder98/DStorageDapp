import './App.css';
import { useState } from "react";
import { ethers } from "ethers"
import DStorageDapp from "./artifacts/contracts/DStorageDapp.sol/DStorageDapp.json"

const  dStorageDappAddress = "0x8Ca230F84b66a22D9df600309CA3f3184D05f6D8"

function App () {
  const [selectFile, setSelectFile] = useState()
  const [fileHash, fileHashValue] = useState ()
  const [fileSize, fileSizeValue] = useState ()
  const [fileType, fileTypeValue] = useState ()
  const [fileName, fileNameValue] = useState ()
  const [fileDescription, fileDescriptionValue] = useState ()
  async function requestAccount() {
      await window.ethereum.request({methods: 'eth_requestAccount'});
  }

  async function uploadFile() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(dStorageDappAddress, DStorageDapp.abi, signer);
      const upload = await contract.uploadFile(fileHash, fileSize, fileType, fileName, fileDescription);
      await upload.wait();

      console.log(fileHash);
    }
  }
  async function getFileOf() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider)
      const contract = new ethers.Contract(dStorageDappAddress, DStorageDapp.abi, provider)
      const file = await contract.getFileOf()

      console.log('files:',file)
    }
  }
  async function getTotalFileCount() {

  }
    return(
      <div className='App'>
        <div className='App-header'>
        <input type="file" value = {selectFile} onChange = {e => setSelectFile(e.target.files[0])} placeholder = "SELECTFILE" />
        <input onChange={e => fileHashValue(e.target.value)} placeholder = "FILEHASH"/> 
        <input onChange={e => fileSizeValue(e.target.value)} placeholder = "FILESIZE"/> 
        <input onChange={e => fileTypeValue(e.target.value)} placeholder = "FILETYPE"/> 
        <input onChange={e => fileNameValue(e.target.value)} placeholder = "FILENAME"/> 
        <input onChange={e => fileDescriptionValue(e.target.value)} placeholder = "FILEDESCRIPTION"/> 
          
        <button onClick={uploadFile}>UPLOAD-FILE</button>
        <button onClick={getFileOf}>GET-FILEOF</button>
        <button onClick={getTotalFileCount}>GET-TOTAL-FILEOF</button>
        </div>
      </div>
    );
}

export default App;
