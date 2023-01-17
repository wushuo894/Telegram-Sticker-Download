// ==UserScript==
// @name         电报贴图下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        https://web.telegram.org/z/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=telegram.org
// @grant        none
// ==/UserScript==

setInterval(() => {
    let stickerButtonWrapper = document.querySelector('.StickerSetModal .modal-content > .button-wrapper');
    if (!stickerButtonWrapper) {
        return;
    }

    if (document.querySelector('.StickerSetModal .modal-content > .button-wrapper > #stickerDownloadButton')) {
        return;
    }

    let downloadButton = document.createElement('button');
    downloadButton.id = 'stickerDownloadButton';
    downloadButton.className = 'Button smaller primary fluid';
    downloadButton.textContent = '贴图下载'
    downloadButton.onclick = () => {
        let index = 0;
        let stickerButtons = document.querySelectorAll('.stickers .StickerButton');
        for (let v of stickerButtons) {
            let childNode = v.childNodes[1];
            let strings = childNode.src.split('/');
            let fileName = `${strings[strings.length - 1]}${childNode.tagName === 'IMG' ? '.webp' : '.webm'}`
            setTimeout(() => {
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

    stickerButtonWrapper.append(downloadButton)
}, 1000);




