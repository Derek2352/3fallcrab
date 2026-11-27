/* Harbour Keep 3D Diorama Engine (tools/daily3d/), with three.js r170: MIT License, Copyright © 2010-2024 three.js authors, https://threejs.org */
(()=>{var lc="170";var vh=0,Rc=1,Mh=2;var kl=1,hc=2,On=3,ii=0,Ge=1,Ce=2,ei=0,$i=1,Ic=2,Pc=3,Lc=4,Sh=5,_i=100,bh=101,wh=102,Eh=103,Th=104,Ah=200,Ch=201,Rh=202,Ih=203,Go=204,Ho=205,Ph=206,Lh=207,Dh=208,Uh=209,Nh=210,Fh=211,Oh=212,Bh=213,zh=214,Wo=0,Xo=1,qo=2,Qi=3,Yo=4,$o=5,Zo=6,Jo=7,Gl=0,Vh=1,kh=2,ni=0,Gh=1,Hh=2,Wh=3,Xh=4,qh=5,Yh=6,uc=7;var Hl=300,ji=301,ts=302,Rs=303,Ko=304,eo=306,en=1e3,Mi=1001,Qo=1002,_n=1003,$h=1004;var $s=1005;var wn=1006,co=1007;var Si=1008;var Gn=1009,Wl=1010,Xl=1011,Is=1012,dc=1013,bi=1014,zn=1015,Ws=1016,fc=1017,pc=1018,es=1020,ql=35902,Yl=1021,$l=1022,xn=1023,Zl=1024,Jl=1025,Zi=1026,ns=1027,Kl=1028,mc=1029,Ql=1030,gc=1031;var xc=1033,Mr=33776,Sr=33777,br=33778,wr=33779,jo=35840,ta=35841,ea=35842,na=35843,ia=36196,sa=37492,ra=37496,oa=37808,aa=37809,ca=37810,la=37811,ha=37812,ua=37813,da=37814,fa=37815,pa=37816,ma=37817,ga=37818,xa=37819,_a=37820,ya=37821,Er=36492,va=36494,Ma=36495,jl=36283,Sa=36284,ba=36285,wa=36286;var Tr=2300,Ea=2301,lo=2302,Dc=2400,Uc=2401,Nc=2402;var Zh=3200,Jh=3201;var th=0,Kh=1,ti="",Ve="srgb",ls="srgb-linear",no="linear",fe="srgb";var Pi=7680;var Fc=519,Qh=512,jh=513,tu=514,eh=515,eu=516,nu=517,iu=518,su=519,Oc=35044;var Bc="300 es",Vn=2e3,Ar=2001,si=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zc=1234567,bs=Math.PI/180,Ps=180/Math.PI;function Ai(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[i&255]+Be[i>>8&255]+Be[i>>16&255]+Be[i>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function Ae(i,t,e){return Math.max(t,Math.min(e,i))}function _c(i,t){return(i%t+t)%t}function ru(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function ou(i,t,e){return i!==t?(e-i)/(t-i):0}function ws(i,t,e){return(1-e)*i+e*t}function au(i,t,e,n){return ws(i,t,1-Math.exp(-e*n))}function cu(i,t=1){return t-Math.abs(_c(i,t*2)-t)}function lu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function hu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function uu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function du(i,t){return i+Math.random()*(t-i)}function fu(i){return i*(.5-Math.random())}function pu(i){i!==void 0&&(zc=i);let t=zc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function mu(i){return i*bs}function gu(i){return i*Ps}function xu(i){return(i&i-1)===0&&i!==0}function _u(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function yu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function vu(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),d=o((t+n)/2),u=r((t-n)/2),h=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*d,c*u,c*h,a*l);break;case"YZY":i.set(c*h,a*d,c*u,a*l);break;case"ZXZ":i.set(c*u,c*h,a*d,a*l);break;case"XZX":i.set(a*d,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*d,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*d,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function qe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Pe={DEG2RAD:bs,RAD2DEG:Ps,generateUUID:Ai,clamp:Ae,euclideanModulo:_c,mapLinear:ru,inverseLerp:ou,lerp:ws,damp:au,pingpong:cu,smoothstep:lu,smootherstep:hu,randInt:uu,randFloat:du,randFloatSpread:fu,seededRandom:pu,degToRad:mu,radToDeg:gu,isPowerOfTwo:xu,ceilPowerOfTwo:_u,floorPowerOfTwo:yu,setQuaternionFromProperEuler:vu,normalize:qe,denormalize:Xi},mt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=c,d[6]=n,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],v=s[4],y=s[7],L=s[2],T=s[5],A=s[8];return r[0]=o*_+a*M+c*L,r[3]=o*m+a*v+c*T,r[6]=o*p+a*y+c*A,r[1]=l*_+d*M+u*L,r[4]=l*m+d*v+u*T,r[7]=l*p+d*y+u*A,r[2]=h*_+f*M+g*L,r[5]=h*m+f*v+g*T,r[8]=h*p+f*y+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8];return e*o*d-e*a*l-n*r*d+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],u=d*o-a*l,h=a*c-d*r,f=l*r-o*c,g=e*u+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(s*l-d*n)*_,t[2]=(a*n-s*o)*_,t[3]=h*_,t[4]=(d*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ho.makeScale(t,e)),this}rotate(t){return this.premultiply(ho.makeRotation(-t)),this}translate(t,e){return this.premultiply(ho.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ho=new Qt;function nh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Cr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mu(){let i=Cr("canvas");return i.style.display="block",i}var Vc={};function Ms(i){i in Vc||(Vc[i]=!0,console.warn(i))}function Su(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function bu(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function wu(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var se={enabled:!0,workingColorSpace:ls,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===fe&&(i.r=kn(i.r),i.g=kn(i.g),i.b=kn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===fe&&(i.r=Ji(i.r),i.g=Ji(i.g),i.b=Ji(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ti?no:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var kc=[.64,.33,.3,.6,.15,.06],Gc=[.2126,.7152,.0722],Hc=[.3127,.329],Wc=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xc=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);se.define({[ls]:{primaries:kc,whitePoint:Hc,transfer:no,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:Gc,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:kc,whitePoint:Hc,transfer:fe,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:Gc,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}});var Li,Ta=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Li===void 0&&(Li=Cr("canvas")),Li.width=t.width,Li.height=t.height;let n=Li.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Li}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Cr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=kn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(kn(e[n]/255)*255):e[n]=kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Eu=0,Rr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=Ai(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(uo(s[o].image)):r.push(uo(s[o]))}else r=uo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function uo(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Ta.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Tu=0,nn=class i extends si{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Mi,s=Mi,r=wn,o=Si,a=xn,c=Gn,l=i.DEFAULT_ANISOTROPY,d=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=Ai(),this.name="",this.source=new Rr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case en:t.x=t.x-Math.floor(t.x);break;case Mi:t.x=t.x<0?0:1;break;case Qo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case en:t.y=t.y-Math.floor(t.y);break;case Mi:t.y=t.y<0?0:1;break;case Qo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=Hl;nn.DEFAULT_ANISOTROPY=1;var pe=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],d=c[4],u=c[8],h=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(d-h)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(l+1)/2,y=(f+1)/2,L=(p+1)/2,T=(d+h)/4,A=(u+_)/4,R=(g+m)/4;return v>y&&v>L?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=A/n):y>L?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=R/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=R/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(h-d)*(h-d));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(h-d)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Aa=class extends si{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new nn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Rr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Hn=class extends Aa{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ir=class extends nn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ca=class extends nn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ri=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],d=n[s+2],u=n[s+3],h=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=d,t[e+3]=u;return}if(a===1){t[e+0]=h,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==h||l!==f||d!==g){let m=1-a,p=c*h+l*f+d*g+u*_,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let L=Math.sqrt(v),T=Math.atan2(L,p*M);m=Math.sin(m*T)/L,a=Math.sin(a*T)/L}let y=a*M;if(c=c*m+h*y,l=l*m+f*y,d=d*m+g*y,u=u*m+_*y,m===1-a){let L=1/Math.sqrt(c*c+l*l+d*d+u*u);c*=L,l*=L,d*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],d=n[s+3],u=r[o],h=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+d*u+c*f-l*h,t[e+1]=c*g+d*h+l*u-a*f,t[e+2]=l*g+d*f+a*h-c*u,t[e+3]=d*g-a*u-c*h-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),d=a(s/2),u=a(r/2),h=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=h*d*u+l*f*g,this._y=l*f*u-h*d*g,this._z=l*d*g+h*f*u,this._w=l*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+l*f*g,this._y=l*f*u-h*d*g,this._z=l*d*g-h*f*u,this._w=l*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-l*f*g,this._y=l*f*u+h*d*g,this._z=l*d*g+h*f*u,this._w=l*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-l*f*g,this._y=l*f*u+h*d*g,this._z=l*d*g-h*f*u,this._w=l*d*u+h*f*g;break;case"YZX":this._x=h*d*u+l*f*g,this._y=l*f*u+h*d*g,this._z=l*d*g-h*f*u,this._w=l*d*u-h*f*g;break;case"XZY":this._x=h*d*u-l*f*g,this._y=l*f*u-h*d*g,this._z=l*d*g+h*f*u,this._w=l*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],d=e[6],u=e[10],h=n+a+u;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(d-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+d)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ae(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,d=e._w;return this._x=n*d+o*a+s*l-r*c,this._y=s*d+o*c+r*a-n*l,this._z=r*d+o*l+n*c-s*a,this._w=o*d-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),d=Math.atan2(l,a),u=Math.sin((1-e)*d)/l,h=Math.sin(e*d)/l;return this._w=o*u+this._w*h,this._x=n*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),d=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*d,this.y=n+c*d+a*l-r*u,this.z=s+c*u+r*d-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return fo.copy(this).projectOnVector(t),this.sub(fo)}reflect(t){return this.sub(fo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},fo=new D,qc=new ri,En=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,pn):pn.fromBufferAttribute(r,o),pn.applyMatrix4(t.matrixWorld),this.expandByPoint(pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zs.copy(n.boundingBox)),Zs.applyMatrix4(t.matrixWorld),this.union(Zs)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,pn),pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gs),Js.subVectors(this.max,gs),Di.subVectors(t.a,gs),Ui.subVectors(t.b,gs),Ni.subVectors(t.c,gs),$n.subVectors(Ui,Di),Zn.subVectors(Ni,Ui),ui.subVectors(Di,Ni);let e=[0,-$n.z,$n.y,0,-Zn.z,Zn.y,0,-ui.z,ui.y,$n.z,0,-$n.x,Zn.z,0,-Zn.x,ui.z,0,-ui.x,-$n.y,$n.x,0,-Zn.y,Zn.x,0,-ui.y,ui.x,0];return!po(e,Di,Ui,Ni,Js)||(e=[1,0,0,0,1,0,0,0,1],!po(e,Di,Ui,Ni,Js))?!1:(Ks.crossVectors($n,Zn),e=[Ks.x,Ks.y,Ks.z],po(e,Di,Ui,Ni,Js))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ln=[new D,new D,new D,new D,new D,new D,new D,new D],pn=new D,Zs=new En,Di=new D,Ui=new D,Ni=new D,$n=new D,Zn=new D,ui=new D,gs=new D,Js=new D,Ks=new D,di=new D;function po(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){di.fromArray(i,r);let a=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),c=t.dot(di),l=e.dot(di),d=n.dot(di);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}var Au=new En,xs=new D,mo=new D,is=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Au.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xs.subVectors(t,this.center);let e=xs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(xs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(mo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xs.copy(t.center).add(mo)),this.expandByPoint(xs.copy(t.center).sub(mo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Dn=new D,go=new D,Qs=new D,Jn=new D,xo=new D,js=new D,_o=new D,Ls=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){go.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),Jn.copy(this.origin).sub(go);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Qs),a=Jn.dot(this.direction),c=-Jn.dot(Qs),l=Jn.lengthSq(),d=Math.abs(1-o*o),u,h,f,g;if(d>0)if(u=o*c-a,h=o*a-c,g=r*d,u>=0)if(h>=-g)if(h<=g){let _=1/d;u*=_,h*=_,f=u*(u+o*h+2*a)+h*(o*u+h+2*c)+l}else h=r,u=Math.max(0,-(o*h+a)),f=-u*u+h*(h+2*c)+l;else h=-r,u=Math.max(0,-(o*h+a)),f=-u*u+h*(h+2*c)+l;else h<=-g?(u=Math.max(0,-(-o*r+a)),h=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+h*(h+2*c)+l):h<=g?(u=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(u=Math.max(0,-(o*r+a)),h=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+h*(h+2*c)+l);else h=o>0?-r:r,u=Math.max(0,-(o*h+a)),f=-u*u+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(go).addScaledVector(Qs,h),f}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),d>=0?(r=(t.min.y-h.y)*d,o=(t.max.y-h.y)*d):(r=(t.max.y-h.y)*d,o=(t.min.y-h.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-h.z)*u,c=(t.max.z-h.z)*u):(a=(t.max.z-h.z)*u,c=(t.min.z-h.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){xo.subVectors(e,t),js.subVectors(n,t),_o.crossVectors(xo,js);let o=this.direction.dot(_o),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Jn.subVectors(this.origin,t);let c=a*this.direction.dot(js.crossVectors(Jn,js));if(c<0)return null;let l=a*this.direction.dot(xo.cross(Jn));if(l<0||c+l>o)return null;let d=-a*Jn.dot(_o);return d<0?null:this.at(d/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ye=class i{constructor(t,e,n,s,r,o,a,c,l,d,u,h,f,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,d,u,h,f,g,_,m)}set(t,e,n,s,r,o,a,c,l,d,u,h,f,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Fi.setFromMatrixColumn(t,0).length(),r=1/Fi.setFromMatrixColumn(t,1).length(),o=1/Fi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let h=o*d,f=o*u,g=a*d,_=a*u;e[0]=c*d,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=h-_*l,e[9]=-a*c,e[2]=_-h*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){let h=c*d,f=c*u,g=l*d,_=l*u;e[0]=h+_*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*d,e[9]=-a,e[2]=f*a-g,e[6]=_+h*a,e[10]=o*c}else if(t.order==="ZXY"){let h=c*d,f=c*u,g=l*d,_=l*u;e[0]=h-_*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*d,e[9]=_-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let h=o*d,f=o*u,g=a*d,_=a*u;e[0]=c*d,e[4]=g*l-f,e[8]=h*l+_,e[1]=c*u,e[5]=_*l+h,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let h=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*d,e[4]=_-h*u,e[8]=g*u+f,e[1]=u,e[5]=o*d,e[9]=-a*d,e[2]=-l*d,e[6]=f*u+g,e[10]=h-_*u}else if(t.order==="XZY"){let h=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*d,e[4]=-u,e[8]=l*d,e[1]=h*u+_,e[5]=o*d,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*d,e[10]=_*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Cu,t,Ru)}lookAt(t,e,n){let s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Kn.crossVectors(n,je),Kn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Kn.crossVectors(n,je)),Kn.normalize(),tr.crossVectors(je,Kn),s[0]=Kn.x,s[4]=tr.x,s[8]=je.x,s[1]=Kn.y,s[5]=tr.y,s[9]=je.y,s[2]=Kn.z,s[6]=tr.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],v=n[7],y=n[11],L=n[15],T=s[0],A=s[4],R=s[8],E=s[12],S=s[1],I=s[5],W=s[9],F=s[13],k=s[2],$=s[6],z=s[10],j=s[14],X=s[3],ot=s[7],ht=s[11],gt=s[15];return r[0]=o*T+a*S+c*k+l*X,r[4]=o*A+a*I+c*$+l*ot,r[8]=o*R+a*W+c*z+l*ht,r[12]=o*E+a*F+c*j+l*gt,r[1]=d*T+u*S+h*k+f*X,r[5]=d*A+u*I+h*$+f*ot,r[9]=d*R+u*W+h*z+f*ht,r[13]=d*E+u*F+h*j+f*gt,r[2]=g*T+_*S+m*k+p*X,r[6]=g*A+_*I+m*$+p*ot,r[10]=g*R+_*W+m*z+p*ht,r[14]=g*E+_*F+m*j+p*gt,r[3]=M*T+v*S+y*k+L*X,r[7]=M*A+v*I+y*$+L*ot,r[11]=M*R+v*W+y*z+L*ht,r[15]=M*E+v*F+y*j+L*gt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],d=t[2],u=t[6],h=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*h+n*l*h+s*a*f-n*c*f)+_*(+e*c*f-e*l*h+r*o*h-s*o*f+s*l*d-r*c*d)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*d-n*l*d)+p*(-s*a*d-e*c*u+e*a*h+s*o*u-n*o*h+n*c*d)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],u=t[9],h=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=u*m*l-_*h*l+_*c*f-a*m*f-u*c*p+a*h*p,v=g*h*l-d*m*l-g*c*f+o*m*f+d*c*p-o*h*p,y=d*_*l-g*u*l+g*a*f-o*_*f-d*a*p+o*u*p,L=g*u*c-d*_*c-g*a*h+o*_*h+d*a*m-o*u*m,T=e*M+n*v+s*y+r*L;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return t[0]=M*A,t[1]=(_*h*r-u*m*r-_*s*f+n*m*f+u*s*p-n*h*p)*A,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*A,t[3]=(u*c*r-a*h*r-u*s*l+n*h*l+a*s*f-n*c*f)*A,t[4]=v*A,t[5]=(d*m*r-g*h*r+g*s*f-e*m*f-d*s*p+e*h*p)*A,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*A,t[7]=(o*h*r-d*c*r+d*s*l-e*h*l-o*s*f+e*c*f)*A,t[8]=y*A,t[9]=(g*u*r-d*_*r-g*n*f+e*_*f+d*n*p-e*u*p)*A,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*A,t[11]=(d*a*r-o*u*r-d*n*l+e*u*l+o*n*f-e*a*f)*A,t[12]=L*A,t[13]=(d*_*s-g*u*s+g*n*h-e*_*h-d*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*A,t[15]=(o*u*s-d*a*s+d*n*c-e*u*c-o*n*h+e*a*h)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,d=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,d*a+n,d*c-s*o,0,l*c-s*a,d*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,d=o+o,u=a+a,h=r*l,f=r*d,g=r*u,_=o*d,m=o*u,p=a*u,M=c*l,v=c*d,y=c*u,L=n.x,T=n.y,A=n.z;return s[0]=(1-(_+p))*L,s[1]=(f+y)*L,s[2]=(g-v)*L,s[3]=0,s[4]=(f-y)*T,s[5]=(1-(h+p))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+v)*A,s[9]=(m-M)*A,s[10]=(1-(h+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Fi.set(s[0],s[1],s[2]).length(),o=Fi.set(s[4],s[5],s[6]).length(),a=Fi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],mn.copy(this);let l=1/r,d=1/o,u=1/a;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=d,mn.elements[5]*=d,mn.elements[6]*=d,mn.elements[8]*=u,mn.elements[9]*=u,mn.elements[10]*=u,e.setFromRotationMatrix(mn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Vn){let c=this.elements,l=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),h=(n+s)/(n-s),f,g;if(a===Vn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ar)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Vn){let c=this.elements,l=1/(e-t),d=1/(n-s),u=1/(o-r),h=(e+t)*l,f=(n+s)*d,g,_;if(a===Vn)g=(o+r)*u,_=-2*u;else if(a===Ar)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Fi=new D,mn=new ye,Cu=new D(0,0,0),Ru=new D(1,1,1),Kn=new D,tr=new D,je=new D,Yc=new ye,$c=new ri,Tn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ae(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ae(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ae(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $c.setFromEuler(this),this.setFromQuaternion($c,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tn.DEFAULT_ORDER="XYZ";var Ds=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Iu=0,Zc=new D,Oi=new ri,Un=new ye,er=new D,_s=new D,Pu=new D,Lu=new ri,Jc=new D(1,0,0),Kc=new D(0,1,0),Qc=new D(0,0,1),jc={type:"added"},Du={type:"removed"},Bi={type:"childadded",child:null},yo={type:"childremoved",child:null},He=class i extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Iu++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new Tn,n=new ri,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ye},normalMatrix:{value:new Qt}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ds,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Oi.setFromAxisAngle(t,e),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(t,e){return Oi.setFromAxisAngle(t,e),this.quaternion.premultiply(Oi),this}rotateX(t){return this.rotateOnAxis(Jc,t)}rotateY(t){return this.rotateOnAxis(Kc,t)}rotateZ(t){return this.rotateOnAxis(Qc,t)}translateOnAxis(t,e){return Zc.copy(t).applyQuaternion(this.quaternion),this.position.add(Zc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Jc,t)}translateY(t){return this.translateOnAxis(Kc,t)}translateZ(t){return this.translateOnAxis(Qc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?er.copy(t):er.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(_s,er,this.up):Un.lookAt(er,_s,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),Oi.setFromRotationMatrix(Un),this.quaternion.premultiply(Oi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(jc),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Du),yo.child=t,this.dispatchEvent(yo),yo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(jc),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,Pu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,Lu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),d=o(t.images),u=o(t.shapes),h=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let d=a[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};He.DEFAULT_UP=new D(0,1,0);He.DEFAULT_MATRIX_AUTO_UPDATE=!0;He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gn=new D,Nn=new D,vo=new D,Fn=new D,zi=new D,Vi=new D,tl=new D,Mo=new D,So=new D,bo=new D,wo=new pe,Eo=new pe,To=new pe,yi=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),gn.subVectors(t,e),s.cross(gn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){gn.subVectors(s,e),Nn.subVectors(n,e),vo.subVectors(t,e);let o=gn.dot(gn),a=gn.dot(Nn),c=gn.dot(vo),l=Nn.dot(Nn),d=Nn.dot(vo),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let h=1/u,f=(l*c-a*d)*h,g=(o*d-a*c)*h;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Fn.x),c.addScaledVector(o,Fn.y),c.addScaledVector(a,Fn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return wo.setScalar(0),Eo.setScalar(0),To.setScalar(0),wo.fromBufferAttribute(t,e),Eo.fromBufferAttribute(t,n),To.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(wo,r.x),o.addScaledVector(Eo,r.y),o.addScaledVector(To,r.z),o}static isFrontFacing(t,e,n,s){return gn.subVectors(n,e),Nn.subVectors(t,e),gn.cross(Nn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),gn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;zi.subVectors(s,n),Vi.subVectors(r,n),Mo.subVectors(t,n);let c=zi.dot(Mo),l=Vi.dot(Mo);if(c<=0&&l<=0)return e.copy(n);So.subVectors(t,s);let d=zi.dot(So),u=Vi.dot(So);if(d>=0&&u<=d)return e.copy(s);let h=c*u-d*l;if(h<=0&&c>=0&&d<=0)return o=c/(c-d),e.copy(n).addScaledVector(zi,o);bo.subVectors(t,r);let f=zi.dot(bo),g=Vi.dot(bo);if(g>=0&&f<=g)return e.copy(r);let _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Vi,a);let m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return tl.subVectors(r,s),a=(u-d)/(u-d+(f-g)),e.copy(s).addScaledVector(tl,a);let p=1/(m+_+h);return o=_*p,a=h*p,e.copy(n).addScaledVector(zi,o).addScaledVector(Vi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ih={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},nr={h:0,s:0,l:0};function Ao(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Wt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=_c(t,1),e=Ae(e,0,1),n=Ae(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ao(o,r,t+1/3),this.g=Ao(o,r,t),this.b=Ao(o,r,t-1/3)}return se.toWorkingColorSpace(this,s),this}setStyle(t,e=Ve){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){let n=ih[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=Ji(t.r),this.g=Ji(t.g),this.b=Ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return se.fromWorkingColorSpace(ze.copy(this),t),Math.round(Ae(ze.r*255,0,255))*65536+Math.round(Ae(ze.g*255,0,255))*256+Math.round(Ae(ze.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(ze.copy(this),e);let n=ze.r,s=ze.g,r=ze.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,d=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=d<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=Ve){se.fromWorkingColorSpace(ze.copy(this),t);let e=ze.r,n=ze.g,s=ze.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Qn),this.setHSL(Qn.h+t,Qn.s+e,Qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Qn),t.getHSL(nr);let n=ws(Qn.h,nr.h,e),s=ws(Qn.s,nr.s,e),r=ws(Qn.l,nr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ze=new Wt;Wt.NAMES=ih;var Uu=0,oi=class extends si{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=Ai(),this.name="",this.blending=$i,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Go,this.blendDst=Ho,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Go&&(n.blendSrc=this.blendSrc),this.blendDst!==Ho&&(n.blendDst=this.blendDst),this.blendEquation!==_i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},ai=class extends oi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Te=new D,ir=new mt,Je=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Oc,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ir.fromBufferAttribute(this,e),ir.applyMatrix3(t),this.setXY(e,ir.x,ir.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=qe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xi(e,this.array)),e}setX(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xi(e,this.array)),e}setY(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xi(e,this.array)),e}setW(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array),r=qe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Oc&&(t.usage=this.usage),t}};var Pr=class extends Je{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Lr=class extends Je{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ue=class extends Je{constructor(t,e,n){super(new Float32Array(t),e,n)}},Nu=0,cn=new ye,Co=new He,ki=new D,tn=new En,ys=new En,Ue=new D,Oe=class i extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nh(t)?Lr:Pr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return cn.makeRotationFromQuaternion(t),this.applyMatrix4(cn),this}rotateX(t){return cn.makeRotationX(t),this.applyMatrix4(cn),this}rotateY(t){return cn.makeRotationY(t),this.applyMatrix4(cn),this}rotateZ(t){return cn.makeRotationZ(t),this.applyMatrix4(cn),this}translate(t,e,n){return cn.makeTranslation(t,e,n),this.applyMatrix4(cn),this}scale(t,e,n){return cn.makeScale(t,e,n),this.applyMatrix4(cn),this}lookAt(t){return Co.lookAt(t),Co.updateMatrix(),this.applyMatrix4(Co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ue(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new is);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];ys.setFromBufferAttribute(a),this.morphTargetsRelative?(Ue.addVectors(tn.min,ys.min),tn.expandByPoint(Ue),Ue.addVectors(tn.max,ys.max),tn.expandByPoint(Ue)):(tn.expandByPoint(ys.min),tn.expandByPoint(ys.max))}tn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ue.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ue));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)Ue.fromBufferAttribute(a,l),c&&(ki.fromBufferAttribute(t,l),Ue.add(ki)),s=Math.max(s,n.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new D,c[R]=new D;let l=new D,d=new D,u=new D,h=new mt,f=new mt,g=new mt,_=new D,m=new D;function p(R,E,S){l.fromBufferAttribute(n,R),d.fromBufferAttribute(n,E),u.fromBufferAttribute(n,S),h.fromBufferAttribute(r,R),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,S),d.sub(l),u.sub(l),f.sub(h),g.sub(h);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(I),a[R].add(_),a[E].add(_),a[S].add(_),c[R].add(m),c[E].add(m),c[S].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,E=M.length;R<E;++R){let S=M[R],I=S.start,W=S.count;for(let F=I,k=I+W;F<k;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}let v=new D,y=new D,L=new D,T=new D;function A(R){L.fromBufferAttribute(s,R),T.copy(L);let E=a[R];v.copy(E),v.sub(L.multiplyScalar(L.dot(E))).normalize(),y.crossVectors(T,E);let I=y.dot(c[R])<0?-1:1;o.setXYZW(R,v.x,v.y,v.z,I)}for(let R=0,E=M.length;R<E;++R){let S=M[R],I=S.start,W=S.count;for(let F=I,k=I+W;F<k;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,d=new D,u=new D;if(t)for(let h=0,f=t.count;h<f;h+=3){let g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(d),c.add(d),l.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(a,c){let l=a.array,d=a.itemSize,u=a.normalized,h=new l.constructor(c.length*d),f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*d;for(let p=0;p<d;p++)h[g++]=l[f++]}return new Je(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let d=0,u=l.length;d<u;d++){let h=l[d],f=t(h,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],d=[];for(let u=0,h=l.length;u<h;u++){let f=l[u];d.push(f.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let d=s[l];this.setAttribute(l,d.clone(e))}let r=t.morphAttributes;for(let l in r){let d=[],u=r[l];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,d=o.length;l<d;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},el=new ye,fi=new Ls,sr=new is,nl=new D,rr=new D,or=new D,ar=new D,Ro=new D,cr=new D,il=new D,lr=new D,Fe=class extends He{constructor(t=new Oe,e=new ai){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){cr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let d=a[c],u=r[c];d!==0&&(Ro.fromBufferAttribute(u,t),o?cr.addScaledVector(Ro,d):cr.addScaledVector(Ro.sub(e),d))}e.add(cr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(r),fi.copy(t.ray).recast(t.near),!(sr.containsPoint(fi.origin)===!1&&(fi.intersectSphere(sr,nl)===null||fi.origin.distanceToSquared(nl)>(t.far-t.near)**2))&&(el.copy(r).invert(),fi.copy(t.ray).applyMatrix4(el),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=M,L=v;y<L;y+=3){let T=a.getX(y),A=a.getX(y+1),R=a.getX(y+2);s=hr(this,p,t,n,l,d,u,T,A,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);s=hr(this,o,t,n,l,d,u,M,v,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=M,L=v;y<L;y+=3){let T=y,A=y+1,R=y+2;s=hr(this,p,t,n,l,d,u,T,A,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=m,v=m+1,y=m+2;s=hr(this,o,t,n,l,d,u,M,v,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Fu(i,t,e,n,s,r,o,a){let c;if(t.side===Ge?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===ii,a),c===null)return null;lr.copy(a),lr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(lr);return l<e.near||l>e.far?null:{distance:l,point:lr.clone(),object:i}}function hr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,rr),i.getVertexPosition(c,or),i.getVertexPosition(l,ar);let d=Fu(i,t,e,n,rr,or,ar,il);if(d){let u=new D;yi.getBarycoord(il,rr,or,ar,u),s&&(d.uv=yi.getInterpolatedAttribute(s,a,c,l,u,new mt)),r&&(d.uv1=yi.getInterpolatedAttribute(r,a,c,l,u,new mt)),o&&(d.normal=yi.getInterpolatedAttribute(o,a,c,l,u,new D),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new D,materialIndex:0};yi.getNormal(rr,or,ar,h.normal),d.face=h,d.barycoord=u}return d}var be=class i extends Oe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],d=[],u=[],h=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ue(l,3)),this.setAttribute("normal",new ue(d,3)),this.setAttribute("uv",new ue(u,2));function g(_,m,p,M,v,y,L,T,A,R,E){let S=y/A,I=L/R,W=y/2,F=L/2,k=T/2,$=A+1,z=R+1,j=0,X=0,ot=new D;for(let ht=0;ht<z;ht++){let gt=ht*I-F;for(let ft=0;ft<$;ft++){let Vt=ft*S-W;ot[_]=Vt*M,ot[m]=gt*v,ot[p]=k,l.push(ot.x,ot.y,ot.z),ot[_]=0,ot[m]=0,ot[p]=T>0?1:-1,d.push(ot.x,ot.y,ot.z),u.push(ft/A),u.push(1-ht/R),j+=1}}for(let ht=0;ht<R;ht++)for(let gt=0;gt<A;gt++){let ft=h+gt+$*ht,Vt=h+gt+$*(ht+1),Y=h+(gt+1)+$*(ht+1),et=h+(gt+1)+$*ht;c.push(ft,Vt,et),c.push(Vt,Y,et),X+=6}a.addGroup(f,X,E),f+=X,h+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ss(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ye(i){let t={};for(let e=0;e<i.length;e++){let n=ss(i[e]);for(let s in n)t[s]=n[s]}return t}function Ou(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function sh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}var Bu={clone:ss,merge:Ye},zu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,An=class extends oi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zu,this.fragmentShader=Vu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ss(t.uniforms),this.uniformsGroups=Ou(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Dr=class extends He{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=Vn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},jn=new D,sl=new mt,rl=new mt,ke=class extends Dr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ps*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(bs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ps*2*Math.atan(Math.tan(bs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(jn.x,jn.y).multiplyScalar(-t/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jn.x,jn.y).multiplyScalar(-t/jn.z)}getViewSize(t,e){return this.getViewBounds(t,sl,rl),e.subVectors(rl,sl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(bs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Gi=-90,Hi=1,Ra=class extends He{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ke(Gi,Hi,t,e);s.layers=this.layers,this.add(s);let r=new ke(Gi,Hi,t,e);r.layers=this.layers,this.add(r);let o=new ke(Gi,Hi,t,e);o.layers=this.layers,this.add(o);let a=new ke(Gi,Hi,t,e);a.layers=this.layers,this.add(a);let c=new ke(Gi,Hi,t,e);c.layers=this.layers,this.add(c);let l=new ke(Gi,Hi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,d]=this.children,u=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,d),t.setRenderTarget(u,h,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ur=class extends nn{constructor(t,e,n,s,r,o,a,c,l,d){t=t!==void 0?t:[],e=e!==void 0?e:ji,super(t,e,n,s,r,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ia=class extends Hn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ur(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:wn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new be(5,5,5),r=new An({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:ei});r.uniforms.tEquirect.value=e;let o=new Fe(s,r),a=e.minFilter;return e.minFilter===Si&&(e.minFilter=wn),new Ra(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Io=new D,ku=new D,Gu=new Qt,Bn=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Io.subVectors(n,e).cross(ku.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Io),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Gu.getNormalMatrix(t),s=this.coplanarPoint(Io).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},pi=new is,ur=new D,Us=class{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,o=new Bn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Vn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],d=s[5],u=s[6],h=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],M=s[13],v=s[14],y=s[15];if(n[0].setComponents(c-r,h-l,m-f,y-p).normalize(),n[1].setComponents(c+r,h+l,m+f,y+p).normalize(),n[2].setComponents(c+o,h+d,m+g,y+M).normalize(),n[3].setComponents(c-o,h-d,m-g,y-M).normalize(),n[4].setComponents(c-a,h-u,m-_,y-v).normalize(),e===Vn)n[5].setComponents(c+a,h+u,m+_,y+v).normalize();else if(e===Ar)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(t){return pi.center.set(0,0,0),pi.radius=.7071067811865476,pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ur.x=s.normal.x>0?t.max.x:t.min.x,ur.y=s.normal.y>0?t.max.y:t.min.y,ur.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ur)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function rh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Hu(i){let t=new WeakMap;function e(a,c){let l=a.array,d=a.usage,u=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,d),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let d=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){let g=u[h],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,u[h]=_)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){let _=u[f];i.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Ee=class i extends Oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,d=c+1,u=t/a,h=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<d;p++){let M=p*h-o;for(let v=0;v<l;v++){let y=v*u-r;g.push(y,-M,0),_.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){let v=M+l*p,y=M+l*(p+1),L=M+1+l*(p+1),T=M+1+l*p;f.push(v,y,T),f.push(y,L,T)}this.setIndex(f),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Wu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$u=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ju=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ku=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ju=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,td=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ed=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,id=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ad=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ld=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ud=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,fd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,md=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Md=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,bd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Td=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ad=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Id=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ld=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ud=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Fd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Gd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Hd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$d=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,jd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ef=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,of=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,af=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,df=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ff=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,vf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ef=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Af=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Cf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Rf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,If=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Df=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Uf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ff=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Of=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Hf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Wf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Qf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,t0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,e0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,s0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,r0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,l0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,u0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,d0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,m0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,x0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,y0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,v0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,S0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,b0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jt={alphahash_fragment:Wu,alphahash_pars_fragment:Xu,alphamap_fragment:qu,alphamap_pars_fragment:Yu,alphatest_fragment:$u,alphatest_pars_fragment:Zu,aomap_fragment:Ju,aomap_pars_fragment:Ku,batching_pars_vertex:Qu,batching_vertex:ju,begin_vertex:td,beginnormal_vertex:ed,bsdfs:nd,iridescence_fragment:id,bumpmap_pars_fragment:sd,clipping_planes_fragment:rd,clipping_planes_pars_fragment:od,clipping_planes_pars_vertex:ad,clipping_planes_vertex:cd,color_fragment:ld,color_pars_fragment:hd,color_pars_vertex:ud,color_vertex:dd,common:fd,cube_uv_reflection_fragment:pd,defaultnormal_vertex:md,displacementmap_pars_vertex:gd,displacementmap_vertex:xd,emissivemap_fragment:_d,emissivemap_pars_fragment:yd,colorspace_fragment:vd,colorspace_pars_fragment:Md,envmap_fragment:Sd,envmap_common_pars_fragment:bd,envmap_pars_fragment:wd,envmap_pars_vertex:Ed,envmap_physical_pars_fragment:Fd,envmap_vertex:Td,fog_vertex:Ad,fog_pars_vertex:Cd,fog_fragment:Rd,fog_pars_fragment:Id,gradientmap_pars_fragment:Pd,lightmap_pars_fragment:Ld,lights_lambert_fragment:Dd,lights_lambert_pars_fragment:Ud,lights_pars_begin:Nd,lights_toon_fragment:Od,lights_toon_pars_fragment:Bd,lights_phong_fragment:zd,lights_phong_pars_fragment:Vd,lights_physical_fragment:kd,lights_physical_pars_fragment:Gd,lights_fragment_begin:Hd,lights_fragment_maps:Wd,lights_fragment_end:Xd,logdepthbuf_fragment:qd,logdepthbuf_pars_fragment:Yd,logdepthbuf_pars_vertex:$d,logdepthbuf_vertex:Zd,map_fragment:Jd,map_pars_fragment:Kd,map_particle_fragment:Qd,map_particle_pars_fragment:jd,metalnessmap_fragment:tf,metalnessmap_pars_fragment:ef,morphinstance_vertex:nf,morphcolor_vertex:sf,morphnormal_vertex:rf,morphtarget_pars_vertex:of,morphtarget_vertex:af,normal_fragment_begin:cf,normal_fragment_maps:lf,normal_pars_fragment:hf,normal_pars_vertex:uf,normal_vertex:df,normalmap_pars_fragment:ff,clearcoat_normal_fragment_begin:pf,clearcoat_normal_fragment_maps:mf,clearcoat_pars_fragment:gf,iridescence_pars_fragment:xf,opaque_fragment:_f,packing:yf,premultiplied_alpha_fragment:vf,project_vertex:Mf,dithering_fragment:Sf,dithering_pars_fragment:bf,roughnessmap_fragment:wf,roughnessmap_pars_fragment:Ef,shadowmap_pars_fragment:Tf,shadowmap_pars_vertex:Af,shadowmap_vertex:Cf,shadowmask_pars_fragment:Rf,skinbase_vertex:If,skinning_pars_vertex:Pf,skinning_vertex:Lf,skinnormal_vertex:Df,specularmap_fragment:Uf,specularmap_pars_fragment:Nf,tonemapping_fragment:Ff,tonemapping_pars_fragment:Of,transmission_fragment:Bf,transmission_pars_fragment:zf,uv_pars_fragment:Vf,uv_pars_vertex:kf,uv_vertex:Gf,worldpos_vertex:Hf,background_vert:Wf,background_frag:Xf,backgroundCube_vert:qf,backgroundCube_frag:Yf,cube_vert:$f,cube_frag:Zf,depth_vert:Jf,depth_frag:Kf,distanceRGBA_vert:Qf,distanceRGBA_frag:jf,equirect_vert:t0,equirect_frag:e0,linedashed_vert:n0,linedashed_frag:i0,meshbasic_vert:s0,meshbasic_frag:r0,meshlambert_vert:o0,meshlambert_frag:a0,meshmatcap_vert:c0,meshmatcap_frag:l0,meshnormal_vert:h0,meshnormal_frag:u0,meshphong_vert:d0,meshphong_frag:f0,meshphysical_vert:p0,meshphysical_frag:m0,meshtoon_vert:g0,meshtoon_frag:x0,points_vert:_0,points_frag:y0,shadow_vert:v0,shadow_frag:M0,sprite_vert:S0,sprite_frag:b0},bt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},bn={basic:{uniforms:Ye([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:Ye([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:Ye([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:Ye([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:Ye([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:Ye([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:Ye([bt.points,bt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:Ye([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:Ye([bt.common,bt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:Ye([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:Ye([bt.sprite,bt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:Ye([bt.common,bt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:Ye([bt.lights,bt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};bn.physical={uniforms:Ye([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};var dr={r:0,b:0,g:0},mi=new Tn,w0=new ye;function E0(i,t,e,n,s,r,o){let a=new Wt(0),c=r===!0?0:1,l,d,u=null,h=0,f=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?e:t).get(v)),v}function _(M){let v=!1,y=g(M);y===null?p(a,c):y&&y.isColor&&(p(y,1),v=!0);let L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,v){let y=g(v);y&&(y.isCubeTexture||y.mapping===eo)?(d===void 0&&(d=new Fe(new be(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:ss(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(L,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),mi.copy(v.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),d.material.uniforms.envMap.value=y,d.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(w0.makeRotationFromEuler(mi)),d.material.toneMapped=se.getTransfer(y.colorSpace)!==fe,(u!==y||h!==y.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,u=y,h=y.version,f=i.toneMapping),d.layers.enableAll(),M.unshift(d,d.geometry,d.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Fe(new Ee(2,2),new An({name:"BackgroundMaterial",uniforms:ss(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=se.getTransfer(y.colorSpace)!==fe,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||h!==y.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,h=y.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,v){M.getRGB(dr,sh(i)),n.buffers.color.setClear(dr.r,dr.g,dr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(a,c)},render:_,addToRenderList:m}}function T0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(S,I,W,F,k){let $=!1,z=u(F,W,I);r!==z&&(r=z,l(r.object)),$=f(S,F,W,k),$&&g(S,F,W,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,y(S,I,W,F),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function d(S){return i.deleteVertexArray(S)}function u(S,I,W){let F=W.wireframe===!0,k=n[S.id];k===void 0&&(k={},n[S.id]=k);let $=k[I.id];$===void 0&&($={},k[I.id]=$);let z=$[F];return z===void 0&&(z=h(c()),$[F]=z),z}function h(S){let I=[],W=[],F=[];for(let k=0;k<e;k++)I[k]=0,W[k]=0,F[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:W,attributeDivisors:F,object:S,attributes:{},index:null}}function f(S,I,W,F){let k=r.attributes,$=I.attributes,z=0,j=W.getAttributes();for(let X in j)if(j[X].location>=0){let ht=k[X],gt=$[X];if(gt===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(gt=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(gt=S.instanceColor)),ht===void 0||ht.attribute!==gt||gt&&ht.data!==gt.data)return!0;z++}return r.attributesNum!==z||r.index!==F}function g(S,I,W,F){let k={},$=I.attributes,z=0,j=W.getAttributes();for(let X in j)if(j[X].location>=0){let ht=$[X];ht===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(ht=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(ht=S.instanceColor));let gt={};gt.attribute=ht,ht&&ht.data&&(gt.data=ht.data),k[X]=gt,z++}r.attributes=k,r.attributesNum=z,r.index=F}function _(){let S=r.newAttributes;for(let I=0,W=S.length;I<W;I++)S[I]=0}function m(S){p(S,0)}function p(S,I){let W=r.newAttributes,F=r.enabledAttributes,k=r.attributeDivisors;W[S]=1,F[S]===0&&(i.enableVertexAttribArray(S),F[S]=1),k[S]!==I&&(i.vertexAttribDivisor(S,I),k[S]=I)}function M(){let S=r.newAttributes,I=r.enabledAttributes;for(let W=0,F=I.length;W<F;W++)I[W]!==S[W]&&(i.disableVertexAttribArray(W),I[W]=0)}function v(S,I,W,F,k,$,z){z===!0?i.vertexAttribIPointer(S,I,W,k,$):i.vertexAttribPointer(S,I,W,F,k,$)}function y(S,I,W,F){_();let k=F.attributes,$=W.getAttributes(),z=I.defaultAttributeValues;for(let j in $){let X=$[j];if(X.location>=0){let ot=k[j];if(ot===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(ot=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(ot=S.instanceColor)),ot!==void 0){let ht=ot.normalized,gt=ot.itemSize,ft=t.get(ot);if(ft===void 0)continue;let Vt=ft.buffer,Y=ft.type,et=ft.bytesPerElement,Mt=Y===i.INT||Y===i.UNSIGNED_INT||ot.gpuType===dc;if(ot.isInterleavedBufferAttribute){let at=ot.data,Rt=at.stride,zt=ot.offset;if(at.isInstancedInterleavedBuffer){for(let Nt=0;Nt<X.locationSize;Nt++)p(X.location+Nt,at.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Nt=0;Nt<X.locationSize;Nt++)m(X.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let Nt=0;Nt<X.locationSize;Nt++)v(X.location+Nt,gt/X.locationSize,Y,ht,Rt*et,(zt+gt/X.locationSize*Nt)*et,Mt)}else{if(ot.isInstancedBufferAttribute){for(let at=0;at<X.locationSize;at++)p(X.location+at,ot.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let at=0;at<X.locationSize;at++)m(X.location+at);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let at=0;at<X.locationSize;at++)v(X.location+at,gt/X.locationSize,Y,ht,gt*et,gt/X.locationSize*at*et,Mt)}}else if(z!==void 0){let ht=z[j];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(X.location,ht);break;case 3:i.vertexAttrib3fv(X.location,ht);break;case 4:i.vertexAttrib4fv(X.location,ht);break;default:i.vertexAttrib1fv(X.location,ht)}}}}M()}function L(){R();for(let S in n){let I=n[S];for(let W in I){let F=I[W];for(let k in F)d(F[k].object),delete F[k];delete I[W]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;let I=n[S.id];for(let W in I){let F=I[W];for(let k in F)d(F[k].object),delete F[k];delete I[W]}delete n[S.id]}function A(S){for(let I in n){let W=n[I];if(W[S.id]===void 0)continue;let F=W[S.id];for(let k in F)d(F[k].object),delete F[k];delete W[S.id]}}function R(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function A0(i,t,e){let n;function s(l){n=l}function r(l,d){i.drawArrays(n,l,d),e.update(d,n,1)}function o(l,d,u){u!==0&&(i.drawArraysInstanced(n,l,d,u),e.update(d,n,u))}function a(l,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];e.update(f,n,1)}function c(l,d,u,h){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,d,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_]*h[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function C0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==xn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let R=A===Ws&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Gn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==zn&&!R)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let u=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:L,maxSamples:T}}function R0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Bn,a=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){let f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){e=d(u,h,0)},this.setState=function(u,h,f){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):l();else{let M=r?0:n,v=M*4,y=p.clippingState||null;c.value=y,y=d(g,h,v,f);for(let L=0;L!==v;++L)y[L]=e[L];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(u,h,f,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=f+_*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,y=f;v!==_;++v,y+=4)o.copy(u[v]).applyMatrix4(M,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function I0(i){let t=new WeakMap;function e(o,a){return a===Rs?o.mapping=ji:a===Ko&&(o.mapping=ts),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Rs||a===Ko)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Ia(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Nr=class extends Dr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},qi=4,ol=[.125,.215,.35,.446,.526,.582],vi=20,Po=new Nr,al=new Wt,Lo=null,Do=0,Uo=0,No=!1,xi=(1+Math.sqrt(5))/2,Wi=1/xi,cl=[new D(-xi,Wi,0),new D(xi,Wi,0),new D(-Wi,0,xi),new D(Wi,0,xi),new D(0,xi,-Wi),new D(0,xi,Wi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Fr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Lo=this._renderer.getRenderTarget(),Do=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),No=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Lo,Do,Uo),this._renderer.xr.enabled=No,t.scissorTest=!1,fr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ji||t.mapping===ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Lo=this._renderer.getRenderTarget(),Do=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),No=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:Ws,format:xn,colorSpace:ls,depthBuffer:!1},s=ll(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ll(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=P0(r)),this._blurMaterial=L0(r,t,e)}return s}_compileMaterial(t){let e=new Fe(this._lodPlanes[0],t);this._renderer.compile(e,Po)}_sceneToCubeUV(t,e,n,s){let a=new ke(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(al),d.toneMapping=ni,d.autoClear=!1;let f=new ai({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),g=new Fe(new be,f),_=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(al),_=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):M===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let v=this._cubeSize;fr(s,M*v,p>2?v:0,v,v),d.setRenderTarget(s),_&&d.render(g,a),d.render(t,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ji||t.mapping===ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hl());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Fe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;fr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Po)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=cl[(s-r-1)%cl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let d=3,u=new Fe(this._lodPlanes[s],l),h=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*vi-1),_=r/g,m=isFinite(r)?1+Math.floor(d*_):vi;m>vi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vi}`);let p=[],M=0;for(let A=0;A<vi;++A){let R=A/_,E=Math.exp(-R*R/2);p.push(E),A===0?M+=E:A<m&&(M+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-n;let y=this._sizeLods[s],L=3*y*(s>v-qi?s-v+qi:0),T=4*(this._cubeSize-y);fr(e,L,T,3*y,2*y),c.setRenderTarget(e),c.render(u,Po)}};function P0(i){let t=[],e=[],n=[],s=i,r=i-qi+1+ol.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-qi?c=ol[o-i+qi-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),d=-l,u=1+l,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),v=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let T=0;T<f;T++){let A=T%3*2/3-1,R=T>2?0:-1,E=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];M.set(E,_*g*T),v.set(h,m*g*T);let S=[T,T,T,T,T,T];y.set(S,p*g*T)}let L=new Oe;L.setAttribute("position",new Je(M,_)),L.setAttribute("uv",new Je(v,m)),L.setAttribute("faceIndex",new Je(y,p)),t.push(L),s>qi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ll(i,t,e){let n=new Hn(i,t,e);return n.texture.mapping=eo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function L0(i,t,e){let n=new Float32Array(vi),s=new D(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function hl(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function ul(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function yc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function D0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Rs||c===Ko,d=c===ji||c===ts;if(l||d){let u=t.get(a),h=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Fr(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return l&&f&&f.height>0||d&&f&&s(f)?(e===null&&(e=new Fr(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let d=0;d<l;d++)a[d]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function U0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ms("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function N0(i,t,e,n){let s={},r=new WeakMap;function o(u){let h=u.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);for(let g in h.morphAttributes){let _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}h.removeEventListener("dispose",o),delete s[h.id];let f=r.get(h);f&&(t.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(u,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(u){let h=u.attributes;for(let g in h)t.update(h[g],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(u){let h=[],f=u.index,g=u.attributes.position,_=0;if(f!==null){let M=f.array;_=f.version;for(let v=0,y=M.length;v<y;v+=3){let L=M[v+0],T=M[v+1],A=M[v+2];h.push(L,T,T,A,A,L)}}else if(g!==void 0){let M=g.array;_=g.version;for(let v=0,y=M.length/3-1;v<y;v+=3){let L=v+0,T=v+1,A=v+2;h.push(L,T,T,A,A,L)}}else return;let m=new(nh(h)?Lr:Pr)(h,1);m.version=_;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function d(u){let h=r.get(u);if(h){let f=u.index;f!==null&&h.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:d}}function F0(i,t,e){let n;function s(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function c(h,f){i.drawElements(n,f,r,h*o),e.update(f,n,1)}function l(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,h*o,g),e.update(f,n,g))}function d(h,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(h,f,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*_[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function O0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function B0(i,t,e){let n=new WeakMap,s=new pe;function r(o,a,c){let l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=d!==void 0?d.length:0,h=n.get(a);if(h===void 0||h.count!==u){let E=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],v=0;f===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let y=a.attributes.position.count*v,L=1;y>t.maxTextureSize&&(L=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let T=new Float32Array(y*L*4*u),A=new Ir(T,y,L,u);A.type=zn,A.needsUpdate=!0;let R=v*4;for(let S=0;S<u;S++){let I=m[S],W=p[S],F=M[S],k=y*L*4*S;for(let $=0;$<I.count;$++){let z=$*R;f===!0&&(s.fromBufferAttribute(I,$),T[k+z+0]=s.x,T[k+z+1]=s.y,T[k+z+2]=s.z,T[k+z+3]=0),g===!0&&(s.fromBufferAttribute(W,$),T[k+z+4]=s.x,T[k+z+5]=s.y,T[k+z+6]=s.z,T[k+z+7]=0),_===!0&&(s.fromBufferAttribute(F,$),T[k+z+8]=s.x,T[k+z+9]=s.y,T[k+z+10]=s.z,T[k+z+11]=F.itemSize===4?s.w:1)}}h={count:u,texture:A,size:new mt(y,L)},n.set(a,h),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function z0(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,d=c.geometry,u=t.get(c,d);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let h=c.skeleton;s.get(h)!==l&&(h.update(),s.set(h,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Or=class extends nn{constructor(t,e,n,s,r,o,a,c,l,d=Zi){if(d!==Zi&&d!==ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Zi&&(n=bi),n===void 0&&d===ns&&(n=es),super(null,s,r,o,a,c,d,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:_n,this.minFilter=c!==void 0?c:_n,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},oh=new nn,dl=new Or(1,1),ah=new Ir,ch=new Ca,lh=new Ur,fl=[],pl=[],ml=new Float32Array(16),gl=new Float32Array(9),xl=new Float32Array(4);function hs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=fl[s];if(r===void 0&&(r=new Float32Array(s),fl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Re(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ie(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function io(i,t){let e=pl[t];e===void 0&&(e=new Int32Array(t),pl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function V0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function k0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2fv(this.addr,t),Ie(e,t)}}function G0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;i.uniform3fv(this.addr,t),Ie(e,t)}}function H0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4fv(this.addr,t),Ie(e,t)}}function W0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Re(e,n))return;xl.set(n),i.uniformMatrix2fv(this.addr,!1,xl),Ie(e,n)}}function X0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Re(e,n))return;gl.set(n),i.uniformMatrix3fv(this.addr,!1,gl),Ie(e,n)}}function q0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Re(e,n))return;ml.set(n),i.uniformMatrix4fv(this.addr,!1,ml),Ie(e,n)}}function Y0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function $0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2iv(this.addr,t),Ie(e,t)}}function Z0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3iv(this.addr,t),Ie(e,t)}}function J0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4iv(this.addr,t),Ie(e,t)}}function K0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Q0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2uiv(this.addr,t),Ie(e,t)}}function j0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3uiv(this.addr,t),Ie(e,t)}}function tp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4uiv(this.addr,t),Ie(e,t)}}function ep(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(dl.compareFunction=eh,r=dl):r=oh,e.setTexture2D(t||r,s)}function np(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ch,s)}function ip(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||lh,s)}function sp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ah,s)}function rp(i){switch(i){case 5126:return V0;case 35664:return k0;case 35665:return G0;case 35666:return H0;case 35674:return W0;case 35675:return X0;case 35676:return q0;case 5124:case 35670:return Y0;case 35667:case 35671:return $0;case 35668:case 35672:return Z0;case 35669:case 35673:return J0;case 5125:return K0;case 36294:return Q0;case 36295:return j0;case 36296:return tp;case 35678:case 36198:case 36298:case 36306:case 35682:return ep;case 35679:case 36299:case 36307:return np;case 35680:case 36300:case 36308:case 36293:return ip;case 36289:case 36303:case 36311:case 36292:return sp}}function op(i,t){i.uniform1fv(this.addr,t)}function ap(i,t){let e=hs(t,this.size,2);i.uniform2fv(this.addr,e)}function cp(i,t){let e=hs(t,this.size,3);i.uniform3fv(this.addr,e)}function lp(i,t){let e=hs(t,this.size,4);i.uniform4fv(this.addr,e)}function hp(i,t){let e=hs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function up(i,t){let e=hs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function dp(i,t){let e=hs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function fp(i,t){i.uniform1iv(this.addr,t)}function pp(i,t){i.uniform2iv(this.addr,t)}function mp(i,t){i.uniform3iv(this.addr,t)}function gp(i,t){i.uniform4iv(this.addr,t)}function xp(i,t){i.uniform1uiv(this.addr,t)}function _p(i,t){i.uniform2uiv(this.addr,t)}function yp(i,t){i.uniform3uiv(this.addr,t)}function vp(i,t){i.uniform4uiv(this.addr,t)}function Mp(i,t,e){let n=this.cache,s=t.length,r=io(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||oh,r[o])}function Sp(i,t,e){let n=this.cache,s=t.length,r=io(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||ch,r[o])}function bp(i,t,e){let n=this.cache,s=t.length,r=io(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||lh,r[o])}function wp(i,t,e){let n=this.cache,s=t.length,r=io(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||ah,r[o])}function Ep(i){switch(i){case 5126:return op;case 35664:return ap;case 35665:return cp;case 35666:return lp;case 35674:return hp;case 35675:return up;case 35676:return dp;case 5124:case 35670:return fp;case 35667:case 35671:return pp;case 35668:case 35672:return mp;case 35669:case 35673:return gp;case 5125:return xp;case 36294:return _p;case 36295:return yp;case 36296:return vp;case 35678:case 36198:case 36298:case 36306:case 35682:return Mp;case 35679:case 36299:case 36307:return Sp;case 35680:case 36300:case 36308:case 36293:return bp;case 36289:case 36303:case 36311:case 36292:return wp}}var Pa=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=rp(e.type)}},La=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ep(e.type)}},Da=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Fo=/(\w+)(\])?(\[|\.)?/g;function _l(i,t){i.seq.push(t),i.map[t.id]=t}function Tp(i,t,e){let n=i.name,s=n.length;for(Fo.lastIndex=0;;){let r=Fo.exec(n),o=Fo.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){_l(e,l===void 0?new Pa(a,i,t):new La(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Da(a),_l(e,u)),e=u}}}var Ki=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Tp(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function yl(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Ap=37297,Cp=0;function Rp(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var vl=new Qt;function Ip(i){se._getMatrix(vl,se.workingColorSpace,i);let t=`mat3( ${vl.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case no:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ml(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Rp(i.getShaderSource(t),o)}else return s}function Pp(i,t){let e=Ip(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Lp(i,t){let e;switch(t){case Gh:e="Linear";break;case Hh:e="Reinhard";break;case Wh:e="Cineon";break;case Xh:e="ACESFilmic";break;case Yh:e="AgX";break;case uc:e="Neutral";break;case qh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var pr=new D;function Dp(){se.getLuminanceCoefficients(pr);let i=pr.x.toFixed(4),t=pr.y.toFixed(4),e=pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Up(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ss).join(`
`)}function Np(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Fp(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ss(i){return i!==""}function Sl(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Op=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ua(i){return i.replace(Op,zp)}var Bp=new Map;function zp(i,t){let e=jt[t];if(e===void 0){let n=Bp.get(t);if(n!==void 0)e=jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ua(e)}var Vp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wl(i){return i.replace(Vp,kp)}function kp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function El(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Gp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===kl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===hc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function Hp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ji:case ts:t="ENVMAP_TYPE_CUBE";break;case eo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Wp(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ts:t="ENVMAP_MODE_REFRACTION";break}return t}function Xp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Gl:t="ENVMAP_BLENDING_MULTIPLY";break;case Vh:t="ENVMAP_BLENDING_MIX";break;case kh:t="ENVMAP_BLENDING_ADD";break}return t}function qp(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Yp(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Gp(e),l=Hp(e),d=Wp(e),u=Xp(e),h=qp(e),f=Up(e),g=Np(r),_=s.createProgram(),m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ss).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ss).join(`
`),p.length>0&&(p+=`
`)):(m=[El(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ss).join(`
`),p=[El(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ni?"#define TONE_MAPPING":"",e.toneMapping!==ni?jt.tonemapping_pars_fragment:"",e.toneMapping!==ni?Lp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,Pp("linearToOutputTexel",e.outputColorSpace),Dp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ss).join(`
`)),o=Ua(o),o=Sl(o,e),o=bl(o,e),a=Ua(a),a=Sl(a,e),a=bl(a,e),o=wl(o),a=wl(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Bc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Bc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=M+m+o,y=M+p+a,L=yl(s,s.VERTEX_SHADER,v),T=yl(s,s.FRAGMENT_SHADER,y);s.attachShader(_,L),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(I){if(i.debug.checkShaderErrors){let W=s.getProgramInfoLog(_).trim(),F=s.getShaderInfoLog(L).trim(),k=s.getShaderInfoLog(T).trim(),$=!0,z=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,L,T);else{let j=Ml(s,L,"vertex"),X=Ml(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+W+`
`+j+`
`+X)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(F===""||k==="")&&(z=!1);z&&(I.diagnostics={runnable:$,programLog:W,vertexShader:{log:F,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(L),s.deleteShader(T),R=new Ki(s,_),E=Fp(s,_)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,Ap)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Cp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=T,this}var $p=0,Na=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Fa(t),e.set(t,n)),n}},Fa=class{constructor(t){this.id=$p++,this.code=t,this.usedTimes=0}};function Zp(i,t,e,n,s,r,o){let a=new Ds,c=new Na,l=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,S,I,W,F){let k=W.fog,$=F.geometry,z=E.isMeshStandardMaterial?W.environment:null,j=(E.isMeshStandardMaterial?e:t).get(E.envMap||z),X=j&&j.mapping===eo?j.image.height:null,ot=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));let ht=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,gt=ht!==void 0?ht.length:0,ft=0;$.morphAttributes.position!==void 0&&(ft=1),$.morphAttributes.normal!==void 0&&(ft=2),$.morphAttributes.color!==void 0&&(ft=3);let Vt,Y,et,Mt;if(ot){let ce=bn[ot];Vt=ce.vertexShader,Y=ce.fragmentShader}else Vt=E.vertexShader,Y=E.fragmentShader,c.update(E),et=c.getVertexShaderID(E),Mt=c.getFragmentShaderID(E);let at=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),zt=F.isInstancedMesh===!0,Nt=F.isBatchedMesh===!0,Zt=!!E.map,tt=!!E.matcap,pt=!!j,P=!!E.aoMap,Ut=!!E.lightMap,J=!!E.bumpMap,Ct=!!E.normalMap,xt=!!E.displacementMap,Ft=!!E.emissiveMap,Tt=!!E.metalnessMap,C=!!E.roughnessMap,w=E.anisotropy>0,G=E.clearcoat>0,Q=E.dispersion>0,st=E.iridescence>0,K=E.sheen>0,Lt=E.transmission>0,yt=w&&!!E.anisotropyMap,At=G&&!!E.clearcoatMap,te=G&&!!E.clearcoatNormalMap,ut=G&&!!E.clearcoatRoughnessMap,It=st&&!!E.iridescenceMap,Ht=st&&!!E.iridescenceThicknessMap,Xt=K&&!!E.sheenColorMap,Pt=K&&!!E.sheenRoughnessMap,ie=!!E.specularMap,Jt=!!E.specularColorMap,ae=!!E.specularIntensityMap,O=Lt&&!!E.transmissionMap,St=Lt&&!!E.thicknessMap,Z=!!E.gradientMap,nt=!!E.alphaMap,wt=E.alphaTest>0,Et=!!E.alphaHash,Yt=!!E.extensions,ve=ni;E.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(ve=i.toneMapping);let De={shaderID:ot,shaderType:E.type,shaderName:E.name,vertexShader:Vt,fragmentShader:Y,defines:E.defines,customVertexShaderID:et,customFragmentShaderID:Mt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Nt,batchingColor:Nt&&F._colorsTexture!==null,instancing:zt,instancingColor:zt&&F.instanceColor!==null,instancingMorph:zt&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:ls,alphaToCoverage:!!E.alphaToCoverage,map:Zt,matcap:tt,envMap:pt,envMapMode:pt&&j.mapping,envMapCubeUVHeight:X,aoMap:P,lightMap:Ut,bumpMap:J,normalMap:Ct,displacementMap:h&&xt,emissiveMap:Ft,normalMapObjectSpace:Ct&&E.normalMapType===Kh,normalMapTangentSpace:Ct&&E.normalMapType===th,metalnessMap:Tt,roughnessMap:C,anisotropy:w,anisotropyMap:yt,clearcoat:G,clearcoatMap:At,clearcoatNormalMap:te,clearcoatRoughnessMap:ut,dispersion:Q,iridescence:st,iridescenceMap:It,iridescenceThicknessMap:Ht,sheen:K,sheenColorMap:Xt,sheenRoughnessMap:Pt,specularMap:ie,specularColorMap:Jt,specularIntensityMap:ae,transmission:Lt,transmissionMap:O,thicknessMap:St,gradientMap:Z,opaque:E.transparent===!1&&E.blending===$i&&E.alphaToCoverage===!1,alphaMap:nt,alphaTest:wt,alphaHash:Et,combine:E.combine,mapUv:Zt&&_(E.map.channel),aoMapUv:P&&_(E.aoMap.channel),lightMapUv:Ut&&_(E.lightMap.channel),bumpMapUv:J&&_(E.bumpMap.channel),normalMapUv:Ct&&_(E.normalMap.channel),displacementMapUv:xt&&_(E.displacementMap.channel),emissiveMapUv:Ft&&_(E.emissiveMap.channel),metalnessMapUv:Tt&&_(E.metalnessMap.channel),roughnessMapUv:C&&_(E.roughnessMap.channel),anisotropyMapUv:yt&&_(E.anisotropyMap.channel),clearcoatMapUv:At&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:te&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ht&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&_(E.sheenRoughnessMap.channel),specularMapUv:ie&&_(E.specularMap.channel),specularColorMapUv:Jt&&_(E.specularColorMap.channel),specularIntensityMapUv:ae&&_(E.specularIntensityMap.channel),transmissionMapUv:O&&_(E.transmissionMap.channel),thicknessMapUv:St&&_(E.thicknessMap.channel),alphaMapUv:nt&&_(E.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ct||w),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!$.attributes.uv&&(Zt||nt),fog:!!k,useFog:E.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Rt,skinning:F.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:ft,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ve,decodeVideoTexture:Zt&&E.map.isVideoTexture===!0&&se.getTransfer(E.map.colorSpace)===fe,decodeVideoTextureEmissive:Ft&&E.emissiveMap.isVideoTexture===!0&&se.getTransfer(E.emissiveMap.colorSpace)===fe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ce,flipSided:E.side===Ge,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Yt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&E.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return De.vertexUv1s=l.has(1),De.vertexUv2s=l.has(2),De.vertexUv3s=l.has(3),l.clear(),De}function p(E){let S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(let I in E.defines)S.push(I),S.push(E.defines[I]);return E.isRawShaderMaterial===!1&&(M(S,E),v(S,E),S.push(i.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function M(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function v(E,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),E.push(a.mask)}function y(E){let S=g[E.type],I;if(S){let W=bn[S];I=Bu.clone(W.uniforms)}else I=E.uniforms;return I}function L(E,S){let I;for(let W=0,F=d.length;W<F;W++){let k=d[W];if(k.cacheKey===S){I=k,++I.usedTimes;break}}return I===void 0&&(I=new Yp(i,S,E,r),d.push(I)),I}function T(E){if(--E.usedTimes===0){let S=d.indexOf(E);d[S]=d[d.length-1],d.pop(),E.destroy()}}function A(E){c.remove(E)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:L,releaseProgram:T,releaseShaderCache:A,programs:d,dispose:R}}function Jp(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Kp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Tl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Al(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,h,f,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,h,f,g,_,m){let p=o(u,h,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,h,f,g,_,m){let p=o(u,h,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,h){e.length>1&&e.sort(u||Kp),n.length>1&&n.sort(h||Tl),s.length>1&&s.sort(h||Tl)}function d(){for(let u=t,h=i.length;u<h;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:d,sort:l}}function Qp(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Al,i.set(n,[o])):s>=r.length?(o=new Al,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function jp(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Wt};break;case"SpotLight":e={position:new D,direction:new D,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function tm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var em=0;function nm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function im(i){let t=new jp,e=tm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let s=new D,r=new ye,o=new ye;function a(l){let d=0,u=0,h=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,M=0,v=0,y=0,L=0,T=0,A=0;l.sort(nm);for(let E=0,S=l.length;E<S;E++){let I=l[E],W=I.color,F=I.intensity,k=I.distance,$=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=W.r*F,u+=W.g*F,h+=W.b*F;else if(I.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(I.sh.coefficients[z],F);A++}else if(I.isDirectionalLight){let z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let j=I.shadow,X=e.get(I);X.shadowIntensity=j.intensity,X.shadowBias=j.bias,X.shadowNormalBias=j.normalBias,X.shadowRadius=j.radius,X.shadowMapSize=j.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=I.shadow.matrix,M++}n.directional[f]=z,f++}else if(I.isSpotLight){let z=t.get(I);z.position.setFromMatrixPosition(I.matrixWorld),z.color.copy(W).multiplyScalar(F),z.distance=k,z.coneCos=Math.cos(I.angle),z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),z.decay=I.decay,n.spot[_]=z;let j=I.shadow;if(I.map&&(n.spotLightMap[L]=I.map,L++,j.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[_]=j.matrix,I.castShadow){let X=e.get(I);X.shadowIntensity=j.intensity,X.shadowBias=j.bias,X.shadowNormalBias=j.normalBias,X.shadowRadius=j.radius,X.shadowMapSize=j.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=$,y++}_++}else if(I.isRectAreaLight){let z=t.get(I);z.color.copy(W).multiplyScalar(F),z.halfWidth.set(I.width*.5,0,0),z.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=z,m++}else if(I.isPointLight){let z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),z.distance=I.distance,z.decay=I.decay,I.castShadow){let j=I.shadow,X=e.get(I);X.shadowIntensity=j.intensity,X.shadowBias=j.bias,X.shadowNormalBias=j.normalBias,X.shadowRadius=j.radius,X.shadowMapSize=j.mapSize,X.shadowCameraNear=j.camera.near,X.shadowCameraFar=j.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=I.shadow.matrix,v++}n.point[g]=z,g++}else if(I.isHemisphereLight){let z=t.get(I);z.skyColor.copy(I.color).multiplyScalar(F),z.groundColor.copy(I.groundColor).multiplyScalar(F),n.hemi[p]=z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=bt.LTC_FLOAT_1,n.rectAreaLTC2=bt.LTC_FLOAT_2):(n.rectAreaLTC1=bt.LTC_HALF_1,n.rectAreaLTC2=bt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;let R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==M||R.numPointShadows!==v||R.numSpotShadows!==y||R.numSpotMaps!==L||R.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+L-T,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,R.directionalLength=f,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=M,R.numPointShadows=v,R.numSpotShadows=y,R.numSpotMaps=L,R.numLightProbes=A,n.version=em++)}function c(l,d){let u=0,h=0,f=0,g=0,_=0,m=d.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){let v=l[p];if(v.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(v.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(v.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Cl(i){let t=new im(i),e=[],n=[];function s(d){l.camera=d,e.length=0,n.length=0}function r(d){e.push(d)}function o(d){n.push(d)}function a(){t.setup(e)}function c(d){t.setupView(e,d)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function sm(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Cl(i),t.set(s,[a])):r>=o.length?(a=new Cl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Oa=class extends oi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Zh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ba=class extends oi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},rm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,om=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function am(i,t,e){let n=new Us,s=new mt,r=new mt,o=new pe,a=new Oa({depthPacking:Jh}),c=new Ba,l={},d=e.maxTextureSize,u={[ii]:Ge,[Ge]:ii,[Ce]:Ce},h=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:rm,fragmentShader:om}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new Oe;g.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Fe(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kl;let p=this.type;this.render=function(T,A,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let E=i.getRenderTarget(),S=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),W=i.state;W.setBlending(ei),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let F=p!==On&&this.type===On,k=p===On&&this.type!==On;for(let $=0,z=T.length;$<z;$++){let j=T[$],X=j.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let ot=X.getFrameExtents();if(s.multiply(ot),r.copy(X.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ot.x),s.x=r.x*ot.x,X.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ot.y),s.y=r.y*ot.y,X.mapSize.y=r.y)),X.map===null||F===!0||k===!0){let gt=this.type!==On?{minFilter:_n,magFilter:_n}:{};X.map!==null&&X.map.dispose(),X.map=new Hn(s.x,s.y,gt),X.map.texture.name=j.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();let ht=X.getViewportCount();for(let gt=0;gt<ht;gt++){let ft=X.getViewport(gt);o.set(r.x*ft.x,r.y*ft.y,r.x*ft.z,r.y*ft.w),W.viewport(o),X.updateMatrices(j,gt),n=X.getFrustum(),y(A,R,X.camera,j,this.type)}X.isPointLightShadow!==!0&&this.type===On&&M(X,R),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,S,I)};function M(T,A){let R=t.update(_);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Hn(s.x,s.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,R,h,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,R,f,_,null)}function v(T,A,R,E){let S=null,I=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)S=I;else if(S=R.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let W=S.uuid,F=A.uuid,k=l[W];k===void 0&&(k={},l[W]=k);let $=k[F];$===void 0&&($=S.clone(),k[F]=$,A.addEventListener("dispose",L)),S=$}if(S.visible=A.visible,S.wireframe=A.wireframe,E===On?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:u[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let W=i.properties.get(S);W.light=R}return S}function y(T,A,R,E,S){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===On)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);let F=t.update(T),k=T.material;if(Array.isArray(k)){let $=F.groups;for(let z=0,j=$.length;z<j;z++){let X=$[z],ot=k[X.materialIndex];if(ot&&ot.visible){let ht=v(T,ot,E,S);T.onBeforeShadow(i,T,A,R,F,ht,X),i.renderBufferDirect(R,null,F,ht,T,X),T.onAfterShadow(i,T,A,R,F,ht,X)}}}else if(k.visible){let $=v(T,k,E,S);T.onBeforeShadow(i,T,A,R,F,$,null),i.renderBufferDirect(R,null,F,$,T,null),T.onAfterShadow(i,T,A,R,F,$,null)}}let W=T.children;for(let F=0,k=W.length;F<k;F++)y(W[F],A,R,E,S)}function L(T){T.target.removeEventListener("dispose",L);for(let R in l){let E=l[R],S=T.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}var cm={[Wo]:Xo,[qo]:Zo,[Yo]:Jo,[Qi]:$o,[Xo]:Wo,[Zo]:qo,[Jo]:Yo,[$o]:Qi};function lm(i,t){function e(){let O=!1,St=new pe,Z=null,nt=new pe(0,0,0,0);return{setMask:function(wt){Z!==wt&&!O&&(i.colorMask(wt,wt,wt,wt),Z=wt)},setLocked:function(wt){O=wt},setClear:function(wt,Et,Yt,ve,De){De===!0&&(wt*=ve,Et*=ve,Yt*=ve),St.set(wt,Et,Yt,ve),nt.equals(St)===!1&&(i.clearColor(wt,Et,Yt,ve),nt.copy(St))},reset:function(){O=!1,Z=null,nt.set(-1,0,0,0)}}}function n(){let O=!1,St=!1,Z=null,nt=null,wt=null;return{setReversed:function(Et){if(St!==Et){let Yt=t.get("EXT_clip_control");St?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT);let ve=wt;wt=null,this.setClear(ve)}St=Et},getReversed:function(){return St},setTest:function(Et){Et?at(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(Et){Z!==Et&&!O&&(i.depthMask(Et),Z=Et)},setFunc:function(Et){if(St&&(Et=cm[Et]),nt!==Et){switch(Et){case Wo:i.depthFunc(i.NEVER);break;case Xo:i.depthFunc(i.ALWAYS);break;case qo:i.depthFunc(i.LESS);break;case Qi:i.depthFunc(i.LEQUAL);break;case Yo:i.depthFunc(i.EQUAL);break;case $o:i.depthFunc(i.GEQUAL);break;case Zo:i.depthFunc(i.GREATER);break;case Jo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}nt=Et}},setLocked:function(Et){O=Et},setClear:function(Et){wt!==Et&&(St&&(Et=1-Et),i.clearDepth(Et),wt=Et)},reset:function(){O=!1,Z=null,nt=null,wt=null,St=!1}}}function s(){let O=!1,St=null,Z=null,nt=null,wt=null,Et=null,Yt=null,ve=null,De=null;return{setTest:function(ce){O||(ce?at(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(ce){St!==ce&&!O&&(i.stencilMask(ce),St=ce)},setFunc:function(ce,Ke,dn){(Z!==ce||nt!==Ke||wt!==dn)&&(i.stencilFunc(ce,Ke,dn),Z=ce,nt=Ke,wt=dn)},setOp:function(ce,Ke,dn){(Et!==ce||Yt!==Ke||ve!==dn)&&(i.stencilOp(ce,Ke,dn),Et=ce,Yt=Ke,ve=dn)},setLocked:function(ce){O=ce},setClear:function(ce){De!==ce&&(i.clearStencil(ce),De=ce)},reset:function(){O=!1,St=null,Z=null,nt=null,wt=null,Et=null,Yt=null,ve=null,De=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,d={},u={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,v=null,y=null,L=null,T=null,A=new Wt(0,0,0),R=0,E=!1,S=null,I=null,W=null,F=null,k=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,j=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(X)[1]),z=j>=1):X.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),z=j>=2);let ot=null,ht={},gt=i.getParameter(i.SCISSOR_BOX),ft=i.getParameter(i.VIEWPORT),Vt=new pe().fromArray(gt),Y=new pe().fromArray(ft);function et(O,St,Z,nt){let wt=new Uint8Array(4),Et=i.createTexture();i.bindTexture(O,Et),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Yt=0;Yt<Z;Yt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(St,0,i.RGBA,1,1,nt,0,i.RGBA,i.UNSIGNED_BYTE,wt):i.texImage2D(St+Yt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,wt);return Et}let Mt={};Mt[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),Mt[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Mt[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Mt[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(i.DEPTH_TEST),o.setFunc(Qi),J(!1),Ct(Rc),at(i.CULL_FACE),P(ei);function at(O){d[O]!==!0&&(i.enable(O),d[O]=!0)}function Rt(O){d[O]!==!1&&(i.disable(O),d[O]=!1)}function zt(O,St){return u[O]!==St?(i.bindFramebuffer(O,St),u[O]=St,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=St),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=St),!0):!1}function Nt(O,St){let Z=f,nt=!1;if(O){Z=h.get(St),Z===void 0&&(Z=[],h.set(St,Z));let wt=O.textures;if(Z.length!==wt.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let Et=0,Yt=wt.length;Et<Yt;Et++)Z[Et]=i.COLOR_ATTACHMENT0+Et;Z.length=wt.length,nt=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,nt=!0);nt&&i.drawBuffers(Z)}function Zt(O){return g!==O?(i.useProgram(O),g=O,!0):!1}let tt={[_i]:i.FUNC_ADD,[bh]:i.FUNC_SUBTRACT,[wh]:i.FUNC_REVERSE_SUBTRACT};tt[Eh]=i.MIN,tt[Th]=i.MAX;let pt={[Ah]:i.ZERO,[Ch]:i.ONE,[Rh]:i.SRC_COLOR,[Go]:i.SRC_ALPHA,[Nh]:i.SRC_ALPHA_SATURATE,[Dh]:i.DST_COLOR,[Ph]:i.DST_ALPHA,[Ih]:i.ONE_MINUS_SRC_COLOR,[Ho]:i.ONE_MINUS_SRC_ALPHA,[Uh]:i.ONE_MINUS_DST_COLOR,[Lh]:i.ONE_MINUS_DST_ALPHA,[Fh]:i.CONSTANT_COLOR,[Oh]:i.ONE_MINUS_CONSTANT_COLOR,[Bh]:i.CONSTANT_ALPHA,[zh]:i.ONE_MINUS_CONSTANT_ALPHA};function P(O,St,Z,nt,wt,Et,Yt,ve,De,ce){if(O===ei){_===!0&&(Rt(i.BLEND),_=!1);return}if(_===!1&&(at(i.BLEND),_=!0),O!==Sh){if(O!==m||ce!==E){if((p!==_i||y!==_i)&&(i.blendEquation(i.FUNC_ADD),p=_i,y=_i),ce)switch(O){case $i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ic:i.blendFunc(i.ONE,i.ONE);break;case Pc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case $i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ic:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Pc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,v=null,L=null,T=null,A.set(0,0,0),R=0,m=O,E=ce}return}wt=wt||St,Et=Et||Z,Yt=Yt||nt,(St!==p||wt!==y)&&(i.blendEquationSeparate(tt[St],tt[wt]),p=St,y=wt),(Z!==M||nt!==v||Et!==L||Yt!==T)&&(i.blendFuncSeparate(pt[Z],pt[nt],pt[Et],pt[Yt]),M=Z,v=nt,L=Et,T=Yt),(ve.equals(A)===!1||De!==R)&&(i.blendColor(ve.r,ve.g,ve.b,De),A.copy(ve),R=De),m=O,E=!1}function Ut(O,St){O.side===Ce?Rt(i.CULL_FACE):at(i.CULL_FACE);let Z=O.side===Ge;St&&(Z=!Z),J(Z),O.blending===$i&&O.transparent===!1?P(ei):P(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let nt=O.stencilWrite;a.setTest(nt),nt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ft(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(O){S!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),S=O)}function Ct(O){O!==vh?(at(i.CULL_FACE),O!==I&&(O===Rc?i.cullFace(i.BACK):O===Mh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),I=O}function xt(O){O!==W&&(z&&i.lineWidth(O),W=O)}function Ft(O,St,Z){O?(at(i.POLYGON_OFFSET_FILL),(F!==St||k!==Z)&&(i.polygonOffset(St,Z),F=St,k=Z)):Rt(i.POLYGON_OFFSET_FILL)}function Tt(O){O?at(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function C(O){O===void 0&&(O=i.TEXTURE0+$-1),ot!==O&&(i.activeTexture(O),ot=O)}function w(O,St,Z){Z===void 0&&(ot===null?Z=i.TEXTURE0+$-1:Z=ot);let nt=ht[Z];nt===void 0&&(nt={type:void 0,texture:void 0},ht[Z]=nt),(nt.type!==O||nt.texture!==St)&&(ot!==Z&&(i.activeTexture(Z),ot=Z),i.bindTexture(O,St||Mt[O]),nt.type=O,nt.texture=St)}function G(){let O=ht[ot];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function st(){try{i.compressedTexImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Lt(){try{i.texSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function yt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function At(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function te(){try{i.texStorage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ut(){try{i.texStorage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function It(){try{i.texImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ht(){try{i.texImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Xt(O){Vt.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Vt.copy(O))}function Pt(O){Y.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Y.copy(O))}function ie(O,St){let Z=l.get(St);Z===void 0&&(Z=new WeakMap,l.set(St,Z));let nt=Z.get(O);nt===void 0&&(nt=i.getUniformBlockIndex(St,O.name),Z.set(O,nt))}function Jt(O,St){let nt=l.get(St).get(O);c.get(St)!==nt&&(i.uniformBlockBinding(St,nt,O.__bindingPointIndex),c.set(St,nt))}function ae(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ot=null,ht={},u={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,v=null,y=null,L=null,T=null,A=new Wt(0,0,0),R=0,E=!1,S=null,I=null,W=null,F=null,k=null,Vt.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:Rt,bindFramebuffer:zt,drawBuffers:Nt,useProgram:Zt,setBlending:P,setMaterial:Ut,setFlipSided:J,setCullFace:Ct,setLineWidth:xt,setPolygonOffset:Ft,setScissorTest:Tt,activeTexture:C,bindTexture:w,unbindTexture:G,compressedTexImage2D:Q,compressedTexImage3D:st,texImage2D:It,texImage3D:Ht,updateUBOMapping:ie,uniformBlockBinding:Jt,texStorage2D:te,texStorage3D:ut,texSubImage2D:K,texSubImage3D:Lt,compressedTexSubImage2D:yt,compressedTexSubImage3D:At,scissor:Xt,viewport:Pt,reset:ae}}function Rl(i,t,e,n){let s=hm(n);switch(e){case Yl:return i*t;case Zl:return i*t;case Jl:return i*t*2;case Kl:return i*t/s.components*s.byteLength;case mc:return i*t/s.components*s.byteLength;case Ql:return i*t*2/s.components*s.byteLength;case gc:return i*t*2/s.components*s.byteLength;case $l:return i*t*3/s.components*s.byteLength;case xn:return i*t*4/s.components*s.byteLength;case xc:return i*t*4/s.components*s.byteLength;case Mr:case Sr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case br:case wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ta:case na:return Math.max(i,16)*Math.max(t,8)/4;case jo:case ea:return Math.max(i,8)*Math.max(t,8)/2;case ia:case sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ca:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case la:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ha:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ua:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case da:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case fa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case pa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ga:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case xa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _a:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ya:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Er:case va:case Ma:return Math.ceil(i/4)*Math.ceil(t/4)*16;case jl:case Sa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ba:case wa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function hm(i){switch(i){case Gn:case Wl:return{byteLength:1,components:1};case Is:case Xl:case Ws:return{byteLength:2,components:1};case fc:case pc:return{byteLength:2,components:4};case bi:case dc:case zn:return{byteLength:4,components:1};case ql:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function um(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new mt,d=new WeakMap,u,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,w){return f?new OffscreenCanvas(C,w):Cr("canvas")}function _(C,w,G){let Q=1,st=Tt(C);if((st.width>G||st.height>G)&&(Q=G/Math.max(st.width,st.height)),Q<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){let K=Math.floor(Q*st.width),Lt=Math.floor(Q*st.height);u===void 0&&(u=g(K,Lt));let yt=w?g(K,Lt):u;return yt.width=K,yt.height=Lt,yt.getContext("2d").drawImage(C,0,0,K,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+K+"x"+Lt+")."),yt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(C,w,G,Q,st=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let K=w;if(w===i.RED&&(G===i.FLOAT&&(K=i.R32F),G===i.HALF_FLOAT&&(K=i.R16F),G===i.UNSIGNED_BYTE&&(K=i.R8)),w===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.R8UI),G===i.UNSIGNED_SHORT&&(K=i.R16UI),G===i.UNSIGNED_INT&&(K=i.R32UI),G===i.BYTE&&(K=i.R8I),G===i.SHORT&&(K=i.R16I),G===i.INT&&(K=i.R32I)),w===i.RG&&(G===i.FLOAT&&(K=i.RG32F),G===i.HALF_FLOAT&&(K=i.RG16F),G===i.UNSIGNED_BYTE&&(K=i.RG8)),w===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RG8UI),G===i.UNSIGNED_SHORT&&(K=i.RG16UI),G===i.UNSIGNED_INT&&(K=i.RG32UI),G===i.BYTE&&(K=i.RG8I),G===i.SHORT&&(K=i.RG16I),G===i.INT&&(K=i.RG32I)),w===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGB8UI),G===i.UNSIGNED_SHORT&&(K=i.RGB16UI),G===i.UNSIGNED_INT&&(K=i.RGB32UI),G===i.BYTE&&(K=i.RGB8I),G===i.SHORT&&(K=i.RGB16I),G===i.INT&&(K=i.RGB32I)),w===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),G===i.UNSIGNED_INT&&(K=i.RGBA32UI),G===i.BYTE&&(K=i.RGBA8I),G===i.SHORT&&(K=i.RGBA16I),G===i.INT&&(K=i.RGBA32I)),w===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),w===i.RGBA){let Lt=st?no:se.getTransfer(Q);G===i.FLOAT&&(K=i.RGBA32F),G===i.HALF_FLOAT&&(K=i.RGBA16F),G===i.UNSIGNED_BYTE&&(K=Lt===fe?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(C,w){let G;return C?w===null||w===bi||w===es?G=i.DEPTH24_STENCIL8:w===zn?G=i.DEPTH32F_STENCIL8:w===Is&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===bi||w===es?G=i.DEPTH_COMPONENT24:w===zn?G=i.DEPTH_COMPONENT32F:w===Is&&(G=i.DEPTH_COMPONENT16),G}function L(C,w){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==_n&&C.minFilter!==wn?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function T(C){let w=C.target;w.removeEventListener("dispose",T),R(w),w.isVideoTexture&&d.delete(w)}function A(C){let w=C.target;w.removeEventListener("dispose",A),S(w)}function R(C){let w=n.get(C);if(w.__webglInit===void 0)return;let G=C.source,Q=h.get(G);if(Q){let st=Q[w.__cacheKey];st.usedTimes--,st.usedTimes===0&&E(C),Object.keys(Q).length===0&&h.delete(G)}n.remove(C)}function E(C){let w=n.get(C);i.deleteTexture(w.__webglTexture);let G=C.source,Q=h.get(G);delete Q[w.__cacheKey],o.memory.textures--}function S(C){let w=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(w.__webglFramebuffer[Q]))for(let st=0;st<w.__webglFramebuffer[Q].length;st++)i.deleteFramebuffer(w.__webglFramebuffer[Q][st]);else i.deleteFramebuffer(w.__webglFramebuffer[Q]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[Q])}else{if(Array.isArray(w.__webglFramebuffer))for(let Q=0;Q<w.__webglFramebuffer.length;Q++)i.deleteFramebuffer(w.__webglFramebuffer[Q]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Q=0;Q<w.__webglColorRenderbuffer.length;Q++)w.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[Q]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let G=C.textures;for(let Q=0,st=G.length;Q<st;Q++){let K=n.get(G[Q]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(G[Q])}n.remove(C)}let I=0;function W(){I=0}function F(){let C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function k(C){let w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function $(C,w){let G=n.get(C);if(C.isVideoTexture&&xt(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){let Q=C.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(G,C,w);return}}e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+w)}function z(C,w){let G=n.get(C);if(C.version>0&&G.__version!==C.version){Y(G,C,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+w)}function j(C,w){let G=n.get(C);if(C.version>0&&G.__version!==C.version){Y(G,C,w);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+w)}function X(C,w){let G=n.get(C);if(C.version>0&&G.__version!==C.version){et(G,C,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+w)}let ot={[en]:i.REPEAT,[Mi]:i.CLAMP_TO_EDGE,[Qo]:i.MIRRORED_REPEAT},ht={[_n]:i.NEAREST,[$h]:i.NEAREST_MIPMAP_NEAREST,[$s]:i.NEAREST_MIPMAP_LINEAR,[wn]:i.LINEAR,[co]:i.LINEAR_MIPMAP_NEAREST,[Si]:i.LINEAR_MIPMAP_LINEAR},gt={[Qh]:i.NEVER,[su]:i.ALWAYS,[jh]:i.LESS,[eh]:i.LEQUAL,[tu]:i.EQUAL,[iu]:i.GEQUAL,[eu]:i.GREATER,[nu]:i.NOTEQUAL};function ft(C,w){if(w.type===zn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===wn||w.magFilter===co||w.magFilter===$s||w.magFilter===Si||w.minFilter===wn||w.minFilter===co||w.minFilter===$s||w.minFilter===Si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ot[w.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ot[w.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ot[w.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ht[w.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ht[w.minFilter]),w.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,gt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===_n||w.minFilter!==$s&&w.minFilter!==Si||w.type===zn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Vt(C,w){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",T));let Q=w.source,st=h.get(Q);st===void 0&&(st={},h.set(Q,st));let K=k(w);if(K!==C.__cacheKey){st[K]===void 0&&(st[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,G=!0),st[K].usedTimes++;let Lt=st[C.__cacheKey];Lt!==void 0&&(st[C.__cacheKey].usedTimes--,Lt.usedTimes===0&&E(w)),C.__cacheKey=K,C.__webglTexture=st[K].texture}return G}function Y(C,w,G){let Q=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Q=i.TEXTURE_3D);let st=Vt(C,w),K=w.source;e.bindTexture(Q,C.__webglTexture,i.TEXTURE0+G);let Lt=n.get(K);if(K.version!==Lt.__version||st===!0){e.activeTexture(i.TEXTURE0+G);let yt=se.getPrimaries(se.workingColorSpace),At=w.colorSpace===ti?null:se.getPrimaries(w.colorSpace),te=w.colorSpace===ti||yt===At?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ut=_(w.image,!1,s.maxTextureSize);ut=Ft(w,ut);let It=r.convert(w.format,w.colorSpace),Ht=r.convert(w.type),Xt=v(w.internalFormat,It,Ht,w.colorSpace,w.isVideoTexture);ft(Q,w);let Pt,ie=w.mipmaps,Jt=w.isVideoTexture!==!0,ae=Lt.__version===void 0||st===!0,O=K.dataReady,St=L(w,ut);if(w.isDepthTexture)Xt=y(w.format===ns,w.type),ae&&(Jt?e.texStorage2D(i.TEXTURE_2D,1,Xt,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,Xt,ut.width,ut.height,0,It,Ht,null));else if(w.isDataTexture)if(ie.length>0){Jt&&ae&&e.texStorage2D(i.TEXTURE_2D,St,Xt,ie[0].width,ie[0].height);for(let Z=0,nt=ie.length;Z<nt;Z++)Pt=ie[Z],Jt?O&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Pt.width,Pt.height,It,Ht,Pt.data):e.texImage2D(i.TEXTURE_2D,Z,Xt,Pt.width,Pt.height,0,It,Ht,Pt.data);w.generateMipmaps=!1}else Jt?(ae&&e.texStorage2D(i.TEXTURE_2D,St,Xt,ut.width,ut.height),O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut.width,ut.height,It,Ht,ut.data)):e.texImage2D(i.TEXTURE_2D,0,Xt,ut.width,ut.height,0,It,Ht,ut.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Jt&&ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Xt,ie[0].width,ie[0].height,ut.depth);for(let Z=0,nt=ie.length;Z<nt;Z++)if(Pt=ie[Z],w.format!==xn)if(It!==null)if(Jt){if(O)if(w.layerUpdates.size>0){let wt=Rl(Pt.width,Pt.height,w.format,w.type);for(let Et of w.layerUpdates){let Yt=Pt.data.subarray(Et*wt/Pt.data.BYTES_PER_ELEMENT,(Et+1)*wt/Pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,Et,Pt.width,Pt.height,1,It,Yt)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Pt.width,Pt.height,ut.depth,It,Pt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,Xt,Pt.width,Pt.height,ut.depth,0,Pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?O&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Pt.width,Pt.height,ut.depth,It,Ht,Pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,Xt,Pt.width,Pt.height,ut.depth,0,It,Ht,Pt.data)}else{Jt&&ae&&e.texStorage2D(i.TEXTURE_2D,St,Xt,ie[0].width,ie[0].height);for(let Z=0,nt=ie.length;Z<nt;Z++)Pt=ie[Z],w.format!==xn?It!==null?Jt?O&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,Pt.width,Pt.height,It,Pt.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,Xt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?O&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Pt.width,Pt.height,It,Ht,Pt.data):e.texImage2D(i.TEXTURE_2D,Z,Xt,Pt.width,Pt.height,0,It,Ht,Pt.data)}else if(w.isDataArrayTexture)if(Jt){if(ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Xt,ut.width,ut.height,ut.depth),O)if(w.layerUpdates.size>0){let Z=Rl(ut.width,ut.height,w.format,w.type);for(let nt of w.layerUpdates){let wt=ut.data.subarray(nt*Z/ut.data.BYTES_PER_ELEMENT,(nt+1)*Z/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,nt,ut.width,ut.height,1,It,Ht,wt)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,It,Ht,ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Xt,ut.width,ut.height,ut.depth,0,It,Ht,ut.data);else if(w.isData3DTexture)Jt?(ae&&e.texStorage3D(i.TEXTURE_3D,St,Xt,ut.width,ut.height,ut.depth),O&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,It,Ht,ut.data)):e.texImage3D(i.TEXTURE_3D,0,Xt,ut.width,ut.height,ut.depth,0,It,Ht,ut.data);else if(w.isFramebufferTexture){if(ae)if(Jt)e.texStorage2D(i.TEXTURE_2D,St,Xt,ut.width,ut.height);else{let Z=ut.width,nt=ut.height;for(let wt=0;wt<St;wt++)e.texImage2D(i.TEXTURE_2D,wt,Xt,Z,nt,0,It,Ht,null),Z>>=1,nt>>=1}}else if(ie.length>0){if(Jt&&ae){let Z=Tt(ie[0]);e.texStorage2D(i.TEXTURE_2D,St,Xt,Z.width,Z.height)}for(let Z=0,nt=ie.length;Z<nt;Z++)Pt=ie[Z],Jt?O&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,It,Ht,Pt):e.texImage2D(i.TEXTURE_2D,Z,Xt,It,Ht,Pt);w.generateMipmaps=!1}else if(Jt){if(ae){let Z=Tt(ut);e.texStorage2D(i.TEXTURE_2D,St,Xt,Z.width,Z.height)}O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,It,Ht,ut)}else e.texImage2D(i.TEXTURE_2D,0,Xt,It,Ht,ut);m(w)&&p(Q),Lt.__version=K.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function et(C,w,G){if(w.image.length!==6)return;let Q=Vt(C,w),st=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+G);let K=n.get(st);if(st.version!==K.__version||Q===!0){e.activeTexture(i.TEXTURE0+G);let Lt=se.getPrimaries(se.workingColorSpace),yt=w.colorSpace===ti?null:se.getPrimaries(w.colorSpace),At=w.colorSpace===ti||Lt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let te=w.isCompressedTexture||w.image[0].isCompressedTexture,ut=w.image[0]&&w.image[0].isDataTexture,It=[];for(let nt=0;nt<6;nt++)!te&&!ut?It[nt]=_(w.image[nt],!0,s.maxCubemapSize):It[nt]=ut?w.image[nt].image:w.image[nt],It[nt]=Ft(w,It[nt]);let Ht=It[0],Xt=r.convert(w.format,w.colorSpace),Pt=r.convert(w.type),ie=v(w.internalFormat,Xt,Pt,w.colorSpace),Jt=w.isVideoTexture!==!0,ae=K.__version===void 0||Q===!0,O=st.dataReady,St=L(w,Ht);ft(i.TEXTURE_CUBE_MAP,w);let Z;if(te){Jt&&ae&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ie,Ht.width,Ht.height);for(let nt=0;nt<6;nt++){Z=It[nt].mipmaps;for(let wt=0;wt<Z.length;wt++){let Et=Z[wt];w.format!==xn?Xt!==null?Jt?O&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt,0,0,Et.width,Et.height,Xt,Et.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt,ie,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt,0,0,Et.width,Et.height,Xt,Pt,Et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt,ie,Et.width,Et.height,0,Xt,Pt,Et.data)}}}else{if(Z=w.mipmaps,Jt&&ae){Z.length>0&&St++;let nt=Tt(It[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ie,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(ut){Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,It[nt].width,It[nt].height,Xt,Pt,It[nt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ie,It[nt].width,It[nt].height,0,Xt,Pt,It[nt].data);for(let wt=0;wt<Z.length;wt++){let Yt=Z[wt].image[nt].image;Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt+1,0,0,Yt.width,Yt.height,Xt,Pt,Yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt+1,ie,Yt.width,Yt.height,0,Xt,Pt,Yt.data)}}else{Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Xt,Pt,It[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ie,Xt,Pt,It[nt]);for(let wt=0;wt<Z.length;wt++){let Et=Z[wt];Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt+1,0,0,Xt,Pt,Et.image[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt+1,ie,Xt,Pt,Et.image[nt])}}}m(w)&&p(i.TEXTURE_CUBE_MAP),K.__version=st.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function Mt(C,w,G,Q,st,K){let Lt=r.convert(G.format,G.colorSpace),yt=r.convert(G.type),At=v(G.internalFormat,Lt,yt,G.colorSpace),te=n.get(w),ut=n.get(G);if(ut.__renderTarget=w,!te.__hasExternalTextures){let It=Math.max(1,w.width>>K),Ht=Math.max(1,w.height>>K);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,K,At,It,Ht,w.depth,0,Lt,yt,null):e.texImage2D(st,K,At,It,Ht,0,Lt,yt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),Ct(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,st,ut.__webglTexture,0,J(w)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,st,ut.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(C,w,G){if(i.bindRenderbuffer(i.RENDERBUFFER,C),w.depthBuffer){let Q=w.depthTexture,st=Q&&Q.isDepthTexture?Q.type:null,K=y(w.stencilBuffer,st),Lt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=J(w);Ct(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt,K,w.width,w.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,K,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,K,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,C)}else{let Q=w.textures;for(let st=0;st<Q.length;st++){let K=Q[st],Lt=r.convert(K.format,K.colorSpace),yt=r.convert(K.type),At=v(K.internalFormat,Lt,yt,K.colorSpace),te=J(w);G&&Ct(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,te,At,w.width,w.height):Ct(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,At,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,At,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(w.depthTexture);Q.__renderTarget=w,(!Q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),$(w.depthTexture,0);let st=Q.__webglTexture,K=J(w);if(w.depthTexture.format===Zi)Ct(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0);else if(w.depthTexture.format===ns)Ct(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function zt(C){let w=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){let Q=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Q){let st=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Q.removeEventListener("dispose",st)};Q.addEventListener("dispose",st),w.__depthDisposeCallback=st}w.__boundDepthTexture=Q}if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Rt(w.__webglFramebuffer,C)}else if(G){w.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[Q]),w.__webglDepthbuffer[Q]===void 0)w.__webglDepthbuffer[Q]=i.createRenderbuffer(),at(w.__webglDepthbuffer[Q],C,!1);else{let st=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=w.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),at(w.__webglDepthbuffer,C,!1);else{let Q=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,st)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(C,w,G){let Q=n.get(C);w!==void 0&&Mt(Q.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&zt(C)}function Zt(C){let w=C.texture,G=n.get(C),Q=n.get(w);C.addEventListener("dispose",A);let st=C.textures,K=C.isWebGLCubeRenderTarget===!0,Lt=st.length>1;if(Lt||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=w.version,o.memory.textures++),K){G.__webglFramebuffer=[];for(let yt=0;yt<6;yt++)if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[yt]=[];for(let At=0;At<w.mipmaps.length;At++)G.__webglFramebuffer[yt][At]=i.createFramebuffer()}else G.__webglFramebuffer[yt]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let yt=0;yt<w.mipmaps.length;yt++)G.__webglFramebuffer[yt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let yt=0,At=st.length;yt<At;yt++){let te=n.get(st[yt]);te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&Ct(C)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let yt=0;yt<st.length;yt++){let At=st[yt];G.__webglColorRenderbuffer[yt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[yt]);let te=r.convert(At.format,At.colorSpace),ut=r.convert(At.type),It=v(At.internalFormat,te,ut,At.colorSpace,C.isXRRenderTarget===!0),Ht=J(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,It,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,G.__webglColorRenderbuffer[yt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),at(G.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),ft(i.TEXTURE_CUBE_MAP,w);for(let yt=0;yt<6;yt++)if(w.mipmaps&&w.mipmaps.length>0)for(let At=0;At<w.mipmaps.length;At++)Mt(G.__webglFramebuffer[yt][At],C,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,At);else Mt(G.__webglFramebuffer[yt],C,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0);m(w)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let yt=0,At=st.length;yt<At;yt++){let te=st[yt],ut=n.get(te);e.bindTexture(i.TEXTURE_2D,ut.__webglTexture),ft(i.TEXTURE_2D,te),Mt(G.__webglFramebuffer,C,te,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,0),m(te)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let yt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(yt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(yt,Q.__webglTexture),ft(yt,w),w.mipmaps&&w.mipmaps.length>0)for(let At=0;At<w.mipmaps.length;At++)Mt(G.__webglFramebuffer[At],C,w,i.COLOR_ATTACHMENT0,yt,At);else Mt(G.__webglFramebuffer,C,w,i.COLOR_ATTACHMENT0,yt,0);m(w)&&p(yt),e.unbindTexture()}C.depthBuffer&&zt(C)}function tt(C){let w=C.textures;for(let G=0,Q=w.length;G<Q;G++){let st=w[G];if(m(st)){let K=M(C),Lt=n.get(st).__webglTexture;e.bindTexture(K,Lt),p(K),e.unbindTexture()}}}let pt=[],P=[];function Ut(C){if(C.samples>0){if(Ct(C)===!1){let w=C.textures,G=C.width,Q=C.height,st=i.COLOR_BUFFER_BIT,K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(C),yt=w.length>1;if(yt)for(let At=0;At<w.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let At=0;At<w.length;At++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),yt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[At]);let te=n.get(w[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,G,Q,0,0,G,Q,st,i.NEAREST),c===!0&&(pt.length=0,P.length=0,pt.push(i.COLOR_ATTACHMENT0+At),C.depthBuffer&&C.resolveDepthBuffer===!1&&(pt.push(K),P.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),yt)for(let At=0;At<w.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[At]);let te=n.get(w[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,te,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let w=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function J(C){return Math.min(s.maxSamples,C.samples)}function Ct(C){let w=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function xt(C){let w=o.render.frame;d.get(C)!==w&&(d.set(C,w),C.update())}function Ft(C,w){let G=C.colorSpace,Q=C.format,st=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==ls&&G!==ti&&(se.getTransfer(G)===fe?(Q!==xn||st!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}function Tt(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=W,this.setTexture2D=$,this.setTexture2DArray=z,this.setTexture3D=j,this.setTextureCube=X,this.rebindTextures=Nt,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=Ct}function dm(i,t){function e(n,s=ti){let r,o=se.getTransfer(s);if(n===Gn)return i.UNSIGNED_BYTE;if(n===fc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ql)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Wl)return i.BYTE;if(n===Xl)return i.SHORT;if(n===Is)return i.UNSIGNED_SHORT;if(n===dc)return i.INT;if(n===bi)return i.UNSIGNED_INT;if(n===zn)return i.FLOAT;if(n===Ws)return i.HALF_FLOAT;if(n===Yl)return i.ALPHA;if(n===$l)return i.RGB;if(n===xn)return i.RGBA;if(n===Zl)return i.LUMINANCE;if(n===Jl)return i.LUMINANCE_ALPHA;if(n===Zi)return i.DEPTH_COMPONENT;if(n===ns)return i.DEPTH_STENCIL;if(n===Kl)return i.RED;if(n===mc)return i.RED_INTEGER;if(n===Ql)return i.RG;if(n===gc)return i.RG_INTEGER;if(n===xc)return i.RGBA_INTEGER;if(n===Mr||n===Sr||n===br||n===wr)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jo||n===ta||n===ea||n===na)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===na)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ia||n===sa||n===ra)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ia||n===sa)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ra)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===oa||n===aa||n===ca||n===la||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===xa||n===_a||n===ya)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===oa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===aa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ca)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===la)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ha)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ua)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===da)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ma)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ga)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_a)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ya)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Er||n===va||n===Ma)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Er)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ma)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jl||n===Sa||n===ba||n===wa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Er)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Sa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var za=class extends ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},lt=class extends He{constructor(){super(),this.isGroup=!0,this.type="Group"}},fm={type:"move"},Es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new lt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new lt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new lt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let d=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(fm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new lt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},pm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Va=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new nn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new An({vertexShader:pm,fragmentShader:mm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Fe(new Ee(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ka=class extends si{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,d=null,u=null,h=null,f=null,g=null,_=new Va,m=e.getContextAttributes(),p=null,M=null,v=[],y=[],L=new mt,T=null,A=new ke;A.viewport=new pe;let R=new ke;R.viewport=new pe;let E=[A,R],S=new za,I=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let et=v[Y];return et===void 0&&(et=new Es,v[Y]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Y){let et=v[Y];return et===void 0&&(et=new Es,v[Y]=et),et.getGripSpace()},this.getHand=function(Y){let et=v[Y];return et===void 0&&(et=new Es,v[Y]=et),et.getHandSpace()};function F(Y){let et=y.indexOf(Y.inputSource);if(et===-1)return;let Mt=v[et];Mt!==void 0&&(Mt.update(Y.inputSource,Y.frame,l||o),Mt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",$);for(let Y=0;Y<v.length;Y++){let et=y[Y];et!==null&&(y[Y]=null,v[Y].disconnect(et))}I=null,W=null,_.reset(),t.setRenderTarget(p),f=null,h=null,u=null,s=null,M=null,Vt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",k),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){let et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Hn(f.framebufferWidth,f.framebufferHeight,{format:xn,type:Gn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let et=null,Mt=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?ns:Zi,Mt=m.stencil?es:bi);let Rt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};u=new XRWebGLBinding(s,e),h=u.createProjectionLayer(Rt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new Hn(h.textureWidth,h.textureHeight,{format:xn,type:Gn,depthTexture:new Or(h.textureWidth,h.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Vt.setContext(s),Vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(Y){for(let et=0;et<Y.removed.length;et++){let Mt=Y.removed[et],at=y.indexOf(Mt);at>=0&&(y[at]=null,v[at].disconnect(Mt))}for(let et=0;et<Y.added.length;et++){let Mt=Y.added[et],at=y.indexOf(Mt);if(at===-1){for(let zt=0;zt<v.length;zt++)if(zt>=y.length){y.push(Mt),at=zt;break}else if(y[zt]===null){y[zt]=Mt,at=zt;break}if(at===-1)break}let Rt=v[at];Rt&&Rt.connect(Mt)}}let z=new D,j=new D;function X(Y,et,Mt){z.setFromMatrixPosition(et.matrixWorld),j.setFromMatrixPosition(Mt.matrixWorld);let at=z.distanceTo(j),Rt=et.projectionMatrix.elements,zt=Mt.projectionMatrix.elements,Nt=Rt[14]/(Rt[10]-1),Zt=Rt[14]/(Rt[10]+1),tt=(Rt[9]+1)/Rt[5],pt=(Rt[9]-1)/Rt[5],P=(Rt[8]-1)/Rt[0],Ut=(zt[8]+1)/zt[0],J=Nt*P,Ct=Nt*Ut,xt=at/(-P+Ut),Ft=xt*-P;if(et.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ft),Y.translateZ(xt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Rt[10]===-1)Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let Tt=Nt+xt,C=Zt+xt,w=J-Ft,G=Ct+(at-Ft),Q=tt*Zt/C*Tt,st=pt*Zt/C*Tt;Y.projectionMatrix.makePerspective(w,G,Q,st,Tt,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ot(Y,et){et===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(et.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let et=Y.near,Mt=Y.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(Mt=_.depthFar)),S.near=R.near=A.near=et,S.far=R.far=A.far=Mt,(I!==S.near||W!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),I=S.near,W=S.far),A.layers.mask=Y.layers.mask|2,R.layers.mask=Y.layers.mask|4,S.layers.mask=A.layers.mask|R.layers.mask;let at=Y.parent,Rt=S.cameras;ot(S,at);for(let zt=0;zt<Rt.length;zt++)ot(Rt[zt],at);Rt.length===2?X(S,A,R):S.projectionMatrix.copy(A.projectionMatrix),ht(Y,S,at)};function ht(Y,et,Mt){Mt===null?Y.matrix.copy(et.matrixWorld):(Y.matrix.copy(Mt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(et.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ps*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(Y){c=Y,h!==null&&(h.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let gt=null;function ft(Y,et){if(d=et.getViewerPose(l||o),g=et,d!==null){let Mt=d.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let at=!1;Mt.length!==S.cameras.length&&(S.cameras.length=0,at=!0);for(let zt=0;zt<Mt.length;zt++){let Nt=Mt[zt],Zt=null;if(f!==null)Zt=f.getViewport(Nt);else{let pt=u.getViewSubImage(h,Nt);Zt=pt.viewport,zt===0&&(t.setRenderTargetTextures(M,pt.colorTexture,h.ignoreDepthValues?void 0:pt.depthStencilTexture),t.setRenderTarget(M))}let tt=E[zt];tt===void 0&&(tt=new ke,tt.layers.enable(zt),tt.viewport=new pe,E[zt]=tt),tt.matrix.fromArray(Nt.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(Nt.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),zt===0&&(S.matrix.copy(tt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),at===!0&&S.cameras.push(tt)}let Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){let zt=u.getDepthInformation(Mt[0]);zt&&zt.isValid&&zt.texture&&_.init(t,zt,s.renderState)}}for(let Mt=0;Mt<v.length;Mt++){let at=y[Mt],Rt=v[Mt];at!==null&&Rt!==void 0&&Rt.update(at,et,l||o)}gt&&gt(Y,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}let Vt=new rh;Vt.setAnimationLoop(ft),this.setAnimationLoop=function(Y){gt=Y},this.dispose=function(){}}},gi=new Tn,gm=new ye;function xm(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,sh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,v,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ge&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ge&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),v=M.envMap,y=M.envMapRotation;v&&(m.envMap.value=v,gi.copy(y),gi.x*=-1,gi.y*=-1,gi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),m.envMapRotation.value.setFromMatrix4(gm.makeRotationFromEuler(gi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ge&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function _m(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,v){let y=v.program;n.uniformBlockBinding(M,y)}function l(M,v){let y=s[M.id];y===void 0&&(g(M),y=d(M),s[M.id]=y,M.addEventListener("dispose",m));let L=v.program;n.updateUBOMapping(M,L);let T=t.render.frame;r[M.id]!==T&&(h(M),r[M.id]=T)}function d(M){let v=u();M.__bindingPointIndex=v;let y=i.createBuffer(),L=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,L,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,y),y}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let v=s[M.id],y=M.uniforms,L=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,A=y.length;T<A;T++){let R=Array.isArray(y[T])?y[T]:[y[T]];for(let E=0,S=R.length;E<S;E++){let I=R[E];if(f(I,T,E,L)===!0){let W=I.__offset,F=Array.isArray(I.value)?I.value:[I.value],k=0;for(let $=0;$<F.length;$++){let z=F[$],j=_(z);typeof z=="number"||typeof z=="boolean"?(I.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,W+k,I.__data)):z.isMatrix3?(I.__data[0]=z.elements[0],I.__data[1]=z.elements[1],I.__data[2]=z.elements[2],I.__data[3]=0,I.__data[4]=z.elements[3],I.__data[5]=z.elements[4],I.__data[6]=z.elements[5],I.__data[7]=0,I.__data[8]=z.elements[6],I.__data[9]=z.elements[7],I.__data[10]=z.elements[8],I.__data[11]=0):(z.toArray(I.__data,k),k+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,v,y,L){let T=M.value,A=v+"_"+y;if(L[A]===void 0)return typeof T=="number"||typeof T=="boolean"?L[A]=T:L[A]=T.clone(),!0;{let R=L[A];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return L[A]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(M){let v=M.uniforms,y=0,L=16;for(let A=0,R=v.length;A<R;A++){let E=Array.isArray(v[A])?v[A]:[v[A]];for(let S=0,I=E.length;S<I;S++){let W=E[S],F=Array.isArray(W.value)?W.value:[W.value];for(let k=0,$=F.length;k<$;k++){let z=F[k],j=_(z),X=y%L,ot=X%j.boundary,ht=X+ot;y+=ot,ht!==0&&L-ht<j.storage&&(y+=L-ht),W.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=y,y+=j.storage}}}let T=y%L;return T>0&&(y+=L-T),M.__size=y,M.__cache={},this}function _(M){let v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){let v=M.target;v.removeEventListener("dispose",m);let y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Br=class{constructor(t={}){let{canvas:e=Mu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ve,this.toneMapping=ni,this.toneMappingExposure=1;let y=this,L=!1,T=0,A=0,R=null,E=-1,S=null,I=new pe,W=new pe,F=null,k=new Wt(0),$=0,z=e.width,j=e.height,X=1,ot=null,ht=null,gt=new pe(0,0,z,j),ft=new pe(0,0,z,j),Vt=!1,Y=new Us,et=!1,Mt=!1,at=new ye,Rt=new ye,zt=new D,Nt=new pe,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},tt=!1;function pt(){return R===null?X:1}let P=n;function Ut(b,U){return e.getContext(b,U)}try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${lc}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",wt,!1),e.addEventListener("webglcontextcreationerror",Et,!1),P===null){let U="webgl2";if(P=Ut(U,b),P===null)throw Ut(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let J,Ct,xt,Ft,Tt,C,w,G,Q,st,K,Lt,yt,At,te,ut,It,Ht,Xt,Pt,ie,Jt,ae,O;function St(){J=new U0(P),J.init(),Jt=new dm(P,J),Ct=new C0(P,J,t,Jt),xt=new lm(P,J),Ct.reverseDepthBuffer&&h&&xt.buffers.depth.setReversed(!0),Ft=new O0(P),Tt=new Jp,C=new um(P,J,xt,Tt,Ct,Jt,Ft),w=new I0(y),G=new D0(y),Q=new Hu(P),ae=new T0(P,Q),st=new N0(P,Q,Ft,ae),K=new z0(P,st,Q,Ft),Xt=new B0(P,Ct,C),ut=new R0(Tt),Lt=new Zp(y,w,G,J,Ct,ae,ut),yt=new xm(y,Tt),At=new Qp,te=new sm(J),Ht=new E0(y,w,G,xt,K,f,c),It=new am(y,K,Ct),O=new _m(P,Ft,Ct,xt),Pt=new A0(P,J,Ft),ie=new F0(P,J,Ft),Ft.programs=Lt.programs,y.capabilities=Ct,y.extensions=J,y.properties=Tt,y.renderLists=At,y.shadowMap=It,y.state=xt,y.info=Ft}St();let Z=new ka(y,P);this.xr=Z,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let b=J.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=J.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(b){b!==void 0&&(X=b,this.setSize(z,j,!1))},this.getSize=function(b){return b.set(z,j)},this.setSize=function(b,U,B=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=b,j=U,e.width=Math.floor(b*X),e.height=Math.floor(U*X),B===!0&&(e.style.width=b+"px",e.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(z*X,j*X).floor()},this.setDrawingBufferSize=function(b,U,B){z=b,j=U,X=B,e.width=Math.floor(b*B),e.height=Math.floor(U*B),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(gt)},this.setViewport=function(b,U,B,H){b.isVector4?gt.set(b.x,b.y,b.z,b.w):gt.set(b,U,B,H),xt.viewport(I.copy(gt).multiplyScalar(X).round())},this.getScissor=function(b){return b.copy(ft)},this.setScissor=function(b,U,B,H){b.isVector4?ft.set(b.x,b.y,b.z,b.w):ft.set(b,U,B,H),xt.scissor(W.copy(ft).multiplyScalar(X).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(b){xt.setScissorTest(Vt=b)},this.setOpaqueSort=function(b){ot=b},this.setTransparentSort=function(b){ht=b},this.getClearColor=function(b){return b.copy(Ht.getClearColor())},this.setClearColor=function(){Ht.setClearColor.apply(Ht,arguments)},this.getClearAlpha=function(){return Ht.getClearAlpha()},this.setClearAlpha=function(){Ht.setClearAlpha.apply(Ht,arguments)},this.clear=function(b=!0,U=!0,B=!0){let H=0;if(b){let N=!1;if(R!==null){let dt=R.texture.format;N=dt===xc||dt===gc||dt===mc}if(N){let dt=R.texture.type,_t=dt===Gn||dt===bi||dt===Is||dt===es||dt===fc||dt===pc,Dt=Ht.getClearColor(),Ot=Ht.getClearAlpha(),qt=Dt.r,Kt=Dt.g,Bt=Dt.b;_t?(g[0]=qt,g[1]=Kt,g[2]=Bt,g[3]=Ot,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=qt,_[1]=Kt,_[2]=Bt,_[3]=Ot,P.clearBufferiv(P.COLOR,0,_))}else H|=P.COLOR_BUFFER_BIT}U&&(H|=P.DEPTH_BUFFER_BIT),B&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",wt,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),At.dispose(),te.dispose(),Tt.dispose(),w.dispose(),G.dispose(),K.dispose(),ae.dispose(),O.dispose(),Lt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Ne),Z.removeEventListener("sessionend",$e),rn.stop()};function nt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;let b=Ft.autoReset,U=It.enabled,B=It.autoUpdate,H=It.needsUpdate,N=It.type;St(),Ft.autoReset=b,It.enabled=U,It.autoUpdate=B,It.needsUpdate=H,It.type=N}function Et(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Yt(b){let U=b.target;U.removeEventListener("dispose",Yt),ve(U)}function ve(b){De(b),Tt.remove(b)}function De(b){let U=Tt.get(b).programs;U!==void 0&&(U.forEach(function(B){Lt.releaseProgram(B)}),b.isShaderMaterial&&Lt.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,B,H,N,dt){U===null&&(U=Zt);let _t=N.isMesh&&N.matrixWorld.determinant()<0,Dt=vt(b,U,B,H,N);xt.setMaterial(H,_t);let Ot=B.index,qt=1;if(H.wireframe===!0){if(Ot=st.getWireframeAttribute(B),Ot===void 0)return;qt=2}let Kt=B.drawRange,Bt=B.attributes.position,re=Kt.start*qt,me=(Kt.start+Kt.count)*qt;dt!==null&&(re=Math.max(re,dt.start*qt),me=Math.min(me,(dt.start+dt.count)*qt)),Ot!==null?(re=Math.max(re,0),me=Math.min(me,Ot.count)):Bt!=null&&(re=Math.max(re,0),me=Math.min(me,Bt.count));let xe=me-re;if(xe<0||xe===1/0)return;ae.setup(N,H,Dt,B,Ot);let Ze,le=Pt;if(Ot!==null&&(Ze=Q.get(Ot),le=ie,le.setIndex(Ze)),N.isMesh)H.wireframe===!0?(xt.setLineWidth(H.wireframeLinewidth*pt()),le.setMode(P.LINES)):le.setMode(P.TRIANGLES);else if(N.isLine){let kt=H.linewidth;kt===void 0&&(kt=1),xt.setLineWidth(kt*pt()),N.isLineSegments?le.setMode(P.LINES):N.isLineLoop?le.setMode(P.LINE_LOOP):le.setMode(P.LINE_STRIP)}else N.isPoints?le.setMode(P.POINTS):N.isSprite&&le.setMode(P.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)le.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))le.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let kt=N._multiDrawStarts,Pn=N._multiDrawCounts,he=N._multiDrawCount,fn=Ot?Q.get(Ot).bytesPerElement:1,Ii=Tt.get(H).currentProgram.getUniforms();for(let Qe=0;Qe<he;Qe++)Ii.setValue(P,"_gl_DrawID",Qe),le.render(kt[Qe]/fn,Pn[Qe])}else if(N.isInstancedMesh)le.renderInstances(re,xe,N.count);else if(B.isInstancedBufferGeometry){let kt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Pn=Math.min(B.instanceCount,kt);le.renderInstances(re,xe,Pn)}else le.render(re,xe)};function ce(b,U,B){b.transparent===!0&&b.side===Ce&&b.forceSinglePass===!1?(b.side=Ge,b.needsUpdate=!0,In(b,U,B),b.side=ii,b.needsUpdate=!0,In(b,U,B),b.side=Ce):In(b,U,B)}this.compile=function(b,U,B=null){B===null&&(B=b),p=te.get(B),p.init(U),v.push(p),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),b!==B&&b.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();let H=new Set;return b.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let dt=N.material;if(dt)if(Array.isArray(dt))for(let _t=0;_t<dt.length;_t++){let Dt=dt[_t];ce(Dt,B,N),H.add(Dt)}else ce(dt,B,N),H.add(dt)}),v.pop(),p=null,H},this.compileAsync=function(b,U,B=null){let H=this.compile(b,U,B);return new Promise(N=>{function dt(){if(H.forEach(function(_t){Tt.get(_t).currentProgram.isReady()&&H.delete(_t)}),H.size===0){N(b);return}setTimeout(dt,10)}J.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let Ke=null;function dn(b){Ke&&Ke(b)}function Ne(){rn.stop()}function $e(){rn.start()}let rn=new rh;rn.setAnimationLoop(dn),typeof self!="undefined"&&rn.setContext(self),this.setAnimationLoop=function(b){Ke=b,Z.setAnimationLoop(b),b===null?rn.stop():rn.start()},Z.addEventListener("sessionstart",Ne),Z.addEventListener("sessionend",$e),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(U),U=Z.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,U,R),p=te.get(b,v.length),p.init(U),v.push(p),Rt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(Rt),Mt=this.localClippingEnabled,et=ut.init(this.clippingPlanes,Mt),m=At.get(b,M.length),m.init(),M.push(m),Z.enabled===!0&&Z.isPresenting===!0){let dt=y.xr.getDepthSensingMesh();dt!==null&&Mn(dt,U,-1/0,y.sortObjects)}Mn(b,U,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ot,ht),tt=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,tt&&Ht.addToRenderList(m,b),this.info.render.frame++,et===!0&&ut.beginShadows();let B=p.state.shadowsArray;It.render(B,b,U),et===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){let dt=U.cameras;if(N.length>0)for(let _t=0,Dt=dt.length;_t<Dt;_t++){let Ot=dt[_t];Rn(H,N,b,Ot)}tt&&Ht.render(b);for(let _t=0,Dt=dt.length;_t<Dt;_t++){let Ot=dt[_t];on(m,b,Ot,Ot.viewport)}}else N.length>0&&Rn(H,N,b,U),tt&&Ht.render(b),on(m,b,U);R!==null&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(y,b,U),ae.resetDefaultState(),E=-1,S=null,v.pop(),v.length>0?(p=v[v.length-1],et===!0&&ut.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Mn(b,U,B,H){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)B=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Y.intersectsSprite(b)){H&&Nt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Rt);let _t=K.update(b),Dt=b.material;Dt.visible&&m.push(b,_t,Dt,B,Nt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Y.intersectsObject(b))){let _t=K.update(b),Dt=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Nt.copy(b.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Nt.copy(_t.boundingSphere.center)),Nt.applyMatrix4(b.matrixWorld).applyMatrix4(Rt)),Array.isArray(Dt)){let Ot=_t.groups;for(let qt=0,Kt=Ot.length;qt<Kt;qt++){let Bt=Ot[qt],re=Dt[Bt.materialIndex];re&&re.visible&&m.push(b,_t,re,B,Nt.z,Bt)}}else Dt.visible&&m.push(b,_t,Dt,B,Nt.z,null)}}let dt=b.children;for(let _t=0,Dt=dt.length;_t<Dt;_t++)Mn(dt[_t],U,B,H)}function on(b,U,B,H){let N=b.opaque,dt=b.transmissive,_t=b.transparent;p.setupLightsView(B),et===!0&&ut.setGlobalState(y.clippingPlanes,B),H&&xt.viewport(I.copy(H)),N.length>0&&hi(N,U,B),dt.length>0&&hi(dt,U,B),_t.length>0&&hi(_t,U,B),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Rn(b,U,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new Hn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?Ws:Gn,minFilter:Si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));let dt=p.state.transmissionRenderTarget[H.id],_t=H.viewport||I;dt.setSize(_t.z,_t.w);let Dt=y.getRenderTarget();y.setRenderTarget(dt),y.getClearColor(k),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),tt&&Ht.render(B);let Ot=y.toneMapping;y.toneMapping=ni;let qt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),et===!0&&ut.setGlobalState(y.clippingPlanes,H),hi(b,B,H),C.updateMultisampleRenderTarget(dt),C.updateRenderTargetMipmap(dt),J.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Bt=0,re=U.length;Bt<re;Bt++){let me=U[Bt],xe=me.object,Ze=me.geometry,le=me.material,kt=me.group;if(le.side===Ce&&xe.layers.test(H.layers)){let Pn=le.side;le.side=Ge,le.needsUpdate=!0,Ys(xe,B,H,Ze,le,kt),le.side=Pn,le.needsUpdate=!0,Kt=!0}}Kt===!0&&(C.updateMultisampleRenderTarget(dt),C.updateRenderTargetMipmap(dt))}y.setRenderTarget(Dt),y.setClearColor(k,$),qt!==void 0&&(H.viewport=qt),y.toneMapping=Ot}function hi(b,U,B){let H=U.isScene===!0?U.overrideMaterial:null;for(let N=0,dt=b.length;N<dt;N++){let _t=b[N],Dt=_t.object,Ot=_t.geometry,qt=H===null?_t.material:H,Kt=_t.group;Dt.layers.test(B.layers)&&Ys(Dt,U,B,Ot,qt,Kt)}}function Ys(b,U,B,H,N,dt){b.onBeforeRender(y,U,B,H,N,dt),b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),N.onBeforeRender(y,U,B,H,b,dt),N.transparent===!0&&N.side===Ce&&N.forceSinglePass===!1?(N.side=Ge,N.needsUpdate=!0,y.renderBufferDirect(B,U,H,N,b,dt),N.side=ii,N.needsUpdate=!0,y.renderBufferDirect(B,U,H,N,b,dt),N.side=Ce):y.renderBufferDirect(B,U,H,N,b,dt),b.onAfterRender(y,U,B,H,N,dt)}function In(b,U,B){U.isScene!==!0&&(U=Zt);let H=Tt.get(b),N=p.state.lights,dt=p.state.shadowsArray,_t=N.state.version,Dt=Lt.getParameters(b,N.state,dt,U,B),Ot=Lt.getProgramCacheKey(Dt),qt=H.programs;H.environment=b.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(b.isMeshStandardMaterial?G:w).get(b.envMap||H.environment),H.envMapRotation=H.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,qt===void 0&&(b.addEventListener("dispose",Yt),qt=new Map,H.programs=qt);let Kt=qt.get(Ot);if(Kt!==void 0){if(H.currentProgram===Kt&&H.lightsStateVersion===_t)return ct(b,Dt),Kt}else Dt.uniforms=Lt.getUniforms(b),b.onBeforeCompile(Dt,y),Kt=Lt.acquireProgram(Dt,Ot),qt.set(Ot,Kt),H.uniforms=Dt.uniforms;let Bt=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Bt.clippingPlanes=ut.uniform),ct(b,Dt),H.needsLights=ee(b),H.lightsStateVersion=_t,H.needsLights&&(Bt.ambientLightColor.value=N.state.ambient,Bt.lightProbe.value=N.state.probe,Bt.directionalLights.value=N.state.directional,Bt.directionalLightShadows.value=N.state.directionalShadow,Bt.spotLights.value=N.state.spot,Bt.spotLightShadows.value=N.state.spotShadow,Bt.rectAreaLights.value=N.state.rectArea,Bt.ltc_1.value=N.state.rectAreaLTC1,Bt.ltc_2.value=N.state.rectAreaLTC2,Bt.pointLights.value=N.state.point,Bt.pointLightShadows.value=N.state.pointShadow,Bt.hemisphereLights.value=N.state.hemi,Bt.directionalShadowMap.value=N.state.directionalShadowMap,Bt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Bt.spotShadowMap.value=N.state.spotShadowMap,Bt.spotLightMatrix.value=N.state.spotLightMatrix,Bt.spotLightMap.value=N.state.spotLightMap,Bt.pointShadowMap.value=N.state.pointShadowMap,Bt.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=Kt,H.uniformsList=null,Kt}function rt(b){if(b.uniformsList===null){let U=b.currentProgram.getUniforms();b.uniformsList=Ki.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function ct(b,U){let B=Tt.get(b);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function vt(b,U,B,H,N){U.isScene!==!0&&(U=Zt),C.resetTextureUnits();let dt=U.fog,_t=H.isMeshStandardMaterial?U.environment:null,Dt=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ls,Ot=(H.isMeshStandardMaterial?G:w).get(H.envMap||_t),qt=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Kt=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Bt=!!B.morphAttributes.position,re=!!B.morphAttributes.normal,me=!!B.morphAttributes.color,xe=ni;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(xe=y.toneMapping);let Ze=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,le=Ze!==void 0?Ze.length:0,kt=Tt.get(H),Pn=p.state.lights;if(et===!0&&(Mt===!0||b!==S)){let an=b===S&&H.id===E;ut.setState(H,b,an)}let he=!1;H.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==Pn.state.version||kt.outputColorSpace!==Dt||N.isBatchedMesh&&kt.batching===!1||!N.isBatchedMesh&&kt.batching===!0||N.isBatchedMesh&&kt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&kt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&kt.instancing===!1||!N.isInstancedMesh&&kt.instancing===!0||N.isSkinnedMesh&&kt.skinning===!1||!N.isSkinnedMesh&&kt.skinning===!0||N.isInstancedMesh&&kt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&kt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&kt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&kt.instancingMorph===!1&&N.morphTexture!==null||kt.envMap!==Ot||H.fog===!0&&kt.fog!==dt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==ut.numPlanes||kt.numIntersection!==ut.numIntersection)||kt.vertexAlphas!==qt||kt.vertexTangents!==Kt||kt.morphTargets!==Bt||kt.morphNormals!==re||kt.morphColors!==me||kt.toneMapping!==xe||kt.morphTargetsCount!==le)&&(he=!0):(he=!0,kt.__version=H.version);let fn=kt.currentProgram;he===!0&&(fn=In(H,U,N));let Ii=!1,Qe=!1,ps=!1,_e=fn.getUniforms(),Sn=kt.uniforms;if(xt.useProgram(fn.program)&&(Ii=!0,Qe=!0,ps=!0),H.id!==E&&(E=H.id,Qe=!0),Ii||S!==b){xt.buffers.depth.getReversed()?(at.copy(b.projectionMatrix),bu(at),wu(at),_e.setValue(P,"projectionMatrix",at)):_e.setValue(P,"projectionMatrix",b.projectionMatrix),_e.setValue(P,"viewMatrix",b.matrixWorldInverse);let qn=_e.map.cameraPosition;qn!==void 0&&qn.setValue(P,zt.setFromMatrixPosition(b.matrixWorld)),Ct.logarithmicDepthBuffer&&_e.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&_e.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,Qe=!0,ps=!0)}if(N.isSkinnedMesh){_e.setOptional(P,N,"bindMatrix"),_e.setOptional(P,N,"bindMatrixInverse");let an=N.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),_e.setValue(P,"boneTexture",an.boneTexture,C))}N.isBatchedMesh&&(_e.setOptional(P,N,"batchingTexture"),_e.setValue(P,"batchingTexture",N._matricesTexture,C),_e.setOptional(P,N,"batchingIdTexture"),_e.setValue(P,"batchingIdTexture",N._indirectTexture,C),_e.setOptional(P,N,"batchingColorTexture"),N._colorsTexture!==null&&_e.setValue(P,"batchingColorTexture",N._colorsTexture,C));let ms=B.morphAttributes;if((ms.position!==void 0||ms.normal!==void 0||ms.color!==void 0)&&Xt.update(N,B,fn),(Qe||kt.receiveShadow!==N.receiveShadow)&&(kt.receiveShadow=N.receiveShadow,_e.setValue(P,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Sn.envMap.value=Ot,Sn.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(Sn.envMapIntensity.value=U.environmentIntensity),Qe&&(_e.setValue(P,"toneMappingExposure",y.toneMappingExposure),kt.needsLights&&$t(Sn,ps),dt&&H.fog===!0&&yt.refreshFogUniforms(Sn,dt),yt.refreshMaterialUniforms(Sn,H,X,j,p.state.transmissionRenderTarget[b.id]),Ki.upload(P,rt(kt),Sn,C)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ki.upload(P,rt(kt),Sn,C),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&_e.setValue(P,"center",N.center),_e.setValue(P,"modelViewMatrix",N.modelViewMatrix),_e.setValue(P,"normalMatrix",N.normalMatrix),_e.setValue(P,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let an=H.uniformsGroups;for(let qn=0,Yn=an.length;qn<Yn;qn++){let Cc=an[qn];O.update(Cc,fn),O.bind(Cc,fn)}}return fn}function $t(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function ee(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,U,B){Tt.get(b.texture).__webglTexture=U,Tt.get(b.depthTexture).__webglTexture=B;let H=Tt.get(b);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,U){let B=Tt.get(b);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,B=0){R=b,T=U,A=B;let H=!0,N=null,dt=!1,_t=!1;if(b){let Ot=Tt.get(b);if(Ot.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(P.FRAMEBUFFER,null),H=!1;else if(Ot.__webglFramebuffer===void 0)C.setupRenderTarget(b);else if(Ot.__hasExternalTextures)C.rebindTextures(b,Tt.get(b.texture).__webglTexture,Tt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Bt=b.depthTexture;if(Ot.__boundDepthTexture!==Bt){if(Bt!==null&&Tt.has(Bt)&&(b.width!==Bt.image.width||b.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(b)}}let qt=b.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(_t=!0);let Kt=Tt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Kt[U])?N=Kt[U][B]:N=Kt[U],dt=!0):b.samples>0&&C.useMultisampledRTT(b)===!1?N=Tt.get(b).__webglMultisampledFramebuffer:Array.isArray(Kt)?N=Kt[B]:N=Kt,I.copy(b.viewport),W.copy(b.scissor),F=b.scissorTest}else I.copy(gt).multiplyScalar(X).floor(),W.copy(ft).multiplyScalar(X).floor(),F=Vt;if(xt.bindFramebuffer(P.FRAMEBUFFER,N)&&H&&xt.drawBuffers(b,N),xt.viewport(I),xt.scissor(W),xt.setScissorTest(F),dt){let Ot=Tt.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ot.__webglTexture,B)}else if(_t){let Ot=Tt.get(b.texture),qt=U||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ot.__webglTexture,B||0,qt)}E=-1},this.readRenderTargetPixels=function(b,U,B,H,N,dt,_t){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=Tt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(Dt=Dt[_t]),Dt){xt.bindFramebuffer(P.FRAMEBUFFER,Dt);try{let Ot=b.texture,qt=Ot.format,Kt=Ot.type;if(!Ct.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-H&&B>=0&&B<=b.height-N&&P.readPixels(U,B,H,N,Jt.convert(qt),Jt.convert(Kt),dt)}finally{let Ot=R!==null?Tt.get(R).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(b,U,B,H,N,dt,_t){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=Tt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(Dt=Dt[_t]),Dt){let Ot=b.texture,qt=Ot.format,Kt=Ot.type;if(!Ct.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=b.width-H&&B>=0&&B<=b.height-N){xt.bindFramebuffer(P.FRAMEBUFFER,Dt);let Bt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Bt),P.bufferData(P.PIXEL_PACK_BUFFER,dt.byteLength,P.STREAM_READ),P.readPixels(U,B,H,N,Jt.convert(qt),Jt.convert(Kt),0);let re=R!==null?Tt.get(R).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,re);let me=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Su(P,me,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Bt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,dt),P.deleteBuffer(Bt),P.deleteSync(me),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,U=null,B=0){b.isTexture!==!0&&(Ms("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,b=arguments[1]);let H=Math.pow(2,-B),N=Math.floor(b.image.width*H),dt=Math.floor(b.image.height*H),_t=U!==null?U.x:0,Dt=U!==null?U.y:0;C.setTexture2D(b,0),P.copyTexSubImage2D(P.TEXTURE_2D,B,0,0,_t,Dt,N,dt),xt.unbindTexture()},this.copyTextureToTexture=function(b,U,B=null,H=null,N=0){b.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1],U=arguments[2],N=arguments[3]||0,B=null);let dt,_t,Dt,Ot,qt,Kt,Bt,re,me,xe=b.isCompressedTexture?b.mipmaps[N]:b.image;B!==null?(dt=B.max.x-B.min.x,_t=B.max.y-B.min.y,Dt=B.isBox3?B.max.z-B.min.z:1,Ot=B.min.x,qt=B.min.y,Kt=B.isBox3?B.min.z:0):(dt=xe.width,_t=xe.height,Dt=xe.depth||1,Ot=0,qt=0,Kt=0),H!==null?(Bt=H.x,re=H.y,me=H.z):(Bt=0,re=0,me=0);let Ze=Jt.convert(U.format),le=Jt.convert(U.type),kt;U.isData3DTexture?(C.setTexture3D(U,0),kt=P.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(C.setTexture2DArray(U,0),kt=P.TEXTURE_2D_ARRAY):(C.setTexture2D(U,0),kt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,U.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,U.unpackAlignment);let Pn=P.getParameter(P.UNPACK_ROW_LENGTH),he=P.getParameter(P.UNPACK_IMAGE_HEIGHT),fn=P.getParameter(P.UNPACK_SKIP_PIXELS),Ii=P.getParameter(P.UNPACK_SKIP_ROWS),Qe=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,xe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,xe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ot),P.pixelStorei(P.UNPACK_SKIP_ROWS,qt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Kt);let ps=b.isDataArrayTexture||b.isData3DTexture,_e=U.isDataArrayTexture||U.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){let Sn=Tt.get(b),ms=Tt.get(U),an=Tt.get(Sn.__renderTarget),qn=Tt.get(ms.__renderTarget);xt.bindFramebuffer(P.READ_FRAMEBUFFER,an.__webglFramebuffer),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,qn.__webglFramebuffer);for(let Yn=0;Yn<Dt;Yn++)ps&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tt.get(b).__webglTexture,N,Kt+Yn),b.isDepthTexture?(_e&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tt.get(U).__webglTexture,N,me+Yn),P.blitFramebuffer(Ot,qt,dt,_t,Bt,re,dt,_t,P.DEPTH_BUFFER_BIT,P.NEAREST)):_e?P.copyTexSubImage3D(kt,N,Bt,re,me+Yn,Ot,qt,dt,_t):P.copyTexSubImage2D(kt,N,Bt,re,me+Yn,Ot,qt,dt,_t);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else _e?b.isDataTexture||b.isData3DTexture?P.texSubImage3D(kt,N,Bt,re,me,dt,_t,Dt,Ze,le,xe.data):U.isCompressedArrayTexture?P.compressedTexSubImage3D(kt,N,Bt,re,me,dt,_t,Dt,Ze,xe.data):P.texSubImage3D(kt,N,Bt,re,me,dt,_t,Dt,Ze,le,xe):b.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,N,Bt,re,dt,_t,Ze,le,xe.data):b.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,N,Bt,re,xe.width,xe.height,Ze,xe.data):P.texSubImage2D(P.TEXTURE_2D,N,Bt,re,dt,_t,Ze,le,xe);P.pixelStorei(P.UNPACK_ROW_LENGTH,Pn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,he),P.pixelStorei(P.UNPACK_SKIP_PIXELS,fn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ii),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Qe),N===0&&U.generateMipmaps&&P.generateMipmap(kt),xt.unbindTexture()},this.copyTextureToTexture3D=function(b,U,B=null,H=null,N=0){return b.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,H=arguments[1]||null,b=arguments[2],U=arguments[3],N=arguments[4]||0),Ms('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,U,B,H,N)},this.initRenderTarget=function(b){Tt.get(b).__webglFramebuffer===void 0&&C.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),xt.unbindTexture()},this.resetState=function(){T=0,A=0,R=null,xt.reset(),ae.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}},zr=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Wt(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Vr=class extends He{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Ns=class extends oi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Il=new ye,Ga=new Ls,mr=new is,gr=new D,kr=class extends He{constructor(t=new Oe,e=new Ns){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(s),mr.radius+=r,t.ray.intersectsSphere(mr)===!1)return;Il.copy(s).invert(),Ga.copy(t.ray).applyMatrix4(Il);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let h=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=h,_=f;g<_;g++){let m=l.getX(g);gr.fromBufferAttribute(u,m),Pl(gr,m,c,s,t,e,this)}}else{let h=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=h,_=f;g<_;g++)gr.fromBufferAttribute(u,g),Pl(gr,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Pl(i,t,e,n,s,r,o){let a=Ga.distanceSqToPoint(i);if(a<e){let c=new D;Ga.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Fs=class extends nn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},ln=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let d=n[s],h=n[s+1]-d,f=(o-d)/h;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new mt:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new D,s=[],r=[],o=[],a=new D,c=new ye;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new D)}r[0]=new D,o[0]=new D;let l=Number.MAX_VALUE,d=Math.abs(s[0].x),u=Math.abs(s[0].y),h=Math.abs(s[0].z);d<=l&&(l=d,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),h<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Ae(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ae(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Os=class extends ln{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new mt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=c-this.aX,f=l-this.aY;c=h*d-f*u+this.aX,l=h*u+f*d+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ha=class extends Os{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function vc(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,d,u){let h=(o-r)/l-(a-r)/(l+d)+(a-o)/d,f=(a-o)/d-(c-o)/(d+u)+(c-a)/u;h*=d,f*=d,s(o,a,h,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var xr=new D,Oo=new vc,Bo=new vc,zo=new vc,Bs=class extends ln{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,d;this.closed||a>0?l=s[(a-1)%r]:(xr.subVectors(s[0],s[1]).add(s[0]),l=xr);let u=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(xr.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=xr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(d),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Oo.initNonuniformCatmullRom(l.x,u.x,h.x,d.x,g,_,m),Bo.initNonuniformCatmullRom(l.y,u.y,h.y,d.y,g,_,m),zo.initNonuniformCatmullRom(l.z,u.z,h.z,d.z,g,_,m)}else this.curveType==="catmullrom"&&(Oo.initCatmullRom(l.x,u.x,h.x,d.x,this.tension),Bo.initCatmullRom(l.y,u.y,h.y,d.y,this.tension),zo.initCatmullRom(l.z,u.z,h.z,d.z,this.tension));return n.set(Oo.calc(c),Bo.calc(c),zo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Ll(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function ym(i,t){let e=1-i;return e*e*t}function vm(i,t){return 2*(1-i)*i*t}function Mm(i,t){return i*i*t}function Ts(i,t,e,n){return ym(i,t)+vm(i,e)+Mm(i,n)}function Sm(i,t){let e=1-i;return e*e*e*t}function bm(i,t){let e=1-i;return 3*e*e*i*t}function wm(i,t){return 3*(1-i)*i*i*t}function Em(i,t){return i*i*i*t}function As(i,t,e,n,s){return Sm(i,t)+bm(i,e)+wm(i,n)+Em(i,s)}var Gr=class extends ln{constructor(t=new mt,e=new mt,n=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new mt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(As(t,s.x,r.x,o.x,a.x),As(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Wa=class extends ln{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(As(t,s.x,r.x,o.x,a.x),As(t,s.y,r.y,o.y,a.y),As(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Hr=class extends ln{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xa=class extends ln{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wr=class extends ln{constructor(t=new mt,e=new mt,n=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new mt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ts(t,s.x,r.x,o.x),Ts(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xr=class extends ln{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ts(t,s.x,r.x,o.x),Ts(t,s.y,r.y,o.y),Ts(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},qr=class extends ln{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],d=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Ll(a,c.x,l.x,d.x,u.x),Ll(a,c.y,l.y,d.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new mt().fromArray(s))}return this}},Yr=Object.freeze({__proto__:null,ArcCurve:Ha,CatmullRomCurve3:Bs,CubicBezierCurve:Gr,CubicBezierCurve3:Wa,EllipseCurve:Os,LineCurve:Hr,LineCurve3:Xa,QuadraticBezierCurve:Wr,QuadraticBezierCurve3:Xr,SplineCurve:qr}),qa=class extends ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Yr[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let d=c[l];n&&n.equals(d)||(e.push(d),n=d)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Yr[s.type]().fromJSON(s))}return this}},zs=class extends qa{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Hr(this.currentPoint.clone(),new mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Wr(this.currentPoint.clone(),new mt(t,e),new mt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Gr(this.currentPoint.clone(),new mt(t,e),new mt(n,s),new mt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new qr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(t+l,e+d,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Os(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let d=l.getPoint(1);return this.currentPoint.copy(d),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Vs=class i extends Oe{constructor(t=[new mt(0,-.5),new mt(.5,0),new mt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ae(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],d=1/e,u=new D,h=new mt,f=new D,g=new D,_=new D,m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let M=0;M<=e;M++){let v=n+M*d*s,y=Math.sin(v),L=Math.cos(v);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*y,u.y=t[T].y,u.z=t[T].x*L,o.push(u.x,u.y,u.z),h.x=M/e,h.y=T/(t.length-1),a.push(h.x,h.y);let A=c[3*T+0]*y,R=c[3*T+1],E=c[3*T+0]*L;l.push(A,R,E)}}for(let M=0;M<e;M++)for(let v=0;v<t.length-1;v++){let y=v+M*t.length,L=y,T=y+t.length,A=y+t.length+1,R=y+1;r.push(L,T,R),r.push(A,R,T)}this.setIndex(r),this.setAttribute("position",new ue(o,3)),this.setAttribute("uv",new ue(a,2)),this.setAttribute("normal",new ue(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},rs=class i extends Vs{constructor(t=1,e=1,n=4,s=8){let r=new zs;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}};var q=class i extends Oe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let d=[],u=[],h=[],f=[],g=0,_=[],m=n/2,p=0;M(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(d),this.setAttribute("position",new ue(u,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(f,2));function M(){let y=new D,L=new D,T=0,A=(e-t)/n;for(let R=0;R<=r;R++){let E=[],S=R/r,I=S*(e-t)+t;for(let W=0;W<=s;W++){let F=W/s,k=F*c+a,$=Math.sin(k),z=Math.cos(k);L.x=I*$,L.y=-S*n+m,L.z=I*z,u.push(L.x,L.y,L.z),y.set($,A,z).normalize(),h.push(y.x,y.y,y.z),f.push(F,1-S),E.push(g++)}_.push(E)}for(let R=0;R<s;R++)for(let E=0;E<r;E++){let S=_[E][R],I=_[E+1][R],W=_[E+1][R+1],F=_[E][R+1];(t>0||E!==0)&&(d.push(S,I,F),T+=3),(e>0||E!==r-1)&&(d.push(I,W,F),T+=3)}l.addGroup(p,T,0),p+=T}function v(y){let L=g,T=new mt,A=new D,R=0,E=y===!0?t:e,S=y===!0?1:-1;for(let W=1;W<=s;W++)u.push(0,m*S,0),h.push(0,S,0),f.push(.5,.5),g++;let I=g;for(let W=0;W<=s;W++){let k=W/s*c+a,$=Math.cos(k),z=Math.sin(k);A.x=E*z,A.y=m*S,A.z=E*$,u.push(A.x,A.y,A.z),h.push(0,S,0),T.x=$*.5+.5,T.y=z*.5*S+.5,f.push(T.x,T.y),g++}for(let W=0;W<s;W++){let F=L+W,k=I+W;y===!0?d.push(k,k+1,F):d.push(k+1,k,F),R+=3}l.addGroup(p,R,y===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},We=class i extends q{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ya=class i extends Oe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),d(),this.setAttribute("position",new ue(r,3)),this.setAttribute("normal",new ue(r.slice(),3)),this.setAttribute("uv",new ue(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let v=new D,y=new D,L=new D;for(let T=0;T<e.length;T+=3)f(e[T+0],v),f(e[T+1],y),f(e[T+2],L),c(v,y,L,M)}function c(M,v,y,L){let T=L+1,A=[];for(let R=0;R<=T;R++){A[R]=[];let E=M.clone().lerp(y,R/T),S=v.clone().lerp(y,R/T),I=T-R;for(let W=0;W<=I;W++)W===0&&R===T?A[R][W]=E:A[R][W]=E.clone().lerp(S,W/I)}for(let R=0;R<T;R++)for(let E=0;E<2*(T-R)-1;E++){let S=Math.floor(E/2);E%2===0?(h(A[R][S+1]),h(A[R+1][S]),h(A[R][S])):(h(A[R][S+1]),h(A[R+1][S+1]),h(A[R+1][S]))}}function l(M){let v=new D;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(M),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function d(){let M=new D;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];let y=m(M)/2/Math.PI+.5,L=p(M)/Math.PI+.5;o.push(y,1-L)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){let v=o[M+0],y=o[M+2],L=o[M+4],T=Math.max(v,y,L),A=Math.min(v,y,L);T>.9&&A<.1&&(v<.2&&(o[M+0]+=1),y<.2&&(o[M+2]+=1),L<.2&&(o[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function f(M,v){let y=M*3;v.x=t[y+0],v.y=t[y+1],v.z=t[y+2]}function g(){let M=new D,v=new D,y=new D,L=new D,T=new mt,A=new mt,R=new mt;for(let E=0,S=0;E<r.length;E+=9,S+=6){M.set(r[E+0],r[E+1],r[E+2]),v.set(r[E+3],r[E+4],r[E+5]),y.set(r[E+6],r[E+7],r[E+8]),T.set(o[S+0],o[S+1]),A.set(o[S+2],o[S+3]),R.set(o[S+4],o[S+5]),L.copy(M).add(v).add(y).divideScalar(3);let I=m(L);_(T,S+0,M,I),_(A,S+2,v,I),_(R,S+4,y,I)}}function _(M,v,y,L){L<0&&M.x===1&&(o[v]=M.x-1),y.x===0&&y.z===0&&(o[v]=L/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Wn=class extends zs{constructor(t){super(t),this.uuid=Ai(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new zs().fromJSON(s))}return this}},Tm={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=hh(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,d,u,h,f;if(n&&(r=Pm(i,t,r,e)),i.length>80*e){a=l=i[0],c=d=i[1];for(let g=e;g<s;g+=e)u=i[g],h=i[g+1],u<a&&(a=u),h<c&&(c=h),u>l&&(l=u),h>d&&(d=h);f=Math.max(l-a,d-c),f=f!==0?32767/f:0}return ks(r,o,e,a,c,f,0),o}};function hh(i,t,e,n,s){let r,o;if(s===Gm(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Dl(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Dl(r,i[r],i[r+1],o);return o&&so(o,o.next)&&(Hs(o),o=o.next),o}function wi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(so(e,e.next)||Se(e.prev,e,e.next)===0)){if(Hs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ks(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Fm(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Cm(i,n,s,r):Am(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Hs(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Rm(wi(i),t,e),ks(i,t,e,n,s,r,2)):o===2&&Im(i,t,e,n,s,r):ks(wi(i),t,e,n,s,r,1);break}}}function Am(i){let t=i.prev,e=i,n=i.next;if(Se(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,d=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,h=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==t;){if(g.x>=d&&g.x<=h&&g.y>=u&&g.y<=f&&Yi(s,a,r,c,o,l,g.x,g.y)&&Se(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Cm(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Se(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,d=s.y,u=r.y,h=o.y,f=a<c?a<l?a:l:c<l?c:l,g=d<u?d<h?d:h:u<h?u:h,_=a>c?a>l?a:l:c>l?c:l,m=d>u?d>h?d:h:u>h?u:h,p=$a(f,g,t,e,n),M=$a(_,m,t,e,n),v=i.prevZ,y=i.nextZ;for(;v&&v.z>=p&&y&&y.z<=M;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Yi(a,d,c,u,l,h,v.x,v.y)&&Se(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Yi(a,d,c,u,l,h,y.x,y.y)&&Se(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Yi(a,d,c,u,l,h,v.x,v.y)&&Se(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=M;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Yi(a,d,c,u,l,h,y.x,y.y)&&Se(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Rm(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!so(s,r)&&uh(s,n,n.next,r)&&Gs(s,r)&&Gs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Hs(n),Hs(n.next),n=i=r),n=n.next}while(n!==i);return wi(n)}function Im(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&zm(o,a)){let c=dh(o,a);o=wi(o,o.next),c=wi(c,c.next),ks(o,t,e,n,s,r,0),ks(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Pm(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=hh(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Bm(l));for(s.sort(Lm),r=0;r<s.length;r++)e=Dm(s[r],e);return e}function Lm(i,t){return i.x-t.x}function Dm(i,t){let e=Um(i,t);if(!e)return t;let n=dh(e,i);return wi(n,n.next),wi(e,e.next)}function Um(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let h=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=r&&h>n&&(n=h,s=e.x<e.next.x?e:e.next,h===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,d=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Yi(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Gs(e,i)&&(u<d||u===d&&(e.x>s.x||e.x===s.x&&Nm(s,e)))&&(s=e,d=u)),e=e.next;while(e!==a);return s}function Nm(i,t){return Se(i.prev,i,t.prev)<0&&Se(t.next,i,i.next)<0}function Fm(i,t,e,n){let s=i;do s.z===0&&(s.z=$a(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Om(s)}function Om(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function $a(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Bm(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Yi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function zm(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Vm(i,t)&&(Gs(i,t)&&Gs(t,i)&&km(i,t)&&(Se(i.prev,i,t.prev)||Se(i,t.prev,t))||so(i,t)&&Se(i.prev,i,i.next)>0&&Se(t.prev,t,t.next)>0)}function Se(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function so(i,t){return i.x===t.x&&i.y===t.y}function uh(i,t,e,n){let s=yr(Se(i,t,e)),r=yr(Se(i,t,n)),o=yr(Se(e,n,i)),a=yr(Se(e,n,t));return!!(s!==r&&o!==a||s===0&&_r(i,e,t)||r===0&&_r(i,n,t)||o===0&&_r(e,i,n)||a===0&&_r(e,t,n))}function _r(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function yr(i){return i>0?1:i<0?-1:0}function Vm(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&uh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Gs(i,t){return Se(i.prev,i,i.next)<0?Se(i,t,i.next)>=0&&Se(i,i.prev,t)>=0:Se(i,t,i.prev)<0||Se(i,i.next,t)<0}function km(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function dh(i,t){let e=new Za(i.i,i.x,i.y),n=new Za(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Dl(i,t,e,n){let s=new Za(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Hs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Za(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Gm(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Cs=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Ul(t),Nl(n,t);let o=t.length;e.forEach(Ul);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Nl(n,e[c]);let a=Tm.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Ul(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Nl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ci=class i extends Oe{constructor(t=new Wn([new mt(.5,.5),new mt(-.5,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new ue(s,3)),this.setAttribute("uv",new ue(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,d=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:Hm,v,y=!1,L,T,A,R;p&&(v=p.getSpacedPoints(d),y=!0,h=!1,L=p.computeFrenetFrames(d,!1),T=new D,A=new D,R=new D),h||(m=0,f=0,g=0,_=0);let E=a.extractPoints(l),S=E.shape,I=E.holes;if(!Cs.isClockWise(S)){S=S.reverse();for(let tt=0,pt=I.length;tt<pt;tt++){let P=I[tt];Cs.isClockWise(P)&&(I[tt]=P.reverse())}}let F=Cs.triangulateShape(S,I),k=S;for(let tt=0,pt=I.length;tt<pt;tt++){let P=I[tt];S=S.concat(P)}function $(tt,pt,P){return pt||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(pt,P)}let z=S.length,j=F.length;function X(tt,pt,P){let Ut,J,Ct,xt=tt.x-pt.x,Ft=tt.y-pt.y,Tt=P.x-tt.x,C=P.y-tt.y,w=xt*xt+Ft*Ft,G=xt*C-Ft*Tt;if(Math.abs(G)>Number.EPSILON){let Q=Math.sqrt(w),st=Math.sqrt(Tt*Tt+C*C),K=pt.x-Ft/Q,Lt=pt.y+xt/Q,yt=P.x-C/st,At=P.y+Tt/st,te=((yt-K)*C-(At-Lt)*Tt)/(xt*C-Ft*Tt);Ut=K+xt*te-tt.x,J=Lt+Ft*te-tt.y;let ut=Ut*Ut+J*J;if(ut<=2)return new mt(Ut,J);Ct=Math.sqrt(ut/2)}else{let Q=!1;xt>Number.EPSILON?Tt>Number.EPSILON&&(Q=!0):xt<-Number.EPSILON?Tt<-Number.EPSILON&&(Q=!0):Math.sign(Ft)===Math.sign(C)&&(Q=!0),Q?(Ut=-Ft,J=xt,Ct=Math.sqrt(w)):(Ut=xt,J=Ft,Ct=Math.sqrt(w/2))}return new mt(Ut/Ct,J/Ct)}let ot=[];for(let tt=0,pt=k.length,P=pt-1,Ut=tt+1;tt<pt;tt++,P++,Ut++)P===pt&&(P=0),Ut===pt&&(Ut=0),ot[tt]=X(k[tt],k[P],k[Ut]);let ht=[],gt,ft=ot.concat();for(let tt=0,pt=I.length;tt<pt;tt++){let P=I[tt];gt=[];for(let Ut=0,J=P.length,Ct=J-1,xt=Ut+1;Ut<J;Ut++,Ct++,xt++)Ct===J&&(Ct=0),xt===J&&(xt=0),gt[Ut]=X(P[Ut],P[Ct],P[xt]);ht.push(gt),ft=ft.concat(gt)}for(let tt=0;tt<m;tt++){let pt=tt/m,P=f*Math.cos(pt*Math.PI/2),Ut=g*Math.sin(pt*Math.PI/2)+_;for(let J=0,Ct=k.length;J<Ct;J++){let xt=$(k[J],ot[J],Ut);at(xt.x,xt.y,-P)}for(let J=0,Ct=I.length;J<Ct;J++){let xt=I[J];gt=ht[J];for(let Ft=0,Tt=xt.length;Ft<Tt;Ft++){let C=$(xt[Ft],gt[Ft],Ut);at(C.x,C.y,-P)}}}let Vt=g+_;for(let tt=0;tt<z;tt++){let pt=h?$(S[tt],ft[tt],Vt):S[tt];y?(A.copy(L.normals[0]).multiplyScalar(pt.x),T.copy(L.binormals[0]).multiplyScalar(pt.y),R.copy(v[0]).add(A).add(T),at(R.x,R.y,R.z)):at(pt.x,pt.y,0)}for(let tt=1;tt<=d;tt++)for(let pt=0;pt<z;pt++){let P=h?$(S[pt],ft[pt],Vt):S[pt];y?(A.copy(L.normals[tt]).multiplyScalar(P.x),T.copy(L.binormals[tt]).multiplyScalar(P.y),R.copy(v[tt]).add(A).add(T),at(R.x,R.y,R.z)):at(P.x,P.y,u/d*tt)}for(let tt=m-1;tt>=0;tt--){let pt=tt/m,P=f*Math.cos(pt*Math.PI/2),Ut=g*Math.sin(pt*Math.PI/2)+_;for(let J=0,Ct=k.length;J<Ct;J++){let xt=$(k[J],ot[J],Ut);at(xt.x,xt.y,u+P)}for(let J=0,Ct=I.length;J<Ct;J++){let xt=I[J];gt=ht[J];for(let Ft=0,Tt=xt.length;Ft<Tt;Ft++){let C=$(xt[Ft],gt[Ft],Ut);y?at(C.x,C.y+v[d-1].y,v[d-1].x+P):at(C.x,C.y,u+P)}}}Y(),et();function Y(){let tt=s.length/3;if(h){let pt=0,P=z*pt;for(let Ut=0;Ut<j;Ut++){let J=F[Ut];Rt(J[2]+P,J[1]+P,J[0]+P)}pt=d+m*2,P=z*pt;for(let Ut=0;Ut<j;Ut++){let J=F[Ut];Rt(J[0]+P,J[1]+P,J[2]+P)}}else{for(let pt=0;pt<j;pt++){let P=F[pt];Rt(P[2],P[1],P[0])}for(let pt=0;pt<j;pt++){let P=F[pt];Rt(P[0]+z*d,P[1]+z*d,P[2]+z*d)}}n.addGroup(tt,s.length/3-tt,0)}function et(){let tt=s.length/3,pt=0;Mt(k,pt),pt+=k.length;for(let P=0,Ut=I.length;P<Ut;P++){let J=I[P];Mt(J,pt),pt+=J.length}n.addGroup(tt,s.length/3-tt,1)}function Mt(tt,pt){let P=tt.length;for(;--P>=0;){let Ut=P,J=P-1;J<0&&(J=tt.length-1);for(let Ct=0,xt=d+m*2;Ct<xt;Ct++){let Ft=z*Ct,Tt=z*(Ct+1),C=pt+Ut+Ft,w=pt+J+Ft,G=pt+J+Tt,Q=pt+Ut+Tt;zt(C,w,G,Q)}}}function at(tt,pt,P){c.push(tt),c.push(pt),c.push(P)}function Rt(tt,pt,P){Nt(tt),Nt(pt),Nt(P);let Ut=s.length/3,J=M.generateTopUV(n,s,Ut-3,Ut-2,Ut-1);Zt(J[0]),Zt(J[1]),Zt(J[2])}function zt(tt,pt,P,Ut){Nt(tt),Nt(pt),Nt(Ut),Nt(pt),Nt(P),Nt(Ut);let J=s.length/3,Ct=M.generateSideWallUV(n,s,J-6,J-3,J-2,J-1);Zt(Ct[0]),Zt(Ct[1]),Zt(Ct[3]),Zt(Ct[1]),Zt(Ct[2]),Zt(Ct[3])}function Nt(tt){s.push(c[tt*3+0]),s.push(c[tt*3+1]),s.push(c[tt*3+2])}function Zt(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Wm(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Yr[s.type]().fromJSON(s)),new i(n,t.options)}},Hm={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],d=t[s*3+1];return[new mt(r,o),new mt(a,c),new mt(l,d)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],d=t[n*3+1],u=t[n*3+2],h=t[s*3],f=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-d)<Math.abs(o-l)?[new mt(o,1-c),new mt(l,1-u),new mt(h,1-g),new mt(_,1-p)]:[new mt(a,1-c),new mt(d,1-u),new mt(f,1-g),new mt(m,1-p)]}};function Wm(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Xn=class i extends Ya{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var it=class i extends Oe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,d=[],u=new D,h=new D,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let M=[],v=p/n,y=0;p===0&&o===0?y=.5/e:p===n&&c===Math.PI&&(y=-.5/e);for(let L=0;L<=e;L++){let T=L/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),h.copy(u).normalize(),_.push(h.x,h.y,h.z),m.push(T+y,1-v),M.push(l++)}d.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){let v=d[p][M+1],y=d[p][M],L=d[p+1][M],T=d[p+1][M+1];(p!==0||o>0)&&f.push(v,y,T),(p!==n-1||c<Math.PI)&&f.push(y,L,T)}this.setIndex(f),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Gt=class i extends Oe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],d=new D,u=new D,h=new D;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let _=g/s*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),d.x=t*Math.cos(_),d.y=t*Math.sin(_),h.subVectors(u,d).normalize(),c.push(h.x,h.y,h.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;o.push(_,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new ue(a,3)),this.setAttribute("normal",new ue(c,3)),this.setAttribute("uv",new ue(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var $r=class i extends Oe{constructor(t=new Xr(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new D,c=new D,l=new mt,d=new D,u=[],h=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new ue(u,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(f,2));function _(){for(let v=0;v<e;v++)m(v);m(r===!1?e:0),M(),p()}function m(v){d=t.getPointAt(v/e,d);let y=o.normals[v],L=o.binormals[v];for(let T=0;T<=s;T++){let A=T/s*Math.PI*2,R=Math.sin(A),E=-Math.cos(A);c.x=E*y.x+R*L.x,c.y=E*y.y+R*L.y,c.z=E*y.z+R*L.z,c.normalize(),h.push(c.x,c.y,c.z),a.x=d.x+n*c.x,a.y=d.y+n*c.y,a.z=d.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let v=1;v<=e;v++)for(let y=1;y<=s;y++){let L=(s+1)*(v-1)+(y-1),T=(s+1)*v+(y-1),A=(s+1)*v+y,R=(s+1)*(v-1)+y;g.push(L,T,R),g.push(T,A,R)}}function M(){for(let v=0;v<=e;v++)for(let y=0;y<=s;y++)l.x=v/e,l.y=y/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Yr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var sn=class extends oi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=th,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},yn=class extends sn{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new mt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ae(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Wt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Wt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Wt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function vr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Xm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var os=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ja=class extends os{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Dc,endingEnd:Dc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Uc:r=t,a=2*e-n;break;case Nc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Uc:o=t,c=2*n-e;break;case Nc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,d=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*d,this._offsetNext=o*d}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-h*m+2*h*_-h*g,M=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,v=(-1-f)*m+(1.5+f)*_+.5*g,y=f*m-f*_;for(let L=0;L!==a;++L)r[L]=p*o[d+L]+M*o[l+L]+v*o[c+L]+y*o[u+L];return r}},Ka=class extends os{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,d=(n-e)/(s-e),u=1-d;for(let h=0;h!==a;++h)r[h]=o[l+h]*u+o[c+h]*d;return r}},Qa=class extends os{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},vn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=vr(e,this.TimeBufferType),this.values=vr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:vr(t.times,Array),values:vr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Qa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ka(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ja(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Tr:e=this.InterpolantFactoryMethodDiscrete;break;case Ea:e=this.InterpolantFactoryMethodLinear;break;case lo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Tr;case this.InterpolantFactoryMethodLinear:return Ea;case this.InterpolantFactoryMethodSmooth:return lo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Xm(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===lo,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],d=t[a+1];if(l!==d&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,h=u-n,f=u+n;for(let g=0;g!==n;++g){let _=e[u+g];if(_!==e[h+g]||_!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,h=o*n;for(let f=0;f!==n;++f)e[h+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};vn.prototype.TimeBufferType=Float32Array;vn.prototype.ValueBufferType=Float32Array;vn.prototype.DefaultInterpolation=Ea;var Ei=class extends vn{constructor(t,e,n){super(t,e,n)}};Ei.prototype.ValueTypeName="bool";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=Tr;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var ja=class extends vn{};ja.prototype.ValueTypeName="color";var tc=class extends vn{};tc.prototype.ValueTypeName="number";var ec=class extends os{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let d=l+a;l!==d;l+=4)ri.slerpFlat(r,0,o,l-a,o,l,c);return r}},Zr=class extends vn{InterpolantFactoryMethodLinear(t){return new ec(this.times,this.values,this.getValueSize(),t)}};Zr.prototype.ValueTypeName="quaternion";Zr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ti=class extends vn{constructor(t,e,n){super(t,e,n)}};Ti.prototype.ValueTypeName="string";Ti.prototype.ValueBufferType=Array;Ti.prototype.DefaultInterpolation=Tr;Ti.prototype.InterpolantFactoryMethodLinear=void 0;Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var nc=class extends vn{};nc.prototype.ValueTypeName="vector";var ic=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,u){return l.push(d,u),this},this.removeHandler=function(d){let u=l.indexOf(d);return u!==-1&&l.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=l.length;u<h;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null}}},qm=new ic,sc=class{constructor(t){this.manager=t!==void 0?t:qm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};sc.DEFAULT_MATERIAL_NAME="__DEFAULT";var as=class extends He{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Jr=class extends as{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Vo=new ye,Fl=new D,Ol=new D,Kr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.map=null,this.mapPass=null,this.matrix=new ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Us,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Fl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Fl),Ol.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ol),e.updateMatrixWorld(),Vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Bl=new ye,vs=new D,ko=new D,rc=class extends Kr{constructor(){super(new ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new mt(4,2),this._viewportCount=6,this._viewports=[new pe(2,1,1,1),new pe(0,1,1,1),new pe(3,1,1,1),new pe(1,1,1,1),new pe(3,0,1,1),new pe(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),vs.setFromMatrixPosition(t.matrixWorld),n.position.copy(vs),ko.copy(n.position),ko.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ko),n.updateMatrixWorld(),s.makeTranslation(-vs.x,-vs.y,-vs.z),Bl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bl)}},Qr=class extends as{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new rc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},oc=class extends Kr{constructor(){super(new Nr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},cs=class extends as{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.target=new He,this.shadow=new oc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},jr=class extends as{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Mc="\\[\\]\\.:\\/",Ym=new RegExp("["+Mc+"]","g"),Sc="[^"+Mc+"]",$m="[^"+Mc.replace("\\.","")+"]",Zm=/((?:WC+[\/:])*)/.source.replace("WC",Sc),Jm=/(WCOD+)?/.source.replace("WCOD",$m),Km=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Sc),Qm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Sc),jm=new RegExp("^"+Zm+Jm+Km+Qm+"$"),tg=["material","materials","bones","map"],ac=class{constructor(t,e,n){let s=n||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Me=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ym,"")}static parseTrackName(t){let e=jm.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);tg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===l){l=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=ac;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ug=new Float32Array(1);var zl=new ye,to=class{constructor(t,e,n=0,s=1/0){this.ray=new Ls(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ds,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return zl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zl),this}intersectObject(t,e=!0,n=[]){return cc(t,this,n,e),n.sort(Vl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)cc(t[s],this,n,e);return n.sort(Vl),n}};function Vl(i,t){return i.distance-t.distance}function cc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)cc(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lc}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lc);var hn='"Noto Sans HK", "PingFang HK", "Microsoft JhengHei", sans-serif',li='"Gluten", "Trebuchet MS", "Arial Rounded MT Bold", sans-serif';function ge(i,t,e){let n=document.createElement("canvas");n.width=i,n.height=t;let s=n.getContext("2d");e(s,i,t);let r=new Fs(n);return r.colorSpace=Ve,r.needsUpdate=!0,r}function bc(i,t,e){let n=document.createElement("canvas");n.width=i,n.height=t;let s=n.getContext("2d");e(s,i,t);let r=new Fs(n);return r.needsUpdate=!0,r}function Ci(i){let t=i>>>0;return()=>(t=Math.imul(1664525,t)+1013904223>>>0,t/4294967296)}function eg(){let i=new Map,t={clayBump(){let e=bc(256,256,(n,s,r)=>{let o=Ci(1337);n.fillStyle="#808080",n.fillRect(0,0,s,r);for(let a=0;a<160;a++){let c=o()*s,l=o()*r,d=Math.floor(118+o()*20);n.strokeStyle=`rgba(${d},${d},${d},0.22)`,n.lineWidth=1.5+o()*3,n.beginPath(),n.moveTo(c,l),n.quadraticCurveTo(c+(o()-.5)*28,l+(o()-.5)*16,c+(o()-.5)*40,l+(o()-.5)*24),n.stroke()}for(let a=0;a<820;a++){let c=o()*s,l=o()*r,d=1.2+o()*4.8,u=Math.floor(108+o()*42);n.fillStyle=`rgba(${u},${u},${u},0.3)`,n.beginPath(),n.arc(c,l,d,0,Math.PI*2),n.fill()}});return e.wrapS=e.wrapT=en,e.repeat.set(2,2),e},clayRough(){let e=bc(256,256,(n,s,r)=>{let o=Ci(2026);n.fillStyle="#dcdcdc",n.fillRect(0,0,s,r);for(let a=0;a<480;a++){let c=Math.floor(196+o()*54);n.fillStyle=`rgba(${c},${c},${c},0.26)`,n.beginPath(),n.arc(o()*s,o()*r,4+o()*14,0,Math.PI*2),n.fill()}});return e.wrapS=e.wrapT=en,e.repeat.set(2,2),e},metalBrush(){let e=bc(256,256,(n,s,r)=>{let o=Ci(909);n.fillStyle="#c8c8c8",n.fillRect(0,0,s,r);for(let a=0;a<r;a+=2){let c=Math.floor(170+o()*72);n.fillStyle=`rgba(${c},${c},${c},0.35)`,n.fillRect(0,a,s,1+o()*1.4)}});return e.wrapS=e.wrapT=en,e.repeat.set(2,2),e},woodPlank(){let e=ge(512,512,(n,s,r)=>{let o=Ci(42),a=6,c=r/a,l=["#d49f64","#c78e52","#daa86f","#c3894e","#d19b60","#ce965a"];for(let d=0;d<a;d++){let u=d*c,h=n.createLinearGradient(0,u,s,u+c);h.addColorStop(0,l[d%l.length]),h.addColorStop(.55,l[(d+2)%l.length]),h.addColorStop(1,l[(d+4)%l.length]),n.fillStyle=h,n.fillRect(0,u,s,c);for(let m=0;m<22;m++){let p=u+4+o()*(c-8);n.strokeStyle=o()>.45?"rgba(102,58,22,0.18)":"rgba(255,238,204,0.16)",n.lineWidth=1.2+o()*2.2,n.beginPath(),n.moveTo(0,p),n.bezierCurveTo(s*.33,p+(o()-.5)*9,s*.66,p+(o()-.5)*9,s,p),n.stroke()}let f=(d*157+90)%(s-110)+55,g=u+c*(.35+d%3*.14);n.strokeStyle="rgba(96,52,20,0.2)",n.lineWidth=2,n.beginPath(),n.ellipse(f,g,18,6,0,0,Math.PI*2),n.stroke(),n.fillStyle="rgba(68,36,14,0.48)",n.fillRect(0,u,s,4),n.fillStyle="rgba(255,244,218,0.26)",n.fillRect(0,u+4,s,2.5);let _=(d*149+86)%(s-84)+42;n.fillStyle="rgba(68,36,14,0.38)",n.fillRect(_,u,3.5,c);for(let m of[_-13,_+16])for(let p of[u+18,u+c-18])n.fillStyle="#5c3b1e",n.beginPath(),n.arc(m,p,4.6,0,Math.PI*2),n.fill(),n.fillStyle="#e8c474",n.beginPath(),n.arc(m-.8,p-.8,2.6,0,Math.PI*2),n.fill(),n.fillStyle="#fff6cf",n.beginPath(),n.arc(m-1.5,p-1.5,1.1,0,Math.PI*2),n.fill()}});return e.wrapS=e.wrapT=en,e.repeat.set(2,2),e},stoneWall(){let e=ge(512,256,(n,s,r)=>{let o=Ci(88);n.fillStyle="#a59f93",n.fillRect(0,0,s,r);let a=4,c=r/a,l=["#d3ccc0","#c7c0b3","#dcd5c9","#bfb8ab","#cec7ba"];for(let d=0;d<a;d++){let u=d*c,h=d%2*-56;for(;h<s;){let f=88+Math.floor(o()*48);n.fillStyle=l[Math.floor(o()*l.length)],n.fillRect(h+4,u+4,f-8,c-8);for(let g=0;g<16;g++)n.fillStyle=g%2?"rgba(80,75,68,0.16)":"rgba(255,252,246,0.22)",n.fillRect(h+8+o()*(f-18),u+8+o()*(c-18),3,2);n.fillStyle="rgba(255,252,244,0.28)",n.fillRect(h+4,u+4,f-8,5),n.fillStyle="rgba(62,58,52,0.25)",n.fillRect(h+4,u+c-9,f-8,5),h+=f}}});return e.wrapS=e.wrapT=en,e.repeat.set(4,1),e},pineappleCrust(){return ge(512,512,(e,n,s)=>{let r=e.createRadialGradient(n*.48,s*.42,28,n*.5,s*.5,n*.62);r.addColorStop(0,"#ffe48c"),r.addColorStop(.58,"#f3ae3c"),r.addColorStop(1,"#c76e1c"),e.fillStyle=r,e.fillRect(0,0,n,s);let o=64;e.strokeStyle="#8f420c",e.lineWidth=9;for(let c=-s;c<n+s;c+=o)e.beginPath(),e.moveTo(c,0),e.lineTo(c+s,s),e.stroke(),e.beginPath(),e.moveTo(c,s),e.lineTo(c+s,0),e.stroke();e.strokeStyle="rgba(255,248,210,0.6)",e.lineWidth=3.5;for(let c=-s+7;c<n+s;c+=o)e.beginPath(),e.moveTo(c,0),e.lineTo(c+s,s),e.stroke(),e.beginPath(),e.moveTo(c,s),e.lineTo(c+s,0),e.stroke();let a=Ci(777);for(let c=0;c<140;c++)e.fillStyle="rgba(255,252,224,0.45)",e.beginPath(),e.arc(a()*n,a()*s,1.4+a()*1.8,0,Math.PI*2),e.fill()})},riceSack(){return ge(512,512,(e,n,s)=>{e.fillStyle="#f4e5c8",e.fillRect(0,0,n,s);for(let r=0;r<n;r+=10)e.strokeStyle=r%20===0?"rgba(160,126,82,0.22)":"rgba(255,250,238,0.24)",e.lineWidth=3,e.beginPath(),e.moveTo(r,0),e.lineTo(r,s),e.stroke(),e.beginPath(),e.moveTo(0,r),e.lineTo(n,r),e.stroke();e.fillStyle="#c9352b",e.fillRect(0,48,n,20),e.fillRect(0,s-68,n,20),e.fillStyle="#2b7c6e",e.fillRect(0,74,n,6),e.fillRect(0,s-78,n,6),e.save(),e.translate(n/2,s/2+4),e.fillStyle="#fff9ed",e.strokeStyle="#c9352b",e.lineWidth=14,e.beginPath(),e.moveTo(0,-134),e.lineTo(134,0),e.lineTo(0,134),e.lineTo(-134,0),e.closePath(),e.fill(),e.stroke(),e.strokeStyle="#e09c2b",e.lineWidth=4.5,e.beginPath(),e.moveTo(0,-110),e.lineTo(110,0),e.lineTo(0,110),e.lineTo(-110,0),e.closePath(),e.stroke(),e.fillStyle="#b8241d",e.font=`900 142px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u7C73",0,8),e.restore()})},checkerTile(){let e=ge(256,256,(n,s,r)=>{for(let a=0;a<r;a+=64)for(let c=0;c<s;c+=64){let l=(c/64+a/64)%2===0;n.fillStyle=l?"#1d8b79":"#fff7e5",n.fillRect(c,a,64,64),n.fillStyle="rgba(255,255,255,0.28)",n.fillRect(c+3,a+3,58,4),n.fillRect(c+3,a+3,4,58),n.strokeStyle="rgba(38,52,48,0.22)",n.lineWidth=3,n.strokeRect(c+1.5,a+1.5,61,61)}});return e.wrapS=e.wrapT=en,e.repeat.set(3,1.5),e},stripeRed(){let e=ge(256,128,(n,s,r)=>{let a=s/8;for(let c=0;c<8;c++)n.fillStyle=c%2===0?"#df443a":"#fff8eb",n.fillRect(c*a,0,a,r);n.fillStyle="rgba(255,255,255,0.12)";for(let c=0;c<r;c+=6)n.fillRect(0,c,s,2);n.fillStyle="#ffd15c",n.fillRect(0,r-14,s,14),n.strokeStyle="#b83028",n.lineWidth=2,n.setLineDash([6,4]),n.beginPath(),n.moveTo(0,r-17),n.lineTo(s,r-17),n.stroke()});return e.wrapS=e.wrapT=en,e},stripeCoral(){let e=ge(256,128,(n,s,r)=>{let a=s/8;for(let c=0;c<8;c++)n.fillStyle=c%2===0?"#ff6b4a":"#fff8eb",n.fillRect(c*a,0,a,r);n.fillStyle="rgba(255,255,255,0.12)";for(let c=0;c<r;c+=6)n.fillRect(0,c,s,2);n.fillStyle="#14968b",n.fillRect(0,r-15,s,15)});return e.wrapS=e.wrapT=en,e},brick(){let e=ge(512,512,(n,s,r)=>{let o=Ci(450);n.fillStyle="#ddd1be",n.fillRect(0,0,s,r);let a=10,c=r/a,l=84,d=["#b84136","#c44b3e","#a9392f","#cc5545","#b23e33"];for(let u=0;u<a;u++){let h=u*c,f=u%2*(-l*.5);for(;f<s;)n.fillStyle=d[Math.floor(o()*d.length)],n.fillRect(f+4,h+4,l-8,c-8),n.fillStyle="rgba(255,224,196,0.2)",n.fillRect(f+4,h+4,l-8,5),n.fillStyle="rgba(70,22,18,0.2)",n.fillRect(f+4,h+c-9,l-8,5),f+=l}});return e.wrapS=e.wrapT=en,e.repeat.set(1.5,2.5),e},clockFace(){return ge(512,512,(e,n,s)=>{let r=n/2,o=s/2,a=n*.45,c=e.createRadialGradient(r,o-30,24,r,o,a+12);c.addColorStop(0,"#fffdf6"),c.addColorStop(.85,"#fff4db"),c.addColorStop(1,"#e8d8b6"),e.fillStyle=c,e.beginPath(),e.arc(r,o,a+12,0,Math.PI*2),e.fill(),e.strokeStyle="#3a2e28",e.lineWidth=14,e.beginPath(),e.arc(r,o,a,0,Math.PI*2),e.stroke(),e.strokeStyle="#c89b3c",e.lineWidth=6,e.beginPath(),e.arc(r,o,a-20,0,Math.PI*2),e.stroke();let l=["XII","I","II","III","IV","V","VI","VII","VIII","IX","X","XI"];e.fillStyle="#222430",e.textAlign="center",e.textBaseline="middle";for(let d=0;d<12;d++){let u=d*Math.PI/6-Math.PI/2;e.strokeStyle="#222430",e.lineWidth=d%3===0?10:5,e.beginPath(),e.moveTo(r+Math.cos(u)*(a-24),o+Math.sin(u)*(a-24)),e.lineTo(r+Math.cos(u)*(a-48),o+Math.sin(u)*(a-48)),e.stroke(),e.font=d%3===0?"bold 46px Georgia, serif":"bold 32px Georgia, serif",e.fillText(l[d],r+Math.cos(u)*(a-80),o+Math.sin(u)*(a-80))}e.strokeStyle="#1b1d28",e.lineCap="round",e.lineWidth=18,e.beginPath(),e.moveTo(r,o),e.lineTo(r-84,o-68),e.stroke(),e.lineWidth=12,e.beginPath(),e.moveTo(r,o),e.lineTo(r+116,o-88),e.stroke(),e.fillStyle="#d9a426",e.beginPath(),e.arc(r,o,20,0,Math.PI*2),e.fill()})},badge18222(){return ge(512,288,(e,n,s)=>{let r=e.createLinearGradient(0,0,0,s);r.addColorStop(0,"#233368"),r.addColorStop(1,"#141e42"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#ffd45c",e.lineWidth=14,e.strokeRect(14,14,n-28,s-28),e.fillStyle="#ff5c4a",e.fillRect(26,26,n-52,68),e.fillStyle="#fff9ec",e.font=`900 42px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u9632\u9A19\u6613 ANTI-SCAM",n/2,62),e.fillStyle="#ffe470",e.font=`900 124px ${li}`,e.fillText("18222",n/2,190)})},neonSign(){return ge(512,288,(e,n,s)=>{e.fillStyle="#171c36",e.fillRect(0,0,n,s),e.shadowColor="#38f3dc",e.shadowBlur=26,e.strokeStyle="#5cffea",e.lineWidth=13,e.strokeRect(18,18,n-36,s-36),e.shadowColor="#ff5fa8",e.shadowBlur=28,e.strokeStyle="#ff7eb8",e.lineWidth=6,e.strokeRect(38,38,n-76,s-76),e.fillStyle="#ff8ac0",e.font=`900 112px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u8336\u9910\u5EF3",n/2,132),e.shadowColor="#ffe26a",e.shadowBlur=16,e.fillStyle="#ffeb8e",e.font=`800 34px ${li}`,e.fillText("CHA CHAAN TENG",n/2,224)})},chalkboard(){return ge(512,384,(e,n,s)=>{e.fillStyle="#22342e",e.fillRect(0,0,n,s),e.strokeStyle="#b87c42",e.lineWidth=26,e.strokeRect(13,13,n-26,s-26),e.strokeStyle="rgba(255,232,175,0.3)",e.lineWidth=4,e.strokeRect(36,36,n-72,s-72),e.fillStyle="#ffe588",e.font=`900 66px ${hn}`,e.textAlign="center",e.fillText("\u65B0\u9BAE\u51FA\u7210",n/2,114),e.fillStyle="#fff8eb",e.font=`700 58px ${hn}`,e.fillText("\u83E0\u863F\u5305 $8",n/2,212),e.fillStyle="#ffc09c",e.font=`700 50px ${hn}`,e.fillText("\u6E2F\u5F0F\u5976\u8336 $16",n/2,296)})},kioskScreen(){return ge(512,384,(e,n,s)=>{let r=e.createLinearGradient(0,0,0,s);r.addColorStop(0,"#125862"),r.addColorStop(1,"#0b323e"),e.fillStyle=r,e.fillRect(0,0,n,s),e.fillStyle="#3bf0c8",e.font=`800 40px ${hn}`,e.textAlign="center",e.fillText("\u516B\u9054\u901A \xB7 \u5132\u84C4\u9918\u984D",n/2,68),e.fillStyle="#fff7d2",e.font=`900 84px ${li}`,e.fillText("HK$1,888",n/2,170),[52,80,104,128,156].forEach((a,c)=>{e.fillStyle=c===4?"#ffd552":"#34e2bc",e.fillRect(76+c*76,344-a*.72,48,a*.72)})})},shopBanner(){return ge(512,192,(e,n,s)=>{let r=e.createLinearGradient(0,0,0,s);r.addColorStop(0,"#1b5953"),r.addColorStop(1,"#12403c"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#f4c652",e.lineWidth=10,e.strokeRect(12,12,n-24,s-24),e.fillStyle="#ffe99a",e.font=`900 76px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u6D77\u508D\u5C0F\u5929\u5730",n/2,76),e.fillStyle="#fff7e8",e.font=`800 32px ${li}`,e.fillText("HARBOUR KEEP \xB7 1/F",n/2,144)})},pierPlaque(){return ge(512,160,(e,n,s)=>{let r=e.createLinearGradient(0,0,n,s);r.addColorStop(0,"#f7d262"),r.addColorStop(.5,"#d89c2e"),r.addColorStop(1,"#f4cb58"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#6c4814",e.lineWidth=10,e.strokeRect(12,12,n-24,s-24),e.strokeStyle="rgba(255,248,210,0.65)",e.lineWidth=3,e.strokeRect(20,20,n-40,s-40),e.fillStyle="#2b1d0c",e.font=`900 56px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u6D77\u508D\u5C0F\u5929\u5730",n/2,62),e.font=`800 26px ${li}`,e.fillText("VICTORIA HARBOUR KEEP",n/2,118)})},passbook(){return ge(256,384,(e,n,s)=>{e.fillStyle="#14968b",e.fillRect(0,0,n,s),e.fillStyle="#fff7e6",e.fillRect(0,88,n,52),e.fillStyle="#ffd354",e.fillRect(0,140,n,14),e.fillStyle="#134d48",e.font=`900 40px ${hn}`,e.textAlign="center",e.fillText("\u5132\u84C4\u5B58\u647A",n/2,126),e.fillStyle="#fff6e5",e.font=`800 32px ${li}`,e.fillText("SAVINGS",n/2,256)})},calcScreen(){return ge(256,340,(e,n,s)=>{e.fillStyle="#eee5d4",e.fillRect(0,0,n,s),e.fillStyle="#a8cdb0",e.fillRect(22,24,n-44,82),e.strokeStyle="#485a4e",e.lineWidth=6,e.strokeRect(22,24,n-44,82),e.fillStyle="#1b3324",e.font="bold 38px monospace",e.textAlign="right",e.fillText("APR 0%",n-34,78);for(let r=0;r<4;r++)for(let o=0;o<4;o++){e.fillStyle=o===3?"#f47e54":r===0?"#14968b":"#3a4556";let a=24+o*53,c=128+r*48;e.fillRect(a,c,44,38),e.fillStyle="rgba(255,255,255,0.28)",e.fillRect(a,c,44,7)}})},tramSign(){return ge(512,192,(e,n,s)=>{e.fillStyle="#145435",e.fillRect(0,0,n,s),e.fillStyle="#fff5dc",e.fillRect(16,18,n-32,s-36),e.strokeStyle="#d9a226",e.lineWidth=8,e.strokeRect(24,26,n-48,s-52),e.fillStyle="#11442b",e.font=`900 62px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u5805\u5C3C\u5730\u57CE \xB7 \u53EE\u53EE",n/2,78),e.font=`800 30px ${li}`,e.fillText("HK TRAMWAYS \xB7 DAY 30",n/2,136)})},laisee(){return ge(256,320,(e,n,s)=>{let r=e.createLinearGradient(0,0,n,s);r.addColorStop(0,"#e3312c"),r.addColorStop(1,"#bc1f1f"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#ffd552",e.lineWidth=10,e.strokeRect(18,18,n-36,s-36),e.fillStyle="#ffd552",e.beginPath(),e.arc(n/2,s/2,68,0,Math.PI*2),e.fill(),e.fillStyle="#b81d1d",e.font=`900 68px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u5927\u5409",n/2,s/2+4)})},coinFace(){return ge(256,256,(e,n,s)=>{let r=n/2,o=s/2,a=e.createRadialGradient(r-24,o-24,16,r,o,120);a.addColorStop(0,"#fff4a8"),a.addColorStop(.58,"#f7be34"),a.addColorStop(1,"#c27c0e"),e.fillStyle=a,e.fillRect(0,0,n,s),e.strokeStyle="#fff6be",e.lineWidth=9,e.beginPath(),e.arc(r,o,102,0,Math.PI*2),e.stroke(),e.strokeStyle="#a8680a",e.lineWidth=3,e.beginPath(),e.arc(r,o,88,0,Math.PI*2),e.stroke(),e.fillStyle="#ffe984";for(let c=0;c<5;c++){let l=c*Math.PI*2/5-Math.PI/2;e.save(),e.translate(r+Math.cos(l)*36,o+Math.sin(l)*36),e.rotate(l),e.beginPath(),e.ellipse(0,0,28,14,0,0,Math.PI*2),e.fill(),e.restore()}e.fillStyle="#b3730e",e.beginPath(),e.arc(r,o,15,0,Math.PI*2),e.fill()})},waterRipple(){return ge(256,256,(n,s,r)=>{n.clearRect(0,0,s,r);let o=s/2,a=r/2;for(let c=1;c<=5;c++){let l=22+c*21;n.strokeStyle=`rgba(230,252,255,${.28-c*.035})`,n.lineWidth=c===1?5:3,n.setLineDash([28,16,14,18]),n.beginPath(),n.arc(o,a,l,c*.4,Math.PI*2+c*.4),n.stroke()}})},shadowDisc(){return ge(128,128,(e,n,s)=>{let r=n/2,o=s/2,a=e.createRadialGradient(r,o,6,r,o,n*.48);a.addColorStop(0,"rgba(22,30,52,0.58)"),a.addColorStop(.55,"rgba(22,30,52,0.24)"),a.addColorStop(1,"rgba(22,30,52,0)"),e.fillStyle=a,e.fillRect(0,0,n,s)})},coasterDial(){return ge(512,512,(e,n,s)=>{let r=n/2,o=s/2,a=e.createRadialGradient(r-24,o-28,22,r,o,n*.5);a.addColorStop(0,"#ebd1a8"),a.addColorStop(.55,"#c59056"),a.addColorStop(.86,"#96602e"),a.addColorStop(1,"#6f411a"),e.fillStyle=a,e.fillRect(0,0,n,s),e.strokeStyle="rgba(86,46,16,0.16)",e.lineWidth=3;for(let c=34;c<240;c+=20)e.beginPath(),e.arc(r,o,c,0,Math.PI*2),e.stroke();e.strokeStyle="#f4d272",e.lineWidth=7,e.beginPath(),e.arc(r,o,214,0,Math.PI*2),e.stroke(),e.lineWidth=3.5,e.beginPath(),e.arc(r,o,192,0,Math.PI*2),e.stroke();for(let c=0;c<36;c++){let l=c*Math.PI*2/36,d=c%9===0,u=c%3===0,h=d?168:u?176:184;e.lineWidth=d?6:u?3.5:2,e.beginPath(),e.moveTo(r+Math.cos(l)*h,o+Math.sin(l)*h),e.lineTo(r+Math.cos(l)*208,o+Math.sin(l)*208),e.stroke()}e.strokeStyle="rgba(255,244,212,0.34)",e.lineWidth=3,e.beginPath(),e.arc(r,o,126,0,Math.PI*2),e.stroke()})},trophy100(){return ge(512,192,(e,n,s)=>{let r=e.createLinearGradient(0,0,n,s);r.addColorStop(0,"#f5c442"),r.addColorStop(.5,"#cf8f1a"),r.addColorStop(1,"#f2bf3c"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#fff5b8",e.lineWidth=10,e.strokeRect(14,14,n-28,s-28),e.fillStyle="#3a2204",e.font=`900 84px ${li}`,e.textAlign="center",e.textBaseline="middle",e.fillText("100 DAYS",n/2,s/2+4)})}};return{get(e){if(!i.has(e)){let n=t[e];if(!n)throw new Error("Unknown texture: "+e);i.set(e,n())}return i.get(e)},dispose(){for(let e of i.values())e.dispose();i.clear()}}}function ro(i="day"){let t={day:["#ffffff","#d8f4ff","#ffeecd","#82c5cc"],dusk:["#ffe7c2","#ffab8a","#c88ec4","#554c82"],night:["#95b4ff","#3b5294","#272e62","#161a38"]},e=t[i]||t.day,n=ge(256,128,(s,r,o)=>{let a=s.createLinearGradient(0,0,0,o);a.addColorStop(0,e[0]),a.addColorStop(.36,e[1]),a.addColorStop(.62,e[2]),a.addColorStop(1,e[3]),s.fillStyle=a,s.fillRect(0,0,r,o);let c=s.createLinearGradient(0,o*.44,0,o*.58);c.addColorStop(0,"rgba(255,255,255,0)"),c.addColorStop(.5,i==="night"?"rgba(130,210,255,0.45)":"rgba(255,252,240,0.68)"),c.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=c,s.fillRect(0,o*.44,r,o*.14);let l=(d,u,h,f)=>{let g=s.createRadialGradient(d,u,h*.1,d,u,h);g.addColorStop(0,f),g.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=g,s.beginPath(),s.arc(d,u,h,0,Math.PI*2),s.fill()};l(r*.24,o*.2,34,i==="night"?"rgba(200,228,255,0.9)":"rgba(255,255,255,0.95)"),l(r*.72,o*.24,28,i==="dusk"?"rgba(255,214,170,0.85)":"rgba(255,255,255,0.82)"),l(r*.5,o*.08,26,"rgba(255,255,255,0.75)")});return n.mapping=Rs,n}function oo(i="day"){let t={day:{stops:[[0,"#4ca9e6"],[.34,"#7cd0f5"],[.5,"#c9eef6"],[.68,"#d9f4eb"],[1,"#63b7c6"]],haze:"rgba(255,250,238,0.34)"},dusk:{stops:[[0,"#382f72"],[.27,"#8e589a"],[.48,"#f08a6d"],[.64,"#ffd18c"],[1,"#4a4375"]],haze:"rgba(255,218,162,0.3)"},night:{stops:[[0,"#0b112c"],[.34,"#16214f"],[.53,"#273774"],[.7,"#1f2e62"],[1,"#0c1532"]],haze:"rgba(110,162,235,0.18)"}},e=t[i]||t.day;return ge(64,512,(n,s,r)=>{let o=n.createLinearGradient(0,0,0,r);for(let[c,l]of e.stops)o.addColorStop(c,l);n.fillStyle=o,n.fillRect(0,0,s,r);let a=n.createLinearGradient(0,r*.42,0,r*.62);a.addColorStop(0,"rgba(255,255,255,0)"),a.addColorStop(.55,e.haze),a.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=a,n.fillRect(0,r*.42,s,r*.2)})}function fh(i={}){let t=eg(),e=new Map,n=[],s=!!i.softwareGL,r=s?null:t.get("clayBump"),o=s?null:t.get("clayRough"),a=s?null:t.get("metalBrush");function c(u,h){return e.has(u)||e.set(u,h()),e.get(u)}function l(u,h=.52){return new Wt(u).lerp(new Wt(16775146),h)}return{tex:t,emissives:n,clay(u,h={}){var g,_;let f=`clay:${u}:${(g=h.rough)!=null?g:.46}:${h.flat?1:0}:${(_=h.side)!=null?_:0}`;return c(f,()=>{var m,p,M,v;return s?new sn({color:u,roughness:(m=h.rough)!=null?m:.46,metalness:(p=h.metalness)!=null?p:.03,envMapIntensity:.78,flatShading:!!h.flat,side:h.side||0}):new yn({color:u,roughness:(M=h.rough)!=null?M:.48,roughnessMap:h.noBump?null:o,metalness:(v=h.metalness)!=null?v:.02,bumpMap:h.noBump?null:r,bumpScale:h.noBump?0:.007,clearcoat:.14,clearcoatRoughness:.45,sheen:.36,sheenRoughness:.58,sheenColor:l(u,.55),envMapIntensity:.85,flatShading:!!h.flat,side:h.side||0})})},gloss(u,h={}){var g;let f=`gloss:${u}:${(g=h.rough)!=null?g:.16}`;return c(f,()=>{var _,m,p,M;return s?new sn({color:u,roughness:(_=h.rough)!=null?_:.16,metalness:(m=h.metalness)!=null?m:.08,envMapIntensity:1.15}):new yn({color:u,roughness:(p=h.rough)!=null?p:.15,metalness:(M=h.metalness)!=null?M:.03,clearcoat:.92,clearcoatRoughness:.07,ior:1.54,reflectivity:.78,envMapIntensity:1.32})})},enamel(u,h={}){var g,_,m;let f=`enamel:${u}:${(g=h.rough)!=null?g:.24}:${(_=h.metalness)!=null?_:""}:${(m=h.side)!=null?m:0}`;return c(f,()=>{var p,M,v,y;return s?new sn({color:u,roughness:(p=h.rough)!=null?p:.24,metalness:Math.min(.14,(M=h.metalness)!=null?M:.08),envMapIntensity:1.05,side:h.side||0}):new yn({color:u,roughness:(v=h.rough)!=null?v:.22,metalness:(y=h.metalness)!=null?y:.08,clearcoat:.8,clearcoatRoughness:.1,ior:1.5,reflectivity:.72,envMapIntensity:1.24,side:h.side||0})})},fabric(u,h={}){var g,_;let f=`fabric:${u}:${(g=h.rough)!=null?g:.72}:${(_=h.side)!=null?_:0}`;return c(f,()=>{var m,p;return s?new sn({color:u,roughness:(m=h.rough)!=null?m:.72,metalness:0,envMapIntensity:.55,side:h.side||0}):new yn({color:u,roughness:(p=h.rough)!=null?p:.74,metalness:0,bumpMap:r,bumpScale:.01,sheen:.68,sheenRoughness:.64,sheenColor:l(u,.62),envMapIntensity:.52,side:h.side||0})})},metal(u,h=.22,f=.82){let g=`metal:${u}:${h}:${f}`;return c(g,()=>s?new sn({color:u,roughness:Math.max(.24,h),metalness:Math.min(.62,f),envMapIntensity:1.45}):new yn({color:u,roughness:Math.max(.18,h),roughnessMap:a,metalness:f,bumpMap:a,bumpScale:.003,clearcoat:.34,clearcoatRoughness:.18,envMapIntensity:1.58}))},glass(u=14677759,h=.42){let f=`glass:${u}:${h}`;return c(f,()=>{let g=s?sn:yn;return new g({color:u,roughness:.06,metalness:.08,transparent:!0,opacity:h,depthWrite:!1,envMapIntensity:1.55,...s?{}:{clearcoat:1,clearcoatRoughness:.04,ior:1.48}})})},emissive(u,h=.7,f=2.1,g={}){let _=`em:${u}:${h}:${f}:${g.transparent?g.opacity:1}`;return c(_,()=>{var p,M,v,y,L;let m=new sn({color:(p=g.color)!=null?p:u,emissive:new Wt(u),emissiveIntensity:h,roughness:(M=g.rough)!=null?M:.26,metalness:(v=g.metalness)!=null?v:.05,transparent:!!g.transparent,opacity:(y=g.opacity)!=null?y:1,depthWrite:(L=g.depthWrite)!=null?L:!g.transparent,side:g.side||0});return n.push({mat:m,base:h,night:f}),m})},textured(u,h={}){var _,m,p;let f=h.finish||"default",g=`tx:${u}:${f}:${(_=h.rough)!=null?_:""}:${(m=h.metal)!=null?m:""}:${h.emissive?1:0}:${(p=h.side)!=null?p:0}`;return c(g,()=>{var T,A,R,E,S,I,W,F,k,$,z;let M=t.get(u),v=(T=h.rough)!=null?T:f==="glaze"?.2:f==="lacquer"?.34:f==="fabric"?.74:f==="metal"?.22:.54,y=(A=h.metal)!=null?A:f==="metal"?s?.55:.76:.04,L;return s?L=new sn({map:M,color:(R=h.color)!=null?R:16777215,roughness:v,metalness:y,envMapIntensity:f==="glaze"||f==="metal"?1.25:.75,side:h.side||0,transparent:!!h.transparent,opacity:(E=h.opacity)!=null?E:1}):L=new yn({map:M,color:(S=h.color)!=null?S:16777215,roughness:v,metalness:y,bumpMap:f==="metal"?a:f==="glaze"?null:r,bumpScale:f==="metal"?.003:f==="fabric"?.008:.004,clearcoat:f==="glaze"?.86:f==="lacquer"?.48:f==="metal"?.35:0,clearcoatRoughness:f==="glaze"?.08:.22,sheen:f==="fabric"?.58:0,sheenRoughness:.66,sheenColor:new Wt(16774632),envMapIntensity:(I=h.env)!=null?I:f==="glaze"||f==="metal"?1.25:.78,side:h.side||0,transparent:!!h.transparent,opacity:(W=h.opacity)!=null?W:1}),h.emissive&&(L.emissive=new Wt((F=h.emissiveColor)!=null?F:16777215),L.emissiveMap=M,L.emissiveIntensity=(k=h.baseEmissive)!=null?k:.55,n.push({mat:L,base:($=h.baseEmissive)!=null?$:.55,night:(z=h.nightEmissive)!=null?z:1.65})),L})},shadowMat(u=.36){let h=`sh:${u}`;return c(h,()=>new ai({map:t.get("shadowDisc"),transparent:!0,opacity:u,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}))},lockedMat(u=0){let h=`locked:${u}`,f=u===0?13952754:u===1?11454684:15463674;return c(h,()=>s?new sn({color:f,roughness:.34,metalness:u===2?.28:.1,emissive:new Wt(2638689),emissiveIntensity:.15,envMapIntensity:1}):new yn({color:f,roughness:.34,metalness:u===2?.26:.08,bumpMap:r,bumpScale:.005,clearcoat:.72,clearcoatRoughness:.18,sheen:.55,sheenColor:new Wt(12119807),emissive:new Wt(2638689),emissiveIntensity:.14,envMapIntensity:1.1}))},setNightFactor(u){let h=Math.max(0,Math.min(1,u));for(let f of n)f.mat.emissiveIntensity=f.base+(f.night-f.base)*h},dispose(){for(let u of e.values())u.dispose();e.clear(),n.length=0,t.dispose()}}}function V(i,t,e,n=.06,s=.024,r=3){let o=Math.min(s,i*.22,t*.22,e*.32),a=Math.max(.01,i-o*2),c=Math.max(.01,t-o*2),l=Math.max(.01,e-o*2),d=Math.min(n,a*.45,c*.45),u=-a/2,h=-c/2,f=new Wn;f.moveTo(u+d,h),f.lineTo(u+a-d,h),f.quadraticCurveTo(u+a,h,u+a,h+d),f.lineTo(u+a,h+c-d),f.quadraticCurveTo(u+a,h+c,u+a-d,h+c),f.lineTo(u+d,h+c),f.quadraticCurveTo(u,h+c,u,h+c-d),f.lineTo(u,h+d),f.quadraticCurveTo(u,h,u+d,h);let g=new ci(f,{depth:l,bevelEnabled:o>.001,bevelThickness:o,bevelSize:o,bevelSegments:r,curveSegments:r+2});return g.center(),g}function Cn(i,t=24){let e=i.map(([n,s])=>new mt(n,s));return new Vs(e,t)}function oe(i,t,e=20,n=8,s=!1){let r=new Bs(i.map(o=>o instanceof D?o:new D(o[0],o[1],o[2])),s);return new $r(r,e,t,n,s)}function ne(i,t=.04,e=2.6,n=1,s={}){var u;let r=i.attributes.position;if(!r)return i;let o=1/0;if(s.flatBottom)for(let h=0;h<r.count;h++){let f=r.getY(h);f<o&&(o=f)}let a=(u=s.yScale)!=null?u:.82,c=n*1.73,l=n*2.31,d=n*3.17;for(let h=0;h<r.count;h++){let f=r.getX(h),g=r.getY(h),_=r.getZ(h),m=Math.sin(f*e+c)*Math.cos(g*e*1.13+l)+.45*Math.sin((_-f)*e*1.67+d)+.28*Math.cos((g+_)*e*2.05-n*.9),p=Math.hypot(f,g,_)||1,M=m*t*.65,v=g+g/p*M*a;s.flatBottom&&g<=o+.04&&(v=g),r.setXYZ(h,f+f/p*M,v,_+_/p*M)}return r.needsUpdate=!0,i.computeVertexNormals(),i}function x(i,t,e={}){let n=new Fe(i,t);return n.castShadow=e.cast!==!1,n.receiveShadow=e.recv!==!1,e.pos&&n.position.set(e.pos[0],e.pos[1],e.pos[2]),e.rot&&n.rotation.set(e.rot[0],e.rot[1],e.rot[2]),e.scale!=null&&(Array.isArray(e.scale)?n.scale.set(e.scale[0],e.scale[1],e.scale[2]):n.scale.setScalar(e.scale)),n}function de(i,t,e){return i.userData.milestoneDay=t,i.userData.prop=e,i.traverse(n=>{n.userData.milestoneDay=t,n.userData.prop=e}),i}var wc=null;function we(i,t,e,n=.012,s=.34,r){wc||(wc=new Ee(1,1));let o=new Fe(wc,r.shadowMat(s));return o.rotation.x=-Math.PI/2,o.position.y=n,o.scale.set(t*2,e*2,1),o.renderOrder=1,o.userData.ignoreBounds=!0,i.add(o),o}function ph(i,t){let e=0;i.traverse(n=>{if(n.isMesh){if(n.material&&n.material.transparent&&n.material.opacity<.5&&!n.castShadow){if(n.material.map===t.tex.get("shadowDisc"))return;n.visible=!1;return}n.material=t.lockedMat(e%3),e++}})}function ng(i,t,e=.04){let n=new Wn;for(let r=0;r<10;r++){let o=r%2?t:i,a=Math.PI/2+r*Math.PI/5,c=Math.cos(a)*o,l=Math.sin(a)*o;r?n.lineTo(c,l):n.moveTo(c,l)}n.closePath();let s=new ci(n,{depth:e,bevelEnabled:!0,bevelThickness:.012,bevelSize:.01,bevelSegments:2});return s.center(),s}function Xs(i,t){let e=new lt;if(!t)return{group:e,anim:null};if(t==="halo"){let n=i.metal(16763960,.18,.85),s=i.emissive(16769385,.6,1.4),r=x(new Gt(.28,.036,14,36),n,{rot:[Math.PI/2,0,0]}),o=x(new Gt(.28,.018,10,32),s,{rot:[Math.PI/2,0,0],cast:!1});e.add(r,o);let a=[];for(let c=0;c<3;c++){let l=c*Math.PI*2/3,d=x(new Xn(.038,0),s,{pos:[Math.cos(l)*.37,.03,Math.sin(l)*.37],cast:!1});a.push(d),e.add(d)}return{group:e,anim(c){e.position.y=Math.sin(c*2.6)*.035,e.rotation.y=c*1.1,a.forEach((l,d)=>{l.scale.setScalar(.8+.3*Math.sin(c*4.2+d*2.1))})}}}if(t==="straw"){let n=i.fabric(15517807,{rough:.68}),s=i.fabric(16112010,{rough:.64}),r=i.fabric(15222844,{rough:.62}),o=x(Cn([[0,.02],[.22,.03],[.42,0],[.44,-.025],[.2,0],[0,0]],28),n),a=x(Cn([[.22,0],[.21,.14],[.16,.2],[0,.21]],24),s),c=x(new q(.218,.224,.055,24),r,{pos:[0,.05,0]}),l=x(new it(.042,10,10),r,{pos:[.21,.05,.06]});return e.add(o,a,c,l),{group:e,anim:null}}if(t==="tophat"){let n=i.enamel(2303282,{rough:.24}),s=i.metal(16763196,.22,.82),r=x(new q(.36,.37,.04,28),n,{pos:[0,.02,0]}),o=x(new Gt(.36,.02,10,28),n,{rot:[Math.PI/2,0,0],pos:[0,.02,0]}),a=x(new q(.25,.21,.34,28),n,{pos:[0,.21,0]}),c=x(new q(.225,.218,.075,28),s,{pos:[0,.08,0]});return e.add(r,o,a,c),{group:e,anim:null}}return{group:e,anim:null}}function mh(i=.2,t=.045,e=.13,n=.03){let s=new Wn;return s.moveTo(-i,t*.4),s.quadraticCurveTo(0,-t*.35,i,t*.4),s.bezierCurveTo(i*1.06,-e*.85,-i*1.06,-e*.85,-i,t*.4),s.closePath(),new ci(s,{depth:n,bevelEnabled:!1,curveSegments:14})}function ig(){let i=new Wn;i.moveTo(.02,-.14),i.bezierCurveTo(.18,-.14,.22,.04,.14,.18),i.bezierCurveTo(.08,.26,-.03,.25,-.05,.17),i.bezierCurveTo(-.07,.11,-.02,.06,.02,.05),i.quadraticCurveTo(.06,.02,.01,-.015),i.bezierCurveTo(-.03,-.035,-.085,.015,-.115,.085),i.bezierCurveTo(-.14,.135,-.195,.115,-.175,.025),i.bezierCurveTo(-.15,-.08,-.075,-.14,.02,-.14),i.closePath();let t=new ci(i,{depth:.14,bevelEnabled:!0,bevelThickness:.065,bevelSize:.046,bevelSegments:5,curveSegments:12});return t.center(),t}function sg(i=.128,t=.23,e=.265,n=16){let s=new q(i,t,e,n*4,2),r=s.attributes.position;for(let a=0;a<r.count;a++){let c=r.getX(a),l=r.getY(a),d=r.getZ(a),u=Math.hypot(c,d);if(u<.01)continue;let h=Math.atan2(d,c),f=Math.max(0,Math.min(1,.5-l/e)),g=(h*n/Math.PI%2+2)%2,_=Math.abs(g-1)*2-1,m=.008+.019*f,p=(u+_*m)/u;r.setX(a,c*p),r.setZ(a,d*p)}r.needsUpdate=!0;let o=s.toNonIndexed();return o.computeVertexNormals(),o}function us(i,t=null,e={}){let n=new lt,s=new lt;n.add(s);let r=e.golden?i.metal(16762941,.2,.88):i.clay(13911080,{rough:.58}),o=e.golden?i.metal(16766814,.18,.88):i.clay(14701880,{rough:.55}),a=e.golden?i.metal(15377704,.24,.82):i.clay(12138014,{rough:.62}),c=e.golden?i.clay(4861448,{rough:.7}):i.clay(6887437,{rough:.84}),l=e.golden?i.metal(16096829,.22,.78):i.clay(15758682,{rough:.52}),d=i.clay(16182496,{rough:.34}),u=i.gloss(1579298,{rough:.12}),h=i.gloss(16777215,{rough:.1}),f=x(ne(new it(.58,32,24),.014,3.5,11,{yScale:.65}),r,{pos:[0,.48,0],scale:[1.26,.78,.96]}),g=x(new Gt(.45,.056,10,28),a,{pos:[0,.25,.01],rot:[Math.PI/2,0,0],scale:[1.22,.92,.68]});s.add(f,g);let _=[.71,.78,.68],m=[-.21,.01,.22];for(let R of[-1,1])for(let E=0;E<3;E++){let S=m[E],I=_[E];s.add(x(oe([[R*.48,.31,S],[R*(I-.07),.22,S*1.06+.01],[R*I,.052,S*1.12+.02]],.056,12,10),o),x(new it(.055,10,8),o,{pos:[R*I,.052,S*1.12+.02]}))}let p=[],M=ig();for(let R of[-1,1]){let E=new lt;E.position.set(R*.48,.48,.12);let S=x(oe([[0,0,0],[R*.19,.13,.11],[R*.24,.27,.17]],.064,12,10),o),I=x(new Gt(.068,.02,8,16),a,{pos:[R*.24,.29,.17],rot:[Math.PI/2-.15,0,R*-.2]}),W=x(M,r,{pos:[R*.24,.43,.19],rot:[.16,R<0?Math.PI-.24:.24,R*.12]});E.add(S,I,W),s.add(E),p.push({pivot:E,sx:R})}for(let R of[-1,1])s.add(x(oe([[R*.14,.78,.13],[R*.152,.95,.165],[R*.158,1.1,.195]],.054,10,10),o),x(new Gt(.068,.018,8,16),a,{pos:[R*.158,1.07,.195],rot:[Math.PI/2-.12,0,0]}),x(new it(.164,24,20),d,{pos:[R*.162,1.21,.205],scale:[.98,1.04,.94]}),x(new it(.088,18,14),u,{pos:[R*.138,1.205,.322]}),x(new it(.027,8,8),h,{pos:[R*.166,1.252,.394],cast:!1}));let v=x(mh(.2,.052,.14,.045),c,{pos:[0,.468,.518],rot:[.02,0,0],cast:!1}),y=x(new it(.1,14,10),l,{pos:[0,.392,.554],scale:[1.18,.5,.46],cast:!1}),L=x(oe([[-.21,.488,.515],[0,.463,.562],[.21,.488,.515],[.135,.365,.525],[0,.34,.54],[-.135,.365,.525]],.019,24,8,!0),a,{cast:!1});s.add(v,y,L);let T=Xs(i,t),A=new lt;return A.position.set(0,t==="halo"?1.5:1.37,.17),A.add(T.group),s.add(A),e.noShadow||we(n,.78,.62,.014,.34,i),{group:de(n,0,"crab"),anim(R,E,S={}){let I=S.mood||"idle",W=I==="happy"||I==="proud"?5.2:I==="focus"?1.4:2.3,F=I==="happy"?.07:.025;s.position.y=Math.abs(Math.sin(R*W))*F,s.rotation.z=Math.sin(R*W*.5)*(I==="happy"?.075:.028),p.forEach(({pivot:k,sx:$},z)=>{let j=I==="happy"||I==="proud"?.22+Math.sin(R*7.5+z*Math.PI)*.24:Math.sin(R*2.1+z*1.4)*.09;k.rotation.z=$*j,k.rotation.x=I==="happy"?-.16:0}),T.anim&&T.anim(R,E,S)}}}function Ri(i,t="jack",e=null,n={}){let s=t==="jackie",r=new lt,o=new lt;o.scale.setScalar(s?.97:1.02),r.add(o);let a=i.clay(15051652,{rough:.58}),c=i.clay(14523507,{rough:.58}),l=i.clay(14649462,{rough:.68}),d=s?2957338:3549474,u=i.clay(d,{rough:.64}),h=i.gloss(1579298,{rough:.12}),f=i.gloss(16777215,{rough:.1}),g=i.clay(7021355,{rough:.8}),_=i.clay(15431792,{rough:.52}),m=i.fabric(15721174,{rough:.74}),p=i.clay(s?15393494:13943988,{rough:.58}),M=i.clay(16184042,{rough:.62}),v=i.fabric(12949619,{rough:.78}),y=i.fabric(4600875,{rough:.76}),L=i.fabric(7893106,{rough:.76}),T=i.fabric(4025254,{rough:.68}),A=i.fabric(4155550,{rough:.74}),R=i.fabric(15392975,{rough:.76}),E=i.clay(14316676,{rough:.42});for(let ft of[-1,1])o.add(x(V(.115,.036,.19,.04,.01),M,{pos:[ft*.095,.018,.018]}),x(new it(.068,14,12),p,{pos:[ft*.095,.058,.022],scale:[.84,.62,1.32]}),x(V(.056,.012,.05,.005,.003),M,{pos:[ft*.095,.088,.045]})),s?o.add(x(new q(.042,.04,.14,14),M,{pos:[ft*.092,.15,0]}),x(new Gt(.043,.01,8,14),M,{pos:[ft*.092,.218,0],rot:[Math.PI/2,0,0]}),x(new q(.042,.039,.3,14),a,{pos:[ft*.092,.36,0]})):o.add(x(new rs(.06,.46,6,12),y,{pos:[ft*.095,.38,0]}),x(new Gt(.06,.014,8,14),y,{pos:[ft*.095,.125,.005],rot:[Math.PI/2,0,0]}));if(s){o.add(x(sg(.128,.23,.265,16),L,{pos:[0,.59,0]}),x(new q(.132,.134,.045,24),L,{pos:[0,.72,0]}),x(V(.28,.34,.185,.07,.024),m,{pos:[0,.89,0]}));for(let ft of[-1,1])o.add(x(V(.064,.022,.074,.01,.005),m,{pos:[ft*.046,1.055,.062],rot:[.42,ft*-.25,ft*-.18]}));o.add(x(oe([[-.018,1.04,.094],[0,.99,.096],[.018,1.04,.094]],.009,8,6),i.clay(14008496),{cast:!1})),o.add(x(new it(.118,16,14),R,{pos:[-.17,.62,-.078],rot:[.1,.15,.08],scale:[.52,1.15,1.05]}),x(V(.068,.026,.21,.01,.006),R,{pos:[-.168,.735,-.074],rot:[.08,.15,.08]}),x(oe([[-.168,.74,-.01],[-.145,1.045,-.01],[-.168,.74,-.125]],.013,14,8),R))}else{o.add(x(V(.285,.14,.185,.06,.02),y,{pos:[0,.63,0]}),x(V(.305,.055,.195,.03,.012),m,{pos:[0,.71,0]}),x(V(.31,.34,.2,.075,.026),v,{pos:[0,.89,0]}),x(V(.32,.042,.206,.025,.01),i.fabric(11699294,{rough:.8}),{pos:[0,.735,0]}));let ft=i.fabric(11896416,{rough:.8});o.add(x(oe([[-.066,1.05,.088],[0,.945,.106],[.066,1.05,.088]],.013,12,8),ft),x(new q(.062,.008,.115,3),m,{pos:[0,1.01,.088],scale:[1.05,1,.25],rot:[0,Math.PI,0]}));for(let Vt of[-1,1])o.add(x(V(.064,.02,.072,.01,.005),m,{pos:[Vt*.048,1.06,.058],rot:[.42,Vt*-.25,Vt*-.18]}));o.add(x(oe([[-.052,1.055,.052],[0,.9,.113],[.052,1.055,.052]],.009,14,8),T),x(V(.066,.088,.012,.008,.004),M,{pos:[0,.855,.116]}),x(V(.066,.018,.014,.005,.003),T,{pos:[0,.892,.117]}),x(V(.26,.3,.12,.055,.02),A,{pos:[0,.895,-.145]}),x(V(.21,.14,.05,.03,.012),A,{pos:[0,.82,-.205]}));for(let Vt of[-1,1])o.add(x(oe([[Vt*.12,1.02,-.09],[Vt*.135,1.04,.02],[Vt*.135,.88,.09]],.018,12,8),A))}let S=x(new q(.05,.054,.11,14),m,{pos:[-.175,.99,.005],rot:[.08,0,.44]}),I=x(new it(.055,12,10),m,{pos:[-.145,1.025,0]}),W=x(new q(.05,.052,.105,14),m,{pos:[.175,.992,.012],rot:[.12,0,-.58]}),F=x(new it(.055,12,10),m,{pos:[.145,1.025,0]}),k=x(new Gt(.044,.011,8,14),m,{pos:[.198,.955,.02],rot:[Math.PI/2-.12,0,-.58]});o.add(S,I,W,F,k),o.add(x(oe([[-.185,.96,.01],[-.222,.81,.042],[-.214,.66,.075]],.041,12,10),a),x(new it(.049,12,10),a,{pos:[-.212,.635,.082],scale:[.92,1.08,.86]}));let $=x(oe([[.182,.962,.01],[.225,.88,.032]],.043,8,10),a),z=new lt;z.position.set(.225,.88,.032),z.add(x(oe([[0,0,0],[.048,.095,.05],[.062,.185,.09]],.039,10,10),a),x(new it(.048,12,10),a,{pos:[.064,.212,.095],scale:[1.02,.96,.74]}),x(new it(.024,10,8),a,{pos:[.064,.218,.12],scale:[1.1,.85,.8]}),x(new rs(.0165,.042,6,10),a,{pos:[.042,.268,.098],rot:[.08,0,.26]}),x(new rs(.0165,.042,6,10),a,{pos:[.086,.268,.098],rot:[.08,0,-.24]})),o.add($,z);let j=x(new q(.054,.058,.11,12),a,{pos:[0,1.11,0]}),X=new lt;X.position.set(0,1.31,0);let ot=x(ne(new it(.19,26,20),.005,7.5,s?21:17),a,{scale:[1,1.04,.96]});X.add(ot);for(let ft of[-1,1])X.add(x(new it(.042,10,10),a,{pos:[ft*.184,-.01,-.01],scale:[.55,1,.75]}));X.add(x(new it(.027,14,12),c,{pos:[0,-.016,.194],scale:[1.05,.9,1.05],cast:!1}));for(let ft of[-1,1])X.add(x(oe([[ft*.036,.06,.178],[ft*.066,.072,.184],[ft*.095,.06,.168]],.013,8,6),u,{cast:!1}),x(new it(.029,14,12),h,{pos:[ft*.064,.014,.171],scale:[.96,1.06,.85],cast:!1}),x(new it(.01,8,8),f,{pos:[ft*.072,.024,.194],cast:!1}),x(new it(.034,10,8),l,{pos:[ft*.106,-.034,.16],scale:[1.05,.68,.16],cast:!1}));if(X.add(x(mh(.056,.016,.046,.022),g,{pos:[0,-.066,.168],cast:!1}),x(new it(.025,10,8),_,{pos:[0,-.084,.184],scale:[1.22,.56,.48],cast:!1})),s){let ft=x(new it(.194,24,18,0,Math.PI*2,0,Math.PI*.54),u,{pos:[0,.018,-.042],rot:[-.46,0,0],cast:!1}),Vt=x(ne(new it(.195,22,18),.008,7,19),u,{pos:[0,.008,-.046],scale:[1.01,1.04,.96],cast:!1}),Y=x(ne(new q(.185,.212,.4,22,3,!1,Math.PI*.46,Math.PI*1.08),.012,8,29),u,{pos:[0,-.155,-.056],cast:!1});X.add(ft,Vt,Y),X.add(x(oe([[-.056,.168,.106],[-.122,.126,.138],[-.168,.032,.118],[-.175,-.12,.068],[-.168,-.3,.022]],.034,16,8),u,{cast:!1}),x(oe([[-.046,.168,.106],[.072,.14,.145],[.156,.066,.134],[.176,-.1,.075],[.17,-.3,.025]],.035,16,8),u,{cast:!1}),x(V(.076,.027,.024,.008,.005),E,{pos:[.146,.114,.18],rot:[.14,.56,-.34],cast:!1}));for(let et=-5;et<=5;et++){let Mt=Math.PI+et*.22,at=Math.sin(Mt)*.172,Rt=Math.cos(Mt)*.162,zt=et%2?.022:-.022;X.add(x(oe([[at*.85,.125,Rt*.84],[at*1.12+zt,-.05,Rt*1.14-.02],[at*1.16-zt,-.22,Rt*1.16-.04],[at*1.08+zt*.5,-.355,Rt*1.1-.03]],.036,14,8),u,{cast:!1}))}}else{let ft=x(new it(.198,24,18,0,Math.PI*2,0,Math.PI*.56),u,{pos:[0,.022,-.028],rot:[-.22,0,0],cast:!1}),Vt=x(ne(new it(.196,22,18),.012,9,31),u,{pos:[0,-.005,-.048],scale:[1.01,1.05,.96],cast:!1}),Y=x(ne(new it(.165,16,12),.01,8,41),u,{pos:[0,-.115,-.105],scale:[1.08,.68,.62],cast:!1});X.add(ft,Vt,Y);let et=[[[.01,.172,.1],[.035,.142,.155],[.055,.112,.174]],[[-.055,.17,.095],[-.08,.138,.15],[-.095,.105,.168]],[[.085,.152,.095],[.122,.122,.14],[.145,.085,.148]],[[-.12,.148,.08],[-.152,.112,.13],[-.168,.068,.135]],[[0,.182,.06],[0,.168,.135],[-.015,.135,.168]],[[.01,.184,-.01],[.04,.228,.02],[.07,.238,.055]],[[-.075,.168,0],[-.105,.2,.025],[-.125,.195,.055]],[[.08,.17,0],[.118,.21,.02],[.145,.212,.05]],[[-.035,.182,-.07],[-.04,.218,-.06],[-.045,.225,-.02]],[[.055,.18,-.075],[.085,.222,-.065],[.105,.228,-.025]],[[-.145,.12,-.01],[-.185,.115,.005],[-.196,.072,.025]],[[.145,.12,-.01],[.185,.12,.005],[.198,.078,.025]],[[-.158,.05,-.04],[-.194,.042,-.032],[-.192,-.015,-.02]],[[.158,.05,-.04],[.194,.042,-.032],[.192,-.015,-.02]],[[0,.165,-.105],[0,.195,-.165],[.01,.175,-.205]],[[-.09,.145,-.105],[-.125,.172,-.165],[-.142,.148,-.195]],[[.09,.145,-.105],[.125,.172,-.165],[.142,.148,-.195]],[[0,.07,-.165],[-.015,.015,-.218],[0,-.05,-.212]],[[-.085,.06,-.15],[-.115,0,-.195],[-.105,-.075,-.185]],[[.085,.06,-.15],[.115,0,-.195],[.105,-.075,-.185]],[[0,-.035,-.175],[.01,-.105,-.2],[0,-.165,-.182]],[[-.075,-.045,-.158],[-.09,-.112,-.178],[-.08,-.162,-.158]],[[.075,-.045,-.158],[.09,-.112,-.178],[.08,-.162,-.158]]];for(let Mt of et)X.add(x(oe(Mt,.038,9,8),u,{cast:!1}))}let ht=Xs(i,e),gt=new lt;return gt.position.set(0,e==="halo"?.34:.21,0),gt.scale.setScalar(.76),gt.add(ht.group),X.add(gt),o.add(j,X),n.noShadow||we(r,.34,.28,.014,.32,i),{group:de(r,s?14:11,t),anim(ft,Vt,Y={}){let et=Y.mood==="happy"||Y.mood==="proud",Mt=et?5:2.6;o.position.y=Math.abs(Math.sin(ft*Mt))*(et?.048:.012),z.rotation.z=Math.sin(ft*(et?7.2:3.2))*(et?.26:.14),X.rotation.z=Math.sin(ft*1.5)*.035,ht.anim&&ht.anim(ft,Vt,Y)}}}function gh(i,t=!1){let e=new lt,s=x(ne(Cn([[.01,-2.15],[.95,-1.98],[2.15,-1.55],[3.25,-1.02],[3.92,-.58],[4.28,-.34],[4.22,-.12]],36),.14,1.45,7,{yScale:.4}),i.clay(10122584,{rough:.68}),{cast:!1}),r=x(ne(new q(4.32,3.88,.36,36,2),.08,1.85,19),i.clay(8160910,{rough:.62}),{pos:[0,-.42,0],cast:!1});e.add(s,r);let o=i.glass(2668236,.72);o.roughness=.16,o.metalness=.08;let a=x(new q(5.65,5.15,.34,48),o,{pos:[0,-.34,0],cast:!1,recv:!0}),c=x(new Gt(5.58,.085,10,56),i.clay(10350839,{rough:.35}),{pos:[0,-.19,0],rot:[Math.PI/2,0,0],cast:!1}),l=i.textured("waterRipple",{rough:.25,transparent:!0,opacity:.72,side:Ce});l.depthWrite=!1;let d=x(new Ee(11.1,11.1),l,{pos:[0,-.155,0],rot:[-Math.PI/2,0,0],cast:!1,recv:!1}),u=x(new Ee(10.6,10.6),l,{pos:[0,-.15,0],rot:[-Math.PI/2,0,.8],cast:!1,recv:!1});e.add(a,c,d,u);let h=x(new q(4.12,4.24,.44,40,1,!0),i.textured("stoneWall",{rough:.65}),{pos:[0,-.23,0]}),f=x(new Gt(4.12,.11,12,48),i.clay(15064528,{rough:.52}),{pos:[0,-.025,0],rot:[Math.PI/2,0,0]});e.add(h,f);let g=x(new q(4.06,4.08,.12,44),i.textured("woodPlank",{finish:"lacquer",rough:.4}),{pos:[0,-.06,0],cast:!1,recv:!0});if(e.add(g),t){let F=x(V(2.55,.04,2.1,.2,.014),i.clay(14662274,{rough:.52}),{pos:[0,.008,-.35],cast:!1,recv:!0});e.add(F)}else{let F=x(new q(1.18,1.22,.036,36),[i.clay(10119224),i.textured("coasterDial",{finish:"lacquer",rough:.36}),i.clay(10119224)],{pos:[0,.006,.35],cast:!1,recv:!0}),k=x(new Gt(1.2,.028,10,40),i.metal(15251784,.24,.8),{pos:[0,.024,.35],rot:[Math.PI/2,0,0],cast:!1});e.add(F,k)}let _=i.clay(8146994,{rough:.62}),m=i.clay(13629692,{rough:.34}),p=i.metal(15251784,.24,.8),M=i.metal(3817551,.38,.72);for(let F=0;F<12;F++){let k=F*Math.PI*2/12+.12,$=Math.cos(k)*4.32,z=Math.sin(k)*4.32;e.add(x(new q(.11,.12,.92,12),_,{pos:[$,-.38,z]}),x(ne(new Gt(.145,.02,6,14),.012,12,F+1),m,{pos:[$,-.175,z],rot:[Math.PI/2,0,F*.5],cast:!1}))}[.52,2.62,-.55,-2.58].forEach((F,k)=>{let $=Math.cos(F)*3.82,z=Math.sin(F)*3.82,j=new lt;if(j.position.set($,0,z),j.add(x(new q(.14,.17,.06,14),M,{pos:[0,.03,0]}),x(new q(.085,.1,.24,14),M,{pos:[0,.16,0]}),x(new it(.105,14,10),p,{pos:[0,.29,0],scale:[1,.6,1]})),k===1){let X=[];for(let ot=0;ot<=26;ot++){let ht=ot/26,gt=.12+ht*.14,ft=ht*Math.PI*5.2;X.push([Math.cos(ft)*gt+.28,.032+ht*.015,Math.sin(ft)*gt+.12])}j.add(x(oe(X,.025,32,7),i.clay(14201980,{rough:.68})))}e.add(j)});let y=x(V(1.02,.24,.06,.03,.012),p,{pos:[0,-.25,4.24],rot:[-.04,0,0]}),L=x(new Ee(.92,.18),i.textured("pierPlaque",{finish:"metal",rough:.26}),{pos:[0,-.25,4.276],rot:[-.04,0,0],cast:!1});e.add(y,L);let T=i.clay(3909732,{rough:.56}),A=i.clay(5817465,{rough:.54}),R=i.clay(10266030,{rough:.6});[[-3.15,-2.05,1.05],[-2.55,-2.75,.85],[2.6,-2.65,.95],[3.2,-1.95,.8],[0,-3.55,1.15]].forEach(([F,k,$],z)=>{let j=new lt;j.position.set(F,0,k),j.scale.setScalar($),j.rotation.y=z*.67%1.2-.5,j.add(x(ne(new it(.28,14,12),.032,6.2,10+z,{flatBottom:!0}),z%2?T:A,{pos:[0,.2,0]}),x(ne(new it(.21,12,10),.025,7.1,20+z,{flatBottom:!0}),z%2?A:T,{pos:[.2,.14,.1]}),x(ne(new it(.19,12,10),.022,7.5,30+z,{flatBottom:!0}),T,{pos:[-.18,.13,.12]}),x(ne(new it(.14,10,8),.022,8.2,40+z,{flatBottom:!0}),R,{pos:[.12,.07,.26],scale:[1.3,.7,1.1]})),e.add(j)});let S=new lt;e.add(S);let I=[];function W(F){for(;S.children.length;)S.remove(S.children[0]);I.length=0;let k=Math.max(0,Math.min(2,F|0));for(let $=0;$<k;$++){let z=$===0?1.15:2.02,j=new lt;j.position.set(Math.cos(z)*4.78,-.14,Math.sin(z)*4.78);let X=x(new Gt(.26,.085,12,24),i.clay(15748670,{rough:.4}),{rot:[Math.PI/2,0,0]}),ot=x(new Gt(.36,.025,8,24),i.emissive(16767832,.55,1.35),{rot:[Math.PI/2,0,0],cast:!1});for(let ht=0;ht<4;ht++){let gt=ht*Math.PI/2;j.add(x(new Gt(.09,.026,8,12),i.clay(16775144,{rough:.42}),{pos:[Math.cos(gt)*.26,0,Math.sin(gt)*.26],rot:[0,-gt,0]}))}j.add(X,ot),S.add(j),I.push({bg:j,phase:$*1.9})}}return{group:e,setShields:W,anim(F){d.rotation.z=F*.06,u.rotation.z=-F*.045+.8,a.position.y=-.34+Math.sin(F*1.35)*.025,c.position.y=-.19+Math.sin(F*1.35)*.025;for(let k of I)k.bg.position.y=-.13+Math.sin(F*2.1+k.phase)*.045,k.bg.rotation.z=Math.sin(F*1.6+k.phase)*.1}}}function rg(i){let t=new lt,e=i.textured("woodPlank",{finish:"lacquer",rough:.44}),n=i.metal(15382596,.2,.86),s=i.gloss(16745640,{rough:.24}),r=i.gloss(16753598,{rough:.24}),o=i.gloss(1974316,{rough:.14}),a=i.textured("coinFace",{finish:"metal",rough:.2});for(let f of[-.34,0,.34])t.add(x(V(1.06,.075,.25,.03,.012),e,{pos:[0,.105,f]}));for(let f of[-.42,0,.42])t.add(x(V(.12,.07,.92,.02,.01),i.clay(10119226),{pos:[f,.035,0]}));let c=new lt;c.position.set(0,.14,0),c.rotation.y=-Math.PI*.58;let l=x(new it(.42,28,22),s,{pos:[0,.38,0],scale:[1.18,.94,.94]}),d=x(new q(.145,.165,.14,22),r,{pos:[.47,.36,0],rot:[0,0,-Math.PI/2],scale:[.85,1,1.15]});for(let f of[-.045,.045])c.add(x(new it(.028,10,8),i.clay(12995954),{pos:[.54,.37,f],scale:[.5,1.3,.8]}));for(let f of[-1,1])c.add(x(new We(.11,.19,14),s,{pos:[.18,.72,f*.19],rot:[f*.42,0,-.35]})),c.add(x(new it(.048,12,10),o,{pos:[.435,.49,f*.175]}),x(new it(.017,8,8),i.gloss(16777215),{pos:[.474,.508,f*.185],cast:!1}),x(new it(.068,10,8),i.gloss(16736141),{pos:[.395,.36,f*.28],scale:[.55,.65,.4],cast:!1}));for(let[f,g]of[[-.24,-.18],[-.24,.18],[.22,-.18],[.22,.18]])c.add(x(new q(.088,.072,.19,14),s,{pos:[f,.095,g]}));let u=[];for(let f=0;f<=18;f++){let g=f/18,_=g*Math.PI*3.4;u.push([-.47-g*.14,.44+Math.sin(_)*.055,Math.cos(_)*.055])}c.add(x(oe(u,.026,22,8),s)),c.add(x(V(.24,.036,.075,.02,.008),n,{pos:[0,.77,0]}),x(V(.18,.02,.03,.006,.004),o,{pos:[0,.785,0],cast:!1})),c.add(l,d),t.add(c);let h=x(new q(.16,.16,.036,24),[n,a,a],{pos:[0,1.18,0],rot:[Math.PI/2,0,0]});t.add(h);for(let f=0;f<3;f++)t.add(x(new q(.095,.095,.026,18),[n,a,a],{pos:[.38,.158+f*.027,.28]}));return we(t,.65,.56,.008,.34,i),{group:de(t,1,"piggy"),anim(f){h.rotation.z=f*2.4,h.position.y=1.15+Math.sin(f*2.8)*.06}}}function og(i){let t=new lt,e=i.textured("woodPlank",{finish:"lacquer",rough:.44}),n=i.enamel(16774626,{rough:.28}),s=i.metal(14856516,.22,.85),r=i.metal(3816780,.36,.74),o=i.textured("pineappleCrust",{finish:"glaze",rough:.2}),a=i.clay(14919768,{rough:.5}),c=i.textured("stripeRed",{finish:"fabric",rough:.7,side:Ce});for(let A of[-.46,.46]){let R=new lt;R.position.set(-.28,.28,A),R.add(x(new Gt(.25,.036,12,26),i.clay(8145446)),x(new Gt(.275,.014,8,26),r),x(new q(.055,.055,.08,12),s,{rot:[Math.PI/2,0,0]}));for(let E=0;E<6;E++)R.add(x(new q(.014,.014,.48,8),i.clay(10117686),{rot:[0,0,E*Math.PI/6]}));t.add(R)}for(let A of[-.34,.34])t.add(x(new q(.025,.025,.2,8),r,{pos:[.46,.18,A]}),x(V(.06,.11,.08,.015,.005),r,{pos:[.46,.11,A]}),x(new q(.085,.085,.045,16),r,{pos:[.46,.085,A],rot:[Math.PI/2,0,0]}));let l=x(V(1.22,.58,.78,.06,.02),e,{pos:[0,.54,0]}),d=x(V(1.32,.08,.88,.04,.016),n,{pos:[0,.85,0]}),u=x(oe([[-.6,.76,-.32],[-.82,.86,-.32],[-.82,.86,.32],[-.6,.76,.32]],.026,20,8),s);t.add(l,d,u);let h=x(V(.76,.44,.64,.03,.01),i.glass(15399167,.36),{pos:[-.14,1.11,0],cast:!1}),f=x(V(.7,.028,.56,.01,.005),n,{pos:[-.14,1.08,0]});t.add(h,f),[[-.34,.94,-.14],[-.14,.94,-.14],[.06,.94,-.14],[-.32,.94,.14],[-.12,.94,.14],[-.24,1.14,0],[0,1.14,0]].forEach(([A,R,E],S)=>{let I=new lt;I.position.set(A,R,E),I.rotation.y=S*.45-.6,I.add(x(new q(.085,.075,.055,16),a,{pos:[0,.025,0]}),x(ne(new it(.095,16,12,0,Math.PI*2,0,Math.PI*.62),.011,22,22+S,{flatBottom:!0}),o,{pos:[0,.045,0],scale:[1,.85,1]})),S===5&&I.add(x(V(.11,.03,.09,.008,.004),i.gloss(16770680),{pos:[.03,.052,.04],rot:[.1,.4,.12]})),t.add(I)});let _=x(Cn([[0,0],[.14,0],[.16,.28],[.13,.36],[.06,.42],[.03,.46],[0,.47]],20),s,{pos:[.42,.89,-.1]}),m=x(new q(.016,.016,.09,8),r,{pos:[.42,1,.08],rot:[Math.PI/2,0,0]}),p=x(new q(.055,.042,.09,14),n,{pos:[.44,.935,.22]}),M=x(new q(.048,.048,.01,14),i.gloss(11888682),{pos:[.44,.978,.22],cast:!1});t.add(_,m,p,M);for(let[A,R]of[[-.58,-.36],[.58,-.36],[-.58,.36],[.58,.36]])t.add(x(new q(.022,.022,.94,10),s,{pos:[A,1.34,R]}),x(new it(.038,10,8),s,{pos:[A,1.82,R]}));let v=x(V(1.44,.06,.98,.04,.015),c,{pos:[0,1.84,.02],rot:[.12,0,0]}),y=x(new be(1.42,.14,.03),c,{pos:[0,1.72,.49]}),L=x(new be(1.42,.11,.03),c,{pos:[0,1.83,-.45]});t.add(v,y,L);let T=new lt;return T.position.set(.84,0,.18),T.rotation.y=-.35,T.add(x(V(.46,.56,.05,.03,.01),i.clay(10117686),{pos:[0,.34,0],rot:[-.18,0,0]}),x(new Ee(.4,.48),i.textured("chalkboard",{rough:.65}),{pos:[0,.34,.028],rot:[-.18,0,0],cast:!1}),x(V(.4,.48,.04,.02,.008),i.clay(8146474),{pos:[0,.3,-.14],rot:[.22,0,0]})),t.add(T),we(t,.92,.66,.008,.34,i),{group:de(t,2,"bakery"),anim(A){v.rotation.x=.12+Math.sin(A*2)*.012}}}function ag(i){let t=new lt,e=i.enamel(1349259,{rough:.24}),n=i.enamel(1010532,{rough:.28}),s=i.enamel(16774627,{rough:.26}),r=i.metal(15777350,.22,.84),o=i.emissive(3601096,.8,1.9,{transparent:!0,opacity:.85});t.add(x(V(1.06,.12,.86,.12,.024),n,{pos:[0,.06,0]}),x(V(.92,1.38,.72,.12,.03),s,{pos:[0,.8,0]}),x(V(.96,.24,.76,.1,.02),e,{pos:[0,.24,0]}),x(V(1.18,.14,1.04,.18,.032),e,{pos:[0,1.56,.1],rot:[-.08,0,0]}),x(V(.9,.05,.18,.03,.01),i.emissive(16773298,.7,1.6),{pos:[0,1.48,.48],cast:!1})),t.add(x(V(.68,.5,.06,.05,.014),n,{pos:[0,1.12,.35]}),x(new Ee(.6,.42),i.textured("kioskScreen",{finish:"glaze",rough:.18,emissive:!0,baseEmissive:.55,nightEmissive:1.45}),{pos:[0,1.12,.384],cast:!1}));let a=x(V(.92,.1,.36,.05,.016),s,{pos:[0,.72,.44]}),c=x(new q(.14,.15,.04,22),i.clay(2634564),{pos:[-.2,.79,.48],rot:[.22,0,0]}),l=x(new Gt(.12,.018,10,24),o,{pos:[-.2,.815,.485],rot:[Math.PI/2+.22,0,0],cast:!1}),d=x(V(.22,.14,.022,.025,.005),i.gloss(16753720),{pos:[-.2,.94,.52],rot:[.35,.15,-.12]});t.add(a,c,l,d);let u=i.textured("passbook",{rough:.48});for(let h=0;h<3;h++)t.add(x(V(.24,.042,.32,.02,.008),h===2?u:h===1?i.clay(16745570):e,{pos:[.24,.795+h*.044,.46],rot:[0,.14*(h-1),0]}));for(let h=0;h<4;h++)t.add(x(V(.56,.045,.04,.01,.006),n,{pos:[0,.52+h*.12,-.36]}));return t.add(x(new q(.028,.028,1.15,10),r,{pos:[.32,.74,-.38]})),we(t,.72,.62,.008,.34,i),{group:de(t,3,"kiosk"),anim(h){let f=.85+.28*(h*.9%1);l.scale.setScalar(f),d.position.y=.94+Math.sin(h*2.8)*.045,d.rotation.z=-.12+Math.sin(h*2.8)*.08}}}function cg(i){let t=new lt,e=i.clay(16642264,{rough:.52}),n=i.clay(14185556,{rough:.48}),s=i.enamel(2059868,{rough:.28}),r=i.emissive(16770200,.66,1.85),o=i.emissive(16763254,.56,1.65),a=i.clay(14201438,{rough:.55}),c=i.clay(8959060,{rough:.54}),l=i.clay(2631988,{rough:.65});t.add(x(V(2.06,.14,1.66,.06,.02),i.clay(13354166),{pos:[0,.07,0]}),x(V(1.94,1.04,1.52,.06,.024),e,{pos:[0,.64,0]}),x(V(2.14,.14,1.72,.06,.024),n,{pos:[0,1.19,0]}));for(let _ of[-.88,-.3,.3,.88])t.add(x(V(.14,1.02,.16,.03,.012),e,{pos:[_,.62,.78]}));t.add(x(V(.5,.72,.06,.02,.008),s,{pos:[0,.49,.76]}));for(let _=-2;_<=2;_++)t.add(x(new be(.025,.66,.08),i.clay(1264704),{pos:[_*.09,.49,.77]}));for(let[_,m]of[-.59,.59].entries())t.add(x(V(.38,.48,.06,.04,.01),s,{pos:[m,.64,.76]}),x(V(.3,.4,.07,.03,.008),_%2?o:r,{pos:[m,.64,.77],cast:!1}),x(new be(.022,.38,.08),s,{pos:[m,.64,.78]}));for(let[_,m]of[-.52,0,.52].entries())t.add(x(V(.34,.44,.06,.04,.01),s,{pos:[m,.66,-.76]}),x(V(.26,.36,.07,.03,.008),_===1?o:r,{pos:[m,.66,-.77],cast:!1}),x(new be(.26,.022,.08),s,{pos:[m,.68,-.78]}));for(let _ of[-1,1])for(let[m,p]of[-.34,.34].entries())t.add(x(V(.06,.44,.36,.03,.01),s,{pos:[_*.97,.66,p]}),x(V(.07,.36,.28,.02,.008),m%2?o:r,{pos:[_*.98,.66,p],cast:!1}));t.add(x(V(1.18,.32,.08,.03,.012),i.enamel(1593162,{rough:.28}),{pos:[0,1.05,.85]}),x(new Ee(1.1,.26),i.textured("shopBanner",{finish:"lacquer",rough:.3}),{pos:[0,1.05,.895],cast:!1}));let d=new lt,u=new q(.024,.026,1.48,8),h=new q(.022,.022,1.85,8),f=new q(.022,.022,1.25,8);for(let _=0;_<4;_++){let m=-.82+_*.55;d.add(x(u,_%2?c:a,{pos:[-1.14,.74,m]}))}for(let _ of[.34,.78,1.22]){d.add(x(h,a,{pos:[-1.14,_,0],rot:[Math.PI/2,0,0]}));for(let m=0;m<4;m++)d.add(x(new it(.034,6,6),l,{pos:[-1.14,_,-.82+m*.55],cast:!1}))}d.add(x(new q(.02,.02,2.05,8),c,{pos:[-1.16,.76,0],rot:[.95,0,0]}),x(V(.24,.04,1.72,.015,.006),i.clay(12092492),{pos:[-1.06,.79,0]}));for(let _ of[.64,1.12])d.add(x(u,a,{pos:[_,.74,.94]}));for(let _ of[.42,.95])d.add(x(f,c,{pos:[.88,_,.94],rot:[0,0,Math.PI/2]}));let g=x(new be(.46,.48,.02),i.glass(2668664,.65),{pos:[.88,.68,.96],cast:!1});return d.add(g),t.add(d),{group:de(t,4,"floor1"),anim(_){g.rotation.x=Math.sin(_*2.2)*.04}}}function lg(i){let t=new lt,e=i.textured("woodPlank",{finish:"lacquer",rough:.46}),n=i.textured("riceSack",{finish:"fabric",rough:.76}),s=i.fabric(13185322,{rough:.64}),r=i.clay(14464108,{rough:.54}),o=i.clay(11173180,{rough:.56}),a=i.gloss(2532256,{rough:.14});t.add(x(V(1.26,.1,.92,.05,.018),e,{pos:[0,.05,0]}));let c=ne(Cn([[0,0],[.28,0],[.36,.16],[.35,.46],[.25,.68],[.13,.78],[.22,.9],[.16,.92],[0,.82]],26),.018,4.5,51,{flatBottom:!0}),l=x(c,n,{pos:[-.24,.1,.02],scale:[1.05,1,.88]}),d=x(new Gt(.145,.026,10,22),s,{pos:[-.24,.88,.02],rot:[Math.PI/2,0,0]}),u=x(new it(.055,10,8),s,{pos:[-.12,.88,.14],scale:[1.4,.75,.6]}),h=x(new it(.055,10,8),s,{pos:[-.36,.88,.14],scale:[1.4,.75,.6]});t.add(l,d,u,h);let f=new lt;f.position.set(.32,.1,-.08);for(let M=0;M<3;M++){let v=.09+M*.16;f.add(x(new q(.24,.24,.15,22),r,{pos:[0,v,0]}),x(new Gt(.242,.018,8,24),o,{pos:[0,v+.06,0],rot:[Math.PI/2,0,0]}))}for(let M=0;M<3;M++){let v=M*Math.PI*2/3+.4;f.add(x(ne(new it(.068,12,10),.008,24,52+M,{flatBottom:!0}),i.clay(16774620,{rough:.36}),{pos:[Math.cos(v)*.1,.51,Math.sin(v)*.1],scale:[1.1,.78,.9]}))}let g=x(new q(.245,.25,.055,22),r,{pos:[.06,.56,-.05],rot:[.22,0,-.26]});g.add(x(new Gt(.05,.014,8,14),o,{pos:[0,.04,0],rot:[0,0,0]})),f.add(g);let _=i.glass(16777215,.48),m=[];for(let M=0;M<4;M++){let v=x(new it(.065+M%2*.02,10,8),_,{pos:[0,.65+M*.16,0],cast:!1});m.push({m:v,phase:M*.25}),f.add(v)}t.add(f);let p=new lt;return p.position.set(.28,.1,.3),p.add(x(new it(.14,18,14),a,{pos:[0,.12,0],scale:[1.08,.86,1.08]}),x(new q(.08,.095,.04,16),a,{pos:[0,.23,0]}),x(new it(.032,10,8),a,{pos:[0,.265,0]}),x(oe([[.12,.1,0],[.22,.16,0],[.25,.22,0]],.024,12,8),a),x(oe([[-.12,.16,0],[-.21,.14,0],[-.14,.07,0]],.02,12,8),a),x(new q(.042,.032,.055,12),a,{pos:[.26,.028,.12]}),x(new q(.042,.032,.055,12),a,{pos:[.14,.028,.19]})),t.add(p),we(t,.72,.56,.008,.34,i),{group:de(t,5,"pantry"),anim(M){for(let v of m){let y=(M*.38+v.phase)%1;v.m.position.y=.6+y*.58,v.m.position.x=Math.sin(y*Math.PI*2+v.phase*6)*.07,v.m.scale.setScalar(.55+y*.95)}}}}function hg(i){let t=new lt,e=i.clay(16770539,{rough:.48}),n=i.textured("checkerTile",{finish:"glaze",rough:.22}),s=i.enamel(1797474,{rough:.28}),r=i.emissive(16768128,.7,1.95),o=i.emissive(16759912,.54,1.6),a=i.metal(2895936,.34,.78),c=i.emissive(16736168,1.1,2.6),l=i.emissive(3732444,1,2.5),d=i.emissive(16769638,.95,2.3),u=i.textured("neonSign",{finish:"glaze",rough:.18,emissive:!0,baseEmissive:.85,nightEmissive:2});t.add(x(V(1.88,1.04,1.46,.06,.024),e,{pos:[0,.54,0]}),x(V(1.92,.3,1.5,.04,.012),n,{pos:[0,.19,0]}),x(V(2.04,.13,1.62,.06,.022),s,{pos:[0,1.09,0]}));for(let[g,_]of[-.52,0,.52].entries())for(let m of[-1,1])t.add(x(V(.36,.48,.06,.08,.01),s,{pos:[_,.64,m*.73]}),x(V(.28,.4,.07,.06,.008),(g+(m>0?0:1))%3===1?o:r,{pos:[_,.64,m*.74],cast:!1}),x(new be(.28,.022,.075),s,{pos:[_,.66,m*.745]}));for(let g of[-.32,.32])t.add(x(V(.06,.48,.36,.06,.01),s,{pos:[-.94,.64,g]}),x(V(.07,.4,.28,.05,.008),g<0?o:r,{pos:[-.95,.64,g],cast:!1}));t.add(x(V(.34,.24,.2,.03,.008),i.clay(14936042),{pos:[-.62,.36,-.82]}),x(new q(.085,.085,.03,14),i.clay(3817548),{pos:[-.66,.36,-.92],rot:[Math.PI/2,0,0]}));let h=new lt;h.position.set(.94,.68,.1),h.scale.setScalar(1.18),h.add(x(new q(.022,.022,.42,8),a,{pos:[.2,.28,0],rot:[0,0,Math.PI/2]}),x(new q(.022,.022,.42,8),a,{pos:[.2,-.24,0],rot:[0,0,Math.PI/2]}),x(new q(.018,.018,.56,8),a,{pos:[.16,.02,0],rot:[0,0,.72]}),x(V(1.06,.64,.14,.06,.018),i.clay(1580344,{rough:.36}),{pos:[.84,.04,0]}),x(new Ee(.94,.52),u,{pos:[.84,.04,.075],cast:!1}),x(new Ee(.94,.52),u,{pos:[.84,.04,-.075],rot:[0,Math.PI,0],cast:!1}));for(let g of[-.082,.082])h.add(x(oe([[.34,-.25,g],[1.34,-.25,g],[1.34,.33,g],[.34,.33,g]],.018,28,8,!0),l,{cast:!1}));let f=new lt;return f.position.set(.84,.48,0),f.add(x(new Gt(.11,.018,8,20,Math.PI),c,{rot:[0,0,Math.PI],cast:!1}),x(new q(.018,.018,.24,8),c,{rot:[0,0,Math.PI/2],cast:!1}),x(new Gt(.045,.014,8,12),d,{pos:[.12,-.04,0],cast:!1})),h.add(f),t.add(h),{group:de(t,6,"neon"),anim(g){let _=1+Math.sin(g*4.5)*.06;f.scale.setScalar(_)}}}function ug(i){let t=new lt,e=i.enamel(1473100,{rough:.24}),n=i.enamel(1005110,{rough:.28}),s=i.enamel(16775142,{rough:.24}),r=i.clay(12090436,{rough:.48}),o=i.metal(15778376,.2,.86),a=i.emissive(16770716,.55,1.75),c=i.glass(15400191,.62),l=new lt;l.position.set(-.1,.05,0);let d=x(V(1.78,.28,.66,.26,.04),e,{pos:[0,.14,0]}),u=x(V(1.84,.06,.72,.28,.015),s,{pos:[0,.27,0]}),h=x(V(1.42,.24,.56,.14,.02),s,{pos:[0,.41,0]}),f=x(V(1.22,.28,.54,.12,.02),s,{pos:[0,.65,0]}),g=x(V(1.32,.07,.6,.14,.018),n,{pos:[0,.81,0]});l.add(d,u,h,f,g);for(let T=-2;T<=2;T++)for(let A of[-1,1])l.add(x(new Gt(.05,.014,8,14),o,{pos:[T*.24,.41,A*.285]}),x(new q(.042,.042,.02,12),a,{pos:[T*.24,.41,A*.28],rot:[Math.PI/2,0,0],cast:!1}),x(V(.16,.14,.03,.02,.005),a,{pos:[T*.22,.65,A*.27],cast:!1}));for(let T of[-.74,.74])l.add(x(V(.14,.06,.36,.02,.006),r,{pos:[T,.33,0]}));let _=x(new q(.11,.13,.36,18),s,{pos:[0,1.01,0]}),m=x(new q(.115,.115,.08,18),n,{pos:[0,1.17,0]}),p=ng(.075,.032,.02);l.add(_,m,x(p,o,{pos:[0,1,.125]}),x(p,o,{pos:[0,1,-.125]}),x(new it(.036,10,8),i.emissive(16728642,.9,2.2),{pos:[.6,.86,.25],cast:!1}),x(new it(.036,10,8),i.emissive(3600522,.9,2.2),{pos:[.6,.86,-.25],cast:!1}));let M=i.clay(14678524,{rough:.36}),v=x(oe([[-.82,.02,.16],[-1.14,.015,.32],[-1.36,.01,.44]],.022,12,8),M,{scale:[1,.24,1],cast:!1}),y=x(oe([[-.82,.02,-.16],[-1.14,.015,-.32],[-1.36,.01,-.44]],.022,12,8),M,{scale:[1,.24,1],cast:!1});l.add(v,y),t.add(l);let L=new lt;L.position.set(.84,.14,.56),L.add(x(new Gt(.22,.075,14,28),i.enamel(15748670,{rough:.24}),{rot:[Math.PI/2,0,0]}),x(new Gt(.32,.02,8,28),o,{rot:[Math.PI/2,0,0]}));for(let T=0;T<4;T++){let A=T*Math.PI/2;L.add(x(new Gt(.078,.022,8,12),s,{pos:[Math.cos(A)*.22,0,Math.sin(A)*.22],rot:[0,-A,0]}),x(new q(.01,.01,.62,6),o,{pos:[0,-.02,0],rot:[Math.PI/2,A+Math.PI/4,0]}))}return t.add(L),{group:de(t,7,"ferry"),anim(T){l.position.y=.05+Math.sin(T*2)*.04,l.rotation.z=Math.sin(T*1.5)*.04,l.rotation.x=Math.cos(T*1.8)*.03,L.position.y=.14+Math.sin(T*2.4+1.2)*.045,L.rotation.y=T*.6}}}function dg(i){let t=new lt,e=i.enamel(5992078,{rough:.26,metalness:.26}),n=i.metal(16105272,.2,.88),s=i.metal(13734940,.24,.84),r=i.emissive(2945682,1,2.4),o=i.textured("coinFace",{finish:"metal",rough:.2});t.add(x(V(.94,.96,.86,.1,.03),e,{pos:[-.08,.54,-.04]}),x(V(.78,.8,.09,.07,.02),s,{pos:[-.08,.54,.39]}),x(V(.76,.78,.05,.05,.012),i.enamel(4938872,{rough:.3,metalness:.24}),{pos:[-.08,.54,-.47]}),x(new q(.042,.042,.16,12),n,{pos:[-.54,.76,.36]}),x(new q(.042,.042,.16,12),n,{pos:[-.54,.32,.36]}),x(new it(.042,12,10),r,{pos:[.18,.82,.445],cast:!1}));for(let[l,d]of[[-.4,-.34],[.24,-.34],[-.4,.26],[.24,.26]])t.add(x(new q(.07,.08,.08,12),s,{pos:[l,.04,d]}));let a=new lt;a.position.set(-.08,.54,.47),a.add(x(new Gt(.2,.032,12,26),n),x(new q(.065,.065,.06,16),n,{rot:[Math.PI/2,0,0]}));for(let l=0;l<4;l++)a.add(x(new q(.02,.02,.38,8),n,{rot:[0,0,l*Math.PI/4]}));t.add(a);let c=new lt;c.position.set(.56,0,.28),c.rotation.y=-.32,c.add(x(V(.46,.42,.2,.07,.026),n,{pos:[0,.21,0]}),x(new Gt(.15,.042,12,24,Math.PI),i.metal(16769400,.18,.88),{pos:[0,.41,0]}),x(new q(.042,.042,.12,12),i.metal(16769400,.18,.88),{pos:[-.15,.39,0]}),x(new q(.042,.042,.12,12),i.metal(16769400,.18,.88),{pos:[.15,.39,0]}),x(new q(.042,.042,.03,12),i.clay(2629656),{pos:[0,.25,.1],rot:[Math.PI/2,0,0],cast:!1}),x(new be(.034,.1,.03),i.clay(2629656),{pos:[0,.18,.1],cast:!1})),t.add(c);for(let[l,d,u]of[[.56,-.18,5],[.76,.02,3]])for(let h=0;h<u;h++)t.add(x(new q(.11,.11,.036,20),[n,o,o],{pos:[l,.02+h*.038,d]}));return we(t,.82,.68,.008,.35,i),{group:de(t,8,"vault"),anim(l){a.rotation.z=Math.sin(l*.9)*.8}}}function fg(i){let t=new lt,e=i.clay(14480878,{rough:.5}),n=i.clay(16774885,{rough:.48}),s=i.metal(2055246,.36,.72),r=i.emissive(16770976,.64,1.85),o=i.emissive(16763514,.52,1.6),a=i.clay(13938268,{rough:.54});t.add(x(V(1.82,.98,1.4,.06,.022),e,{pos:[0,.51,0]}),x(V(1.98,.13,1.56,.06,.022),n,{pos:[0,1.04,0]}));for(let[u,h]of[-.46,0,.46].entries())for(let f of[-1,1])t.add(x(V(.32,.56,.05,.04,.01),n,{pos:[h,.56,f*.7]}),x(V(.24,.46,.06,.03,.008),u===2?o:r,{pos:[h,.56,f*.71],cast:!1}),x(new be(.02,.46,.065),s,{pos:[h,.56,f*.715]}));t.add(x(V(2.04,.08,.42,.04,.012),n,{pos:[0,.06,.84]})),t.add(x(V(2.02,.045,.045,.01,.005),s,{pos:[0,.42,1.02]}));for(let u=-4;u<=4;u++)t.add(x(new q(.014,.014,.36,6),s,{pos:[u*.23,.24,1.02]})),u<4&&t.add(x(new Gt(.055,.011,6,12),s,{pos:[u*.23+.115,.26,1.02]}));for(let u of[-1,1])t.add(x(V(.045,.045,.38,.01,.005),s,{pos:[u,.42,.84]}),x(new q(.014,.014,.36,6),s,{pos:[u,.24,.84]}));t.add(x(new q(.14,.14,.03,16),i.gloss(16776696),{pos:[.58,.24,.86]}),x(new q(.025,.04,.18,10),s,{pos:[.58,.14,.86]}),x(new q(.065,.065,.05,12),a,{pos:[.58,.28,.86]}),x(new q(.075,.055,.12,12),i.clay(14052420),{pos:[-.68,.15,.86]}),x(new it(.1,10,8),i.clay(3909732),{pos:[-.68,.25,.86]}));let c=new lt;c.position.set(-.92,.66,0);let l=[];return[{z:.24,tilt:.18,items:[{x:-.32,col:16739211,w:.22,h:.3},{x:-.64,col:6079743,w:.2,h:.28}]},{z:-.24,tilt:.12,items:[{x:-.36,col:16765516,w:.24,h:.26},{x:-.68,col:16774885,w:.18,h:.34}]}].forEach((u,h)=>{let f=x(new q(.018,.022,.96,8),a,{pos:[-.44,.08,u.z],rot:[0,0,Math.PI/2-u.tilt]});c.add(f),u.items.forEach((g,_)=>{let m=new lt;m.position.set(g.x,.08+(-g.x-.04)*Math.tan(u.tilt)*.45,u.z);let p=x(V(g.w,g.h,.045,.03,.01),i.fabric(g.col,{rough:.7}),{pos:[0,-g.h*.52,0]});g.w>=.2&&p.add(x(V(.07,.1,.04,.02,.008),i.fabric(g.col,{rough:.7}),{pos:[-g.w*.55,.06,0],rot:[0,0,.4]}),x(V(.07,.1,.04,.02,.008),i.fabric(g.col,{rough:.7}),{pos:[g.w*.55,.06,0],rot:[0,0,-.4]}));let M=x(new be(.024,.055,.03),i.clay(10118196),{pos:[0,.01,0]});m.add(p,M),c.add(m),l.push({pivot:m,phase:h*1.7+_*.9})})}),t.add(c),{group:de(t,9,"laundry"),anim(u){for(let h of l)h.pivot.rotation.x=Math.sin(u*2.2+h.phase)*.18}}}function pg(i){let t=new lt,e=i.textured("stoneWall",{rough:.65}),n=i.enamel(14828344,{rough:.26}),s=i.enamel(16774886,{rough:.28}),r=i.metal(2633020,.34,.8),o=i.metal(15777348,.2,.86),a=i.emissive(16771194,1.35,3),c=i.emissive(16770168,.45,1.15,{transparent:!0,opacity:.14,depthWrite:!1,side:Ce});t.add(x(new q(.62,.7,.24,8),e,{pos:[0,.12,0]}),x(new q(.5,.56,.16,8),i.clay(14275269),{pos:[0,.32,0]}),x(V(.24,.32,.08,.08,.014),i.clay(8145446),{pos:[0,.56,.41]}),x(new it(.022,8,8),o,{pos:[.06,.54,.46]}));for(let[g,_,m,p]of[[0,-.58,.36,.16],[1,.62,.28,.14],[2,-.46,-.52,.18],[3,.52,-.48,.15]])t.add(x(ne(new it(p,10,8),.028,8.2,100+g,{flatBottom:!0}),i.clay(9344670,{rough:.64}),{pos:[_,p*.55,m],scale:[1.25,.72,1.05]}));let l=[{y:.54,h:.32,rB:.44,rT:.4,mat:s},{y:.86,h:.32,rB:.4,rT:.36,mat:n},{y:1.18,h:.32,rB:.36,rT:.325,mat:s},{y:1.5,h:.32,rB:.325,rT:.29,mat:n},{y:1.76,h:.2,rB:.29,rT:.275,mat:s}];for(let g of l)t.add(x(new q(g.rT,g.rB,g.h,24),g.mat,{pos:[0,g.y,0]}));t.add(x(V(.46,.28,.06,.04,.01),o,{pos:[0,1.16,.34]}),x(new Ee(.4,.23),i.textured("badge18222",{finish:"glaze",rough:.22}),{pos:[0,1.16,.375],cast:!1}));for(let g of[Math.PI*.5,Math.PI,Math.PI*1.5])t.add(x(new Gt(.055,.016,8,14),o,{pos:[Math.sin(g)*.34,1.18,Math.cos(g)*.34],rot:[0,g,0]}));t.add(x(new q(.44,.3,.1,24),r,{pos:[0,1.9,0]}),x(new Gt(.41,.018,8,28),r,{pos:[0,2.08,0],rot:[Math.PI/2,0,0]}));for(let g=0;g<12;g++){let _=g*Math.PI*2/12;t.add(x(new q(.012,.012,.16,6),r,{pos:[Math.cos(_)*.41,2,Math.sin(_)*.41]}))}t.add(x(new q(.24,.24,.36,20),i.glass(15399167,.38),{pos:[0,2.13,0],cast:!1}),x(new it(.14,16,14),a,{pos:[0,2.14,0],cast:!1}),x(new it(.27,20,14,0,Math.PI*2,0,Math.PI*.55),n,{pos:[0,2.31,0]}),x(new q(.014,.025,.24,8),o,{pos:[0,2.66,0]}),x(new it(.045,10,8),o,{pos:[0,2.57,0]}));let d=new lt;d.position.set(0,2.14,0);let u=new We(.36,1.45,18,1,!0),h=x(u,c,{pos:[0,0,.84],rot:[-Math.PI/2,0,0],cast:!1,recv:!1}),f=x(u,c,{pos:[0,0,-.84],rot:[Math.PI/2,0,0],cast:!1,recv:!1});return h.userData.ignoreBounds=!0,f.userData.ignoreBounds=!0,d.add(h,f),t.add(d),we(t,.74,.74,.008,.36,i),{group:de(t,10,"lighthouse"),anim(g){d.rotation.y=g*1.15}}}function mg(i){let t=new lt,e=Ri(i,"jack",null,{noShadow:!0});e.group.position.set(-.28,.06,0),e.group.scale.setScalar(.8),t.add(e.group),t.add(x(V(1.26,.06,.86,.1,.015),i.textured("woodPlank",{rough:.58}),{pos:[0,.03,0]}));let n=i.enamel(1349259,{rough:.26}),s=i.metal(15777348,.2,.86),r=i.textured("coinFace",{finish:"metal",rough:.2}),o=new lt;o.position.set(.32,.06,.04),o.rotation.y=-.24,o.add(x(V(.56,.32,.4,.04,.016),n,{pos:[0,.16,0]}),x(V(.58,.055,.42,.02,.008),s,{pos:[0,.06,0]}),x(V(.58,.055,.42,.02,.008),s,{pos:[0,.28,0]}),x(V(.11,.13,.04,.03,.008),i.emissive(4978120,.65,1.5),{pos:[0,.24,.21]}));let a=new lt;a.position.set(0,.32,-.18),a.rotation.x=-.58,a.add(x(new q(.2,.2,.56,16,1,!1,0,Math.PI),n,{pos:[0,0,.18],rot:[0,0,Math.PI/2]}),x(new Gt(.205,.02,8,16,Math.PI),s,{pos:[-.22,0,.18],rot:[0,Math.PI/2,0]}),x(new Gt(.205,.02,8,16,Math.PI),s,{pos:[.22,0,.18],rot:[0,Math.PI/2,0]})),o.add(a);for(let c=0;c<6;c++)o.add(x(new q(.085,.085,.032,16),[s,r,r],{pos:[-.14+c%3*.14,.31+Math.floor(c/3)*.034,-.04+c%2*.09],rot:[.18*(c%2?1:-1),c,.14]}));return t.add(o),we(t,.72,.52,.008,.34,i),{group:de(t,11,"jack"),anim(c,l,d){e.anim(c,l,d)}}}function gg(i){let t=new lt,e=i.clay(15920380,{rough:.5}),n=i.clay(14183244,{rough:.48}),s=i.clay(10775612,{rough:.54}),r=i.emissive(16768900,.7,1.9),o=i.clay(3119692,{rough:.52}),a=i.gloss(16745496,{rough:.14}),c=i.textured("laisee",{finish:"lacquer",rough:.3});t.add(x(V(1.76,.98,1.36,.06,.022),e,{pos:[0,.5,0]}),x(V(1.92,.13,1.52,.06,.022),n,{pos:[0,1.04,0]}),x(V(.68,.14,.44,.03,.01),i.clay(3818070),{pos:[-.26,1.12,.22],rot:[.22,0,0]}),x(V(.58,.04,.36,.02,.006),r,{pos:[-.26,1.18,.23],rot:[.22,0,0],cast:!1}));for(let f of[-1,1])for(let g of[-.42,.24])t.add(x(V(.42,.48,.05,.05,.01),s,{pos:[g,.56,f*.68]}),x(V(.34,.4,.06,.04,.008),r,{pos:[g,.56,f*.69],cast:!1}));let l=new lt;l.position.set(1.06,.32,.12),l.rotation.set(-.22,.42,0),l.add(x(V(.36,.06,.34,.03,.01),s,{pos:[-.08,-.22,0]}),x(V(.36,.46,.1,.04,.014),i.clay(15459026),{pos:[0,.04,0]}),x(new Ee(.3,.4),i.textured("calcScreen",{finish:"lacquer",rough:.28}),{pos:[0,.04,.055],cast:!1})),t.add(l);let d=new lt;d.position.set(.68,.04,.84),t.add(x(V(.62,.08,.46,.04,.012),i.clay(16774370),{pos:[.68,.04,.82]}));let u=Cn([[0,0],[.16,0],[.22,.26],[.25,.31],[.22,.33],[.18,.28],[0,.26]],20);d.add(x(u,i.clay(13589816,{rough:.54})),x(new q(.18,.18,.04,16),i.clay(5914152),{pos:[0,.26,0]}),x(oe([[0,.26,0],[.04,.44,.02],[-.02,.62,-.02]],.042,12,8),i.clay(7227435)),x(ne(new it(.24,16,14),.026,6.2,120),o,{pos:[0,.72,0]}),x(ne(new it(.19,14,12),.022,6.8,121),i.clay(4371550),{pos:[.14,.66,.09]}),x(ne(new it(.18,14,12),.022,7.1,122),o,{pos:[-.14,.65,-.06]}),x(ne(new it(.16,14,12),.02,7.6,123),i.clay(4833124),{pos:[0,.86,.04]})),[[.16,.76,.18],[-.18,.73,.14],[.02,.92,.14],[.24,.64,-.02],[-.14,.82,-.14],[.1,.62,.22],[-.04,.7,-.22],[.18,.8,-.14]].forEach(([f,g,_])=>{d.add(x(new it(.056,12,10),a,{pos:[f,g,_],scale:[1.08,.92,1.08]}))});for(let[f,g,_,m]of[[.24,.56,.16,.4],[-.22,.56,.12,-.5]])d.add(x(new be(.08,.11,.015),c,{pos:[f,g,_],rot:[0,m,.12]}));return t.add(d),{group:de(t,12,"loft"),anim(f){d.rotation.z=Math.sin(f*1.8)*.025}}}function Ec(i,t={}){let e=new lt,n=!!t.golden,s=n?i.enamel(10100772,{rough:.24}):i.textured("woodPlank",{finish:"lacquer",rough:.46}),r=n?i.metal(16763709,.18,.88):i.clay(8144932,{rough:.54}),o=n?i.metal(16763450,.22,.84):i.fabric(13577774,{rough:.72,side:Ce}),a=n?i.metal(10118162,.28,.8):i.clay(6043162,{rough:.58}),c=i.emissive(16760386,.95,2.3),l=new lt;l.position.y=.08;let d=x(V(1.72,.32,.66,.24,.05),s,{pos:[0,.18,0]}),u=x(V(.62,.22,.62,.12,.03),r,{pos:[-.52,.4,0],rot:[0,0,-.14]}),h=x(new We(.24,.42,12),r,{pos:[.92,.28,0],rot:[0,0,-Math.PI/2.4]}),f=x(V(.46,.24,.44,.04,.015),i.clay(9195050),{pos:[-.46,.58,0]}),g=x(new it(.068,12,10),c,{pos:[-.74,.62,0],scale:[.9,1.25,.9],cast:!1});l.add(d,u,h,f,g);for(let v of[-1,1])l.add(x(new it(.045,10,8),i.gloss(16777215),{pos:[.74,.24,v*.24],scale:[1,1,.4]}),x(new it(.024,8,8),i.gloss(1776936),{pos:[.75,.24,v*.26],scale:[1,1,.4]}));if(n){let v=x(oe([[.82,.3,0],[1.06,.52,0],[1.14,.68,0]],.06,14,8),r),y=x(new it(.1,14,10),r,{pos:[1.18,.72,0],scale:[1.35,.9,.9]});l.add(v,y);for(let L=0;L<4;L++)l.add(x(new it(.075,10,8),r,{pos:[.05+L*.14,.41,L%2?.12:-.12],scale:[1.3,.65,.85]}))}function _(v,y,L,T){let A=new lt;A.position.set(v,.34,0),A.rotation.z=T,A.add(x(new q(.026,.038,y+.18,10),a,{pos:[0,(y+.18)*.5,0]}));let R=5;for(let E=0;E<R;E++){let S=E/(R-1),I=.26+S*(y-.34),W=L*(1-S*.28),F=Math.sin(S*Math.PI)*.09;A.add(x(V(W,(y-.3)/R+.02,.026,.015,.005),o,{pos:[.04,I,F]}),x(new q(.012,.012,W+.06,6),a,{pos:[.04,I,F+.02],rot:[0,0,Math.PI/2]}))}return l.add(A),A}let m=_(.08,1.48,.86,.06),p=_(.6,1.06,.58,-.14);e.add(l);let M=i.glass(7202034,.58);for(let[v,y,L]of[[-.65,.38,1],[.55,-.36,.9],[.05,.44,.85]])e.add(x(new Gt(.18*L,.045*L,8,16,Math.PI),M,{pos:[v,.02,y],rot:[0,.4,0],cast:!1}));return{group:de(e,n?60:13,n?"treasure":"junk"),anim(v){l.position.y=.08+Math.sin(v*1.9)*.045,l.rotation.z=Math.sin(v*1.45)*.055,l.rotation.x=Math.cos(v*1.6)*.035,m.rotation.y=Math.sin(v*1.6)*.05,p.rotation.y=Math.sin(v*1.6+.6)*.06}}}function xg(i){let t=new lt,e=i.clay(16774366,{rough:.48}),n=i.clay(15762792,{rough:.48}),s=i.clay(10380086,{rough:.56}),r=i.clay(3450458,{rough:.52}),o=i.metal(16763708,.18,.86),a=i.emissive(16770938,1,2.5);t.add(x(V(1.94,.14,1.54,.08,.022),e,{pos:[0,.07,0]}),x(V(1.96,.18,.09,.03,.01),n,{pos:[0,.21,-.72]}),x(V(.09,.18,1.48,.03,.01),n,{pos:[-.92,.21,0]}),x(V(.09,.18,1.48,.03,.01),n,{pos:[.92,.21,0]}));for(let[h,f]of[[-.8,-.6],[.8,-.6],[-.8,.56],[.8,.56]])t.add(x(V(.11,1.24,.11,.02,.008),s,{pos:[h,.72,f]}));for(let h of[-.6,.56])t.add(x(V(1.88,.09,.11,.02,.008),s,{pos:[0,1.36,h]}));for(let h=-3;h<=3;h++)t.add(x(V(.08,.07,1.38,.015,.006),s,{pos:[h*.25,1.42,-.02]}));for(let[h,[f,g,_]]of[[-.82,1.38,.56],[.82,1.38,.56],[-.74,1.22,-.58],[.76,1.26,-.58],[0,1.46,-.58]].entries())t.add(x(ne(new it(.14,10,8),.022,9.2,140+h),r,{pos:[f,g,_]}),x(ne(new it(.1,10,8),.018,10.4,150+h),i.clay(5227630),{pos:[f+.09,g-.08,_+.06]}));t.add(x(new Gt(.56,.042,12,28,Math.PI),o,{pos:[0,1.38,.56]}));let c=[];for(let h=0;h<7;h++){let f=h/6,g=-.72+f*1.44,_=Math.sin(f*Math.PI)*.14,m=x(new it(.044,10,8),a,{pos:[g,1.3-_,.58],cast:!1});c.push(m),t.add(m)}let l=Ri(i,"jackie",null,{noShadow:!0});l.group.position.set(-.22,.14,.14),l.group.scale.setScalar(.68),t.add(l.group);let d=Xs(i,"halo"),u=new lt;return u.position.set(.38,.86,.14),u.scale.setScalar(1.15),u.add(d.group),t.add(x(new q(.2,.24,.36,18),i.clay(16773842),{pos:[.38,.32,.14]}),x(new Gt(.21,.022,8,20),o,{pos:[.38,.5,.14],rot:[Math.PI/2,0,0]}),u),{group:de(t,14,"sprint14"),anim(h,f,g){l.anim(h,f,g),d.anim&&d.anim(h,f,g),c.forEach((_,m)=>{_.scale.setScalar(.85+.28*Math.sin(h*3.8+m*1.1))})}}}function Xe(i,t){switch(i){case 1:return rg(t);case 2:return og(t);case 3:return ag(t);case 4:return cg(t);case 5:return lg(t);case 6:return hg(t);case 7:return ug(t);case 8:return dg(t);case 9:return fg(t);case 10:return pg(t);case 11:return mg(t);case 12:return gg(t);case 13:return Ec(t);case 14:return xg(t);default:return null}}function _g(i,t={}){let e=new lt,n=i.enamel(14829372,{rough:.26}),s=i.enamel(16774886,{rough:.28}),r=i.metal(15777348,.2,.86),o=i.emissive(4585396,1,2.5),a=new lt;a.position.y=.08,a.add(x(new q(.36,.42,.24,22),n,{pos:[0,.14,0]}),x(new Gt(.4,.045,10,24),s,{pos:[0,.24,0],rot:[Math.PI/2,0,0]}),x(new q(.022,.026,.72,8),r,{pos:[.16,.56,.16],rot:[-.22,0,.22]}),x(new q(.022,.026,.72,8),r,{pos:[-.16,.56,.16],rot:[-.22,0,-.22]}),x(new q(.022,.026,.72,8),r,{pos:[.16,.56,-.16],rot:[.22,0,.22]}),x(new q(.022,.026,.72,8),r,{pos:[-.16,.56,-.16],rot:[.22,0,-.22]}),x(new q(.14,.16,.06,16),n,{pos:[0,.9,0]}),x(new it(.08,12,10),o,{pos:[0,1,0],cast:!1}));let c=x(Cn([[0,0],[.13,0],[.11,.08],[.08,.19],[.03,.24],[0,.24]],18),r,{pos:[0,.56,0]});a.add(c),e.add(a);let l=i.clay(16645110,{rough:.44}),d=i.clay(5924986,{rough:.48}),u=i.clay(16754222,{rough:.4}),h=t.island?2.6:.74,f=t.island?3.2:1.38,g=[];for(let _=0;_<3;_++){let m=new lt;m.add(x(new it(.085,14,10),l,{scale:[.82,.76,1.55]}),x(new it(.058,12,10),l,{pos:[0,.035,.12]}),x(new We(.024,.085,8),u,{pos:[0,.025,.195],rot:[Math.PI/2,0,0]}),x(V(.09,.018,.09,.01,.004),d,{pos:[0,.01,-.14]}));let p=new lt;p.position.set(-.06,.02,.02),p.add(x(V(.22,.024,.09,.014,.005),l,{pos:[-.11,0,0]}),x(V(.14,.02,.075,.01,.004),d,{pos:[-.26,-.015,-.01],rot:[0,.15,-.18]}));let M=new lt;M.position.set(.06,.02,.02),M.add(x(V(.22,.024,.09,.014,.005),l,{pos:[.11,0,0]}),x(V(.14,.02,.075,.01,.004),d,{pos:[.26,-.015,-.01],rot:[0,-.15,.18]})),m.add(p,M),t.island&&(m.userData.ignoreBounds=!0),e.add(m),g.push({bird:m,wingL:p,wingR:M,phase:_*Math.PI*2/3,yOff:(_-1)*.18})}return{group:de(e,18,"gulls"),anim(_){a.position.y=.08+Math.sin(_*2.2)*.05,a.rotation.z=Math.sin(_*1.7)*.1,c.rotation.z=-Math.sin(_*1.7)*.24;for(let m of g){let p=_*.65+m.phase;m.bird.position.set(Math.cos(p)*h,f+m.yOff+Math.sin(_*2.4+m.phase)*.1,Math.sin(p)*h),m.bird.rotation.y=-p,m.bird.rotation.z=.18;let M=Math.sin(_*6.5+m.phase*2)*.42;m.wingL.rotation.z=M,m.wingR.rotation.z=-M}}}}function yg(i){let t=new lt,e=i.clay(2635110,{rough:.4}),n=i.metal(2663594,.28,.72),s=i.metal(16107596,.22,.84),r=i.emissive(4978920,.85,2.3),o=i.emissive(16769128,.85,2.3),a=i.emissive(5044202,.55,1.5,{transparent:!0,opacity:.2,depthWrite:!1,side:Ce}),c=i.emissive(16769390,.55,1.5,{transparent:!0,opacity:.2,depthWrite:!1,side:Ce});t.add(x(V(1.06,.22,.9,.06,.02),i.clay(3819640),{pos:[0,.11,0]}),x(V(.84,1.15,.72,.05,.02),e,{pos:[0,.78,0]}),x(V(.62,.85,.54,.05,.018),e,{pos:[0,1.72,0]}),x(V(.4,.48,.36,.04,.014),n,{pos:[0,2.34,0]}),x(new We(.24,.46,4),s,{pos:[0,2.8,0],rot:[0,Math.PI/4,0]}),x(new q(.016,.032,.55,10),s,{pos:[0,3.24,0]}),x(new it(.065,12,10),o,{pos:[0,3.52,0],cast:!1}));for(let u=0;u<4;u++){let h=.42+u*.24;t.add(x(V(.87,.055,.75,.02,.005),u%2?o:r,{pos:[0,h,0],cast:!1}))}for(let u=0;u<3;u++){let h=1.48+u*.24;t.add(x(V(.65,.05,.57,.02,.005),u%2?r:o,{pos:[0,h,0],cast:!1}))}let l=x(new We(.55,2.4,16,1,!0),a,{pos:[-.24,3.2,0],rot:[0,0,Math.PI+.24],cast:!1,recv:!1}),d=x(new We(.55,2.4,16,1,!0),c,{pos:[.24,3.2,0],rot:[0,0,Math.PI-.24],cast:!1,recv:!1});return l.userData.ignoreBounds=!0,d.userData.ignoreBounds=!0,t.add(l,d),we(t,.68,.6,.008,.36,i),{group:de(t,21,"twilight"),anim(u){l.rotation.z=Math.PI+.26+Math.sin(u*.9)*.16,d.rotation.z=Math.PI-.26+Math.cos(u*.85)*.16}}}function vg(i){let t=new lt,e=i.textured("woodPlank",{finish:"lacquer",rough:.44}),n=i.clay(9328946,{rough:.5}),s=i.metal(15777348,.22,.84),r=i.textured("stripeCoral",{finish:"fabric",rough:.7,side:Ce}),o=i.gloss(16776694,{rough:.16}),a=i.metal(3817551,.36,.76);t.add(x(new q(.82,.86,.1,24),e,{pos:[0,.05,0]})),t.add(x(new q(.16,.22,.06,16),a,{pos:[0,.12,0]}),x(new q(.04,.04,.54,12),a,{pos:[0,.4,0]}),x(new q(.46,.46,.05,24),o,{pos:[0,.68,0]}),x(new Gt(.46,.02,8,28),s,{pos:[0,.68,0],rot:[Math.PI/2,0,0]}),x(new q(.03,.034,1.54,12),n,{pos:[0,.96,0]}),x(new We(.92,.36,8),r,{pos:[0,1.66,0]}),x(new it(.065,12,10),s,{pos:[0,1.86,0]})),[1807996,15886411,16762941].forEach((h,f)=>{let g=f*Math.PI*2/3+.4,_=Math.cos(g)*.56,m=Math.sin(g)*.56,p=new lt;p.position.set(_,.1,m),p.add(x(new q(.145,.135,.05,16),i.gloss(h,{rough:.32}),{pos:[0,.34,0]}),x(new q(.018,.02,.34,8),a,{pos:[-.07,.17,-.07],rot:[.1,0,-.1]}),x(new q(.018,.02,.34,8),a,{pos:[.07,.17,-.07],rot:[.1,0,.1]}),x(new q(.018,.02,.34,8),a,{pos:[-.07,.17,.07],rot:[-.1,0,-.1]}),x(new q(.018,.02,.34,8),a,{pos:[.07,.17,.07],rot:[-.1,0,.1]})),t.add(p)});let l=i.glass(16771276,.45),d=i.gloss(13200414,{rough:.18}),u=i.clay(16769346,{rough:.38});for(let[h,f,g]of[[.2,.14,1],[-.18,.2,.94]]){let _=new lt;_.position.set(h,.71,f),_.scale.setScalar(g),_.add(x(new q(.068,.052,.19,14),l,{pos:[0,.095,0],cast:!1}),x(new q(.058,.044,.145,14),d,{pos:[0,.08,0]}),x(new q(.048,.048,.014,12),u,{pos:[.01,.135,.01],rot:[.4,.2,.3]}),x(new q(.009,.009,.25,6),i.clay(16732754),{pos:[.02,.14,-.01],rot:[.1,0,-.22]})),t.add(_)}return we(t,.88,.88,.008,.34,i),{group:de(t,25,"umbrella"),anim(h){t.children[5].rotation.y=Math.sin(h*.9)*.04}}}function Mg(i,t={}){let e=new lt,n=i.enamel(1469758,{rough:.22}),s=i.enamel(16774622,{rough:.24}),r=i.clay(2962752,{rough:.5}),o=i.metal(15777348,.2,.86),a=i.metal(4607580,.34,.8),c=i.emissive(16770452,.65,1.9),l=i.emissive(16774590,1,2.6),d=i.textured("tramSign",{finish:"glaze",rough:.22});for(let h of[-.26,.26])e.add(x(new be(1.96,.035,.04),a,{pos:[0,.04,h]}));for(let h=-4;h<=4;h++)e.add(x(new be(.08,.03,.72),i.clay(8213814),{pos:[h*.22,.018,0]}));let u=new lt;u.position.y=.06;for(let[h,f]of[[-.46,-.26],[-.46,.26],[.46,-.26],[.46,.26]])u.add(x(new q(.11,.11,.05,16),a,{pos:[h,.11,f],rot:[Math.PI/2,0,0]}));u.add(x(V(1.56,.54,.66,.08,.025),n,{pos:[0,.45,0]}),x(V(1.6,.24,.69,.06,.016),s,{pos:[0,.82,0]}),x(V(1.56,.48,.66,.08,.024),n,{pos:[0,1.16,0]}),x(V(1.64,.11,.72,.1,.028),r,{pos:[0,1.44,0]}),x(new Ee(1.22,.2),d,{pos:[0,.82,.35],cast:!1}),x(new Ee(1.22,.2),d,{pos:[0,.82,-.35],rot:[0,Math.PI,0],cast:!1}));for(let h=-2;h<=2;h++)for(let f of[-1,1])u.add(x(V(.22,.24,.03,.025,.005),c,{pos:[h*.27,.52,f*.33],cast:!1}),x(V(.22,.24,.03,.025,.005),c,{pos:[h*.27,1.18,f*.33],cast:!1}));for(let h of[-1,1])u.add(x(V(.03,.24,.44,.03,.006),c,{pos:[h*.78,.54,0],cast:!1}),x(V(.03,.24,.44,.03,.006),c,{pos:[h*.78,1.18,0],cast:!1}),x(new q(.06,.065,.06,14),o,{pos:[h*.8,.32,0],rot:[0,0,Math.PI/2]}),x(new it(.048,10,8),l,{pos:[h*.82,.32,0],cast:!1}),x(V(.12,.07,.56,.03,.01),a,{pos:[h*.81,.19,0]}));if(u.add(x(new q(.04,.055,.12,12),o,{pos:[0,1.54,0]}),x(new q(.014,.018,.62,8),a,{pos:[-.18,1.76,0],rot:[0,0,.68]}),x(new q(.025,.025,.16,8),o,{pos:[-.39,1.98,0],rot:[Math.PI/2,0,0]})),e.add(u),!t.island){let h=Xs(i,"straw");h.group.position.set(.42,1.54,0),h.group.scale.setScalar(.86),h.group.rotation.z=-.14,u.add(h.group)}return we(e,1.05,.5,.008,.34,i),{group:de(e,30,"tram"),anim(h){u.position.x=Math.sin(h*1.1)*.12,u.position.y=.06+Math.abs(Math.sin(h*4.4))*.008}}}function Sg(i){let t=new lt,e=i.clay(8142374,{rough:.52}),n=i.metal(15777348,.22,.84),s=i.emissive(16731192,.8,2.25),r=i.clay(16764746,{rough:.45});for(let l of[-.95,.95])t.add(x(new q(.1,.13,.14,14),i.clay(14209220),{pos:[l,.07,0]}),x(new q(.052,.06,1.62,14),e,{pos:[l,.92,0]}),x(new it(.08,12,10),n,{pos:[l,1.76,0]}),x(V(.24,.06,.12,.02,.008),e,{pos:[l,1.64,0]}));let o=[];for(let l=0;l<=16;l++){let d=l/16,u=-.95+d*1.9,h=1.64-Math.sin(d*Math.PI)*.28;o.push([u,h,0])}t.add(x(oe(o,.018,22,8),n));let a=[],c=Cn([[0,-.15],[.06,-.15],[.13,-.09],[.155,0],[.13,.09],[.06,.15],[0,.15]],18);for(let l=0;l<5;l++){let d=(l+1)/6,u=-.95+d*1.9,h=1.64-Math.sin(d*Math.PI)*.28,f=new lt;f.position.set(u,h,0),f.add(x(new q(.008,.008,.16,6),n,{pos:[0,-.08,0]}),x(new q(.072,.072,.036,14),n,{pos:[0,-.17,0]}),x(c,s,{pos:[0,-.32,0],cast:!1}),x(new q(.072,.072,.036,14),n,{pos:[0,-.47,0]}),x(new q(.022,.034,.16,8),r,{pos:[0,-.57,0]})),t.add(f),a.push({pivot:f,phase:l*.9})}return we(t,1.05,.34,.008,.3,i),{group:de(t,35,"lanterns"),anim(l){for(let d of a)d.pivot.rotation.z=Math.sin(l*2.1+d.phase)*.14,d.pivot.rotation.x=Math.cos(l*1.6+d.phase)*.08}}}function bg(i){let t=new lt,e=i.textured("stoneWall",{rough:.62}),n=i.textured("brick",{rough:.56}),s=i.clay(15919318,{rough:.48}),r=i.metal(4958354,.28,.55),o=i.metal(15777348,.2,.86),a=i.textured("clockFace",{finish:"glaze",rough:.2,emissive:!0,baseEmissive:.25,nightEmissive:1.05});t.add(x(V(1.06,.24,1.06,.05,.02),e,{pos:[0,.12,0]}),x(V(.92,.44,.92,.04,.018),e,{pos:[0,.44,0]}),x(V(.32,.38,.08,.1,.014),i.clay(6043168),{pos:[0,.42,.46]}),x(V(.98,.1,.98,.04,.015),s,{pos:[0,.68,0]})),t.add(x(V(.76,1.44,.76,.03,.014),n,{pos:[0,1.44,0]}));for(let[l,d]of[[-.36,-.36],[.36,-.36],[-.36,.36],[.36,.36]])t.add(x(V(.11,1.44,.11,.02,.008),s,{pos:[l,1.44,d]}));let c=i.emissive(16769428,.45,1.6);for(let l=0;l<4;l++){let d=l*Math.PI/2,u=new lt;u.rotation.y=d,u.add(x(V(.18,.32,.04,.07,.008),c,{pos:[0,1.42,.385],cast:!1})),t.add(u)}t.add(x(V(.9,.1,.9,.04,.014),s,{pos:[0,2.2,0]}),x(V(.82,.66,.82,.04,.016),s,{pos:[0,2.58,0]}),x(V(.92,.1,.92,.04,.016),s,{pos:[0,2.94,0]}));for(let l=0;l<4;l++){let d=l*Math.PI/2,u=new lt;u.rotation.y=d,u.add(x(new Gt(.25,.028,10,24),o,{pos:[0,2.58,.415]}),x(new q(.24,.24,.02,24),[o,a,a],{pos:[0,2.58,.412],rot:[Math.PI/2,0,0],cast:!1})),t.add(u)}for(let l=0;l<8;l++){let d=l*Math.PI*2/8;t.add(x(new q(.032,.036,.36,10),s,{pos:[Math.cos(d)*.28,3.16,Math.sin(d)*.28]}))}return t.add(x(new q(.32,.34,.08,16),s,{pos:[0,3.36,0]}),x(new it(.31,20,14,0,Math.PI*2,0,Math.PI*.55),r,{pos:[0,3.4,0]}),x(new q(.018,.042,.46,10),o,{pos:[0,3.86,0]}),x(new it(.055,10,8),o,{pos:[0,3.74,0]})),we(t,.72,.72,.008,.36,i),{group:de(t,45,"clock"),anim:null}}function wg(i){return Ec(i,{golden:!0})}function Eg(i){let t=new lt,e=i.clay(3909732,{rough:.56}),n=i.clay(2655308,{rough:.56}),s=i.clay(12103328,{rough:.62}),r=i.clay(14238264,{rough:.46}),o=i.clay(14248760,{rough:.48}),a=i.metal(15777348,.24,.84);t.add(x(ne(new it(1.12,20,14,0,Math.PI*2,0,Math.PI*.55),.075,2.2,71,{flatBottom:!0}),e,{pos:[0,0,0],scale:[1.35,.85,.92]}),x(ne(new it(.68,18,14),.065,3.1,72),s,{pos:[-.36,.72,.04],scale:[1.05,1.15,.85]}),x(ne(new it(.74,18,14),.06,2.8,73),e,{pos:[.34,.56,-.04],scale:[1.28,.85,.88]}),x(ne(new it(.48,14,12),.05,3.4,74),s,{pos:[-.74,.48,.12],scale:[1.1,.78,.8]}));for(let d=0;d<6;d++)t.add(x(V(.22,.05,.14,.02,.006),i.clay(15064528),{pos:[.82-d*.14,.14+d*.16,.54-d*.06],rot:[0,-.35+(d%2?.04:-.03),0]}));[[-.95,.34,.42],[.95,.36,.28],[.58,.76,-.45],[-.12,.68,.56],[.22,.86,.38]].forEach(([d,u,h],f)=>{t.add(x(new q(.025,.035,.18,6),i.clay(8146474),{pos:[d,u,h]}),x(ne(new We(.14,.28,8),.018,5.2,80+f),f%2?n:e,{pos:[d,u+.18,h]}))});let l=new lt;l.position.set(-.34,1.38,.04),l.add(x(new q(.38,.42,.1,6),i.clay(15064528),{pos:[0,.05,0]}),x(new We(.5,.24,6),o,{pos:[0,.52,0]}),x(new We(.32,.22,6),o,{pos:[0,.72,0]}),x(new it(.055,10,8),a,{pos:[0,.86,0]}),x(new it(.075,10,8),i.emissive(16765528,.7,1.8),{pos:[0,.34,0],cast:!1}));for(let d=0;d<6;d++){let u=d*Math.PI*2/6;l.add(x(new q(.024,.026,.36,8),r,{pos:[Math.cos(u)*.28,.26,Math.sin(u)*.28]}))}return t.add(l),we(t,1.38,.96,.008,.36,i),{group:de(t,75,"lionrock"),anim:null}}function Tg(i){let t=new lt,e=i.clay(3578460,{rough:.56}),n=i.enamel(16775146,{rough:.24}),s=i.enamel(1478021,{rough:.26}),r=i.emissive(8122111,.55,1.75),o=i.enamel(14234156,{rough:.22}),a=i.metal(15777348,.2,.86);t.add(x(ne(new q(.84,1.18,.68,24,3),.06,2.4,90,{flatBottom:!0}),e,{pos:[0,.34,0]}),x(ne(new it(.24,12,10),.026,4.4,91),i.clay(5027950),{pos:[-.74,.52,.48]}),x(ne(new it(.22,12,10),.024,4.6,92),i.clay(2982988),{pos:[.78,.46,-.44]})),t.add(x(V(1.02,.42,.66,.06,.02),n,{pos:[0,.86,0]}),x(V(.88,.28,.69,.04,.01),r,{pos:[0,.88,0],cast:!1}),x(V(1.42,.16,.72,.08,.025),n,{pos:[0,1.14,0]}),x(V(1.74,.16,.76,.12,.028),s,{pos:[0,1.3,0]}),x(V(1.94,.12,.82,.14,.026),n,{pos:[0,1.44,0]}),x(V(1.66,.1,.79,.04,.01),r,{pos:[0,1.3,0],cast:!1}));for(let d of[-.52,.52])t.add(x(new q(.018,.026,.18,8),a,{pos:[d,1.58,.28]}),x(new q(.026,.02,.14,10),a,{pos:[d,1.67,.3],rot:[Math.PI/2-.15,0,0]}));let c=x(V(.28,.05,1.24,.02,.008),i.clay(5396582),{pos:[.84,.42,.42],rot:[-.52,.22,0]}),l=new lt;return l.add(x(V(.24,.2,.46,.04,.012),o,{pos:[0,.12,0]}),x(V(.25,.09,.36,.02,.006),i.emissive(16771222,.7,1.8),{pos:[0,.14,0],cast:!1}),x(V(.25,.04,.48,.02,.006),n,{pos:[0,.23,0]})),l.rotation.set(-.52,.22,0),t.add(c,l),we(t,1.18,1.02,.008,.36,i),{group:de(t,90,"peaktram"),anim(d){let u=Math.sin(d*.9)*.28;l.position.set(.84+u*.18,.45-u*.5,.42+u*.85)}}}function Ag(i){let t=new lt,e=i.gloss(16775920,{rough:.16}),n=i.metal(16106557,.18,.88),s=i.textured("trophy100",{finish:"metal",rough:.2}),r=i.emissive(16770936,1,2.4);t.add(x(new q(.76,.84,.16,8),e,{pos:[0,.08,0]}),x(new q(.62,.68,.52,8),e,{pos:[0,.42,0]}),x(new q(.68,.64,.1,8),n,{pos:[0,.72,0]}),x(new Gt(.64,.028,10,28),n,{pos:[0,.18,0],rot:[Math.PI/2,0,0]}),x(V(.56,.24,.05,.03,.01),n,{pos:[0,.42,.62]}),x(new Ee(.5,.19),s,{pos:[0,.42,.648],cast:!1}));let o=us(i,"tophat",{golden:!0,noShadow:!0});o.group.position.set(0,.78,0),o.group.scale.setScalar(.86),t.add(o.group);let a=[];for(let c=0;c<4;c++){let l=x(new Xn(.065,0),r,{cast:!1});t.add(l),a.push({m:l,phase:c*Math.PI/2})}return we(t,.88,.88,.008,.36,i),{group:de(t,100,"centennial"),anim(c,l,d){o.anim(c,l,{mood:"proud"});for(let u of a){let h=c*1.15+u.phase;u.m.position.set(Math.cos(h)*.82,1.38+Math.sin(c*3+u.phase)*.16,Math.sin(h)*.82),u.m.rotation.y=c*2.5}}}}function Tc(i,t){let e=new lt,n=[16773836,14677480,16770262,14872319,15918847],s=[1349259,15232072,3896004,9329604,13932066],r=Math.max(0,i-15)%n.length,o=t.clay(n[r],{rough:.5}),a=t.clay(s[r],{rough:.46}),c=t.emissive(16770454,.65,1.9);e.add(x(V(1.74,.94,1.34,.06,.022),o,{pos:[0,.48,0]}),x(V(1.88,.12,1.48,.06,.02),a,{pos:[0,.99,0]}));for(let l of[-1,1])for(let d of[-.46,0,.46])e.add(x(V(.32,.42,.05,.04,.01),a,{pos:[d,.52,l*.67]}),x(V(.24,.34,.06,.03,.008),c,{pos:[d,.52,l*.68],cast:!1}));for(let l of[-.46,.46])e.add(x(V(.32,.1,.14,.02,.008),t.clay(13132858),{pos:[l,.25,.74]}),x(new it(.08,10,8),t.clay(3909732),{pos:[l-.06,.34,.74]}),x(new it(.075,10,8),t.clay(16743836),{pos:[l+.06,.34,.74]}));return{group:de(e,i,"brick_"+i),anim:null}}function Ac(i,t){let e=Math.max(1,Math.floor((i-100)/14)),n=new lt,s=t.metal(16106557,.22,.84),r=t.clay(1346692,{rough:.42}),o=t.emissive(16771204,.85,2.25);n.add(x(V(.84,.2,.84,.06,.02),r,{pos:[0,.1,0]}),x(V(.64,1.38,.64,.06,.02),s,{pos:[0,.88,0]}),x(V(.46,.68,.46,.05,.016),r,{pos:[0,1.88,0]}),x(new We(.28,.56,6),s,{pos:[0,2.5,0]}),x(new it(.08,12,10),o,{pos:[0,2.82,0],cast:!1}));for(let a=0;a<4;a++)n.add(x(V(.67,.07,.67,.02,.006),o,{pos:[0,.44+a*.3,0],cast:!1}));for(let a=0;a<4;a++){let c=a*Math.PI/2+.4;n.add(x(new it(.11,10,8),t.clay(3909732),{pos:[Math.cos(c)*.32,1.62,Math.sin(c)*.32]}))}return we(n,.54,.54,.008,.34,t),{group:de(n,i,"wing_"+e),anim:null}}function un(i,t,e={}){switch(i){case 18:return _g(t,e);case 21:return yg(t);case 25:return vg(t);case 30:return Mg(t,e);case 35:return Sg(t);case 45:return bg(t);case 60:return wg(t);case 75:return Eg(t);case 90:return Tg(t);case 100:return Ag(t);default:return i>100&&(i-100)%14===0?Ac(i,t):i>14?Tc(i,t):null}}var ds=.22,fs=1.18,Le={day:{bg:9230327,fog:12446455,fogDensity:.011,hemiSky:16775920,hemiGround:6338756,hemiInt:1.05,keyColor:16774366,keyInt:1.75,keyPos:[8.5,13.5,9],rimColor:16769220,rimInt:.72,ambInt:.24,nightGlow:0,nightFactor:0,cloudCol:16776696,starOpacity:0,sunY:14.5,sunVisible:!0,moonVisible:!1},dusk:{bg:15108986,fog:15703940,fogDensity:.013,hemiSky:16765352,hemiGround:6049674,hemiInt:.92,keyColor:16754794,keyInt:1.65,keyPos:[11.5,6.8,7.5],rimColor:12752127,rimInt:.95,ambInt:.22,nightGlow:1.45,nightFactor:.58,cloudCol:16763824,starOpacity:.42,sunY:5.5,sunVisible:!0,moonVisible:!1},night:{bg:1450319,fog:1713752,fogDensity:.014,hemiSky:6455512,hemiGround:1977176,hemiInt:.78,keyColor:10929407,keyInt:1.25,keyPos:[-7.5,12.5,8.5],rimColor:5691624,rimInt:.9,ambInt:.22,nightGlow:2.6,nightFactor:1,cloudCol:6123430,starOpacity:.95,sunY:-10,sunVisible:!1,moonVisible:!0}},qs=null,_h=!1;function yh(){if(qs!==null)return qs;try{let i=document.createElement("canvas"),t=i.getContext("webgl2")||i.getContext("webgl")||i.getContext("experimental-webgl");if(qs=!!t,t){let e="";try{let s=t.getExtension("WEBGL_debug_renderer_info");e=String(s?t.getParameter(s.UNMASKED_RENDERER_WEBGL)||"":t.getParameter(t.RENDERER)||"")}catch{}_h=/SwiftShader|llvmpipe|Software|Mesa|Basic Render/i.test(e);let n=t.getExtension("WEBGL_lose_context");n&&n.loseContext()}}catch{qs=!1}return qs}function xh(i){return i>=100?"tophat":i>=30?"straw":i>=14?"halo":null}function Cg(i){i.updateMatrixWorld(!0);let t=new En,e=new En;return i.traverse(n=>{!n.isMesh||!n.visible||n.userData.ignoreBounds||(n.geometry.boundingBox||n.geometry.computeBoundingBox(),e.copy(n.geometry.boundingBox).applyMatrix4(n.matrixWorld),t.union(e))}),t.isEmpty()&&t.set(new D(-.5,0,-.5),new D(.5,1,.5)),t}function ao(i){i.traverse(t=>{t.isMesh&&t.geometry&&!t.userData.sharedGeo&&t.geometry.dispose()})}function Rg(i){let t=new lt,e=i.enamel(7225633,{rough:.28,metalness:.06}),n=i.clay(5386264,{rough:.44}),s=i.metal(15777348,.2,.86),r=i.textured("coasterDial",{finish:"lacquer",rough:.34}),o=i.emissive(8181503,.75,1.5,{transparent:!0,opacity:.65});t.add(x(new q(1.74,1.84,.16,48),[e,r,n],{pos:[0,.08,0],cast:!1,recv:!0}),x(new Gt(1.75,.048,14,56),s,{pos:[0,.155,0],rot:[Math.PI/2,0,0]}),x(new Gt(1.68,.02,10,56),s,{pos:[0,.164,0],rot:[Math.PI/2,0,0],cast:!1}),x(new Gt(1.85,.032,10,56),n,{pos:[0,.02,0],rot:[Math.PI/2,0,0],cast:!1}));for(let c=0;c<8;c++){let l=c*Math.PI*2/8;t.add(x(new it(.03,10,8),s,{pos:[Math.cos(l)*1.81,.09,Math.sin(l)*1.81],cast:!1}))}let a=x(new Gt(1.64,.03,10,48),o,{pos:[0,.18,0],rot:[Math.PI/2,0,0],cast:!1});return a.visible=!1,t.add(a),we(t,2.25,2.25,-.01,.36,i),{group:t,lockRing:a}}function Ig(i){let t=new lt,e={day:oo("day"),dusk:oo("dusk"),night:oo("night")},n=new ai({map:e.day,side:Ge,depthWrite:!1,fog:!1}),s=new Fe(new it(46,32,20),n);t.add(s);let r=i.clay(16776696,{rough:.68,noBump:!0}).clone();r.fog=!1;let o=new lt;t.add(o);let a=[];[{a:.48,r:19.2,y:-.4,s:.95},{a:1.85,r:20,y:.2,s:.9},{a:2.85,r:19.4,y:-.5,s:.92},{a:3.72,r:19.8,y:-.1,s:.95},{a:5.58,r:18.8,y:.1,s:.88}].forEach((M,v)=>{let y=new lt;y.add(x(ne(new it(1.15,14,12),.11,1.9,10+v,{flatBottom:!0,yScale:.55}),r,{scale:[1.35,.72,.92],cast:!1,recv:!1}),x(ne(new it(.85,12,10),.08,2.2,20+v,{flatBottom:!0,yScale:.55}),r,{pos:[1,-.08,.15],scale:[1.14,.7,.85],cast:!1,recv:!1}),x(ne(new it(.78,12,10),.08,2.4,30+v,{flatBottom:!0,yScale:.55}),r,{pos:[-.95,-.12,-.1],scale:[1.18,.68,.88],cast:!1,recv:!1}),x(ne(new it(.68,12,10),.07,2.6,40+v),r,{pos:[.22,.42,-.05],scale:[1.1,.8,.85],cast:!1,recv:!1})),y.scale.setScalar(M.s),o.add(y),a.push({cg:y,...M})});let l=new lt;l.position.set(-11.5,4.8,-26),l.add(x(new it(1.9,20,16),i.emissive(16770682,1.1,1.1),{cast:!1,recv:!1}),x(new it(2.85,18,14),i.emissive(16768916,.35,.35,{transparent:!0,opacity:.24,depthWrite:!1}),{cast:!1,recv:!1})),t.add(l);let d=new lt;d.position.set(7.4,6.2,-9.2),d.rotation.y=-.35,d.add(x(new Gt(.92,.3,12,26,Math.PI*1.28),i.emissive(16773542,1.4,1.75),{rot:[0,0,Math.PI*.62],cast:!1,recv:!1}),x(new it(1.65,16,12),i.emissive(16771484,.4,.55,{transparent:!0,opacity:.16,depthWrite:!1}),{cast:!1,recv:!1})),d.visible=!1,t.add(d);let u=320,h=new Float32Array(u*3),f=9001,g=()=>(f=Math.imul(1664525,f)+1013904223>>>0,f/4294967296);for(let M=0;M<u;M++){let v=g()*Math.PI*2,y=.42+g()*1.42,L=28+g()*8;h[M*3]=L*Math.sin(y)*Math.cos(v),h[M*3+1]=L*Math.cos(y)+1.2,h[M*3+2]=L*Math.sin(y)*Math.sin(v)}let _=new Oe;_.setAttribute("position",new Je(h,3));let m=new Ns({color:16775378,size:.78,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),p=new kr(_,m);return t.add(p),{group:t,setInspectLook(M){o.visible=!M},setSky(M){let v=Le[M]||Le.day;n.map=e[M]||e.day,n.needsUpdate=!0,r.color.setHex(v.cloudCol),l.visible=v.sunVisible,l.position.y=M==="dusk"?1.8:4.8,d.visible=v.moonVisible,m.opacity=v.starOpacity},anim(M,v){let y=v?0:.022;for(let L of a){let T=L.a+M*y;L.cg.position.set(Math.cos(T)*L.r,L.y+Math.sin(M*.6+L.a)*.25,Math.sin(T)*L.r),L.cg.lookAt(0,L.y,0)}m.opacity>.01&&!v&&(m.size=.44+Math.sin(M*2.4)*.07)},dispose(){Object.values(e).forEach(M=>M.dispose()),s.geometry.dispose(),n.dispose(),r.dispose(),_.dispose(),m.dispose()}}}function Pg(i){let t=new lt;t.visible=!1;let e=i.emissive(3993768,.9,1.9,{transparent:!0,opacity:.55,depthWrite:!1}),n=i.emissive(16769126,.85,1.85,{transparent:!0,opacity:.45,depthWrite:!1}),s=i.clay(3057242,{rough:.42}),r=i.clay(4837230,{rough:.38}),o=i.emissive(16769902,.9,2),a=x(new Gt(1.55,.045,10,48),e,{rot:[Math.PI/2,0,0],cast:!1,recv:!1}),c=x(new Gt(1.95,.035,10,48),n,{rot:[Math.PI/2,0,0],cast:!1,recv:!1});t.add(a,c);let l=new lt;l.position.set(0,.05,0);let d=x(oe([[0,0,0],[.04,.45,.02],[-.02,.95,0]],.055,14,10),s),u=x(new it(.24,14,10),r,{pos:[-.22,.62,.04],rot:[.15,.2,.58],scale:[1.45,.42,.78]}),h=x(new it(.24,14,10),r,{pos:[.22,.72,-.02],rot:[-.1,-.2,-.58],scale:[1.45,.42,.78]}),f=x(new Xn(.18,1),o,{pos:[-.02,1.06,0],cast:!1});l.add(d,u,h,f),t.add(l);let g=[];for(let m=0;m<8;m++){let p=x(new it(.055,8,8),m%2?n:e,{cast:!1,recv:!1});t.add(p),g.push({m:p,phase:m/8,rad:1.15+m%3*.35})}let _=0;return{group:t,setProgress(m){_=Math.max(0,Math.min(1,Number(m)||0)),t.visible=_>.005},anim(m,p,M=.35){if(!t.visible)return;t.position.set(0,p?.16:.04,p?0:M);let v=p?1:.86,y=_,L=m*.45%1,T=(m*.45+.5)%1;a.position.y=.08+L*(1.2+y*1.4),a.scale.setScalar(v*(.7+L*.55)),c.position.y=.08+T*(1.2+y*1.4),c.scale.setScalar(v*(.65+T*.65));let A=.24+y*.92;l.position.set(p?1.2:.95,.04,p?.55:.25),l.scale.setScalar(A),l.rotation.y=Math.sin(m*1.4)*.2,f.scale.setScalar(.6+y*.8+Math.sin(m*4)*.08),f.rotation.y=m*1.8;for(let R of g){let E=(m*(.28+y*.35)+R.phase)%1,S=m*1.1+R.phase*Math.PI*2;R.m.position.set(Math.cos(S)*R.rad*v,.15+E*(1.5+y*1.6),Math.sin(S)*R.rad*v),R.m.scale.setScalar(Math.sin(E*Math.PI)*(.7+y*.6))}}}}function Lg(i){let t=new lt,e=new q(.11,.11,.028,14),n=new be(.13,.07,.02),s=new Xn(.1,0),r=new it(.11,12,10),o=i.metal(16763708,.18,.88),a=i.glass(6287615,.65),l=[16739154,1349259,16764996,16740520,4576888,7125247].map(h=>i.gloss(h,{rough:.28})),d=[];function u(h="yes",f=1.6){let g=h==="sprint14"||h==="milestone"?36:24;for(let _=0;_<g;_++){let m=n,p=l[_%l.length];h==="shield"?(m=_%3===0?s:r,p=_%3===0?o:a):h==="rescue"?(m=_%2===0?s:n,p=_%3===0?o:l[4]):h==="sprint14"||h==="milestone"?(m=_%2===0?e:s,p=_%3===0?l[_%l.length]:o):(m=_%2===0?e:n,p=_%2===0?o:l[_%l.length]);let M=new Fe(m,p);M.castShadow=!1,M.position.set((Math.random()-.5)*.8,f+Math.random()*.4,(Math.random()-.5)*.8);let v=Math.random()*Math.PI*2,y=1.3+Math.random()*2.4,L=(h==="shield"?2.4:4.2)+Math.random()*2.8;t.add(M),d.push({m:M,vx:Math.cos(v)*y,vy:L,vz:Math.sin(v)*y,rx:(Math.random()-.5)*9,ry:(Math.random()-.5)*9,life:0,maxLife:1.45+Math.random()*.6,grav:h==="shield"?-2.4:-7.6})}}return{group:t,spawn:u,update(h){for(let f=d.length-1;f>=0;f--){let g=d[f];if(g.life+=h,g.life>=g.maxLife){t.remove(g.m),d.splice(f,1);continue}g.vy+=g.grav*h,g.m.position.x+=g.vx*h,g.m.position.y+=g.vy*h,g.m.position.z+=g.vz*h,g.m.rotation.x+=g.rx*h,g.m.rotation.y+=g.ry*h;let _=1-Math.max(0,(g.life-g.maxLife*.65)/(g.maxLife*.35));g.m.scale.setScalar(Math.max(.01,_))}},dispose(){e.dispose(),n.dispose(),s.dispose(),r.dispose()}}}function Dg(i,t={}){if(!i||!yh())return null;let e=_h,n;try{n=new Br({antialias:!e,alpha:!1,powerPreference:"high-performance"})}catch{return null}n.outputColorSpace=Ve,n.toneMapping=uc,n.toneMappingExposure=1.06,n.shadowMap.enabled=!e,n.shadowMap.type=hc,n.shadowMap.autoUpdate=!1;let s=()=>{n.shadowMap.enabled&&(n.shadowMap.needsUpdate=!0)},r=n.domElement;r.style.width="100%",r.style.height="100%",r.style.display="block",r.style.touchAction="none",r.setAttribute("aria-label","Interactive 3D Harbour Keep Diorama"),i.replaceChildren(r);let o=new Vr;o.background=new Wt(Le.day.bg),o.fog=new zr(Le.day.fog,Le.day.fogDensity);let a=new ke(36,1,.2,120),c=fh({softwareGL:e}),l=e?null:{day:ro("day"),dusk:ro("dusk"),night:ro("night")};l&&(o.environment=l.day);let d=new jr(16777215,.24),u=new Jr(Le.day.hemiSky,Le.day.hemiGround,Le.day.hemiInt),h=new cs(Le.day.keyColor,Le.day.keyInt);h.position.set(...Le.day.keyPos),h.castShadow=!0,h.shadow.mapSize.set(1024,1024),h.shadow.camera.left=-7.2,h.shadow.camera.right=7.2,h.shadow.camera.top=8.4,h.shadow.camera.bottom=-6.2,h.shadow.camera.near=2,h.shadow.camera.far=32,h.shadow.bias=-5e-4,h.shadow.normalBias=.025,h.shadow.radius=2.4;let f=new cs(Le.day.rimColor,Le.day.rimInt);f.position.set(-9.5,6.5,-8.5);let g=new cs(16775664,.48);g.position.set(4,9,12);let _=new Qr(16758892,0,14,1.5);_.position.set(1.2,2.4,2.2),o.add(d,u,h,f,g,_);let m=Ig(c);o.add(m.group);let p=new lt,M=new lt;M.visible=!1,o.add(p,M);let v=Rg(c);M.add(v.group);let y=new lt;M.add(y);let L=Pg(c),T=Lg(c);o.add(L.group,T.group);let A={totalDays:Math.max(0,Math.floor(Number(t.totalDays)||0)),streak:Math.max(0,Math.floor(Number(t.streak)||0)),shields:Math.max(0,Math.floor(Number(t.shields)||0)),sky:t.sky||"day",avatar:t.avatar||"crab",mood:t.mood||"idle"},R="island",E=null,S=!1,I="",W=null,F=[],k=null,$=0,z=0,j=0,X=0,ot=!1,ht=-.34,gt=-.34,ft=1.04,Vt=1.04,Y=11.2,et=11.2,Mt=.85,at=.85,Rt=0,zt=0,Nt=1,Zt=1,tt=1,pt=()=>!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);function P(){let rt=Zt/Math.max(1,tt),ct=rt<.8,vt=ct?44:36;a.fov!==vt&&(a.fov=vt);let $t=Math.tan(Pe.degToRad(vt*.5))*rt;if(R==="item"){let _t=2.15/Math.max(.14,$t),Dt=Math.max(8.2,_t);return{y:.98,r:Dt,phi:1.11,theta:-.34,minR:Math.max(4.4,Dt*.56),maxR:Dt*1.55}}let ee=A.totalDays,b=ee>=14?Math.min(3,Math.floor((ee-14)/8)):0,U=.62,B=12.6;ee>=14?(U=2.62+b*.68,B=23.2+b*2.2):ee>=12?(U=1.95,B=16.6):ee>=9?(U=1.62,B=15.2):ee>=6?(U=1.32,B=14):ee>=4&&(U=1.02,B=13.2);let H=ee>=14?4.95:4.65,N=ct?H/Math.max(.14,$t*.96):0,dt=Math.max(B,N);return{y:U,r:dt,phi:1.04,theta:-.34,minR:Math.max(6.8,dt*.56),maxR:dt*1.58}}function Ut(rt){let ct=Le[rt]?rt:"day",vt=Le[ct];A.sky=ct,o.background.setHex(vt.bg),o.fog.color.setHex(vt.fog),o.fog.density=vt.fogDensity,l&&(o.environment=l[ct]),u.color.setHex(vt.hemiSky),u.groundColor.setHex(vt.hemiGround),u.intensity=vt.hemiInt+(e?.3:0),h.color.setHex(vt.keyColor),h.intensity=vt.keyInt+(e?.22:0),h.position.set(...vt.keyPos),f.color.setHex(vt.rimColor),f.intensity=vt.rimInt+(e?.18:0),g.color.setHex(ct==="night"?12769535:ct==="dusk"?16765608:16775664),g.intensity=ct==="night"?.42:ct==="dusk"?.52:.48,d.intensity=vt.ambInt+(e?.24:0),_.intensity=vt.nightGlow,c.setNightFactor(vt.nightFactor),m.setSky(ct),s()}function J(rt,ct,vt=0,$t=1){!rt||!rt.group||(rt.group.position.set(ct[0],ct[1],ct[2]),rt.group.rotation.y=vt,$t!==1&&rt.group.scale.setScalar($t),p.add(rt.group),rt.anim&&F.push(rt.anim))}function Ct(){let rt=`${A.totalDays}|${A.avatar}|${A.shields}`;if(rt===I)return;for(I=rt;p.children.length;){let N=p.children[0];p.remove(N),ao(N)}F=[];let ct=A.totalDays,vt=ct>=4;W=gh(c,vt),W.setShields(A.shields),p.add(W.group),F.push(W.anim);let $t=xh(ct),ee;A.avatar==="jack"?ee=Ri(c,"jack",$t):A.avatar==="jackie"?ee=Ri(c,"jackie",$t):ee=us(c,$t),vt?J(ee,[0,0,1.92],0,A.avatar==="crab"?.94:.74):J(ee,[0,.025,.35],0,A.avatar==="crab"?1.12:.88);let b=0,U=-.35,B=0;ct>=4&&(J(Xe(4,c),[b,B,U],.008,1),B+=1.25),ct>=6&&(J(Xe(6,c),[b,B,U],-.016,1),B+=1.15),ct>=9&&(J(Xe(9,c),[b,B,U],.014,1),B+=1.1),ct>=12&&(J(Xe(12,c),[b,B,U],-.012,1),B+=1.1);let H=ct>=14?Math.min(3,Math.floor((ct-14)/8)):0;for(let N=0;N<H;N++)J(Tc(15+N*8,c),[b,B,U],N%2?-.01:.012,1),B+=1.05;if(ct>=14&&J(Xe(14,c),[b,B,U],.008,1),ct>=1&&J(Xe(1,c),vt?[-1.68,0,1.62]:[-1.48,0,.72],.36,vt?.88:.98),ct>=2&&J(Xe(2,c),vt?[1.82,0,1.48]:[1.52,0,.64],-.46,vt?.78:.88),ct>=3&&J(Xe(3,c),vt?[2.56,0,.06]:[1.72,0,-.95],-.9,vt?.78:.84),ct>=5&&J(Xe(5,c),[-2.38,0,.36],.92,.82),ct>=7&&J(Xe(7,c),[3.72,-.22,3.05],-.58,.9),ct>=8&&J(Xe(8,c),[-2.18,0,-1.2],-.52,.82),ct>=10&&J(Xe(10,c),[-3.22,0,-.45],.52,.92),ct>=11&&J(Xe(11,c),[-1.14,0,2.52],.28,.72),ct>=13&&J(Xe(13,c),[-3.82,-.22,2.95],.68,.92),ct>=18&&J(un(18,c,{island:!0}),[1.65,-.22,4.42],0,.88),ct>=21&&J(un(21,c,{island:!0}),[0,0,-2.85],0,.9),ct>=25&&J(un(25,c,{island:!0}),[2.75,0,1.84],-.48,.78),ct>=30&&J(un(30,c,{island:!0}),[2.62,0,-1.42],-2.22,.78),ct>=35&&J(un(35,c,{island:!0}),[1.46,0,2.66],-.42,.72),ct>=45&&J(un(45,c,{island:!0}),[3.28,0,-.32],-.55,.88),ct>=60&&J(un(60,c,{island:!0}),[4.45,-.22,-1.85],-1.95,.9),ct>=75&&J(un(75,c,{island:!0}),[-2.18,-.05,-2.96],.35,.95),ct>=90&&J(un(90,c,{island:!0}),[2.18,-.05,-2.88],-.4,.92),ct>=100&&J(un(100,c,{island:!0}),[-.22,0,3.22],0,.74),ct>=114){let N=Math.min(4,Math.floor((ct-100)/14)),dt=[[-1.2,-3.28],[1.2,-3.28],[-3.25,-2.18],[3.25,-2.18]];for(let _t=0;_t<N;_t++)J(Ac(100+(_t+1)*14,c),[dt[_t][0],0,dt[_t][1]],0,.76)}c.setNightFactor((Le[A.sky]||Le.day).nightFactor),s()}function xt(rt,ct){for(;y.children.length;){let N=y.children[0];y.remove(N),ao(N)}k=null;let vt=null;if(rt<=0){let N=xh(A.totalDays);A.avatar==="jack"?vt=Ri(c,"jack",N,{noShadow:!0}):A.avatar==="jackie"?vt=Ri(c,"jackie",N,{noShadow:!0}):vt=us(c,N,{noShadow:!0})}else rt<=14?vt=Xe(rt,c):vt=un(rt,c,{island:!1});vt||(vt=us(c,null,{noShadow:!0}));let $t=new lt;$t.add(vt.group),y.add($t);let ee=Cg(vt.group),b=new D,U=new D;ee.getSize(b),ee.getCenter(U);let B=Math.max(b.x,b.y,b.z,.4),H=Pe.clamp(2.38/B,.55,2.15);vt.group.scale.multiplyScalar(H),vt.group.position.set(-U.x*H,-ee.min.y*H+.16,-U.z*H),ct&&ph(vt.group,c),v.lockRing.visible=!!ct,k=vt.anim||null,X=pt()?0:.45,c.setNightFactor((Le[A.sky]||Le.day).nightFactor),s()}function Ft(){let rt=P(),ct=Pe.clamp(Y,rt.minR,rt.maxR),vt=Pe.clamp(ft,ds,fs),$t=Math.sin(vt);a.position.set(ct*$t*Math.sin(ht),at+ct*Math.cos(vt),ct*$t*Math.cos(ht)),a.lookAt(0,at,0);let ee=ht+.48,b=Math.max(.35,vt*.72);g.position.set(14*Math.sin(b)*Math.sin(ee),at+14*Math.cos(b),14*Math.sin(b)*Math.cos(ee)),Math.abs(z)>.001?a.setViewOffset(Zt,tt,0,z*tt*.55,Zt,tt):a.clearViewOffset(),a.updateProjectionMatrix()}function Tt(){if(ot)return;let rt=i.getBoundingClientRect();Zt=Math.max(1,Math.round(rt.width||window.innerWidth||800)),tt=Math.max(1,Math.round(rt.height||window.innerHeight||600));let ct=e?1:Math.min(2,window.devicePixelRatio||1);n.setPixelRatio(ct),n.setSize(Zt,tt,!1),a.aspect=Zt/tt;let vt=P();et=Pe.clamp(vt.r*Nt,vt.minR,vt.maxR),Ft()}let C=new Map,w=new to,G=!1,Q=0,st=0,K=0,Lt=0,yt=0,At=0,te=0,ut=1,It=!1,Ht=0,Xt=0;function Pt(rt){if(!ot){try{r.setPointerCapture(rt.pointerId)}catch{}if(C.set(rt.pointerId,{x:rt.clientX,y:rt.clientY}),C.size===1)G=!0,Q=yt=rt.clientX,st=At=rt.clientY,K=0,Lt=performance.now(),Rt=0,zt=0;else if(C.size===2){G=!1;let ct=[...C.values()];te=Math.hypot(ct[0].x-ct[1].x,ct[0].y-ct[1].y)||1,ut=Nt}}}function ie(rt){if(ot||!C.has(rt.pointerId))return;if(C.set(rt.pointerId,{x:rt.clientX,y:rt.clientY}),C.size===2){let U=[...C.values()],B=Math.hypot(U[0].x-U[1].x,U[0].y-U[1].y)||1,H=te/B;Nt=Pe.clamp(ut*H,.62,1.5);let N=P();et=Pe.clamp(N.r*Nt,N.minR,N.maxR);return}if(!G)return;let ct=rt.clientX-yt,vt=rt.clientY-At;yt=rt.clientX,At=rt.clientY,K+=Math.hypot(ct,vt);let $t=Math.PI*1.45/Math.max(320,Math.min(Zt,tt)),ee=-ct*$t,b=-vt*$t*.72;if(gt+=ee,Vt=Pe.clamp(Vt+b,ds,fs),ht+=ee*.55,ft=Pe.clamp(ft+b*.55,ds,fs),Rt=Pe.clamp(ee*22,-6.5,6.5),zt=Pe.clamp(b*16,-4,4),Ft(),on(),!It&&K>6&&(It=!0,typeof t.onFirstDrag=="function"))try{t.onFirstDrag()}catch{}if(Ht+=Math.abs(ee),Ht>=.24&&(Ht=0,typeof t.onOrbitTick=="function"))try{t.onOrbitTick()}catch{}}function Jt(rt,ct){let vt=performance.now();if(vt-Xt<310){Xt=0,wt();return}if(Xt=vt,typeof t.onTapProp!="function")return;let $t=r.getBoundingClientRect(),ee=new mt((rt-$t.left)/Math.max(1,$t.width)*2-1,-((ct-$t.top)/Math.max(1,$t.height))*2+1);w.setFromCamera(ee,a);let b=R==="item"?y:p,U=w.intersectObject(b,!0);for(let B of U){let H=B.object.userData.milestoneDay,N=B.object.userData.prop;if(typeof H=="number"){try{t.onTapProp({day:H,prop:N})}catch{}return}}if(R==="island")try{t.onTapProp({day:null,prop:"pier"})}catch{}}function ae(rt){if(ot)return;let ct=G&&C.size===1;C.delete(rt.pointerId),C.size===0&&(G=!1),ct&&K<8&&performance.now()-Lt<420&&Jt(rt.clientX,rt.clientY)}function O(rt){if(ot)return;rt.preventDefault();let ct=Math.sign(rt.deltaY)*.08;Nt=Pe.clamp(Nt+ct,.62,1.5);let vt=P();et=Pe.clamp(vt.r*Nt,vt.minR,vt.maxR)}function St(rt){rt.preventDefault()}r.addEventListener("pointerdown",Pt),r.addEventListener("pointermove",ie),r.addEventListener("pointerup",ae),r.addEventListener("pointercancel",ae),r.addEventListener("wheel",O,{passive:!1}),r.addEventListener("webglcontextlost",St),window.addEventListener("resize",Tt);function Z(rt={}){if(ot)return;rt.totalDays!=null&&(A.totalDays=Math.max(0,Math.floor(Number(rt.totalDays)||0))),rt.streak!=null&&(A.streak=Math.max(0,Math.floor(Number(rt.streak)||0))),rt.shields!=null&&(A.shields=Math.max(0,Math.floor(Number(rt.shields)||0))),rt.avatar&&(A.avatar=rt.avatar),rt.mood&&(A.mood=rt.mood),rt.sky&&Ut(rt.sky),Ct(),R==="item"&&E===0&&xt(0,!1);let ct=P();Mt=ct.y,et=Pe.clamp(ct.r*Nt,ct.minR,ct.maxR),e&&(at=Mt,Y=et,on())}function nt(rt,ct={}){if(ot)return;if(rt==null){let ee=R==="item";R="island",E=null,S=!1,p.visible=!0,M.visible=!1,m.setInspectLook(!1),Nt=1;let b=P();Mt=b.y,et=b.r,Vt=b.phi,gt=b.theta,s(),ee&&(at=b.y,Y=b.r,ft=b.phi,ht=b.theta,Rt=0,zt=0,Ft(),on());return}let vt=Math.max(0,Math.floor(Number(rt)||0));R="item",E=vt,S=!!ct.locked,p.visible=!1,M.visible=!0,m.setInspectLook(!0),xt(vt,S),Nt=1;let $t=P();Mt=$t.y,at=$t.y,et=$t.r,Y=$t.r,Vt=$t.phi,ft=$t.phi,gt=$t.theta,ht=$t.theta,Rt=0,zt=0,Ft(),on()}function wt(){Nt=1;let rt=P();gt=rt.theta,Vt=rt.phi,et=rt.r,Mt=rt.y,Rt=0,zt=0,e&&(ht=rt.theta,ft=rt.phi,Y=rt.r,at=rt.y,Ft(),on())}function Et(rt=0,ct=0){gt+=Number(rt)||0,Vt=Pe.clamp(Vt+(Number(ct)||0),ds,fs),ht+=(Number(rt)||0)*(e?1:.45),ft=Pe.clamp(ft+(Number(ct)||0)*(e?1:.45),ds,fs),Ft(),on()}function Yt(rt){$=Pe.clamp(Number(rt)||0,-.55,.55),e&&(z=$,Ft(),on())}function ve(rt){L.setProgress(rt),on()}function De(rt="yes"){j=pt()?0:.65;let ct=R==="item"?1.5:Math.min(4.2,at+.9);T.spawn(rt,ct),on()}function ce(){return{mode:R,inspectDay:E}}function Ke(){return{theta:Number(ht.toFixed(4)),phi:Number(ft.toFixed(4)),radius:Number(Y.toFixed(4))}}function dn(rt=800,ct=600){if(ot)return"";let vt=Zt,$t=tt,ee=n.getPixelRatio(),b=z,U=Math.max(64,Math.round(rt)),B=Math.max(64,Math.round(ct));n.setPixelRatio(1),n.setSize(U,B,!1),a.aspect=U/B,z=0,a.clearViewOffset(),a.updateProjectionMatrix(),n.render(o,a);let H="";try{H=n.domElement.toDataURL("image/png")}catch{H=""}return n.setPixelRatio(ee),n.setSize(vt,$t,!1),a.aspect=vt/Math.max(1,$t),z=b,Ft(),n.render(o,a),H}let Ne=0,$e=0,rn=performance.now(),Mn=0;function on(){ot||!e||($e&&(clearTimeout($e),$e=0),Ne||(Ne=requestAnimationFrame(Rn)))}function Rn(rt){if(Ne=0,ot)return;if(document.hidden){rn=rt;return}let ct=Math.min(.05,Math.max(.001,(rt-rn)/1e3));rn=rt;let vt=pt();if(vt||(Mn+=ct),!G)if(Math.abs(Rt)>.001||Math.abs(zt)>.001){gt+=Rt*ct,Vt=Pe.clamp(Vt+zt*ct,ds,fs);let b=Math.exp(-5.4*ct);Rt*=b,zt*=b}else!vt&&R==="item"&&!e&&(gt+=ct*.22);let $t=1-Math.exp(-9.5*ct);ht+=(gt-ht)*$t,ft+=(Vt-ft)*$t,Y+=(et-Y)*$t,at+=(Mt-at)*$t,z+=($-z)*$t;let ee=1;if(j>0){j=Math.max(0,j-ct);let b=1-j/.65;ee=1+Math.sin(b*Math.PI*2)*(1-b)*.07}if(p.scale.setScalar(ee),R==="item"){if(X>0){X=Math.max(0,X-ct);let b=1-X/.45,U=.55+.45*(1-Math.pow(1-b,3))+Math.sin(b*Math.PI)*.08;y.scale.setScalar(U*ee)}else y.scale.setScalar(ee);k&&!vt&&k(Mn,ct,{mood:A.mood}),v.lockRing.visible&&!vt&&v.lockRing.scale.setScalar(1+Math.sin(Mn*2.8)*.03)}else if(!vt){let b={mood:A.mood};for(let U=0;U<F.length;U++)F[U](Mn,ct,b)}if(m.anim(Mn,vt),L.anim(Mn,R==="item",A.totalDays>=4?1.92:.35),T.update(ct),Ft(),n.render(o,a),e){let b=G||j>0||X>0;$e=setTimeout(()=>{$e=0,!ot&&!document.hidden&&!Ne&&(Ne=requestAnimationFrame(Rn))},b?40:180)}else Ne=requestAnimationFrame(Rn)}function hi(){!document.hidden&&!ot&&!Ne&&!$e&&(rn=performance.now(),Ne=requestAnimationFrame(Rn))}document.addEventListener("visibilitychange",hi);function Ys(){ot||(ot=!0,Ne&&cancelAnimationFrame(Ne),Ne=0,$e&&clearTimeout($e),$e=0,document.removeEventListener("visibilitychange",hi),window.removeEventListener("resize",Tt),r.removeEventListener("pointerdown",Pt),r.removeEventListener("pointermove",ie),r.removeEventListener("pointerup",ae),r.removeEventListener("pointercancel",ae),r.removeEventListener("wheel",O),r.removeEventListener("webglcontextlost",St),ao(p),ao(y),m.dispose(),T.dispose(),l&&Object.values(l).forEach(rt=>rt.dispose()),c.dispose(),n.dispose(),r.parentNode&&r.remove())}Ut(A.sky),Ct(),Tt();let In=P();return Mt=at=In.y,et=Y=In.r,Vt=ft=In.phi,gt=ht=In.theta,Ft(),n.render(o,a),e?$e=setTimeout(()=>{$e=0,!ot&&!document.hidden&&!Ne&&(Ne=requestAnimationFrame(Rn))},180):Ne=requestAnimationFrame(Rn),{setState:Z,inspectMilestone:nt,getMode:ce,setFocusProgress:ve,celebrate:De,getCameraAngles:Ke,nudgeOrbit:Et,resetCamera:wt,setVerticalOffset:Yt,resize:Tt,snapshot:dn,dispose:Ys}}window.TFF_DAILY3D={isSupported:yh,mount:Dg};})();
