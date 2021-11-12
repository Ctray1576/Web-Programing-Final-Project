/**
 * encrypt a given file in AES
 * @param {*} file the file (it only accepts one file, folder or multiple files don't work)
 * @param {*} password password to encrypt
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
 function encryptAES(file, password, progressCB, cb) {
    try {
      if (
        !(file instanceof File) ||
        typeof progressCB !== "function" ||
        typeof cb !== "function" ||
        !password
      )
        return;
  
      const fileReader = new FileReader();
  
      fileReader.onprogress = (evt) => {
        progressCB(Math.floor(evt.loaded / evt.total) * 100);
      };
  
      fileReader.onload = (evt) => {
        const data = evt.target.result;
  
        const encryptedData = new TextEncoder().encode(
          CryptoJS.AES.encrypt(data, password).toString()
        );
  
        const fileStream = streamSaver.createWriteStream(`${file.name}.aes`, {
          size: encryptedData.byteLength,
          writableStrategy: undefined, // (optional)
          readableStrategy: undefined, // (optional)
        });
  
        cb();
  
        const writer = fileStream.getWriter();
        writer.write(encryptedData);
        writer.close();
      };
  
      fileReader.readAsBinaryString(file);
    } catch (error) {
      console.error("an error occurred while encrypting in catch", error);
    }
  }
  
  /**
   * decrypts a given file in AES
   * @param {*} file the file (it only accepts one file, folder or multiple files don't work)
   * @param {*} password password to encrypt
   * @param {*} progressCB this function will be called everytime the progress updated
   * @param {*} cb this function will called when there is an error or the compression is success
   */
  function decryptAES(file, password, progressCB, cb) {
    try {
      if (
        !(file instanceof File) ||
        typeof progressCB !== "function" ||
        typeof cb !== "function" ||
        !password
      )
        return;
  
      const fileReader = new FileReader();
  
      fileReader.onprogress = (evt) => {
        progressCB(Math.floor(evt.loaded / evt.total) * 100);
      };
  
      fileReader.onload = (evt) => {
        const data = evt.target.result;
  
        console.log(data);
  
        const decryptedData = new TextEncoder().encode(
          CryptoJS.AES.decrypt(data, password).toString(CryptoJS.enc.Utf8)
        );
  
        const filename = getFileName(file.name, "aes", "aes_decrypted");
  
        const fileStream = streamSaver.createWriteStream(filename, {
          size: decryptedData.byteLength, // (optional filesize) Will show progress
          writableStrategy: undefined, // (optional)
          readableStrategy: undefined, // (optional)
        });
  
        cb();
  
        const writer = fileStream.getWriter();
        writer.write(decryptedData);
        writer.close();
      };
  
      fileReader.readAsBinaryString(file);
    } catch (error) {
      console.error("an error occurred while decrypting in catch", error);
    }
  }

  /*<div id="modal1en">
  <h1>Encrypt</h1>
  
  Select image to upload:
  <input type="file" name="fileToUpload" id="file-input">
  
  <br>
  <button id="AES-encode" onclick="aesEncrypt()">AES Encrypt</button>
  <button id="3DES-encode" onclick="tripledes()">3DES Encrypt</button>
  <button id="Rabbit-encode" onclick="rabbit()">Rabbit Encrypt</button>
  <br>
  <br>
  <textarea id="file-encode" rows="4" cols="50"></textarea>
  <br>
  <br>
  <button id="close" onclick="closes1en()">Continue</button>
  <button id="close" onclick="userClose1En()">Cancel</button>
</div>

document.getElementById("AES-encode").addEventListener('click', function() {
    let file = document.getElementById("file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
            let text = e.target.result;
            var encrypted = CryptoJS.AES.encrypt(text, "password");
            var decrypted = CryptoJS.AES.decrypt(encrypted, "password");
            document.getElementById("file-encode").textContent = encrypted;
            document.getElementById("file-decode").textContent = decrypted;
    });
    reader.readAsText(file);
});
document.getElementById("3DES-encode").addEventListener('click', function() {
    let file = document.getElementById("file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
            let text = e.target.result;
            var encrypted = CryptoJS.TripleDES.encrypt(text, "password");
            var decrypted = CryptoJS.TripleDES.decrypt(encrypted, "password");
            document.getElementById("file-encode").textContent = encrypted;
            document.getElementById("file-decode").textContent = decrypted;
    });
    reader.readAsText(file);
});
document.getElementById("Rabbit-encode").addEventListener('click', function() {
    let file = document.getElementById("file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
            let text = e.target.result;
            var encrypted = CryptoJS.Rabbit.encrypt(text, "password");
            var decrypted = CryptoJS.Rabbit.decrypt(encrypted, "password");
            document.getElementById("file-encode").textContent = encrypted;
            document.getElementById("file-decode").textContent = decrypted;
    });
    reader.readAsText(file);
});*/

