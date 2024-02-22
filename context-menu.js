document.addEventListener("DOMContentLoaded", function() {
    var body = document.body;
    var head = document.head;
    var elementsAdd = document.getElementById("add-elements");

    var linkTag = document.createElement("link");
    linkTag.setAttribute("rel", "stylesheet");
    linkTag.setAttribute("href", "context-menu/icon.css");
    head.appendChild(linkTag);
    
    let contextMenu = `
        <section class="context-menu">
        <button data-action="copy"><i class="cm-copy"></i></button>
        <button data-action="paste"><i class="cm-paste"></i></button>
        <button data-action="cut"><i class="cm-cut"></i></button>
        <button data-action="link"><i class="cm-link"></i></button>
        <button data-action="share"><i class="cm-share"></i></button>
        </section>`;
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = contextMenu;
    while (tempDiv.firstChild) {
        body.appendChild(tempDiv.firstChild);
    }
    tempDiv.parentNode.removeChild(tempDiv);
});