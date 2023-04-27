// ==UserScript==
// @name         电报贴图下载
// @namespace    https://github.com/W2725730722/Telegram-Sticker-Download
// @version      0.1
// @author       wushuo
// @match        https://web.telegram.org/k/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=telegram.org
// @require      http://jnordberg.github.io/gif.js/gif.js?v=3
// @grant        none
// ==/UserScript==

setInterval(() => {
    let ssf = document.querySelector('.popup-body .popup-footer');
    if (!ssf) {
        return;
    }

    if (document.querySelector('.popup-body #stickerDownloadButton')) {
        return;
    }

    let downloadButton = document.createElement('button');
    downloadButton.id = 'stickerDownloadButton';
    downloadButton.className = 'btn-primary btn-color-primary';
    downloadButton.textContent = '贴图下载'

    ssf.append(downloadButton)


    downloadButton.onclick = () => {
        let index = 0;
        let stickerButtons = document.querySelectorAll('.sticker-set-stickers .sticker-set-sticker');
        for (let v of stickerButtons) {
            let childNode = v.childNodes[0];
            let strings = childNode.src.split('/');
            let fileName = `${strings[strings.length - 1]}${childNode.tagName === 'IMG' ? '.png' : '.webm'}`
            setTimeout(() => {
                if (childNode.tagName === 'IMG') {
                    const image = new Image();
                    image.src = childNode.src;
                    image.onload = function () {
                        const canvas = document.createElement("canvas");
                        canvas.width = image.width;
                        canvas.height = image.height;
                        canvas.getContext("2d").drawImage(image, 0, 0);

                        const link = document.createElement('a');
                        link.style.display = 'none';
                        link.href = canvas.toDataURL('image/png');
                        link.setAttribute('download', fileName);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                    return
                }

                let x = new XMLHttpRequest()
                x.open('GET', childNode.src, true)
                x.responseType = 'blob'
                x.onload = () => {
                    console.log(childNode.src);
                    let url = window.URL.createObjectURL(x.response)
                    let a = document.createElement('a')
                    a.href = url
                    a.download = fileName
                    a.click()
                }
                x.send()
            }, 1000 * index)
            index++
        }
        window.alert(`下载已开始 共${stickerButtons.length}个贴图`)
    };


}, 1000);
