!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),d=null;t.addEventListener("click",(function(){t.disabled=!0,n.disabled=!1,d=setInterval((function(){return e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),n.addEventListener("click",(function(){clearInterval(d),t.disabled=!1,n.disabled=!0})),n.disabled=!0}();
//# sourceMappingURL=01-color-switcher.5ee2e1ef.js.map
