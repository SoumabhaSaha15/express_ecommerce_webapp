(() => {

  const gallary = document.querySelector('div#productGallery');
  const upload = document.querySelector('input#upload');
  // console.log(upload);
  upload.oninput = (event) => {
    try {
      if (event.target.files.length == 0) {
        gallary.innerHTML = `
        <div></div>
        <div style="text-shadow: 2px 2px 2px black;">No Images Uploaded</div>
        <div></div>
        `;
        gallary.style.backgroundImage = `url('/assets/3-images.svg')`;
      } else if (event.target.files.length > 8) {
        toast({ type: 'error', message: "Can't add more than 8 files" });
        document.forms['uploadProducts'].reset();
        gallary.innerHTML = `
        <div></div>
        <div style="text-shadow: 2px 2px 2px black;">No Images Uploaded</div>
        <div></div>
        `;
        gallary.style.backgroundImage = `url('/assets/3-images.svg')`;
      } else {
        gallary.innerHTML = ``;
        gallary.style.backgroundImage = ``;
        for (const imageBuffer of event.target.files) {
          if (imageBuffer.size <= (2 ** 20)) {
            gallary.innerHTML += `
            <div>
            <img 
            class="product object-cover object-center  max-w-15 max-h-15 h-15 w-15  rounded-lg"
            src="${URL.createObjectURL(imageBuffer)}"
            alt="${imageBuffer.name}"
            />
            </div>  
            `;
          } else {
            toast({ type: 'error', message: "Can't add more than 8 files" });
            document.forms['uploadProducts'].reset();
            gallary.innerHTML = `
            <div></div>
            <div style="text-shadow: 2px 2px 2px black;">No Images Uploaded</div>
            <div></div>
            `;
            gallary.style.backgroundImage = `url('/assets/3-images.svg')`;
          }
        }
      }
    } catch (error) {
      window.alert('file is larger than 5 MB');
    }
  }
})();