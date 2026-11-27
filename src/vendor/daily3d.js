/* Harbour Keep 3D Diorama Engine (tools/daily3d/), with three.js r170: MIT License, Copyright © 2010-2024 three.js authors, https://threejs.org */
(()=>{var cc="170";var _h=0,Cc=1,yh=2;var Vl=1,lc=2,On=3,ni=0,ke=1,Ee=2,ti=0,Yi=1,Rc=2,Pc=3,Ic=4,vh=5,gi=100,Mh=101,Sh=102,bh=103,wh=104,Eh=200,Th=201,Ah=202,Ch=203,ko=204,Ho=205,Rh=206,Ph=207,Ih=208,Lh=209,Dh=210,Uh=211,Nh=212,Fh=213,Oh=214,Go=0,Wo=1,Xo=2,Ki=3,qo=4,Yo=5,$o=6,Zo=7,kl=0,Bh=1,zh=2,ei=0,Vh=1,kh=2,Hh=3,Gh=4,Wh=5,Xh=6,hc=7;var Hl=300,Qi=301,ji=302,Cs=303,Jo=304,to=306,tn=1e3,yi=1001,Ko=1002,_n=1003,qh=1004;var Ys=1005;var wn=1006,ao=1007;var vi=1008;var Hn=1009,Gl=1010,Wl=1011,Rs=1012,uc=1013,Mi=1014,zn=1015,Gs=1016,dc=1017,fc=1018,ts=1020,Xl=35902,ql=1021,Yl=1022,xn=1023,$l=1024,Zl=1025,$i=1026,es=1027,Jl=1028,pc=1029,Kl=1030,mc=1031;var gc=1033,vr=33776,Mr=33777,Sr=33778,br=33779,Qo=35840,jo=35841,ta=35842,ea=35843,na=36196,ia=37492,sa=37496,ra=37808,oa=37809,aa=37810,ca=37811,la=37812,ha=37813,ua=37814,da=37815,fa=37816,pa=37817,ma=37818,ga=37819,xa=37820,_a=37821,wr=36492,ya=36494,va=36495,Ql=36283,Ma=36284,Sa=36285,ba=36286;var Er=2300,wa=2301,co=2302,Lc=2400,Dc=2401,Uc=2402;var Yh=3200,$h=3201;var jl=0,Zh=1,jn="",ze="srgb",cs="srgb-linear",eo="linear",ue="srgb";var Pi=7680;var Nc=519,Jh=512,Kh=513,Qh=514,th=515,jh=516,tu=517,eu=518,nu=519,Fc=35044;var Oc="300 es",Vn=2e3,Tr=2001,ii=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bc=1234567,Ss=Math.PI/180,Ps=180/Math.PI;function Ti(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function we(i,t,e){return Math.max(t,Math.min(e,i))}function xc(i,t){return(i%t+t)%t}function iu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function su(i,t,e){return i!==t?(e-i)/(t-i):0}function bs(i,t,e){return(1-e)*i+e*t}function ru(i,t,e,n){return bs(i,t,1-Math.exp(-e*n))}function ou(i,t=1){return t-Math.abs(xc(i,t*2)-t)}function au(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function cu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function lu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function hu(i,t){return i+Math.random()*(t-i)}function uu(i){return i*(.5-Math.random())}function du(i){i!==void 0&&(Bc=i);let t=Bc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fu(i){return i*Ss}function pu(i){return i*Ps}function mu(i){return(i&i-1)===0&&i!==0}function gu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function xu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function _u(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),d=r((t-n)/2),h=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Xe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ce={DEG2RAD:Ss,RAD2DEG:Ps,generateUUID:Ti,clamp:we,euclideanModulo:xc,mapLinear:iu,inverseLerp:su,lerp:bs,damp:ru,pingpong:ou,smoothstep:au,smootherstep:cu,randInt:lu,randFloat:hu,randFloatSpread:uu,seededRandom:du,degToRad:fu,radToDeg:pu,isPowerOfTwo:mu,ceilPowerOfTwo:gu,floorPowerOfTwo:xu,setQuaternionFromProperEuler:_u,normalize:Xe,denormalize:Wi},pt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(we(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],S=s[1],v=s[4],y=s[7],R=s[2],T=s[5],C=s[8];return r[0]=o*_+a*S+c*R,r[3]=o*g+a*v+c*T,r[6]=o*p+a*y+c*C,r[1]=l*_+u*S+d*R,r[4]=l*g+u*v+d*T,r[7]=l*p+u*y+d*C,r[2]=h*_+f*S+m*R,r[5]=h*g+f*v+m*T,r[8]=h*p+f*y+m*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=u*o-a*l,h=a*c-u*r,f=l*r-o*c,m=e*d+n*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=d*_,t[1]=(s*l-u*n)*_,t[2]=(a*n-s*o)*_,t[3]=h*_,t[4]=(u*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(lo.makeScale(t,e)),this}rotate(t){return this.premultiply(lo.makeRotation(-t)),this}translate(t,e){return this.premultiply(lo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},lo=new Qt;function eh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function yu(){let i=Ar("canvas");return i.style.display="block",i}var zc={};function vs(i){i in zc||(zc[i]=!0,console.warn(i))}function vu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Mu(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Su(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ie={enabled:!0,workingColorSpace:cs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ue&&(i.r=kn(i.r),i.g=kn(i.g),i.b=kn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ue&&(i.r=Zi(i.r),i.g=Zi(i.g),i.b=Zi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===jn?eo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Vc=[.64,.33,.3,.6,.15,.06],kc=[.2126,.7152,.0722],Hc=[.3127,.329],Gc=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wc=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ie.define({[cs]:{primaries:Vc,whitePoint:Hc,transfer:eo,toXYZ:Gc,fromXYZ:Wc,luminanceCoefficients:kc,workingColorSpaceConfig:{unpackColorSpace:ze},outputColorSpaceConfig:{drawingBufferColorSpace:ze}},[ze]:{primaries:Vc,whitePoint:Hc,transfer:ue,toXYZ:Gc,fromXYZ:Wc,luminanceCoefficients:kc,outputColorSpaceConfig:{drawingBufferColorSpace:ze}}});var Ii,Ea=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ii===void 0&&(Ii=Ar("canvas")),Ii.width=t.width,Ii.height=t.height;let n=Ii.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ii}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Ar("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=kn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(kn(e[n]/255)*255):e[n]=kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},bu=0,Cr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=Ti(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ho(s[o].image)):r.push(ho(s[o]))}else r=ho(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ho(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Ea.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var wu=0,en=class i extends ii{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=yi,s=yi,r=wn,o=vi,a=xn,c=Hn,l=i.DEFAULT_ANISOTROPY,u=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=Ti(),this.name="",this.source=new Cr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new pt(0,0),this.repeat=new pt(1,1),this.center=new pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case tn:t.x=t.x-Math.floor(t.x);break;case yi:t.x=t.x<0?0:1;break;case Ko:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case tn:t.y=t.y-Math.floor(t.y);break;case yi:t.y=t.y<0?0:1;break;case Ko:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Hl;en.DEFAULT_ANISOTROPY=1;var de=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(l+1)/2,y=(f+1)/2,R=(p+1)/2,T=(u+h)/4,C=(d+_)/4,P=(m+g)/4;return v>y&&v>R?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=C/n):y>R?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=P/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=C/r,s=P/r),this.set(n,s,r,e),this}let S=Math.sqrt((g-m)*(g-m)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(d-_)/S,this.z=(h-u)/S,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ta=class extends ii{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new en(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Cr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gn=class extends Ta{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Rr=class extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Aa=class extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var si=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],h=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(d!==_||c!==h||l!==f||u!==m){let g=1-a,p=c*h+l*f+u*m+d*_,S=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let R=Math.sqrt(v),T=Math.atan2(R,p*S);g=Math.sin(g*T)/R,a=Math.sin(a*T)/R}let y=a*S;if(c=c*g+h*y,l=l*g+f*y,u=u*g+m*y,d=d*g+_*y,g===1-a){let R=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=R,l*=R,u*=R,d*=R}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[o],h=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+u*d+c*f-l*h,t[e+1]=c*m+u*h+l*d-a*f,t[e+2]=l*m+u*f+a*h-c*d,t[e+3]=u*m-a*d-c*h-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),d=a(r/2),h=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=h*u*d+l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d+h*f*m;break;case"YZX":this._x=h*u*d+l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d-h*f*m;break;case"XZY":this._x=h*u*d-l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d+h*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],d=e[10],h=n+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(we(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-e)*u)/l,h=Math.sin(e*u)/l;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return uo.copy(this).projectOnVector(t),this.sub(uo)}reflect(t){return this.sub(uo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(we(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},uo=new D,Xc=new si,En=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,pn):pn.fromBufferAttribute(r,o),pn.applyMatrix4(t.matrixWorld),this.expandByPoint(pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(t.matrixWorld),this.union($s)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,pn),pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),Zs.subVectors(this.max,ms),Li.subVectors(t.a,ms),Di.subVectors(t.b,ms),Ui.subVectors(t.c,ms),Yn.subVectors(Di,Li),$n.subVectors(Ui,Di),li.subVectors(Li,Ui);let e=[0,-Yn.z,Yn.y,0,-$n.z,$n.y,0,-li.z,li.y,Yn.z,0,-Yn.x,$n.z,0,-$n.x,li.z,0,-li.x,-Yn.y,Yn.x,0,-$n.y,$n.x,0,-li.y,li.x,0];return!fo(e,Li,Di,Ui,Zs)||(e=[1,0,0,0,1,0,0,0,1],!fo(e,Li,Di,Ui,Zs))?!1:(Js.crossVectors(Yn,$n),e=[Js.x,Js.y,Js.z],fo(e,Li,Di,Ui,Zs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ln=[new D,new D,new D,new D,new D,new D,new D,new D],pn=new D,$s=new En,Li=new D,Di=new D,Ui=new D,Yn=new D,$n=new D,li=new D,ms=new D,Zs=new D,Js=new D,hi=new D;function fo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){hi.fromArray(i,r);let a=s.x*Math.abs(hi.x)+s.y*Math.abs(hi.y)+s.z*Math.abs(hi.z),c=t.dot(hi),l=e.dot(hi),u=n.dot(hi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Eu=new En,gs=new D,po=new D,ns=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Eu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);let e=gs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(gs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(po.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(po)),this.expandByPoint(gs.copy(t.center).sub(po))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Dn=new D,mo=new D,Ks=new D,Zn=new D,go=new D,Qs=new D,xo=new D,Is=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){mo.copy(t).add(e).multiplyScalar(.5),Ks.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(mo);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ks),a=Zn.dot(this.direction),c=-Zn.dot(Ks),l=Zn.lengthSq(),u=Math.abs(1-o*o),d,h,f,m;if(u>0)if(d=o*c-a,h=o*a-c,m=r*u,d>=0)if(h>=-m)if(h<=m){let _=1/u;d*=_,h*=_,f=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h<=-m?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l):h<=m?(d=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(mo).addScaledVector(Ks,h),f}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-h.z)*d,c=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,c=(t.min.z-h.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){go.subVectors(e,t),Qs.subVectors(n,t),xo.crossVectors(go,Qs);let o=this.direction.dot(xo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zn.subVectors(this.origin,t);let c=a*this.direction.dot(Qs.crossVectors(Zn,Qs));if(c<0)return null;let l=a*this.direction.dot(go.cross(Zn));if(l<0||c+l>o)return null;let u=-a*Zn.dot(xo);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},xe=class i{constructor(t,e,n,s,r,o,a,c,l,u,d,h,f,m,_,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,d,h,f,m,_,g)}set(t,e,n,s,r,o,a,c,l,u,d,h,f,m,_,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Ni.setFromMatrixColumn(t,0).length(),r=1/Ni.setFromMatrixColumn(t,1).length(),o=1/Ni.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=o*u,f=o*d,m=a*u,_=a*d;e[0]=c*u,e[4]=-c*d,e[8]=l,e[1]=f+m*l,e[5]=h-_*l,e[9]=-a*c,e[2]=_-h*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){let h=c*u,f=c*d,m=l*u,_=l*d;e[0]=h+_*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=f*a-m,e[6]=_+h*a,e[10]=o*c}else if(t.order==="ZXY"){let h=c*u,f=c*d,m=l*u,_=l*d;e[0]=h-_*a,e[4]=-o*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let h=o*u,f=o*d,m=a*u,_=a*d;e[0]=c*u,e[4]=m*l-f,e[8]=h*l+_,e[1]=c*d,e[5]=_*l+h,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let h=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*u,e[4]=_-h*d,e[8]=m*d+f,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=f*d+m,e[10]=h-_*d}else if(t.order==="XZY"){let h=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*u,e[4]=-d,e[8]=l*u,e[1]=h*d+_,e[5]=o*u,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*u,e[10]=_*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Tu,t,Au)}lookAt(t,e,n){let s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),Jn.crossVectors(n,Qe),Jn.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),Jn.crossVectors(n,Qe)),Jn.normalize(),js.crossVectors(Qe,Jn),s[0]=Jn.x,s[4]=js.x,s[8]=Qe.x,s[1]=Jn.y,s[5]=js.y,s[9]=Qe.y,s[2]=Jn.z,s[6]=js.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],S=n[3],v=n[7],y=n[11],R=n[15],T=s[0],C=s[4],P=s[8],E=s[12],M=s[1],I=s[5],O=s[9],F=s[13],V=s[2],$=s[6],G=s[10],it=s[14],X=s[3],st=s[7],ft=s[11],yt=s[15];return r[0]=o*T+a*M+c*V+l*X,r[4]=o*C+a*I+c*$+l*st,r[8]=o*P+a*O+c*G+l*ft,r[12]=o*E+a*F+c*it+l*yt,r[1]=u*T+d*M+h*V+f*X,r[5]=u*C+d*I+h*$+f*st,r[9]=u*P+d*O+h*G+f*ft,r[13]=u*E+d*F+h*it+f*yt,r[2]=m*T+_*M+g*V+p*X,r[6]=m*C+_*I+g*$+p*st,r[10]=m*P+_*O+g*G+p*ft,r[14]=m*E+_*F+g*it+p*yt,r[3]=S*T+v*M+y*V+R*X,r[7]=S*C+v*I+y*$+R*st,r[11]=S*P+v*O+y*G+R*ft,r[15]=S*E+v*F+y*it+R*yt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],d=t[6],h=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*c*d-s*l*d-r*a*h+n*l*h+s*a*f-n*c*f)+_*(+e*c*f-e*l*h+r*o*h-s*o*f+s*l*u-r*c*u)+g*(+e*l*d-e*a*f-r*o*d+n*o*f+r*a*u-n*l*u)+p*(-s*a*u-e*c*d+e*a*h+s*o*d-n*o*h+n*c*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=t[9],h=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],S=d*g*l-_*h*l+_*c*f-a*g*f-d*c*p+a*h*p,v=m*h*l-u*g*l-m*c*f+o*g*f+u*c*p-o*h*p,y=u*_*l-m*d*l+m*a*f-o*_*f-u*a*p+o*d*p,R=m*d*c-u*_*c-m*a*h+o*_*h+u*a*g-o*d*g,T=e*S+n*v+s*y+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/T;return t[0]=S*C,t[1]=(_*h*r-d*g*r-_*s*f+n*g*f+d*s*p-n*h*p)*C,t[2]=(a*g*r-_*c*r+_*s*l-n*g*l-a*s*p+n*c*p)*C,t[3]=(d*c*r-a*h*r-d*s*l+n*h*l+a*s*f-n*c*f)*C,t[4]=v*C,t[5]=(u*g*r-m*h*r+m*s*f-e*g*f-u*s*p+e*h*p)*C,t[6]=(m*c*r-o*g*r-m*s*l+e*g*l+o*s*p-e*c*p)*C,t[7]=(o*h*r-u*c*r+u*s*l-e*h*l-o*s*f+e*c*f)*C,t[8]=y*C,t[9]=(m*d*r-u*_*r-m*n*f+e*_*f+u*n*p-e*d*p)*C,t[10]=(o*_*r-m*a*r+m*n*l-e*_*l-o*n*p+e*a*p)*C,t[11]=(u*a*r-o*d*r-u*n*l+e*d*l+o*n*f-e*a*f)*C,t[12]=R*C,t[13]=(u*_*s-m*d*s+m*n*h-e*_*h-u*n*g+e*d*g)*C,t[14]=(m*a*s-o*_*s-m*n*c+e*_*c+o*n*g-e*a*g)*C,t[15]=(o*d*s-u*a*s+u*n*c-e*d*c-o*n*h+e*a*h)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,d=a+a,h=r*l,f=r*u,m=r*d,_=o*u,g=o*d,p=a*d,S=c*l,v=c*u,y=c*d,R=n.x,T=n.y,C=n.z;return s[0]=(1-(_+p))*R,s[1]=(f+y)*R,s[2]=(m-v)*R,s[3]=0,s[4]=(f-y)*T,s[5]=(1-(h+p))*T,s[6]=(g+S)*T,s[7]=0,s[8]=(m+v)*C,s[9]=(g-S)*C,s[10]=(1-(h+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Ni.set(s[0],s[1],s[2]).length(),o=Ni.set(s[4],s[5],s[6]).length(),a=Ni.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],mn.copy(this);let l=1/r,u=1/o,d=1/a;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=u,mn.elements[5]*=u,mn.elements[6]*=u,mn.elements[8]*=d,mn.elements[9]*=d,mn.elements[10]*=d,e.setFromRotationMatrix(mn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Vn){let c=this.elements,l=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),h=(n+s)/(n-s),f,m;if(a===Vn)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===Tr)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Vn){let c=this.elements,l=1/(e-t),u=1/(n-s),d=1/(o-r),h=(e+t)*l,f=(n+s)*u,m,_;if(a===Vn)m=(o+r)*d,_=-2*d;else if(a===Tr)m=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ni=new D,mn=new xe,Tu=new D(0,0,0),Au=new D(1,1,1),Jn=new D,js=new D,Qe=new D,qc=new xe,Yc=new si,Tn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(we(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-we(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(we(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-we(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(we(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-we(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yc.setFromEuler(this),this.setFromQuaternion(Yc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tn.DEFAULT_ORDER="XYZ";var Ls=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Cu=0,$c=new D,Fi=new si,Un=new xe,tr=new D,xs=new D,Ru=new D,Pu=new si,Zc=new D(1,0,0),Jc=new D(0,1,0),Kc=new D(0,0,1),Qc={type:"added"},Iu={type:"removed"},Oi={type:"childadded",child:null},_o={type:"childremoved",child:null},He=class i extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=Ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new Tn,n=new si,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xe},normalMatrix:{value:new Qt}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ls,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.premultiply(Fi),this}rotateX(t){return this.rotateOnAxis(Zc,t)}rotateY(t){return this.rotateOnAxis(Jc,t)}rotateZ(t){return this.rotateOnAxis(Kc,t)}translateOnAxis(t,e){return $c.copy(t).applyQuaternion(this.quaternion),this.position.add($c.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zc,t)}translateY(t){return this.translateOnAxis(Jc,t)}translateZ(t){return this.translateOnAxis(Kc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?tr.copy(t):tr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(xs,tr,this.up):Un.lookAt(tr,xs,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),Fi.setFromRotationMatrix(Un),this.quaternion.premultiply(Fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qc),Oi.child=t,this.dispatchEvent(Oi),Oi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Iu),_o.child=t,this.dispatchEvent(_o),_o.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qc),Oi.child=t,this.dispatchEvent(Oi),Oi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,t,Ru),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,Pu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),d=o(t.shapes),h=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};He.DEFAULT_UP=new D(0,1,0);He.DEFAULT_MATRIX_AUTO_UPDATE=!0;He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gn=new D,Nn=new D,yo=new D,Fn=new D,Bi=new D,zi=new D,jc=new D,vo=new D,Mo=new D,So=new D,bo=new de,wo=new de,Eo=new de,xi=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),gn.subVectors(t,e),s.cross(gn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){gn.subVectors(s,e),Nn.subVectors(n,e),yo.subVectors(t,e);let o=gn.dot(gn),a=gn.dot(Nn),c=gn.dot(yo),l=Nn.dot(Nn),u=Nn.dot(yo),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(l*c-a*u)*h,m=(o*u-a*c)*h;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Fn.x),c.addScaledVector(o,Fn.y),c.addScaledVector(a,Fn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return bo.setScalar(0),wo.setScalar(0),Eo.setScalar(0),bo.fromBufferAttribute(t,e),wo.fromBufferAttribute(t,n),Eo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(bo,r.x),o.addScaledVector(wo,r.y),o.addScaledVector(Eo,r.z),o}static isFrontFacing(t,e,n,s){return gn.subVectors(n,e),Nn.subVectors(t,e),gn.cross(Nn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),gn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Bi.subVectors(s,n),zi.subVectors(r,n),vo.subVectors(t,n);let c=Bi.dot(vo),l=zi.dot(vo);if(c<=0&&l<=0)return e.copy(n);Mo.subVectors(t,s);let u=Bi.dot(Mo),d=zi.dot(Mo);if(u>=0&&d<=u)return e.copy(s);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(Bi,o);So.subVectors(t,r);let f=Bi.dot(So),m=zi.dot(So);if(m>=0&&f<=m)return e.copy(r);let _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(zi,a);let g=u*m-f*d;if(g<=0&&d-u>=0&&f-m>=0)return jc.subVectors(r,s),a=(d-u)/(d-u+(f-m)),e.copy(s).addScaledVector(jc,a);let p=1/(g+_+h);return o=_*p,a=h*p,e.copy(n).addScaledVector(Bi,o).addScaledVector(zi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},er={h:0,s:0,l:0};function To(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ht=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ie.workingColorSpace){if(t=xc(t,1),e=we(e,0,1),n=we(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=To(o,r,t+1/3),this.g=To(o,r,t),this.b=To(o,r,t-1/3)}return ie.toWorkingColorSpace(this,s),this}setStyle(t,e=ze){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ze){let n=nh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=Zi(t.r),this.g=Zi(t.g),this.b=Zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ze){return ie.fromWorkingColorSpace(Be.copy(this),t),Math.round(we(Be.r*255,0,255))*65536+Math.round(we(Be.g*255,0,255))*256+Math.round(we(Be.b*255,0,255))}getHexString(t=ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.fromWorkingColorSpace(Be.copy(this),e);let n=Be.r,s=Be.g,r=Be.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ie.workingColorSpace){return ie.fromWorkingColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=ze){ie.fromWorkingColorSpace(Be.copy(this),t);let e=Be.r,n=Be.g,s=Be.b;return t!==ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Kn),this.setHSL(Kn.h+t,Kn.s+e,Kn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Kn),t.getHSL(er);let n=bs(Kn.h,er.h,e),s=bs(Kn.s,er.s,e),r=bs(Kn.l,er.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Be=new Ht;Ht.NAMES=nh;var Lu=0,ri=class extends ii{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=Ti(),this.name="",this.blending=Yi,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ko,this.blendDst=Ho,this.blendEquation=gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=Ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ko&&(n.blendSrc=this.blendSrc),this.blendDst!==Ho&&(n.blendDst=this.blendDst),this.blendEquation!==gi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ki&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},oi=class extends ri{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var be=new D,nr=new pt,Ze=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Fc,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)nr.fromBufferAttribute(this,e),nr.applyMatrix3(t),this.setXY(e,nr.x,nr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Wi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Wi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Wi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Wi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array),r=Xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Fc&&(t.usage=this.usage),t}};var Pr=class extends Ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ir=class extends Ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var le=class extends Ze{constructor(t,e,n){super(new Float32Array(t),e,n)}},Du=0,an=new xe,Ao=new He,Vi=new D,je=new En,_s=new En,Ie=new D,Fe=class i extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=Ti(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(eh(t)?Ir:Pr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,n){return an.makeTranslation(t,e,n),this.applyMatrix4(an),this}scale(t,e,n){return an.makeScale(t,e,n),this.applyMatrix4(an),this}lookAt(t){return Ao.lookAt(t),Ao.updateMatrix(),this.applyMatrix4(Ao.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new le(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ns);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];_s.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(je.min,_s.min),je.expandByPoint(Ie),Ie.addVectors(je.max,_s.max),je.expandByPoint(Ie)):(je.expandByPoint(_s.min),je.expandByPoint(_s.max))}je.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ie.fromBufferAttribute(a,l),c&&(Vi.fromBufferAttribute(t,l),Ie.add(Vi)),s=Math.max(s,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ze(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new D,c[P]=new D;let l=new D,u=new D,d=new D,h=new pt,f=new pt,m=new pt,_=new D,g=new D;function p(P,E,M){l.fromBufferAttribute(n,P),u.fromBufferAttribute(n,E),d.fromBufferAttribute(n,M),h.fromBufferAttribute(r,P),f.fromBufferAttribute(r,E),m.fromBufferAttribute(r,M),u.sub(l),d.sub(l),f.sub(h),m.sub(h);let I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(I),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),a[P].add(_),a[E].add(_),a[M].add(_),c[P].add(g),c[E].add(g),c[M].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let P=0,E=S.length;P<E;++P){let M=S[P],I=M.start,O=M.count;for(let F=I,V=I+O;F<V;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}let v=new D,y=new D,R=new D,T=new D;function C(P){R.fromBufferAttribute(s,P),T.copy(R);let E=a[P];v.copy(E),v.sub(R.multiplyScalar(R.dot(E))).normalize(),y.crossVectors(T,E);let I=y.dot(c[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,I)}for(let P=0,E=S.length;P<E;++P){let M=S[P],I=M.start,O=M.count;for(let F=I,V=I+O;F<V;F+=3)C(t.getX(F+0)),C(t.getX(F+1)),C(t.getX(F+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,u=new D,d=new D;if(t)for(let h=0,f=t.count;h<f;h+=3){let m=t.getX(h+0),_=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(u),c.add(u),l.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),f=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*u;for(let p=0;p<u;p++)h[m++]=l[f++]}return new Ze(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],f=t(h,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let f=l[d];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],d=r[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},tl=new xe,ui=new Is,ir=new ns,el=new D,sr=new D,rr=new D,or=new D,Co=new D,ar=new D,nl=new D,cr=new D,Ne=class extends He{constructor(t=new Fe,e=new oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){ar.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],d=r[c];u!==0&&(Co.fromBufferAttribute(d,t),o?ar.addScaledVector(Co,u):ar.addScaledVector(Co.sub(e),u))}e.add(ar)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(r),ui.copy(t.ray).recast(t.near),!(ir.containsPoint(ui.origin)===!1&&(ui.intersectSphere(ir,el)===null||ui.origin.distanceToSquared(el)>(t.far-t.near)**2))&&(tl.copy(r).invert(),ui.copy(t.ray).applyMatrix4(tl),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ui)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){let g=h[m],p=o[g.materialIndex],S=Math.max(g.start,f.start),v=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=S,R=v;y<R;y+=3){let T=a.getX(y),C=a.getX(y+1),P=a.getX(y+2);s=lr(this,p,t,n,l,u,d,T,C,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let S=a.getX(g),v=a.getX(g+1),y=a.getX(g+2);s=lr(this,o,t,n,l,u,d,S,v,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){let g=h[m],p=o[g.materialIndex],S=Math.max(g.start,f.start),v=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=S,R=v;y<R;y+=3){let T=y,C=y+1,P=y+2;s=lr(this,p,t,n,l,u,d,T,C,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let S=g,v=g+1,y=g+2;s=lr(this,o,t,n,l,u,d,S,v,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Uu(i,t,e,n,s,r,o,a){let c;if(t.side===ke?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===ni,a),c===null)return null;cr.copy(a),cr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(cr);return l<e.near||l>e.far?null:{distance:l,point:cr.clone(),object:i}}function lr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,sr),i.getVertexPosition(c,rr),i.getVertexPosition(l,or);let u=Uu(i,t,e,n,sr,rr,or,nl);if(u){let d=new D;xi.getBarycoord(nl,sr,rr,or,d),s&&(u.uv=xi.getInterpolatedAttribute(s,a,c,l,d,new pt)),r&&(u.uv1=xi.getInterpolatedAttribute(r,a,c,l,d,new pt)),o&&(u.normal=xi.getInterpolatedAttribute(o,a,c,l,d,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new D,materialIndex:0};xi.getNormal(sr,rr,or,h.normal),u.face=h,u.barycoord=d}return u}var Le=class i extends Fe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],d=[],h=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new le(l,3)),this.setAttribute("normal",new le(u,3)),this.setAttribute("uv",new le(d,2));function m(_,g,p,S,v,y,R,T,C,P,E){let M=y/C,I=R/P,O=y/2,F=R/2,V=T/2,$=C+1,G=P+1,it=0,X=0,st=new D;for(let ft=0;ft<G;ft++){let yt=ft*I-F;for(let zt=0;zt<$;zt++){let $t=zt*M-O;st[_]=$t*S,st[g]=yt*v,st[p]=V,l.push(st.x,st.y,st.z),st[_]=0,st[g]=0,st[p]=T>0?1:-1,u.push(st.x,st.y,st.z),d.push(zt/C),d.push(1-ft/P),it+=1}}for(let ft=0;ft<P;ft++)for(let yt=0;yt<C;yt++){let zt=h+yt+$*ft,$t=h+yt+$*(ft+1),Z=h+(yt+1)+$*(ft+1),at=h+(yt+1)+$*ft;c.push(zt,$t,at),c.push($t,Z,at),X+=6}a.addGroup(f,X,E),f+=X,h+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function is(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function qe(i){let t={};for(let e=0;e<i.length;e++){let n=is(i[e]);for(let s in n)t[s]=n[s]}return t}function Nu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ih(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}var Fu={clone:is,merge:qe},Ou=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,An=class extends ri{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ou,this.fragmentShader=Bu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=Nu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Lr=class extends He{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=Vn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Qn=new D,il=new pt,sl=new pt,Ve=class extends Lr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ps*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ss*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ps*2*Math.atan(Math.tan(Ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,il,sl),e.subVectors(sl,il)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ss*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ki=-90,Hi=1,Ca=class extends He{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ve(ki,Hi,t,e);s.layers=this.layers,this.add(s);let r=new Ve(ki,Hi,t,e);r.layers=this.layers,this.add(r);let o=new Ve(ki,Hi,t,e);o.layers=this.layers,this.add(o);let a=new Ve(ki,Hi,t,e);a.layers=this.layers,this.add(a);let c=new Ve(ki,Hi,t,e);c.layers=this.layers,this.add(c);let l=new Ve(ki,Hi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Dr=class extends en{constructor(t,e,n,s,r,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:Qi,super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ra=class extends Gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Dr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:wn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Le(5,5,5),r=new An({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:ti});r.uniforms.tEquirect.value=e;let o=new Ne(s,r),a=e.minFilter;return e.minFilter===vi&&(e.minFilter=wn),new Ca(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Ro=new D,zu=new D,Vu=new Qt,Bn=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ro.subVectors(n,e).cross(zu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ro),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Vu.getNormalMatrix(t),s=this.coplanarPoint(Ro).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},di=new ns,hr=new D,Ds=class{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,o=new Bn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Vn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],d=s[6],h=s[7],f=s[8],m=s[9],_=s[10],g=s[11],p=s[12],S=s[13],v=s[14],y=s[15];if(n[0].setComponents(c-r,h-l,g-f,y-p).normalize(),n[1].setComponents(c+r,h+l,g+f,y+p).normalize(),n[2].setComponents(c+o,h+u,g+m,y+S).normalize(),n[3].setComponents(c-o,h-u,g-m,y-S).normalize(),n[4].setComponents(c-a,h-d,g-_,y-v).normalize(),e===Vn)n[5].setComponents(c+a,h+d,g+_,y+v).normalize();else if(e===Tr)n[5].setComponents(a,d,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(t){return di.center.set(0,0,0),di.radius=.7071067811865476,di.applyMatrix4(t.matrixWorld),this.intersectsSphere(di)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(hr.x=s.normal.x>0?t.max.x:t.min.x,hr.y=s.normal.y>0?t.max.y:t.min.y,hr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(hr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function sh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ku(i){let t=new WeakMap;function e(a,c){let l=a.array,u=a.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){let m=d[h],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){let _=d[f];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Se=class i extends Fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,d=t/a,h=e/c,f=[],m=[],_=[],g=[];for(let p=0;p<u;p++){let S=p*h-o;for(let v=0;v<l;v++){let y=v*d-r;m.push(y,-S,0),_.push(0,0,1),g.push(v/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<a;S++){let v=S+l*p,y=S+l*(p+1),R=S+1+l*(p+1),T=S+1+l*p;f.push(v,y,T),f.push(y,R,T)}this.setIndex(f),this.setAttribute("position",new le(m,3)),this.setAttribute("normal",new le(_,3)),this.setAttribute("uv",new le(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Hu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gu=`#ifdef USE_ALPHAHASH
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
#endif`,Wu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$u=`#ifdef USE_AOMAP
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
#endif`,Zu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ju=`#ifdef USE_BATCHING
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
#endif`,Ku=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ju=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,td=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ed=`#ifdef USE_IRIDESCENCE
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
#endif`,nd=`#ifdef USE_BUMPMAP
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
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,od=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ld=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ud=`#define PI 3.141592653589793
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
} // validated`,dd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fd=`vec3 transformedNormal = objectNormal;
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
#endif`,pd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,md=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_d="gl_FragColor = linearToOutputTexel( gl_FragColor );",yd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vd=`#ifdef USE_ENVMAP
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
#endif`,Md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Sd=`#ifdef USE_ENVMAP
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
#endif`,bd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wd=`#ifdef USE_ENVMAP
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
#endif`,Ed=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ad=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rd=`#ifdef USE_GRADIENTMAP
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
}`,Pd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Id=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dd=`uniform bool receiveShadow;
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
#endif`,Ud=`#ifdef USE_ENVMAP
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
#endif`,Nd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Od=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zd=`PhysicalMaterial material;
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
#endif`,Vd=`struct PhysicalMaterial {
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
}`,kd=`
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
#endif`,Hd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$d=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kd=`#if defined( USE_POINTS_UV )
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
#endif`,Qd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ef=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sf=`#ifdef USE_MORPHTARGETS
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
#endif`,rf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,of=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,af=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,uf=`#ifdef USE_NORMALMAP
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
#endif`,df=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ff=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,_f=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ef=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Af=`float getShadowMask() {
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
}`,Cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rf=`#ifdef USE_SKINNING
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
#endif`,Pf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,If=`#ifdef USE_SKINNING
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
#endif`,Lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Df=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Uf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ff=`#ifdef USE_TRANSMISSION
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
#endif`,Of=`#ifdef USE_TRANSMISSION
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
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Hf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gf=`uniform sampler2D t2D;
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
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`#include <common>
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
}`,Zf=`#if DEPTH_PACKING == 3200
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
}`,Jf=`#define DISTANCE
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
}`,Kf=`#define DISTANCE
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
}`,Qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`uniform float scale;
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
}`,e0=`uniform vec3 diffuse;
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
}`,n0=`#include <common>
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
}`,i0=`uniform vec3 diffuse;
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
}`,s0=`#define LAMBERT
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
}`,r0=`#define LAMBERT
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
}`,o0=`#define MATCAP
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
}`,a0=`#define MATCAP
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
}`,c0=`#define NORMAL
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
}`,l0=`#define NORMAL
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
}`,h0=`#define PHONG
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
}`,u0=`#define PHONG
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
}`,d0=`#define STANDARD
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
}`,f0=`#define STANDARD
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
}`,p0=`#define TOON
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
}`,m0=`#define TOON
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
}`,g0=`uniform float size;
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
}`,x0=`uniform vec3 diffuse;
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
}`,_0=`#include <common>
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
}`,y0=`uniform vec3 color;
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
}`,v0=`uniform float rotation;
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
}`,M0=`uniform vec3 diffuse;
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
}`,jt={alphahash_fragment:Hu,alphahash_pars_fragment:Gu,alphamap_fragment:Wu,alphamap_pars_fragment:Xu,alphatest_fragment:qu,alphatest_pars_fragment:Yu,aomap_fragment:$u,aomap_pars_fragment:Zu,batching_pars_vertex:Ju,batching_vertex:Ku,begin_vertex:Qu,beginnormal_vertex:ju,bsdfs:td,iridescence_fragment:ed,bumpmap_pars_fragment:nd,clipping_planes_fragment:id,clipping_planes_pars_fragment:sd,clipping_planes_pars_vertex:rd,clipping_planes_vertex:od,color_fragment:ad,color_pars_fragment:cd,color_pars_vertex:ld,color_vertex:hd,common:ud,cube_uv_reflection_fragment:dd,defaultnormal_vertex:fd,displacementmap_pars_vertex:pd,displacementmap_vertex:md,emissivemap_fragment:gd,emissivemap_pars_fragment:xd,colorspace_fragment:_d,colorspace_pars_fragment:yd,envmap_fragment:vd,envmap_common_pars_fragment:Md,envmap_pars_fragment:Sd,envmap_pars_vertex:bd,envmap_physical_pars_fragment:Ud,envmap_vertex:wd,fog_vertex:Ed,fog_pars_vertex:Td,fog_fragment:Ad,fog_pars_fragment:Cd,gradientmap_pars_fragment:Rd,lightmap_pars_fragment:Pd,lights_lambert_fragment:Id,lights_lambert_pars_fragment:Ld,lights_pars_begin:Dd,lights_toon_fragment:Nd,lights_toon_pars_fragment:Fd,lights_phong_fragment:Od,lights_phong_pars_fragment:Bd,lights_physical_fragment:zd,lights_physical_pars_fragment:Vd,lights_fragment_begin:kd,lights_fragment_maps:Hd,lights_fragment_end:Gd,logdepthbuf_fragment:Wd,logdepthbuf_pars_fragment:Xd,logdepthbuf_pars_vertex:qd,logdepthbuf_vertex:Yd,map_fragment:$d,map_pars_fragment:Zd,map_particle_fragment:Jd,map_particle_pars_fragment:Kd,metalnessmap_fragment:Qd,metalnessmap_pars_fragment:jd,morphinstance_vertex:tf,morphcolor_vertex:ef,morphnormal_vertex:nf,morphtarget_pars_vertex:sf,morphtarget_vertex:rf,normal_fragment_begin:of,normal_fragment_maps:af,normal_pars_fragment:cf,normal_pars_vertex:lf,normal_vertex:hf,normalmap_pars_fragment:uf,clearcoat_normal_fragment_begin:df,clearcoat_normal_fragment_maps:ff,clearcoat_pars_fragment:pf,iridescence_pars_fragment:mf,opaque_fragment:gf,packing:xf,premultiplied_alpha_fragment:_f,project_vertex:yf,dithering_fragment:vf,dithering_pars_fragment:Mf,roughnessmap_fragment:Sf,roughnessmap_pars_fragment:bf,shadowmap_pars_fragment:wf,shadowmap_pars_vertex:Ef,shadowmap_vertex:Tf,shadowmask_pars_fragment:Af,skinbase_vertex:Cf,skinning_pars_vertex:Rf,skinning_vertex:Pf,skinnormal_vertex:If,specularmap_fragment:Lf,specularmap_pars_fragment:Df,tonemapping_fragment:Uf,tonemapping_pars_fragment:Nf,transmission_fragment:Ff,transmission_pars_fragment:Of,uv_pars_fragment:Bf,uv_pars_vertex:zf,uv_vertex:Vf,worldpos_vertex:kf,background_vert:Hf,background_frag:Gf,backgroundCube_vert:Wf,backgroundCube_frag:Xf,cube_vert:qf,cube_frag:Yf,depth_vert:$f,depth_frag:Zf,distanceRGBA_vert:Jf,distanceRGBA_frag:Kf,equirect_vert:Qf,equirect_frag:jf,linedashed_vert:t0,linedashed_frag:e0,meshbasic_vert:n0,meshbasic_frag:i0,meshlambert_vert:s0,meshlambert_frag:r0,meshmatcap_vert:o0,meshmatcap_frag:a0,meshnormal_vert:c0,meshnormal_frag:l0,meshphong_vert:h0,meshphong_frag:u0,meshphysical_vert:d0,meshphysical_frag:f0,meshtoon_vert:p0,meshtoon_frag:m0,points_vert:g0,points_frag:x0,shadow_vert:_0,shadow_frag:y0,sprite_vert:v0,sprite_frag:M0},Mt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},bn={basic:{uniforms:qe([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:qe([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:qe([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:qe([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:qe([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:qe([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:qe([Mt.points,Mt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:qe([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:qe([Mt.common,Mt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:qe([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:qe([Mt.sprite,Mt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:qe([Mt.common,Mt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:qe([Mt.lights,Mt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};bn.physical={uniforms:qe([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};var ur={r:0,b:0,g:0},fi=new Tn,S0=new xe;function b0(i,t,e,n,s,r,o){let a=new Ht(0),c=r===!0?0:1,l,u,d=null,h=0,f=null;function m(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?e:t).get(v)),v}function _(S){let v=!1,y=m(S);y===null?p(a,c):y&&y.isColor&&(p(y,1),v=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(S,v){let y=m(v);y&&(y.isCubeTexture||y.mapping===to)?(u===void 0&&(u=new Ne(new Le(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:is(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),fi.copy(v.backgroundRotation),fi.x*=-1,fi.y*=-1,fi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(S0.makeRotationFromEuler(fi)),u.material.toneMapped=ie.getTransfer(y.colorSpace)!==ue,(d!==y||h!==y.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=y,h=y.version,f=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Ne(new Se(2,2),new An({name:"BackgroundMaterial",uniforms:is(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ie.getTransfer(y.colorSpace)!==ue,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,v){S.getRGB(ur,ih(i)),n.buffers.color.setClear(ur.r,ur.g,ur.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(a,c)},render:_,addToRenderList:g}}function w0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(M,I,O,F,V){let $=!1,G=d(F,O,I);r!==G&&(r=G,l(r.object)),$=f(M,F,O,V),$&&m(M,F,O,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,y(M,I,O,F),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function d(M,I,O){let F=O.wireframe===!0,V=n[M.id];V===void 0&&(V={},n[M.id]=V);let $=V[I.id];$===void 0&&($={},V[I.id]=$);let G=$[F];return G===void 0&&(G=h(c()),$[F]=G),G}function h(M){let I=[],O=[],F=[];for(let V=0;V<e;V++)I[V]=0,O[V]=0,F[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:F,object:M,attributes:{},index:null}}function f(M,I,O,F){let V=r.attributes,$=I.attributes,G=0,it=O.getAttributes();for(let X in it)if(it[X].location>=0){let ft=V[X],yt=$[X];if(yt===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(yt=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(yt=M.instanceColor)),ft===void 0||ft.attribute!==yt||yt&&ft.data!==yt.data)return!0;G++}return r.attributesNum!==G||r.index!==F}function m(M,I,O,F){let V={},$=I.attributes,G=0,it=O.getAttributes();for(let X in it)if(it[X].location>=0){let ft=$[X];ft===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(ft=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(ft=M.instanceColor));let yt={};yt.attribute=ft,ft&&ft.data&&(yt.data=ft.data),V[X]=yt,G++}r.attributes=V,r.attributesNum=G,r.index=F}function _(){let M=r.newAttributes;for(let I=0,O=M.length;I<O;I++)M[I]=0}function g(M){p(M,0)}function p(M,I){let O=r.newAttributes,F=r.enabledAttributes,V=r.attributeDivisors;O[M]=1,F[M]===0&&(i.enableVertexAttribArray(M),F[M]=1),V[M]!==I&&(i.vertexAttribDivisor(M,I),V[M]=I)}function S(){let M=r.newAttributes,I=r.enabledAttributes;for(let O=0,F=I.length;O<F;O++)I[O]!==M[O]&&(i.disableVertexAttribArray(O),I[O]=0)}function v(M,I,O,F,V,$,G){G===!0?i.vertexAttribIPointer(M,I,O,V,$):i.vertexAttribPointer(M,I,O,F,V,$)}function y(M,I,O,F){_();let V=F.attributes,$=O.getAttributes(),G=I.defaultAttributeValues;for(let it in $){let X=$[it];if(X.location>=0){let st=V[it];if(st===void 0&&(it==="instanceMatrix"&&M.instanceMatrix&&(st=M.instanceMatrix),it==="instanceColor"&&M.instanceColor&&(st=M.instanceColor)),st!==void 0){let ft=st.normalized,yt=st.itemSize,zt=t.get(st);if(zt===void 0)continue;let $t=zt.buffer,Z=zt.type,at=zt.bytesPerElement,Tt=Z===i.INT||Z===i.UNSIGNED_INT||st.gpuType===uc;if(st.isInterleavedBufferAttribute){let lt=st.data,Lt=lt.stride,Vt=st.offset;if(lt.isInstancedInterleavedBuffer){for(let Ut=0;Ut<X.locationSize;Ut++)p(X.location+Ut,lt.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Ut=0;Ut<X.locationSize;Ut++)g(X.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let Ut=0;Ut<X.locationSize;Ut++)v(X.location+Ut,yt/X.locationSize,Z,ft,Lt*at,(Vt+yt/X.locationSize*Ut)*at,Tt)}else{if(st.isInstancedBufferAttribute){for(let lt=0;lt<X.locationSize;lt++)p(X.location+lt,st.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let lt=0;lt<X.locationSize;lt++)g(X.location+lt);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let lt=0;lt<X.locationSize;lt++)v(X.location+lt,yt/X.locationSize,Z,ft,yt*at,yt/X.locationSize*lt*at,Tt)}}else if(G!==void 0){let ft=G[it];if(ft!==void 0)switch(ft.length){case 2:i.vertexAttrib2fv(X.location,ft);break;case 3:i.vertexAttrib3fv(X.location,ft);break;case 4:i.vertexAttrib4fv(X.location,ft);break;default:i.vertexAttrib1fv(X.location,ft)}}}}S()}function R(){P();for(let M in n){let I=n[M];for(let O in I){let F=I[O];for(let V in F)u(F[V].object),delete F[V];delete I[O]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let I=n[M.id];for(let O in I){let F=I[O];for(let V in F)u(F[V].object),delete F[V];delete I[O]}delete n[M.id]}function C(M){for(let I in n){let O=n[I];if(O[M.id]===void 0)continue;let F=O[M.id];for(let V in F)u(F[V].object),delete F[V];delete O[M.id]}}function P(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:E,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function E0(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),e.update(u,n,d))}function a(l,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let f=0;for(let m=0;m<d;m++)f+=u[m];e.update(f,n,1)}function c(l,u,d,h){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)o(l[m],u[m],h[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,d);let m=0;for(let _=0;_<d;_++)m+=u[_]*h[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function T0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==xn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let P=C===Gs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Hn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==zn&&!P)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:S,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:R,maxSamples:T}}function A0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Bn,a=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){let m=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{let S=r?0:n,v=S*4,y=p.clippingState||null;c.value=y,y=u(m,h,v,f);for(let R=0;R!==v;++R)y[R]=e[R];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,f,m){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=c.value,m!==!0||g===null){let p=f+_*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,y=f;v!==_;++v,y+=4)o.copy(d[v]).applyMatrix4(S,a),o.normal.toArray(g,y),g[y+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function C0(i){let t=new WeakMap;function e(o,a){return a===Cs?o.mapping=Qi:a===Jo&&(o.mapping=ji),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Cs||a===Jo)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Ra(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ur=class extends Lr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Xi=4,rl=[.125,.215,.35,.446,.526,.582],_i=20,Po=new Ur,ol=new Ht,Io=null,Lo=0,Do=0,Uo=!1,mi=(1+Math.sqrt(5))/2,Gi=1/mi,al=[new D(-mi,Gi,0),new D(mi,Gi,0),new D(-Gi,0,mi),new D(Gi,0,mi),new D(0,mi,-Gi),new D(0,mi,Gi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Nr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Io=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Do=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Io,Lo,Do),this._renderer.xr.enabled=Uo,t.scissorTest=!1,dr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qi||t.mapping===ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Io=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Do=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:Gs,format:xn,colorSpace:cs,depthBuffer:!1},s=cl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cl(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=R0(r)),this._blurMaterial=P0(r,t,e)}return s}_compileMaterial(t){let e=new Ne(this._lodPlanes[0],t);this._renderer.compile(e,Po)}_sceneToCubeUV(t,e,n,s){let a=new Ve(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(ol),u.toneMapping=ei,u.autoClear=!1;let f=new oi({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),m=new Ne(new Le,f),_=!1,g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(ol),_=!0);for(let p=0;p<6;p++){let S=p%3;S===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):S===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let v=this._cubeSize;dr(s,S*v,p>2?v:0,v,v),u.setRenderTarget(s),_&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=g}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Qi||t.mapping===ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ll());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ne(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;dr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Po)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=al[(s-r-1)%al.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new Ne(this._lodPlanes[s],l),h=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*_i-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):_i;g>_i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${_i}`);let p=[],S=0;for(let C=0;C<_i;++C){let P=C/_,E=Math.exp(-P*P/2);p.push(E),C===0?S+=E:C<g&&(S+=2*E)}for(let C=0;C<p.length;C++)p[C]=p[C]/S;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:v}=this;h.dTheta.value=m,h.mipInt.value=v-n;let y=this._sizeLods[s],R=3*y*(s>v-Xi?s-v+Xi:0),T=4*(this._cubeSize-y);dr(e,R,T,3*y,2*y),c.setRenderTarget(e),c.render(d,Po)}};function R0(i){let t=[],e=[],n=[],s=i,r=i-Xi+1+rl.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Xi?c=rl[o-i+Xi-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,m=6,_=3,g=2,p=1,S=new Float32Array(_*m*f),v=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let T=0;T<f;T++){let C=T%3*2/3-1,P=T>2?0:-1,E=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];S.set(E,_*m*T),v.set(h,g*m*T);let M=[T,T,T,T,T,T];y.set(M,p*m*T)}let R=new Fe;R.setAttribute("position",new Ze(S,_)),R.setAttribute("uv",new Ze(v,g)),R.setAttribute("faceIndex",new Ze(y,p)),t.push(R),s>Xi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function cl(i,t,e){let n=new Gn(i,t,e);return n.texture.mapping=to,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function dr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function P0(i,t,e){let n=new Float32Array(_i),s=new D(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:_i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_c(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function ll(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function hl(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function _c(){return`

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
	`}function I0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Cs||c===Jo,u=c===Qi||c===ji;if(l||u){let d=t.get(a),h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Nr(i)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return l&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new Nr(i)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function L0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&vs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function D0(i,t,e,n){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let m in h.attributes)t.remove(h.attributes[m]);for(let m in h.morphAttributes){let _=h.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}h.removeEventListener("dispose",o),delete s[h.id];let f=r.get(h);f&&(t.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(d){let h=d.attributes;for(let m in h)t.update(h[m],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let m in f){let _=f[m];for(let g=0,p=_.length;g<p;g++)t.update(_[g],i.ARRAY_BUFFER)}}function l(d){let h=[],f=d.index,m=d.attributes.position,_=0;if(f!==null){let S=f.array;_=f.version;for(let v=0,y=S.length;v<y;v+=3){let R=S[v+0],T=S[v+1],C=S[v+2];h.push(R,T,T,C,C,R)}}else if(m!==void 0){let S=m.array;_=m.version;for(let v=0,y=S.length/3-1;v<y;v+=3){let R=v+0,T=v+1,C=v+2;h.push(R,T,T,C,C,R)}}else return;let g=new(eh(h)?Ir:Pr)(h,1);g.version=_;let p=r.get(d);p&&t.remove(p),r.set(d,g)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function U0(i,t,e){let n;function s(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function c(h,f){i.drawElements(n,f,r,h*o),e.update(f,n,1)}function l(h,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,h*o,m),e.update(f,n,m))}function u(h,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function d(h,f,m,_){if(m===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<h.length;p++)l(h[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,_,0,m);let p=0;for(let S=0;S<m;S++)p+=f[S]*_[S];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function N0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function F0(i,t,e){let n=new WeakMap,s=new de;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==d){let E=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],v=0;f===!0&&(v=1),m===!0&&(v=2),_===!0&&(v=3);let y=a.attributes.position.count*v,R=1;y>t.maxTextureSize&&(R=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let T=new Float32Array(y*R*4*d),C=new Rr(T,y,R,d);C.type=zn,C.needsUpdate=!0;let P=v*4;for(let M=0;M<d;M++){let I=g[M],O=p[M],F=S[M],V=y*R*4*M;for(let $=0;$<I.count;$++){let G=$*P;f===!0&&(s.fromBufferAttribute(I,$),T[V+G+0]=s.x,T[V+G+1]=s.y,T[V+G+2]=s.z,T[V+G+3]=0),m===!0&&(s.fromBufferAttribute(O,$),T[V+G+4]=s.x,T[V+G+5]=s.y,T[V+G+6]=s.z,T[V+G+7]=0),_===!0&&(s.fromBufferAttribute(F,$),T[V+G+8]=s.x,T[V+G+9]=s.y,T[V+G+10]=s.z,T[V+G+11]=F.itemSize===4?s.w:1)}}h={count:d,texture:C,size:new pt(y,R)},n.set(a,h),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function O0(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,d=t.get(c,u);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let h=c.skeleton;s.get(h)!==l&&(h.update(),s.set(h,l))}return d}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Fr=class extends en{constructor(t,e,n,s,r,o,a,c,l,u=$i){if(u!==$i&&u!==es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===$i&&(n=Mi),n===void 0&&u===es&&(n=ts),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:_n,this.minFilter=c!==void 0?c:_n,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},rh=new en,ul=new Fr(1,1),oh=new Rr,ah=new Aa,ch=new Dr,dl=[],fl=[],pl=new Float32Array(16),ml=new Float32Array(9),gl=new Float32Array(4);function ls(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=dl[s];if(r===void 0&&(r=new Float32Array(s),dl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Te(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ae(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function no(i,t){let e=fl[t];e===void 0&&(e=new Int32Array(t),fl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function B0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function z0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2fv(this.addr,t),Ae(e,t)}}function V0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;i.uniform3fv(this.addr,t),Ae(e,t)}}function k0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4fv(this.addr,t),Ae(e,t)}}function H0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;gl.set(n),i.uniformMatrix2fv(this.addr,!1,gl),Ae(e,n)}}function G0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;ml.set(n),i.uniformMatrix3fv(this.addr,!1,ml),Ae(e,n)}}function W0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;pl.set(n),i.uniformMatrix4fv(this.addr,!1,pl),Ae(e,n)}}function X0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function q0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2iv(this.addr,t),Ae(e,t)}}function Y0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3iv(this.addr,t),Ae(e,t)}}function $0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4iv(this.addr,t),Ae(e,t)}}function Z0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function J0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2uiv(this.addr,t),Ae(e,t)}}function K0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3uiv(this.addr,t),Ae(e,t)}}function Q0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4uiv(this.addr,t),Ae(e,t)}}function j0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ul.compareFunction=th,r=ul):r=rh,e.setTexture2D(t||r,s)}function tp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ah,s)}function ep(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ch,s)}function np(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||oh,s)}function ip(i){switch(i){case 5126:return B0;case 35664:return z0;case 35665:return V0;case 35666:return k0;case 35674:return H0;case 35675:return G0;case 35676:return W0;case 5124:case 35670:return X0;case 35667:case 35671:return q0;case 35668:case 35672:return Y0;case 35669:case 35673:return $0;case 5125:return Z0;case 36294:return J0;case 36295:return K0;case 36296:return Q0;case 35678:case 36198:case 36298:case 36306:case 35682:return j0;case 35679:case 36299:case 36307:return tp;case 35680:case 36300:case 36308:case 36293:return ep;case 36289:case 36303:case 36311:case 36292:return np}}function sp(i,t){i.uniform1fv(this.addr,t)}function rp(i,t){let e=ls(t,this.size,2);i.uniform2fv(this.addr,e)}function op(i,t){let e=ls(t,this.size,3);i.uniform3fv(this.addr,e)}function ap(i,t){let e=ls(t,this.size,4);i.uniform4fv(this.addr,e)}function cp(i,t){let e=ls(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function lp(i,t){let e=ls(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function hp(i,t){let e=ls(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function up(i,t){i.uniform1iv(this.addr,t)}function dp(i,t){i.uniform2iv(this.addr,t)}function fp(i,t){i.uniform3iv(this.addr,t)}function pp(i,t){i.uniform4iv(this.addr,t)}function mp(i,t){i.uniform1uiv(this.addr,t)}function gp(i,t){i.uniform2uiv(this.addr,t)}function xp(i,t){i.uniform3uiv(this.addr,t)}function _p(i,t){i.uniform4uiv(this.addr,t)}function yp(i,t,e){let n=this.cache,s=t.length,r=no(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||rh,r[o])}function vp(i,t,e){let n=this.cache,s=t.length,r=no(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||ah,r[o])}function Mp(i,t,e){let n=this.cache,s=t.length,r=no(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ch,r[o])}function Sp(i,t,e){let n=this.cache,s=t.length,r=no(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||oh,r[o])}function bp(i){switch(i){case 5126:return sp;case 35664:return rp;case 35665:return op;case 35666:return ap;case 35674:return cp;case 35675:return lp;case 35676:return hp;case 5124:case 35670:return up;case 35667:case 35671:return dp;case 35668:case 35672:return fp;case 35669:case 35673:return pp;case 5125:return mp;case 36294:return gp;case 36295:return xp;case 36296:return _p;case 35678:case 36198:case 36298:case 36306:case 35682:return yp;case 35679:case 36299:case 36307:return vp;case 35680:case 36300:case 36308:case 36293:return Mp;case 36289:case 36303:case 36311:case 36292:return Sp}}var Pa=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ip(e.type)}},Ia=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=bp(e.type)}},La=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},No=/(\w+)(\])?(\[|\.)?/g;function xl(i,t){i.seq.push(t),i.map[t.id]=t}function wp(i,t,e){let n=i.name,s=n.length;for(No.lastIndex=0;;){let r=No.exec(n),o=No.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){xl(e,l===void 0?new Pa(a,i,t):new Ia(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new La(a),xl(e,d)),e=d}}}var Ji=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);wp(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function _l(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Ep=37297,Tp=0;function Ap(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var yl=new Qt;function Cp(i){ie._getMatrix(yl,ie.workingColorSpace,i);let t=`mat3( ${yl.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(i)){case eo:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function vl(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Ap(i.getShaderSource(t),o)}else return s}function Rp(i,t){let e=Cp(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Pp(i,t){let e;switch(t){case Vh:e="Linear";break;case kh:e="Reinhard";break;case Hh:e="Cineon";break;case Gh:e="ACESFilmic";break;case Xh:e="AgX";break;case hc:e="Neutral";break;case Wh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var fr=new D;function Ip(){ie.getLuminanceCoefficients(fr);let i=fr.x.toFixed(4),t=fr.y.toFixed(4),e=fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ms).join(`
`)}function Dp(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Up(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ms(i){return i!==""}function Ml(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Np=/^[ \t]*#include +<([\w\d./]+)>/gm;function Da(i){return i.replace(Np,Op)}var Fp=new Map;function Op(i,t){let e=jt[t];if(e===void 0){let n=Fp.get(t);if(n!==void 0)e=jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Da(e)}var Bp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bl(i){return i.replace(Bp,zp)}function zp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Vp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Vl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===lc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function kp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qi:case ji:t="ENVMAP_TYPE_CUBE";break;case to:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Hp(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ji:t="ENVMAP_MODE_REFRACTION";break}return t}function Gp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case kl:t="ENVMAP_BLENDING_MULTIPLY";break;case Bh:t="ENVMAP_BLENDING_MIX";break;case zh:t="ENVMAP_BLENDING_ADD";break}return t}function Wp(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Xp(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Vp(e),l=kp(e),u=Hp(e),d=Gp(e),h=Wp(e),f=Lp(e),m=Dp(r),_=s.createProgram(),g,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ms).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ms).join(`
`),p.length>0&&(p+=`
`)):(g=[wl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),p=[wl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ei?"#define TONE_MAPPING":"",e.toneMapping!==ei?jt.tonemapping_pars_fragment:"",e.toneMapping!==ei?Pp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,Rp("linearToOutputTexel",e.outputColorSpace),Ip(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ms).join(`
`)),o=Da(o),o=Ml(o,e),o=Sl(o,e),a=Da(a),a=Ml(a,e),a=Sl(a,e),o=bl(o),a=bl(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=S+g+o,y=S+p+a,R=_l(s,s.VERTEX_SHADER,v),T=_l(s,s.FRAGMENT_SHADER,y);s.attachShader(_,R),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(I){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(_).trim(),F=s.getShaderInfoLog(R).trim(),V=s.getShaderInfoLog(T).trim(),$=!0,G=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,T);else{let it=vl(s,R,"vertex"),X=vl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+it+`
`+X)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(F===""||V==="")&&(G=!1);G&&(I.diagnostics={runnable:$,programLog:O,vertexShader:{log:F,prefix:g},fragmentShader:{log:V,prefix:p}})}s.deleteShader(R),s.deleteShader(T),P=new Ji(s,_),E=Up(s,_)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,Ep)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Tp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=T,this}var qp=0,Ua=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Na(t),e.set(t,n)),n}},Na=class{constructor(t){this.id=qp++,this.code=t,this.usedTimes=0}};function Yp(i,t,e,n,s,r,o){let a=new Ls,c=new Ua,l=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures,f=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function g(E,M,I,O,F){let V=O.fog,$=F.geometry,G=E.isMeshStandardMaterial?O.environment:null,it=(E.isMeshStandardMaterial?e:t).get(E.envMap||G),X=it&&it.mapping===to?it.image.height:null,st=m[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));let ft=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,yt=ft!==void 0?ft.length:0,zt=0;$.morphAttributes.position!==void 0&&(zt=1),$.morphAttributes.normal!==void 0&&(zt=2),$.morphAttributes.color!==void 0&&(zt=3);let $t,Z,at,Tt;if(st){let oe=bn[st];$t=oe.vertexShader,Z=oe.fragmentShader}else $t=E.vertexShader,Z=E.fragmentShader,c.update(E),at=c.getVertexShaderID(E),Tt=c.getFragmentShaderID(E);let lt=i.getRenderTarget(),Lt=i.state.buffers.depth.getReversed(),Vt=F.isInstancedMesh===!0,Ut=F.isBatchedMesh===!0,Zt=!!E.map,j=!!E.matcap,dt=!!it,L=!!E.aoMap,Dt=!!E.lightMap,J=!!E.bumpMap,At=!!E.normalMap,mt=!!E.displacementMap,Nt=!!E.emissiveMap,wt=!!E.metalnessMap,A=!!E.roughnessMap,w=E.anisotropy>0,k=E.clearcoat>0,Q=E.dispersion>0,et=E.iridescence>0,K=E.sheen>0,Pt=E.transmission>0,xt=w&&!!E.anisotropyMap,Et=k&&!!E.clearcoatMap,te=k&&!!E.clearcoatNormalMap,ht=k&&!!E.clearcoatRoughnessMap,Ct=et&&!!E.iridescenceMap,kt=et&&!!E.iridescenceThicknessMap,Gt=K&&!!E.sheenColorMap,Rt=K&&!!E.sheenRoughnessMap,ne=!!E.specularMap,Jt=!!E.specularColorMap,re=!!E.specularIntensityMap,B=Pt&&!!E.transmissionMap,vt=Pt&&!!E.thicknessMap,Y=!!E.gradientMap,tt=!!E.alphaMap,St=E.alphaTest>0,bt=!!E.alphaHash,qt=!!E.extensions,_e=ei;E.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(_e=i.toneMapping);let Pe={shaderID:st,shaderType:E.type,shaderName:E.name,vertexShader:$t,fragmentShader:Z,defines:E.defines,customVertexShaderID:at,customFragmentShaderID:Tt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Ut,batchingColor:Ut&&F._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&F.instanceColor!==null,instancingMorph:Vt&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:lt===null?i.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:cs,alphaToCoverage:!!E.alphaToCoverage,map:Zt,matcap:j,envMap:dt,envMapMode:dt&&it.mapping,envMapCubeUVHeight:X,aoMap:L,lightMap:Dt,bumpMap:J,normalMap:At,displacementMap:h&&mt,emissiveMap:Nt,normalMapObjectSpace:At&&E.normalMapType===Zh,normalMapTangentSpace:At&&E.normalMapType===jl,metalnessMap:wt,roughnessMap:A,anisotropy:w,anisotropyMap:xt,clearcoat:k,clearcoatMap:Et,clearcoatNormalMap:te,clearcoatRoughnessMap:ht,dispersion:Q,iridescence:et,iridescenceMap:Ct,iridescenceThicknessMap:kt,sheen:K,sheenColorMap:Gt,sheenRoughnessMap:Rt,specularMap:ne,specularColorMap:Jt,specularIntensityMap:re,transmission:Pt,transmissionMap:B,thicknessMap:vt,gradientMap:Y,opaque:E.transparent===!1&&E.blending===Yi&&E.alphaToCoverage===!1,alphaMap:tt,alphaTest:St,alphaHash:bt,combine:E.combine,mapUv:Zt&&_(E.map.channel),aoMapUv:L&&_(E.aoMap.channel),lightMapUv:Dt&&_(E.lightMap.channel),bumpMapUv:J&&_(E.bumpMap.channel),normalMapUv:At&&_(E.normalMap.channel),displacementMapUv:mt&&_(E.displacementMap.channel),emissiveMapUv:Nt&&_(E.emissiveMap.channel),metalnessMapUv:wt&&_(E.metalnessMap.channel),roughnessMapUv:A&&_(E.roughnessMap.channel),anisotropyMapUv:xt&&_(E.anisotropyMap.channel),clearcoatMapUv:Et&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:te&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ht&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(E.sheenRoughnessMap.channel),specularMapUv:ne&&_(E.specularMap.channel),specularColorMapUv:Jt&&_(E.specularColorMap.channel),specularIntensityMapUv:re&&_(E.specularIntensityMap.channel),transmissionMapUv:B&&_(E.transmissionMap.channel),thicknessMapUv:vt&&_(E.thicknessMap.channel),alphaMapUv:tt&&_(E.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(At||w),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!$.attributes.uv&&(Zt||tt),fog:!!V,useFog:E.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Lt,skinning:F.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:zt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:_e,decodeVideoTexture:Zt&&E.map.isVideoTexture===!0&&ie.getTransfer(E.map.colorSpace)===ue,decodeVideoTextureEmissive:Nt&&E.emissiveMap.isVideoTexture===!0&&ie.getTransfer(E.emissiveMap.colorSpace)===ue,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ee,flipSided:E.side===ke,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:qt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qt&&E.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Pe.vertexUv1s=l.has(1),Pe.vertexUv2s=l.has(2),Pe.vertexUv3s=l.has(3),l.clear(),Pe}function p(E){let M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(let I in E.defines)M.push(I),M.push(E.defines[I]);return E.isRawShaderMaterial===!1&&(S(M,E),v(M,E),M.push(i.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function S(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function v(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),E.push(a.mask)}function y(E){let M=m[E.type],I;if(M){let O=bn[M];I=Fu.clone(O.uniforms)}else I=E.uniforms;return I}function R(E,M){let I;for(let O=0,F=u.length;O<F;O++){let V=u[O];if(V.cacheKey===M){I=V,++I.usedTimes;break}}return I===void 0&&(I=new Xp(i,M,E,r),u.push(I)),I}function T(E){if(--E.usedTimes===0){let M=u.indexOf(E);u[M]=u[u.length-1],u.pop(),E.destroy()}}function C(E){c.remove(E)}function P(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:R,releaseProgram:T,releaseShaderCache:C,programs:u,dispose:P}}function $p(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Zp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function El(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Tl(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,h,f,m,_,g){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:m,renderOrder:d.renderOrder,z:_,group:g},i[t]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=_,p.group=g),t++,p}function a(d,h,f,m,_,g){let p=o(d,h,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(d,h,f,m,_,g){let p=o(d,h,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(d,h){e.length>1&&e.sort(d||Zp),n.length>1&&n.sort(h||El),s.length>1&&s.sort(h||El)}function u(){for(let d=t,h=i.length;d<h;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function Jp(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Tl,i.set(n,[o])):s>=r.length?(o=new Tl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Kp(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Ht};break;case"SpotLight":e={position:new D,direction:new D,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function Qp(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var jp=0;function tm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function em(i){let t=new Kp,e=Qp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let s=new D,r=new xe,o=new xe;function a(l){let u=0,d=0,h=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,S=0,v=0,y=0,R=0,T=0,C=0;l.sort(tm);for(let E=0,M=l.length;E<M;E++){let I=l[E],O=I.color,F=I.intensity,V=I.distance,$=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=O.r*F,d+=O.g*F,h+=O.b*F;else if(I.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(I.sh.coefficients[G],F);C++}else if(I.isDirectionalLight){let G=t.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let it=I.shadow,X=e.get(I);X.shadowIntensity=it.intensity,X.shadowBias=it.bias,X.shadowNormalBias=it.normalBias,X.shadowRadius=it.radius,X.shadowMapSize=it.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=I.shadow.matrix,S++}n.directional[f]=G,f++}else if(I.isSpotLight){let G=t.get(I);G.position.setFromMatrixPosition(I.matrixWorld),G.color.copy(O).multiplyScalar(F),G.distance=V,G.coneCos=Math.cos(I.angle),G.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),G.decay=I.decay,n.spot[_]=G;let it=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,it.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[_]=it.matrix,I.castShadow){let X=e.get(I);X.shadowIntensity=it.intensity,X.shadowBias=it.bias,X.shadowNormalBias=it.normalBias,X.shadowRadius=it.radius,X.shadowMapSize=it.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=$,y++}_++}else if(I.isRectAreaLight){let G=t.get(I);G.color.copy(O).multiplyScalar(F),G.halfWidth.set(I.width*.5,0,0),G.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=G,g++}else if(I.isPointLight){let G=t.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),G.distance=I.distance,G.decay=I.decay,I.castShadow){let it=I.shadow,X=e.get(I);X.shadowIntensity=it.intensity,X.shadowBias=it.bias,X.shadowNormalBias=it.normalBias,X.shadowRadius=it.radius,X.shadowMapSize=it.mapSize,X.shadowCameraNear=it.camera.near,X.shadowCameraFar=it.camera.far,n.pointShadow[m]=X,n.pointShadowMap[m]=$,n.pointShadowMatrix[m]=I.shadow.matrix,v++}n.point[m]=G,m++}else if(I.isHemisphereLight){let G=t.get(I);G.skyColor.copy(I.color).multiplyScalar(F),G.groundColor.copy(I.groundColor).multiplyScalar(F),n.hemi[p]=G,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Mt.LTC_FLOAT_1,n.rectAreaLTC2=Mt.LTC_FLOAT_2):(n.rectAreaLTC1=Mt.LTC_HALF_1,n.rectAreaLTC2=Mt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let P=n.hash;(P.directionalLength!==f||P.pointLength!==m||P.spotLength!==_||P.rectAreaLength!==g||P.hemiLength!==p||P.numDirectionalShadows!==S||P.numPointShadows!==v||P.numSpotShadows!==y||P.numSpotMaps!==R||P.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,P.directionalLength=f,P.pointLength=m,P.spotLength=_,P.rectAreaLength=g,P.hemiLength=p,P.numDirectionalShadows=S,P.numPointShadows=v,P.numSpotShadows=y,P.numSpotMaps=R,P.numLightProbes=C,n.version=jp++)}function c(l,u){let d=0,h=0,f=0,m=0,_=0,g=u.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){let v=l[p];if(v.isDirectionalLight){let y=n.directional[d];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),d++}else if(v.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),f++}else if(v.isRectAreaLight){let y=n.rectArea[m];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),h++}else if(v.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function Al(i){let t=new em(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function nm(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Al(i),t.set(s,[a])):r>=o.length?(a=new Al(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Fa=class extends ri{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Oa=class extends ri{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},im=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sm=`uniform sampler2D shadow_pass;
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
}`;function rm(i,t,e){let n=new Ds,s=new pt,r=new pt,o=new de,a=new Fa({depthPacking:$h}),c=new Oa,l={},u=e.maxTextureSize,d={[ni]:ke,[ke]:ni,[Ee]:Ee},h=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pt},radius:{value:4}},vertexShader:im,fragmentShader:sm}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let m=new Fe;m.setAttribute("position",new Ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ne(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vl;let p=this.type;this.render=function(T,C,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;let E=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),O=i.state;O.setBlending(ti),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let F=p!==On&&this.type===On,V=p===On&&this.type!==On;for(let $=0,G=T.length;$<G;$++){let it=T[$],X=it.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let st=X.getFrameExtents();if(s.multiply(st),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/st.x),s.x=r.x*st.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/st.y),s.y=r.y*st.y,X.mapSize.y=r.y)),X.map===null||F===!0||V===!0){let yt=this.type!==On?{minFilter:_n,magFilter:_n}:{};X.map!==null&&X.map.dispose(),X.map=new Gn(s.x,s.y,yt),X.map.texture.name=it.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();let ft=X.getViewportCount();for(let yt=0;yt<ft;yt++){let zt=X.getViewport(yt);o.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),O.viewport(o),X.updateMatrices(it,yt),n=X.getFrustum(),y(C,P,X.camera,it,this.type)}X.isPointLightShadow!==!0&&this.type===On&&S(X,P),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(E,M,I)};function S(T,C){let P=t.update(_);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Gn(s.x,s.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,P,h,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,P,f,_,null)}function v(T,C,P,E){let M=null,I=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)M=I;else if(M=P.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let O=M.uuid,F=C.uuid,V=l[O];V===void 0&&(V={},l[O]=V);let $=V[F];$===void 0&&($=M.clone(),V[F]=$,C.addEventListener("dispose",R)),M=$}if(M.visible=C.visible,M.wireframe=C.wireframe,E===On?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:d[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let O=i.properties.get(M);O.light=P}return M}function y(T,C,P,E,M){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===On)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);let F=t.update(T),V=T.material;if(Array.isArray(V)){let $=F.groups;for(let G=0,it=$.length;G<it;G++){let X=$[G],st=V[X.materialIndex];if(st&&st.visible){let ft=v(T,st,E,M);T.onBeforeShadow(i,T,C,P,F,ft,X),i.renderBufferDirect(P,null,F,ft,T,X),T.onAfterShadow(i,T,C,P,F,ft,X)}}}else if(V.visible){let $=v(T,V,E,M);T.onBeforeShadow(i,T,C,P,F,$,null),i.renderBufferDirect(P,null,F,$,T,null),T.onAfterShadow(i,T,C,P,F,$,null)}}let O=T.children;for(let F=0,V=O.length;F<V;F++)y(O[F],C,P,E,M)}function R(T){T.target.removeEventListener("dispose",R);for(let P in l){let E=l[P],M=T.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}var om={[Go]:Wo,[Xo]:$o,[qo]:Zo,[Ki]:Yo,[Wo]:Go,[$o]:Xo,[Zo]:qo,[Yo]:Ki};function am(i,t){function e(){let B=!1,vt=new de,Y=null,tt=new de(0,0,0,0);return{setMask:function(St){Y!==St&&!B&&(i.colorMask(St,St,St,St),Y=St)},setLocked:function(St){B=St},setClear:function(St,bt,qt,_e,Pe){Pe===!0&&(St*=_e,bt*=_e,qt*=_e),vt.set(St,bt,qt,_e),tt.equals(vt)===!1&&(i.clearColor(St,bt,qt,_e),tt.copy(vt))},reset:function(){B=!1,Y=null,tt.set(-1,0,0,0)}}}function n(){let B=!1,vt=!1,Y=null,tt=null,St=null;return{setReversed:function(bt){if(vt!==bt){let qt=t.get("EXT_clip_control");vt?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT);let _e=St;St=null,this.setClear(_e)}vt=bt},getReversed:function(){return vt},setTest:function(bt){bt?lt(i.DEPTH_TEST):Lt(i.DEPTH_TEST)},setMask:function(bt){Y!==bt&&!B&&(i.depthMask(bt),Y=bt)},setFunc:function(bt){if(vt&&(bt=om[bt]),tt!==bt){switch(bt){case Go:i.depthFunc(i.NEVER);break;case Wo:i.depthFunc(i.ALWAYS);break;case Xo:i.depthFunc(i.LESS);break;case Ki:i.depthFunc(i.LEQUAL);break;case qo:i.depthFunc(i.EQUAL);break;case Yo:i.depthFunc(i.GEQUAL);break;case $o:i.depthFunc(i.GREATER);break;case Zo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=bt}},setLocked:function(bt){B=bt},setClear:function(bt){St!==bt&&(vt&&(bt=1-bt),i.clearDepth(bt),St=bt)},reset:function(){B=!1,Y=null,tt=null,St=null,vt=!1}}}function s(){let B=!1,vt=null,Y=null,tt=null,St=null,bt=null,qt=null,_e=null,Pe=null;return{setTest:function(oe){B||(oe?lt(i.STENCIL_TEST):Lt(i.STENCIL_TEST))},setMask:function(oe){vt!==oe&&!B&&(i.stencilMask(oe),vt=oe)},setFunc:function(oe,Je,dn){(Y!==oe||tt!==Je||St!==dn)&&(i.stencilFunc(oe,Je,dn),Y=oe,tt=Je,St=dn)},setOp:function(oe,Je,dn){(bt!==oe||qt!==Je||_e!==dn)&&(i.stencilOp(oe,Je,dn),bt=oe,qt=Je,_e=dn)},setLocked:function(oe){B=oe},setClear:function(oe){Pe!==oe&&(i.clearStencil(oe),Pe=oe)},reset:function(){B=!1,vt=null,Y=null,tt=null,St=null,bt=null,qt=null,_e=null,Pe=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},d={},h=new WeakMap,f=[],m=null,_=!1,g=null,p=null,S=null,v=null,y=null,R=null,T=null,C=new Ht(0,0,0),P=0,E=!1,M=null,I=null,O=null,F=null,V=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,it=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(X)[1]),G=it>=1):X.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),G=it>=2);let st=null,ft={},yt=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),$t=new de().fromArray(yt),Z=new de().fromArray(zt);function at(B,vt,Y,tt){let St=new Uint8Array(4),bt=i.createTexture();i.bindTexture(B,bt),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qt=0;qt<Y;qt++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(vt,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,St):i.texImage2D(vt+qt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,St);return bt}let Tt={};Tt[i.TEXTURE_2D]=at(i.TEXTURE_2D,i.TEXTURE_2D,1),Tt[i.TEXTURE_CUBE_MAP]=at(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[i.TEXTURE_2D_ARRAY]=at(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Tt[i.TEXTURE_3D]=at(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),lt(i.DEPTH_TEST),o.setFunc(Ki),J(!1),At(Cc),lt(i.CULL_FACE),L(ti);function lt(B){u[B]!==!0&&(i.enable(B),u[B]=!0)}function Lt(B){u[B]!==!1&&(i.disable(B),u[B]=!1)}function Vt(B,vt){return d[B]!==vt?(i.bindFramebuffer(B,vt),d[B]=vt,B===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=vt),B===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=vt),!0):!1}function Ut(B,vt){let Y=f,tt=!1;if(B){Y=h.get(vt),Y===void 0&&(Y=[],h.set(vt,Y));let St=B.textures;if(Y.length!==St.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let bt=0,qt=St.length;bt<qt;bt++)Y[bt]=i.COLOR_ATTACHMENT0+bt;Y.length=St.length,tt=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,tt=!0);tt&&i.drawBuffers(Y)}function Zt(B){return m!==B?(i.useProgram(B),m=B,!0):!1}let j={[gi]:i.FUNC_ADD,[Mh]:i.FUNC_SUBTRACT,[Sh]:i.FUNC_REVERSE_SUBTRACT};j[bh]=i.MIN,j[wh]=i.MAX;let dt={[Eh]:i.ZERO,[Th]:i.ONE,[Ah]:i.SRC_COLOR,[ko]:i.SRC_ALPHA,[Dh]:i.SRC_ALPHA_SATURATE,[Ih]:i.DST_COLOR,[Rh]:i.DST_ALPHA,[Ch]:i.ONE_MINUS_SRC_COLOR,[Ho]:i.ONE_MINUS_SRC_ALPHA,[Lh]:i.ONE_MINUS_DST_COLOR,[Ph]:i.ONE_MINUS_DST_ALPHA,[Uh]:i.CONSTANT_COLOR,[Nh]:i.ONE_MINUS_CONSTANT_COLOR,[Fh]:i.CONSTANT_ALPHA,[Oh]:i.ONE_MINUS_CONSTANT_ALPHA};function L(B,vt,Y,tt,St,bt,qt,_e,Pe,oe){if(B===ti){_===!0&&(Lt(i.BLEND),_=!1);return}if(_===!1&&(lt(i.BLEND),_=!0),B!==vh){if(B!==g||oe!==E){if((p!==gi||y!==gi)&&(i.blendEquation(i.FUNC_ADD),p=gi,y=gi),oe)switch(B){case Yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Rc:i.blendFunc(i.ONE,i.ONE);break;case Pc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ic:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Rc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Pc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ic:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}S=null,v=null,R=null,T=null,C.set(0,0,0),P=0,g=B,E=oe}return}St=St||vt,bt=bt||Y,qt=qt||tt,(vt!==p||St!==y)&&(i.blendEquationSeparate(j[vt],j[St]),p=vt,y=St),(Y!==S||tt!==v||bt!==R||qt!==T)&&(i.blendFuncSeparate(dt[Y],dt[tt],dt[bt],dt[qt]),S=Y,v=tt,R=bt,T=qt),(_e.equals(C)===!1||Pe!==P)&&(i.blendColor(_e.r,_e.g,_e.b,Pe),C.copy(_e),P=Pe),g=B,E=!1}function Dt(B,vt){B.side===Ee?Lt(i.CULL_FACE):lt(i.CULL_FACE);let Y=B.side===ke;vt&&(Y=!Y),J(Y),B.blending===Yi&&B.transparent===!1?L(ti):L(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);let tt=B.stencilWrite;a.setTest(tt),tt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Nt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?lt(i.SAMPLE_ALPHA_TO_COVERAGE):Lt(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(B){M!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),M=B)}function At(B){B!==_h?(lt(i.CULL_FACE),B!==I&&(B===Cc?i.cullFace(i.BACK):B===yh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Lt(i.CULL_FACE),I=B}function mt(B){B!==O&&(G&&i.lineWidth(B),O=B)}function Nt(B,vt,Y){B?(lt(i.POLYGON_OFFSET_FILL),(F!==vt||V!==Y)&&(i.polygonOffset(vt,Y),F=vt,V=Y)):Lt(i.POLYGON_OFFSET_FILL)}function wt(B){B?lt(i.SCISSOR_TEST):Lt(i.SCISSOR_TEST)}function A(B){B===void 0&&(B=i.TEXTURE0+$-1),st!==B&&(i.activeTexture(B),st=B)}function w(B,vt,Y){Y===void 0&&(st===null?Y=i.TEXTURE0+$-1:Y=st);let tt=ft[Y];tt===void 0&&(tt={type:void 0,texture:void 0},ft[Y]=tt),(tt.type!==B||tt.texture!==vt)&&(st!==Y&&(i.activeTexture(Y),st=Y),i.bindTexture(B,vt||Tt[B]),tt.type=B,tt.texture=vt)}function k(){let B=ft[st];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Pt(){try{i.texSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function xt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Et(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function te(){try{i.texStorage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ht(){try{i.texStorage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ct(){try{i.texImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function kt(){try{i.texImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Gt(B){$t.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),$t.copy(B))}function Rt(B){Z.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),Z.copy(B))}function ne(B,vt){let Y=l.get(vt);Y===void 0&&(Y=new WeakMap,l.set(vt,Y));let tt=Y.get(B);tt===void 0&&(tt=i.getUniformBlockIndex(vt,B.name),Y.set(B,tt))}function Jt(B,vt){let tt=l.get(vt).get(B);c.get(vt)!==tt&&(i.uniformBlockBinding(vt,tt,B.__bindingPointIndex),c.set(vt,tt))}function re(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},st=null,ft={},d={},h=new WeakMap,f=[],m=null,_=!1,g=null,p=null,S=null,v=null,y=null,R=null,T=null,C=new Ht(0,0,0),P=0,E=!1,M=null,I=null,O=null,F=null,V=null,$t.set(0,0,i.canvas.width,i.canvas.height),Z.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:lt,disable:Lt,bindFramebuffer:Vt,drawBuffers:Ut,useProgram:Zt,setBlending:L,setMaterial:Dt,setFlipSided:J,setCullFace:At,setLineWidth:mt,setPolygonOffset:Nt,setScissorTest:wt,activeTexture:A,bindTexture:w,unbindTexture:k,compressedTexImage2D:Q,compressedTexImage3D:et,texImage2D:Ct,texImage3D:kt,updateUBOMapping:ne,uniformBlockBinding:Jt,texStorage2D:te,texStorage3D:ht,texSubImage2D:K,texSubImage3D:Pt,compressedTexSubImage2D:xt,compressedTexSubImage3D:Et,scissor:Gt,viewport:Rt,reset:re}}function Cl(i,t,e,n){let s=cm(n);switch(e){case ql:return i*t;case $l:return i*t;case Zl:return i*t*2;case Jl:return i*t/s.components*s.byteLength;case pc:return i*t/s.components*s.byteLength;case Kl:return i*t*2/s.components*s.byteLength;case mc:return i*t*2/s.components*s.byteLength;case Yl:return i*t*3/s.components*s.byteLength;case xn:return i*t*4/s.components*s.byteLength;case gc:return i*t*4/s.components*s.byteLength;case vr:case Mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Sr:case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case jo:case ea:return Math.max(i,16)*Math.max(t,8)/4;case Qo:case ta:return Math.max(i,8)*Math.max(t,8)/2;case na:case ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case aa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ca:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case la:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ha:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ua:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case da:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case fa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case pa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ga:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case xa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case _a:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case wr:case ya:case va:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ql:case Ma:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Sa:case ba:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function cm(i){switch(i){case Hn:case Gl:return{byteLength:1,components:1};case Rs:case Wl:case Gs:return{byteLength:2,components:1};case dc:case fc:return{byteLength:2,components:4};case Mi:case uc:case zn:return{byteLength:4,components:1};case Xl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function lm(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new pt,u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,w){return f?new OffscreenCanvas(A,w):Ar("canvas")}function _(A,w,k){let Q=1,et=wt(A);if((et.width>k||et.height>k)&&(Q=k/Math.max(et.width,et.height)),Q<1)if(typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&A instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&A instanceof ImageBitmap||typeof VideoFrame!="undefined"&&A instanceof VideoFrame){let K=Math.floor(Q*et.width),Pt=Math.floor(Q*et.height);d===void 0&&(d=m(K,Pt));let xt=w?m(K,Pt):d;return xt.width=K,xt.height=Pt,xt.getContext("2d").drawImage(A,0,0,K,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+K+"x"+Pt+")."),xt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),A;return A}function g(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(A,w,k,Q,et=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=w;if(w===i.RED&&(k===i.FLOAT&&(K=i.R32F),k===i.HALF_FLOAT&&(K=i.R16F),k===i.UNSIGNED_BYTE&&(K=i.R8)),w===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.R8UI),k===i.UNSIGNED_SHORT&&(K=i.R16UI),k===i.UNSIGNED_INT&&(K=i.R32UI),k===i.BYTE&&(K=i.R8I),k===i.SHORT&&(K=i.R16I),k===i.INT&&(K=i.R32I)),w===i.RG&&(k===i.FLOAT&&(K=i.RG32F),k===i.HALF_FLOAT&&(K=i.RG16F),k===i.UNSIGNED_BYTE&&(K=i.RG8)),w===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RG8UI),k===i.UNSIGNED_SHORT&&(K=i.RG16UI),k===i.UNSIGNED_INT&&(K=i.RG32UI),k===i.BYTE&&(K=i.RG8I),k===i.SHORT&&(K=i.RG16I),k===i.INT&&(K=i.RG32I)),w===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGB8UI),k===i.UNSIGNED_SHORT&&(K=i.RGB16UI),k===i.UNSIGNED_INT&&(K=i.RGB32UI),k===i.BYTE&&(K=i.RGB8I),k===i.SHORT&&(K=i.RGB16I),k===i.INT&&(K=i.RGB32I)),w===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),k===i.UNSIGNED_INT&&(K=i.RGBA32UI),k===i.BYTE&&(K=i.RGBA8I),k===i.SHORT&&(K=i.RGBA16I),k===i.INT&&(K=i.RGBA32I)),w===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),w===i.RGBA){let Pt=et?eo:ie.getTransfer(Q);k===i.FLOAT&&(K=i.RGBA32F),k===i.HALF_FLOAT&&(K=i.RGBA16F),k===i.UNSIGNED_BYTE&&(K=Pt===ue?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(A,w){let k;return A?w===null||w===Mi||w===ts?k=i.DEPTH24_STENCIL8:w===zn?k=i.DEPTH32F_STENCIL8:w===Rs&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Mi||w===ts?k=i.DEPTH_COMPONENT24:w===zn?k=i.DEPTH_COMPONENT32F:w===Rs&&(k=i.DEPTH_COMPONENT16),k}function R(A,w){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==_n&&A.minFilter!==wn?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function T(A){let w=A.target;w.removeEventListener("dispose",T),P(w),w.isVideoTexture&&u.delete(w)}function C(A){let w=A.target;w.removeEventListener("dispose",C),M(w)}function P(A){let w=n.get(A);if(w.__webglInit===void 0)return;let k=A.source,Q=h.get(k);if(Q){let et=Q[w.__cacheKey];et.usedTimes--,et.usedTimes===0&&E(A),Object.keys(Q).length===0&&h.delete(k)}n.remove(A)}function E(A){let w=n.get(A);i.deleteTexture(w.__webglTexture);let k=A.source,Q=h.get(k);delete Q[w.__cacheKey],o.memory.textures--}function M(A){let w=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(w.__webglFramebuffer[Q]))for(let et=0;et<w.__webglFramebuffer[Q].length;et++)i.deleteFramebuffer(w.__webglFramebuffer[Q][et]);else i.deleteFramebuffer(w.__webglFramebuffer[Q]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[Q])}else{if(Array.isArray(w.__webglFramebuffer))for(let Q=0;Q<w.__webglFramebuffer.length;Q++)i.deleteFramebuffer(w.__webglFramebuffer[Q]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Q=0;Q<w.__webglColorRenderbuffer.length;Q++)w.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[Q]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let k=A.textures;for(let Q=0,et=k.length;Q<et;Q++){let K=n.get(k[Q]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(k[Q])}n.remove(A)}let I=0;function O(){I=0}function F(){let A=I;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),I+=1,A}function V(A){let w=[];return w.push(A.wrapS),w.push(A.wrapT),w.push(A.wrapR||0),w.push(A.magFilter),w.push(A.minFilter),w.push(A.anisotropy),w.push(A.internalFormat),w.push(A.format),w.push(A.type),w.push(A.generateMipmaps),w.push(A.premultiplyAlpha),w.push(A.flipY),w.push(A.unpackAlignment),w.push(A.colorSpace),w.join()}function $(A,w){let k=n.get(A);if(A.isVideoTexture&&mt(A),A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){let Q=A.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(k,A,w);return}}e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+w)}function G(A,w){let k=n.get(A);if(A.version>0&&k.__version!==A.version){Z(k,A,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+w)}function it(A,w){let k=n.get(A);if(A.version>0&&k.__version!==A.version){Z(k,A,w);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+w)}function X(A,w){let k=n.get(A);if(A.version>0&&k.__version!==A.version){at(k,A,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+w)}let st={[tn]:i.REPEAT,[yi]:i.CLAMP_TO_EDGE,[Ko]:i.MIRRORED_REPEAT},ft={[_n]:i.NEAREST,[qh]:i.NEAREST_MIPMAP_NEAREST,[Ys]:i.NEAREST_MIPMAP_LINEAR,[wn]:i.LINEAR,[ao]:i.LINEAR_MIPMAP_NEAREST,[vi]:i.LINEAR_MIPMAP_LINEAR},yt={[Jh]:i.NEVER,[nu]:i.ALWAYS,[Kh]:i.LESS,[th]:i.LEQUAL,[Qh]:i.EQUAL,[eu]:i.GEQUAL,[jh]:i.GREATER,[tu]:i.NOTEQUAL};function zt(A,w){if(w.type===zn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===wn||w.magFilter===ao||w.magFilter===Ys||w.magFilter===vi||w.minFilter===wn||w.minFilter===ao||w.minFilter===Ys||w.minFilter===vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,st[w.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,st[w.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,st[w.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ft[w.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ft[w.minFilter]),w.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,yt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===_n||w.minFilter!==Ys&&w.minFilter!==vi||w.type===zn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function $t(A,w){let k=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",T));let Q=w.source,et=h.get(Q);et===void 0&&(et={},h.set(Q,et));let K=V(w);if(K!==A.__cacheKey){et[K]===void 0&&(et[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),et[K].usedTimes++;let Pt=et[A.__cacheKey];Pt!==void 0&&(et[A.__cacheKey].usedTimes--,Pt.usedTimes===0&&E(w)),A.__cacheKey=K,A.__webglTexture=et[K].texture}return k}function Z(A,w,k){let Q=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Q=i.TEXTURE_3D);let et=$t(A,w),K=w.source;e.bindTexture(Q,A.__webglTexture,i.TEXTURE0+k);let Pt=n.get(K);if(K.version!==Pt.__version||et===!0){e.activeTexture(i.TEXTURE0+k);let xt=ie.getPrimaries(ie.workingColorSpace),Et=w.colorSpace===jn?null:ie.getPrimaries(w.colorSpace),te=w.colorSpace===jn||xt===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ht=_(w.image,!1,s.maxTextureSize);ht=Nt(w,ht);let Ct=r.convert(w.format,w.colorSpace),kt=r.convert(w.type),Gt=v(w.internalFormat,Ct,kt,w.colorSpace,w.isVideoTexture);zt(Q,w);let Rt,ne=w.mipmaps,Jt=w.isVideoTexture!==!0,re=Pt.__version===void 0||et===!0,B=K.dataReady,vt=R(w,ht);if(w.isDepthTexture)Gt=y(w.format===es,w.type),re&&(Jt?e.texStorage2D(i.TEXTURE_2D,1,Gt,ht.width,ht.height):e.texImage2D(i.TEXTURE_2D,0,Gt,ht.width,ht.height,0,Ct,kt,null));else if(w.isDataTexture)if(ne.length>0){Jt&&re&&e.texStorage2D(i.TEXTURE_2D,vt,Gt,ne[0].width,ne[0].height);for(let Y=0,tt=ne.length;Y<tt;Y++)Rt=ne[Y],Jt?B&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Rt.width,Rt.height,Ct,kt,Rt.data):e.texImage2D(i.TEXTURE_2D,Y,Gt,Rt.width,Rt.height,0,Ct,kt,Rt.data);w.generateMipmaps=!1}else Jt?(re&&e.texStorage2D(i.TEXTURE_2D,vt,Gt,ht.width,ht.height),B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht.width,ht.height,Ct,kt,ht.data)):e.texImage2D(i.TEXTURE_2D,0,Gt,ht.width,ht.height,0,Ct,kt,ht.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Jt&&re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Gt,ne[0].width,ne[0].height,ht.depth);for(let Y=0,tt=ne.length;Y<tt;Y++)if(Rt=ne[Y],w.format!==xn)if(Ct!==null)if(Jt){if(B)if(w.layerUpdates.size>0){let St=Cl(Rt.width,Rt.height,w.format,w.type);for(let bt of w.layerUpdates){let qt=Rt.data.subarray(bt*St/Rt.data.BYTES_PER_ELEMENT,(bt+1)*St/Rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,bt,Rt.width,Rt.height,1,Ct,qt)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Rt.width,Rt.height,ht.depth,Ct,Rt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Gt,Rt.width,Rt.height,ht.depth,0,Rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?B&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Rt.width,Rt.height,ht.depth,Ct,kt,Rt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Gt,Rt.width,Rt.height,ht.depth,0,Ct,kt,Rt.data)}else{Jt&&re&&e.texStorage2D(i.TEXTURE_2D,vt,Gt,ne[0].width,ne[0].height);for(let Y=0,tt=ne.length;Y<tt;Y++)Rt=ne[Y],w.format!==xn?Ct!==null?Jt?B&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,Rt.width,Rt.height,Ct,Rt.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Gt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?B&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Rt.width,Rt.height,Ct,kt,Rt.data):e.texImage2D(i.TEXTURE_2D,Y,Gt,Rt.width,Rt.height,0,Ct,kt,Rt.data)}else if(w.isDataArrayTexture)if(Jt){if(re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Gt,ht.width,ht.height,ht.depth),B)if(w.layerUpdates.size>0){let Y=Cl(ht.width,ht.height,w.format,w.type);for(let tt of w.layerUpdates){let St=ht.data.subarray(tt*Y/ht.data.BYTES_PER_ELEMENT,(tt+1)*Y/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,ht.width,ht.height,1,Ct,kt,St)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,Ct,kt,ht.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Gt,ht.width,ht.height,ht.depth,0,Ct,kt,ht.data);else if(w.isData3DTexture)Jt?(re&&e.texStorage3D(i.TEXTURE_3D,vt,Gt,ht.width,ht.height,ht.depth),B&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,Ct,kt,ht.data)):e.texImage3D(i.TEXTURE_3D,0,Gt,ht.width,ht.height,ht.depth,0,Ct,kt,ht.data);else if(w.isFramebufferTexture){if(re)if(Jt)e.texStorage2D(i.TEXTURE_2D,vt,Gt,ht.width,ht.height);else{let Y=ht.width,tt=ht.height;for(let St=0;St<vt;St++)e.texImage2D(i.TEXTURE_2D,St,Gt,Y,tt,0,Ct,kt,null),Y>>=1,tt>>=1}}else if(ne.length>0){if(Jt&&re){let Y=wt(ne[0]);e.texStorage2D(i.TEXTURE_2D,vt,Gt,Y.width,Y.height)}for(let Y=0,tt=ne.length;Y<tt;Y++)Rt=ne[Y],Jt?B&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Ct,kt,Rt):e.texImage2D(i.TEXTURE_2D,Y,Gt,Ct,kt,Rt);w.generateMipmaps=!1}else if(Jt){if(re){let Y=wt(ht);e.texStorage2D(i.TEXTURE_2D,vt,Gt,Y.width,Y.height)}B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Ct,kt,ht)}else e.texImage2D(i.TEXTURE_2D,0,Gt,Ct,kt,ht);g(w)&&p(Q),Pt.__version=K.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function at(A,w,k){if(w.image.length!==6)return;let Q=$t(A,w),et=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+k);let K=n.get(et);if(et.version!==K.__version||Q===!0){e.activeTexture(i.TEXTURE0+k);let Pt=ie.getPrimaries(ie.workingColorSpace),xt=w.colorSpace===jn?null:ie.getPrimaries(w.colorSpace),Et=w.colorSpace===jn||Pt===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let te=w.isCompressedTexture||w.image[0].isCompressedTexture,ht=w.image[0]&&w.image[0].isDataTexture,Ct=[];for(let tt=0;tt<6;tt++)!te&&!ht?Ct[tt]=_(w.image[tt],!0,s.maxCubemapSize):Ct[tt]=ht?w.image[tt].image:w.image[tt],Ct[tt]=Nt(w,Ct[tt]);let kt=Ct[0],Gt=r.convert(w.format,w.colorSpace),Rt=r.convert(w.type),ne=v(w.internalFormat,Gt,Rt,w.colorSpace),Jt=w.isVideoTexture!==!0,re=K.__version===void 0||Q===!0,B=et.dataReady,vt=R(w,kt);zt(i.TEXTURE_CUBE_MAP,w);let Y;if(te){Jt&&re&&e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,ne,kt.width,kt.height);for(let tt=0;tt<6;tt++){Y=Ct[tt].mipmaps;for(let St=0;St<Y.length;St++){let bt=Y[St];w.format!==xn?Gt!==null?Jt?B&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St,0,0,bt.width,bt.height,Gt,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St,ne,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Jt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St,0,0,bt.width,bt.height,Gt,Rt,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St,ne,bt.width,bt.height,0,Gt,Rt,bt.data)}}}else{if(Y=w.mipmaps,Jt&&re){Y.length>0&&vt++;let tt=wt(Ct[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,ne,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ht){Jt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ct[tt].width,Ct[tt].height,Gt,Rt,Ct[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ne,Ct[tt].width,Ct[tt].height,0,Gt,Rt,Ct[tt].data);for(let St=0;St<Y.length;St++){let qt=Y[St].image[tt].image;Jt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St+1,0,0,qt.width,qt.height,Gt,Rt,qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St+1,ne,qt.width,qt.height,0,Gt,Rt,qt.data)}}else{Jt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Gt,Rt,Ct[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ne,Gt,Rt,Ct[tt]);for(let St=0;St<Y.length;St++){let bt=Y[St];Jt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St+1,0,0,Gt,Rt,bt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,St+1,ne,Gt,Rt,bt.image[tt])}}}g(w)&&p(i.TEXTURE_CUBE_MAP),K.__version=et.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function Tt(A,w,k,Q,et,K){let Pt=r.convert(k.format,k.colorSpace),xt=r.convert(k.type),Et=v(k.internalFormat,Pt,xt,k.colorSpace),te=n.get(w),ht=n.get(k);if(ht.__renderTarget=w,!te.__hasExternalTextures){let Ct=Math.max(1,w.width>>K),kt=Math.max(1,w.height>>K);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,K,Et,Ct,kt,w.depth,0,Pt,xt,null):e.texImage2D(et,K,Et,Ct,kt,0,Pt,xt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),At(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,et,ht.__webglTexture,0,J(w)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,et,ht.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(A,w,k){if(i.bindRenderbuffer(i.RENDERBUFFER,A),w.depthBuffer){let Q=w.depthTexture,et=Q&&Q.isDepthTexture?Q.type:null,K=y(w.stencilBuffer,et),Pt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=J(w);At(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,K,w.width,w.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,K,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,K,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pt,i.RENDERBUFFER,A)}else{let Q=w.textures;for(let et=0;et<Q.length;et++){let K=Q[et],Pt=r.convert(K.format,K.colorSpace),xt=r.convert(K.type),Et=v(K.internalFormat,Pt,xt,K.colorSpace),te=J(w);k&&At(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,te,Et,w.width,w.height):At(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,Et,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Et,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Lt(A,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(w.depthTexture);Q.__renderTarget=w,(!Q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),$(w.depthTexture,0);let et=Q.__webglTexture,K=J(w);if(w.depthTexture.format===$i)At(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(w.depthTexture.format===es)At(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function Vt(A){let w=n.get(A),k=A.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==A.depthTexture){let Q=A.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Q){let et=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Q.removeEventListener("dispose",et)};Q.addEventListener("dispose",et),w.__depthDisposeCallback=et}w.__boundDepthTexture=Q}if(A.depthTexture&&!w.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Lt(w.__webglFramebuffer,A)}else if(k){w.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[Q]),w.__webglDepthbuffer[Q]===void 0)w.__webglDepthbuffer[Q]=i.createRenderbuffer(),lt(w.__webglDepthbuffer[Q],A,!1);else{let et=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=w.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),lt(w.__webglDepthbuffer,A,!1);else{let Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(A,w,k){let Q=n.get(A);w!==void 0&&Tt(Q.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Vt(A)}function Zt(A){let w=A.texture,k=n.get(A),Q=n.get(w);A.addEventListener("dispose",C);let et=A.textures,K=A.isWebGLCubeRenderTarget===!0,Pt=et.length>1;if(Pt||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=w.version,o.memory.textures++),K){k.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer[xt]=[];for(let Et=0;Et<w.mipmaps.length;Et++)k.__webglFramebuffer[xt][Et]=i.createFramebuffer()}else k.__webglFramebuffer[xt]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer=[];for(let xt=0;xt<w.mipmaps.length;xt++)k.__webglFramebuffer[xt]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Pt)for(let xt=0,Et=et.length;xt<Et;xt++){let te=n.get(et[xt]);te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&At(A)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let xt=0;xt<et.length;xt++){let Et=et[xt];k.__webglColorRenderbuffer[xt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[xt]);let te=r.convert(Et.format,Et.colorSpace),ht=r.convert(Et.type),Ct=v(Et.internalFormat,te,ht,Et.colorSpace,A.isXRRenderTarget===!0),kt=J(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,Ct,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,k.__webglColorRenderbuffer[xt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(k.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),zt(i.TEXTURE_CUBE_MAP,w);for(let xt=0;xt<6;xt++)if(w.mipmaps&&w.mipmaps.length>0)for(let Et=0;Et<w.mipmaps.length;Et++)Tt(k.__webglFramebuffer[xt][Et],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Et);else Tt(k.__webglFramebuffer[xt],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);g(w)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let xt=0,Et=et.length;xt<Et;xt++){let te=et[xt],ht=n.get(te);e.bindTexture(i.TEXTURE_2D,ht.__webglTexture),zt(i.TEXTURE_2D,te),Tt(k.__webglFramebuffer,A,te,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,0),g(te)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let xt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(xt,Q.__webglTexture),zt(xt,w),w.mipmaps&&w.mipmaps.length>0)for(let Et=0;Et<w.mipmaps.length;Et++)Tt(k.__webglFramebuffer[Et],A,w,i.COLOR_ATTACHMENT0,xt,Et);else Tt(k.__webglFramebuffer,A,w,i.COLOR_ATTACHMENT0,xt,0);g(w)&&p(xt),e.unbindTexture()}A.depthBuffer&&Vt(A)}function j(A){let w=A.textures;for(let k=0,Q=w.length;k<Q;k++){let et=w[k];if(g(et)){let K=S(A),Pt=n.get(et).__webglTexture;e.bindTexture(K,Pt),p(K),e.unbindTexture()}}}let dt=[],L=[];function Dt(A){if(A.samples>0){if(At(A)===!1){let w=A.textures,k=A.width,Q=A.height,et=i.COLOR_BUFFER_BIT,K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pt=n.get(A),xt=w.length>1;if(xt)for(let Et=0;Et<w.length;Et++)e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let Et=0;Et<w.length;Et++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),xt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[Et]);let te=n.get(w[Et]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,k,Q,0,0,k,Q,et,i.NEAREST),c===!0&&(dt.length=0,L.length=0,dt.push(i.COLOR_ATTACHMENT0+Et),A.depthBuffer&&A.resolveDepthBuffer===!1&&(dt.push(K),L.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,dt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xt)for(let Et=0;Et<w.length;Et++){e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[Et]);let te=n.get(w[Et]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.TEXTURE_2D,te,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let w=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function J(A){return Math.min(s.maxSamples,A.samples)}function At(A){let w=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function mt(A){let w=o.render.frame;u.get(A)!==w&&(u.set(A,w),A.update())}function Nt(A,w){let k=A.colorSpace,Q=A.format,et=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||k!==cs&&k!==jn&&(ie.getTransfer(k)===ue?(Q!==xn||et!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),w}function wt(A){return typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame!="undefined"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=O,this.setTexture2D=$,this.setTexture2DArray=G,this.setTexture3D=it,this.setTextureCube=X,this.rebindTextures=Ut,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=At}function hm(i,t){function e(n,s=jn){let r,o=ie.getTransfer(s);if(n===Hn)return i.UNSIGNED_BYTE;if(n===dc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gl)return i.BYTE;if(n===Wl)return i.SHORT;if(n===Rs)return i.UNSIGNED_SHORT;if(n===uc)return i.INT;if(n===Mi)return i.UNSIGNED_INT;if(n===zn)return i.FLOAT;if(n===Gs)return i.HALF_FLOAT;if(n===ql)return i.ALPHA;if(n===Yl)return i.RGB;if(n===xn)return i.RGBA;if(n===$l)return i.LUMINANCE;if(n===Zl)return i.LUMINANCE_ALPHA;if(n===$i)return i.DEPTH_COMPONENT;if(n===es)return i.DEPTH_STENCIL;if(n===Jl)return i.RED;if(n===pc)return i.RED_INTEGER;if(n===Kl)return i.RG;if(n===mc)return i.RG_INTEGER;if(n===gc)return i.RGBA_INTEGER;if(n===vr||n===Mr||n===Sr||n===br)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qo||n===jo||n===ta||n===ea)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===na||n===ia||n===sa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===na||n===ia)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ra||n===oa||n===aa||n===ca||n===la||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===xa||n===_a)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ra)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===aa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ca)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===la)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ha)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ua)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===da)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ma)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ga)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_a)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wr||n===ya||n===va)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===wr)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ya)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ql||n===Ma||n===Sa||n===ba)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===wr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ma)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ba)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ts?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Ba=class extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ct=class extends He{constructor(){super(),this.isGroup=!0,this.type="Group"}},um={type:"move"},ws=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let g=e.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&h>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(um)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ct;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},dm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fm=`
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

}`,za=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new en,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new An({vertexShader:dm,fragmentShader:fm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ne(new Se(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Va=class extends ii{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,m=null,_=new za,g=e.getContextAttributes(),p=null,S=null,v=[],y=[],R=new pt,T=null,C=new Ve;C.viewport=new de;let P=new Ve;P.viewport=new de;let E=[C,P],M=new Ba,I=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let at=v[Z];return at===void 0&&(at=new ws,v[Z]=at),at.getTargetRaySpace()},this.getControllerGrip=function(Z){let at=v[Z];return at===void 0&&(at=new ws,v[Z]=at),at.getGripSpace()},this.getHand=function(Z){let at=v[Z];return at===void 0&&(at=new ws,v[Z]=at),at.getHandSpace()};function F(Z){let at=y.indexOf(Z.inputSource);if(at===-1)return;let Tt=v[at];Tt!==void 0&&(Tt.update(Z.inputSource,Z.frame,l||o),Tt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function V(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",$);for(let Z=0;Z<v.length;Z++){let at=y[Z];at!==null&&(y[Z]=null,v[Z].disconnect(at))}I=null,O=null,_.reset(),t.setRenderTarget(p),f=null,h=null,d=null,s=null,S=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",V),s.addEventListener("inputsourceschange",$),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){let at={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,at),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Gn(f.framebufferWidth,f.framebufferHeight,{format:xn,type:Hn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let at=null,Tt=null,lt=null;g.depth&&(lt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=g.stencil?es:$i,Tt=g.stencil?ts:Mi);let Lt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};d=new XRWebGLBinding(s,e),h=d.createProjectionLayer(Lt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Gn(h.textureWidth,h.textureHeight,{format:xn,type:Hn,depthTexture:new Fr(h.textureWidth,h.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),$t.setContext(s),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(Z){for(let at=0;at<Z.removed.length;at++){let Tt=Z.removed[at],lt=y.indexOf(Tt);lt>=0&&(y[lt]=null,v[lt].disconnect(Tt))}for(let at=0;at<Z.added.length;at++){let Tt=Z.added[at],lt=y.indexOf(Tt);if(lt===-1){for(let Vt=0;Vt<v.length;Vt++)if(Vt>=y.length){y.push(Tt),lt=Vt;break}else if(y[Vt]===null){y[Vt]=Tt,lt=Vt;break}if(lt===-1)break}let Lt=v[lt];Lt&&Lt.connect(Tt)}}let G=new D,it=new D;function X(Z,at,Tt){G.setFromMatrixPosition(at.matrixWorld),it.setFromMatrixPosition(Tt.matrixWorld);let lt=G.distanceTo(it),Lt=at.projectionMatrix.elements,Vt=Tt.projectionMatrix.elements,Ut=Lt[14]/(Lt[10]-1),Zt=Lt[14]/(Lt[10]+1),j=(Lt[9]+1)/Lt[5],dt=(Lt[9]-1)/Lt[5],L=(Lt[8]-1)/Lt[0],Dt=(Vt[8]+1)/Vt[0],J=Ut*L,At=Ut*Dt,mt=lt/(-L+Dt),Nt=mt*-L;if(at.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Nt),Z.translateZ(mt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Lt[10]===-1)Z.projectionMatrix.copy(at.projectionMatrix),Z.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{let wt=Ut+mt,A=Zt+mt,w=J-Nt,k=At+(lt-Nt),Q=j*Zt/A*wt,et=dt*Zt/A*wt;Z.projectionMatrix.makePerspective(w,k,Q,et,wt,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function st(Z,at){at===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(at.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let at=Z.near,Tt=Z.far;_.texture!==null&&(_.depthNear>0&&(at=_.depthNear),_.depthFar>0&&(Tt=_.depthFar)),M.near=P.near=C.near=at,M.far=P.far=C.far=Tt,(I!==M.near||O!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,O=M.far),C.layers.mask=Z.layers.mask|2,P.layers.mask=Z.layers.mask|4,M.layers.mask=C.layers.mask|P.layers.mask;let lt=Z.parent,Lt=M.cameras;st(M,lt);for(let Vt=0;Vt<Lt.length;Vt++)st(Lt[Vt],lt);Lt.length===2?X(M,C,P):M.projectionMatrix.copy(C.projectionMatrix),ft(Z,M,lt)};function ft(Z,at,Tt){Tt===null?Z.matrix.copy(at.matrixWorld):(Z.matrix.copy(Tt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(at.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(at.projectionMatrix),Z.projectionMatrixInverse.copy(at.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ps*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(Z){c=Z,h!==null&&(h.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let yt=null;function zt(Z,at){if(u=at.getViewerPose(l||o),m=at,u!==null){let Tt=u.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let lt=!1;Tt.length!==M.cameras.length&&(M.cameras.length=0,lt=!0);for(let Vt=0;Vt<Tt.length;Vt++){let Ut=Tt[Vt],Zt=null;if(f!==null)Zt=f.getViewport(Ut);else{let dt=d.getViewSubImage(h,Ut);Zt=dt.viewport,Vt===0&&(t.setRenderTargetTextures(S,dt.colorTexture,h.ignoreDepthValues?void 0:dt.depthStencilTexture),t.setRenderTarget(S))}let j=E[Vt];j===void 0&&(j=new Ve,j.layers.enable(Vt),j.viewport=new de,E[Vt]=j),j.matrix.fromArray(Ut.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(Ut.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),Vt===0&&(M.matrix.copy(j.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),lt===!0&&M.cameras.push(j)}let Lt=s.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")){let Vt=d.getDepthInformation(Tt[0]);Vt&&Vt.isValid&&Vt.texture&&_.init(t,Vt,s.renderState)}}for(let Tt=0;Tt<v.length;Tt++){let lt=y[Tt],Lt=v[Tt];lt!==null&&Lt!==void 0&&Lt.update(lt,at,l||o)}yt&&yt(Z,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),m=null}let $t=new sh;$t.setAnimationLoop(zt),this.setAnimationLoop=function(Z){yt=Z},this.dispose=function(){}}},pi=new Tn,pm=new xe;function mm(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,ih(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,S,v,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,S,v):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===ke&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===ke&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let S=t.get(p),v=S.envMap,y=S.envMapRotation;v&&(g.envMap.value=v,pi.copy(y),pi.x*=-1,pi.y*=-1,pi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),g.envMapRotation.value.setFromMatrix4(pm.makeRotationFromEuler(pi)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,S,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*S,g.scale.value=v*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,S){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ke&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let S=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function gm(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,v){let y=v.program;n.uniformBlockBinding(S,y)}function l(S,v){let y=s[S.id];y===void 0&&(m(S),y=u(S),s[S.id]=y,S.addEventListener("dispose",g));let R=v.program;n.updateUBOMapping(S,R);let T=t.render.frame;r[S.id]!==T&&(h(S),r[S.id]=T)}function u(S){let v=d();S.__bindingPointIndex=v;let y=i.createBuffer(),R=S.__size,T=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,y),y}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){let v=s[S.id],y=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,C=y.length;T<C;T++){let P=Array.isArray(y[T])?y[T]:[y[T]];for(let E=0,M=P.length;E<M;E++){let I=P[E];if(f(I,T,E,R)===!0){let O=I.__offset,F=Array.isArray(I.value)?I.value:[I.value],V=0;for(let $=0;$<F.length;$++){let G=F[$],it=_(G);typeof G=="number"||typeof G=="boolean"?(I.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,O+V,I.__data)):G.isMatrix3?(I.__data[0]=G.elements[0],I.__data[1]=G.elements[1],I.__data[2]=G.elements[2],I.__data[3]=0,I.__data[4]=G.elements[3],I.__data[5]=G.elements[4],I.__data[6]=G.elements[5],I.__data[7]=0,I.__data[8]=G.elements[6],I.__data[9]=G.elements[7],I.__data[10]=G.elements[8],I.__data[11]=0):(G.toArray(I.__data,V),V+=it.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,v,y,R){let T=S.value,C=v+"_"+y;if(R[C]===void 0)return typeof T=="number"||typeof T=="boolean"?R[C]=T:R[C]=T.clone(),!0;{let P=R[C];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return R[C]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function m(S){let v=S.uniforms,y=0,R=16;for(let C=0,P=v.length;C<P;C++){let E=Array.isArray(v[C])?v[C]:[v[C]];for(let M=0,I=E.length;M<I;M++){let O=E[M],F=Array.isArray(O.value)?O.value:[O.value];for(let V=0,$=F.length;V<$;V++){let G=F[V],it=_(G),X=y%R,st=X%it.boundary,ft=X+st;y+=st,ft!==0&&R-ft<it.storage&&(y+=R-ft),O.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=it.storage}}}let T=y%R;return T>0&&(y+=R-T),S.__size=y,S.__cache={},this}function _(S){let v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function g(S){let v=S.target;v.removeEventListener("dispose",g);let y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Or=class{constructor(t={}){let{canvas:e=yu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,S=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ze,this.toneMapping=ei,this.toneMappingExposure=1;let y=this,R=!1,T=0,C=0,P=null,E=-1,M=null,I=new de,O=new de,F=null,V=new Ht(0),$=0,G=e.width,it=e.height,X=1,st=null,ft=null,yt=new de(0,0,G,it),zt=new de(0,0,G,it),$t=!1,Z=new Ds,at=!1,Tt=!1,lt=new xe,Lt=new xe,Vt=new D,Ut=new de,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},j=!1;function dt(){return P===null?X:1}let L=n;function Dt(b,U){return e.getContext(b,U)}try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${cc}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",bt,!1),L===null){let U="webgl2";if(L=Dt(U,b),L===null)throw Dt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let J,At,mt,Nt,wt,A,w,k,Q,et,K,Pt,xt,Et,te,ht,Ct,kt,Gt,Rt,ne,Jt,re,B;function vt(){J=new L0(L),J.init(),Jt=new hm(L,J),At=new T0(L,J,t,Jt),mt=new am(L,J),At.reverseDepthBuffer&&h&&mt.buffers.depth.setReversed(!0),Nt=new N0(L),wt=new $p,A=new lm(L,J,mt,wt,At,Jt,Nt),w=new C0(y),k=new I0(y),Q=new ku(L),re=new w0(L,Q),et=new D0(L,Q,Nt,re),K=new O0(L,et,Q,Nt),Gt=new F0(L,At,A),ht=new A0(wt),Pt=new Yp(y,w,k,J,At,re,ht),xt=new mm(y,wt),Et=new Jp,te=new nm(J),kt=new b0(y,w,k,mt,K,f,c),Ct=new rm(y,K,At),B=new gm(L,Nt,At,mt),Rt=new E0(L,J,Nt),ne=new U0(L,J,Nt),Nt.programs=Pt.programs,y.capabilities=At,y.extensions=J,y.properties=wt,y.renderLists=Et,y.shadowMap=Ct,y.state=mt,y.info=Nt}vt();let Y=new Va(y,L);this.xr=Y,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let b=J.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=J.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(b){b!==void 0&&(X=b,this.setSize(G,it,!1))},this.getSize=function(b){return b.set(G,it)},this.setSize=function(b,U,z=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=b,it=U,e.width=Math.floor(b*X),e.height=Math.floor(U*X),z===!0&&(e.style.width=b+"px",e.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(G*X,it*X).floor()},this.setDrawingBufferSize=function(b,U,z){G=b,it=U,X=z,e.width=Math.floor(b*z),e.height=Math.floor(U*z),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(yt)},this.setViewport=function(b,U,z,H){b.isVector4?yt.set(b.x,b.y,b.z,b.w):yt.set(b,U,z,H),mt.viewport(I.copy(yt).multiplyScalar(X).round())},this.getScissor=function(b){return b.copy(zt)},this.setScissor=function(b,U,z,H){b.isVector4?zt.set(b.x,b.y,b.z,b.w):zt.set(b,U,z,H),mt.scissor(O.copy(zt).multiplyScalar(X).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(b){mt.setScissorTest($t=b)},this.setOpaqueSort=function(b){st=b},this.setTransparentSort=function(b){ft=b},this.getClearColor=function(b){return b.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor.apply(kt,arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha.apply(kt,arguments)},this.clear=function(b=!0,U=!0,z=!0){let H=0;if(b){let N=!1;if(P!==null){let ut=P.texture.format;N=ut===gc||ut===mc||ut===pc}if(N){let ut=P.texture.type,gt=ut===Hn||ut===Mi||ut===Rs||ut===ts||ut===dc||ut===fc,It=kt.getClearColor(),Ft=kt.getClearAlpha(),Xt=It.r,Kt=It.g,Ot=It.b;gt?(m[0]=Xt,m[1]=Kt,m[2]=Ot,m[3]=Ft,L.clearBufferuiv(L.COLOR,0,m)):(_[0]=Xt,_[1]=Kt,_[2]=Ot,_[3]=Ft,L.clearBufferiv(L.COLOR,0,_))}else H|=L.COLOR_BUFFER_BIT}U&&(H|=L.DEPTH_BUFFER_BIT),z&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),Et.dispose(),te.dispose(),wt.dispose(),w.dispose(),k.dispose(),K.dispose(),re.dispose(),B.dispose(),Pt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Ue),Y.removeEventListener("sessionend",Ye),sn.stop()};function tt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let b=Nt.autoReset,U=Ct.enabled,z=Ct.autoUpdate,H=Ct.needsUpdate,N=Ct.type;vt(),Nt.autoReset=b,Ct.enabled=U,Ct.autoUpdate=z,Ct.needsUpdate=H,Ct.type=N}function bt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function qt(b){let U=b.target;U.removeEventListener("dispose",qt),_e(U)}function _e(b){Pe(b),wt.remove(b)}function Pe(b){let U=wt.get(b).programs;U!==void 0&&(U.forEach(function(z){Pt.releaseProgram(z)}),b.isShaderMaterial&&Pt.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,z,H,N,ut){U===null&&(U=Zt);let gt=N.isMesh&&N.matrixWorld.determinant()<0,It=_t(b,U,z,H,N);mt.setMaterial(H,gt);let Ft=z.index,Xt=1;if(H.wireframe===!0){if(Ft=et.getWireframeAttribute(z),Ft===void 0)return;Xt=2}let Kt=z.drawRange,Ot=z.attributes.position,se=Kt.start*Xt,fe=(Kt.start+Kt.count)*Xt;ut!==null&&(se=Math.max(se,ut.start*Xt),fe=Math.min(fe,(ut.start+ut.count)*Xt)),Ft!==null?(se=Math.max(se,0),fe=Math.min(fe,Ft.count)):Ot!=null&&(se=Math.max(se,0),fe=Math.min(fe,Ot.count));let me=fe-se;if(me<0||me===1/0)return;re.setup(N,H,It,z,Ft);let $e,ae=Rt;if(Ft!==null&&($e=Q.get(Ft),ae=ne,ae.setIndex($e)),N.isMesh)H.wireframe===!0?(mt.setLineWidth(H.wireframeLinewidth*dt()),ae.setMode(L.LINES)):ae.setMode(L.TRIANGLES);else if(N.isLine){let Bt=H.linewidth;Bt===void 0&&(Bt=1),mt.setLineWidth(Bt*dt()),N.isLineSegments?ae.setMode(L.LINES):N.isLineLoop?ae.setMode(L.LINE_LOOP):ae.setMode(L.LINE_STRIP)}else N.isPoints?ae.setMode(L.POINTS):N.isSprite&&ae.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ae.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))ae.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let Bt=N._multiDrawStarts,In=N._multiDrawCounts,ce=N._multiDrawCount,fn=Ft?Q.get(Ft).bytesPerElement:1,Ri=wt.get(H).currentProgram.getUniforms();for(let Ke=0;Ke<ce;Ke++)Ri.setValue(L,"_gl_DrawID",Ke),ae.render(Bt[Ke]/fn,In[Ke])}else if(N.isInstancedMesh)ae.renderInstances(se,me,N.count);else if(z.isInstancedBufferGeometry){let Bt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,In=Math.min(z.instanceCount,Bt);ae.renderInstances(se,me,In)}else ae.render(se,me)};function oe(b,U,z){b.transparent===!0&&b.side===Ee&&b.forceSinglePass===!1?(b.side=ke,b.needsUpdate=!0,Pn(b,U,z),b.side=ni,b.needsUpdate=!0,Pn(b,U,z),b.side=Ee):Pn(b,U,z)}this.compile=function(b,U,z=null){z===null&&(z=b),p=te.get(z),p.init(U),v.push(p),z.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),b!==z&&b.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();let H=new Set;return b.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let ut=N.material;if(ut)if(Array.isArray(ut))for(let gt=0;gt<ut.length;gt++){let It=ut[gt];oe(It,z,N),H.add(It)}else oe(ut,z,N),H.add(ut)}),v.pop(),p=null,H},this.compileAsync=function(b,U,z=null){let H=this.compile(b,U,z);return new Promise(N=>{function ut(){if(H.forEach(function(gt){wt.get(gt).currentProgram.isReady()&&H.delete(gt)}),H.size===0){N(b);return}setTimeout(ut,10)}J.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let Je=null;function dn(b){Je&&Je(b)}function Ue(){sn.stop()}function Ye(){sn.start()}let sn=new sh;sn.setAnimationLoop(dn),typeof self!="undefined"&&sn.setContext(self),this.setAnimationLoop=function(b){Je=b,Y.setAnimationLoop(b),b===null?sn.stop():sn.start()},Y.addEventListener("sessionstart",Ue),Y.addEventListener("sessionend",Ye),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(U),U=Y.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,U,P),p=te.get(b,v.length),p.init(U),v.push(p),Lt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Z.setFromProjectionMatrix(Lt),Tt=this.localClippingEnabled,at=ht.init(this.clippingPlanes,Tt),g=Et.get(b,S.length),g.init(),S.push(g),Y.enabled===!0&&Y.isPresenting===!0){let ut=y.xr.getDepthSensingMesh();ut!==null&&Mn(ut,U,-1/0,y.sortObjects)}Mn(b,U,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(st,ft),j=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,j&&kt.addToRenderList(g,b),this.info.render.frame++,at===!0&&ht.beginShadows();let z=p.state.shadowsArray;Ct.render(z,b,U),at===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=g.opaque,N=g.transmissive;if(p.setupLights(),U.isArrayCamera){let ut=U.cameras;if(N.length>0)for(let gt=0,It=ut.length;gt<It;gt++){let Ft=ut[gt];Rn(H,N,b,Ft)}j&&kt.render(b);for(let gt=0,It=ut.length;gt<It;gt++){let Ft=ut[gt];rn(g,b,Ft,Ft.viewport)}}else N.length>0&&Rn(H,N,b,U),j&&kt.render(b),rn(g,b,U);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(y,b,U),re.resetDefaultState(),E=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],at===!0&&ht.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function Mn(b,U,z,H){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Z.intersectsSprite(b)){H&&Ut.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Lt);let gt=K.update(b),It=b.material;It.visible&&g.push(b,gt,It,z,Ut.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Z.intersectsObject(b))){let gt=K.update(b),It=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ut.copy(b.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Ut.copy(gt.boundingSphere.center)),Ut.applyMatrix4(b.matrixWorld).applyMatrix4(Lt)),Array.isArray(It)){let Ft=gt.groups;for(let Xt=0,Kt=Ft.length;Xt<Kt;Xt++){let Ot=Ft[Xt],se=It[Ot.materialIndex];se&&se.visible&&g.push(b,gt,se,z,Ut.z,Ot)}}else It.visible&&g.push(b,gt,It,z,Ut.z,null)}}let ut=b.children;for(let gt=0,It=ut.length;gt<It;gt++)Mn(ut[gt],U,z,H)}function rn(b,U,z,H){let N=b.opaque,ut=b.transmissive,gt=b.transparent;p.setupLightsView(z),at===!0&&ht.setGlobalState(y.clippingPlanes,z),H&&mt.viewport(I.copy(H)),N.length>0&&ci(N,U,z),ut.length>0&&ci(ut,U,z),gt.length>0&&ci(gt,U,z),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function Rn(b,U,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new Gn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?Gs:Hn,minFilter:vi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace}));let ut=p.state.transmissionRenderTarget[H.id],gt=H.viewport||I;ut.setSize(gt.z,gt.w);let It=y.getRenderTarget();y.setRenderTarget(ut),y.getClearColor(V),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),j&&kt.render(z);let Ft=y.toneMapping;y.toneMapping=ei;let Xt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),at===!0&&ht.setGlobalState(y.clippingPlanes,H),ci(b,z,H),A.updateMultisampleRenderTarget(ut),A.updateRenderTargetMipmap(ut),J.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Ot=0,se=U.length;Ot<se;Ot++){let fe=U[Ot],me=fe.object,$e=fe.geometry,ae=fe.material,Bt=fe.group;if(ae.side===Ee&&me.layers.test(H.layers)){let In=ae.side;ae.side=ke,ae.needsUpdate=!0,qs(me,z,H,$e,ae,Bt),ae.side=In,ae.needsUpdate=!0,Kt=!0}}Kt===!0&&(A.updateMultisampleRenderTarget(ut),A.updateRenderTargetMipmap(ut))}y.setRenderTarget(It),y.setClearColor(V,$),Xt!==void 0&&(H.viewport=Xt),y.toneMapping=Ft}function ci(b,U,z){let H=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ut=b.length;N<ut;N++){let gt=b[N],It=gt.object,Ft=gt.geometry,Xt=H===null?gt.material:H,Kt=gt.group;It.layers.test(z.layers)&&qs(It,U,z,Ft,Xt,Kt)}}function qs(b,U,z,H,N,ut){b.onBeforeRender(y,U,z,H,N,ut),b.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),N.onBeforeRender(y,U,z,H,b,ut),N.transparent===!0&&N.side===Ee&&N.forceSinglePass===!1?(N.side=ke,N.needsUpdate=!0,y.renderBufferDirect(z,U,H,N,b,ut),N.side=ni,N.needsUpdate=!0,y.renderBufferDirect(z,U,H,N,b,ut),N.side=Ee):y.renderBufferDirect(z,U,H,N,b,ut),b.onAfterRender(y,U,z,H,N,ut)}function Pn(b,U,z){U.isScene!==!0&&(U=Zt);let H=wt.get(b),N=p.state.lights,ut=p.state.shadowsArray,gt=N.state.version,It=Pt.getParameters(b,N.state,ut,U,z),Ft=Pt.getProgramCacheKey(It),Xt=H.programs;H.environment=b.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(b.isMeshStandardMaterial?k:w).get(b.envMap||H.environment),H.envMapRotation=H.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Xt===void 0&&(b.addEventListener("dispose",qt),Xt=new Map,H.programs=Xt);let Kt=Xt.get(Ft);if(Kt!==void 0){if(H.currentProgram===Kt&&H.lightsStateVersion===gt)return rt(b,It),Kt}else It.uniforms=Pt.getUniforms(b),b.onBeforeCompile(It,y),Kt=Pt.acquireProgram(It,Ft),Xt.set(Ft,Kt),H.uniforms=It.uniforms;let Ot=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ot.clippingPlanes=ht.uniform),rt(b,It),H.needsLights=ee(b),H.lightsStateVersion=gt,H.needsLights&&(Ot.ambientLightColor.value=N.state.ambient,Ot.lightProbe.value=N.state.probe,Ot.directionalLights.value=N.state.directional,Ot.directionalLightShadows.value=N.state.directionalShadow,Ot.spotLights.value=N.state.spot,Ot.spotLightShadows.value=N.state.spotShadow,Ot.rectAreaLights.value=N.state.rectArea,Ot.ltc_1.value=N.state.rectAreaLTC1,Ot.ltc_2.value=N.state.rectAreaLTC2,Ot.pointLights.value=N.state.point,Ot.pointLightShadows.value=N.state.pointShadow,Ot.hemisphereLights.value=N.state.hemi,Ot.directionalShadowMap.value=N.state.directionalShadowMap,Ot.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ot.spotShadowMap.value=N.state.spotShadowMap,Ot.spotLightMatrix.value=N.state.spotLightMatrix,Ot.spotLightMap.value=N.state.spotLightMap,Ot.pointShadowMap.value=N.state.pointShadowMap,Ot.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=Kt,H.uniformsList=null,Kt}function nt(b){if(b.uniformsList===null){let U=b.currentProgram.getUniforms();b.uniformsList=Ji.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function rt(b,U){let z=wt.get(b);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function _t(b,U,z,H,N){U.isScene!==!0&&(U=Zt),A.resetTextureUnits();let ut=U.fog,gt=H.isMeshStandardMaterial?U.environment:null,It=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:cs,Ft=(H.isMeshStandardMaterial?k:w).get(H.envMap||gt),Xt=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Kt=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ot=!!z.morphAttributes.position,se=!!z.morphAttributes.normal,fe=!!z.morphAttributes.color,me=ei;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(me=y.toneMapping);let $e=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ae=$e!==void 0?$e.length:0,Bt=wt.get(H),In=p.state.lights;if(at===!0&&(Tt===!0||b!==M)){let on=b===M&&H.id===E;ht.setState(H,b,on)}let ce=!1;H.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==In.state.version||Bt.outputColorSpace!==It||N.isBatchedMesh&&Bt.batching===!1||!N.isBatchedMesh&&Bt.batching===!0||N.isBatchedMesh&&Bt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Bt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Bt.instancing===!1||!N.isInstancedMesh&&Bt.instancing===!0||N.isSkinnedMesh&&Bt.skinning===!1||!N.isSkinnedMesh&&Bt.skinning===!0||N.isInstancedMesh&&Bt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Bt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Bt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Bt.instancingMorph===!1&&N.morphTexture!==null||Bt.envMap!==Ft||H.fog===!0&&Bt.fog!==ut||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==ht.numPlanes||Bt.numIntersection!==ht.numIntersection)||Bt.vertexAlphas!==Xt||Bt.vertexTangents!==Kt||Bt.morphTargets!==Ot||Bt.morphNormals!==se||Bt.morphColors!==fe||Bt.toneMapping!==me||Bt.morphTargetsCount!==ae)&&(ce=!0):(ce=!0,Bt.__version=H.version);let fn=Bt.currentProgram;ce===!0&&(fn=Pn(H,U,N));let Ri=!1,Ke=!1,fs=!1,ge=fn.getUniforms(),Sn=Bt.uniforms;if(mt.useProgram(fn.program)&&(Ri=!0,Ke=!0,fs=!0),H.id!==E&&(E=H.id,Ke=!0),Ri||M!==b){mt.buffers.depth.getReversed()?(lt.copy(b.projectionMatrix),Mu(lt),Su(lt),ge.setValue(L,"projectionMatrix",lt)):ge.setValue(L,"projectionMatrix",b.projectionMatrix),ge.setValue(L,"viewMatrix",b.matrixWorldInverse);let Xn=ge.map.cameraPosition;Xn!==void 0&&Xn.setValue(L,Vt.setFromMatrixPosition(b.matrixWorld)),At.logarithmicDepthBuffer&&ge.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ge.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,Ke=!0,fs=!0)}if(N.isSkinnedMesh){ge.setOptional(L,N,"bindMatrix"),ge.setOptional(L,N,"bindMatrixInverse");let on=N.skeleton;on&&(on.boneTexture===null&&on.computeBoneTexture(),ge.setValue(L,"boneTexture",on.boneTexture,A))}N.isBatchedMesh&&(ge.setOptional(L,N,"batchingTexture"),ge.setValue(L,"batchingTexture",N._matricesTexture,A),ge.setOptional(L,N,"batchingIdTexture"),ge.setValue(L,"batchingIdTexture",N._indirectTexture,A),ge.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&ge.setValue(L,"batchingColorTexture",N._colorsTexture,A));let ps=z.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0)&&Gt.update(N,z,fn),(Ke||Bt.receiveShadow!==N.receiveShadow)&&(Bt.receiveShadow=N.receiveShadow,ge.setValue(L,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Sn.envMap.value=Ft,Sn.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(Sn.envMapIntensity.value=U.environmentIntensity),Ke&&(ge.setValue(L,"toneMappingExposure",y.toneMappingExposure),Bt.needsLights&&Yt(Sn,fs),ut&&H.fog===!0&&xt.refreshFogUniforms(Sn,ut),xt.refreshMaterialUniforms(Sn,H,X,it,p.state.transmissionRenderTarget[b.id]),Ji.upload(L,nt(Bt),Sn,A)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ji.upload(L,nt(Bt),Sn,A),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ge.setValue(L,"center",N.center),ge.setValue(L,"modelViewMatrix",N.modelViewMatrix),ge.setValue(L,"normalMatrix",N.normalMatrix),ge.setValue(L,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let on=H.uniformsGroups;for(let Xn=0,qn=on.length;Xn<qn;Xn++){let Ac=on[Xn];B.update(Ac,fn),B.bind(Ac,fn)}}return fn}function Yt(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function ee(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,U,z){wt.get(b.texture).__webglTexture=U,wt.get(b.depthTexture).__webglTexture=z;let H=wt.get(b);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,U){let z=wt.get(b);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,z=0){P=b,T=U,C=z;let H=!0,N=null,ut=!1,gt=!1;if(b){let Ft=wt.get(b);if(Ft.__useDefaultFramebuffer!==void 0)mt.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(Ft.__webglFramebuffer===void 0)A.setupRenderTarget(b);else if(Ft.__hasExternalTextures)A.rebindTextures(b,wt.get(b.texture).__webglTexture,wt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ot=b.depthTexture;if(Ft.__boundDepthTexture!==Ot){if(Ot!==null&&wt.has(Ot)&&(b.width!==Ot.image.width||b.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(b)}}let Xt=b.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(gt=!0);let Kt=wt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Kt[U])?N=Kt[U][z]:N=Kt[U],ut=!0):b.samples>0&&A.useMultisampledRTT(b)===!1?N=wt.get(b).__webglMultisampledFramebuffer:Array.isArray(Kt)?N=Kt[z]:N=Kt,I.copy(b.viewport),O.copy(b.scissor),F=b.scissorTest}else I.copy(yt).multiplyScalar(X).floor(),O.copy(zt).multiplyScalar(X).floor(),F=$t;if(mt.bindFramebuffer(L.FRAMEBUFFER,N)&&H&&mt.drawBuffers(b,N),mt.viewport(I),mt.scissor(O),mt.setScissorTest(F),ut){let Ft=wt.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ft.__webglTexture,z)}else if(gt){let Ft=wt.get(b.texture),Xt=U||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ft.__webglTexture,z||0,Xt)}E=-1},this.readRenderTargetPixels=function(b,U,z,H,N,ut,gt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=wt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(It=It[gt]),It){mt.bindFramebuffer(L.FRAMEBUFFER,It);try{let Ft=b.texture,Xt=Ft.format,Kt=Ft.type;if(!At.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!At.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-H&&z>=0&&z<=b.height-N&&L.readPixels(U,z,H,N,Jt.convert(Xt),Jt.convert(Kt),ut)}finally{let Ft=P!==null?wt.get(P).__webglFramebuffer:null;mt.bindFramebuffer(L.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(b,U,z,H,N,ut,gt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=wt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(It=It[gt]),It){let Ft=b.texture,Xt=Ft.format,Kt=Ft.type;if(!At.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!At.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=b.width-H&&z>=0&&z<=b.height-N){mt.bindFramebuffer(L.FRAMEBUFFER,It);let Ot=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ot),L.bufferData(L.PIXEL_PACK_BUFFER,ut.byteLength,L.STREAM_READ),L.readPixels(U,z,H,N,Jt.convert(Xt),Jt.convert(Kt),0);let se=P!==null?wt.get(P).__webglFramebuffer:null;mt.bindFramebuffer(L.FRAMEBUFFER,se);let fe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await vu(L,fe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ot),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ut),L.deleteBuffer(Ot),L.deleteSync(fe),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,U=null,z=0){b.isTexture!==!0&&(vs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,b=arguments[1]);let H=Math.pow(2,-z),N=Math.floor(b.image.width*H),ut=Math.floor(b.image.height*H),gt=U!==null?U.x:0,It=U!==null?U.y:0;A.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,z,0,0,gt,It,N,ut),mt.unbindTexture()},this.copyTextureToTexture=function(b,U,z=null,H=null,N=0){b.isTexture!==!0&&(vs("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1],U=arguments[2],N=arguments[3]||0,z=null);let ut,gt,It,Ft,Xt,Kt,Ot,se,fe,me=b.isCompressedTexture?b.mipmaps[N]:b.image;z!==null?(ut=z.max.x-z.min.x,gt=z.max.y-z.min.y,It=z.isBox3?z.max.z-z.min.z:1,Ft=z.min.x,Xt=z.min.y,Kt=z.isBox3?z.min.z:0):(ut=me.width,gt=me.height,It=me.depth||1,Ft=0,Xt=0,Kt=0),H!==null?(Ot=H.x,se=H.y,fe=H.z):(Ot=0,se=0,fe=0);let $e=Jt.convert(U.format),ae=Jt.convert(U.type),Bt;U.isData3DTexture?(A.setTexture3D(U,0),Bt=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(A.setTexture2DArray(U,0),Bt=L.TEXTURE_2D_ARRAY):(A.setTexture2D(U,0),Bt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);let In=L.getParameter(L.UNPACK_ROW_LENGTH),ce=L.getParameter(L.UNPACK_IMAGE_HEIGHT),fn=L.getParameter(L.UNPACK_SKIP_PIXELS),Ri=L.getParameter(L.UNPACK_SKIP_ROWS),Ke=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,me.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,me.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ft),L.pixelStorei(L.UNPACK_SKIP_ROWS,Xt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Kt);let fs=b.isDataArrayTexture||b.isData3DTexture,ge=U.isDataArrayTexture||U.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){let Sn=wt.get(b),ps=wt.get(U),on=wt.get(Sn.__renderTarget),Xn=wt.get(ps.__renderTarget);mt.bindFramebuffer(L.READ_FRAMEBUFFER,on.__webglFramebuffer),mt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let qn=0;qn<It;qn++)fs&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,wt.get(b).__webglTexture,N,Kt+qn),b.isDepthTexture?(ge&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,wt.get(U).__webglTexture,N,fe+qn),L.blitFramebuffer(Ft,Xt,ut,gt,Ot,se,ut,gt,L.DEPTH_BUFFER_BIT,L.NEAREST)):ge?L.copyTexSubImage3D(Bt,N,Ot,se,fe+qn,Ft,Xt,ut,gt):L.copyTexSubImage2D(Bt,N,Ot,se,fe+qn,Ft,Xt,ut,gt);mt.bindFramebuffer(L.READ_FRAMEBUFFER,null),mt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ge?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Bt,N,Ot,se,fe,ut,gt,It,$e,ae,me.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Bt,N,Ot,se,fe,ut,gt,It,$e,me.data):L.texSubImage3D(Bt,N,Ot,se,fe,ut,gt,It,$e,ae,me):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,N,Ot,se,ut,gt,$e,ae,me.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,N,Ot,se,me.width,me.height,$e,me.data):L.texSubImage2D(L.TEXTURE_2D,N,Ot,se,ut,gt,$e,ae,me);L.pixelStorei(L.UNPACK_ROW_LENGTH,In),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ce),L.pixelStorei(L.UNPACK_SKIP_PIXELS,fn),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ri),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ke),N===0&&U.generateMipmaps&&L.generateMipmap(Bt),mt.unbindTexture()},this.copyTextureToTexture3D=function(b,U,z=null,H=null,N=0){return b.isTexture!==!0&&(vs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,b=arguments[2],U=arguments[3],N=arguments[4]||0),vs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,U,z,H,N)},this.initRenderTarget=function(b){wt.get(b).__webglFramebuffer===void 0&&A.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?A.setTextureCube(b,0):b.isData3DTexture?A.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?A.setTexture2DArray(b,0):A.setTexture2D(b,0),mt.unbindTexture()},this.resetState=function(){T=0,C=0,P=null,mt.reset(),re.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}},Br=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ht(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var zr=class extends He{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Us=class extends ri{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Rl=new xe,ka=new Is,pr=new ns,mr=new D,Vr=class extends He{constructor(t=new Fe,e=new Us){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(s),pr.radius+=r,t.ray.intersectsSphere(pr)===!1)return;Rl.copy(s).invert(),ka.copy(t.ray).applyMatrix4(Rl);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){let h=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let m=h,_=f;m<_;m++){let g=l.getX(m);mr.fromBufferAttribute(d,g),Pl(mr,g,c,s,t,e,this)}}else{let h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let m=h,_=f;m<_;m++)mr.fromBufferAttribute(d,m),Pl(mr,m,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Pl(i,t,e,n,s,r,o){let a=ka.distanceSqToPoint(i);if(a<e){let c=new D;ka.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ns=class extends en{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},cn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let u=n[s],h=n[s+1]-u,f=(o-u)/h;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new pt:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new D,s=[],r=[],o=[],a=new D,c=new xe;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new D)}r[0]=new D,o[0]=new D;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),h<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(we(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(we(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Fs=class extends cn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new pt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,f=l-this.aY;c=h*u-f*d+this.aX,l=h*d+f*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ha=class extends Fs{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function yc(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,d){let h=(o-r)/l-(a-r)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+d)+(c-a)/d;h*=u,f*=u,s(o,a,h,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var gr=new D,Fo=new yc,Oo=new yc,Bo=new yc,Os=class extends cn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(gr.subVectors(s[0],s[1]).add(s[0]),l=gr);let d=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(gr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=gr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Fo.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,m,_,g),Oo.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,m,_,g),Bo.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(Fo.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),Oo.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),Bo.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return n.set(Fo.calc(c),Oo.calc(c),Bo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Il(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function xm(i,t){let e=1-i;return e*e*t}function _m(i,t){return 2*(1-i)*i*t}function ym(i,t){return i*i*t}function Es(i,t,e,n){return xm(i,t)+_m(i,e)+ym(i,n)}function vm(i,t){let e=1-i;return e*e*e*t}function Mm(i,t){let e=1-i;return 3*e*e*i*t}function Sm(i,t){return 3*(1-i)*i*i*t}function bm(i,t){return i*i*i*t}function Ts(i,t,e,n,s){return vm(i,t)+Mm(i,e)+Sm(i,n)+bm(i,s)}var kr=class extends cn{constructor(t=new pt,e=new pt,n=new pt,s=new pt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new pt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ts(t,s.x,r.x,o.x,a.x),Ts(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ga=class extends cn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ts(t,s.x,r.x,o.x,a.x),Ts(t,s.y,r.y,o.y,a.y),Ts(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Hr=class extends cn{constructor(t=new pt,e=new pt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new pt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new pt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wa=class extends cn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gr=class extends cn{constructor(t=new pt,e=new pt,n=new pt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new pt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Es(t,s.x,r.x,o.x),Es(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wr=class extends cn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Es(t,s.x,r.x,o.x),Es(t,s.y,r.y,o.y),Es(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xr=class extends cn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new pt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Il(a,c.x,l.x,u.x,d.x),Il(a,c.y,l.y,u.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new pt().fromArray(s))}return this}},qr=Object.freeze({__proto__:null,ArcCurve:Ha,CatmullRomCurve3:Os,CubicBezierCurve:kr,CubicBezierCurve3:Ga,EllipseCurve:Fs,LineCurve:Hr,LineCurve3:Wa,QuadraticBezierCurve:Gr,QuadraticBezierCurve3:Wr,SplineCurve:Xr}),Xa=class extends cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new qr[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new qr[s.type]().fromJSON(s))}return this}},Bs=class extends Xa{constructor(t){super(),this.type="Path",this.currentPoint=new pt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Hr(this.currentPoint.clone(),new pt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Gr(this.currentPoint.clone(),new pt(t,e),new pt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new kr(this.currentPoint.clone(),new pt(t,e),new pt(n,s),new pt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Xr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Fs(t,e,n,s,r,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},zs=class i extends Fe{constructor(t=[new pt(0,-.5),new pt(.5,0),new pt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=we(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],u=1/e,d=new D,h=new pt,f=new D,m=new D,_=new D,g=0,p=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:g=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-g,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:g=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(m)}for(let S=0;S<=e;S++){let v=n+S*u*s,y=Math.sin(v),R=Math.cos(v);for(let T=0;T<=t.length-1;T++){d.x=t[T].x*y,d.y=t[T].y,d.z=t[T].x*R,o.push(d.x,d.y,d.z),h.x=S/e,h.y=T/(t.length-1),a.push(h.x,h.y);let C=c[3*T+0]*y,P=c[3*T+1],E=c[3*T+0]*R;l.push(C,P,E)}}for(let S=0;S<e;S++)for(let v=0;v<t.length-1;v++){let y=v+S*t.length,R=y,T=y+t.length,C=y+t.length+1,P=y+1;r.push(R,T,P),r.push(C,P,T)}this.setIndex(r),this.setAttribute("position",new le(o,3)),this.setAttribute("uv",new le(a,2)),this.setAttribute("normal",new le(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},ln=class i extends zs{constructor(t=1,e=1,n=4,s=8){let r=new Bs;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}};var q=class i extends Fe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],m=0,_=[],g=n/2,p=0;S(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new le(d,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(f,2));function S(){let y=new D,R=new D,T=0,C=(e-t)/n;for(let P=0;P<=r;P++){let E=[],M=P/r,I=M*(e-t)+t;for(let O=0;O<=s;O++){let F=O/s,V=F*c+a,$=Math.sin(V),G=Math.cos(V);R.x=I*$,R.y=-M*n+g,R.z=I*G,d.push(R.x,R.y,R.z),y.set($,C,G).normalize(),h.push(y.x,y.y,y.z),f.push(F,1-M),E.push(m++)}_.push(E)}for(let P=0;P<s;P++)for(let E=0;E<r;E++){let M=_[E][P],I=_[E+1][P],O=_[E+1][P+1],F=_[E][P+1];(t>0||E!==0)&&(u.push(M,I,F),T+=3),(e>0||E!==r-1)&&(u.push(I,O,F),T+=3)}l.addGroup(p,T,0),p+=T}function v(y){let R=m,T=new pt,C=new D,P=0,E=y===!0?t:e,M=y===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,g*M,0),h.push(0,M,0),f.push(.5,.5),m++;let I=m;for(let O=0;O<=s;O++){let V=O/s*c+a,$=Math.cos(V),G=Math.sin(V);C.x=E*G,C.y=g*M,C.z=E*$,d.push(C.x,C.y,C.z),h.push(0,M,0),T.x=$*.5+.5,T.y=G*.5*M+.5,f.push(T.x,T.y),m++}for(let O=0;O<s;O++){let F=R+O,V=I+O;y===!0?u.push(V,V+1,F):u.push(V+1,V,F),P+=3}l.addGroup(p,P,y===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ge=class i extends q{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},qa=class i extends Fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new le(r,3)),this.setAttribute("normal",new le(r.slice(),3)),this.setAttribute("uv",new le(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){let v=new D,y=new D,R=new D;for(let T=0;T<e.length;T+=3)f(e[T+0],v),f(e[T+1],y),f(e[T+2],R),c(v,y,R,S)}function c(S,v,y,R){let T=R+1,C=[];for(let P=0;P<=T;P++){C[P]=[];let E=S.clone().lerp(y,P/T),M=v.clone().lerp(y,P/T),I=T-P;for(let O=0;O<=I;O++)O===0&&P===T?C[P][O]=E:C[P][O]=E.clone().lerp(M,O/I)}for(let P=0;P<T;P++)for(let E=0;E<2*(T-P)-1;E++){let M=Math.floor(E/2);E%2===0?(h(C[P][M+1]),h(C[P+1][M]),h(C[P][M])):(h(C[P][M+1]),h(C[P+1][M+1]),h(C[P+1][M]))}}function l(S){let v=new D;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(S),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function u(){let S=new D;for(let v=0;v<r.length;v+=3){S.x=r[v+0],S.y=r[v+1],S.z=r[v+2];let y=g(S)/2/Math.PI+.5,R=p(S)/Math.PI+.5;o.push(y,1-R)}m(),d()}function d(){for(let S=0;S<o.length;S+=6){let v=o[S+0],y=o[S+2],R=o[S+4],T=Math.max(v,y,R),C=Math.min(v,y,R);T>.9&&C<.1&&(v<.2&&(o[S+0]+=1),y<.2&&(o[S+2]+=1),R<.2&&(o[S+4]+=1))}}function h(S){r.push(S.x,S.y,S.z)}function f(S,v){let y=S*3;v.x=t[y+0],v.y=t[y+1],v.z=t[y+2]}function m(){let S=new D,v=new D,y=new D,R=new D,T=new pt,C=new pt,P=new pt;for(let E=0,M=0;E<r.length;E+=9,M+=6){S.set(r[E+0],r[E+1],r[E+2]),v.set(r[E+3],r[E+4],r[E+5]),y.set(r[E+6],r[E+7],r[E+8]),T.set(o[M+0],o[M+1]),C.set(o[M+2],o[M+3]),P.set(o[M+4],o[M+5]),R.copy(S).add(v).add(y).divideScalar(3);let I=g(R);_(T,M+0,S,I),_(C,M+2,v,I),_(P,M+4,y,I)}}function _(S,v,y,R){R<0&&S.x===1&&(o[v]=S.x-1),y.x===0&&y.z===0&&(o[v]=R/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Si=class extends Bs{constructor(t){super(t),this.uuid=Ti(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Bs().fromJSON(s))}return this}},wm={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=lh(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,u,d,h,f;if(n&&(r=Rm(i,t,r,e)),i.length>80*e){a=l=i[0],c=u=i[1];for(let m=e;m<s;m+=e)d=i[m],h=i[m+1],d<a&&(a=d),h<c&&(c=h),d>l&&(l=d),h>u&&(u=h);f=Math.max(l-a,u-c),f=f!==0?32767/f:0}return Vs(r,o,e,a,c,f,0),o}};function lh(i,t,e,n,s){let r,o;if(s===Vm(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Ll(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Ll(r,i[r],i[r+1],o);return o&&io(o,o.next)&&(Hs(o),o=o.next),o}function bi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(io(e,e.next)||ve(e.prev,e,e.next)===0)){if(Hs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Vs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Um(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Tm(i,n,s,r):Em(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Hs(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Am(bi(i),t,e),Vs(i,t,e,n,s,r,2)):o===2&&Cm(i,t,e,n,s,r):Vs(bi(i),t,e,n,s,r,1);break}}}function Em(i){let t=i.prev,e=i,n=i.next;if(ve(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=s<r?s<o?s:o:r<o?r:o,d=a<c?a<l?a:l:c<l?c:l,h=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,m=n.next;for(;m!==t;){if(m.x>=u&&m.x<=h&&m.y>=d&&m.y<=f&&qi(s,a,r,c,o,l,m.x,m.y)&&ve(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Tm(i,t,e,n){let s=i.prev,r=i,o=i.next;if(ve(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,u=s.y,d=r.y,h=o.y,f=a<c?a<l?a:l:c<l?c:l,m=u<d?u<h?u:h:d<h?d:h,_=a>c?a>l?a:l:c>l?c:l,g=u>d?u>h?u:h:d>h?d:h,p=Ya(f,m,t,e,n),S=Ya(_,g,t,e,n),v=i.prevZ,y=i.nextZ;for(;v&&v.z>=p&&y&&y.z<=S;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&qi(a,u,c,d,l,h,v.x,v.y)&&ve(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&qi(a,u,c,d,l,h,y.x,y.y)&&ve(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&qi(a,u,c,d,l,h,v.x,v.y)&&ve(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=S;){if(y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&qi(a,u,c,d,l,h,y.x,y.y)&&ve(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Am(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!io(s,r)&&hh(s,n,n.next,r)&&ks(s,r)&&ks(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Hs(n),Hs(n.next),n=i=r),n=n.next}while(n!==i);return bi(n)}function Cm(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Om(o,a)){let c=uh(o,a);o=bi(o,o.next),c=bi(c,c.next),Vs(o,t,e,n,s,r,0),Vs(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Rm(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=lh(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Fm(l));for(s.sort(Pm),r=0;r<s.length;r++)e=Im(s[r],e);return e}function Pm(i,t){return i.x-t.x}function Im(i,t){let e=Lm(i,t);if(!e)return t;let n=uh(e,i);return bi(n,n.next),bi(e,e.next)}function Lm(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let h=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=r&&h>n&&(n=h,s=e.x<e.next.x?e:e.next,h===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,u=1/0,d;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&qi(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(d=Math.abs(o-e.y)/(r-e.x),ks(e,i)&&(d<u||d===u&&(e.x>s.x||e.x===s.x&&Dm(s,e)))&&(s=e,u=d)),e=e.next;while(e!==a);return s}function Dm(i,t){return ve(i.prev,i,t.prev)<0&&ve(t.next,i,i.next)<0}function Um(i,t,e,n){let s=i;do s.z===0&&(s.z=Ya(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Nm(s)}function Nm(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function Ya(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Fm(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function qi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Om(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Bm(i,t)&&(ks(i,t)&&ks(t,i)&&zm(i,t)&&(ve(i.prev,i,t.prev)||ve(i,t.prev,t))||io(i,t)&&ve(i.prev,i,i.next)>0&&ve(t.prev,t,t.next)>0)}function ve(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function io(i,t){return i.x===t.x&&i.y===t.y}function hh(i,t,e,n){let s=_r(ve(i,t,e)),r=_r(ve(i,t,n)),o=_r(ve(e,n,i)),a=_r(ve(e,n,t));return!!(s!==r&&o!==a||s===0&&xr(i,e,t)||r===0&&xr(i,n,t)||o===0&&xr(e,i,n)||a===0&&xr(e,t,n))}function xr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function _r(i){return i>0?1:i<0?-1:0}function Bm(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&hh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ks(i,t){return ve(i.prev,i,i.next)<0?ve(i,t,i.next)>=0&&ve(i,i.prev,t)>=0:ve(i,t,i.prev)<0||ve(i,i.next,t)<0}function zm(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function uh(i,t){let e=new $a(i.i,i.x,i.y),n=new $a(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ll(i,t,e,n){let s=new $a(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Hs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function $a(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Vm(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var As=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Dl(t),Ul(n,t);let o=t.length;e.forEach(Dl);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Ul(n,e[c]);let a=wm.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Dl(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ul(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ss=class i extends Fe{constructor(t=new Si([new pt(.5,.5),new pt(-.5,.5),new pt(-.5,-.5),new pt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new le(s,3)),this.setAttribute("uv",new le(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:km,v,y=!1,R,T,C,P;p&&(v=p.getSpacedPoints(u),y=!0,h=!1,R=p.computeFrenetFrames(u,!1),T=new D,C=new D,P=new D),h||(g=0,f=0,m=0,_=0);let E=a.extractPoints(l),M=E.shape,I=E.holes;if(!As.isClockWise(M)){M=M.reverse();for(let j=0,dt=I.length;j<dt;j++){let L=I[j];As.isClockWise(L)&&(I[j]=L.reverse())}}let F=As.triangulateShape(M,I),V=M;for(let j=0,dt=I.length;j<dt;j++){let L=I[j];M=M.concat(L)}function $(j,dt,L){return dt||console.error("THREE.ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(dt,L)}let G=M.length,it=F.length;function X(j,dt,L){let Dt,J,At,mt=j.x-dt.x,Nt=j.y-dt.y,wt=L.x-j.x,A=L.y-j.y,w=mt*mt+Nt*Nt,k=mt*A-Nt*wt;if(Math.abs(k)>Number.EPSILON){let Q=Math.sqrt(w),et=Math.sqrt(wt*wt+A*A),K=dt.x-Nt/Q,Pt=dt.y+mt/Q,xt=L.x-A/et,Et=L.y+wt/et,te=((xt-K)*A-(Et-Pt)*wt)/(mt*A-Nt*wt);Dt=K+mt*te-j.x,J=Pt+Nt*te-j.y;let ht=Dt*Dt+J*J;if(ht<=2)return new pt(Dt,J);At=Math.sqrt(ht/2)}else{let Q=!1;mt>Number.EPSILON?wt>Number.EPSILON&&(Q=!0):mt<-Number.EPSILON?wt<-Number.EPSILON&&(Q=!0):Math.sign(Nt)===Math.sign(A)&&(Q=!0),Q?(Dt=-Nt,J=mt,At=Math.sqrt(w)):(Dt=mt,J=Nt,At=Math.sqrt(w/2))}return new pt(Dt/At,J/At)}let st=[];for(let j=0,dt=V.length,L=dt-1,Dt=j+1;j<dt;j++,L++,Dt++)L===dt&&(L=0),Dt===dt&&(Dt=0),st[j]=X(V[j],V[L],V[Dt]);let ft=[],yt,zt=st.concat();for(let j=0,dt=I.length;j<dt;j++){let L=I[j];yt=[];for(let Dt=0,J=L.length,At=J-1,mt=Dt+1;Dt<J;Dt++,At++,mt++)At===J&&(At=0),mt===J&&(mt=0),yt[Dt]=X(L[Dt],L[At],L[mt]);ft.push(yt),zt=zt.concat(yt)}for(let j=0;j<g;j++){let dt=j/g,L=f*Math.cos(dt*Math.PI/2),Dt=m*Math.sin(dt*Math.PI/2)+_;for(let J=0,At=V.length;J<At;J++){let mt=$(V[J],st[J],Dt);lt(mt.x,mt.y,-L)}for(let J=0,At=I.length;J<At;J++){let mt=I[J];yt=ft[J];for(let Nt=0,wt=mt.length;Nt<wt;Nt++){let A=$(mt[Nt],yt[Nt],Dt);lt(A.x,A.y,-L)}}}let $t=m+_;for(let j=0;j<G;j++){let dt=h?$(M[j],zt[j],$t):M[j];y?(C.copy(R.normals[0]).multiplyScalar(dt.x),T.copy(R.binormals[0]).multiplyScalar(dt.y),P.copy(v[0]).add(C).add(T),lt(P.x,P.y,P.z)):lt(dt.x,dt.y,0)}for(let j=1;j<=u;j++)for(let dt=0;dt<G;dt++){let L=h?$(M[dt],zt[dt],$t):M[dt];y?(C.copy(R.normals[j]).multiplyScalar(L.x),T.copy(R.binormals[j]).multiplyScalar(L.y),P.copy(v[j]).add(C).add(T),lt(P.x,P.y,P.z)):lt(L.x,L.y,d/u*j)}for(let j=g-1;j>=0;j--){let dt=j/g,L=f*Math.cos(dt*Math.PI/2),Dt=m*Math.sin(dt*Math.PI/2)+_;for(let J=0,At=V.length;J<At;J++){let mt=$(V[J],st[J],Dt);lt(mt.x,mt.y,d+L)}for(let J=0,At=I.length;J<At;J++){let mt=I[J];yt=ft[J];for(let Nt=0,wt=mt.length;Nt<wt;Nt++){let A=$(mt[Nt],yt[Nt],Dt);y?lt(A.x,A.y+v[u-1].y,v[u-1].x+L):lt(A.x,A.y,d+L)}}}Z(),at();function Z(){let j=s.length/3;if(h){let dt=0,L=G*dt;for(let Dt=0;Dt<it;Dt++){let J=F[Dt];Lt(J[2]+L,J[1]+L,J[0]+L)}dt=u+g*2,L=G*dt;for(let Dt=0;Dt<it;Dt++){let J=F[Dt];Lt(J[0]+L,J[1]+L,J[2]+L)}}else{for(let dt=0;dt<it;dt++){let L=F[dt];Lt(L[2],L[1],L[0])}for(let dt=0;dt<it;dt++){let L=F[dt];Lt(L[0]+G*u,L[1]+G*u,L[2]+G*u)}}n.addGroup(j,s.length/3-j,0)}function at(){let j=s.length/3,dt=0;Tt(V,dt),dt+=V.length;for(let L=0,Dt=I.length;L<Dt;L++){let J=I[L];Tt(J,dt),dt+=J.length}n.addGroup(j,s.length/3-j,1)}function Tt(j,dt){let L=j.length;for(;--L>=0;){let Dt=L,J=L-1;J<0&&(J=j.length-1);for(let At=0,mt=u+g*2;At<mt;At++){let Nt=G*At,wt=G*(At+1),A=dt+Dt+Nt,w=dt+J+Nt,k=dt+J+wt,Q=dt+Dt+wt;Vt(A,w,k,Q)}}}function lt(j,dt,L){c.push(j),c.push(dt),c.push(L)}function Lt(j,dt,L){Ut(j),Ut(dt),Ut(L);let Dt=s.length/3,J=S.generateTopUV(n,s,Dt-3,Dt-2,Dt-1);Zt(J[0]),Zt(J[1]),Zt(J[2])}function Vt(j,dt,L,Dt){Ut(j),Ut(dt),Ut(Dt),Ut(dt),Ut(L),Ut(Dt);let J=s.length/3,At=S.generateSideWallUV(n,s,J-6,J-3,J-2,J-1);Zt(At[0]),Zt(At[1]),Zt(At[3]),Zt(At[1]),Zt(At[2]),Zt(At[3])}function Ut(j){s.push(c[j*3+0]),s.push(c[j*3+1]),s.push(c[j*3+2])}function Zt(j){r.push(j.x),r.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Hm(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new qr[s.type]().fromJSON(s)),new i(n,t.options)}},km={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],u=t[s*3+1];return[new pt(r,o),new pt(a,c),new pt(l,u)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],u=t[n*3+1],d=t[n*3+2],h=t[s*3],f=t[s*3+1],m=t[s*3+2],_=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new pt(o,1-c),new pt(l,1-d),new pt(h,1-m),new pt(_,1-p)]:[new pt(a,1-c),new pt(u,1-d),new pt(f,1-m),new pt(g,1-p)]}};function Hm(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Wn=class i extends qa{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var ot=class i extends Fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new D,h=new D,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let S=[],v=p/n,y=0;p===0&&o===0?y=.5/e:p===n&&c===Math.PI&&(y=-.5/e);for(let R=0;R<=e;R++){let T=R/e;d.x=-t*Math.cos(s+T*r)*Math.sin(o+v*a),d.y=t*Math.cos(o+v*a),d.z=t*Math.sin(s+T*r)*Math.sin(o+v*a),m.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),g.push(T+y,1-v),S.push(l++)}u.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){let v=u[p][S+1],y=u[p][S],R=u[p+1][S],T=u[p+1][S+1];(p!==0||o>0)&&f.push(v,y,T),(p!==n-1||c<Math.PI)&&f.push(y,R,T)}this.setIndex(f),this.setAttribute("position",new le(m,3)),this.setAttribute("normal",new le(_,3)),this.setAttribute("uv",new le(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Wt=class i extends Fe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],u=new D,d=new D,h=new D;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){let _=m/s*r,g=f/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(_),d.y=(t+e*Math.cos(g))*Math.sin(_),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),h.subVectors(d,u).normalize(),c.push(h.x,h.y,h.z),l.push(m/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){let _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,S=(s+1)*f+m;o.push(_,g,S),o.push(g,p,S)}this.setIndex(o),this.setAttribute("position",new le(a,3)),this.setAttribute("normal",new le(c,3)),this.setAttribute("uv",new le(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Yr=class i extends Fe{constructor(t=new Wr(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new D,c=new D,l=new pt,u=new D,d=[],h=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new le(d,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(f,2));function _(){for(let v=0;v<e;v++)g(v);g(r===!1?e:0),S(),p()}function g(v){u=t.getPointAt(v/e,u);let y=o.normals[v],R=o.binormals[v];for(let T=0;T<=s;T++){let C=T/s*Math.PI*2,P=Math.sin(C),E=-Math.cos(C);c.x=E*y.x+P*R.x,c.y=E*y.y+P*R.y,c.z=E*y.z+P*R.z,c.normalize(),h.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,d.push(a.x,a.y,a.z)}}function p(){for(let v=1;v<=e;v++)for(let y=1;y<=s;y++){let R=(s+1)*(v-1)+(y-1),T=(s+1)*v+(y-1),C=(s+1)*v+y,P=(s+1)*(v-1)+y;m.push(R,T,P),m.push(T,C,P)}}function S(){for(let v=0;v<=e;v++)for(let y=0;y<=s;y++)l.x=v/e,l.y=y/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new qr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var nn=class extends ri{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jl,this.normalScale=new pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},yn=class extends nn{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return we(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ht(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ht(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ht(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function yr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Gm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var rs=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Za=class extends rs{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Lc,endingEnd:Lc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Dc:r=t,a=2*e-n;break;case Uc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Dc:o=t,c=2*n-e;break;case Uc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),_=m*m,g=_*m,p=-h*g+2*h*_-h*m,S=(1+h)*g+(-1.5-2*h)*_+(-.5+h)*m+1,v=(-1-f)*g+(1.5+f)*_+.5*m,y=f*g-f*_;for(let R=0;R!==a;++R)r[R]=p*o[u+R]+S*o[l+R]+v*o[c+R]+y*o[d+R];return r}},Ja=class extends rs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(s-e),d=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*d+o[c+h]*u;return r}},Ka=class extends rs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},vn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=yr(e,this.TimeBufferType),this.values=yr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:yr(t.times,Array),values:yr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ka(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ja(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Za(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Er:e=this.InterpolantFactoryMethodDiscrete;break;case wa:e=this.InterpolantFactoryMethodLinear;break;case co:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Er;case this.InterpolantFactoryMethodLinear:return wa;case this.InterpolantFactoryMethodSmooth:return co}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Gm(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===co,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{let d=a*n,h=d-n,f=d+n;for(let m=0;m!==n;++m){let _=e[d+m];if(_!==e[h+m]||_!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,h=o*n;for(let f=0;f!==n;++f)e[h+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};vn.prototype.TimeBufferType=Float32Array;vn.prototype.ValueBufferType=Float32Array;vn.prototype.DefaultInterpolation=wa;var wi=class extends vn{constructor(t,e,n){super(t,e,n)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=Er;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Qa=class extends vn{};Qa.prototype.ValueTypeName="color";var ja=class extends vn{};ja.prototype.ValueTypeName="number";var tc=class extends rs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let u=l+a;l!==u;l+=4)si.slerpFlat(r,0,o,l-a,o,l,c);return r}},$r=class extends vn{InterpolantFactoryMethodLinear(t){return new tc(this.times,this.values,this.getValueSize(),t)}};$r.prototype.ValueTypeName="quaternion";$r.prototype.InterpolantFactoryMethodSmooth=void 0;var Ei=class extends vn{constructor(t,e,n){super(t,e,n)}};Ei.prototype.ValueTypeName="string";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=Er;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var ec=class extends vn{};ec.prototype.ValueTypeName="vector";var nc=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let f=l[d],m=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null}}},Wm=new nc,ic=class{constructor(t){this.manager=t!==void 0?t:Wm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};ic.DEFAULT_MATERIAL_NAME="__DEFAULT";var os=class extends He{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Zr=class extends os{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},zo=new xe,Nl=new D,Fl=new D,Jr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pt(512,512),this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ds,this._frameExtents=new pt(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Nl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nl),Fl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Fl),e.updateMatrixWorld(),zo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(zo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Ol=new xe,ys=new D,Vo=new D,sc=class extends Jr{constructor(){super(new Ve(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new pt(4,2),this._viewportCount=6,this._viewports=[new de(2,1,1,1),new de(0,1,1,1),new de(3,1,1,1),new de(1,1,1,1),new de(3,0,1,1),new de(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ys.setFromMatrixPosition(t.matrixWorld),n.position.copy(ys),Vo.copy(n.position),Vo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Vo),n.updateMatrixWorld(),s.makeTranslation(-ys.x,-ys.y,-ys.z),Ol.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ol)}},Kr=class extends os{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new sc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},rc=class extends Jr{constructor(){super(new Ur(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},as=class extends os{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.target=new He,this.shadow=new rc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Qr=class extends os{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var vc="\\[\\]\\.:\\/",Xm=new RegExp("["+vc+"]","g"),Mc="[^"+vc+"]",qm="[^"+vc.replace("\\.","")+"]",Ym=/((?:WC+[\/:])*)/.source.replace("WC",Mc),$m=/(WCOD+)?/.source.replace("WCOD",qm),Zm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mc),Jm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mc),Km=new RegExp("^"+Ym+$m+Zm+Jm+"$"),Qm=["material","materials","bones","map"],oc=class{constructor(t,e,n){let s=n||ye.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ye=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Xm,"")}static parseTrackName(t){let e=Km.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Qm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ye.Composite=oc;ye.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ye.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ye.prototype.GetterByBindingType=[ye.prototype._getValue_direct,ye.prototype._getValue_array,ye.prototype._getValue_arrayElement,ye.prototype._getValue_toArray];ye.prototype.SetterByBindingTypeAndVersioning=[[ye.prototype._setValue_direct,ye.prototype._setValue_direct_setNeedsUpdate,ye.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_array,ye.prototype._setValue_array_setNeedsUpdate,ye.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_arrayElement,ye.prototype._setValue_arrayElement_setNeedsUpdate,ye.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_fromArray,ye.prototype._setValue_fromArray_setNeedsUpdate,ye.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Pg=new Float32Array(1);var Bl=new xe,jr=class{constructor(t,e,n=0,s=1/0){this.ray=new Is(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ls,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Bl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bl),this}intersectObject(t,e=!0,n=[]){return ac(t,this,n,e),n.sort(zl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ac(t[s],this,n,e);return n.sort(zl),n}};function zl(i,t){return i.distance-t.distance}function ac(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)ac(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:cc}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=cc);var hn='"Noto Sans HK", "PingFang HK", "Microsoft JhengHei", sans-serif',ai='"Gluten", "Trebuchet MS", "Arial Rounded MT Bold", sans-serif';function pe(i,t,e){let n=document.createElement("canvas");n.width=i,n.height=t;let s=n.getContext("2d");e(s,i,t);let r=new Ns(n);return r.colorSpace=ze,r.needsUpdate=!0,r}function Sc(i,t,e){let n=document.createElement("canvas");n.width=i,n.height=t;let s=n.getContext("2d");e(s,i,t);let r=new Ns(n);return r.needsUpdate=!0,r}function Ai(i){let t=i>>>0;return()=>(t=Math.imul(1664525,t)+1013904223>>>0,t/4294967296)}function jm(){let i=new Map,t={clayBump(){let e=Sc(256,256,(n,s,r)=>{let o=Ai(1337);n.fillStyle="#808080",n.fillRect(0,0,s,r);for(let a=0;a<160;a++){let c=o()*s,l=o()*r,u=Math.floor(118+o()*20);n.strokeStyle=`rgba(${u},${u},${u},0.22)`,n.lineWidth=1.5+o()*3,n.beginPath(),n.moveTo(c,l),n.quadraticCurveTo(c+(o()-.5)*28,l+(o()-.5)*16,c+(o()-.5)*40,l+(o()-.5)*24),n.stroke()}for(let a=0;a<820;a++){let c=o()*s,l=o()*r,u=1.2+o()*4.8,d=Math.floor(108+o()*42);n.fillStyle=`rgba(${d},${d},${d},0.3)`,n.beginPath(),n.arc(c,l,u,0,Math.PI*2),n.fill()}});return e.wrapS=e.wrapT=tn,e.repeat.set(2,2),e},clayRough(){let e=Sc(256,256,(n,s,r)=>{let o=Ai(2026);n.fillStyle="#dcdcdc",n.fillRect(0,0,s,r);for(let a=0;a<480;a++){let c=Math.floor(196+o()*54);n.fillStyle=`rgba(${c},${c},${c},0.26)`,n.beginPath(),n.arc(o()*s,o()*r,4+o()*14,0,Math.PI*2),n.fill()}});return e.wrapS=e.wrapT=tn,e.repeat.set(2,2),e},metalBrush(){let e=Sc(256,256,(n,s,r)=>{let o=Ai(909);n.fillStyle="#c8c8c8",n.fillRect(0,0,s,r);for(let a=0;a<r;a+=2){let c=Math.floor(170+o()*72);n.fillStyle=`rgba(${c},${c},${c},0.35)`,n.fillRect(0,a,s,1+o()*1.4)}});return e.wrapS=e.wrapT=tn,e.repeat.set(2,2),e},woodPlank(){let e=pe(512,512,(n,s,r)=>{let o=Ai(42),a=6,c=r/a,l=["#d49f64","#c78e52","#daa86f","#c3894e","#d19b60","#ce965a"];for(let u=0;u<a;u++){let d=u*c,h=n.createLinearGradient(0,d,s,d+c);h.addColorStop(0,l[u%l.length]),h.addColorStop(.55,l[(u+2)%l.length]),h.addColorStop(1,l[(u+4)%l.length]),n.fillStyle=h,n.fillRect(0,d,s,c);for(let g=0;g<22;g++){let p=d+4+o()*(c-8);n.strokeStyle=o()>.45?"rgba(102,58,22,0.18)":"rgba(255,238,204,0.16)",n.lineWidth=1.2+o()*2.2,n.beginPath(),n.moveTo(0,p),n.bezierCurveTo(s*.33,p+(o()-.5)*9,s*.66,p+(o()-.5)*9,s,p),n.stroke()}let f=(u*157+90)%(s-110)+55,m=d+c*(.35+u%3*.14);n.strokeStyle="rgba(96,52,20,0.2)",n.lineWidth=2,n.beginPath(),n.ellipse(f,m,18,6,0,0,Math.PI*2),n.stroke(),n.fillStyle="rgba(68,36,14,0.48)",n.fillRect(0,d,s,4),n.fillStyle="rgba(255,244,218,0.26)",n.fillRect(0,d+4,s,2.5);let _=(u*149+86)%(s-84)+42;n.fillStyle="rgba(68,36,14,0.38)",n.fillRect(_,d,3.5,c);for(let g of[_-13,_+16])for(let p of[d+18,d+c-18])n.fillStyle="#5c3b1e",n.beginPath(),n.arc(g,p,4.6,0,Math.PI*2),n.fill(),n.fillStyle="#e8c474",n.beginPath(),n.arc(g-.8,p-.8,2.6,0,Math.PI*2),n.fill(),n.fillStyle="#fff6cf",n.beginPath(),n.arc(g-1.5,p-1.5,1.1,0,Math.PI*2),n.fill()}});return e.wrapS=e.wrapT=tn,e.repeat.set(2,2),e},stoneWall(){let e=pe(512,256,(n,s,r)=>{let o=Ai(88);n.fillStyle="#a59f93",n.fillRect(0,0,s,r);let a=4,c=r/a,l=["#d3ccc0","#c7c0b3","#dcd5c9","#bfb8ab","#cec7ba"];for(let u=0;u<a;u++){let d=u*c,h=u%2*-56;for(;h<s;){let f=88+Math.floor(o()*48);n.fillStyle=l[Math.floor(o()*l.length)],n.fillRect(h+4,d+4,f-8,c-8);for(let m=0;m<16;m++)n.fillStyle=m%2?"rgba(80,75,68,0.16)":"rgba(255,252,246,0.22)",n.fillRect(h+8+o()*(f-18),d+8+o()*(c-18),3,2);n.fillStyle="rgba(255,252,244,0.28)",n.fillRect(h+4,d+4,f-8,5),n.fillStyle="rgba(62,58,52,0.25)",n.fillRect(h+4,d+c-9,f-8,5),h+=f}}});return e.wrapS=e.wrapT=tn,e.repeat.set(4,1),e},pineappleCrust(){return pe(512,512,(e,n,s)=>{let r=e.createRadialGradient(n*.48,s*.42,28,n*.5,s*.5,n*.62);r.addColorStop(0,"#ffe48c"),r.addColorStop(.58,"#f3ae3c"),r.addColorStop(1,"#c76e1c"),e.fillStyle=r,e.fillRect(0,0,n,s);let o=64;e.strokeStyle="#8f420c",e.lineWidth=9;for(let c=-s;c<n+s;c+=o)e.beginPath(),e.moveTo(c,0),e.lineTo(c+s,s),e.stroke(),e.beginPath(),e.moveTo(c,s),e.lineTo(c+s,0),e.stroke();e.strokeStyle="rgba(255,248,210,0.6)",e.lineWidth=3.5;for(let c=-s+7;c<n+s;c+=o)e.beginPath(),e.moveTo(c,0),e.lineTo(c+s,s),e.stroke(),e.beginPath(),e.moveTo(c,s),e.lineTo(c+s,0),e.stroke();let a=Ai(777);for(let c=0;c<140;c++)e.fillStyle="rgba(255,252,224,0.45)",e.beginPath(),e.arc(a()*n,a()*s,1.4+a()*1.8,0,Math.PI*2),e.fill()})},riceSack(){return pe(512,512,(e,n,s)=>{e.fillStyle="#f4e5c8",e.fillRect(0,0,n,s);for(let r=0;r<n;r+=10)e.strokeStyle=r%20===0?"rgba(160,126,82,0.22)":"rgba(255,250,238,0.24)",e.lineWidth=3,e.beginPath(),e.moveTo(r,0),e.lineTo(r,s),e.stroke(),e.beginPath(),e.moveTo(0,r),e.lineTo(n,r),e.stroke();e.fillStyle="#c9352b",e.fillRect(0,48,n,20),e.fillRect(0,s-68,n,20),e.fillStyle="#2b7c6e",e.fillRect(0,74,n,6),e.fillRect(0,s-78,n,6),e.save(),e.translate(n/2,s/2+4),e.fillStyle="#fff9ed",e.strokeStyle="#c9352b",e.lineWidth=14,e.beginPath(),e.moveTo(0,-134),e.lineTo(134,0),e.lineTo(0,134),e.lineTo(-134,0),e.closePath(),e.fill(),e.stroke(),e.strokeStyle="#e09c2b",e.lineWidth=4.5,e.beginPath(),e.moveTo(0,-110),e.lineTo(110,0),e.lineTo(0,110),e.lineTo(-110,0),e.closePath(),e.stroke(),e.fillStyle="#b8241d",e.font=`900 142px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u7C73",0,8),e.restore()})},checkerTile(){let e=pe(256,256,(n,s,r)=>{for(let a=0;a<r;a+=64)for(let c=0;c<s;c+=64){let l=(c/64+a/64)%2===0;n.fillStyle=l?"#1d8b79":"#fff7e5",n.fillRect(c,a,64,64),n.fillStyle="rgba(255,255,255,0.28)",n.fillRect(c+3,a+3,58,4),n.fillRect(c+3,a+3,4,58),n.strokeStyle="rgba(38,52,48,0.22)",n.lineWidth=3,n.strokeRect(c+1.5,a+1.5,61,61)}});return e.wrapS=e.wrapT=tn,e.repeat.set(3,1.5),e},stripeRed(){let e=pe(256,128,(n,s,r)=>{let a=s/8;for(let c=0;c<8;c++)n.fillStyle=c%2===0?"#df443a":"#fff8eb",n.fillRect(c*a,0,a,r);n.fillStyle="rgba(255,255,255,0.12)";for(let c=0;c<r;c+=6)n.fillRect(0,c,s,2);n.fillStyle="#ffd15c",n.fillRect(0,r-14,s,14),n.strokeStyle="#b83028",n.lineWidth=2,n.setLineDash([6,4]),n.beginPath(),n.moveTo(0,r-17),n.lineTo(s,r-17),n.stroke()});return e.wrapS=e.wrapT=tn,e},stripeCoral(){let e=pe(256,128,(n,s,r)=>{let a=s/8;for(let c=0;c<8;c++)n.fillStyle=c%2===0?"#ff6b4a":"#fff8eb",n.fillRect(c*a,0,a,r);n.fillStyle="rgba(255,255,255,0.12)";for(let c=0;c<r;c+=6)n.fillRect(0,c,s,2);n.fillStyle="#14968b",n.fillRect(0,r-15,s,15)});return e.wrapS=e.wrapT=tn,e},brick(){let e=pe(512,512,(n,s,r)=>{let o=Ai(450);n.fillStyle="#ddd1be",n.fillRect(0,0,s,r);let a=10,c=r/a,l=84,u=["#b84136","#c44b3e","#a9392f","#cc5545","#b23e33"];for(let d=0;d<a;d++){let h=d*c,f=d%2*(-l*.5);for(;f<s;)n.fillStyle=u[Math.floor(o()*u.length)],n.fillRect(f+4,h+4,l-8,c-8),n.fillStyle="rgba(255,224,196,0.2)",n.fillRect(f+4,h+4,l-8,5),n.fillStyle="rgba(70,22,18,0.2)",n.fillRect(f+4,h+c-9,l-8,5),f+=l}});return e.wrapS=e.wrapT=tn,e.repeat.set(1.5,2.5),e},clockFace(){return pe(512,512,(e,n,s)=>{let r=n/2,o=s/2,a=n*.45,c=e.createRadialGradient(r,o-30,24,r,o,a+12);c.addColorStop(0,"#fffdf6"),c.addColorStop(.85,"#fff4db"),c.addColorStop(1,"#e8d8b6"),e.fillStyle=c,e.beginPath(),e.arc(r,o,a+12,0,Math.PI*2),e.fill(),e.strokeStyle="#3a2e28",e.lineWidth=14,e.beginPath(),e.arc(r,o,a,0,Math.PI*2),e.stroke(),e.strokeStyle="#c89b3c",e.lineWidth=6,e.beginPath(),e.arc(r,o,a-20,0,Math.PI*2),e.stroke();let l=["XII","I","II","III","IV","V","VI","VII","VIII","IX","X","XI"];e.fillStyle="#222430",e.textAlign="center",e.textBaseline="middle";for(let u=0;u<12;u++){let d=u*Math.PI/6-Math.PI/2;e.strokeStyle="#222430",e.lineWidth=u%3===0?10:5,e.beginPath(),e.moveTo(r+Math.cos(d)*(a-24),o+Math.sin(d)*(a-24)),e.lineTo(r+Math.cos(d)*(a-48),o+Math.sin(d)*(a-48)),e.stroke(),e.font=u%3===0?"bold 46px Georgia, serif":"bold 32px Georgia, serif",e.fillText(l[u],r+Math.cos(d)*(a-80),o+Math.sin(d)*(a-80))}e.strokeStyle="#1b1d28",e.lineCap="round",e.lineWidth=18,e.beginPath(),e.moveTo(r,o),e.lineTo(r-84,o-68),e.stroke(),e.lineWidth=12,e.beginPath(),e.moveTo(r,o),e.lineTo(r+116,o-88),e.stroke(),e.fillStyle="#d9a426",e.beginPath(),e.arc(r,o,20,0,Math.PI*2),e.fill()})},badge18222(){return pe(512,288,(e,n,s)=>{let r=e.createLinearGradient(0,0,0,s);r.addColorStop(0,"#233368"),r.addColorStop(1,"#141e42"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#ffd45c",e.lineWidth=14,e.strokeRect(14,14,n-28,s-28),e.fillStyle="#ff5c4a",e.fillRect(26,26,n-52,68),e.fillStyle="#fff9ec",e.font=`900 42px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u9632\u9A19\u6613 ANTI-SCAM",n/2,62),e.fillStyle="#ffe470",e.font=`900 124px ${ai}`,e.fillText("18222",n/2,190)})},neonSign(){return pe(512,288,(e,n,s)=>{e.fillStyle="#171c36",e.fillRect(0,0,n,s),e.shadowColor="#38f3dc",e.shadowBlur=26,e.strokeStyle="#5cffea",e.lineWidth=13,e.strokeRect(18,18,n-36,s-36),e.shadowColor="#ff5fa8",e.shadowBlur=28,e.strokeStyle="#ff7eb8",e.lineWidth=6,e.strokeRect(38,38,n-76,s-76),e.fillStyle="#ff8ac0",e.font=`900 112px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u8336\u9910\u5EF3",n/2,132),e.shadowColor="#ffe26a",e.shadowBlur=16,e.fillStyle="#ffeb8e",e.font=`800 34px ${ai}`,e.fillText("CHA CHAAN TENG",n/2,224)})},chalkboard(){return pe(512,384,(e,n,s)=>{e.fillStyle="#22342e",e.fillRect(0,0,n,s),e.strokeStyle="#b87c42",e.lineWidth=26,e.strokeRect(13,13,n-26,s-26),e.strokeStyle="rgba(255,232,175,0.3)",e.lineWidth=4,e.strokeRect(36,36,n-72,s-72),e.fillStyle="#ffe588",e.font=`900 66px ${hn}`,e.textAlign="center",e.fillText("\u65B0\u9BAE\u51FA\u7210",n/2,114),e.fillStyle="#fff8eb",e.font=`700 58px ${hn}`,e.fillText("\u83E0\u863F\u5305 $8",n/2,212),e.fillStyle="#ffc09c",e.font=`700 50px ${hn}`,e.fillText("\u6E2F\u5F0F\u5976\u8336 $16",n/2,296)})},kioskScreen(){return pe(512,384,(e,n,s)=>{let r=e.createLinearGradient(0,0,0,s);r.addColorStop(0,"#125862"),r.addColorStop(1,"#0b323e"),e.fillStyle=r,e.fillRect(0,0,n,s),e.fillStyle="#3bf0c8",e.font=`800 40px ${hn}`,e.textAlign="center",e.fillText("\u516B\u9054\u901A \xB7 \u5132\u84C4\u9918\u984D",n/2,68),e.fillStyle="#fff7d2",e.font=`900 84px ${ai}`,e.fillText("HK$1,888",n/2,170),[52,80,104,128,156].forEach((a,c)=>{e.fillStyle=c===4?"#ffd552":"#34e2bc",e.fillRect(76+c*76,344-a*.72,48,a*.72)})})},shopBanner(){return pe(512,192,(e,n,s)=>{let r=e.createLinearGradient(0,0,0,s);r.addColorStop(0,"#1b5953"),r.addColorStop(1,"#12403c"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#f4c652",e.lineWidth=10,e.strokeRect(12,12,n-24,s-24),e.fillStyle="#ffe99a",e.font=`900 76px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u6D77\u508D\u5C0F\u5929\u5730",n/2,76),e.fillStyle="#fff7e8",e.font=`800 32px ${ai}`,e.fillText("HARBOUR KEEP \xB7 1/F",n/2,144)})},pierPlaque(){return pe(512,160,(e,n,s)=>{let r=e.createLinearGradient(0,0,n,s);r.addColorStop(0,"#f7d262"),r.addColorStop(.5,"#d89c2e"),r.addColorStop(1,"#f4cb58"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#6c4814",e.lineWidth=10,e.strokeRect(12,12,n-24,s-24),e.strokeStyle="rgba(255,248,210,0.65)",e.lineWidth=3,e.strokeRect(20,20,n-40,s-40),e.fillStyle="#2b1d0c",e.font=`900 56px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u6D77\u508D\u5C0F\u5929\u5730",n/2,62),e.font=`800 26px ${ai}`,e.fillText("VICTORIA HARBOUR KEEP",n/2,118)})},passbook(){return pe(256,384,(e,n,s)=>{e.fillStyle="#14968b",e.fillRect(0,0,n,s),e.fillStyle="#fff7e6",e.fillRect(0,88,n,52),e.fillStyle="#ffd354",e.fillRect(0,140,n,14),e.fillStyle="#134d48",e.font=`900 40px ${hn}`,e.textAlign="center",e.fillText("\u5132\u84C4\u5B58\u647A",n/2,126),e.fillStyle="#fff6e5",e.font=`800 32px ${ai}`,e.fillText("SAVINGS",n/2,256)})},calcScreen(){return pe(256,340,(e,n,s)=>{e.fillStyle="#eee5d4",e.fillRect(0,0,n,s),e.fillStyle="#a8cdb0",e.fillRect(22,24,n-44,82),e.strokeStyle="#485a4e",e.lineWidth=6,e.strokeRect(22,24,n-44,82),e.fillStyle="#1b3324",e.font="bold 38px monospace",e.textAlign="right",e.fillText("APR 0%",n-34,78);for(let r=0;r<4;r++)for(let o=0;o<4;o++){e.fillStyle=o===3?"#f47e54":r===0?"#14968b":"#3a4556";let a=24+o*53,c=128+r*48;e.fillRect(a,c,44,38),e.fillStyle="rgba(255,255,255,0.28)",e.fillRect(a,c,44,7)}})},tramSign(){return pe(512,192,(e,n,s)=>{e.fillStyle="#145435",e.fillRect(0,0,n,s),e.fillStyle="#fff5dc",e.fillRect(16,18,n-32,s-36),e.strokeStyle="#d9a226",e.lineWidth=8,e.strokeRect(24,26,n-48,s-52),e.fillStyle="#11442b",e.font=`900 62px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u5805\u5C3C\u5730\u57CE \xB7 \u53EE\u53EE",n/2,78),e.font=`800 30px ${ai}`,e.fillText("HK TRAMWAYS \xB7 DAY 30",n/2,136)})},laisee(){return pe(256,320,(e,n,s)=>{let r=e.createLinearGradient(0,0,n,s);r.addColorStop(0,"#e3312c"),r.addColorStop(1,"#bc1f1f"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#ffd552",e.lineWidth=10,e.strokeRect(18,18,n-36,s-36),e.fillStyle="#ffd552",e.beginPath(),e.arc(n/2,s/2,68,0,Math.PI*2),e.fill(),e.fillStyle="#b81d1d",e.font=`900 68px ${hn}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u5927\u5409",n/2,s/2+4)})},coinFace(){return pe(256,256,(e,n,s)=>{let r=n/2,o=s/2,a=e.createRadialGradient(r-24,o-24,16,r,o,120);a.addColorStop(0,"#fff4a8"),a.addColorStop(.58,"#f7be34"),a.addColorStop(1,"#c27c0e"),e.fillStyle=a,e.fillRect(0,0,n,s),e.strokeStyle="#fff6be",e.lineWidth=9,e.beginPath(),e.arc(r,o,102,0,Math.PI*2),e.stroke(),e.strokeStyle="#a8680a",e.lineWidth=3,e.beginPath(),e.arc(r,o,88,0,Math.PI*2),e.stroke(),e.fillStyle="#ffe984";for(let c=0;c<5;c++){let l=c*Math.PI*2/5-Math.PI/2;e.save(),e.translate(r+Math.cos(l)*36,o+Math.sin(l)*36),e.rotate(l),e.beginPath(),e.ellipse(0,0,28,14,0,0,Math.PI*2),e.fill(),e.restore()}e.fillStyle="#b3730e",e.beginPath(),e.arc(r,o,15,0,Math.PI*2),e.fill()})},waterRipple(){return pe(256,256,(n,s,r)=>{n.clearRect(0,0,s,r);let o=s/2,a=r/2;for(let c=1;c<=5;c++){let l=22+c*21;n.strokeStyle=`rgba(230,252,255,${.28-c*.035})`,n.lineWidth=c===1?5:3,n.setLineDash([28,16,14,18]),n.beginPath(),n.arc(o,a,l,c*.4,Math.PI*2+c*.4),n.stroke()}})},shadowDisc(){return pe(128,128,(e,n,s)=>{let r=n/2,o=s/2,a=e.createRadialGradient(r,o,6,r,o,n*.48);a.addColorStop(0,"rgba(22,30,52,0.58)"),a.addColorStop(.55,"rgba(22,30,52,0.24)"),a.addColorStop(1,"rgba(22,30,52,0)"),e.fillStyle=a,e.fillRect(0,0,n,s)})},coasterDial(){return pe(512,512,(e,n,s)=>{let r=n/2,o=s/2,a=e.createRadialGradient(r-24,o-28,22,r,o,n*.5);a.addColorStop(0,"#ebd1a8"),a.addColorStop(.55,"#c59056"),a.addColorStop(.86,"#96602e"),a.addColorStop(1,"#6f411a"),e.fillStyle=a,e.fillRect(0,0,n,s),e.strokeStyle="rgba(86,46,16,0.16)",e.lineWidth=3;for(let c=34;c<240;c+=20)e.beginPath(),e.arc(r,o,c,0,Math.PI*2),e.stroke();e.strokeStyle="#f4d272",e.lineWidth=7,e.beginPath(),e.arc(r,o,214,0,Math.PI*2),e.stroke(),e.lineWidth=3.5,e.beginPath(),e.arc(r,o,192,0,Math.PI*2),e.stroke();for(let c=0;c<36;c++){let l=c*Math.PI*2/36,u=c%9===0,d=c%3===0,h=u?168:d?176:184;e.lineWidth=u?6:d?3.5:2,e.beginPath(),e.moveTo(r+Math.cos(l)*h,o+Math.sin(l)*h),e.lineTo(r+Math.cos(l)*208,o+Math.sin(l)*208),e.stroke()}e.strokeStyle="rgba(255,244,212,0.34)",e.lineWidth=3,e.beginPath(),e.arc(r,o,126,0,Math.PI*2),e.stroke()})},trophy100(){return pe(512,192,(e,n,s)=>{let r=e.createLinearGradient(0,0,n,s);r.addColorStop(0,"#f5c442"),r.addColorStop(.5,"#cf8f1a"),r.addColorStop(1,"#f2bf3c"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#fff5b8",e.lineWidth=10,e.strokeRect(14,14,n-28,s-28),e.fillStyle="#3a2204",e.font=`900 84px ${ai}`,e.textAlign="center",e.textBaseline="middle",e.fillText("100 DAYS",n/2,s/2+4)})}};return{get(e){if(!i.has(e)){let n=t[e];if(!n)throw new Error("Unknown texture: "+e);i.set(e,n())}return i.get(e)},dispose(){for(let e of i.values())e.dispose();i.clear()}}}function so(i="day"){let t={day:["#ffffff","#d8f4ff","#ffeecd","#82c5cc"],dusk:["#ffe7c2","#ffab8a","#c88ec4","#554c82"],night:["#95b4ff","#3b5294","#272e62","#161a38"]},e=t[i]||t.day,n=pe(256,128,(s,r,o)=>{let a=s.createLinearGradient(0,0,0,o);a.addColorStop(0,e[0]),a.addColorStop(.36,e[1]),a.addColorStop(.62,e[2]),a.addColorStop(1,e[3]),s.fillStyle=a,s.fillRect(0,0,r,o);let c=s.createLinearGradient(0,o*.44,0,o*.58);c.addColorStop(0,"rgba(255,255,255,0)"),c.addColorStop(.5,i==="night"?"rgba(130,210,255,0.45)":"rgba(255,252,240,0.68)"),c.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=c,s.fillRect(0,o*.44,r,o*.14);let l=(u,d,h,f)=>{let m=s.createRadialGradient(u,d,h*.1,u,d,h);m.addColorStop(0,f),m.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=m,s.beginPath(),s.arc(u,d,h,0,Math.PI*2),s.fill()};l(r*.24,o*.2,34,i==="night"?"rgba(200,228,255,0.9)":"rgba(255,255,255,0.95)"),l(r*.72,o*.24,28,i==="dusk"?"rgba(255,214,170,0.85)":"rgba(255,255,255,0.82)"),l(r*.5,o*.08,26,"rgba(255,255,255,0.75)")});return n.mapping=Cs,n}function ro(i="day"){let t={day:[[0,"#4ca9e6"],[.36,"#7fd0f7"],[.54,"#c9f0f7"],[.72,"#d8f5ec"],[1,"#66b8c7"]],dusk:[[0,"#3b3275"],[.28,"#8e589a"],[.48,"#f08a6d"],[.64,"#ffd08a"],[1,"#4a4375"]],night:[[0,"#0b112c"],[.34,"#16214f"],[.54,"#293875"],[.72,"#202e63"],[1,"#0d1633"]]}[i]||[];return pe(32,256,(e,n,s)=>{let r=e.createLinearGradient(0,0,0,s);for(let[o,a]of t)r.addColorStop(o,a);e.fillStyle=r,e.fillRect(0,0,n,s)})}function dh(i={}){let t=jm(),e=new Map,n=[],s=!!i.softwareGL,r=s?null:t.get("clayBump"),o=s?null:t.get("clayRough"),a=s?null:t.get("metalBrush");function c(d,h){return e.has(d)||e.set(d,h()),e.get(d)}function l(d,h=.52){return new Ht(d).lerp(new Ht(16775146),h)}return{tex:t,emissives:n,clay(d,h={}){var m,_;let f=`clay:${d}:${(m=h.rough)!=null?m:.46}:${h.flat?1:0}:${(_=h.side)!=null?_:0}`;return c(f,()=>{var g,p,S,v;return s?new nn({color:d,roughness:(g=h.rough)!=null?g:.46,metalness:(p=h.metalness)!=null?p:.03,envMapIntensity:.78,flatShading:!!h.flat,side:h.side||0}):new yn({color:d,roughness:(S=h.rough)!=null?S:.48,roughnessMap:h.noBump?null:o,metalness:(v=h.metalness)!=null?v:.02,bumpMap:h.noBump?null:r,bumpScale:h.noBump?0:.007,clearcoat:.14,clearcoatRoughness:.45,sheen:.36,sheenRoughness:.58,sheenColor:l(d,.55),envMapIntensity:.85,flatShading:!!h.flat,side:h.side||0})})},gloss(d,h={}){var m;let f=`gloss:${d}:${(m=h.rough)!=null?m:.16}`;return c(f,()=>{var _,g,p,S;return s?new nn({color:d,roughness:(_=h.rough)!=null?_:.16,metalness:(g=h.metalness)!=null?g:.08,envMapIntensity:1.15}):new yn({color:d,roughness:(p=h.rough)!=null?p:.15,metalness:(S=h.metalness)!=null?S:.03,clearcoat:.92,clearcoatRoughness:.07,ior:1.54,reflectivity:.78,envMapIntensity:1.32})})},enamel(d,h={}){var m,_,g;let f=`enamel:${d}:${(m=h.rough)!=null?m:.24}:${(_=h.metalness)!=null?_:""}:${(g=h.side)!=null?g:0}`;return c(f,()=>{var p,S,v,y;return s?new nn({color:d,roughness:(p=h.rough)!=null?p:.24,metalness:Math.min(.14,(S=h.metalness)!=null?S:.08),envMapIntensity:1.05,side:h.side||0}):new yn({color:d,roughness:(v=h.rough)!=null?v:.22,metalness:(y=h.metalness)!=null?y:.08,clearcoat:.8,clearcoatRoughness:.1,ior:1.5,reflectivity:.72,envMapIntensity:1.24,side:h.side||0})})},fabric(d,h={}){var m,_;let f=`fabric:${d}:${(m=h.rough)!=null?m:.72}:${(_=h.side)!=null?_:0}`;return c(f,()=>{var g,p;return s?new nn({color:d,roughness:(g=h.rough)!=null?g:.72,metalness:0,envMapIntensity:.55,side:h.side||0}):new yn({color:d,roughness:(p=h.rough)!=null?p:.74,metalness:0,bumpMap:r,bumpScale:.01,sheen:.68,sheenRoughness:.64,sheenColor:l(d,.62),envMapIntensity:.52,side:h.side||0})})},metal(d,h=.22,f=.82){let m=`metal:${d}:${h}:${f}`;return c(m,()=>s?new nn({color:d,roughness:Math.max(.24,h),metalness:Math.min(.62,f),envMapIntensity:1.45}):new yn({color:d,roughness:Math.max(.18,h),roughnessMap:a,metalness:f,bumpMap:a,bumpScale:.003,clearcoat:.34,clearcoatRoughness:.18,envMapIntensity:1.58}))},glass(d=14677759,h=.42){let f=`glass:${d}:${h}`;return c(f,()=>{let m=s?nn:yn;return new m({color:d,roughness:.06,metalness:.08,transparent:!0,opacity:h,depthWrite:!1,envMapIntensity:1.55,...s?{}:{clearcoat:1,clearcoatRoughness:.04,ior:1.48}})})},emissive(d,h=.7,f=2.1,m={}){let _=`em:${d}:${h}:${f}:${m.transparent?m.opacity:1}`;return c(_,()=>{var p,S,v,y,R;let g=new nn({color:(p=m.color)!=null?p:d,emissive:new Ht(d),emissiveIntensity:h,roughness:(S=m.rough)!=null?S:.26,metalness:(v=m.metalness)!=null?v:.05,transparent:!!m.transparent,opacity:(y=m.opacity)!=null?y:1,depthWrite:(R=m.depthWrite)!=null?R:!m.transparent,side:m.side||0});return n.push({mat:g,base:h,night:f}),g})},textured(d,h={}){var _,g,p;let f=h.finish||"default",m=`tx:${d}:${f}:${(_=h.rough)!=null?_:""}:${(g=h.metal)!=null?g:""}:${h.emissive?1:0}:${(p=h.side)!=null?p:0}`;return c(m,()=>{var T,C,P,E,M,I,O,F,V,$,G;let S=t.get(d),v=(T=h.rough)!=null?T:f==="glaze"?.2:f==="lacquer"?.34:f==="fabric"?.74:f==="metal"?.22:.54,y=(C=h.metal)!=null?C:f==="metal"?s?.55:.76:.04,R;return s?R=new nn({map:S,color:(P=h.color)!=null?P:16777215,roughness:v,metalness:y,envMapIntensity:f==="glaze"||f==="metal"?1.25:.75,side:h.side||0,transparent:!!h.transparent,opacity:(E=h.opacity)!=null?E:1}):R=new yn({map:S,color:(M=h.color)!=null?M:16777215,roughness:v,metalness:y,bumpMap:f==="metal"?a:f==="glaze"?null:r,bumpScale:f==="metal"?.003:f==="fabric"?.008:.004,clearcoat:f==="glaze"?.86:f==="lacquer"?.48:f==="metal"?.35:0,clearcoatRoughness:f==="glaze"?.08:.22,sheen:f==="fabric"?.58:0,sheenRoughness:.66,sheenColor:new Ht(16774632),envMapIntensity:(I=h.env)!=null?I:f==="glaze"||f==="metal"?1.25:.78,side:h.side||0,transparent:!!h.transparent,opacity:(O=h.opacity)!=null?O:1}),h.emissive&&(R.emissive=new Ht((F=h.emissiveColor)!=null?F:16777215),R.emissiveMap=S,R.emissiveIntensity=(V=h.baseEmissive)!=null?V:.55,n.push({mat:R,base:($=h.baseEmissive)!=null?$:.55,night:(G=h.nightEmissive)!=null?G:1.65})),R})},shadowMat(d=.36){let h=`sh:${d}`;return c(h,()=>new oi({map:t.get("shadowDisc"),transparent:!0,opacity:d,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}))},lockedMat(d=0){let h=`locked:${d}`,f=d===0?13952754:d===1?11454684:15463674;return c(h,()=>s?new nn({color:f,roughness:.34,metalness:d===2?.28:.1,emissive:new Ht(2638689),emissiveIntensity:.15,envMapIntensity:1}):new yn({color:f,roughness:.34,metalness:d===2?.26:.08,bumpMap:r,bumpScale:.005,clearcoat:.72,clearcoatRoughness:.18,sheen:.55,sheenColor:new Ht(12119807),emissive:new Ht(2638689),emissiveIntensity:.14,envMapIntensity:1.1}))},setNightFactor(d){let h=Math.max(0,Math.min(1,d));for(let f of n)f.mat.emissiveIntensity=f.base+(f.night-f.base)*h},dispose(){for(let d of e.values())d.dispose();e.clear(),n.length=0,t.dispose()}}}function W(i,t,e,n=.06,s=.024,r=3){let o=Math.min(s,i*.22,t*.22,e*.32),a=Math.max(.01,i-o*2),c=Math.max(.01,t-o*2),l=Math.max(.01,e-o*2),u=Math.min(n,a*.45,c*.45),d=-a/2,h=-c/2,f=new Si;f.moveTo(d+u,h),f.lineTo(d+a-u,h),f.quadraticCurveTo(d+a,h,d+a,h+u),f.lineTo(d+a,h+c-u),f.quadraticCurveTo(d+a,h+c,d+a-u,h+c),f.lineTo(d+u,h+c),f.quadraticCurveTo(d,h+c,d,h+c-u),f.lineTo(d,h+u),f.quadraticCurveTo(d,h,d+u,h);let m=new ss(f,{depth:l,bevelEnabled:o>.001,bevelThickness:o,bevelSize:o,bevelSegments:r,curveSegments:r+2});return m.center(),m}function Cn(i,t=24){let e=i.map(([n,s])=>new pt(n,s));return new zs(e,t)}function De(i,t,e=20,n=8,s=!1){let r=new Os(i.map(o=>o instanceof D?o:new D(o[0],o[1],o[2])),s);return new Yr(r,e,t,n,s)}function x(i,t,e={}){let n=new Ne(i,t);return n.castShadow=e.cast!==!1,n.receiveShadow=e.recv!==!1,e.pos&&n.position.set(e.pos[0],e.pos[1],e.pos[2]),e.rot&&n.rotation.set(e.rot[0],e.rot[1],e.rot[2]),e.scale!=null&&(Array.isArray(e.scale)?n.scale.set(e.scale[0],e.scale[1],e.scale[2]):n.scale.setScalar(e.scale)),n}function he(i,t,e){return i.userData.milestoneDay=t,i.userData.prop=e,i.traverse(n=>{n.userData.milestoneDay=t,n.userData.prop=e}),i}var bc=null;function Me(i,t,e,n=.012,s=.34,r){bc||(bc=new Se(1,1));let o=new Ne(bc,r.shadowMat(s));return o.rotation.x=-Math.PI/2,o.position.y=n,o.scale.set(t*2,e*2,1),o.renderOrder=1,o.userData.ignoreBounds=!0,i.add(o),o}function fh(i,t){let e=0;i.traverse(n=>{if(n.isMesh){if(n.material&&n.material.transparent&&n.material.opacity<.5&&!n.castShadow){if(n.material.map===t.tex.get("shadowDisc"))return;n.visible=!1;return}n.material=t.lockedMat(e%3),e++}})}function tg(i,t,e=.04){let n=new Si;for(let r=0;r<10;r++){let o=r%2?t:i,a=Math.PI/2+r*Math.PI/5,c=Math.cos(a)*o,l=Math.sin(a)*o;r?n.lineTo(c,l):n.moveTo(c,l)}n.closePath();let s=new ss(n,{depth:e,bevelEnabled:!0,bevelThickness:.012,bevelSize:.01,bevelSegments:2});return s.center(),s}function Ws(i,t){let e=new ct;if(!t)return{group:e,anim:null};if(t==="halo"){let n=i.metal(16763960,.18,.85),s=i.emissive(16769385,.6,1.4),r=x(new Wt(.28,.036,14,36),n,{rot:[Math.PI/2,0,0]}),o=x(new Wt(.28,.018,10,32),s,{rot:[Math.PI/2,0,0],cast:!1});e.add(r,o);let a=[];for(let c=0;c<3;c++){let l=c*Math.PI*2/3,u=x(new Wn(.038,0),s,{pos:[Math.cos(l)*.37,.03,Math.sin(l)*.37],cast:!1});a.push(u),e.add(u)}return{group:e,anim(c){e.position.y=Math.sin(c*2.6)*.035,e.rotation.y=c*1.1,a.forEach((l,u)=>{l.scale.setScalar(.8+.3*Math.sin(c*4.2+u*2.1))})}}}if(t==="straw"){let n=i.fabric(15517807,{rough:.68}),s=i.fabric(16112010,{rough:.64}),r=i.fabric(15222844,{rough:.62}),o=x(Cn([[0,.02],[.22,.03],[.42,0],[.44,-.025],[.2,0],[0,0]],28),n),a=x(Cn([[.22,0],[.21,.14],[.16,.2],[0,.21]],24),s),c=x(new q(.218,.224,.055,24),r,{pos:[0,.05,0]}),l=x(new ot(.042,10,10),r,{pos:[.21,.05,.06]});return e.add(o,a,c,l),{group:e,anim:null}}if(t==="tophat"){let n=i.enamel(2303282,{rough:.24}),s=i.metal(16763196,.22,.82),r=x(new q(.36,.37,.04,28),n,{pos:[0,.02,0]}),o=x(new Wt(.36,.02,10,28),n,{rot:[Math.PI/2,0,0],pos:[0,.02,0]}),a=x(new q(.25,.21,.34,28),n,{pos:[0,.21,0]}),c=x(new q(.225,.218,.075,28),s,{pos:[0,.08,0]});return e.add(r,o,a,c),{group:e,anim:null}}return{group:e,anim:null}}function hs(i,t=null,e={}){let n=new ct,s=new ct;n.add(s);let r=e.golden?i.metal(16762941,.2,.88):i.enamel(16014652,{rough:.26}),o=e.golden?i.metal(16766814,.18,.88):i.enamel(16742216,{rough:.24}),a=e.golden?i.metal(16770442,.26,.8):i.clay(16770244,{rough:.5}),c=e.golden?i.metal(16755250,.25,.8):i.gloss(16749229,{rough:.32}),l=i.gloss(16777215,{rough:.16}),u=i.gloss(1776938,{rough:.14}),d=x(new ot(.56,28,22),r,{pos:[0,.42,0],scale:[1.14,.72,.88]}),h=x(new ot(.46,22,16),a,{pos:[0,.28,.06],scale:[1,.48,.82]});s.add(d,h);for(let R of[-1,1])for(let T=0;T<3;T++){let C=x(new ot(.085-T*.012,12,10),r,{pos:[R*(.56-T*.06),.42-T*.03,-.14+T*.16]});s.add(C)}let f=new ln(.052,.16,6,10),m=new ln(.044,.15,6,10);for(let R of[-1,1])for(let T=0;T<3;T++){let C=-.18+T*.18,P=x(f,o,{pos:[R*.56,.24,C],rot:[.06*(T-1),0,R*-.95]}),E=x(m,r,{pos:[R*.72,.12,C*1.1],rot:[.06*(T-1),0,R*-.25]});s.add(P,E)}let _=[];for(let R of[-1,1]){let T=new ct;T.position.set(R*.48,.44,.16);let C=x(De([[0,0,0],[R*.22,.14,.12],[R*.28,.32,.16]],.072,14,10),o),P=x(new ot(.175,18,14),r,{pos:[R*.3,.43,.18],scale:[1.1,.92,.85]}),E=x(new ln(.068,.17,6,12),r,{pos:[R*.2,.56,.24],rot:[.25,0,R*.65]}),M=x(new ln(.056,.13,6,12),o,{pos:[R*.34,.53,.27],rot:[.2,0,R*-.35]});T.add(C,P,E,M),s.add(T),_.push({pivot:T,sx:R})}for(let R of[-1,1]){let T=x(new q(.042,.055,.24,12),r,{pos:[R*.19,.74,.22],rot:[.18,0,R*-.14]}),C=x(new ot(.115,18,16),l,{pos:[R*.21,.87,.25]}),P=x(new ot(.064,14,12),u,{pos:[R*.21,.88,.335]}),E=x(new ot(.024,8,8),l,{pos:[R*.23,.91,.38],cast:!1});s.add(T,C,P,E)}let g=x(De([[-.14,.42,.48],[0,.37,.52],[.14,.42,.48]],.022,12,8),u,{cast:!1}),p=x(new ot(.068,12,10),c,{pos:[-.28,.42,.42],scale:[1.2,.72,.4],cast:!1}),S=x(new ot(.068,12,10),c,{pos:[.28,.42,.42],scale:[1.2,.72,.4],cast:!1});s.add(g,p,S);let v=Ws(i,t),y=new ct;return y.position.set(0,t==="halo"?1.15:.88,.1),y.add(v.group),s.add(y),e.noShadow||Me(n,.78,.62,.014,.34,i),{group:he(n,0,"crab"),anim(R,T,C={}){let P=C.mood||"idle",E=P==="happy"||P==="proud"?5.2:P==="focus"?1.4:2.3,M=P==="happy"?.075:.028;s.position.y=Math.abs(Math.sin(R*E))*M,s.rotation.z=Math.sin(R*E*.5)*(P==="happy"?.08:.03),_.forEach(({pivot:I,sx:O},F)=>{let V=P==="happy"||P==="proud"?.25+Math.sin(R*7.5+F*Math.PI)*.28:Math.sin(R*2.1+F*1.4)*.1;I.rotation.z=O*V,I.rotation.x=P==="happy"?-.18:0}),v.anim&&v.anim(R,T,C)}}}function Ci(i,t="jack",e=null,n={}){let s=t==="jackie",r=new ct,o=new ct;r.add(o);let a=i.clay(16240816,{rough:.46}),c=i.clay(2761261,{rough:.38}),l=i.fabric(16447730,{rough:.66}),u=i.gloss(1776938,{rough:.12}),d=i.gloss(16751539,{rough:.28}),h=i.clay(3815237,{rough:.56}),f=i.enamel(16579316,{rough:.26}),m=s?i.fabric(15891810,{rough:.7}):i.fabric(13283986,{rough:.72}),_=l,g=s?i.fabric(7370634,{rough:.72}):i.fabric(3813941,{rough:.74}),p=s?i.fabric(16774888,{rough:.68}):i.fabric(1675140,{rough:.66});for(let M of[-1,1]){let I=x(W(.16,.055,.24,.05,.015),h,{pos:[M*.12,.028,.03]}),O=x(new ot(.095,14,12),f,{pos:[M*.12,.075,.035],scale:[.88,.65,1.25]});if(o.add(I,O),s){let F=x(new q(.058,.056,.12,12),l,{pos:[M*.12,.14,0]}),V=x(new q(.06,.056,.22,12),a,{pos:[M*.12,.28,0]});o.add(F,V)}else{let F=x(new ln(.075,.24,6,12),g,{pos:[M*.12,.25,0]});o.add(F)}}if(s){let M=x(new q(.18,.27,.28,18),g,{pos:[0,.46,0]}),I=x(new q(.18,.21,.34,18),l,{pos:[0,.72,0]}),O=x(W(.14,.33,.25,.04,.015),m,{pos:[-.11,.72,.02]}),F=x(W(.14,.33,.25,.04,.015),m,{pos:[.11,.72,.02]}),V=x(W(.32,.33,.12,.04,.015),m,{pos:[0,.72,-.09]}),$=x(new Wt(.1,.024,8,18),p,{pos:[0,.87,.02],rot:[Math.PI/2,0,0]});o.add(M,I,O,F,V,$)}else{let M=x(W(.42,.44,.28,.1,.03),m,{pos:[0,.62,0]}),I=x(W(.24,.13,.05,.03,.012),p,{pos:[0,.52,.14]}),O=x(new Wt(.14,.055,10,18),p,{pos:[0,.84,-.04],rot:[Math.PI/2.4,0,0]});o.add(M,I,O)}let S=new ct;S.position.set(-.25,.8,0),S.add(x(new ln(.064,.22,6,12),_,{pos:[-.04,-.14,0],rot:[0,0,-.22]}),x(new ot(.068,12,10),a,{pos:[-.08,-.28,.02]})),o.add(S);let v=new ct;v.position.set(.25,.8,0),v.add(x(new ln(.064,.22,6,12),_,{pos:[.09,.12,.04],rot:[.2,0,-.58]}),x(new ot(.07,12,10),a,{pos:[.18,.26,.08]})),o.add(v);let y=x(new q(.07,.075,.1,12),a,{pos:[0,.9,0]}),R=new ct;R.position.set(0,1.14,0);let T=x(new ot(.28,24,20),a,{scale:[1.02,.98,.96]});R.add(T);for(let M of[-1,1])R.add(x(new ot(.06,10,10),a,{pos:[M*.27,-.01,-.01],scale:[.6,1,.8]}));let C=x(new ot(.295,24,18,0,Math.PI*2,0,Math.PI*.62),c,{pos:[0,.03,-.02]});if(R.add(C),s){let M=x(W(.56,.44,.26,.14,.04),c,{pos:[0,-.14,-.14]}),I=x(new ln(.075,.26,6,10),c,{pos:[-.24,-.12,.04],rot:[0,0,.12]}),O=x(new ln(.075,.26,6,10),c,{pos:[.24,-.12,.04],rot:[0,0,-.12]}),F=x(W(.42,.12,.12,.05,.02),c,{pos:[0,.17,.21]}),V=x(W(.1,.036,.03,.014,.006),m,{pos:[.16,.18,.26],rot:[0,.25,-.2]});R.add(M,I,O,F,V)}else{for(let I=-2;I<=2;I++){let O=x(new ot(.095-Math.abs(I)*.01,12,10),c,{pos:[I*.085,.2-Math.abs(I)*.02,.19-Math.abs(I)*.03],scale:[1,.78,.85]});R.add(O)}let M=x(new ot(.285,18,14),c,{pos:[0,-.01,-.07]});R.add(M)}for(let M of[-1,1])R.add(x(new ot(.038,12,10),u,{pos:[M*.095,.01,.255]}),x(new ot(.014,8,8),i.gloss(16777215),{pos:[M*.105,.024,.284],cast:!1}),x(new ot(.048,10,8),d,{pos:[M*.155,-.055,.23],scale:[1.1,.65,.35],cast:!1}));R.add(x(De([[-.07,-.07,.26],[0,-.1,.278],[.07,-.07,.26]],.014,10,8),u,{cast:!1}));let P=Ws(i,e),E=new ct;return E.position.set(0,e==="halo"?.44:.27,0),E.scale.setScalar(.95),E.add(P.group),R.add(E),o.add(y,R),n.noShadow||Me(r,.36,.3,.014,.32,i),{group:he(r,s?14:11,t),anim(M,I,O={}){let F=O.mood==="happy"||O.mood==="proud",V=F?5:2.6;o.position.y=Math.abs(Math.sin(M*V))*(F?.055:.014),v.rotation.z=Math.sin(M*(F?7.2:3.4))*(F?.32:.16),R.rotation.z=Math.sin(M*1.5)*.04,P.anim&&P.anim(M,I,O)}}}function ph(i,t=!1){let e=new ct,s=x(Cn([[.01,-2.15],[.95,-1.98],[2.15,-1.55],[3.25,-1.02],[3.92,-.58],[4.28,-.34],[4.22,-.12]],36),i.clay(10122584,{rough:.68}),{cast:!1}),r=x(new q(4.32,3.88,.36,36),i.clay(8160910,{rough:.62}),{pos:[0,-.42,0],cast:!1});e.add(s,r);let o=i.glass(2668236,.72);o.roughness=.16,o.metalness=.08;let a=x(new q(5.65,5.15,.34,48),o,{pos:[0,-.34,0],cast:!1,recv:!0}),c=x(new Wt(5.58,.085,10,56),i.clay(10350839,{rough:.35}),{pos:[0,-.19,0],rot:[Math.PI/2,0,0],cast:!1}),l=i.textured("waterRipple",{rough:.25,transparent:!0,opacity:.72,side:Ee});l.depthWrite=!1;let u=x(new Se(11.1,11.1),l,{pos:[0,-.155,0],rot:[-Math.PI/2,0,0],cast:!1,recv:!1}),d=x(new Se(10.6,10.6),l,{pos:[0,-.15,0],rot:[-Math.PI/2,0,.8],cast:!1,recv:!1});e.add(a,c,u,d);let h=x(new q(4.12,4.24,.44,40,1,!0),i.textured("stoneWall",{rough:.65}),{pos:[0,-.23,0]}),f=x(new Wt(4.12,.11,12,48),i.clay(15064528,{rough:.52}),{pos:[0,-.025,0],rot:[Math.PI/2,0,0]});e.add(h,f);let m=x(new q(4.06,4.08,.12,44),i.textured("woodPlank",{finish:"lacquer",rough:.4}),{pos:[0,-.06,0],cast:!1,recv:!0});if(e.add(m),t){let O=x(W(2.55,.04,2.1,.2,.014),i.clay(14662274,{rough:.52}),{pos:[0,.008,-.35],cast:!1,recv:!0});e.add(O)}else{let O=x(new q(1.18,1.22,.036,36),[i.clay(10119224),i.textured("coasterDial",{finish:"lacquer",rough:.36}),i.clay(10119224)],{pos:[0,.006,.35],cast:!1,recv:!0}),F=x(new Wt(1.2,.028,10,40),i.metal(15251784,.24,.8),{pos:[0,.024,.35],rot:[Math.PI/2,0,0],cast:!1});e.add(O,F)}let _=i.clay(8146994,{rough:.62}),g=i.metal(15251784,.24,.8),p=i.metal(3817551,.38,.72);for(let O=0;O<12;O++){let F=O*Math.PI*2/12+.12,V=Math.cos(F)*4.32,$=Math.sin(F)*4.32;e.add(x(new q(.11,.12,.92,12),_,{pos:[V,-.38,$]}))}[.52,2.62,-.55,-2.58].forEach((O,F)=>{let V=Math.cos(O)*3.82,$=Math.sin(O)*3.82,G=new ct;if(G.position.set(V,0,$),G.add(x(new q(.14,.17,.06,14),p,{pos:[0,.03,0]}),x(new q(.085,.1,.24,14),p,{pos:[0,.16,0]}),x(new ot(.105,14,10),g,{pos:[0,.29,0],scale:[1,.6,1]})),F===1){let it=[];for(let X=0;X<=26;X++){let st=X/26,ft=.12+st*.14,yt=st*Math.PI*5.2;it.push([Math.cos(yt)*ft+.28,.032+st*.015,Math.sin(yt)*ft+.12])}G.add(x(De(it,.025,32,7),i.clay(14201980,{rough:.68})))}e.add(G)});let v=x(W(1.18,.34,.08,.04,.015),g,{pos:[0,-.14,4.18],rot:[-.08,0,0]}),y=x(new Se(1.06,.26),i.textured("pierPlaque",{finish:"metal",rough:.26}),{pos:[0,-.14,4.225],rot:[-.08,0,0],cast:!1});e.add(v,y);let R=i.clay(3909732,{rough:.56}),T=i.clay(5817465,{rough:.54}),C=i.clay(10266030,{rough:.6});[[-3.15,-2.05,1.05],[-2.55,-2.75,.85],[2.6,-2.65,.95],[3.2,-1.95,.8],[0,-3.55,1.15]].forEach(([O,F,V],$)=>{let G=new ct;G.position.set(O,0,F),G.scale.setScalar(V),G.add(x(new ot(.28,14,12),$%2?R:T,{pos:[0,.2,0]}),x(new ot(.21,12,10),$%2?T:R,{pos:[.2,.14,.1]}),x(new ot(.19,12,10),R,{pos:[-.18,.13,.12]}),x(new ot(.14,10,8),C,{pos:[.12,.07,.26],scale:[1.3,.7,1.1]})),e.add(G)});let E=new ct;e.add(E);let M=[];function I(O){for(;E.children.length;)E.remove(E.children[0]);M.length=0;let F=Math.max(0,Math.min(2,O|0));for(let V=0;V<F;V++){let $=V===0?1.15:2.02,G=new ct;G.position.set(Math.cos($)*4.78,-.14,Math.sin($)*4.78);let it=x(new Wt(.26,.085,12,24),i.clay(15748670,{rough:.4}),{rot:[Math.PI/2,0,0]}),X=x(new Wt(.36,.025,8,24),i.emissive(16767832,.55,1.35),{rot:[Math.PI/2,0,0],cast:!1});for(let st=0;st<4;st++){let ft=st*Math.PI/2;G.add(x(new Wt(.09,.026,8,12),i.clay(16775144,{rough:.42}),{pos:[Math.cos(ft)*.26,0,Math.sin(ft)*.26],rot:[0,-ft,0]}))}G.add(it,X),E.add(G),M.push({bg:G,phase:V*1.9})}}return{group:e,setShields:I,anim(O){u.rotation.z=O*.06,d.rotation.z=-O*.045+.8,a.position.y=-.34+Math.sin(O*1.35)*.025,c.position.y=-.19+Math.sin(O*1.35)*.025;for(let F of M)F.bg.position.y=-.13+Math.sin(O*2.1+F.phase)*.045,F.bg.rotation.z=Math.sin(O*1.6+F.phase)*.1}}}function eg(i){let t=new ct,e=i.textured("woodPlank",{finish:"lacquer",rough:.44}),n=i.metal(15382596,.2,.86),s=i.gloss(16745640,{rough:.14}),r=i.gloss(16753598,{rough:.16}),o=i.gloss(1974316,{rough:.12}),a=i.textured("coinFace",{finish:"metal",rough:.2});for(let f of[-.34,0,.34])t.add(x(W(1.06,.075,.25,.03,.012),e,{pos:[0,.105,f]}));for(let f of[-.42,0,.42])t.add(x(W(.12,.07,.92,.02,.01),i.clay(10119226),{pos:[f,.035,0]}));let c=new ct;c.position.set(0,.14,0),c.rotation.y=-Math.PI*.58;let l=x(new ot(.42,28,22),s,{pos:[0,.38,0],scale:[1.18,.94,.94]}),u=x(new q(.145,.165,.14,22),r,{pos:[.47,.36,0],rot:[0,0,-Math.PI/2],scale:[.85,1,1.15]});for(let f of[-.045,.045])c.add(x(new ot(.028,10,8),i.clay(12995954),{pos:[.54,.37,f],scale:[.5,1.3,.8]}));for(let f of[-1,1])c.add(x(new Ge(.11,.19,14),s,{pos:[.18,.72,f*.19],rot:[f*.42,0,-.35]})),c.add(x(new ot(.048,12,10),o,{pos:[.435,.49,f*.175]}),x(new ot(.017,8,8),i.gloss(16777215),{pos:[.474,.508,f*.185],cast:!1}),x(new ot(.068,10,8),i.gloss(16736141),{pos:[.395,.36,f*.28],scale:[.55,.65,.4],cast:!1}));for(let[f,m]of[[-.24,-.18],[-.24,.18],[.22,-.18],[.22,.18]])c.add(x(new q(.088,.072,.19,14),s,{pos:[f,.095,m]}));let d=[];for(let f=0;f<=18;f++){let m=f/18,_=m*Math.PI*3.4;d.push([-.47-m*.14,.44+Math.sin(_)*.055,Math.cos(_)*.055])}c.add(x(De(d,.026,22,8),s)),c.add(x(W(.24,.036,.075,.02,.008),n,{pos:[0,.77,0]}),x(W(.18,.02,.03,.006,.004),o,{pos:[0,.785,0],cast:!1})),c.add(l,u),t.add(c);let h=x(new q(.16,.16,.036,24),[n,a,a],{pos:[0,1.18,0],rot:[Math.PI/2,0,0]});t.add(h);for(let f=0;f<3;f++)t.add(x(new q(.095,.095,.026,18),[n,a,a],{pos:[.38,.158+f*.027,.28]}));return Me(t,.65,.56,.008,.34,i),{group:he(t,1,"piggy"),anim(f){h.rotation.z=f*2.4,h.position.y=1.15+Math.sin(f*2.8)*.06}}}function ng(i){let t=new ct,e=i.textured("woodPlank",{finish:"lacquer",rough:.44}),n=i.enamel(16774626,{rough:.28}),s=i.metal(14856516,.22,.85),r=i.metal(3816780,.36,.74),o=i.textured("pineappleCrust",{finish:"glaze",rough:.2}),a=i.clay(14919768,{rough:.5}),c=i.textured("stripeRed",{finish:"fabric",rough:.7,side:Ee});for(let C of[-.46,.46]){let P=new ct;P.position.set(-.28,.28,C),P.add(x(new Wt(.25,.036,12,26),i.clay(8145446)),x(new Wt(.275,.014,8,26),r),x(new q(.055,.055,.08,12),s,{rot:[Math.PI/2,0,0]}));for(let E=0;E<6;E++)P.add(x(new q(.014,.014,.48,8),i.clay(10117686),{rot:[0,0,E*Math.PI/6]}));t.add(P)}for(let C of[-.34,.34])t.add(x(new q(.025,.025,.24,8),r,{pos:[.46,.16,C]}),x(new q(.085,.085,.045,16),r,{pos:[.46,.085,C],rot:[Math.PI/2,0,0]}));let l=x(W(1.22,.58,.78,.06,.02),e,{pos:[0,.54,0]}),u=x(W(1.32,.08,.88,.04,.016),n,{pos:[0,.85,0]}),d=x(De([[-.6,.76,-.32],[-.82,.86,-.32],[-.82,.86,.32],[-.6,.76,.32]],.026,20,8),s);t.add(l,u,d);let h=x(W(.76,.44,.64,.03,.01),i.glass(15399167,.36),{pos:[-.14,1.11,0],cast:!1}),f=x(W(.7,.028,.56,.01,.005),n,{pos:[-.14,1.08,0]});t.add(h,f),[[-.34,.94,-.14],[-.14,.94,-.14],[.06,.94,-.14],[-.32,.94,.14],[-.12,.94,.14],[-.24,1.14,0],[0,1.14,0]].forEach(([C,P,E],M)=>{let I=new ct;I.position.set(C,P,E),I.add(x(new q(.085,.075,.055,16),a,{pos:[0,.025,0]}),x(new ot(.095,16,12,0,Math.PI*2,0,Math.PI*.62),o,{pos:[0,.045,0],scale:[1,.85,1]})),M===5&&I.add(x(W(.11,.03,.09,.008,.004),i.gloss(16770680),{pos:[.03,.052,.04],rot:[.1,.4,.12]})),t.add(I)});let _=x(Cn([[0,0],[.14,0],[.16,.28],[.13,.36],[.06,.42],[.03,.46],[0,.47]],20),s,{pos:[.42,.89,-.1]}),g=x(new q(.016,.016,.09,8),r,{pos:[.42,1,.08],rot:[Math.PI/2,0,0]}),p=x(new q(.055,.042,.09,14),n,{pos:[.44,.935,.22]}),S=x(new q(.048,.048,.01,14),i.gloss(11888682),{pos:[.44,.978,.22],cast:!1});t.add(_,g,p,S);for(let[C,P]of[[-.58,-.36],[.58,-.36],[-.58,.36],[.58,.36]])t.add(x(new q(.022,.022,.94,10),s,{pos:[C,1.34,P]}),x(new ot(.038,10,8),s,{pos:[C,1.82,P]}));let v=x(W(1.44,.06,.98,.04,.015),c,{pos:[0,1.84,.02],rot:[.12,0,0]}),y=x(new Le(1.42,.14,.03),c,{pos:[0,1.72,.49]}),R=x(new Le(1.42,.11,.03),c,{pos:[0,1.83,-.45]});t.add(v,y,R);let T=new ct;return T.position.set(.84,0,.18),T.rotation.y=-.35,T.add(x(W(.46,.56,.05,.03,.01),i.clay(10117686),{pos:[0,.34,0],rot:[-.18,0,0]}),x(new Se(.4,.48),i.textured("chalkboard",{rough:.65}),{pos:[0,.34,.028],rot:[-.18,0,0],cast:!1}),x(W(.4,.48,.04,.02,.008),i.clay(8146474),{pos:[0,.3,-.14],rot:[.22,0,0]})),t.add(T),Me(t,.92,.66,.008,.34,i),{group:he(t,2,"bakery"),anim(C){v.rotation.x=.12+Math.sin(C*2)*.012}}}function ig(i){let t=new ct,e=i.enamel(1349259,{rough:.24}),n=i.enamel(1010532,{rough:.28}),s=i.enamel(16774627,{rough:.26}),r=i.metal(15777350,.22,.84),o=i.emissive(3601096,.8,1.9,{transparent:!0,opacity:.85});t.add(x(W(1.06,.12,.86,.12,.024),n,{pos:[0,.06,0]}),x(W(.92,1.38,.72,.12,.03),s,{pos:[0,.8,0]}),x(W(.96,.24,.76,.1,.02),e,{pos:[0,.24,0]}),x(W(1.18,.14,1.04,.18,.032),e,{pos:[0,1.56,.1],rot:[-.08,0,0]}),x(W(.9,.05,.18,.03,.01),i.emissive(16773298,.7,1.6),{pos:[0,1.48,.48],cast:!1})),t.add(x(W(.68,.5,.06,.05,.014),n,{pos:[0,1.12,.35]}),x(new Se(.6,.42),i.textured("kioskScreen",{finish:"glaze",rough:.18,emissive:!0,baseEmissive:.55,nightEmissive:1.45}),{pos:[0,1.12,.384],cast:!1}));let a=x(W(.92,.1,.36,.05,.016),s,{pos:[0,.72,.44]}),c=x(new q(.14,.15,.04,22),i.clay(2634564),{pos:[-.2,.79,.48],rot:[.22,0,0]}),l=x(new Wt(.12,.018,10,24),o,{pos:[-.2,.815,.485],rot:[Math.PI/2+.22,0,0],cast:!1}),u=x(W(.22,.14,.022,.025,.005),i.gloss(16753720),{pos:[-.2,.94,.52],rot:[.35,.15,-.12]});t.add(a,c,l,u);let d=i.textured("passbook",{rough:.48});for(let h=0;h<3;h++)t.add(x(W(.24,.042,.32,.02,.008),h===2?d:h===1?i.clay(16745570):e,{pos:[.24,.795+h*.044,.46],rot:[0,.14*(h-1),0]}));for(let h=0;h<4;h++)t.add(x(W(.56,.045,.04,.01,.006),n,{pos:[0,.52+h*.12,-.36]}));return t.add(x(new q(.028,.028,1.15,10),r,{pos:[.32,.74,-.38]})),Me(t,.72,.62,.008,.34,i),{group:he(t,3,"kiosk"),anim(h){let f=.85+.28*(h*.9%1);l.scale.setScalar(f),u.position.y=.94+Math.sin(h*2.8)*.045,u.rotation.z=-.12+Math.sin(h*2.8)*.08}}}function sg(i){let t=new ct,e=i.clay(16642264,{rough:.52}),n=i.clay(14185556,{rough:.48}),s=i.enamel(2059868,{rough:.28}),r=i.emissive(16769162,.65,1.85),o=i.clay(14201438,{rough:.55}),a=i.clay(8959060,{rough:.54}),c=i.clay(2631988,{rough:.65});t.add(x(W(2.06,.14,1.66,.06,.02),i.clay(13354166),{pos:[0,.07,0]}),x(W(1.94,1.04,1.52,.06,.024),e,{pos:[0,.64,0]}),x(W(2.14,.14,1.72,.06,.024),n,{pos:[0,1.19,0]}));for(let m of[-.88,-.3,.3,.88])t.add(x(W(.14,1.02,.16,.03,.012),e,{pos:[m,.62,.78]}));t.add(x(W(.5,.72,.06,.02,.008),s,{pos:[0,.49,.76]}));for(let m=-2;m<=2;m++)t.add(x(new Le(.025,.66,.08),i.clay(1264704),{pos:[m*.09,.49,.77]}));for(let m of[-.59,.59])t.add(x(W(.38,.48,.06,.04,.01),s,{pos:[m,.64,.76]}),x(W(.3,.4,.07,.03,.008),r,{pos:[m,.64,.77],cast:!1}));for(let m of[-.52,0,.52])t.add(x(W(.34,.44,.06,.04,.01),s,{pos:[m,.66,-.76]}),x(W(.26,.36,.07,.03,.008),r,{pos:[m,.66,-.77],cast:!1}));for(let m of[-1,1])for(let _ of[-.34,.34])t.add(x(W(.06,.44,.36,.03,.01),s,{pos:[m*.97,.66,_]}),x(W(.07,.36,.28,.02,.008),r,{pos:[m*.98,.66,_],cast:!1}));t.add(x(W(1.18,.32,.08,.03,.012),i.enamel(1593162,{rough:.28}),{pos:[0,1.05,.85]}),x(new Se(1.1,.26),i.textured("shopBanner",{finish:"lacquer",rough:.3}),{pos:[0,1.05,.895],cast:!1}));let l=new ct,u=new q(.024,.026,1.48,8),d=new q(.022,.022,1.85,8),h=new q(.022,.022,1.25,8);for(let m=0;m<4;m++){let _=-.82+m*.55;l.add(x(u,m%2?a:o,{pos:[-1.14,.74,_]}))}for(let m of[.34,.78,1.22]){l.add(x(d,o,{pos:[-1.14,m,0],rot:[Math.PI/2,0,0]}));for(let _=0;_<4;_++)l.add(x(new ot(.034,6,6),c,{pos:[-1.14,m,-.82+_*.55],cast:!1}))}l.add(x(new q(.02,.02,2.05,8),a,{pos:[-1.16,.76,0],rot:[.95,0,0]}),x(W(.24,.04,1.72,.015,.006),i.clay(12092492),{pos:[-1.06,.79,0]}));for(let m of[.64,1.12])l.add(x(u,o,{pos:[m,.74,.94]}));for(let m of[.42,.95])l.add(x(h,a,{pos:[.88,m,.94],rot:[0,0,Math.PI/2]}));let f=x(new Le(.46,.48,.02),i.glass(2668664,.65),{pos:[.88,.68,.96],cast:!1});return l.add(f),t.add(l),{group:he(t,4,"floor1"),anim(m){f.rotation.x=Math.sin(m*2.2)*.04}}}function rg(i){let t=new ct,e=i.textured("woodPlank",{finish:"lacquer",rough:.46}),n=i.textured("riceSack",{finish:"fabric",rough:.76}),s=i.fabric(13185322,{rough:.64}),r=i.clay(14464108,{rough:.54}),o=i.clay(11173180,{rough:.56}),a=i.gloss(2532256,{rough:.14});t.add(x(W(1.26,.1,.92,.05,.018),e,{pos:[0,.05,0]}));let c=Cn([[0,0],[.28,0],[.36,.16],[.35,.46],[.25,.68],[.13,.78],[.22,.9],[.16,.92],[0,.82]],26),l=x(c,n,{pos:[-.24,.1,.02],scale:[1.05,1,.88]}),u=x(new Wt(.145,.026,10,22),s,{pos:[-.24,.88,.02],rot:[Math.PI/2,0,0]}),d=x(new ot(.055,10,8),s,{pos:[-.12,.88,.14],scale:[1.4,.75,.6]}),h=x(new ot(.055,10,8),s,{pos:[-.36,.88,.14],scale:[1.4,.75,.6]});t.add(l,u,d,h);let f=new ct;f.position.set(.32,.1,-.08);for(let S=0;S<3;S++){let v=.09+S*.16;f.add(x(new q(.24,.24,.15,22),r,{pos:[0,v,0]}),x(new Wt(.242,.018,8,24),o,{pos:[0,v+.06,0],rot:[Math.PI/2,0,0]}))}for(let S=0;S<3;S++){let v=S*Math.PI*2/3+.4;f.add(x(new ot(.068,12,10),i.clay(16774620,{rough:.36}),{pos:[Math.cos(v)*.1,.51,Math.sin(v)*.1],scale:[1.1,.78,.9]}))}let m=x(new q(.245,.25,.055,22),r,{pos:[.06,.56,-.05],rot:[.22,0,-.26]});m.add(x(new Wt(.05,.014,8,14),o,{pos:[0,.04,0],rot:[0,0,0]})),f.add(m);let _=i.glass(16777215,.48),g=[];for(let S=0;S<4;S++){let v=x(new ot(.065+S%2*.02,10,8),_,{pos:[0,.65+S*.16,0],cast:!1});g.push({m:v,phase:S*.25}),f.add(v)}t.add(f);let p=new ct;return p.position.set(.28,.1,.3),p.add(x(new ot(.14,18,14),a,{pos:[0,.12,0],scale:[1.08,.86,1.08]}),x(new q(.08,.095,.04,16),a,{pos:[0,.23,0]}),x(new ot(.032,10,8),a,{pos:[0,.265,0]}),x(De([[.12,.1,0],[.22,.16,0],[.25,.22,0]],.024,12,8),a),x(De([[-.12,.16,0],[-.21,.14,0],[-.14,.07,0]],.02,12,8),a),x(new q(.042,.032,.055,12),a,{pos:[.26,.028,.12]}),x(new q(.042,.032,.055,12),a,{pos:[.14,.028,.19]})),t.add(p),Me(t,.72,.56,.008,.34,i),{group:he(t,5,"pantry"),anim(S){for(let v of g){let y=(S*.38+v.phase)%1;v.m.position.y=.6+y*.58,v.m.position.x=Math.sin(y*Math.PI*2+v.phase*6)*.07,v.m.scale.setScalar(.55+y*.95)}}}}function og(i){let t=new ct,e=i.clay(16770539,{rough:.48}),n=i.textured("checkerTile",{finish:"glaze",rough:.22}),s=i.enamel(1797474,{rough:.28}),r=i.emissive(16768128,.7,1.95),o=i.metal(2895936,.34,.78),a=i.emissive(16736168,1.1,2.6),c=i.emissive(3732444,1,2.5),l=i.emissive(16769638,.95,2.3),u=i.textured("neonSign",{finish:"glaze",rough:.18,emissive:!0,baseEmissive:.85,nightEmissive:2});t.add(x(W(1.88,1.04,1.46,.06,.024),e,{pos:[0,.54,0]}),x(W(1.92,.3,1.5,.04,.012),n,{pos:[0,.19,0]}),x(W(2.04,.13,1.62,.06,.022),s,{pos:[0,1.09,0]}));for(let f of[-.52,0,.52])for(let m of[-1,1])t.add(x(W(.36,.48,.06,.08,.01),s,{pos:[f,.64,m*.73]}),x(W(.28,.4,.07,.06,.008),r,{pos:[f,.64,m*.74],cast:!1}));for(let f of[-.32,.32])t.add(x(W(.06,.48,.36,.06,.01),s,{pos:[-.94,.64,f]}),x(W(.07,.4,.28,.05,.008),r,{pos:[-.95,.64,f],cast:!1}));t.add(x(W(.34,.24,.2,.03,.008),i.clay(14936042),{pos:[-.62,.36,-.82]}),x(new q(.085,.085,.03,14),i.clay(3817548),{pos:[-.66,.36,-.92],rot:[Math.PI/2,0,0]}));let d=new ct;d.position.set(.94,.68,.1),d.scale.setScalar(1.18),d.add(x(new q(.022,.022,.42,8),o,{pos:[.2,.28,0],rot:[0,0,Math.PI/2]}),x(new q(.022,.022,.42,8),o,{pos:[.2,-.24,0],rot:[0,0,Math.PI/2]}),x(new q(.018,.018,.56,8),o,{pos:[.16,.02,0],rot:[0,0,.72]}),x(W(1.06,.64,.14,.06,.018),i.clay(1580344,{rough:.36}),{pos:[.84,.04,0]}),x(new Se(.94,.52),u,{pos:[.84,.04,.075],cast:!1}),x(new Se(.94,.52),u,{pos:[.84,.04,-.075],rot:[0,Math.PI,0],cast:!1}));for(let f of[-.082,.082])d.add(x(De([[.34,-.25,f],[1.34,-.25,f],[1.34,.33,f],[.34,.33,f]],.018,28,8,!0),c,{cast:!1}));let h=new ct;return h.position.set(.84,.48,0),h.add(x(new Wt(.11,.018,8,20,Math.PI),a,{rot:[0,0,Math.PI],cast:!1}),x(new q(.018,.018,.24,8),a,{rot:[0,0,Math.PI/2],cast:!1}),x(new Wt(.045,.014,8,12),l,{pos:[.12,-.04,0],cast:!1})),d.add(h),t.add(d),{group:he(t,6,"neon"),anim(f){let m=1+Math.sin(f*4.5)*.06;h.scale.setScalar(m)}}}function ag(i){let t=new ct,e=i.enamel(1473100,{rough:.24}),n=i.enamel(1005110,{rough:.28}),s=i.enamel(16775142,{rough:.24}),r=i.clay(12090436,{rough:.48}),o=i.metal(15778376,.2,.86),a=i.emissive(16770716,.55,1.75),c=i.glass(15400191,.62),l=new ct;l.position.set(-.1,.05,0);let u=x(W(1.78,.28,.66,.26,.04),e,{pos:[0,.14,0]}),d=x(W(1.84,.06,.72,.28,.015),s,{pos:[0,.27,0]}),h=x(W(1.42,.24,.56,.14,.02),s,{pos:[0,.41,0]}),f=x(W(1.22,.28,.54,.12,.02),s,{pos:[0,.65,0]}),m=x(W(1.32,.07,.6,.14,.018),n,{pos:[0,.81,0]});l.add(u,d,h,f,m);for(let R=-2;R<=2;R++)for(let T of[-1,1])l.add(x(new Wt(.05,.014,8,14),o,{pos:[R*.24,.41,T*.285]}),x(new q(.042,.042,.02,12),a,{pos:[R*.24,.41,T*.28],rot:[Math.PI/2,0,0],cast:!1}),x(W(.16,.14,.03,.02,.005),a,{pos:[R*.22,.65,T*.27],cast:!1}));for(let R of[-.74,.74])l.add(x(W(.14,.06,.36,.02,.006),r,{pos:[R,.33,0]}));let _=x(new q(.11,.13,.36,18),s,{pos:[0,1.01,0]}),g=x(new q(.115,.115,.08,18),n,{pos:[0,1.17,0]}),p=tg(.075,.032,.02);l.add(_,g,x(p,o,{pos:[0,1,.125]}),x(p,o,{pos:[0,1,-.125]}),x(new ot(.036,10,8),i.emissive(16728642,.9,2.2),{pos:[.6,.86,.25],cast:!1}),x(new ot(.036,10,8),i.emissive(3600522,.9,2.2),{pos:[.6,.86,-.25],cast:!1}));let S=x(De([[-.82,.06,.16],[-1.18,.04,.34],[-1.46,.03,.5]],.038,14,8),c,{cast:!1}),v=x(De([[-.82,.06,-.16],[-1.18,.04,-.34],[-1.46,.03,-.5]],.038,14,8),c,{cast:!1});l.add(S,v),t.add(l);let y=new ct;y.position.set(.68,.14,.42),y.add(x(new Wt(.22,.075,14,28),i.enamel(15748670,{rough:.24}),{rot:[Math.PI/2,0,0]}),x(new Wt(.32,.02,8,28),o,{rot:[Math.PI/2,0,0]}));for(let R=0;R<4;R++){let T=R*Math.PI/2;y.add(x(new Wt(.078,.022,8,12),s,{pos:[Math.cos(T)*.22,0,Math.sin(T)*.22],rot:[0,-T,0]}),x(new q(.01,.01,.62,6),o,{pos:[0,-.02,0],rot:[Math.PI/2,T+Math.PI/4,0]}))}return t.add(y),{group:he(t,7,"ferry"),anim(R){l.position.y=.05+Math.sin(R*2)*.04,l.rotation.z=Math.sin(R*1.5)*.04,l.rotation.x=Math.cos(R*1.8)*.03,y.position.y=.14+Math.sin(R*2.4+1.2)*.045,y.rotation.y=R*.6}}}function cg(i){let t=new ct,e=i.enamel(5992078,{rough:.26,metalness:.26}),n=i.metal(16105272,.2,.88),s=i.metal(13734940,.24,.84),r=i.emissive(2945682,1,2.4),o=i.textured("coinFace",{finish:"metal",rough:.2});t.add(x(W(.94,.96,.86,.1,.03),e,{pos:[-.08,.54,-.04]}),x(W(.78,.8,.09,.07,.02),s,{pos:[-.08,.54,.39]}),x(W(.76,.78,.05,.05,.012),i.enamel(4938872,{rough:.3,metalness:.24}),{pos:[-.08,.54,-.47]}),x(new q(.042,.042,.16,12),n,{pos:[-.54,.76,.36]}),x(new q(.042,.042,.16,12),n,{pos:[-.54,.32,.36]}),x(new ot(.042,12,10),r,{pos:[.18,.82,.445],cast:!1}));for(let[l,u]of[[-.4,-.34],[.24,-.34],[-.4,.26],[.24,.26]])t.add(x(new q(.07,.08,.08,12),s,{pos:[l,.04,u]}));let a=new ct;a.position.set(-.08,.54,.47),a.add(x(new Wt(.2,.032,12,26),n),x(new q(.065,.065,.06,16),n,{rot:[Math.PI/2,0,0]}));for(let l=0;l<4;l++)a.add(x(new q(.02,.02,.38,8),n,{rot:[0,0,l*Math.PI/4]}));t.add(a);let c=new ct;c.position.set(.56,0,.28),c.rotation.y=-.32,c.add(x(W(.46,.42,.2,.07,.026),n,{pos:[0,.21,0]}),x(new Wt(.15,.042,12,24,Math.PI),i.metal(16769400,.18,.88),{pos:[0,.41,0]}),x(new q(.042,.042,.12,12),i.metal(16769400,.18,.88),{pos:[-.15,.39,0]}),x(new q(.042,.042,.12,12),i.metal(16769400,.18,.88),{pos:[.15,.39,0]}),x(new q(.042,.042,.03,12),i.clay(2629656),{pos:[0,.25,.1],rot:[Math.PI/2,0,0],cast:!1}),x(new Le(.034,.1,.03),i.clay(2629656),{pos:[0,.18,.1],cast:!1})),t.add(c);for(let[l,u,d]of[[.56,-.18,5],[.76,.02,3]])for(let h=0;h<d;h++)t.add(x(new q(.11,.11,.036,20),[n,o,o],{pos:[l,.02+h*.038,u]}));return Me(t,.82,.68,.008,.35,i),{group:he(t,8,"vault"),anim(l){a.rotation.z=Math.sin(l*.9)*.8}}}function lg(i){let t=new ct,e=i.clay(14480878,{rough:.5}),n=i.clay(16774885,{rough:.48}),s=i.metal(2055246,.36,.72),r=i.emissive(16770976,.62,1.85),o=i.clay(13938268,{rough:.54});t.add(x(W(1.82,.98,1.4,.06,.022),e,{pos:[0,.51,0]}),x(W(1.98,.13,1.56,.06,.022),n,{pos:[0,1.04,0]}));for(let u of[-.46,0,.46])for(let d of[-1,1])t.add(x(W(.32,.56,.05,.04,.01),n,{pos:[u,.56,d*.7]}),x(W(.24,.46,.06,.03,.008),r,{pos:[u,.56,d*.71],cast:!1}));t.add(x(W(2.04,.08,.42,.04,.012),n,{pos:[0,.06,.84]})),t.add(x(W(2.02,.045,.045,.01,.005),s,{pos:[0,.42,1.02]}));for(let u=-4;u<=4;u++)t.add(x(new q(.014,.014,.36,6),s,{pos:[u*.23,.24,1.02]})),u<4&&t.add(x(new Wt(.055,.011,6,12),s,{pos:[u*.23+.115,.26,1.02]}));for(let u of[-1,1])t.add(x(W(.045,.045,.38,.01,.005),s,{pos:[u,.42,.84]}),x(new q(.014,.014,.36,6),s,{pos:[u,.24,.84]}));t.add(x(new q(.14,.14,.03,16),i.gloss(16776696),{pos:[.58,.24,.86]}),x(new q(.025,.04,.18,10),s,{pos:[.58,.14,.86]}),x(new q(.065,.065,.05,12),o,{pos:[.58,.28,.86]}),x(new q(.075,.055,.12,12),i.clay(14052420),{pos:[-.68,.15,.86]}),x(new ot(.1,10,8),i.clay(3909732),{pos:[-.68,.25,.86]}));let a=new ct;a.position.set(-.92,.66,0);let c=[];return[{z:.24,tilt:.18,items:[{x:-.32,col:16739211,w:.22,h:.3},{x:-.64,col:6079743,w:.2,h:.28}]},{z:-.24,tilt:.12,items:[{x:-.36,col:16765516,w:.24,h:.26},{x:-.68,col:16774885,w:.18,h:.34}]}].forEach((u,d)=>{let h=x(new q(.018,.022,.96,8),o,{pos:[-.44,.08,u.z],rot:[0,0,Math.PI/2-u.tilt]});a.add(h),u.items.forEach((f,m)=>{let _=new ct;_.position.set(f.x,.08+(-f.x-.04)*Math.tan(u.tilt)*.45,u.z);let g=x(W(f.w,f.h,.045,.03,.01),i.fabric(f.col,{rough:.7}),{pos:[0,-f.h*.52,0]});f.w>=.2&&g.add(x(W(.07,.1,.04,.02,.008),i.fabric(f.col,{rough:.7}),{pos:[-f.w*.55,.06,0],rot:[0,0,.4]}),x(W(.07,.1,.04,.02,.008),i.fabric(f.col,{rough:.7}),{pos:[f.w*.55,.06,0],rot:[0,0,-.4]}));let p=x(new Le(.024,.055,.03),i.clay(10118196),{pos:[0,.01,0]});_.add(g,p),a.add(_),c.push({pivot:_,phase:d*1.7+m*.9})})}),t.add(a),{group:he(t,9,"laundry"),anim(u){for(let d of c)d.pivot.rotation.x=Math.sin(u*2.2+d.phase)*.18}}}function hg(i){let t=new ct,e=i.textured("stoneWall",{rough:.65}),n=i.enamel(14828344,{rough:.26}),s=i.enamel(16774886,{rough:.28}),r=i.metal(2633020,.34,.8),o=i.metal(15777348,.2,.86),a=i.emissive(16771194,1.35,3),c=i.emissive(16770168,.75,1.85,{transparent:!0,opacity:.28,depthWrite:!1,side:Ee});t.add(x(new q(.62,.7,.24,8),e,{pos:[0,.12,0]}),x(new q(.5,.56,.16,8),i.clay(14275269),{pos:[0,.32,0]}),x(W(.24,.32,.08,.08,.014),i.clay(8145446),{pos:[0,.56,.41]}),x(new ot(.022,8,8),o,{pos:[.06,.54,.46]}));let l=[{y:.54,h:.32,rB:.44,rT:.4,mat:s},{y:.86,h:.32,rB:.4,rT:.36,mat:n},{y:1.18,h:.32,rB:.36,rT:.325,mat:s},{y:1.5,h:.32,rB:.325,rT:.29,mat:n},{y:1.76,h:.2,rB:.29,rT:.275,mat:s}];for(let m of l)t.add(x(new q(m.rT,m.rB,m.h,24),m.mat,{pos:[0,m.y,0]}));t.add(x(W(.46,.28,.06,.04,.01),o,{pos:[0,1.16,.34]}),x(new Se(.4,.23),i.textured("badge18222",{finish:"glaze",rough:.22}),{pos:[0,1.16,.375],cast:!1}));for(let m of[Math.PI*.5,Math.PI,Math.PI*1.5])t.add(x(new Wt(.055,.016,8,14),o,{pos:[Math.sin(m)*.34,1.18,Math.cos(m)*.34],rot:[0,m,0]}));t.add(x(new q(.44,.3,.1,24),r,{pos:[0,1.9,0]}),x(new Wt(.41,.018,8,28),r,{pos:[0,2.08,0],rot:[Math.PI/2,0,0]}));for(let m=0;m<12;m++){let _=m*Math.PI*2/12;t.add(x(new q(.012,.012,.16,6),r,{pos:[Math.cos(_)*.41,2,Math.sin(_)*.41]}))}t.add(x(new q(.24,.24,.36,20),i.glass(15399167,.38),{pos:[0,2.13,0],cast:!1}),x(new ot(.14,16,14),a,{pos:[0,2.14,0],cast:!1}),x(new ot(.27,20,14,0,Math.PI*2,0,Math.PI*.55),n,{pos:[0,2.31,0]}),x(new q(.014,.025,.24,8),o,{pos:[0,2.66,0]}),x(new ot(.045,10,8),o,{pos:[0,2.57,0]}));let u=new ct;u.position.set(0,2.14,0);let d=new Ge(.46,2.1,18,1,!0),h=x(d,c,{pos:[0,0,1.15],rot:[-Math.PI/2,0,0],cast:!1,recv:!1}),f=x(d,c,{pos:[0,0,-1.15],rot:[Math.PI/2,0,0],cast:!1,recv:!1});return h.userData.ignoreBounds=!0,f.userData.ignoreBounds=!0,u.add(h,f),t.add(u),Me(t,.74,.74,.008,.36,i),{group:he(t,10,"lighthouse"),anim(m){u.rotation.y=m*1.15}}}function ug(i){let t=new ct,e=Ci(i,"jack",null,{noShadow:!0});e.group.position.set(-.28,.06,0),t.add(e.group),t.add(x(W(1.26,.06,.86,.1,.015),i.textured("woodPlank",{rough:.58}),{pos:[0,.03,0]}));let n=i.enamel(1349259,{rough:.26}),s=i.metal(15777348,.2,.86),r=i.textured("coinFace",{finish:"metal",rough:.2}),o=new ct;o.position.set(.32,.06,.04),o.rotation.y=-.24,o.add(x(W(.56,.32,.4,.04,.016),n,{pos:[0,.16,0]}),x(W(.58,.055,.42,.02,.008),s,{pos:[0,.06,0]}),x(W(.58,.055,.42,.02,.008),s,{pos:[0,.28,0]}),x(W(.11,.13,.04,.03,.008),i.emissive(4978120,.65,1.5),{pos:[0,.24,.21]}));let a=new ct;a.position.set(0,.32,-.18),a.rotation.x=-.58,a.add(x(new q(.2,.2,.56,16,1,!1,0,Math.PI),n,{pos:[0,0,.18],rot:[0,0,Math.PI/2]}),x(new Wt(.205,.02,8,16,Math.PI),s,{pos:[-.22,0,.18],rot:[0,Math.PI/2,0]}),x(new Wt(.205,.02,8,16,Math.PI),s,{pos:[.22,0,.18],rot:[0,Math.PI/2,0]})),o.add(a);for(let c=0;c<6;c++)o.add(x(new q(.085,.085,.032,16),[s,r,r],{pos:[-.14+c%3*.14,.31+Math.floor(c/3)*.034,-.04+c%2*.09],rot:[.18*(c%2?1:-1),c,.14]}));return t.add(o),Me(t,.72,.52,.008,.34,i),{group:he(t,11,"jack"),anim(c,l,u){e.anim(c,l,u)}}}function dg(i){let t=new ct,e=i.clay(15920380,{rough:.5}),n=i.clay(14183244,{rough:.48}),s=i.clay(10775612,{rough:.54}),r=i.emissive(16768900,.7,1.9),o=i.clay(3119692,{rough:.52}),a=i.gloss(16745496,{rough:.14}),c=i.textured("laisee",{finish:"lacquer",rough:.3});t.add(x(W(1.76,.98,1.36,.06,.022),e,{pos:[0,.5,0]}),x(W(1.92,.13,1.52,.06,.022),n,{pos:[0,1.04,0]}),x(W(.68,.14,.44,.03,.01),i.clay(3818070),{pos:[-.26,1.12,.22],rot:[.22,0,0]}),x(W(.58,.04,.36,.02,.006),r,{pos:[-.26,1.18,.23],rot:[.22,0,0],cast:!1}));for(let f of[-1,1])for(let m of[-.42,.24])t.add(x(W(.42,.48,.05,.05,.01),s,{pos:[m,.56,f*.68]}),x(W(.34,.4,.06,.04,.008),r,{pos:[m,.56,f*.69],cast:!1}));let l=new ct;l.position.set(1.06,.32,.12),l.rotation.set(-.22,.42,0),l.add(x(W(.36,.06,.34,.03,.01),s,{pos:[-.08,-.22,0]}),x(W(.36,.46,.1,.04,.014),i.clay(15459026),{pos:[0,.04,0]}),x(new Se(.3,.4),i.textured("calcScreen",{finish:"lacquer",rough:.28}),{pos:[0,.04,.055],cast:!1})),t.add(l);let u=new ct;u.position.set(.68,.04,.84),t.add(x(W(.62,.08,.46,.04,.012),i.clay(16774370),{pos:[.68,.04,.82]}));let d=Cn([[0,0],[.16,0],[.22,.26],[.25,.31],[.22,.33],[.18,.28],[0,.26]],20);u.add(x(d,i.clay(13589816,{rough:.54})),x(new q(.18,.18,.04,16),i.clay(5914152),{pos:[0,.26,0]}),x(De([[0,.26,0],[.04,.44,.02],[-.02,.62,-.02]],.042,12,8),i.clay(7227435)),x(new ot(.24,16,14),o,{pos:[0,.72,0]}),x(new ot(.19,14,12),i.clay(4371550),{pos:[.14,.66,.09]}),x(new ot(.18,14,12),o,{pos:[-.14,.65,-.06]}),x(new ot(.16,14,12),i.clay(4833124),{pos:[0,.86,.04]})),[[.16,.76,.18],[-.18,.73,.14],[.02,.92,.14],[.24,.64,-.02],[-.14,.82,-.14],[.1,.62,.22],[-.04,.7,-.22],[.18,.8,-.14]].forEach(([f,m,_])=>{u.add(x(new ot(.056,12,10),a,{pos:[f,m,_],scale:[1.08,.92,1.08]}))});for(let[f,m,_,g]of[[.24,.56,.16,.4],[-.22,.56,.12,-.5]])u.add(x(new Le(.08,.11,.015),c,{pos:[f,m,_],rot:[0,g,.12]}));return t.add(u),{group:he(t,12,"loft"),anim(f){u.rotation.z=Math.sin(f*1.8)*.025}}}function wc(i,t={}){let e=new ct,n=!!t.golden,s=n?i.enamel(10100772,{rough:.24}):i.textured("woodPlank",{finish:"lacquer",rough:.46}),r=n?i.metal(16763709,.18,.88):i.clay(8144932,{rough:.54}),o=n?i.metal(16763450,.22,.84):i.fabric(13577774,{rough:.72,side:Ee}),a=n?i.metal(10118162,.28,.8):i.clay(6043162,{rough:.58}),c=i.emissive(16760386,.95,2.3),l=new ct;l.position.y=.08;let u=x(W(1.72,.32,.66,.24,.05),s,{pos:[0,.18,0]}),d=x(W(.62,.22,.62,.12,.03),r,{pos:[-.52,.4,0],rot:[0,0,-.14]}),h=x(new Ge(.24,.42,12),r,{pos:[.92,.28,0],rot:[0,0,-Math.PI/2.4]}),f=x(W(.46,.24,.44,.04,.015),i.clay(9195050),{pos:[-.46,.58,0]}),m=x(new ot(.068,12,10),c,{pos:[-.74,.62,0],scale:[.9,1.25,.9],cast:!1});l.add(u,d,h,f,m);for(let v of[-1,1])l.add(x(new ot(.045,10,8),i.gloss(16777215),{pos:[.74,.24,v*.24],scale:[1,1,.4]}),x(new ot(.024,8,8),i.gloss(1776936),{pos:[.75,.24,v*.26],scale:[1,1,.4]}));if(n){let v=x(De([[.82,.3,0],[1.06,.52,0],[1.14,.68,0]],.06,14,8),r),y=x(new ot(.1,14,10),r,{pos:[1.18,.72,0],scale:[1.35,.9,.9]});l.add(v,y);for(let R=0;R<4;R++)l.add(x(new ot(.075,10,8),r,{pos:[.05+R*.14,.41,R%2?.12:-.12],scale:[1.3,.65,.85]}))}function _(v,y,R,T){let C=new ct;C.position.set(v,.34,0),C.rotation.z=T,C.add(x(new q(.026,.038,y+.18,10),a,{pos:[0,(y+.18)*.5,0]}));let P=5;for(let E=0;E<P;E++){let M=E/(P-1),I=.26+M*(y-.34),O=R*(1-M*.28),F=Math.sin(M*Math.PI)*.09;C.add(x(W(O,(y-.3)/P+.02,.026,.015,.005),o,{pos:[.04,I,F]}),x(new q(.012,.012,O+.06,6),a,{pos:[.04,I,F+.02],rot:[0,0,Math.PI/2]}))}return l.add(C),C}let g=_(.08,1.48,.86,.06),p=_(.6,1.06,.58,-.14);e.add(l);let S=i.glass(7202034,.58);for(let[v,y,R]of[[-.65,.38,1],[.55,-.36,.9],[.05,.44,.85]])e.add(x(new Wt(.18*R,.045*R,8,16,Math.PI),S,{pos:[v,.02,y],rot:[0,.4,0],cast:!1}));return{group:he(e,n?60:13,n?"treasure":"junk"),anim(v){l.position.y=.08+Math.sin(v*1.9)*.045,l.rotation.z=Math.sin(v*1.45)*.055,l.rotation.x=Math.cos(v*1.6)*.035,g.rotation.y=Math.sin(v*1.6)*.05,p.rotation.y=Math.sin(v*1.6+.6)*.06}}}function fg(i){let t=new ct,e=i.clay(16774366,{rough:.48}),n=i.clay(15762792,{rough:.48}),s=i.clay(10380086,{rough:.56}),r=i.clay(3450458,{rough:.52}),o=i.metal(16763708,.18,.86),a=i.emissive(16770938,1,2.5);t.add(x(W(1.94,.14,1.54,.08,.022),e,{pos:[0,.07,0]}),x(W(1.96,.18,.09,.03,.01),n,{pos:[0,.21,-.72]}),x(W(.09,.18,1.48,.03,.01),n,{pos:[-.92,.21,0]}),x(W(.09,.18,1.48,.03,.01),n,{pos:[.92,.21,0]}));for(let[h,f]of[[-.8,-.6],[.8,-.6],[-.8,.56],[.8,.56]])t.add(x(W(.11,1.24,.11,.02,.008),s,{pos:[h,.72,f]}));for(let h of[-.6,.56])t.add(x(W(1.88,.09,.11,.02,.008),s,{pos:[0,1.36,h]}));for(let h=-3;h<=3;h++)t.add(x(W(.08,.07,1.38,.015,.006),s,{pos:[h*.25,1.42,-.02]}));for(let[h,f,m]of[[-.82,1.38,.56],[.82,1.38,.56],[-.74,1.22,-.58],[.76,1.26,-.58],[0,1.46,-.58]])t.add(x(new ot(.14,10,8),r,{pos:[h,f,m]}),x(new ot(.1,10,8),i.clay(5227630),{pos:[h+.09,f-.08,m+.06]}));t.add(x(new Wt(.56,.042,12,28,Math.PI),o,{pos:[0,1.38,.56]}));let c=[];for(let h=0;h<7;h++){let f=h/6,m=-.72+f*1.44,_=Math.sin(f*Math.PI)*.14,g=x(new ot(.044,10,8),a,{pos:[m,1.3-_,.58],cast:!1});c.push(g),t.add(g)}let l=Ci(i,"jackie",null,{noShadow:!0});l.group.position.set(-.22,.14,.14),l.group.scale.setScalar(.86),t.add(l.group);let u=Ws(i,"halo"),d=new ct;return d.position.set(.38,.86,.14),d.scale.setScalar(1.15),d.add(u.group),t.add(x(new q(.2,.24,.36,18),i.clay(16773842),{pos:[.38,.32,.14]}),x(new Wt(.21,.022,8,20),o,{pos:[.38,.5,.14],rot:[Math.PI/2,0,0]}),d),{group:he(t,14,"sprint14"),anim(h,f,m){l.anim(h,f,m),u.anim&&u.anim(h,f,m),c.forEach((_,g)=>{_.scale.setScalar(.85+.28*Math.sin(h*3.8+g*1.1))})}}}function We(i,t){switch(i){case 1:return eg(t);case 2:return ng(t);case 3:return ig(t);case 4:return sg(t);case 5:return rg(t);case 6:return og(t);case 7:return ag(t);case 8:return cg(t);case 9:return lg(t);case 10:return hg(t);case 11:return ug(t);case 12:return dg(t);case 13:return wc(t);case 14:return fg(t);default:return null}}function pg(i,t={}){let e=new ct,n=i.enamel(14829372,{rough:.26}),s=i.enamel(16774886,{rough:.28}),r=i.metal(15777348,.2,.86),o=i.emissive(4585396,1,2.5),a=new ct;a.position.y=.08,a.add(x(new q(.36,.42,.24,22),n,{pos:[0,.14,0]}),x(new Wt(.4,.045,10,24),s,{pos:[0,.24,0],rot:[Math.PI/2,0,0]}),x(new q(.022,.026,.72,8),r,{pos:[.16,.56,.16],rot:[-.22,0,.22]}),x(new q(.022,.026,.72,8),r,{pos:[-.16,.56,.16],rot:[-.22,0,-.22]}),x(new q(.022,.026,.72,8),r,{pos:[.16,.56,-.16],rot:[.22,0,.22]}),x(new q(.022,.026,.72,8),r,{pos:[-.16,.56,-.16],rot:[.22,0,-.22]}),x(new q(.14,.16,.06,16),n,{pos:[0,.9,0]}),x(new ot(.08,12,10),o,{pos:[0,1,0],cast:!1}));let c=x(Cn([[0,0],[.13,0],[.11,.08],[.08,.19],[.03,.24],[0,.24]],18),r,{pos:[0,.56,0]});a.add(c),e.add(a);let l=i.clay(16645110,{rough:.44}),u=i.clay(5924986,{rough:.48}),d=i.clay(16754222,{rough:.4}),h=t.island?2.6:.74,f=t.island?3.2:1.38,m=[];for(let _=0;_<3;_++){let g=new ct;g.add(x(new ot(.085,14,10),l,{scale:[.82,.76,1.55]}),x(new ot(.058,12,10),l,{pos:[0,.035,.12]}),x(new Ge(.024,.085,8),d,{pos:[0,.025,.195],rot:[Math.PI/2,0,0]}),x(W(.09,.018,.09,.01,.004),u,{pos:[0,.01,-.14]}));let p=new ct;p.position.set(-.06,.02,.02),p.add(x(W(.22,.024,.09,.014,.005),l,{pos:[-.11,0,0]}),x(W(.14,.02,.075,.01,.004),u,{pos:[-.26,-.015,-.01],rot:[0,.15,-.18]}));let S=new ct;S.position.set(.06,.02,.02),S.add(x(W(.22,.024,.09,.014,.005),l,{pos:[.11,0,0]}),x(W(.14,.02,.075,.01,.004),u,{pos:[.26,-.015,-.01],rot:[0,-.15,.18]})),g.add(p,S),t.island&&(g.userData.ignoreBounds=!0),e.add(g),m.push({bird:g,wingL:p,wingR:S,phase:_*Math.PI*2/3,yOff:(_-1)*.18})}return{group:he(e,18,"gulls"),anim(_){a.position.y=.08+Math.sin(_*2.2)*.05,a.rotation.z=Math.sin(_*1.7)*.1,c.rotation.z=-Math.sin(_*1.7)*.24;for(let g of m){let p=_*.65+g.phase;g.bird.position.set(Math.cos(p)*h,f+g.yOff+Math.sin(_*2.4+g.phase)*.1,Math.sin(p)*h),g.bird.rotation.y=-p,g.bird.rotation.z=.18;let S=Math.sin(_*6.5+g.phase*2)*.42;g.wingL.rotation.z=S,g.wingR.rotation.z=-S}}}}function mg(i){let t=new ct,e=i.clay(2635110,{rough:.4}),n=i.metal(2663594,.28,.72),s=i.metal(16107596,.22,.84),r=i.emissive(4978920,.85,2.3),o=i.emissive(16769128,.85,2.3),a=i.emissive(5044202,.55,1.5,{transparent:!0,opacity:.2,depthWrite:!1,side:Ee}),c=i.emissive(16769390,.55,1.5,{transparent:!0,opacity:.2,depthWrite:!1,side:Ee});t.add(x(W(1.06,.22,.9,.06,.02),i.clay(3819640),{pos:[0,.11,0]}),x(W(.84,1.15,.72,.05,.02),e,{pos:[0,.78,0]}),x(W(.62,.85,.54,.05,.018),e,{pos:[0,1.72,0]}),x(W(.4,.48,.36,.04,.014),n,{pos:[0,2.34,0]}),x(new Ge(.24,.46,4),s,{pos:[0,2.8,0],rot:[0,Math.PI/4,0]}),x(new q(.016,.032,.55,10),s,{pos:[0,3.24,0]}),x(new ot(.065,12,10),o,{pos:[0,3.52,0],cast:!1}));for(let d=0;d<4;d++){let h=.42+d*.24;t.add(x(W(.87,.055,.75,.02,.005),d%2?o:r,{pos:[0,h,0],cast:!1}))}for(let d=0;d<3;d++){let h=1.48+d*.24;t.add(x(W(.65,.05,.57,.02,.005),d%2?r:o,{pos:[0,h,0],cast:!1}))}let l=x(new Ge(.55,2.4,16,1,!0),a,{pos:[-.24,3.2,0],rot:[0,0,Math.PI+.24],cast:!1,recv:!1}),u=x(new Ge(.55,2.4,16,1,!0),c,{pos:[.24,3.2,0],rot:[0,0,Math.PI-.24],cast:!1,recv:!1});return l.userData.ignoreBounds=!0,u.userData.ignoreBounds=!0,t.add(l,u),Me(t,.68,.6,.008,.36,i),{group:he(t,21,"twilight"),anim(d){l.rotation.z=Math.PI+.26+Math.sin(d*.9)*.16,u.rotation.z=Math.PI-.26+Math.cos(d*.85)*.16}}}function gg(i){let t=new ct,e=i.textured("woodPlank",{finish:"lacquer",rough:.44}),n=i.clay(9328946,{rough:.5}),s=i.metal(15777348,.22,.84),r=i.textured("stripeCoral",{finish:"fabric",rough:.7,side:Ee}),o=i.gloss(16776694,{rough:.16}),a=i.metal(3817551,.36,.76);t.add(x(new q(.82,.86,.1,24),e,{pos:[0,.05,0]})),t.add(x(new q(.16,.22,.06,16),a,{pos:[0,.12,0]}),x(new q(.04,.04,.54,12),a,{pos:[0,.4,0]}),x(new q(.46,.46,.05,24),o,{pos:[0,.68,0]}),x(new Wt(.46,.02,8,28),s,{pos:[0,.68,0],rot:[Math.PI/2,0,0]}),x(new q(.03,.034,1.54,12),n,{pos:[0,.96,0]}),x(new Ge(.92,.36,8),r,{pos:[0,1.66,0]}),x(new ot(.065,12,10),s,{pos:[0,1.86,0]})),[1807996,15886411,16762941].forEach((h,f)=>{let m=f*Math.PI*2/3+.4,_=Math.cos(m)*.56,g=Math.sin(m)*.56,p=new ct;p.position.set(_,.1,g),p.add(x(new q(.145,.135,.05,16),i.gloss(h,{rough:.32}),{pos:[0,.34,0]}),x(new q(.018,.02,.34,8),a,{pos:[-.07,.17,-.07],rot:[.1,0,-.1]}),x(new q(.018,.02,.34,8),a,{pos:[.07,.17,-.07],rot:[.1,0,.1]}),x(new q(.018,.02,.34,8),a,{pos:[-.07,.17,.07],rot:[-.1,0,-.1]}),x(new q(.018,.02,.34,8),a,{pos:[.07,.17,.07],rot:[-.1,0,.1]})),t.add(p)});let l=i.glass(16771276,.45),u=i.gloss(13200414,{rough:.18}),d=i.clay(16769346,{rough:.38});for(let[h,f,m]of[[.2,.14,1],[-.18,.2,.94]]){let _=new ct;_.position.set(h,.71,f),_.scale.setScalar(m),_.add(x(new q(.068,.052,.19,14),l,{pos:[0,.095,0],cast:!1}),x(new q(.058,.044,.145,14),u,{pos:[0,.08,0]}),x(new q(.048,.048,.014,12),d,{pos:[.01,.135,.01],rot:[.4,.2,.3]}),x(new q(.009,.009,.25,6),i.clay(16732754),{pos:[.02,.14,-.01],rot:[.1,0,-.22]})),t.add(_)}return Me(t,.88,.88,.008,.34,i),{group:he(t,25,"umbrella"),anim(h){t.children[5].rotation.y=Math.sin(h*.9)*.04}}}function xg(i,t={}){let e=new ct,n=i.enamel(1469758,{rough:.22}),s=i.enamel(16774622,{rough:.24}),r=i.clay(2962752,{rough:.5}),o=i.metal(15777348,.2,.86),a=i.metal(4607580,.34,.8),c=i.emissive(16770452,.65,1.9),l=i.emissive(16774590,1,2.6),u=i.textured("tramSign",{finish:"glaze",rough:.22});for(let h of[-.26,.26])e.add(x(new Le(1.96,.035,.04),a,{pos:[0,.04,h]}));for(let h=-4;h<=4;h++)e.add(x(new Le(.08,.03,.72),i.clay(8213814),{pos:[h*.22,.018,0]}));let d=new ct;d.position.y=.06;for(let[h,f]of[[-.46,-.26],[-.46,.26],[.46,-.26],[.46,.26]])d.add(x(new q(.11,.11,.05,16),a,{pos:[h,.11,f],rot:[Math.PI/2,0,0]}));d.add(x(W(1.56,.54,.66,.08,.025),n,{pos:[0,.45,0]}),x(W(1.6,.24,.69,.06,.016),s,{pos:[0,.82,0]}),x(W(1.56,.48,.66,.08,.024),n,{pos:[0,1.16,0]}),x(W(1.64,.11,.72,.1,.028),r,{pos:[0,1.44,0]}),x(new Se(1.22,.2),u,{pos:[0,.82,.35],cast:!1}),x(new Se(1.22,.2),u,{pos:[0,.82,-.35],rot:[0,Math.PI,0],cast:!1}));for(let h=-2;h<=2;h++)for(let f of[-1,1])d.add(x(W(.22,.24,.03,.025,.005),c,{pos:[h*.27,.52,f*.33],cast:!1}),x(W(.22,.24,.03,.025,.005),c,{pos:[h*.27,1.18,f*.33],cast:!1}));for(let h of[-1,1])d.add(x(W(.03,.24,.44,.03,.006),c,{pos:[h*.78,.54,0],cast:!1}),x(W(.03,.24,.44,.03,.006),c,{pos:[h*.78,1.18,0],cast:!1}),x(new q(.06,.065,.06,14),o,{pos:[h*.8,.32,0],rot:[0,0,Math.PI/2]}),x(new ot(.048,10,8),l,{pos:[h*.82,.32,0],cast:!1}),x(W(.12,.07,.56,.03,.01),a,{pos:[h*.81,.19,0]}));if(d.add(x(new q(.04,.055,.12,12),o,{pos:[0,1.54,0]}),x(new q(.014,.018,.62,8),a,{pos:[-.18,1.76,0],rot:[0,0,.68]}),x(new q(.025,.025,.16,8),o,{pos:[-.39,1.98,0],rot:[Math.PI/2,0,0]})),e.add(d),!t.island){let h=Ws(i,"straw");h.group.position.set(.42,1.54,0),h.group.scale.setScalar(.86),h.group.rotation.z=-.14,d.add(h.group)}return Me(e,1.05,.5,.008,.34,i),{group:he(e,30,"tram"),anim(h){d.position.x=Math.sin(h*1.1)*.12,d.position.y=.06+Math.abs(Math.sin(h*4.4))*.008}}}function _g(i){let t=new ct,e=i.clay(8142374,{rough:.52}),n=i.metal(15777348,.22,.84),s=i.emissive(16731192,.8,2.25),r=i.clay(16764746,{rough:.45});for(let l of[-.95,.95])t.add(x(new q(.1,.13,.14,14),i.clay(14209220),{pos:[l,.07,0]}),x(new q(.052,.06,1.62,14),e,{pos:[l,.92,0]}),x(new ot(.08,12,10),n,{pos:[l,1.76,0]}),x(W(.24,.06,.12,.02,.008),e,{pos:[l,1.64,0]}));let o=[];for(let l=0;l<=16;l++){let u=l/16,d=-.95+u*1.9,h=1.64-Math.sin(u*Math.PI)*.28;o.push([d,h,0])}t.add(x(De(o,.018,22,8),n));let a=[],c=Cn([[0,-.15],[.06,-.15],[.13,-.09],[.155,0],[.13,.09],[.06,.15],[0,.15]],18);for(let l=0;l<5;l++){let u=(l+1)/6,d=-.95+u*1.9,h=1.64-Math.sin(u*Math.PI)*.28,f=new ct;f.position.set(d,h,0),f.add(x(new q(.008,.008,.16,6),n,{pos:[0,-.08,0]}),x(new q(.072,.072,.036,14),n,{pos:[0,-.17,0]}),x(c,s,{pos:[0,-.32,0],cast:!1}),x(new q(.072,.072,.036,14),n,{pos:[0,-.47,0]}),x(new q(.022,.034,.16,8),r,{pos:[0,-.57,0]})),t.add(f),a.push({pivot:f,phase:l*.9})}return Me(t,1.05,.34,.008,.3,i),{group:he(t,35,"lanterns"),anim(l){for(let u of a)u.pivot.rotation.z=Math.sin(l*2.1+u.phase)*.14,u.pivot.rotation.x=Math.cos(l*1.6+u.phase)*.08}}}function yg(i){let t=new ct,e=i.textured("stoneWall",{rough:.62}),n=i.textured("brick",{rough:.56}),s=i.clay(15919318,{rough:.48}),r=i.metal(4958354,.28,.55),o=i.metal(15777348,.2,.86),a=i.textured("clockFace",{finish:"glaze",rough:.2,emissive:!0,baseEmissive:.25,nightEmissive:1.05});t.add(x(W(1.06,.24,1.06,.05,.02),e,{pos:[0,.12,0]}),x(W(.92,.44,.92,.04,.018),e,{pos:[0,.44,0]}),x(W(.32,.38,.08,.1,.014),i.clay(6043168),{pos:[0,.42,.46]}),x(W(.98,.1,.98,.04,.015),s,{pos:[0,.68,0]})),t.add(x(W(.76,1.44,.76,.03,.014),n,{pos:[0,1.44,0]}));for(let[l,u]of[[-.36,-.36],[.36,-.36],[-.36,.36],[.36,.36]])t.add(x(W(.11,1.44,.11,.02,.008),s,{pos:[l,1.44,u]}));let c=i.emissive(16769428,.45,1.6);for(let l=0;l<4;l++){let u=l*Math.PI/2,d=new ct;d.rotation.y=u,d.add(x(W(.18,.32,.04,.07,.008),c,{pos:[0,1.42,.385],cast:!1})),t.add(d)}t.add(x(W(.9,.1,.9,.04,.014),s,{pos:[0,2.2,0]}),x(W(.82,.66,.82,.04,.016),s,{pos:[0,2.58,0]}),x(W(.92,.1,.92,.04,.016),s,{pos:[0,2.94,0]}));for(let l=0;l<4;l++){let u=l*Math.PI/2,d=new ct;d.rotation.y=u,d.add(x(new Wt(.25,.028,10,24),o,{pos:[0,2.58,.415]}),x(new q(.24,.24,.02,24),[o,a,a],{pos:[0,2.58,.412],rot:[Math.PI/2,0,0],cast:!1})),t.add(d)}for(let l=0;l<8;l++){let u=l*Math.PI*2/8;t.add(x(new q(.032,.036,.36,10),s,{pos:[Math.cos(u)*.28,3.16,Math.sin(u)*.28]}))}return t.add(x(new q(.32,.34,.08,16),s,{pos:[0,3.36,0]}),x(new ot(.31,20,14,0,Math.PI*2,0,Math.PI*.55),r,{pos:[0,3.4,0]}),x(new q(.018,.042,.46,10),o,{pos:[0,3.86,0]}),x(new ot(.055,10,8),o,{pos:[0,3.74,0]})),Me(t,.72,.72,.008,.36,i),{group:he(t,45,"clock"),anim:null}}function vg(i){return wc(i,{golden:!0})}function Mg(i){let t=new ct,e=i.clay(3909732,{rough:.56}),n=i.clay(2655308,{rough:.56}),s=i.clay(12103328,{rough:.62}),r=i.clay(14238264,{rough:.46}),o=i.clay(14248760,{rough:.48}),a=i.metal(15777348,.24,.84);t.add(x(new ot(1.12,20,14,0,Math.PI*2,0,Math.PI*.55),e,{pos:[0,0,0],scale:[1.35,.85,.92]}),x(new ot(.68,18,14),s,{pos:[-.36,.72,.04],scale:[1.05,1.15,.85]}),x(new ot(.74,18,14),e,{pos:[.34,.56,-.04],scale:[1.28,.85,.88]}),x(new ot(.48,14,12),s,{pos:[-.74,.48,.12],scale:[1.1,.78,.8]}));for(let u=0;u<6;u++)t.add(x(W(.22,.05,.14,.02,.006),i.clay(15064528),{pos:[.82-u*.14,.14+u*.16,.54-u*.06],rot:[0,-.35,0]}));[[-.95,.34,.42],[.95,.36,.28],[.58,.76,-.45],[-.12,.68,.56],[.22,.86,.38]].forEach(([u,d,h],f)=>{t.add(x(new q(.025,.035,.18,6),i.clay(8146474),{pos:[u,d,h]}),x(new Ge(.14,.28,8),f%2?n:e,{pos:[u,d+.18,h]}))});let l=new ct;l.position.set(-.34,1.38,.04),l.add(x(new q(.38,.42,.1,6),i.clay(15064528),{pos:[0,.05,0]}),x(new Ge(.5,.24,6),o,{pos:[0,.52,0]}),x(new Ge(.32,.22,6),o,{pos:[0,.72,0]}),x(new ot(.055,10,8),a,{pos:[0,.86,0]}),x(new ot(.075,10,8),i.emissive(16765528,.7,1.8),{pos:[0,.34,0],cast:!1}));for(let u=0;u<6;u++){let d=u*Math.PI*2/6;l.add(x(new q(.024,.026,.36,8),r,{pos:[Math.cos(d)*.28,.26,Math.sin(d)*.28]}))}return t.add(l),Me(t,1.38,.96,.008,.36,i),{group:he(t,75,"lionrock"),anim:null}}function Sg(i){let t=new ct,e=i.clay(3578460,{rough:.56}),n=i.enamel(16775146,{rough:.24}),s=i.enamel(1478021,{rough:.26}),r=i.emissive(8122111,.55,1.75),o=i.enamel(14234156,{rough:.22}),a=i.metal(15777348,.2,.86);t.add(x(new q(.84,1.18,.68,24),e,{pos:[0,.34,0]}),x(new ot(.24,12,10),i.clay(5027950),{pos:[-.74,.52,.48]}),x(new ot(.22,12,10),i.clay(2982988),{pos:[.78,.46,-.44]})),t.add(x(W(1.02,.42,.66,.06,.02),n,{pos:[0,.86,0]}),x(W(.88,.28,.69,.04,.01),r,{pos:[0,.88,0],cast:!1}),x(W(1.42,.16,.72,.08,.025),n,{pos:[0,1.14,0]}),x(W(1.74,.16,.76,.12,.028),s,{pos:[0,1.3,0]}),x(W(1.94,.12,.82,.14,.026),n,{pos:[0,1.44,0]}),x(W(1.66,.1,.79,.04,.01),r,{pos:[0,1.3,0],cast:!1}));for(let u of[-.52,.52])t.add(x(new q(.018,.026,.18,8),a,{pos:[u,1.58,.28]}),x(new q(.026,.02,.14,10),a,{pos:[u,1.67,.3],rot:[Math.PI/2-.15,0,0]}));let c=x(W(.28,.05,1.24,.02,.008),i.clay(5396582),{pos:[.84,.42,.42],rot:[-.52,.22,0]}),l=new ct;return l.add(x(W(.24,.2,.46,.04,.012),o,{pos:[0,.12,0]}),x(W(.25,.09,.36,.02,.006),i.emissive(16771222,.7,1.8),{pos:[0,.14,0],cast:!1}),x(W(.25,.04,.48,.02,.006),n,{pos:[0,.23,0]})),l.rotation.set(-.52,.22,0),t.add(c,l),Me(t,1.18,1.02,.008,.36,i),{group:he(t,90,"peaktram"),anim(u){let d=Math.sin(u*.9)*.28;l.position.set(.84+d*.18,.45-d*.5,.42+d*.85)}}}function bg(i){let t=new ct,e=i.gloss(16775920,{rough:.16}),n=i.metal(16106557,.18,.88),s=i.textured("trophy100",{finish:"metal",rough:.2}),r=i.emissive(16770936,1,2.4);t.add(x(new q(.76,.84,.16,8),e,{pos:[0,.08,0]}),x(new q(.62,.68,.52,8),e,{pos:[0,.42,0]}),x(new q(.68,.64,.1,8),n,{pos:[0,.72,0]}),x(new Wt(.64,.028,10,28),n,{pos:[0,.18,0],rot:[Math.PI/2,0,0]}),x(W(.56,.24,.05,.03,.01),n,{pos:[0,.42,.62]}),x(new Se(.5,.19),s,{pos:[0,.42,.648],cast:!1}));let o=hs(i,"tophat",{golden:!0,noShadow:!0});o.group.position.set(0,.78,0),o.group.scale.setScalar(.86),t.add(o.group);let a=[];for(let c=0;c<4;c++){let l=x(new Wn(.065,0),r,{cast:!1});t.add(l),a.push({m:l,phase:c*Math.PI/2})}return Me(t,.88,.88,.008,.36,i),{group:he(t,100,"centennial"),anim(c,l,u){o.anim(c,l,{mood:"proud"});for(let d of a){let h=c*1.15+d.phase;d.m.position.set(Math.cos(h)*.82,1.38+Math.sin(c*3+d.phase)*.16,Math.sin(h)*.82),d.m.rotation.y=c*2.5}}}}function Ec(i,t){let e=new ct,n=[16773836,14677480,16770262,14872319,15918847],s=[1349259,15232072,3896004,9329604,13932066],r=Math.max(0,i-15)%n.length,o=t.clay(n[r],{rough:.5}),a=t.clay(s[r],{rough:.46}),c=t.emissive(16770454,.65,1.9);e.add(x(W(1.74,.94,1.34,.06,.022),o,{pos:[0,.48,0]}),x(W(1.88,.12,1.48,.06,.02),a,{pos:[0,.99,0]}));for(let l of[-1,1])for(let u of[-.46,0,.46])e.add(x(W(.32,.42,.05,.04,.01),a,{pos:[u,.52,l*.67]}),x(W(.24,.34,.06,.03,.008),c,{pos:[u,.52,l*.68],cast:!1}));for(let l of[-.46,.46])e.add(x(W(.32,.1,.14,.02,.008),t.clay(13132858),{pos:[l,.25,.74]}),x(new ot(.08,10,8),t.clay(3909732),{pos:[l-.06,.34,.74]}),x(new ot(.075,10,8),t.clay(16743836),{pos:[l+.06,.34,.74]}));return{group:he(e,i,"brick_"+i),anim:null}}function Tc(i,t){let e=Math.max(1,Math.floor((i-100)/14)),n=new ct,s=t.metal(16106557,.22,.84),r=t.clay(1346692,{rough:.42}),o=t.emissive(16771204,.85,2.25);n.add(x(W(.84,.2,.84,.06,.02),r,{pos:[0,.1,0]}),x(W(.64,1.38,.64,.06,.02),s,{pos:[0,.88,0]}),x(W(.46,.68,.46,.05,.016),r,{pos:[0,1.88,0]}),x(new Ge(.28,.56,6),s,{pos:[0,2.5,0]}),x(new ot(.08,12,10),o,{pos:[0,2.82,0],cast:!1}));for(let a=0;a<4;a++)n.add(x(W(.67,.07,.67,.02,.006),o,{pos:[0,.44+a*.3,0],cast:!1}));for(let a=0;a<4;a++){let c=a*Math.PI/2+.4;n.add(x(new ot(.11,10,8),t.clay(3909732),{pos:[Math.cos(c)*.32,1.62,Math.sin(c)*.32]}))}return Me(n,.54,.54,.008,.34,t),{group:he(n,i,"wing_"+e),anim:null}}function un(i,t,e={}){switch(i){case 18:return pg(t,e);case 21:return mg(t);case 25:return gg(t);case 30:return xg(t,e);case 35:return _g(t);case 45:return yg(t);case 60:return vg(t);case 75:return Mg(t);case 90:return Sg(t);case 100:return bg(t);default:return i>100&&(i-100)%14===0?Tc(i,t):i>14?Ec(i,t):null}}var us=.22,ds=1.18,Re={day:{bg:9230327,fog:12446455,fogDensity:.011,hemiSky:16775920,hemiGround:6338756,hemiInt:1.05,keyColor:16774366,keyInt:1.75,keyPos:[8.5,13.5,9],rimColor:16769220,rimInt:.72,ambInt:.24,nightGlow:0,nightFactor:0,cloudCol:16776696,starOpacity:0,sunY:14.5,sunVisible:!0,moonVisible:!1},dusk:{bg:15108986,fog:15703940,fogDensity:.013,hemiSky:16765352,hemiGround:6049674,hemiInt:.92,keyColor:16754794,keyInt:1.65,keyPos:[11.5,6.8,7.5],rimColor:12752127,rimInt:.95,ambInt:.22,nightGlow:1.45,nightFactor:.58,cloudCol:16763824,starOpacity:.42,sunY:5.5,sunVisible:!0,moonVisible:!1},night:{bg:1450319,fog:1713752,fogDensity:.014,hemiSky:6455512,hemiGround:1977176,hemiInt:.78,keyColor:10929407,keyInt:1.25,keyPos:[-7.5,12.5,8.5],rimColor:5691624,rimInt:.9,ambInt:.22,nightGlow:2.6,nightFactor:1,cloudCol:6123430,starOpacity:.95,sunY:-10,sunVisible:!1,moonVisible:!0}},Xs=null,gh=!1;function xh(){if(Xs!==null)return Xs;try{let i=document.createElement("canvas"),t=i.getContext("webgl2")||i.getContext("webgl")||i.getContext("experimental-webgl");if(Xs=!!t,t){let e="";try{let s=t.getExtension("WEBGL_debug_renderer_info");e=String(s?t.getParameter(s.UNMASKED_RENDERER_WEBGL)||"":t.getParameter(t.RENDERER)||"")}catch{}gh=/SwiftShader|llvmpipe|Software|Mesa|Basic Render/i.test(e);let n=t.getExtension("WEBGL_lose_context");n&&n.loseContext()}}catch{Xs=!1}return Xs}function mh(i){return i>=100?"tophat":i>=30?"straw":i>=14?"halo":null}function wg(i){i.updateMatrixWorld(!0);let t=new En,e=new En;return i.traverse(n=>{!n.isMesh||!n.visible||n.userData.ignoreBounds||(n.geometry.boundingBox||n.geometry.computeBoundingBox(),e.copy(n.geometry.boundingBox).applyMatrix4(n.matrixWorld),t.union(e))}),t.isEmpty()&&t.set(new D(-.5,0,-.5),new D(.5,1,.5)),t}function oo(i){i.traverse(t=>{t.isMesh&&t.geometry&&!t.userData.sharedGeo&&t.geometry.dispose()})}function Eg(i){let t=new ct,e=i.enamel(7225633,{rough:.28,metalness:.06}),n=i.clay(5386264,{rough:.44}),s=i.metal(15777348,.2,.86),r=i.textured("coasterDial",{finish:"lacquer",rough:.34}),o=i.emissive(8181503,.75,1.5,{transparent:!0,opacity:.65});t.add(x(new q(1.74,1.84,.16,48),[e,r,n],{pos:[0,.08,0],cast:!1,recv:!0}),x(new Wt(1.75,.048,14,56),s,{pos:[0,.155,0],rot:[Math.PI/2,0,0]}),x(new Wt(1.68,.02,10,56),s,{pos:[0,.164,0],rot:[Math.PI/2,0,0],cast:!1}),x(new Wt(1.85,.032,10,56),n,{pos:[0,.02,0],rot:[Math.PI/2,0,0],cast:!1}));for(let c=0;c<8;c++){let l=c*Math.PI*2/8;t.add(x(new ot(.03,10,8),s,{pos:[Math.cos(l)*1.81,.09,Math.sin(l)*1.81],cast:!1}))}let a=x(new Wt(1.64,.03,10,48),o,{pos:[0,.18,0],rot:[Math.PI/2,0,0],cast:!1});return a.visible=!1,t.add(a),Me(t,2.25,2.25,-.01,.36,i),{group:t,lockRing:a}}function Tg(i){let t=new ct,e={day:ro("day"),dusk:ro("dusk"),night:ro("night")},n=new oi({map:e.day,side:ke,depthWrite:!1,fog:!1}),s=new Ne(new ot(46,32,20),n);t.add(s);let r=i.clay(16776696,{rough:.65,noBump:!0}),o=[];[{a:.35,r:24,y:3.4,s:1.35},{a:1.45,r:26,y:5.6,s:1.15},{a:2.55,r:25,y:2.8,s:1.3},{a:3.75,r:27,y:4.8,s:1.25},{a:4.85,r:24,y:3.8,s:1.1},{a:5.75,r:26,y:6.2,s:1}].forEach(p=>{let S=new ct;S.add(x(new ot(1.15,14,12),r,{scale:[1.3,.78,.92],cast:!1,recv:!1}),x(new ot(.85,12,10),r,{pos:[1,-.1,.15],scale:[1.1,.75,.85],cast:!1,recv:!1}),x(new ot(.78,12,10),r,{pos:[-.95,-.15,-.1],scale:[1.15,.72,.88],cast:!1,recv:!1}),x(new ot(.68,12,10),r,{pos:[.22,.45,-.05],scale:[1.1,.82,.85],cast:!1,recv:!1})),S.scale.setScalar(p.s),t.add(S),o.push({cg:S,...p})});let c=x(new ot(1.9,20,16),i.emissive(16770682,1.1,1.1),{pos:[-11.5,4.8,-26],cast:!1,recv:!1});t.add(c);let l=new ct;l.position.set(7.4,6.2,-9.2),l.rotation.y=-.35,l.add(x(new Wt(.92,.3,12,26,Math.PI*1.28),i.emissive(16773542,1.4,1.75),{rot:[0,0,Math.PI*.62],cast:!1,recv:!1})),l.visible=!1,t.add(l);let u=320,d=new Float32Array(u*3),h=9001,f=()=>(h=Math.imul(1664525,h)+1013904223>>>0,h/4294967296);for(let p=0;p<u;p++){let S=f()*Math.PI*2,v=.42+f()*1.42,y=28+f()*8;d[p*3]=y*Math.sin(v)*Math.cos(S),d[p*3+1]=y*Math.cos(v)+1.2,d[p*3+2]=y*Math.sin(v)*Math.sin(S)}let m=new Fe;m.setAttribute("position",new Ze(d,3));let _=new Us({color:16775378,size:.78,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),g=new Vr(m,_);return t.add(g),{group:t,setSky(p){let S=Re[p]||Re.day;n.map=e[p]||e.day,n.needsUpdate=!0,r.color.setHex(S.cloudCol),c.visible=S.sunVisible,c.position.y=p==="dusk"?1.8:4.8,l.visible=S.moonVisible,_.opacity=S.starOpacity},anim(p,S){let v=S?0:.022;for(let y of o){let R=y.a+p*v;y.cg.position.set(Math.cos(R)*y.r,y.y+Math.sin(p*.6+y.a)*.25,Math.sin(R)*y.r),y.cg.lookAt(0,y.y,0)}_.opacity>.01&&!S&&(_.size=.44+Math.sin(p*2.4)*.07)},dispose(){Object.values(e).forEach(p=>p.dispose()),s.geometry.dispose(),n.dispose(),m.dispose(),_.dispose()}}}function Ag(i){let t=new ct;t.visible=!1;let e=i.emissive(3993768,.9,1.9,{transparent:!0,opacity:.55,depthWrite:!1}),n=i.emissive(16769126,.85,1.85,{transparent:!0,opacity:.45,depthWrite:!1}),s=i.clay(3057242,{rough:.42}),r=i.clay(4837230,{rough:.38}),o=i.emissive(16769902,.9,2),a=x(new Wt(1.55,.045,10,48),e,{rot:[Math.PI/2,0,0],cast:!1,recv:!1}),c=x(new Wt(1.95,.035,10,48),n,{rot:[Math.PI/2,0,0],cast:!1,recv:!1});t.add(a,c);let l=new ct;l.position.set(0,.05,0);let u=x(De([[0,0,0],[.04,.45,.02],[-.02,.95,0]],.055,14,10),s),d=x(new ot(.24,14,10),r,{pos:[-.22,.62,.04],rot:[.15,.2,.58],scale:[1.45,.42,.78]}),h=x(new ot(.24,14,10),r,{pos:[.22,.72,-.02],rot:[-.1,-.2,-.58],scale:[1.45,.42,.78]}),f=x(new Wn(.18,1),o,{pos:[-.02,1.06,0],cast:!1});l.add(u,d,h,f),t.add(l);let m=[];for(let g=0;g<8;g++){let p=x(new ot(.055,8,8),g%2?n:e,{cast:!1,recv:!1});t.add(p),m.push({m:p,phase:g/8,rad:1.15+g%3*.35})}let _=0;return{group:t,setProgress(g){_=Math.max(0,Math.min(1,Number(g)||0)),t.visible=_>.005},anim(g,p,S=.35){if(!t.visible)return;t.position.set(0,p?.16:.04,p?0:S);let v=p?1:.86,y=_,R=g*.45%1,T=(g*.45+.5)%1;a.position.y=.08+R*(1.2+y*1.4),a.scale.setScalar(v*(.7+R*.55)),c.position.y=.08+T*(1.2+y*1.4),c.scale.setScalar(v*(.65+T*.65));let C=.24+y*.92;l.position.set(p?1.2:.95,.04,p?.55:.25),l.scale.setScalar(C),l.rotation.y=Math.sin(g*1.4)*.2,f.scale.setScalar(.6+y*.8+Math.sin(g*4)*.08),f.rotation.y=g*1.8;for(let P of m){let E=(g*(.28+y*.35)+P.phase)%1,M=g*1.1+P.phase*Math.PI*2;P.m.position.set(Math.cos(M)*P.rad*v,.15+E*(1.5+y*1.6),Math.sin(M)*P.rad*v),P.m.scale.setScalar(Math.sin(E*Math.PI)*(.7+y*.6))}}}}function Cg(i){let t=new ct,e=new q(.11,.11,.028,14),n=new Le(.13,.07,.02),s=new Wn(.1,0),r=new ot(.11,12,10),o=i.metal(16763708,.18,.88),a=i.glass(6287615,.65),l=[16739154,1349259,16764996,16740520,4576888,7125247].map(h=>i.gloss(h,{rough:.28})),u=[];function d(h="yes",f=1.6){let m=h==="sprint14"||h==="milestone"?36:24;for(let _=0;_<m;_++){let g=n,p=l[_%l.length];h==="shield"?(g=_%3===0?s:r,p=_%3===0?o:a):h==="rescue"?(g=_%2===0?s:n,p=_%3===0?o:l[4]):h==="sprint14"||h==="milestone"?(g=_%2===0?e:s,p=_%3===0?l[_%l.length]:o):(g=_%2===0?e:n,p=_%2===0?o:l[_%l.length]);let S=new Ne(g,p);S.castShadow=!1,S.position.set((Math.random()-.5)*.8,f+Math.random()*.4,(Math.random()-.5)*.8);let v=Math.random()*Math.PI*2,y=1.3+Math.random()*2.4,R=(h==="shield"?2.4:4.2)+Math.random()*2.8;t.add(S),u.push({m:S,vx:Math.cos(v)*y,vy:R,vz:Math.sin(v)*y,rx:(Math.random()-.5)*9,ry:(Math.random()-.5)*9,life:0,maxLife:1.45+Math.random()*.6,grav:h==="shield"?-2.4:-7.6})}}return{group:t,spawn:d,update(h){for(let f=u.length-1;f>=0;f--){let m=u[f];if(m.life+=h,m.life>=m.maxLife){t.remove(m.m),u.splice(f,1);continue}m.vy+=m.grav*h,m.m.position.x+=m.vx*h,m.m.position.y+=m.vy*h,m.m.position.z+=m.vz*h,m.m.rotation.x+=m.rx*h,m.m.rotation.y+=m.ry*h;let _=1-Math.max(0,(m.life-m.maxLife*.65)/(m.maxLife*.35));m.m.scale.setScalar(Math.max(.01,_))}},dispose(){e.dispose(),n.dispose(),s.dispose(),r.dispose()}}}function Rg(i,t={}){if(!i||!xh())return null;let e=gh,n;try{n=new Or({antialias:!e,alpha:!1,powerPreference:"high-performance"})}catch{return null}n.outputColorSpace=ze,n.toneMapping=hc,n.toneMappingExposure=1.06,n.shadowMap.enabled=!e,n.shadowMap.type=lc,n.shadowMap.autoUpdate=!1;let s=()=>{n.shadowMap.enabled&&(n.shadowMap.needsUpdate=!0)},r=n.domElement;r.style.width="100%",r.style.height="100%",r.style.display="block",r.style.touchAction="none",r.setAttribute("aria-label","Interactive 3D Harbour Keep Diorama"),i.replaceChildren(r);let o=new zr;o.background=new Ht(Re.day.bg),o.fog=new Br(Re.day.fog,Re.day.fogDensity);let a=new Ve(36,1,.2,120),c=dh({softwareGL:e}),l=e?null:{day:so("day"),dusk:so("dusk"),night:so("night")};l&&(o.environment=l.day);let u=new Qr(16777215,.24),d=new Zr(Re.day.hemiSky,Re.day.hemiGround,Re.day.hemiInt),h=new as(Re.day.keyColor,Re.day.keyInt);h.position.set(...Re.day.keyPos),h.castShadow=!0,h.shadow.mapSize.set(1024,1024),h.shadow.camera.left=-7.2,h.shadow.camera.right=7.2,h.shadow.camera.top=8.4,h.shadow.camera.bottom=-6.2,h.shadow.camera.near=2,h.shadow.camera.far=32,h.shadow.bias=-5e-4,h.shadow.normalBias=.025,h.shadow.radius=2.4;let f=new as(Re.day.rimColor,Re.day.rimInt);f.position.set(-9.5,6.5,-8.5);let m=new as(16775664,.48);m.position.set(4,9,12);let _=new Kr(16758892,0,14,1.5);_.position.set(1.2,2.4,2.2),o.add(u,d,h,f,m,_);let g=Tg(c);o.add(g.group);let p=new ct,S=new ct;S.visible=!1,o.add(p,S);let v=Eg(c);S.add(v.group);let y=new ct;S.add(y);let R=Ag(c),T=Cg(c);o.add(R.group,T.group);let C={totalDays:Math.max(0,Math.floor(Number(t.totalDays)||0)),streak:Math.max(0,Math.floor(Number(t.streak)||0)),shields:Math.max(0,Math.floor(Number(t.shields)||0)),sky:t.sky||"day",avatar:t.avatar||"crab",mood:t.mood||"idle"},P="island",E=null,M=!1,I="",O=null,F=[],V=null,$=0,G=0,it=0,X=0,st=!1,ft=-.34,yt=-.34,zt=1.04,$t=1.04,Z=11.2,at=11.2,Tt=.85,lt=.85,Lt=0,Vt=0,Ut=1,Zt=1,j=1,dt=()=>!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);function L(){let nt=Zt/Math.max(1,j),rt=nt<.8,_t=rt?44:36;a.fov!==_t&&(a.fov=_t);let Yt=Math.tan(Ce.degToRad(_t*.5))*nt;if(P==="item"){let gt=2.15/Math.max(.14,Yt),It=Math.max(8.2,gt);return{y:.98,r:It,phi:1.11,theta:-.34,minR:Math.max(4.4,It*.56),maxR:It*1.55}}let ee=C.totalDays,b=ee>=14?Math.min(3,Math.floor((ee-14)/8)):0,U=.62,z=12.6;ee>=14?(U=2.35+b*.68,z=19.6+b*2.2):ee>=12?(U=1.95,z=16.6):ee>=9?(U=1.62,z=15.2):ee>=6?(U=1.32,z=14):ee>=4&&(U=1.02,z=13.2);let H=ee>=14?4.95:4.65,N=rt?H/Math.max(.14,Yt*.96):0,ut=Math.max(z,N);return{y:U,r:ut,phi:1.04,theta:-.34,minR:Math.max(6.8,ut*.56),maxR:ut*1.58}}function Dt(nt){let rt=Re[nt]?nt:"day",_t=Re[rt];C.sky=rt,o.background.setHex(_t.bg),o.fog.color.setHex(_t.fog),o.fog.density=_t.fogDensity,l&&(o.environment=l[rt]),d.color.setHex(_t.hemiSky),d.groundColor.setHex(_t.hemiGround),d.intensity=_t.hemiInt+(e?.3:0),h.color.setHex(_t.keyColor),h.intensity=_t.keyInt+(e?.22:0),h.position.set(..._t.keyPos),f.color.setHex(_t.rimColor),f.intensity=_t.rimInt+(e?.18:0),m.color.setHex(rt==="night"?12769535:rt==="dusk"?16765608:16775664),m.intensity=rt==="night"?.42:rt==="dusk"?.52:.48,u.intensity=_t.ambInt+(e?.24:0),_.intensity=_t.nightGlow,c.setNightFactor(_t.nightFactor),g.setSky(rt),s()}function J(nt,rt,_t=0,Yt=1){!nt||!nt.group||(nt.group.position.set(rt[0],rt[1],rt[2]),nt.group.rotation.y=_t,Yt!==1&&nt.group.scale.setScalar(Yt),p.add(nt.group),nt.anim&&F.push(nt.anim))}function At(){let nt=`${C.totalDays}|${C.avatar}|${C.shields}`;if(nt===I)return;for(I=nt;p.children.length;){let N=p.children[0];p.remove(N),oo(N)}F=[];let rt=C.totalDays,_t=rt>=4;O=ph(c,_t),O.setShields(C.shields),p.add(O.group),F.push(O.anim);let Yt=mh(rt),ee;C.avatar==="jack"?ee=Ci(c,"jack",Yt):C.avatar==="jackie"?ee=Ci(c,"jackie",Yt):ee=hs(c,Yt),_t?J(ee,[0,0,1.92],0,C.avatar==="crab"?.96:.92):J(ee,[0,.025,.35],0,C.avatar==="crab"?1.15:1.06);let b=0,U=-.35,z=0;rt>=4&&(J(We(4,c),[b,z,U],0,1),z+=1.25),rt>=6&&(J(We(6,c),[b,z,U],0,1),z+=1.15),rt>=9&&(J(We(9,c),[b,z,U],0,1),z+=1.1),rt>=12&&(J(We(12,c),[b,z,U],0,1),z+=1.1);let H=rt>=14?Math.min(3,Math.floor((rt-14)/8)):0;for(let N=0;N<H;N++)J(Ec(15+N*8,c),[b,z,U],0,1),z+=1.05;if(rt>=14&&J(We(14,c),[b,z,U],0,1),rt>=1&&J(We(1,c),_t?[-1.68,0,1.62]:[-1.48,0,.72],.36,_t?.88:.98),rt>=2&&J(We(2,c),_t?[1.82,0,1.48]:[1.52,0,.64],-.46,_t?.78:.88),rt>=3&&J(We(3,c),_t?[2.56,0,.06]:[1.72,0,-.95],-.9,_t?.78:.84),rt>=5&&J(We(5,c),[-2.38,0,.36],.92,.82),rt>=7&&J(We(7,c),[3.72,-.22,3.05],-.58,.9),rt>=8&&J(We(8,c),[-2.18,0,-1.2],-.52,.82),rt>=10&&J(We(10,c),[-3.22,0,-.45],.52,.92),rt>=11&&J(We(11,c),[-1.14,0,2.52],.28,.72),rt>=13&&J(We(13,c),[-3.82,-.22,2.95],.68,.92),rt>=18&&J(un(18,c,{island:!0}),[1.65,-.22,4.42],0,.88),rt>=21&&J(un(21,c,{island:!0}),[0,0,-2.85],0,.9),rt>=25&&J(un(25,c,{island:!0}),[2.75,0,1.84],-.48,.78),rt>=30&&J(un(30,c,{island:!0}),[2.62,0,-1.42],-2.22,.78),rt>=35&&J(un(35,c,{island:!0}),[1.46,0,2.66],-.42,.72),rt>=45&&J(un(45,c,{island:!0}),[3.28,0,-.32],-.55,.88),rt>=60&&J(un(60,c,{island:!0}),[4.45,-.22,-1.85],-1.95,.9),rt>=75&&J(un(75,c,{island:!0}),[-2.18,-.05,-2.96],.35,.95),rt>=90&&J(un(90,c,{island:!0}),[2.18,-.05,-2.88],-.4,.92),rt>=100&&J(un(100,c,{island:!0}),[-.22,0,3.22],0,.74),rt>=114){let N=Math.min(4,Math.floor((rt-100)/14)),ut=[[-1.2,-3.28],[1.2,-3.28],[-3.25,-2.18],[3.25,-2.18]];for(let gt=0;gt<N;gt++)J(Tc(100+(gt+1)*14,c),[ut[gt][0],0,ut[gt][1]],0,.76)}c.setNightFactor((Re[C.sky]||Re.day).nightFactor),s()}function mt(nt,rt){for(;y.children.length;){let N=y.children[0];y.remove(N),oo(N)}V=null;let _t=null;if(nt<=0){let N=mh(C.totalDays);C.avatar==="jack"?_t=Ci(c,"jack",N,{noShadow:!0}):C.avatar==="jackie"?_t=Ci(c,"jackie",N,{noShadow:!0}):_t=hs(c,N,{noShadow:!0})}else nt<=14?_t=We(nt,c):_t=un(nt,c,{island:!1});_t||(_t=hs(c,null,{noShadow:!0}));let Yt=new ct;Yt.add(_t.group),y.add(Yt);let ee=wg(_t.group),b=new D,U=new D;ee.getSize(b),ee.getCenter(U);let z=Math.max(b.x,b.y,b.z,.4),H=Ce.clamp(2.38/z,.55,2.15);_t.group.scale.multiplyScalar(H),_t.group.position.set(-U.x*H,-ee.min.y*H+.16,-U.z*H),rt&&fh(_t.group,c),v.lockRing.visible=!!rt,V=_t.anim||null,X=dt()?0:.45,c.setNightFactor((Re[C.sky]||Re.day).nightFactor),s()}function Nt(){let nt=L(),rt=Ce.clamp(Z,nt.minR,nt.maxR),_t=Ce.clamp(zt,us,ds),Yt=Math.sin(_t);a.position.set(rt*Yt*Math.sin(ft),lt+rt*Math.cos(_t),rt*Yt*Math.cos(ft)),a.lookAt(0,lt,0);let ee=ft+.48,b=Math.max(.35,_t*.72);m.position.set(14*Math.sin(b)*Math.sin(ee),lt+14*Math.cos(b),14*Math.sin(b)*Math.cos(ee)),Math.abs(G)>.001?a.setViewOffset(Zt,j,0,G*j*.55,Zt,j):a.clearViewOffset(),a.updateProjectionMatrix()}function wt(){if(st)return;let nt=i.getBoundingClientRect();Zt=Math.max(1,Math.round(nt.width||window.innerWidth||800)),j=Math.max(1,Math.round(nt.height||window.innerHeight||600));let rt=e?1:Math.min(2,window.devicePixelRatio||1);n.setPixelRatio(rt),n.setSize(Zt,j,!1),a.aspect=Zt/j;let _t=L();at=Ce.clamp(_t.r*Ut,_t.minR,_t.maxR),Nt()}let A=new Map,w=new jr,k=!1,Q=0,et=0,K=0,Pt=0,xt=0,Et=0,te=0,ht=1,Ct=!1,kt=0,Gt=0;function Rt(nt){if(!st){try{r.setPointerCapture(nt.pointerId)}catch{}if(A.set(nt.pointerId,{x:nt.clientX,y:nt.clientY}),A.size===1)k=!0,Q=xt=nt.clientX,et=Et=nt.clientY,K=0,Pt=performance.now(),Lt=0,Vt=0;else if(A.size===2){k=!1;let rt=[...A.values()];te=Math.hypot(rt[0].x-rt[1].x,rt[0].y-rt[1].y)||1,ht=Ut}}}function ne(nt){if(st||!A.has(nt.pointerId))return;if(A.set(nt.pointerId,{x:nt.clientX,y:nt.clientY}),A.size===2){let U=[...A.values()],z=Math.hypot(U[0].x-U[1].x,U[0].y-U[1].y)||1,H=te/z;Ut=Ce.clamp(ht*H,.62,1.5);let N=L();at=Ce.clamp(N.r*Ut,N.minR,N.maxR);return}if(!k)return;let rt=nt.clientX-xt,_t=nt.clientY-Et;xt=nt.clientX,Et=nt.clientY,K+=Math.hypot(rt,_t);let Yt=Math.PI*1.45/Math.max(320,Math.min(Zt,j)),ee=-rt*Yt,b=-_t*Yt*.72;if(yt+=ee,$t=Ce.clamp($t+b,us,ds),ft+=ee*.55,zt=Ce.clamp(zt+b*.55,us,ds),Lt=Ce.clamp(ee*22,-6.5,6.5),Vt=Ce.clamp(b*16,-4,4),Nt(),rn(),!Ct&&K>6&&(Ct=!0,typeof t.onFirstDrag=="function"))try{t.onFirstDrag()}catch{}if(kt+=Math.abs(ee),kt>=.24&&(kt=0,typeof t.onOrbitTick=="function"))try{t.onOrbitTick()}catch{}}function Jt(nt,rt){let _t=performance.now();if(_t-Gt<310){Gt=0,St();return}if(Gt=_t,typeof t.onTapProp!="function")return;let Yt=r.getBoundingClientRect(),ee=new pt((nt-Yt.left)/Math.max(1,Yt.width)*2-1,-((rt-Yt.top)/Math.max(1,Yt.height))*2+1);w.setFromCamera(ee,a);let b=P==="item"?y:p,U=w.intersectObject(b,!0);for(let z of U){let H=z.object.userData.milestoneDay,N=z.object.userData.prop;if(typeof H=="number"){try{t.onTapProp({day:H,prop:N})}catch{}return}}if(P==="island")try{t.onTapProp({day:null,prop:"pier"})}catch{}}function re(nt){if(st)return;let rt=k&&A.size===1;A.delete(nt.pointerId),A.size===0&&(k=!1),rt&&K<8&&performance.now()-Pt<420&&Jt(nt.clientX,nt.clientY)}function B(nt){if(st)return;nt.preventDefault();let rt=Math.sign(nt.deltaY)*.08;Ut=Ce.clamp(Ut+rt,.62,1.5);let _t=L();at=Ce.clamp(_t.r*Ut,_t.minR,_t.maxR)}function vt(nt){nt.preventDefault()}r.addEventListener("pointerdown",Rt),r.addEventListener("pointermove",ne),r.addEventListener("pointerup",re),r.addEventListener("pointercancel",re),r.addEventListener("wheel",B,{passive:!1}),r.addEventListener("webglcontextlost",vt),window.addEventListener("resize",wt);function Y(nt={}){if(st)return;nt.totalDays!=null&&(C.totalDays=Math.max(0,Math.floor(Number(nt.totalDays)||0))),nt.streak!=null&&(C.streak=Math.max(0,Math.floor(Number(nt.streak)||0))),nt.shields!=null&&(C.shields=Math.max(0,Math.floor(Number(nt.shields)||0))),nt.avatar&&(C.avatar=nt.avatar),nt.mood&&(C.mood=nt.mood),nt.sky&&Dt(nt.sky),At(),P==="item"&&E===0&&mt(0,!1);let rt=L();Tt=rt.y,at=Ce.clamp(rt.r*Ut,rt.minR,rt.maxR),e&&(lt=Tt,Z=at,rn())}function tt(nt,rt={}){if(st)return;if(nt==null){let ee=P==="item";P="island",E=null,M=!1,p.visible=!0,S.visible=!1,Ut=1;let b=L();Tt=b.y,at=b.r,$t=b.phi,yt=b.theta,s(),ee&&(lt=b.y,Z=b.r,zt=b.phi,ft=b.theta,Lt=0,Vt=0,Nt(),rn());return}let _t=Math.max(0,Math.floor(Number(nt)||0));P="item",E=_t,M=!!rt.locked,p.visible=!1,S.visible=!0,mt(_t,M),Ut=1;let Yt=L();Tt=Yt.y,lt=Yt.y,at=Yt.r,Z=Yt.r,$t=Yt.phi,zt=Yt.phi,yt=Yt.theta,ft=Yt.theta,Lt=0,Vt=0,Nt(),rn()}function St(){Ut=1;let nt=L();yt=nt.theta,$t=nt.phi,at=nt.r,Tt=nt.y,Lt=0,Vt=0,e&&(ft=nt.theta,zt=nt.phi,Z=nt.r,lt=nt.y,Nt(),rn())}function bt(nt=0,rt=0){yt+=Number(nt)||0,$t=Ce.clamp($t+(Number(rt)||0),us,ds),ft+=(Number(nt)||0)*(e?1:.45),zt=Ce.clamp(zt+(Number(rt)||0)*(e?1:.45),us,ds),Nt(),rn()}function qt(nt){$=Ce.clamp(Number(nt)||0,-.55,.55),e&&(G=$,Nt(),rn())}function _e(nt){R.setProgress(nt),rn()}function Pe(nt="yes"){it=dt()?0:.65;let rt=P==="item"?1.5:Math.min(4.2,lt+.9);T.spawn(nt,rt),rn()}function oe(){return{mode:P,inspectDay:E}}function Je(){return{theta:Number(ft.toFixed(4)),phi:Number(zt.toFixed(4)),radius:Number(Z.toFixed(4))}}function dn(nt=800,rt=600){if(st)return"";let _t=Zt,Yt=j,ee=n.getPixelRatio(),b=G,U=Math.max(64,Math.round(nt)),z=Math.max(64,Math.round(rt));n.setPixelRatio(1),n.setSize(U,z,!1),a.aspect=U/z,G=0,a.clearViewOffset(),a.updateProjectionMatrix(),n.render(o,a);let H="";try{H=n.domElement.toDataURL("image/png")}catch{H=""}return n.setPixelRatio(ee),n.setSize(_t,Yt,!1),a.aspect=_t/Math.max(1,Yt),G=b,Nt(),n.render(o,a),H}let Ue=0,Ye=0,sn=performance.now(),Mn=0;function rn(){st||!e||(Ye&&(clearTimeout(Ye),Ye=0),Ue||(Ue=requestAnimationFrame(Rn)))}function Rn(nt){if(Ue=0,st)return;if(document.hidden){sn=nt;return}let rt=Math.min(.05,Math.max(.001,(nt-sn)/1e3));sn=nt;let _t=dt();if(_t||(Mn+=rt),!k)if(Math.abs(Lt)>.001||Math.abs(Vt)>.001){yt+=Lt*rt,$t=Ce.clamp($t+Vt*rt,us,ds);let b=Math.exp(-5.4*rt);Lt*=b,Vt*=b}else!_t&&P==="item"&&!e&&(yt+=rt*.22);let Yt=1-Math.exp(-9.5*rt);ft+=(yt-ft)*Yt,zt+=($t-zt)*Yt,Z+=(at-Z)*Yt,lt+=(Tt-lt)*Yt,G+=($-G)*Yt;let ee=1;if(it>0){it=Math.max(0,it-rt);let b=1-it/.65;ee=1+Math.sin(b*Math.PI*2)*(1-b)*.07}if(p.scale.setScalar(ee),P==="item"){if(X>0){X=Math.max(0,X-rt);let b=1-X/.45,U=.55+.45*(1-Math.pow(1-b,3))+Math.sin(b*Math.PI)*.08;y.scale.setScalar(U*ee)}else y.scale.setScalar(ee);V&&!_t&&V(Mn,rt,{mood:C.mood}),v.lockRing.visible&&!_t&&v.lockRing.scale.setScalar(1+Math.sin(Mn*2.8)*.03)}else if(!_t){let b={mood:C.mood};for(let U=0;U<F.length;U++)F[U](Mn,rt,b)}if(g.anim(Mn,_t),R.anim(Mn,P==="item",C.totalDays>=4?1.92:.35),T.update(rt),Nt(),n.render(o,a),e){let b=k||it>0||X>0;Ye=setTimeout(()=>{Ye=0,!st&&!document.hidden&&!Ue&&(Ue=requestAnimationFrame(Rn))},b?40:180)}else Ue=requestAnimationFrame(Rn)}function ci(){!document.hidden&&!st&&!Ue&&!Ye&&(sn=performance.now(),Ue=requestAnimationFrame(Rn))}document.addEventListener("visibilitychange",ci);function qs(){st||(st=!0,Ue&&cancelAnimationFrame(Ue),Ue=0,Ye&&clearTimeout(Ye),Ye=0,document.removeEventListener("visibilitychange",ci),window.removeEventListener("resize",wt),r.removeEventListener("pointerdown",Rt),r.removeEventListener("pointermove",ne),r.removeEventListener("pointerup",re),r.removeEventListener("pointercancel",re),r.removeEventListener("wheel",B),r.removeEventListener("webglcontextlost",vt),oo(p),oo(y),g.dispose(),T.dispose(),l&&Object.values(l).forEach(nt=>nt.dispose()),c.dispose(),n.dispose(),r.parentNode&&r.remove())}Dt(C.sky),At(),wt();let Pn=L();return Tt=lt=Pn.y,at=Z=Pn.r,$t=zt=Pn.phi,yt=ft=Pn.theta,Nt(),n.render(o,a),e?Ye=setTimeout(()=>{Ye=0,!st&&!document.hidden&&!Ue&&(Ue=requestAnimationFrame(Rn))},180):Ue=requestAnimationFrame(Rn),{setState:Y,inspectMilestone:tt,getMode:oe,setFocusProgress:_e,celebrate:Pe,getCameraAngles:Je,nudgeOrbit:bt,resetCamera:St,setVerticalOffset:qt,resize:wt,snapshot:dn,dispose:qs}}window.TFF_DAILY3D={isSupported:xh,mount:Rg};})();
