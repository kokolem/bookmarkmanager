(this.webpackJsonpbookmarkstorage=this.webpackJsonpbookmarkstorage||[]).push([[0],{266:function(e,a,t){e.exports=t(506)},506:function(e,a,t){"use strict";t.r(a);t(267),t(276);var n=t(0),r=t.n(n),o=t(18),c=t.n(o),l=t(240),i=t(247),s=t(29),u=t(102),m=t(243),d=t(561),b=t(564),p=t(562),g=t(104),f=t(560),k=t(508),h=t(568),E=t(552),v=t(509),j=t(565),C=t(566),w=t(559),O=t(574),y=t(246),S=t.n(y),N=t(167),x=t.n(N),T=t(166),M=t.n(T),B=t(245),W=t.n(B),F=t(573),I=t(13),U=t(558),R=t(28),A=t(571),L=t(103),q=t(567),V=t(87),P=t(248),z=t(563),G=t(572),D=t(553),J=t(554),H=t(555),Y=t(556),$=t(64);function K(e){var a=e.open,t=e.onClose,n=e.searchTerm,o=e.onSearchTermChange,c=e.onSearch;return r.a.createElement(G.a,{open:a,onClose:t},r.a.createElement(D.a,null,"Search"),r.a.createElement($.ValidatorForm,{onSubmit:c},r.a.createElement(J.a,null,r.a.createElement($.TextValidator,{label:"Name or URL",variant:"outlined",fullWidth:!0,value:n,onChange:o,validators:["required"],errorMessages:["This field is required"]})),r.a.createElement(H.a,null,r.a.createElement(Y.a,{color:"primary",onClick:t},"Close"),r.a.createElement(Y.a,{color:"primary",type:"submit"},"Search"))))}var Q=t(557),X=t(575),Z=t(239),_=t(569),ee=Object(m.a)((function(e){return{appBar:{position:"relative"},title:{marginLeft:e.spacing(2),flex:1},formFieldTopMargin:{marginTop:e.spacing(2)}}})),ae=r.a.forwardRef((function(e,a){return r.a.createElement(Q.a,Object.assign({direction:"up",ref:a},e))}));function te(e){var a=e.open,t=e.creatingNew,n=e.name,o=e.onNameChange,c=e.url,l=e.onUrlChange,i=e.category,s=e.onCategoryChange,u=e.bookmarkCategories,m=e.onClose,b=e.onSave,k=ee(),h=Object(U.a)(Object(R.a)().breakpoints.down("xs")),E=r.a.createElement(r.a.Fragment,null,r.a.createElement($.TextValidator,{label:"Name",variant:"outlined",fullWidth:!0,className:h?k.formFieldTopMargin:null,value:n,onChange:o,validators:["required"],errorMessages:["This field is required."]}),r.a.createElement($.TextValidator,{label:"URL",variant:"outlined",fullWidth:!0,className:k.formFieldTopMargin,value:c,onChange:l,validators:["required"],errorMessages:["This field is required."]}),r.a.createElement(_.a,{freeSolo:!0,options:u.map((function(e){return e.name})),defaultValue:i,inputValue:i,onInputChange:s,renderInput:function(e){return r.a.createElement(Z.a,Object.assign({},e,{label:"Category",variant:"outlined",fullWidth:!0,className:k.formFieldTopMargin}))}}));return r.a.createElement(G.a,{open:a,onClose:m,fullScreen:h,TransitionComponent:ae},h?r.a.createElement(r.a.Fragment,null,r.a.createElement($.ValidatorForm,{onSubmit:b},r.a.createElement(d.a,{className:k.appBar},r.a.createElement(p.a,null,r.a.createElement(f.a,{edge:"start",color:"inherit",onClick:m,"aria-label":"close"},r.a.createElement(X.a,null)),r.a.createElement(g.a,{variant:"h6",className:k.title},t?"Add bookmark":"Edit Bookmark"),r.a.createElement(Y.a,{color:"inherit",type:"submit"},"Save"))),r.a.createElement(J.a,null,E))):r.a.createElement(r.a.Fragment,null,r.a.createElement(D.a,null,t?"Add bookmark":"Edit Bookmark"),r.a.createElement($.ValidatorForm,{onSubmit:b},r.a.createElement(J.a,null,E),r.a.createElement(H.a,null,r.a.createElement(Y.a,{color:"primary",onClick:m},"Cancel"),r.a.createElement(Y.a,{color:"primary",type:"submit"},"Save")))))}var ne=Object(m.a)((function(e){return{text:{padding:e.spacing(2,2,0)},paper:Object(u.a)({margin:"auto",marginTop:e.spacing(3),maxWidth:"80vw",paddingBottom:e.spacing(8)},e.breakpoints.down("xs"),{margin:0,maxWidth:"100vw"}),subheader:{backgroundColor:e.palette.background.paper},appBar:{top:"auto",bottom:0},grow:{flexGrow:1},fabButton:{position:"absolute",zIndex:1,top:-30,left:0,right:0,margin:"0 auto"},search:{position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(I.c)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(I.c)(e.palette.common.white,.25)},width:"auto"},searchIcon:{width:e.spacing(7),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(u.a)({padding:e.spacing(1,1,1,7),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:200}),noBookmarksText:{padding:e.spacing(2,2,0)}}}));var re=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function oe(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(r.a.createElement((function(){var e=ne(),a=Object(L.useLocalStorage)("bookmarkCategories",[{id:1,name:"Uncategorized",bookmarks:[{id:1,name:"Edit me!",url:"https://example.com",categoryName:"Uncategorized"}]}]),t=Object(s.a)(a,1)[0],o=Object(V.usePopupState)({variant:"popover",popupId:"bookmarkMenu"}),c=Object(n.useState)(null),u=Object(s.a)(c,2),m=u[0],y=u[1],N=Object(n.useState)(!1),T=Object(s.a)(N,2),B=T[0],I=T[1],$=Object(n.useState)(!1),Q=Object(s.a)($,2),X=Q[0],Z=Q[1],_=function(e){var a=t.slice(0),n=a.find((function(e){return e.name===m.categoryName})),r=n.bookmarks.indexOf(m);n.bookmarks.splice(r-e,0,n.bookmarks.splice(r,1)[0]),Object(L.writeStorage)("bookmarkCategories",a)},ee=Object(n.useState)(""),ae=Object(s.a)(ee,2),re=ae[0],oe=ae[1],ce=Object(n.useState)("https://"),le=Object(s.a)(ce,2),ie=le[0],se=le[1],ue=Object(n.useState)(""),me=Object(s.a)(ue,2),de=me[0],be=me[1],pe=Object(n.useState)(!1),ge=Object(s.a)(pe,2),fe=ge[0],ke=ge[1],he=Object(n.useState)(-1),Ee=Object(s.a)(he,2),ve=Ee[0],je=Ee[1],Ce=Object(n.useState)(!1),we=Object(s.a)(Ce,2),Oe=we[0],ye=we[1],Se=Object(n.useState)(!1),Ne=Object(s.a)(Se,2),xe=Ne[0],Te=Ne[1],Me=Object(n.useState)(""),Be=Object(s.a)(Me,2),We=Be[0],Fe=Be[1],Ie=Object(n.useState)(""),Ue=Object(s.a)(Ie,2),Re=Ue[0],Ae=Ue[1],Le=Object(n.useState)(t),qe=Object(s.a)(Le,2),Ve=qe[0],Pe=qe[1];Object(n.useEffect)((function(){if(""===Re)Pe(t);else{var e=t.slice(0);e=(e=e.map((function(e){return Object(l.a)({},e,{bookmarks:e.bookmarks.filter((function(e){return e.name.toLowerCase().includes(Re.toLowerCase())||e.url.toLowerCase().includes(Re.toLowerCase())}))})}))).filter((function(e){return 0!==e.bookmarks.length})),Pe(e)}}),[t,Re]);var ze=Object(V.usePopupState)({variant:"popover",popupId:"appMenu"}),Ge=Object(n.useState)(!1),De=Object(s.a)(Ge,2),Je=De[0],He=De[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(G.a,{open:Je,onClose:function(){return He(!1)}},r.a.createElement(D.a,null,"About app"),r.a.createElement(J.a,null,r.a.createElement(g.a,{color:"textSecondary"},"This web app was created using React and Material-UI. It uses your browsers local storage to store the bookmarks. It's also a PWA, which means you can install it like a native app and use it even offline.",r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("b",null,"GitHub:")," ",r.a.createElement("a",{href:"https://github.com/kokolem/bookmarkmanager"},"https://github.com/kokolem/bookmarkmanager"))),r.a.createElement(H.a,null,r.a.createElement(Y.a,{color:"primary",onClick:function(){return He(!1)}},"Close"))),r.a.createElement(K,{open:xe,onClose:function(){return Te(!1)},searchTerm:We,onSearchTermChange:function(e){return Fe(e.target.value)},onSearch:function(){Te(!1),Ae(We)}}),r.a.createElement(te,{open:fe,creatingNew:Oe,name:re,onNameChange:function(e){return oe(e.target.value)},url:ie,onUrlChange:function(e){return se(e.target.value)},category:de,onCategoryChange:function(e,a){return be(a)},bookmarkCategories:t,onClose:function(){return ke(!1)},onSave:function(){ke(!1),function(){var e=t.slice(0),a=""===de?"Uncategorized":de,n={id:-1,name:re,url:ie,categoryName:a};if(Oe)n.id=Math.max.apply(Math,Object(i.a)(e.reduce((function(e,a){return e.concat(a.bookmarks.map((function(e){return e.id})))}),[])))+1,n.id===-1/0&&(n.id=1);else{n.id=ve;var r=e.find((function(e){return e.bookmarks.map((function(e){return e.id})).includes(ve)}));r.bookmarks=r.bookmarks.filter((function(e){return e.id!==ve})),e=e.filter((function(e){return 0!==e.bookmarks.length}))}var o=e.find((function(e){return e.name===a}));if(void 0===o){var c={id:e.reduce((function(e,a){return Math.max(a.id,e)}),0)+1,name:a,bookmarks:[n]};"Uncategorized"===a?e.unshift(c):e.push(c)}else o.bookmarks.push(n);Object(L.writeStorage)("bookmarkCategories",e)}()}}),r.a.createElement(P.a,Object(V.bindMenu)(ze),r.a.createElement(z.a,{onClick:function(){ze.close(),He(!0)}},"About app")),r.a.createElement(P.a,Object(V.bindMenu)(o),r.a.createElement(z.a,{onClick:function(){var e;o.close(),oe((e=m).name),se(e.url),be(e.categoryName),je(e.id),ye(!1),ke(!0)}},"Edit"),r.a.createElement(z.a,{onClick:function(){o.close(),function(){var e=t.slice(0),a=e.find((function(e){return e.name===m.categoryName}));a.bookmarks=a.bookmarks.filter((function(e){return e.id!==m.id})),e=e.filter((function(e){return 0!==e.bookmarks.length})),Object(L.writeStorage)("bookmarkCategories",e)}()}},"Delete"),B&&r.a.createElement(z.a,{onClick:function(){o.close(),_(1)}},"Move up"),X&&r.a.createElement(z.a,{onClick:function(){o.close(),_(-1)}},"Move down")),r.a.createElement(b.a,null),r.a.createElement(k.a,{className:e.paper,square:Object(U.a)(Object(R.a)().breakpoints.down("xs"))},r.a.createElement(g.a,{className:e.text,variant:"h5",gutterBottom:!0},"Your bookmarks"),r.a.createElement(E.a,null,Ve.map((function(a){return r.a.createElement(r.a.Fragment,{key:"category".concat(a.id)},r.a.createElement(w.a,{className:e.subheader},a.name),a.bookmarks.map((function(e){return r.a.createElement(r.a.Fragment,{key:"bookmark".concat(e.id)},r.a.createElement(v.a,{button:!0,component:"a",href:e.url},r.a.createElement(j.a,null,r.a.createElement(O.a,{alt:"Bookmarked websites favicon",src:"https://s2.googleusercontent.com/s2/favicons?domain=".concat(e.url)},e.name[0])),r.a.createElement(C.a,{primary:e.name,secondary:e.url}),r.a.createElement(q.a,null,r.a.createElement(f.a,{edge:"end",onClick:function(a){return function(e,a){y(e);var n=t.find((function(a){return a.name===e.categoryName}));I(n.bookmarks[0]!==e),Z(n.bookmarks.slice(-1)[0]!==e),o.toggle(a)}(e,a)}},r.a.createElement(M.a,null)))))})))}))),0===Ve.length&&r.a.createElement(r.a.Fragment,null,""===Re?r.a.createElement(g.a,{color:"textSecondary",className:e.noBookmarksText},"No bookmarks saved. Go add some!"):r.a.createElement(g.a,{color:"textSecondary",className:e.noBookmarksText},"No bookmarks found for your query."))),r.a.createElement(d.a,{position:"fixed",color:"primary",className:e.appBar},r.a.createElement(p.a,null,r.a.createElement(A.a,{xsDown:!0},r.a.createElement("div",{className:e.search},r.a.createElement("div",{className:e.searchIcon},r.a.createElement(x.a,null)),r.a.createElement(F.a,{placeholder:"Search\u2026",value:Re,onChange:function(e){return Ae(e.target.value)},classes:{root:e.inputRoot,input:e.inputInput},inputProps:{"aria-label":"search"}}))),r.a.createElement(A.a,{smUp:!0},r.a.createElement(f.a,{color:"inherit",onClick:function(){return Te(!0)}},r.a.createElement(x.a,null)),""!==Re&&r.a.createElement(f.a,{color:"inherit",onClick:function(){Ae(""),Fe("")}},r.a.createElement(W.a,null))),r.a.createElement(h.a,{color:"secondary","aria-label":"add",className:e.fabButton,onClick:function(){oe(""),se("https://"),be(""),je(-1),ye(!0),ke(!0)}},r.a.createElement(S.a,null)),r.a.createElement("div",{className:e.grow}),r.a.createElement(f.a,Object.assign({edge:"end",color:"inherit"},Object(V.bindToggle)(ze)),r.a.createElement(M.a,null)))))}),null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/bookmarkmanager",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("/bookmarkmanager","/service-worker.js");re?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):oe(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):oe(a,e)}))}}()}},[[266,1,2]]]);
//# sourceMappingURL=main.b3a022be.chunk.js.map