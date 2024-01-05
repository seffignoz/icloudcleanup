// ==UserScript==
// @name         iCloud Highlight Long Videos
// @version      2024-01-05
// @description  Highlights long videos (> 30 seconds) in icloud.com/photos (Click Media Types->Video Library)
// @author       Giorgio Di Guardia / Andy Kong
// @match        https://www.icloud.com/applications/photos3/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=icloud.com
// @grant        unsafeWindow
// @grant        GM_addStyle
// @run-at       document-start
// @downloadURL https://raw.githubusercontent.com/seffignoz/icloudcleanup/main/icloudcleanup.js
// @updateURL https://raw.githubusercontent.com/seffignoz/icloudcleanup/main/icloudcleanup.js
// ==/UserScript==

(function () {
    function boxTops() {
        const thresh = 30 // Min seconds to highlight a video
        HTMLCollection.prototype.toArray = function () { return Array.from(this); }

        // Select all the time badges and parse out their total runtime in seconds
        var a = document.getElementsByClassName('video-text-badge').toArray()
        let b = a.map((x) => x.innerText)
        let c = b.map((y) => y.split(":").map((x) => parseInt(x)))
        let d = c.map((x) => x[0] * 60 + x[1])

        // Sort the badges HTML array and badges runtime together
        let indices = Array.from(a.keys())
        indices.sort((x, y) => d[x] - d[y])

        let sortedA = indices.map(i => a[i])
        let sortedD = indices.map(i => d[i])


        // Function that boxes an element
        function drawBox(element) {
            if (element instanceof HTMLElement) {
                element.style.border = "5px solid red";
            }
        }


        for (let i = 0; i < sortedD.length; i++) {
            if (sortedD[i] > thresh) {
                drawBox(sortedA[i])
            } else {
                sortedA[i].parentNode.style.display = 'none';
            }
        }
    }

    // Continuously highlight big videos
    setInterval(boxTops, 500)

})();
