"use strict";(self.webpackChunkhyres=self.webpackChunkhyres||[]).push([[397],{60619:(e,t,n)=>{n.d(t,{Z:()=>c});var i=n(47630),o=n(12065),s=n(13967),a=n(64554),l=n(80184);const r=(0,i.ZP)("span")((e=>{let{theme:t,ownerState:n}=e;const i="light"===t.palette.mode,{color:s,variant:a}=n;return{height:22,minWidth:22,lineHeight:0,borderRadius:6,cursor:"default",alignItems:"center",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",padding:t.spacing(0,1),color:t.palette.grey[800],fontSize:t.typography.pxToRem(12),fontFamily:t.typography.fontFamily,backgroundColor:t.palette.grey[300],fontWeight:t.typography.fontWeightBold,..."default"!==s?{..."filled"===a&&{...(e=>({color:t.palette[e].contrastText,backgroundColor:t.palette[e].main}))(s)},..."outlined"===a&&{...(e=>({color:t.palette[e].main,backgroundColor:"transparent",border:`1px solid ${t.palette[e].main}`}))(s)},..."ghost"===a&&{...(e=>({color:t.palette[e][i?"dark":"light"],backgroundColor:(0,o.Fq)(t.palette[e].main,.16)}))(s)}}:{..."outlined"===a&&{backgroundColor:"transparent",color:t.palette.text.primary,border:`1px solid ${t.palette.grey[50032]}`},..."ghost"===a&&{color:i?t.palette.text.secondary:t.palette.common.white,backgroundColor:t.palette.grey[50016]}}}}));function c(e){let{children:t,color:n="default",variant:i="ghost",startIcon:o,endIcon:c,sx:d}=e;const h=(0,s.Z)(),x={width:16,height:16,"& svg, img":{width:1,height:1,objectFit:"cover"}};return(0,l.jsxs)(r,{ownerState:{color:n,variant:i},sx:{...o&&{pl:.75},...c&&{pr:.75},...d},theme:h,children:[o&&(0,l.jsx)(a.Z,{sx:{mr:.75,...x},children:o}),t,c&&(0,l.jsx)(a.Z,{sx:{ml:.75,...x},children:c})]})}},57397:(e,t,n)=>{n.d(t,{gU:()=>we,No:()=>be,AO:()=>oe,n4:()=>ke,Ok:()=>Ie,nk:()=>Se,Ph:()=>se});var i=n(72791),o=n(57621),s=n(2101),a=n(43896),l=n(94721),r=n(39281),c=n(82477),d=n(13400),h=n(79836),x=n(53382),u=n(64554),p=n(63033),m=n(85523),g=n(9955);function j(e,t,n){return t[n]<e[n]?-1:t[n]>e[n]?1:0}function f(e,t){return"desc"===e?(e,n)=>j(e,n,t):(e,n)=>-j(e,n,t)}function Z(e,t,n){return e>0?Math.max(0,(1+e)*t-n):0}var b=n(46865),v=n(35855),w=n(53994),y=n(47630),S=n(20890),C=n(4010),k=n(80184);const R=(0,y.ZP)(u.Z)((e=>{let{theme:t}=e;return{height:"100%",display:"flex",textAlign:"center",alignItems:"center",flexDirection:"column",justifyContent:"center",padding:t.spacing(8,2)}}));function I(e){let{title:t,description:n,img:i,...o}=e;return(0,k.jsxs)(R,{...o,children:[(0,k.jsx)(C.Z,{disabledEffect:!0,visibleByDefault:!0,alt:"empty content",src:i||"/assets/illustrations/illustration_empty_content.svg",sx:{height:240,mb:3}}),(0,k.jsx)(S.Z,{variant:"h5",gutterBottom:!0,children:t}),n&&(0,k.jsx)(S.Z,{variant:"body2",sx:{color:"text.secondary"},children:n})]})}function A(e){let{isNotFound:t}=e;return(0,k.jsx)(v.Z,{children:t?(0,k.jsx)(w.Z,{colSpan:12,children:(0,k.jsx)(I,{title:"No Data",sx:{"& span.MuiBox-root":{height:160}}})}):(0,k.jsx)(w.Z,{colSpan:12,sx:{p:0}})})}var O=n(82097);function T(e){let{emptyRows:t,height:n}=e;return t?(0,k.jsx)(v.Z,{sx:{...n&&{height:n*t}},children:(0,k.jsx)(w.Z,{colSpan:9})}):null}var D=n(56890),P=n(94454),E=n(80720);const z={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function _(e){let{order:t,orderBy:n,rowCount:i=0,headLabel:o,numSelected:s=0,onSort:a,onSelectAllRows:l,sx:r}=e;return(0,k.jsx)(D.Z,{sx:r,children:(0,k.jsxs)(v.Z,{children:[l&&(0,k.jsx)(w.Z,{padding:"checkbox",children:(0,k.jsx)(P.Z,{indeterminate:s>0&&s<i,checked:i>0&&s===i,onChange:e=>l(e.target.checked)})}),o.map((e=>(0,k.jsx)(w.Z,{align:e.align||"left",sortDirection:n===e.id&&t,sx:{width:e.width,minWidth:e.minWidth},children:a?(0,k.jsxs)(E.Z,{hideSortIcon:!0,active:n===e.id,direction:n===e.id?t:"asc",onClick:()=>a(e.id),sx:{textTransform:"capitalize"},children:[e.label,n===e.id?(0,k.jsx)(u.Z,{sx:{...z},children:"desc"===t?"sorted descending":"sorted ascending"}):null]}):e.label},e.id)))]})})}var N=n(67414);function F(e){let{dense:t,actions:n,rowCount:i,numSelected:o,onSelectAllRows:s,sx:a,...l}=e;return(0,k.jsxs)(N.Z,{direction:"row",alignItems:"center",sx:{px:2,top:0,left:8,right:8,zIndex:9,height:58,borderRadius:1,position:"absolute",bgcolor:"primary.lighter",...t&&{pl:1,height:38},...a},...l,children:[(0,k.jsx)(P.Z,{indeterminate:o>0&&o<i,checked:i>0&&o===i,onChange:e=>s(e.target.checked)}),(0,k.jsxs)(S.Z,{variant:"subtitle1",sx:{ml:2,flexGrow:1,color:"primary.main",...t&&{ml:3}},children:[o," selected"]}),n&&n]})}var q=n(13239);function B(){return(0,k.jsx)(u.Z,{sx:{position:"absolute",background:"#ffffffa1",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1},children:(0,k.jsx)(q.Z,{})})}var W=n(23786),M=n(56125),V=n(24273);function G(e){let{actions:t,open:n,onClose:i,onOpen:o}=e;return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(d.Z,{onClick:o,children:(0,k.jsx)(b.Z,{icon:"eva:more-vertical-fill",width:20,height:20})}),(0,k.jsx)(O.Z,{open:Boolean(n),anchorEl:n,onClose:i,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},arrow:"right-top",sx:{mt:-1,width:"auto","& .MuiMenuItem-root":{px:1,typography:"body2",borderRadius:.75,"& svg":{mr:2,width:20,height:20}}},children:t})]})}var K=n(36151),H=n(65661),L=n(46523),U=n(5915),X=n(87290),Y=n(98246);function $(e){let{data:{organizationId:t,description:n,vision:s,createdAt:a,lastUpdatedAt:l,daoActions:r}}=e;const{enqueueSnackbar:c}=(0,Y.Ds)(),[d,h]=(0,i.useState)(!1),[x,p]=(0,i.useState)(""),[m,g]=(0,i.useState)(null),{getApplicantsToOrganization:j,applicantsToOrganization:f}=(0,U.Wy)(),[Z,v]=(0,i.useState)(""),[w,y]=(0,i.useState)([]);(0,i.useEffect)((()=>{if((null===f||void 0===f?void 0:f.length)>0){const e=f.map((e=>e.name));y(e)}}),[f]);return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(u.Z,{pt:"2rem",pb:"2rem",children:(0,k.jsxs)(o.Z,{sx:{p:3},children:[(0,k.jsxs)(u.Z,{display:"flex",maxWidth:"80%",children:[(0,k.jsxs)(N.Z,{spacing:3,flex:"1",children:[(0,k.jsxs)(u.Z,{children:[(0,k.jsx)(S.Z,{variant:"h6",children:"Description"}),(0,k.jsx)(S.Z,{children:n})]}),(0,k.jsxs)(u.Z,{children:[(0,k.jsx)(S.Z,{variant:"h6",children:"Vision"}),(0,k.jsx)(S.Z,{children:s})]})]}),(0,k.jsxs)(N.Z,{spacing:3,flex:"1",children:[(0,k.jsxs)(u.Z,{children:[(0,k.jsx)(S.Z,{variant:"h6",children:"Created At"}),(0,k.jsx)(S.Z,{children:a})]}),(0,k.jsxs)(u.Z,{children:[(0,k.jsx)(S.Z,{variant:"h6",children:"Last Updated At"}),(0,k.jsx)(S.Z,{children:l})]})]})]}),(0,k.jsx)(u.Z,{sx:{mt:{xs:2,sm:0},position:{sm:"absolute"},top:{sm:24},right:{sm:24}},children:null===r||void 0===r?void 0:r.map(((e,t)=>(0,k.jsx)(K.Z,{variant:"contained",startIcon:(0,k.jsx)(b.Z,{icon:"eva:plus-fill"}),sx:{mr:t<r.length-1?1:0},onClick:()=>{h(!0),p(e.label),g(e.id)},children:e.label},e.id)))})]})}),(0,k.jsxs)(X.Kl,{open:d,onClose:()=>h(!1),children:[(0,k.jsx)(H.Z,{children:x}),(0,k.jsxs)(u.Z,{p:"1.5rem",children:[m===L.Ef.ADD_TASKS&&(0,k.jsx)(u.Z,{display:"flex",alignItems:"center",width:"100%",children:(0,k.jsx)(S.Z,{children:" Form goes here.."})}),m===L.Ef.ADD_MEMBERS&&(0,k.jsxs)(u.Z,{display:"flex",alignItems:"center",width:"100%",children:[(0,k.jsx)(se,{options:w,selectedOption:Z,onOptionSelect:e=>{v(e.target.value)},disabled:0===(null===f||void 0===f?void 0:f.length)}),(0,k.jsx)(K.Z,{variant:"contained",startIcon:(0,k.jsx)(b.Z,{icon:"eva:plus-fill"}),disabled:!Z,children:"Accept member"})]})]})]})]})}function J(e){let{row:t,selected:n,onEditRow:o,onSelectRow:s}=e;const{name:a,owner:l,daoActions:r,expandedContent:c}=t,[h,x]=(0,i.useState)(null),[u,p]=(0,i.useState)(!1),m=()=>{x(null)},g=r.map((e=>(0,k.jsxs)(W.Z,{onClick:()=>{e.cb(),m()},children:[(0,k.jsx)(b.Z,{icon:"eva:edit-fill"}),e.label]},e.id)));return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)(v.Z,{hover:!0,selected:n,children:[(0,k.jsx)(w.Z,{padding:"checkbox",children:(0,k.jsx)(P.Z,{checked:n,onClick:s})}),(0,k.jsx)(w.Z,{children:a}),(0,k.jsx)(w.Z,{align:"left",children:l}),(0,k.jsx)(w.Z,{align:"right",children:(0,k.jsx)(G,{open:h,onOpen:e=>{x(e.currentTarget)},onClose:m,actions:g})}),(0,k.jsx)(w.Z,{align:"right",children:(0,k.jsx)(d.Z,{onClick:()=>p(!u),children:(0,k.jsx)(b.Z,{icon:u?"eva:chevron-up-fill":"eva:chevron-down-fill",sx:{width:V.Wm.NAVBAR_ITEM_HORIZONTAL,height:V.Wm.NAVBAR_ITEM_HORIZONTAL}})})})]}),(0,k.jsx)(v.Z,{children:(0,k.jsx)(w.Z,{style:{paddingBottom:0,paddingTop:0},colSpan:6,children:(0,k.jsx)(M.Z,{in:u,timeout:"auto",unmountOnExit:!0,children:(0,k.jsx)($,{data:c})})})})]})}function Q(e){let{row:t,selected:n,onEditRow:o,onSelectRow:s,onDeleteRow:a,daoSubpage:l}=e;const[r,c]=(0,i.useState)(null),d=e=>{c(e.currentTarget)},h=()=>{c(null)},x=t.daoActions.map((e=>e.isHidden?null:(0,k.jsxs)(W.Z,{onClick:()=>{e.cb(),h()},children:[(0,k.jsx)(b.Z,{icon:"eva:edit-fill"}),e.label]},e.id)));return(0,k.jsxs)(k.Fragment,{children:[(!l||"tasks"!==l)&&(0,k.jsxs)(v.Z,{hover:!0,selected:n,children:[(0,k.jsx)(w.Z,{padding:"checkbox",children:(0,k.jsx)(P.Z,{checked:n,onClick:s})}),(0,k.jsx)(w.Z,{children:t.name}),(0,k.jsx)(w.Z,{align:"right",children:(0,k.jsx)(G,{open:r,onOpen:d,onClose:h,actions:x})})]}),"tasks"===l&&(0,k.jsxs)(v.Z,{hover:!0,selected:n,children:[(0,k.jsx)(w.Z,{padding:"checkbox",children:(0,k.jsx)(P.Z,{checked:n,onClick:s})}),(0,k.jsx)(w.Z,{children:t.name}),(0,k.jsx)(w.Z,{children:t.specification}),(0,k.jsx)(w.Z,{children:t.budget}),(0,k.jsx)(w.Z,{children:t.deadline}),(0,k.jsx)(w.Z,{children:t.attachments}),(0,k.jsx)(w.Z,{children:t.keywords}),(0,k.jsx)(w.Z,{children:t.status}),(0,k.jsx)(w.Z,{align:"right",children:(0,k.jsx)(G,{open:r,onOpen:d,onClose:h,actions:x})})]})]})}var ee=n(27391),te=n(63466);function ne(e){let{filterName:t,filterRole:n,onFilterName:i,onFilterRole:o,optionsRole:s}=e;return(0,k.jsxs)(N.Z,{spacing:2,direction:{xs:"column",sm:"row"},sx:{py:2.5,px:3},children:[(0,k.jsx)(ee.Z,{fullWidth:!0,select:!0,label:"Role",value:n,onChange:o,SelectProps:{MenuProps:{sx:{"& .MuiPaper-root":{maxHeight:260}}}},sx:{maxWidth:{sm:240},textTransform:"capitalize"},children:s.map((e=>(0,k.jsx)(W.Z,{value:e,sx:{mx:1,my:.5,borderRadius:.75,typography:"body2",textTransform:"capitalize"},children:e},e)))}),(0,k.jsx)(ee.Z,{fullWidth:!0,value:t,onChange:e=>i(e.target.value),placeholder:"Search...",InputProps:{startAdornment:(0,k.jsx)(te.Z,{position:"start",children:(0,k.jsx)(b.Z,{icon:"eva:search-fill",sx:{color:"text.disabled",width:20,height:20}})})}})]})}const ie=["all","test1","test2","test3"];function oe(e){let{listType:t,tabs:n,currentTab:j,listHead:v,listData:w,onTabSwitch:y,daoSubpage:S,loading:C}=e;const{dense:R,page:I,order:O,orderBy:D,rowsPerPage:P,setPage:E,selected:z,setSelected:N,onSelectRow:q,onSelectAllRows:W,onSort:M,onChangeDense:V,onChangePage:G,onChangeRowsPerPage:K}=function(e){const[t,n]=(0,i.useState)((null===e||void 0===e?void 0:e.defaultDense)||!1),[o,s]=(0,i.useState)((null===e||void 0===e?void 0:e.defaultOrderBy)||"name"),[a,l]=(0,i.useState)((null===e||void 0===e?void 0:e.defaultOrder)||"asc"),[r,c]=(0,i.useState)((null===e||void 0===e?void 0:e.defaultCurrentPage)||0),[d,h]=(0,i.useState)((null===e||void 0===e?void 0:e.defaultRowsPerPage)||5),[x,u]=(0,i.useState)((null===e||void 0===e?void 0:e.defaultSelected)||[]);return{dense:t,order:a,page:r,setPage:c,orderBy:o,rowsPerPage:d,selected:x,setSelected:u,onSelectRow:e=>{const t=x.indexOf(e);let n=[];-1===t?n=n.concat(x,e):0===t?n=n.concat(x.slice(1)):t===x.length-1?n=n.concat(x.slice(0,-1)):t>0&&(n=n.concat(x.slice(0,t),x.slice(t+1))),u(n)},onSelectAllRows:(e,t)=>{u(e?t:[])},onSort:e=>{""!==e&&(l(o===e&&"asc"===a?"desc":"asc"),s(e))},onChangePage:(e,t)=>{c(t)},onChangeDense:e=>{n(e.target.checked)},onChangeRowsPerPage:e=>{h(parseInt(e.target.value,10)),c(0)}}}(),H="myOrganization"===t&&"organizations"!==S,[L,U]=(0,i.useState)(""),[X,Y]=(0,i.useState)("all"),$=e=>{console.log("handleEditRow")},ee=function(e){let{listData:t,comparator:n,filterName:i,filterRole:o}=e;const s=t.map(((e,t)=>[e,t]));s.sort(((e,t)=>{const i=n(e[0],t[0]);return 0!==i?i:e[1]-t[1]}));let a=s.map((e=>e[0]));i&&(a=a.filter((e=>-1!==e.name.toLowerCase().indexOf(i.toLowerCase()))));"all"!==o&&(a=a.filter((e=>e.tag===o)));return a}({listData:w,comparator:f(O,D),filterName:L,filterRole:X}),te=R?52:72,oe=!ee.length&&!!L||!ee.length&&!!X||!ee.length&&!!j;return(0,k.jsxs)(o.Z,{sx:{position:"relative",pointerEvents:C?"none":"all"},children:[C&&(0,k.jsx)(B,{}),(0,k.jsx)(s.Z,{allowScrollButtonsMobile:!0,variant:"scrollable",scrollButtons:"auto",value:j,onChange:(e,t)=>y(e,t),sx:{px:2,bgcolor:"background.neutral"},children:n.map((e=>(0,k.jsx)(a.Z,{disableRipple:!0,label:e,value:e},e)))}),(0,k.jsx)(l.Z,{}),(0,k.jsx)(ne,{filterName:L,filterRole:X,onFilterName:e=>{U(e),E(0)},onFilterRole:e=>{Y(e.target.value)},optionsRole:ie}),(0,k.jsxs)(r.Z,{sx:{minWidth:800,position:"relative"},children:[z.length>0&&(0,k.jsx)(F,{dense:R,numSelected:z.length,rowCount:w.length,onSelectAllRows:e=>W(e,w.map((e=>e.name))),actions:(0,k.jsx)(c.Z,{title:"Delete",children:(0,k.jsx)(d.Z,{color:"primary",onClick:()=>{console.log("handleDeleteRows")},children:(0,k.jsx)(b.Z,{icon:"eva:trash-2-outline"})})})}),(0,k.jsxs)(h.Z,{size:R?"small":"medium",children:[(0,k.jsx)(_,{order:O,orderBy:D,headLabel:v,rowCount:w.length,numSelected:z.length,onSort:M,onSelectAllRows:e=>W(e,w.map((e=>e.name)))}),(0,k.jsxs)(x.Z,{children:[ee.slice(I*P,I*P+P).map(((e,t)=>H?(0,k.jsx)(Q,{row:e,selected:z.includes(e.name),onSelectRow:()=>q(e.name),onDeleteRow:()=>(e.name,void console.log("handleDeleteRow")),onEditRow:()=>$(e.name),daoSubpage:S},t):(0,k.jsx)(J,{row:e,selected:z.includes(e.name),onSelectRow:()=>q(e.name),onEditRow:()=>$(e.name)},t))),(0,k.jsx)(T,{height:te,emptyRows:Z(I,P,w.length)}),(0,k.jsx)(A,{isNotFound:oe})]})]})]}),(0,k.jsxs)(u.Z,{sx:{position:"relative"},children:[(0,k.jsx)(p.Z,{rowsPerPageOptions:[5,10,25],component:"div",count:ee.length,rowsPerPage:P,page:I,onPageChange:G,onRowsPerPageChange:K}),(0,k.jsx)(m.Z,{control:(0,k.jsx)(g.Z,{checked:R,onChange:V}),label:"Dense",sx:{px:3,py:1.5,top:0,position:{md:"absolute"}}})]})]})}n(50289);(0,y.ZP)("div")((e=>{let{theme:t}=e;return{margin:"auto",display:"flex",borderRadius:"50%",alignItems:"center",width:t.spacing(8),height:t.spacing(8),justifyContent:"center",marginBottom:t.spacing(3)}}));function se(e){let{selectedOption:t,onOptionSelect:n,options:i,disabled:o}=e;return(0,k.jsx)(N.Z,{spacing:2,direction:{xs:"column",sm:"row"},sx:{py:2.5,px:3},flex:"1",children:(0,k.jsx)(ee.Z,{fullWidth:!0,select:!0,label:"Select",value:t,onChange:n,SelectProps:{MenuProps:{sx:{"& .MuiPaper-root":{maxHeight:260}}}},sx:{maxWidth:{sm:240},textTransform:"capitalize"},disabled:o,children:i.map((e=>(0,k.jsx)(W.Z,{value:e,sx:{mx:1,my:.5,borderRadius:.75,typography:"body2",textTransform:"capitalize"},children:e},e)))})})}n(9440),n(47736);n(60619),n(97145);n(46971);(0,y.ZP)("div")((e=>{let{theme:t}=e;return{width:64,height:64,fontSize:24,display:"flex",cursor:"pointer",alignItems:"center",justifyContent:"center",margin:t.spacing(.5),borderRadius:t.shape.borderRadius,border:`dashed 1px ${t.palette.divider}`,"&:hover":{opacity:.72}}}));n(74038);n(9141);(0,y.ZP)(S.Z)((e=>{let{theme:t}=e;return{...t.typography.body2,width:140,fontSize:13,flexShrink:0,color:t.palette.text.secondary}}));n(16030);var ae=n(81724),le=n(79286),re=n.n(le),ce=n(61134),de=n(44695),he=n(97123),xe=n(87867),ue=n(55764),pe=n(49467),me=n(97892),ge=n.n(me),je=n(18808),fe=n.n(je);ge().extend(fe());const Ze=e=>{const t={title:"",specification:"",budget:"",deadline:"",attachments:"",keywords:""};return e?re()({},t,e):t};function be(e){let{taskForm:t,taskIdForEdit:n,onCancel:i,actionCb:o}=e;const s={...t,deadline:ge()(t.deadline,"DD-MM-YYYY hh:mm a").toDate()},a={title:"",specification:"",budget:"",deadline:ge()().toDate(),attachments:"",keywords:""},l=ae.Ry().shape({title:ae.Z_().max(255).required("Title is required"),specification:ae.Z_().max(1e3)}),r=(0,ce.cI)({resolver:(0,de.X)(l),defaultValues:Ze(n?s:a)}),{reset:c,watch:d,handleSubmit:h,formState:{isSubmitting:x},control:u}=r;d();return(0,k.jsxs)(pe.RV,{methods:r,onSubmit:h((e=>{if(n){const t=ge()(e.deadline).valueOf(),i={taskId:n,title:e.title,specification:e.specification,budget:e.budget,deadline:t,attachments:e.attachments,keywords:e.keywords};o(L.xl.TASK,L.Gz.UPDATE_TASK,i)}else{const t=ge()(e.deadline).valueOf(),n={title:e.title,specification:e.specification,budget:e.budget,deadline:t,attachments:e.attachments,keywords:e.keywords};o(L.xl.TASK,L.Gz.CREATE_TASK,n)}i(),c()})),children:[(0,k.jsxs)(N.Z,{spacing:3,sx:{p:3},children:[(0,k.jsx)(pe.au,{name:"title",label:"Title"}),(0,k.jsx)(pe.au,{name:"specification",label:"Specification",multiline:!0,rows:4}),(0,k.jsx)(pe.au,{name:"budget",label:"Budget"}),(0,k.jsx)(ce.Qr,{name:"deadline",control:u,render:e=>{let{field:t}=e;return(0,k.jsx)(ue.W,{...t,label:"Deadline",inputFormat:"dd-MM-yyyy hh:mm a",renderInput:e=>(0,k.jsx)(ee.Z,{...e,fullWidth:!0}),disablePast:!0})}}),(0,k.jsx)(pe.au,{name:"attachments",label:"Attachments"}),(0,k.jsx)(pe.au,{name:"keywords",label:"Keywords"})]}),(0,k.jsxs)(he.Z,{children:[(0,k.jsx)(K.Z,{variant:"outlined",color:"inherit",onClick:i,children:"Cancel"}),(0,k.jsx)(xe.Z,{type:"submit",variant:"contained",children:n?"Update":"Create"})]})]})}const ve=e=>{const t={organizationId:"",taskId:""};return e?re()({},t,e):t};function we(e){let{form:t,onCancel:n,actionCb:i}=e;const o=ae.Ry().shape({organizationId:ae.Z_().max(255).required("Title is required"),taskId:ae.Z_().max(1e3).required("Title is required")}),s=(0,ce.cI)({resolver:(0,de.X)(o),defaultValues:ve(t)}),{reset:a,watch:l,handleSubmit:r,formState:{isSubmitting:c}}=s;l();return(0,k.jsxs)(pe.RV,{methods:s,onSubmit:r((async e=>{try{const t=[e.organizationId,e.taskId];i(L.xl.DAO,L.Ef.ADD_TASKS,t),n(),a()}catch(t){console.error(t)}})),children:[(0,k.jsxs)(N.Z,{spacing:3,sx:{p:3},children:[(0,k.jsx)(pe.au,{name:"organizationId",label:"Organization ID"}),(0,k.jsx)(pe.au,{name:"taskId",label:"Task ID"})]}),(0,k.jsxs)(he.Z,{children:[(0,k.jsx)(u.Z,{sx:{flexGrow:1}}),(0,k.jsx)(K.Z,{variant:"outlined",color:"inherit",onClick:n,children:"Cancel"}),(0,k.jsx)(xe.Z,{type:"submit",variant:"contained",loading:c,children:"Add"})]})]})}const ye=e=>{const t={feedback:""};return e?re()({},t,e):t};function Se(e){let{form:t,onCancel:n,taskId:i,actionCb:o}=e;const s=ae.Ry().shape({feedback:ae.Z_().max(255).required("Title is required")}),a=(0,ce.cI)({resolver:(0,de.X)(s),defaultValues:ye(t)}),{reset:l,watch:r,handleSubmit:c,formState:{isSubmitting:d}}=a;r();return(0,k.jsxs)(pe.RV,{methods:a,onSubmit:c((async e=>{try{const t=[i,e.feedback];o(L.xl.TASK,L.Gz.REJECT_TASK,t),n(),l()}catch(t){console.error(t)}})),children:[(0,k.jsx)(N.Z,{spacing:3,sx:{p:3},children:(0,k.jsx)(pe.au,{name:"feedback",label:"Feedback",multiline:!0,rows:4})}),(0,k.jsxs)(he.Z,{children:[(0,k.jsx)(u.Z,{sx:{flexGrow:1}}),(0,k.jsx)(K.Z,{variant:"outlined",color:"inherit",onClick:n,children:"Cancel"}),(0,k.jsx)(xe.Z,{type:"submit",variant:"contained",loading:d,children:"Reject and send feedback"})]})]})}const Ce=e=>{const t={name:"",description:"",vision:""};return e?re()({},t,e):t};function ke(e){let{form:t,onCancel:n,organizationId:i,actionCb:o}=e;const s=ae.Ry().shape({name:ae.Z_().max(255).required("Name is required"),description:ae.Z_().max(255).required("Description is required"),vision:ae.Z_().max(255).required("Vision is required")}),a=(0,ce.cI)({resolver:(0,de.X)(s),defaultValues:Ce(t)}),{reset:l,watch:r,handleSubmit:c,formState:{isSubmitting:d}}=a;r();return(0,k.jsxs)(pe.RV,{methods:a,onSubmit:c((async e=>{try{if(i){const t=[i,e.name,e.description,e.vision];o(L.xl.DAO,L.Ef.UPDATE_ORGANIZATION,t)}else{const t=[e.name,e.description,e.vision];o(L.xl.DAO,L.Ef.CREATE_ORGANIZATION,t)}n(),l()}catch(t){console.error(t)}})),children:[(0,k.jsxs)(N.Z,{spacing:3,sx:{p:3},children:[(0,k.jsx)(pe.au,{name:"name",label:"Name"}),(0,k.jsx)(pe.au,{name:"description",label:"Description"}),(0,k.jsx)(pe.au,{name:"vision",label:"Vision"})]}),(0,k.jsxs)(he.Z,{children:[(0,k.jsx)(u.Z,{sx:{flexGrow:1}}),(0,k.jsx)(K.Z,{variant:"outlined",color:"inherit",onClick:n,children:"Cancel"}),(0,k.jsx)(xe.Z,{type:"submit",variant:"contained",loading:d,children:i?"Update organization":"Create organization"})]})]})}const Re=e=>{const t={newOwnerId:""};return e?re()({},t,e):t};function Ie(e){let{form:t,onCancel:n,organizationId:i,actionCb:o}=e;const s=ae.Ry().shape({newOwnerId:ae.Z_().max(255).required("Field required")}),a=(0,ce.cI)({resolver:(0,de.X)(s),defaultValues:Re(t)}),{reset:l,watch:r,handleSubmit:c,formState:{isSubmitting:d}}=a;r();return(0,k.jsxs)(pe.RV,{methods:a,onSubmit:c((async e=>{try{const t=[i,e.newOwnerId];o(L.xl.DAO,L.Ef.TRANSFER_OWNERSHIP,t),n(),l()}catch(t){console.error(t)}})),children:[(0,k.jsx)(N.Z,{spacing:3,sx:{p:3},children:(0,k.jsx)(pe.au,{name:"newOwnerId",label:"New Owner ID"})}),(0,k.jsxs)(he.Z,{children:[(0,k.jsx)(u.Z,{sx:{flexGrow:1}}),(0,k.jsx)(K.Z,{variant:"outlined",color:"inherit",onClick:n,children:"Cancel"}),(0,k.jsx)(xe.Z,{type:"submit",variant:"contained",loading:d,children:"Transfer ownership"})]})]})}}}]);
//# sourceMappingURL=397.c43605ca.chunk.js.map