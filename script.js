const fileURL = document.querySelector("input");
const downloadBtn = document.querySelector(".download-btn");

// http://127.0.0.1:5500/index.html

downloadBtn.addEventListener("click", e=>{
    e.preventDefault(); // this prevents the form from submitting
    downloadBtn.innerText = "Downloading File..."
    fetchFile(fileURL.value);
});

function fetchFile(url){
    // blob() function is part of response interface
    // it takes the response stream and reads it to completion
    fetch(url).then(res=> res.blob()).then(file=>{
        let tempURL = URL.createObjectURL(file); // URL.createObjectURL() function creates the URL of the file parsed
        let aTag = document.createElement("a"); // creates the element of aTag
        aTag.href = tempURL; // this passes the tempURL as href value with <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, ''); // This is  downloading
        document.body.appendChild(aTag); // adding the <a> tag in the body
        //console.log(tempURL);
        aTag.click(); // this will start the download
        aTag.remove(); // this removes the a taf
        URL.revokeObjectURL(tempURL); // removes the tempURL from document
        downloadBtn.innerText = "Download file"
    }).catch(()=>{
        downloadBtn.innerText = "Download file";
        alert("Failed to Download this file....File might Not be available in public domain😔")
    })
}