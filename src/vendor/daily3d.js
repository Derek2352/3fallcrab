/* Harbour Keep 3D Diorama Engine (tools/daily3d/), with three.js r170: MIT License, Copyright © 2010-2024 three.js authors, https://threejs.org */
(()=>{var ac="170";var gh=0,Tc=1,xh=2;var Bl=1,cc=2,Un=3,jn=0,He=1,Te=2,Kn=0,Xi=1,Ac=2,Cc=3,Rc=4,_h=5,pi=100,yh=101,vh=102,Mh=103,Sh=104,bh=200,wh=201,Eh=202,Th=203,Vo=204,ko=205,Ah=206,Ch=207,Rh=208,Ih=209,Ph=210,Lh=211,Dh=212,Uh=213,Nh=214,Ho=0,Go=1,Wo=2,$i=3,Xo=4,qo=5,Yo=6,Zo=7,zl=0,Fh=1,Oh=2,Qn=0,Bh=1,zh=2,Vh=3,kh=4,Hh=5,Gh=6,lc=7;var Vl=300,Ji=301,Ki=302,Ts=303,$o=304,Qr=306,xn=1e3,xi=1001,Jo=1002,gn=1003,Wh=1004;var Xs=1005;var Mn=1006,oo=1007;var _i=1008;var zn=1009,kl=1010,Hl=1011,As=1012,hc=1013,yi=1014,Fn=1015,Hs=1016,uc=1017,dc=1018,Qi=1020,Gl=35902,Wl=1021,Xl=1022,mn=1023,ql=1024,Yl=1025,qi=1026,ji=1027,Zl=1028,fc=1029,$l=1030,pc=1031;var mc=1033,_r=33776,yr=33777,vr=33778,Mr=33779,Ko=35840,Qo=35841,jo=35842,ta=35843,ea=36196,na=37492,ia=37496,sa=37808,ra=37809,oa=37810,aa=37811,ca=37812,la=37813,ha=37814,ua=37815,da=37816,fa=37817,pa=37818,ma=37819,ga=37820,xa=37821,Sr=36492,_a=36494,ya=36495,Jl=36283,va=36284,Ma=36285,Sa=36286;var br=2300,ba=2301,ao=2302,Ic=2400,Pc=2401,Lc=2402;var Xh=3200,qh=3201;var Kl=0,Yh=1,Jn="",Ve="srgb",rs="srgb-linear",jr="linear",de="srgb";var Ci=7680;var Dc=519,Zh=512,$h=513,Jh=514,Ql=515,Kh=516,Qh=517,jh=518,tu=519,Uc=35044;var Nc="300 es",On=2e3,wr=2001,ti=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fc=1234567,vs=Math.PI/180,Cs=180/Math.PI;function wi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[i&255]+Be[i>>8&255]+Be[i>>16&255]+Be[i>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function De(i,t,e){return Math.max(t,Math.min(e,i))}function gc(i,t){return(i%t+t)%t}function eu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function nu(i,t,e){return i!==t?(e-i)/(t-i):0}function Ms(i,t,e){return(1-e)*i+e*t}function iu(i,t,e,n){return Ms(i,t,1-Math.exp(-e*n))}function su(i,t=1){return t-Math.abs(gc(i,t*2)-t)}function ru(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function ou(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function au(i,t){return i+Math.floor(Math.random()*(t-i+1))}function cu(i,t){return i+Math.random()*(t-i)}function lu(i){return i*(.5-Math.random())}function hu(i){i!==void 0&&(Fc=i);let t=Fc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function uu(i){return i*vs}function du(i){return i*Cs}function fu(i){return(i&i-1)===0&&i!==0}function pu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function mu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function gu(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*d,c*u,a*l);break;case"YZY":i.set(c*u,a*h,c*d,a*l);break;case"ZXZ":i.set(c*d,c*u,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Hi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function qe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Re={DEG2RAD:vs,RAD2DEG:Cs,generateUUID:wi,clamp:De,euclideanModulo:gc,mapLinear:eu,inverseLerp:nu,lerp:Ms,damp:iu,pingpong:su,smoothstep:ru,smootherstep:ou,randInt:au,randFloat:cu,randFloatSpread:lu,seededRandom:hu,degToRad:uu,radToDeg:du,isPowerOfTwo:fu,ceilPowerOfTwo:pu,floorPowerOfTwo:mu,setQuaternionFromProperEuler:gu,normalize:qe,denormalize:Hi},gt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],S=s[1],v=s[4],y=s[7],R=s[2],T=s[5],C=s[8];return r[0]=o*_+a*S+c*R,r[3]=o*g+a*v+c*T,r[6]=o*p+a*y+c*C,r[1]=l*_+h*S+d*R,r[4]=l*g+h*v+d*T,r[7]=l*p+h*y+d*C,r[2]=u*_+f*S+m*R,r[5]=u*g+f*v+m*T,r[8]=u*p+f*y+m*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*r,f=l*r-o*c,m=e*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=d*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(co.makeScale(t,e)),this}rotate(t){return this.premultiply(co.makeRotation(-t)),this}translate(t,e){return this.premultiply(co.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},co=new Qt;function jl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Er(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function xu(){let i=Er("canvas");return i.style.display="block",i}var Oc={};function _s(i){i in Oc||(Oc[i]=!0,console.warn(i))}function _u(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function yu(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function vu(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var se={enabled:!0,workingColorSpace:rs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===de&&(i.r=Bn(i.r),i.g=Bn(i.g),i.b=Bn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===de&&(i.r=Yi(i.r),i.g=Yi(i.g),i.b=Yi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Jn?jr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Yi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Bc=[.64,.33,.3,.6,.15,.06],zc=[.2126,.7152,.0722],Vc=[.3127,.329],kc=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hc=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);se.define({[rs]:{primaries:Bc,whitePoint:Vc,transfer:jr,toXYZ:kc,fromXYZ:Hc,luminanceCoefficients:zc,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:Bc,whitePoint:Vc,transfer:de,toXYZ:kc,fromXYZ:Hc,luminanceCoefficients:zc,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}});var Ri,wa=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ri===void 0&&(Ri=Er("canvas")),Ri.width=t.width,Ri.height=t.height;let n=Ri.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ri}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Er("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Bn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Mu=0,Tr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=wi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(lo(s[o].image)):r.push(lo(s[o]))}else r=lo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function lo(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?wa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Su=0,sn=class i extends ti{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=xi,s=xi,r=Mn,o=_i,a=mn,c=zn,l=i.DEFAULT_ANISOTROPY,h=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=wi(),this.name="",this.source=new Tr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xn:t.x=t.x-Math.floor(t.x);break;case xi:t.x=t.x<0?0:1;break;case Jo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xn:t.y=t.y-Math.floor(t.y);break;case xi:t.y=t.y<0?0:1;break;case Jo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=Vl;sn.DEFAULT_ANISOTROPY=1;var fe=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(l+1)/2,y=(f+1)/2,R=(p+1)/2,T=(h+u)/4,C=(d+_)/4,I=(m+g)/4;return v>y&&v>R?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=C/n):y>R?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=I/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=C/r,s=I/r),this.set(n,s,r,e),this}let S=Math.sqrt((g-m)*(g-m)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(d-_)/S,this.z=(u-h)/S,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ea=class extends ti{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new sn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Tr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vn=class extends Ea{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ar=class extends sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ta=class extends sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ei=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(d!==_||c!==u||l!==f||h!==m){let g=1-a,p=c*u+l*f+h*m+d*_,S=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let R=Math.sqrt(v),T=Math.atan2(R,p*S);g=Math.sin(g*T)/R,a=Math.sin(a*T)/R}let y=a*S;if(c=c*g+u*y,l=l*g+f*y,h=h*g+m*y,d=d*g+_*y,g===1-a){let R=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=R,l*=R,h*=R,d*=R}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*d+c*f-l*u,t[e+1]=c*m+h*u+l*d-a*f,t[e+2]=l*m+h*f+a*u-c*d,t[e+3]=h*m-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),d=a(r/2),u=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"YZX":this._x=u*h*d+l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d-u*f*m;break;case"XZY":this._x=u*h*d-l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d+u*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ho.copy(this).projectOnVector(t),this.sub(ho)}reflect(t){return this.sub(ho.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ho=new D,Gc=new ei,Sn=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,dn):dn.fromBufferAttribute(r,o),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),qs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qs.copy(n.boundingBox)),qs.applyMatrix4(t.matrixWorld),this.union(qs)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fs),Ys.subVectors(this.max,fs),Ii.subVectors(t.a,fs),Pi.subVectors(t.b,fs),Li.subVectors(t.c,fs),Wn.subVectors(Pi,Ii),Xn.subVectors(Li,Pi),ai.subVectors(Ii,Li);let e=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-ai.z,ai.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,ai.z,0,-ai.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-ai.y,ai.x,0];return!uo(e,Ii,Pi,Li,Ys)||(e=[1,0,0,0,1,0,0,0,1],!uo(e,Ii,Pi,Li,Ys))?!1:(Zs.crossVectors(Wn,Xn),e=[Zs.x,Zs.y,Zs.z],uo(e,Ii,Pi,Li,Ys))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Rn=[new D,new D,new D,new D,new D,new D,new D,new D],dn=new D,qs=new Sn,Ii=new D,Pi=new D,Li=new D,Wn=new D,Xn=new D,ai=new D,fs=new D,Ys=new D,Zs=new D,ci=new D;function uo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ci.fromArray(i,r);let a=s.x*Math.abs(ci.x)+s.y*Math.abs(ci.y)+s.z*Math.abs(ci.z),c=t.dot(ci),l=e.dot(ci),h=n.dot(ci);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var bu=new Sn,ps=new D,fo=new D,ts=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):bu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);let e=ps.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ps,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(fo)),this.expandByPoint(ps.copy(t.center).sub(fo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},In=new D,po=new D,$s=new D,qn=new D,mo=new D,Js=new D,go=new D,Rs=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){po.copy(t).add(e).multiplyScalar(.5),$s.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(po);let r=t.distanceTo(e)*.5,o=-this.direction.dot($s),a=qn.dot(this.direction),c=-qn.dot($s),l=qn.lengthSq(),h=Math.abs(1-o*o),d,u,f,m;if(h>0)if(d=o*c-a,u=o*a-c,m=r*h,d>=0)if(u>=-m)if(u<=m){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-m?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=m?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(po).addScaledVector($s,u),f}intersectSphere(t,e){In.subVectors(t.center,this.origin);let n=In.dot(this.direction),s=In.dot(In)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,s,r){mo.subVectors(e,t),Js.subVectors(n,t),go.crossVectors(mo,Js);let o=this.direction.dot(go),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qn.subVectors(this.origin,t);let c=a*this.direction.dot(Js.crossVectors(qn,Js));if(c<0)return null;let l=a*this.direction.dot(mo.cross(qn));if(l<0||c+l>o)return null;let h=-a*qn.dot(go);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},_e=class i{constructor(t,e,n,s,r,o,a,c,l,h,d,u,f,m,_,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,d,u,f,m,_,g)}set(t,e,n,s,r,o,a,c,l,h,d,u,f,m,_,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Di.setFromMatrixColumn(t,0).length(),r=1/Di.setFromMatrixColumn(t,1).length(),o=1/Di.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,m=a*h,_=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+m*l,e[5]=u-_*l,e[9]=-a*c,e[2]=_-u*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){let u=c*h,f=c*d,m=l*h,_=l*d;e[0]=u+_*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=_+u*a,e[10]=o*c}else if(t.order==="ZXY"){let u=c*h,f=c*d,m=l*h,_=l*d;e[0]=u-_*a,e[4]=-o*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let u=o*h,f=o*d,m=a*h,_=a*d;e[0]=c*h,e[4]=m*l-f,e[8]=u*l+_,e[1]=c*d,e[5]=_*l+u,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let u=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=_-u*d,e[8]=m*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+m,e[10]=u-_*d}else if(t.order==="XZY"){let u=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(wu,t,Eu)}lookAt(t,e,n){let s=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),Yn.crossVectors(n,en),Yn.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),Yn.crossVectors(n,en)),Yn.normalize(),Ks.crossVectors(en,Yn),s[0]=Yn.x,s[4]=Ks.x,s[8]=en.x,s[1]=Yn.y,s[5]=Ks.y,s[9]=en.y,s[2]=Yn.z,s[6]=Ks.z,s[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],S=n[3],v=n[7],y=n[11],R=n[15],T=s[0],C=s[4],I=s[8],b=s[12],M=s[1],P=s[5],F=s[9],B=s[13],W=s[2],Z=s[6],G=s[10],nt=s[14],X=s[3],st=s[7],mt=s[11],xt=s[15];return r[0]=o*T+a*M+c*W+l*X,r[4]=o*C+a*P+c*Z+l*st,r[8]=o*I+a*F+c*G+l*mt,r[12]=o*b+a*B+c*nt+l*xt,r[1]=h*T+d*M+u*W+f*X,r[5]=h*C+d*P+u*Z+f*st,r[9]=h*I+d*F+u*G+f*mt,r[13]=h*b+d*B+u*nt+f*xt,r[2]=m*T+_*M+g*W+p*X,r[6]=m*C+_*P+g*Z+p*st,r[10]=m*I+_*F+g*G+p*mt,r[14]=m*b+_*B+g*nt+p*xt,r[3]=S*T+v*M+y*W+R*X,r[7]=S*C+v*P+y*Z+R*st,r[11]=S*I+v*F+y*G+R*mt,r[15]=S*b+v*B+y*nt+R*xt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*c*d-s*l*d-r*a*u+n*l*u+s*a*f-n*c*f)+_*(+e*c*f-e*l*u+r*o*u-s*o*f+s*l*h-r*c*h)+g*(+e*l*d-e*a*f-r*o*d+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*d+e*a*u+s*o*d-n*o*u+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],S=d*g*l-_*u*l+_*c*f-a*g*f-d*c*p+a*u*p,v=m*u*l-h*g*l-m*c*f+o*g*f+h*c*p-o*u*p,y=h*_*l-m*d*l+m*a*f-o*_*f-h*a*p+o*d*p,R=m*d*c-h*_*c-m*a*u+o*_*u+h*a*g-o*d*g,T=e*S+n*v+s*y+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/T;return t[0]=S*C,t[1]=(_*u*r-d*g*r-_*s*f+n*g*f+d*s*p-n*u*p)*C,t[2]=(a*g*r-_*c*r+_*s*l-n*g*l-a*s*p+n*c*p)*C,t[3]=(d*c*r-a*u*r-d*s*l+n*u*l+a*s*f-n*c*f)*C,t[4]=v*C,t[5]=(h*g*r-m*u*r+m*s*f-e*g*f-h*s*p+e*u*p)*C,t[6]=(m*c*r-o*g*r-m*s*l+e*g*l+o*s*p-e*c*p)*C,t[7]=(o*u*r-h*c*r+h*s*l-e*u*l-o*s*f+e*c*f)*C,t[8]=y*C,t[9]=(m*d*r-h*_*r-m*n*f+e*_*f+h*n*p-e*d*p)*C,t[10]=(o*_*r-m*a*r+m*n*l-e*_*l-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*d*r-h*n*l+e*d*l+o*n*f-e*a*f)*C,t[12]=R*C,t[13]=(h*_*s-m*d*s+m*n*u-e*_*u-h*n*g+e*d*g)*C,t[14]=(m*a*s-o*_*s-m*n*c+e*_*c+o*n*g-e*a*g)*C,t[15]=(o*d*s-h*a*s+h*n*c-e*d*c-o*n*u+e*a*u)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,d=a+a,u=r*l,f=r*h,m=r*d,_=o*h,g=o*d,p=a*d,S=c*l,v=c*h,y=c*d,R=n.x,T=n.y,C=n.z;return s[0]=(1-(_+p))*R,s[1]=(f+y)*R,s[2]=(m-v)*R,s[3]=0,s[4]=(f-y)*T,s[5]=(1-(u+p))*T,s[6]=(g+S)*T,s[7]=0,s[8]=(m+v)*C,s[9]=(g-S)*C,s[10]=(1-(u+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Di.set(s[0],s[1],s[2]).length(),o=Di.set(s[4],s[5],s[6]).length(),a=Di.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],fn.copy(this);let l=1/r,h=1/o,d=1/a;return fn.elements[0]*=l,fn.elements[1]*=l,fn.elements[2]*=l,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=d,fn.elements[9]*=d,fn.elements[10]*=d,e.setFromRotationMatrix(fn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=On){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s),f,m;if(a===On)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===wr)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=On){let c=this.elements,l=1/(e-t),h=1/(n-s),d=1/(o-r),u=(e+t)*l,f=(n+s)*h,m,_;if(a===On)m=(o+r)*d,_=-2*d;else if(a===wr)m=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Di=new D,fn=new _e,wu=new D(0,0,0),Eu=new D(1,1,1),Yn=new D,Ks=new D,en=new D,Wc=new _e,Xc=new ei,bn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(De(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-De(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(De(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-De(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(De(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-De(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Wc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Wc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Xc.setFromEuler(this),this.setFromQuaternion(Xc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bn.DEFAULT_ORDER="XYZ";var Is=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Tu=0,qc=new D,Ui=new ei,Pn=new _e,Qs=new D,ms=new D,Au=new D,Cu=new ei,Yc=new D(1,0,0),Zc=new D(0,1,0),$c=new D(0,0,1),Jc={type:"added"},Ru={type:"removed"},Ni={type:"childadded",child:null},xo={type:"childremoved",child:null},Ge=class i extends ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new bn,n=new ei,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _e},normalMatrix:{value:new Qt}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Is,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.premultiply(Ui),this}rotateX(t){return this.rotateOnAxis(Yc,t)}rotateY(t){return this.rotateOnAxis(Zc,t)}rotateZ(t){return this.rotateOnAxis($c,t)}translateOnAxis(t,e){return qc.copy(t).applyQuaternion(this.quaternion),this.position.add(qc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yc,t)}translateY(t){return this.translateOnAxis(Zc,t)}translateZ(t){return this.translateOnAxis($c,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Qs.copy(t):Qs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(ms,Qs,this.up):Pn.lookAt(Qs,ms,this.up),this.quaternion.setFromRotationMatrix(Pn),s&&(Pn.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(Pn),this.quaternion.premultiply(Ui.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Jc),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ru),xo.child=t,this.dispatchEvent(xo),xo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Jc),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,Au),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,Cu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ge.DEFAULT_UP=new D(0,1,0);Ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=new D,Ln=new D,_o=new D,Dn=new D,Fi=new D,Oi=new D,Kc=new D,yo=new D,vo=new D,Mo=new D,So=new fe,bo=new fe,wo=new fe,mi=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),pn.subVectors(t,e),s.cross(pn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){pn.subVectors(s,e),Ln.subVectors(n,e),_o.subVectors(t,e);let o=pn.dot(pn),a=pn.dot(Ln),c=pn.dot(_o),l=Ln.dot(Ln),h=Ln.dot(_o),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(l*c-a*h)*u,m=(o*h-a*c)*u;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Dn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Dn.x),c.addScaledVector(o,Dn.y),c.addScaledVector(a,Dn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return So.setScalar(0),bo.setScalar(0),wo.setScalar(0),So.fromBufferAttribute(t,e),bo.fromBufferAttribute(t,n),wo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(So,r.x),o.addScaledVector(bo,r.y),o.addScaledVector(wo,r.z),o}static isFrontFacing(t,e,n,s){return pn.subVectors(n,e),Ln.subVectors(t,e),pn.cross(Ln).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pn.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),pn.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Fi.subVectors(s,n),Oi.subVectors(r,n),yo.subVectors(t,n);let c=Fi.dot(yo),l=Oi.dot(yo);if(c<=0&&l<=0)return e.copy(n);vo.subVectors(t,s);let h=Fi.dot(vo),d=Oi.dot(vo);if(h>=0&&d<=h)return e.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Fi,o);Mo.subVectors(t,r);let f=Fi.dot(Mo),m=Oi.dot(Mo);if(m>=0&&f<=m)return e.copy(r);let _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(Oi,a);let g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return Kc.subVectors(r,s),a=(d-h)/(d-h+(f-m)),e.copy(s).addScaledVector(Kc,a);let p=1/(g+_+u);return o=_*p,a=u*p,e.copy(n).addScaledVector(Fi,o).addScaledVector(Oi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},th={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},js={h:0,s:0,l:0};function Eo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Jt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=gc(t,1),e=De(e,0,1),n=De(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Eo(o,r,t+1/3),this.g=Eo(o,r,t),this.b=Eo(o,r,t-1/3)}return se.toWorkingColorSpace(this,s),this}setStyle(t,e=Ve){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){let n=th[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=Yi(t.r),this.g=Yi(t.g),this.b=Yi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return se.fromWorkingColorSpace(ze.copy(this),t),Math.round(De(ze.r*255,0,255))*65536+Math.round(De(ze.g*255,0,255))*256+Math.round(De(ze.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(ze.copy(this),e);let n=ze.r,s=ze.g,r=ze.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=Ve){se.fromWorkingColorSpace(ze.copy(this),t);let e=ze.r,n=ze.g,s=ze.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL(js);let n=Ms(Zn.h,js.h,e),s=Ms(Zn.s,js.s,e),r=Ms(Zn.l,js.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ze=new Jt;Jt.NAMES=th;var Iu=0,ni=class extends ti{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Iu++}),this.uuid=wi(),this.name="",this.blending=Xi,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vo,this.blendDst=ko,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xi&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vo&&(n.blendSrc=this.blendSrc),this.blendDst!==ko&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},ii=class extends ni{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ee=new D,tr=new gt,Ke=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Uc,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)tr.fromBufferAttribute(this,e),tr.applyMatrix3(t),this.setXY(e,tr.x,tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Hi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=qe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Hi(e,this.array)),e}setX(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Hi(e,this.array)),e}setY(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Hi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Hi(e,this.array)),e}setW(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array),r=qe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Uc&&(t.usage=this.usage),t}};var Cr=class extends Ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Rr=class extends Ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var he=class extends Ke{constructor(t,e,n){super(new Float32Array(t),e,n)}},Pu=0,on=new _e,To=new Ge,Bi=new D,nn=new Sn,gs=new Sn,Le=new D,Oe=class i extends ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(jl(t)?Rr:Cr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return To.lookAt(t),To.updateMatrix(),this.applyMatrix4(To.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new he(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ts);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];gs.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(nn.min,gs.min),nn.expandByPoint(Le),Le.addVectors(nn.max,gs.max),nn.expandByPoint(Le)):(nn.expandByPoint(gs.min),nn.expandByPoint(gs.max))}nn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Le.fromBufferAttribute(a,l),c&&(Bi.fromBufferAttribute(t,l),Le.add(Bi)),s=Math.max(s,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new D,c[I]=new D;let l=new D,h=new D,d=new D,u=new gt,f=new gt,m=new gt,_=new D,g=new D;function p(I,b,M){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,M),u.fromBufferAttribute(r,I),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,M),h.sub(l),d.sub(l),f.sub(u),m.sub(u);let P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),a[I].add(_),a[b].add(_),a[M].add(_),c[I].add(g),c[b].add(g),c[M].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let I=0,b=S.length;I<b;++I){let M=S[I],P=M.start,F=M.count;for(let B=P,W=P+F;B<W;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let v=new D,y=new D,R=new D,T=new D;function C(I){R.fromBufferAttribute(s,I),T.copy(R);let b=a[I];v.copy(b),v.sub(R.multiplyScalar(R.dot(b))).normalize(),y.crossVectors(T,b);let P=y.dot(c[I])<0?-1:1;o.setXYZW(I,v.x,v.y,v.z,P)}for(let I=0,b=S.length;I<b;++I){let M=S[I],P=M.start,F=M.count;for(let B=P,W=P+F;B<W;B+=3)C(t.getX(B+0)),C(t.getX(B+1)),C(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,h=new D,d=new D;if(t)for(let u=0,f=t.count;u<f;u+=3){let m=t.getX(u+0),_=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h),f=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)u[m++]=l[f++]}return new Ke(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qc=new _e,li=new Rs,er=new ts,jc=new D,nr=new D,ir=new D,sr=new D,Ao=new D,rr=new D,tl=new D,or=new D,Fe=class extends Ge{constructor(t=new Oe,e=new ii){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){rr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],d=r[c];h!==0&&(Ao.fromBufferAttribute(d,t),o?rr.addScaledVector(Ao,h):rr.addScaledVector(Ao.sub(e),h))}e.add(rr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(r),li.copy(t.ray).recast(t.near),!(er.containsPoint(li.origin)===!1&&(li.intersectSphere(er,jc)===null||li.origin.distanceToSquared(jc)>(t.far-t.near)**2))&&(Qc.copy(r).invert(),li.copy(t.ray).applyMatrix4(Qc),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,li)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=u.length;m<_;m++){let g=u[m],p=o[g.materialIndex],S=Math.max(g.start,f.start),v=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=S,R=v;y<R;y+=3){let T=a.getX(y),C=a.getX(y+1),I=a.getX(y+2);s=ar(this,p,t,n,l,h,d,T,C,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let S=a.getX(g),v=a.getX(g+1),y=a.getX(g+2);s=ar(this,o,t,n,l,h,d,S,v,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=u.length;m<_;m++){let g=u[m],p=o[g.materialIndex],S=Math.max(g.start,f.start),v=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=S,R=v;y<R;y+=3){let T=y,C=y+1,I=y+2;s=ar(this,p,t,n,l,h,d,T,C,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let S=g,v=g+1,y=g+2;s=ar(this,o,t,n,l,h,d,S,v,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Lu(i,t,e,n,s,r,o,a){let c;if(t.side===He?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===jn,a),c===null)return null;or.copy(a),or.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(or);return l<e.near||l>e.far?null:{distance:l,point:or.clone(),object:i}}function ar(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,nr),i.getVertexPosition(c,ir),i.getVertexPosition(l,sr);let h=Lu(i,t,e,n,nr,ir,sr,tl);if(h){let d=new D;mi.getBarycoord(tl,nr,ir,sr,d),s&&(h.uv=mi.getInterpolatedAttribute(s,a,c,l,d,new gt)),r&&(h.uv1=mi.getInterpolatedAttribute(r,a,c,l,d,new gt)),o&&(h.normal=mi.getInterpolatedAttribute(o,a,c,l,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new D,materialIndex:0};mi.getNormal(nr,ir,sr,u.normal),h.face=u,h.barycoord=d}return h}var Ue=class i extends Oe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(d,2));function m(_,g,p,S,v,y,R,T,C,I,b){let M=y/C,P=R/I,F=y/2,B=R/2,W=T/2,Z=C+1,G=I+1,nt=0,X=0,st=new D;for(let mt=0;mt<G;mt++){let xt=mt*P-B;for(let zt=0;zt<Z;zt++){let jt=zt*M-F;st[_]=jt*S,st[g]=xt*v,st[p]=W,l.push(st.x,st.y,st.z),st[_]=0,st[g]=0,st[p]=T>0?1:-1,h.push(st.x,st.y,st.z),d.push(zt/C),d.push(1-mt/I),nt+=1}}for(let mt=0;mt<I;mt++)for(let xt=0;xt<C;xt++){let zt=u+xt+Z*mt,jt=u+xt+Z*(mt+1),$=u+(xt+1)+Z*(mt+1),lt=u+(xt+1)+Z*mt;c.push(zt,jt,lt),c.push(jt,$,lt),X+=6}a.addGroup(f,X,b),f+=X,u+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function es(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ye(i){let t={};for(let e=0;e<i.length;e++){let n=es(i[e]);for(let s in n)t[s]=n[s]}return t}function Du(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function eh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}var Uu={clone:es,merge:Ye},Nu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,wn=class extends ni{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nu,this.fragmentShader=Fu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=es(t.uniforms),this.uniformsGroups=Du(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Ir=class extends Ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=On}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},$n=new D,el=new gt,nl=new gt,ke=class extends Ir{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,el,nl),e.subVectors(nl,el)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(vs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},zi=-90,Vi=1,Aa=class extends Ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ke(zi,Vi,t,e);s.layers=this.layers,this.add(s);let r=new ke(zi,Vi,t,e);r.layers=this.layers,this.add(r);let o=new ke(zi,Vi,t,e);o.layers=this.layers,this.add(o);let a=new ke(zi,Vi,t,e);a.layers=this.layers,this.add(a);let c=new ke(zi,Vi,t,e);c.layers=this.layers,this.add(c);let l=new ke(zi,Vi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===wr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Pr=class extends sn{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ji,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ca=class extends Vn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Pr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Mn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ue(5,5,5),r=new wn({name:"CubemapFromEquirect",uniforms:es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:He,blending:Kn});r.uniforms.tEquirect.value=e;let o=new Fe(s,r),a=e.minFilter;return e.minFilter===_i&&(e.minFilter=Mn),new Aa(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Co=new D,Ou=new D,Bu=new Qt,Nn=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Co.subVectors(n,e).cross(Ou.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Co),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Bu.getNormalMatrix(t),s=this.coplanarPoint(Co).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},hi=new ts,cr=new D,Ps=class{constructor(t=new Nn,e=new Nn,n=new Nn,s=new Nn,r=new Nn,o=new Nn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],d=s[6],u=s[7],f=s[8],m=s[9],_=s[10],g=s[11],p=s[12],S=s[13],v=s[14],y=s[15];if(n[0].setComponents(c-r,u-l,g-f,y-p).normalize(),n[1].setComponents(c+r,u+l,g+f,y+p).normalize(),n[2].setComponents(c+o,u+h,g+m,y+S).normalize(),n[3].setComponents(c-o,u-h,g-m,y-S).normalize(),n[4].setComponents(c-a,u-d,g-_,y-v).normalize(),e===On)n[5].setComponents(c+a,u+d,g+_,y+v).normalize();else if(e===wr)n[5].setComponents(a,d,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(t){return hi.center.set(0,0,0),hi.radius=.7071067811865476,hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(cr.x=s.normal.x>0?t.max.x:t.min.x,cr.y=s.normal.y>0?t.max.y:t.min.y,cr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(cr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function nh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function zu(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let _=d[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var we=class i extends Oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,d=t/a,u=e/c,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){let S=p*u-o;for(let v=0;v<l;v++){let y=v*d-r;m.push(y,-S,0),_.push(0,0,1),g.push(v/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<a;S++){let v=S+l*p,y=S+l*(p+1),R=S+1+l*(p+1),T=S+1+l*p;f.push(v,y,T),f.push(y,R,T)}this.setIndex(f),this.setAttribute("position",new he(m,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ku=`#ifdef USE_ALPHAHASH
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
#endif`,Hu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qu=`#ifdef USE_AOMAP
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
#endif`,Yu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zu=`#ifdef USE_BATCHING
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
#endif`,$u=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ju=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ku=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ju=`#ifdef USE_IRIDESCENCE
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
#endif`,td=`#ifdef USE_BUMPMAP
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
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,cd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ld=`#define PI 3.141592653589793
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
} // validated`,hd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ud=`vec3 transformedNormal = objectNormal;
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
#endif`,dd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,md=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gd="gl_FragColor = linearToOutputTexel( gl_FragColor );",xd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_d=`#ifdef USE_ENVMAP
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
#endif`,yd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vd=`#ifdef USE_ENVMAP
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
#endif`,Md=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sd=`#ifdef USE_ENVMAP
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
#endif`,bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ed=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Td=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ad=`#ifdef USE_GRADIENTMAP
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
}`,Cd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pd=`uniform bool receiveShadow;
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
#endif`,Ld=`#ifdef USE_ENVMAP
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
#endif`,Dd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ud=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Od=`PhysicalMaterial material;
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
#endif`,Bd=`struct PhysicalMaterial {
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
}`,zd=`
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
#endif`,Vd=`#if defined( RE_IndirectDiffuse )
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
#endif`,kd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$d=`#if defined( USE_POINTS_UV )
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
#endif`,Jd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ef=`#ifdef USE_MORPHTARGETS
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
#endif`,nf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,rf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lf=`#ifdef USE_NORMALMAP
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
#endif`,hf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,df=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ff=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_f=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ef=`float getShadowMask() {
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
}`,Tf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Af=`#ifdef USE_SKINNING
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
#endif`,Cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rf=`#ifdef USE_SKINNING
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
#endif`,If=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Df=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Uf=`#ifdef USE_TRANSMISSION
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
#endif`,Nf=`#ifdef USE_TRANSMISSION
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
#endif`,Ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kf=`uniform sampler2D t2D;
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
}`,Hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`#include <common>
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
}`,Yf=`#if DEPTH_PACKING == 3200
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
}`,Zf=`#define DISTANCE
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
}`,$f=`#define DISTANCE
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
}`,Jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qf=`uniform float scale;
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
}`,jf=`uniform vec3 diffuse;
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
}`,tp=`#include <common>
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
}`,ep=`uniform vec3 diffuse;
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
}`,np=`#define LAMBERT
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
}`,ip=`#define LAMBERT
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
}`,sp=`#define MATCAP
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
}`,rp=`#define MATCAP
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
}`,op=`#define NORMAL
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
}`,ap=`#define NORMAL
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
}`,cp=`#define PHONG
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
}`,lp=`#define PHONG
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
}`,hp=`#define STANDARD
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
}`,up=`#define STANDARD
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
}`,dp=`#define TOON
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
}`,fp=`#define TOON
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
}`,pp=`uniform float size;
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
}`,mp=`uniform vec3 diffuse;
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
}`,gp=`#include <common>
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
}`,xp=`uniform vec3 color;
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
}`,_p=`uniform float rotation;
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
}`,yp=`uniform vec3 diffuse;
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
}`,te={alphahash_fragment:Vu,alphahash_pars_fragment:ku,alphamap_fragment:Hu,alphamap_pars_fragment:Gu,alphatest_fragment:Wu,alphatest_pars_fragment:Xu,aomap_fragment:qu,aomap_pars_fragment:Yu,batching_pars_vertex:Zu,batching_vertex:$u,begin_vertex:Ju,beginnormal_vertex:Ku,bsdfs:Qu,iridescence_fragment:ju,bumpmap_pars_fragment:td,clipping_planes_fragment:ed,clipping_planes_pars_fragment:nd,clipping_planes_pars_vertex:id,clipping_planes_vertex:sd,color_fragment:rd,color_pars_fragment:od,color_pars_vertex:ad,color_vertex:cd,common:ld,cube_uv_reflection_fragment:hd,defaultnormal_vertex:ud,displacementmap_pars_vertex:dd,displacementmap_vertex:fd,emissivemap_fragment:pd,emissivemap_pars_fragment:md,colorspace_fragment:gd,colorspace_pars_fragment:xd,envmap_fragment:_d,envmap_common_pars_fragment:yd,envmap_pars_fragment:vd,envmap_pars_vertex:Md,envmap_physical_pars_fragment:Ld,envmap_vertex:Sd,fog_vertex:bd,fog_pars_vertex:wd,fog_fragment:Ed,fog_pars_fragment:Td,gradientmap_pars_fragment:Ad,lightmap_pars_fragment:Cd,lights_lambert_fragment:Rd,lights_lambert_pars_fragment:Id,lights_pars_begin:Pd,lights_toon_fragment:Dd,lights_toon_pars_fragment:Ud,lights_phong_fragment:Nd,lights_phong_pars_fragment:Fd,lights_physical_fragment:Od,lights_physical_pars_fragment:Bd,lights_fragment_begin:zd,lights_fragment_maps:Vd,lights_fragment_end:kd,logdepthbuf_fragment:Hd,logdepthbuf_pars_fragment:Gd,logdepthbuf_pars_vertex:Wd,logdepthbuf_vertex:Xd,map_fragment:qd,map_pars_fragment:Yd,map_particle_fragment:Zd,map_particle_pars_fragment:$d,metalnessmap_fragment:Jd,metalnessmap_pars_fragment:Kd,morphinstance_vertex:Qd,morphcolor_vertex:jd,morphnormal_vertex:tf,morphtarget_pars_vertex:ef,morphtarget_vertex:nf,normal_fragment_begin:sf,normal_fragment_maps:rf,normal_pars_fragment:of,normal_pars_vertex:af,normal_vertex:cf,normalmap_pars_fragment:lf,clearcoat_normal_fragment_begin:hf,clearcoat_normal_fragment_maps:uf,clearcoat_pars_fragment:df,iridescence_pars_fragment:ff,opaque_fragment:pf,packing:mf,premultiplied_alpha_fragment:gf,project_vertex:xf,dithering_fragment:_f,dithering_pars_fragment:yf,roughnessmap_fragment:vf,roughnessmap_pars_fragment:Mf,shadowmap_pars_fragment:Sf,shadowmap_pars_vertex:bf,shadowmap_vertex:wf,shadowmask_pars_fragment:Ef,skinbase_vertex:Tf,skinning_pars_vertex:Af,skinning_vertex:Cf,skinnormal_vertex:Rf,specularmap_fragment:If,specularmap_pars_fragment:Pf,tonemapping_fragment:Lf,tonemapping_pars_fragment:Df,transmission_fragment:Uf,transmission_pars_fragment:Nf,uv_pars_fragment:Ff,uv_pars_vertex:Of,uv_vertex:Bf,worldpos_vertex:zf,background_vert:Vf,background_frag:kf,backgroundCube_vert:Hf,backgroundCube_frag:Gf,cube_vert:Wf,cube_frag:Xf,depth_vert:qf,depth_frag:Yf,distanceRGBA_vert:Zf,distanceRGBA_frag:$f,equirect_vert:Jf,equirect_frag:Kf,linedashed_vert:Qf,linedashed_frag:jf,meshbasic_vert:tp,meshbasic_frag:ep,meshlambert_vert:np,meshlambert_frag:ip,meshmatcap_vert:sp,meshmatcap_frag:rp,meshnormal_vert:op,meshnormal_frag:ap,meshphong_vert:cp,meshphong_frag:lp,meshphysical_vert:hp,meshphysical_frag:up,meshtoon_vert:dp,meshtoon_frag:fp,points_vert:pp,points_frag:mp,shadow_vert:gp,shadow_frag:xp,sprite_vert:_p,sprite_frag:yp},Mt={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},vn={basic:{uniforms:Ye([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Ye([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Ye([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Ye([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Ye([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Ye([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Ye([Mt.points,Mt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Ye([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Ye([Mt.common,Mt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Ye([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Ye([Mt.sprite,Mt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:Ye([Mt.common,Mt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:Ye([Mt.lights,Mt.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};vn.physical={uniforms:Ye([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var lr={r:0,b:0,g:0},ui=new bn,vp=new _e;function Mp(i,t,e,n,s,r,o){let a=new Jt(0),c=r===!0?0:1,l,h,d=null,u=0,f=null;function m(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?e:t).get(v)),v}function _(S){let v=!1,y=m(S);y===null?p(a,c):y&&y.isColor&&(p(y,1),v=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(S,v){let y=m(v);y&&(y.isCubeTexture||y.mapping===Qr)?(h===void 0&&(h=new Fe(new Ue(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:es(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ui.copy(v.backgroundRotation),ui.x*=-1,ui.y*=-1,ui.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(vp.makeRotationFromEuler(ui)),h.material.toneMapped=se.getTransfer(y.colorSpace)!==de,(d!==y||u!==y.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=y,u=y.version,f=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Fe(new we(2,2),new wn({name:"BackgroundMaterial",uniforms:es(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=se.getTransfer(y.colorSpace)!==de,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||u!==y.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=y,u=y.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,v){S.getRGB(lr,eh(i)),n.buffers.color.setClear(lr.r,lr.g,lr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(a,c)},render:_,addToRenderList:g}}function Sp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(M,P,F,B,W){let Z=!1,G=d(B,F,P);r!==G&&(r=G,l(r.object)),Z=f(M,B,F,W),Z&&m(M,B,F,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,y(M,P,F,B),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function d(M,P,F){let B=F.wireframe===!0,W=n[M.id];W===void 0&&(W={},n[M.id]=W);let Z=W[P.id];Z===void 0&&(Z={},W[P.id]=Z);let G=Z[B];return G===void 0&&(G=u(c()),Z[B]=G),G}function u(M){let P=[],F=[],B=[];for(let W=0;W<e;W++)P[W]=0,F[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:B,object:M,attributes:{},index:null}}function f(M,P,F,B){let W=r.attributes,Z=P.attributes,G=0,nt=F.getAttributes();for(let X in nt)if(nt[X].location>=0){let mt=W[X],xt=Z[X];if(xt===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(xt=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(xt=M.instanceColor)),mt===void 0||mt.attribute!==xt||xt&&mt.data!==xt.data)return!0;G++}return r.attributesNum!==G||r.index!==B}function m(M,P,F,B){let W={},Z=P.attributes,G=0,nt=F.getAttributes();for(let X in nt)if(nt[X].location>=0){let mt=Z[X];mt===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(mt=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(mt=M.instanceColor));let xt={};xt.attribute=mt,mt&&mt.data&&(xt.data=mt.data),W[X]=xt,G++}r.attributes=W,r.attributesNum=G,r.index=B}function _(){let M=r.newAttributes;for(let P=0,F=M.length;P<F;P++)M[P]=0}function g(M){p(M,0)}function p(M,P){let F=r.newAttributes,B=r.enabledAttributes,W=r.attributeDivisors;F[M]=1,B[M]===0&&(i.enableVertexAttribArray(M),B[M]=1),W[M]!==P&&(i.vertexAttribDivisor(M,P),W[M]=P)}function S(){let M=r.newAttributes,P=r.enabledAttributes;for(let F=0,B=P.length;F<B;F++)P[F]!==M[F]&&(i.disableVertexAttribArray(F),P[F]=0)}function v(M,P,F,B,W,Z,G){G===!0?i.vertexAttribIPointer(M,P,F,W,Z):i.vertexAttribPointer(M,P,F,B,W,Z)}function y(M,P,F,B){_();let W=B.attributes,Z=F.getAttributes(),G=P.defaultAttributeValues;for(let nt in Z){let X=Z[nt];if(X.location>=0){let st=W[nt];if(st===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(st=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(st=M.instanceColor)),st!==void 0){let mt=st.normalized,xt=st.itemSize,zt=t.get(st);if(zt===void 0)continue;let jt=zt.buffer,$=zt.type,lt=zt.bytesPerElement,Et=$===i.INT||$===i.UNSIGNED_INT||st.gpuType===hc;if(st.isInterleavedBufferAttribute){let dt=st.data,Lt=dt.stride,Ft=st.offset;if(dt.isInstancedInterleavedBuffer){for(let Ot=0;Ot<X.locationSize;Ot++)p(X.location+Ot,dt.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Ot=0;Ot<X.locationSize;Ot++)g(X.location+Ot);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let Ot=0;Ot<X.locationSize;Ot++)v(X.location+Ot,xt/X.locationSize,$,mt,Lt*lt,(Ft+xt/X.locationSize*Ot)*lt,Et)}else{if(st.isInstancedBufferAttribute){for(let dt=0;dt<X.locationSize;dt++)p(X.location+dt,st.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let dt=0;dt<X.locationSize;dt++)g(X.location+dt);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let dt=0;dt<X.locationSize;dt++)v(X.location+dt,xt/X.locationSize,$,mt,xt*lt,xt/X.locationSize*dt*lt,Et)}}else if(G!==void 0){let mt=G[nt];if(mt!==void 0)switch(mt.length){case 2:i.vertexAttrib2fv(X.location,mt);break;case 3:i.vertexAttrib3fv(X.location,mt);break;case 4:i.vertexAttrib4fv(X.location,mt);break;default:i.vertexAttrib1fv(X.location,mt)}}}}S()}function R(){I();for(let M in n){let P=n[M];for(let F in P){let B=P[F];for(let W in B)h(B[W].object),delete B[W];delete P[F]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let P=n[M.id];for(let F in P){let B=P[F];for(let W in B)h(B[W].object),delete B[W];delete P[F]}delete n[M.id]}function C(M){for(let P in n){let F=n[P];if(F[M.id]===void 0)continue;let B=F[M.id];for(let W in B)h(B[W].object),delete B[W];delete F[M.id]}}function I(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function bp(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function a(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let m=0;m<d;m++)f+=h[m];e.update(f,n,1)}function c(l,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)o(l[m],h[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let m=0;for(let _=0;_<d;_++)m+=h[_]*u[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function wp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==mn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let I=C===Hs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==zn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Fn&&!I)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:S,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:R,maxSamples:T}}function Ep(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Nn,a=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let S=r?0:n,v=S*4,y=p.clippingState||null;c.value=y,y=h(m,u,v,f);for(let R=0;R!==v;++R)y[R]=e[R];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=c.value,m!==!0||g===null){let p=f+_*4,S=u.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,y=f;v!==_;++v,y+=4)o.copy(d[v]).applyMatrix4(S,a),o.normal.toArray(g,y),g[y+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function Tp(i){let t=new WeakMap;function e(o,a){return a===Ts?o.mapping=Ji:a===$o&&(o.mapping=Ki),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ts||a===$o)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Ca(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Lr=class extends Ir{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Gi=4,il=[.125,.215,.35,.446,.526,.582],gi=20,Ro=new Lr,sl=new Jt,Io=null,Po=0,Lo=0,Do=!1,fi=(1+Math.sqrt(5))/2,ki=1/fi,rl=[new D(-fi,ki,0),new D(fi,ki,0),new D(-ki,0,fi),new D(ki,0,fi),new D(0,fi,-ki),new D(0,fi,ki),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Dr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Io=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Lo=this._renderer.getActiveMipmapLevel(),Do=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=al(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Io,Po,Lo),this._renderer.xr.enabled=Do,t.scissorTest=!1,hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ji||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Io=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Lo=this._renderer.getActiveMipmapLevel(),Do=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:Hs,format:mn,colorSpace:rs,depthBuffer:!1},s=ol(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ol(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ap(r)),this._blurMaterial=Cp(r,t,e)}return s}_compileMaterial(t){let e=new Fe(this._lodPlanes[0],t);this._renderer.compile(e,Ro)}_sceneToCubeUV(t,e,n,s){let a=new ke(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(sl),h.toneMapping=Qn,h.autoClear=!1;let f=new ii({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1}),m=new Fe(new Ue,f),_=!1,g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(sl),_=!0);for(let p=0;p<6;p++){let S=p%3;S===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):S===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let v=this._cubeSize;hr(s,S*v,p>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=g}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ji||t.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=al());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Fe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;hr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ro)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=rl[(s-r-1)%rl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Fe(this._lodPlanes[s],l),u=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gi-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):gi;g>gi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${gi}`);let p=[],S=0;for(let C=0;C<gi;++C){let I=C/_,b=Math.exp(-I*I/2);p.push(b),C===0?S+=b:C<g&&(S+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/S;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:v}=this;u.dTheta.value=m,u.mipInt.value=v-n;let y=this._sizeLods[s],R=3*y*(s>v-Gi?s-v+Gi:0),T=4*(this._cubeSize-y);hr(e,R,T,3*y,2*y),c.setRenderTarget(e),c.render(d,Ro)}};function Ap(i){let t=[],e=[],n=[],s=i,r=i-Gi+1+il.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Gi?c=il[o-i+Gi-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,_=3,g=2,p=1,S=new Float32Array(_*m*f),v=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let T=0;T<f;T++){let C=T%3*2/3-1,I=T>2?0:-1,b=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];S.set(b,_*m*T),v.set(u,g*m*T);let M=[T,T,T,T,T,T];y.set(M,p*m*T)}let R=new Oe;R.setAttribute("position",new Ke(S,_)),R.setAttribute("uv",new Ke(v,g)),R.setAttribute("faceIndex",new Ke(y,p)),t.push(R),s>Gi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ol(i,t,e){let n=new Vn(i,t,e);return n.texture.mapping=Qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Cp(i,t,e){let n=new Float32Array(gi),s=new D(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xc(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function al(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xc(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function cl(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function xc(){return`

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
	`}function Rp(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Ts||c===$o,h=c===Ji||c===Ki;if(l||h){let d=t.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Dr(i)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Dr(i)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Ip(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&_s("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Pp(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let m in u.attributes)t.remove(u.attributes[m]);for(let m in u.morphAttributes){let _=u.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(d){let u=d.attributes;for(let m in u)t.update(u[m],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let m in f){let _=f[m];for(let g=0,p=_.length;g<p;g++)t.update(_[g],i.ARRAY_BUFFER)}}function l(d){let u=[],f=d.index,m=d.attributes.position,_=0;if(f!==null){let S=f.array;_=f.version;for(let v=0,y=S.length;v<y;v+=3){let R=S[v+0],T=S[v+1],C=S[v+2];u.push(R,T,T,C,C,R)}}else if(m!==void 0){let S=m.array;_=m.version;for(let v=0,y=S.length/3-1;v<y;v+=3){let R=v+0,T=v+1,C=v+2;u.push(R,T,T,C,C,R)}}else return;let g=new(jl(u)?Rr:Cr)(u,1);g.version=_;let p=r.get(d);p&&t.remove(p),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function Lp(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function l(u,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,u*o,m),e.update(f,n,m))}function h(u,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function d(u,f,m,_){if(m===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<u.length;p++)l(u[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,m);let p=0;for(let S=0;S<m;S++)p+=f[S]*_[S];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Dp(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Up(i,t,e){let n=new WeakMap,s=new fe;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let b=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],v=0;f===!0&&(v=1),m===!0&&(v=2),_===!0&&(v=3);let y=a.attributes.position.count*v,R=1;y>t.maxTextureSize&&(R=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let T=new Float32Array(y*R*4*d),C=new Ar(T,y,R,d);C.type=Fn,C.needsUpdate=!0;let I=v*4;for(let M=0;M<d;M++){let P=g[M],F=p[M],B=S[M],W=y*R*4*M;for(let Z=0;Z<P.count;Z++){let G=Z*I;f===!0&&(s.fromBufferAttribute(P,Z),T[W+G+0]=s.x,T[W+G+1]=s.y,T[W+G+2]=s.z,T[W+G+3]=0),m===!0&&(s.fromBufferAttribute(F,Z),T[W+G+4]=s.x,T[W+G+5]=s.y,T[W+G+6]=s.z,T[W+G+7]=0),_===!0&&(s.fromBufferAttribute(B,Z),T[W+G+8]=s.x,T[W+G+9]=s.y,T[W+G+10]=s.z,T[W+G+11]=B.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new gt(y,R)},n.set(a,u),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Np(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,d=t.get(c,h);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Ur=class extends sn{constructor(t,e,n,s,r,o,a,c,l,h=qi){if(h!==qi&&h!==ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===qi&&(n=yi),n===void 0&&h===ji&&(n=Qi),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:gn,this.minFilter=c!==void 0?c:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ih=new sn,ll=new Ur(1,1),sh=new Ar,rh=new Ta,oh=new Pr,hl=[],ul=[],dl=new Float32Array(16),fl=new Float32Array(9),pl=new Float32Array(4);function os(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=hl[s];if(r===void 0&&(r=new Float32Array(s),hl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function to(i,t){let e=ul[t];e===void 0&&(e=new Int32Array(t),ul[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Fp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Op(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function Bp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function zp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function Vp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;pl.set(n),i.uniformMatrix2fv(this.addr,!1,pl),Ce(e,n)}}function kp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;fl.set(n),i.uniformMatrix3fv(this.addr,!1,fl),Ce(e,n)}}function Hp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;dl.set(n),i.uniformMatrix4fv(this.addr,!1,dl),Ce(e,n)}}function Gp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Wp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function Xp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function qp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function Yp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Zp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function $p(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function Jp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function Kp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ll.compareFunction=Ql,r=ll):r=ih,e.setTexture2D(t||r,s)}function Qp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||rh,s)}function jp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||oh,s)}function t0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||sh,s)}function e0(i){switch(i){case 5126:return Fp;case 35664:return Op;case 35665:return Bp;case 35666:return zp;case 35674:return Vp;case 35675:return kp;case 35676:return Hp;case 5124:case 35670:return Gp;case 35667:case 35671:return Wp;case 35668:case 35672:return Xp;case 35669:case 35673:return qp;case 5125:return Yp;case 36294:return Zp;case 36295:return $p;case 36296:return Jp;case 35678:case 36198:case 36298:case 36306:case 35682:return Kp;case 35679:case 36299:case 36307:return Qp;case 35680:case 36300:case 36308:case 36293:return jp;case 36289:case 36303:case 36311:case 36292:return t0}}function n0(i,t){i.uniform1fv(this.addr,t)}function i0(i,t){let e=os(t,this.size,2);i.uniform2fv(this.addr,e)}function s0(i,t){let e=os(t,this.size,3);i.uniform3fv(this.addr,e)}function r0(i,t){let e=os(t,this.size,4);i.uniform4fv(this.addr,e)}function o0(i,t){let e=os(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function a0(i,t){let e=os(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function c0(i,t){let e=os(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function l0(i,t){i.uniform1iv(this.addr,t)}function h0(i,t){i.uniform2iv(this.addr,t)}function u0(i,t){i.uniform3iv(this.addr,t)}function d0(i,t){i.uniform4iv(this.addr,t)}function f0(i,t){i.uniform1uiv(this.addr,t)}function p0(i,t){i.uniform2uiv(this.addr,t)}function m0(i,t){i.uniform3uiv(this.addr,t)}function g0(i,t){i.uniform4uiv(this.addr,t)}function x0(i,t,e){let n=this.cache,s=t.length,r=to(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||ih,r[o])}function _0(i,t,e){let n=this.cache,s=t.length,r=to(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||rh,r[o])}function y0(i,t,e){let n=this.cache,s=t.length,r=to(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||oh,r[o])}function v0(i,t,e){let n=this.cache,s=t.length,r=to(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||sh,r[o])}function M0(i){switch(i){case 5126:return n0;case 35664:return i0;case 35665:return s0;case 35666:return r0;case 35674:return o0;case 35675:return a0;case 35676:return c0;case 5124:case 35670:return l0;case 35667:case 35671:return h0;case 35668:case 35672:return u0;case 35669:case 35673:return d0;case 5125:return f0;case 36294:return p0;case 36295:return m0;case 36296:return g0;case 35678:case 36198:case 36298:case 36306:case 35682:return x0;case 35679:case 36299:case 36307:return _0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return v0}}var Ra=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=e0(e.type)}},Ia=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=M0(e.type)}},Pa=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Uo=/(\w+)(\])?(\[|\.)?/g;function ml(i,t){i.seq.push(t),i.map[t.id]=t}function S0(i,t,e){let n=i.name,s=n.length;for(Uo.lastIndex=0;;){let r=Uo.exec(n),o=Uo.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ml(e,l===void 0?new Ra(a,i,t):new Ia(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Pa(a),ml(e,d)),e=d}}}var Zi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);S0(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function gl(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var b0=37297,w0=0;function E0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var xl=new Qt;function T0(i){se._getMatrix(xl,se.workingColorSpace,i);let t=`mat3( ${xl.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case jr:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function _l(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+E0(i.getShaderSource(t),o)}else return s}function A0(i,t){let e=T0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function C0(i,t){let e;switch(t){case Bh:e="Linear";break;case zh:e="Reinhard";break;case Vh:e="Cineon";break;case kh:e="ACESFilmic";break;case Gh:e="AgX";break;case lc:e="Neutral";break;case Hh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ur=new D;function R0(){se.getLuminanceCoefficients(ur);let i=ur.x.toFixed(4),t=ur.y.toFixed(4),e=ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function I0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ys).join(`
`)}function P0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function L0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ys(i){return i!==""}function yl(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function vl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var D0=/^[ \t]*#include +<([\w\d./]+)>/gm;function La(i){return i.replace(D0,N0)}var U0=new Map;function N0(i,t){let e=te[t];if(e===void 0){let n=U0.get(t);if(n!==void 0)e=te[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return La(e)}var F0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ml(i){return i.replace(F0,O0)}function O0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Sl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function B0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===cc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function z0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ji:case Ki:t="ENVMAP_TYPE_CUBE";break;case Qr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function V0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ki:t="ENVMAP_MODE_REFRACTION";break}return t}function k0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case zl:t="ENVMAP_BLENDING_MULTIPLY";break;case Fh:t="ENVMAP_BLENDING_MIX";break;case Oh:t="ENVMAP_BLENDING_ADD";break}return t}function H0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function G0(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=B0(e),l=z0(e),h=V0(e),d=k0(e),u=H0(e),f=I0(e),m=P0(r),_=s.createProgram(),g,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ys).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ys).join(`
`),p.length>0&&(p+=`
`)):(g=[Sl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ys).join(`
`),p=[Sl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Qn?"#define TONE_MAPPING":"",e.toneMapping!==Qn?te.tonemapping_pars_fragment:"",e.toneMapping!==Qn?C0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,A0("linearToOutputTexel",e.outputColorSpace),R0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ys).join(`
`)),o=La(o),o=yl(o,e),o=vl(o,e),a=La(a),a=yl(a,e),a=vl(a,e),o=Ml(o),a=Ml(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Nc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Nc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=S+g+o,y=S+p+a,R=gl(s,s.VERTEX_SHADER,v),T=gl(s,s.FRAGMENT_SHADER,y);s.attachShader(_,R),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(_).trim(),B=s.getShaderInfoLog(R).trim(),W=s.getShaderInfoLog(T).trim(),Z=!0,G=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,T);else{let nt=_l(s,R,"vertex"),X=_l(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+nt+`
`+X)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(B===""||W==="")&&(G=!1);G&&(P.diagnostics={runnable:Z,programLog:F,vertexShader:{log:B,prefix:g},fragmentShader:{log:W,prefix:p}})}s.deleteShader(R),s.deleteShader(T),I=new Zi(s,_),b=L0(s,_)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,b0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=w0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=T,this}var W0=0,Da=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ua(t),e.set(t,n)),n}},Ua=class{constructor(t){this.id=W0++,this.code=t,this.usedTimes=0}};function X0(i,t,e,n,s,r,o){let a=new Is,c=new Da,l=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures,f=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,M,P,F,B){let W=F.fog,Z=B.geometry,G=b.isMeshStandardMaterial?F.environment:null,nt=(b.isMeshStandardMaterial?e:t).get(b.envMap||G),X=nt&&nt.mapping===Qr?nt.image.height:null,st=m[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let mt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,xt=mt!==void 0?mt.length:0,zt=0;Z.morphAttributes.position!==void 0&&(zt=1),Z.morphAttributes.normal!==void 0&&(zt=2),Z.morphAttributes.color!==void 0&&(zt=3);let jt,$,lt,Et;if(st){let oe=vn[st];jt=oe.vertexShader,$=oe.fragmentShader}else jt=b.vertexShader,$=b.fragmentShader,c.update(b),lt=c.getVertexShaderID(b),Et=c.getFragmentShaderID(b);let dt=i.getRenderTarget(),Lt=i.state.buffers.depth.getReversed(),Ft=B.isInstancedMesh===!0,Ot=B.isBatchedMesh===!0,Yt=!!b.map,j=!!b.matcap,rt=!!nt,L=!!b.aoMap,pt=!!b.lightMap,at=!!b.bumpMap,Ct=!!b.normalMap,ft=!!b.displacementMap,Vt=!!b.emissiveMap,_t=!!b.metalnessMap,A=!!b.roughnessMap,w=b.anisotropy>0,H=b.clearcoat>0,J=b.dispersion>0,tt=b.iridescence>0,K=b.sheen>0,Pt=b.transmission>0,yt=w&&!!b.anisotropyMap,At=H&&!!b.clearcoatMap,ee=H&&!!b.clearcoatNormalMap,ut=H&&!!b.clearcoatRoughnessMap,Rt=tt&&!!b.iridescenceMap,kt=tt&&!!b.iridescenceThicknessMap,Ht=K&&!!b.sheenColorMap,It=K&&!!b.sheenRoughnessMap,ne=!!b.specularMap,Xt=!!b.specularColorMap,le=!!b.specularIntensityMap,N=Pt&&!!b.transmissionMap,St=Pt&&!!b.thicknessMap,Y=!!b.gradientMap,Q=!!b.alphaMap,Tt=b.alphaTest>0,wt=!!b.alphaHash,Zt=!!b.extensions,ye=Qn;b.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(ye=i.toneMapping);let Pe={shaderID:st,shaderType:b.type,shaderName:b.name,vertexShader:jt,fragmentShader:$,defines:b.defines,customVertexShaderID:lt,customFragmentShaderID:Et,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ot,batchingColor:Ot&&B._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&B.instanceColor!==null,instancingMorph:Ft&&B.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:dt===null?i.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:rs,alphaToCoverage:!!b.alphaToCoverage,map:Yt,matcap:j,envMap:rt,envMapMode:rt&&nt.mapping,envMapCubeUVHeight:X,aoMap:L,lightMap:pt,bumpMap:at,normalMap:Ct,displacementMap:u&&ft,emissiveMap:Vt,normalMapObjectSpace:Ct&&b.normalMapType===Yh,normalMapTangentSpace:Ct&&b.normalMapType===Kl,metalnessMap:_t,roughnessMap:A,anisotropy:w,anisotropyMap:yt,clearcoat:H,clearcoatMap:At,clearcoatNormalMap:ee,clearcoatRoughnessMap:ut,dispersion:J,iridescence:tt,iridescenceMap:Rt,iridescenceThicknessMap:kt,sheen:K,sheenColorMap:Ht,sheenRoughnessMap:It,specularMap:ne,specularColorMap:Xt,specularIntensityMap:le,transmission:Pt,transmissionMap:N,thicknessMap:St,gradientMap:Y,opaque:b.transparent===!1&&b.blending===Xi&&b.alphaToCoverage===!1,alphaMap:Q,alphaTest:Tt,alphaHash:wt,combine:b.combine,mapUv:Yt&&_(b.map.channel),aoMapUv:L&&_(b.aoMap.channel),lightMapUv:pt&&_(b.lightMap.channel),bumpMapUv:at&&_(b.bumpMap.channel),normalMapUv:Ct&&_(b.normalMap.channel),displacementMapUv:ft&&_(b.displacementMap.channel),emissiveMapUv:Vt&&_(b.emissiveMap.channel),metalnessMapUv:_t&&_(b.metalnessMap.channel),roughnessMapUv:A&&_(b.roughnessMap.channel),anisotropyMapUv:yt&&_(b.anisotropyMap.channel),clearcoatMapUv:At&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:ee&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:It&&_(b.sheenRoughnessMap.channel),specularMapUv:ne&&_(b.specularMap.channel),specularColorMapUv:Xt&&_(b.specularColorMap.channel),specularIntensityMapUv:le&&_(b.specularIntensityMap.channel),transmissionMapUv:N&&_(b.transmissionMap.channel),thicknessMapUv:St&&_(b.thicknessMap.channel),alphaMapUv:Q&&_(b.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Ct||w),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Z.attributes.uv&&(Yt||Q),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Lt,skinning:B.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:zt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ye,decodeVideoTexture:Yt&&b.map.isVideoTexture===!0&&se.getTransfer(b.map.colorSpace)===de,decodeVideoTextureEmissive:Vt&&b.emissiveMap.isVideoTexture===!0&&se.getTransfer(b.emissiveMap.colorSpace)===de,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Te,flipSided:b.side===He,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Zt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&b.extensions.multiDraw===!0||Ot)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Pe.vertexUv1s=l.has(1),Pe.vertexUv2s=l.has(2),Pe.vertexUv3s=l.has(3),l.clear(),Pe}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let P in b.defines)M.push(P),M.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(S(M,b),v(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function S(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function y(b){let M=m[b.type],P;if(M){let F=vn[M];P=Uu.clone(F.uniforms)}else P=b.uniforms;return P}function R(b,M){let P;for(let F=0,B=h.length;F<B;F++){let W=h[F];if(W.cacheKey===M){P=W,++P.usedTimes;break}}return P===void 0&&(P=new G0(i,M,b,r),h.push(P)),P}function T(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){c.remove(b)}function I(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:R,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:I}}function q0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Y0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function bl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function wl(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,u,f,m,_,g){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:m,renderOrder:d.renderOrder,z:_,group:g},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=_,p.group=g),t++,p}function a(d,u,f,m,_,g){let p=o(d,u,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(d,u,f,m,_,g){let p=o(d,u,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(d,u){e.length>1&&e.sort(d||Y0),n.length>1&&n.sort(u||bl),s.length>1&&s.sort(u||bl)}function h(){for(let d=t,u=i.length;d<u;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Z0(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new wl,i.set(n,[o])):s>=r.length?(o=new wl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function $0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Jt};break;case"SpotLight":e={position:new D,direction:new D,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function J0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var K0=0;function Q0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function j0(i){let t=new $0,e=J0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let s=new D,r=new _e,o=new _e;function a(l){let h=0,d=0,u=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,S=0,v=0,y=0,R=0,T=0,C=0;l.sort(Q0);for(let b=0,M=l.length;b<M;b++){let P=l[b],F=P.color,B=P.intensity,W=P.distance,Z=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=F.r*B,d+=F.g*B,u+=F.b*B;else if(P.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(P.sh.coefficients[G],B);C++}else if(P.isDirectionalLight){let G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let nt=P.shadow,X=e.get(P);X.shadowIntensity=nt.intensity,X.shadowBias=nt.bias,X.shadowNormalBias=nt.normalBias,X.shadowRadius=nt.radius,X.shadowMapSize=nt.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=P.shadow.matrix,S++}n.directional[f]=G,f++}else if(P.isSpotLight){let G=t.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(F).multiplyScalar(B),G.distance=W,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,n.spot[_]=G;let nt=P.shadow;if(P.map&&(n.spotLightMap[R]=P.map,R++,nt.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=nt.matrix,P.castShadow){let X=e.get(P);X.shadowIntensity=nt.intensity,X.shadowBias=nt.bias,X.shadowNormalBias=nt.normalBias,X.shadowRadius=nt.radius,X.shadowMapSize=nt.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=Z,y++}_++}else if(P.isRectAreaLight){let G=t.get(P);G.color.copy(F).multiplyScalar(B),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=G,g++}else if(P.isPointLight){let G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){let nt=P.shadow,X=e.get(P);X.shadowIntensity=nt.intensity,X.shadowBias=nt.bias,X.shadowNormalBias=nt.normalBias,X.shadowRadius=nt.radius,X.shadowMapSize=nt.mapSize,X.shadowCameraNear=nt.camera.near,X.shadowCameraFar=nt.camera.far,n.pointShadow[m]=X,n.pointShadowMap[m]=Z,n.pointShadowMatrix[m]=P.shadow.matrix,v++}n.point[m]=G,m++}else if(P.isHemisphereLight){let G=t.get(P);G.skyColor.copy(P.color).multiplyScalar(B),G.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=G,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Mt.LTC_FLOAT_1,n.rectAreaLTC2=Mt.LTC_FLOAT_2):(n.rectAreaLTC1=Mt.LTC_HALF_1,n.rectAreaLTC2=Mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let I=n.hash;(I.directionalLength!==f||I.pointLength!==m||I.spotLength!==_||I.rectAreaLength!==g||I.hemiLength!==p||I.numDirectionalShadows!==S||I.numPointShadows!==v||I.numSpotShadows!==y||I.numSpotMaps!==R||I.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,I.directionalLength=f,I.pointLength=m,I.spotLength=_,I.rectAreaLength=g,I.hemiLength=p,I.numDirectionalShadows=S,I.numPointShadows=v,I.numSpotShadows=y,I.numSpotMaps=R,I.numLightProbes=C,n.version=K0++)}function c(l,h){let d=0,u=0,f=0,m=0,_=0,g=h.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){let v=l[p];if(v.isDirectionalLight){let y=n.directional[d];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),d++}else if(v.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),f++}else if(v.isRectAreaLight){let y=n.rectArea[m];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){let y=n.point[u];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),u++}else if(v.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function El(i){let t=new j0(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function tm(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new El(i),t.set(s,[a])):r>=o.length?(a=new El(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Na=class extends ni{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Xh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Fa=class extends ni{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},em=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nm=`uniform sampler2D shadow_pass;
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
}`;function im(i,t,e){let n=new Ps,s=new gt,r=new gt,o=new fe,a=new Na({depthPacking:qh}),c=new Fa,l={},h=e.maxTextureSize,d={[jn]:He,[He]:jn,[Te]:Te},u=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:em,fragmentShader:nm}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new Oe;m.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Fe(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bl;let p=this.type;this.render=function(T,C,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Kn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let B=p!==Un&&this.type===Un,W=p===Un&&this.type!==Un;for(let Z=0,G=T.length;Z<G;Z++){let nt=T[Z],X=nt.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let st=X.getFrameExtents();if(s.multiply(st),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,X.mapSize.y=r.y)),X.map===null||B===!0||W===!0){let xt=this.type!==Un?{minFilter:gn,magFilter:gn}:{};X.map!==null&&X.map.dispose(),X.map=new Vn(s.x,s.y,xt),X.map.texture.name=nt.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();let mt=X.getViewportCount();for(let xt=0;xt<mt;xt++){let zt=X.getViewport(xt);o.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),F.viewport(o),X.updateMatrices(nt,xt),n=X.getFrustum(),y(C,I,X.camera,nt,this.type)}X.isPointLightShadow!==!0&&this.type===Un&&S(X,I),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,M,P)};function S(T,C){let I=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Vn(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,I,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,I,f,_,null)}function v(T,C,I,b){let M=null,P=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let F=M.uuid,B=C.uuid,W=l[F];W===void 0&&(W={},l[F]=W);let Z=W[B];Z===void 0&&(Z=M.clone(),W[B]=Z,C.addEventListener("dispose",R)),M=Z}if(M.visible=C.visible,M.wireframe=C.wireframe,b===Un?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:d[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let F=i.properties.get(M);F.light=I}return M}function y(T,C,I,b,M){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Un)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);let B=t.update(T),W=T.material;if(Array.isArray(W)){let Z=B.groups;for(let G=0,nt=Z.length;G<nt;G++){let X=Z[G],st=W[X.materialIndex];if(st&&st.visible){let mt=v(T,st,b,M);T.onBeforeShadow(i,T,C,I,B,mt,X),i.renderBufferDirect(I,null,B,mt,T,X),T.onAfterShadow(i,T,C,I,B,mt,X)}}}else if(W.visible){let Z=v(T,W,b,M);T.onBeforeShadow(i,T,C,I,B,Z,null),i.renderBufferDirect(I,null,B,Z,T,null),T.onAfterShadow(i,T,C,I,B,Z,null)}}let F=T.children;for(let B=0,W=F.length;B<W;B++)y(F[B],C,I,b,M)}function R(T){T.target.removeEventListener("dispose",R);for(let I in l){let b=l[I],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var sm={[Ho]:Go,[Wo]:Yo,[Xo]:Zo,[$i]:qo,[Go]:Ho,[Yo]:Wo,[Zo]:Xo,[qo]:$i};function rm(i,t){function e(){let N=!1,St=new fe,Y=null,Q=new fe(0,0,0,0);return{setMask:function(Tt){Y!==Tt&&!N&&(i.colorMask(Tt,Tt,Tt,Tt),Y=Tt)},setLocked:function(Tt){N=Tt},setClear:function(Tt,wt,Zt,ye,Pe){Pe===!0&&(Tt*=ye,wt*=ye,Zt*=ye),St.set(Tt,wt,Zt,ye),Q.equals(St)===!1&&(i.clearColor(Tt,wt,Zt,ye),Q.copy(St))},reset:function(){N=!1,Y=null,Q.set(-1,0,0,0)}}}function n(){let N=!1,St=!1,Y=null,Q=null,Tt=null;return{setReversed:function(wt){if(St!==wt){let Zt=t.get("EXT_clip_control");St?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT);let ye=Tt;Tt=null,this.setClear(ye)}St=wt},getReversed:function(){return St},setTest:function(wt){wt?dt(i.DEPTH_TEST):Lt(i.DEPTH_TEST)},setMask:function(wt){Y!==wt&&!N&&(i.depthMask(wt),Y=wt)},setFunc:function(wt){if(St&&(wt=sm[wt]),Q!==wt){switch(wt){case Ho:i.depthFunc(i.NEVER);break;case Go:i.depthFunc(i.ALWAYS);break;case Wo:i.depthFunc(i.LESS);break;case $i:i.depthFunc(i.LEQUAL);break;case Xo:i.depthFunc(i.EQUAL);break;case qo:i.depthFunc(i.GEQUAL);break;case Yo:i.depthFunc(i.GREATER);break;case Zo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=wt}},setLocked:function(wt){N=wt},setClear:function(wt){Tt!==wt&&(St&&(wt=1-wt),i.clearDepth(wt),Tt=wt)},reset:function(){N=!1,Y=null,Q=null,Tt=null,St=!1}}}function s(){let N=!1,St=null,Y=null,Q=null,Tt=null,wt=null,Zt=null,ye=null,Pe=null;return{setTest:function(oe){N||(oe?dt(i.STENCIL_TEST):Lt(i.STENCIL_TEST))},setMask:function(oe){St!==oe&&!N&&(i.stencilMask(oe),St=oe)},setFunc:function(oe,Qe,ve){(Y!==oe||Q!==Qe||Tt!==ve)&&(i.stencilFunc(oe,Qe,ve),Y=oe,Q=Qe,Tt=ve)},setOp:function(oe,Qe,ve){(wt!==oe||Zt!==Qe||ye!==ve)&&(i.stencilOp(oe,Qe,ve),wt=oe,Zt=Qe,ye=ve)},setLocked:function(oe){N=oe},setClear:function(oe){Pe!==oe&&(i.clearStencil(oe),Pe=oe)},reset:function(){N=!1,St=null,Y=null,Q=null,Tt=null,wt=null,Zt=null,ye=null,Pe=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},d={},u=new WeakMap,f=[],m=null,_=!1,g=null,p=null,S=null,v=null,y=null,R=null,T=null,C=new Jt(0,0,0),I=0,b=!1,M=null,P=null,F=null,B=null,W=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,nt=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(X)[1]),G=nt>=1):X.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),G=nt>=2);let st=null,mt={},xt=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),jt=new fe().fromArray(xt),$=new fe().fromArray(zt);function lt(N,St,Y,Q){let Tt=new Uint8Array(4),wt=i.createTexture();i.bindTexture(N,wt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Zt=0;Zt<Y;Zt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(St,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,Tt):i.texImage2D(St+Zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Tt);return wt}let Et={};Et[i.TEXTURE_2D]=lt(i.TEXTURE_2D,i.TEXTURE_2D,1),Et[i.TEXTURE_CUBE_MAP]=lt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[i.TEXTURE_2D_ARRAY]=lt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Et[i.TEXTURE_3D]=lt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),dt(i.DEPTH_TEST),o.setFunc($i),at(!1),Ct(Tc),dt(i.CULL_FACE),L(Kn);function dt(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Lt(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ft(N,St){return d[N]!==St?(i.bindFramebuffer(N,St),d[N]=St,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=St),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=St),!0):!1}function Ot(N,St){let Y=f,Q=!1;if(N){Y=u.get(St),Y===void 0&&(Y=[],u.set(St,Y));let Tt=N.textures;if(Y.length!==Tt.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let wt=0,Zt=Tt.length;wt<Zt;wt++)Y[wt]=i.COLOR_ATTACHMENT0+wt;Y.length=Tt.length,Q=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,Q=!0);Q&&i.drawBuffers(Y)}function Yt(N){return m!==N?(i.useProgram(N),m=N,!0):!1}let j={[pi]:i.FUNC_ADD,[yh]:i.FUNC_SUBTRACT,[vh]:i.FUNC_REVERSE_SUBTRACT};j[Mh]=i.MIN,j[Sh]=i.MAX;let rt={[bh]:i.ZERO,[wh]:i.ONE,[Eh]:i.SRC_COLOR,[Vo]:i.SRC_ALPHA,[Ph]:i.SRC_ALPHA_SATURATE,[Rh]:i.DST_COLOR,[Ah]:i.DST_ALPHA,[Th]:i.ONE_MINUS_SRC_COLOR,[ko]:i.ONE_MINUS_SRC_ALPHA,[Ih]:i.ONE_MINUS_DST_COLOR,[Ch]:i.ONE_MINUS_DST_ALPHA,[Lh]:i.CONSTANT_COLOR,[Dh]:i.ONE_MINUS_CONSTANT_COLOR,[Uh]:i.CONSTANT_ALPHA,[Nh]:i.ONE_MINUS_CONSTANT_ALPHA};function L(N,St,Y,Q,Tt,wt,Zt,ye,Pe,oe){if(N===Kn){_===!0&&(Lt(i.BLEND),_=!1);return}if(_===!1&&(dt(i.BLEND),_=!0),N!==_h){if(N!==g||oe!==b){if((p!==pi||y!==pi)&&(i.blendEquation(i.FUNC_ADD),p=pi,y=pi),oe)switch(N){case Xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ac:i.blendFunc(i.ONE,i.ONE);break;case Cc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ac:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Cc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}S=null,v=null,R=null,T=null,C.set(0,0,0),I=0,g=N,b=oe}return}Tt=Tt||St,wt=wt||Y,Zt=Zt||Q,(St!==p||Tt!==y)&&(i.blendEquationSeparate(j[St],j[Tt]),p=St,y=Tt),(Y!==S||Q!==v||wt!==R||Zt!==T)&&(i.blendFuncSeparate(rt[Y],rt[Q],rt[wt],rt[Zt]),S=Y,v=Q,R=wt,T=Zt),(ye.equals(C)===!1||Pe!==I)&&(i.blendColor(ye.r,ye.g,ye.b,Pe),C.copy(ye),I=Pe),g=N,b=!1}function pt(N,St){N.side===Te?Lt(i.CULL_FACE):dt(i.CULL_FACE);let Y=N.side===He;St&&(Y=!Y),at(Y),N.blending===Xi&&N.transparent===!1?L(Kn):L(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let Q=N.stencilWrite;a.setTest(Q),Q&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Vt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?dt(i.SAMPLE_ALPHA_TO_COVERAGE):Lt(i.SAMPLE_ALPHA_TO_COVERAGE)}function at(N){M!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),M=N)}function Ct(N){N!==gh?(dt(i.CULL_FACE),N!==P&&(N===Tc?i.cullFace(i.BACK):N===xh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Lt(i.CULL_FACE),P=N}function ft(N){N!==F&&(G&&i.lineWidth(N),F=N)}function Vt(N,St,Y){N?(dt(i.POLYGON_OFFSET_FILL),(B!==St||W!==Y)&&(i.polygonOffset(St,Y),B=St,W=Y)):Lt(i.POLYGON_OFFSET_FILL)}function _t(N){N?dt(i.SCISSOR_TEST):Lt(i.SCISSOR_TEST)}function A(N){N===void 0&&(N=i.TEXTURE0+Z-1),st!==N&&(i.activeTexture(N),st=N)}function w(N,St,Y){Y===void 0&&(st===null?Y=i.TEXTURE0+Z-1:Y=st);let Q=mt[Y];Q===void 0&&(Q={type:void 0,texture:void 0},mt[Y]=Q),(Q.type!==N||Q.texture!==St)&&(st!==Y&&(i.activeTexture(Y),st=Y),i.bindTexture(N,St||Et[N]),Q.type=N,Q.texture=St)}function H(){let N=mt[st];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function J(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pt(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function yt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function At(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ut(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Rt(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function kt(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ht(N){jt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),jt.copy(N))}function It(N){$.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),$.copy(N))}function ne(N,St){let Y=l.get(St);Y===void 0&&(Y=new WeakMap,l.set(St,Y));let Q=Y.get(N);Q===void 0&&(Q=i.getUniformBlockIndex(St,N.name),Y.set(N,Q))}function Xt(N,St){let Q=l.get(St).get(N);c.get(St)!==Q&&(i.uniformBlockBinding(St,Q,N.__bindingPointIndex),c.set(St,Q))}function le(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},st=null,mt={},d={},u=new WeakMap,f=[],m=null,_=!1,g=null,p=null,S=null,v=null,y=null,R=null,T=null,C=new Jt(0,0,0),I=0,b=!1,M=null,P=null,F=null,B=null,W=null,jt.set(0,0,i.canvas.width,i.canvas.height),$.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:dt,disable:Lt,bindFramebuffer:Ft,drawBuffers:Ot,useProgram:Yt,setBlending:L,setMaterial:pt,setFlipSided:at,setCullFace:Ct,setLineWidth:ft,setPolygonOffset:Vt,setScissorTest:_t,activeTexture:A,bindTexture:w,unbindTexture:H,compressedTexImage2D:J,compressedTexImage3D:tt,texImage2D:Rt,texImage3D:kt,updateUBOMapping:ne,uniformBlockBinding:Xt,texStorage2D:ee,texStorage3D:ut,texSubImage2D:K,texSubImage3D:Pt,compressedTexSubImage2D:yt,compressedTexSubImage3D:At,scissor:Ht,viewport:It,reset:le}}function Tl(i,t,e,n){let s=om(n);switch(e){case Wl:return i*t;case ql:return i*t;case Yl:return i*t*2;case Zl:return i*t/s.components*s.byteLength;case fc:return i*t/s.components*s.byteLength;case $l:return i*t*2/s.components*s.byteLength;case pc:return i*t*2/s.components*s.byteLength;case Xl:return i*t*3/s.components*s.byteLength;case mn:return i*t*4/s.components*s.byteLength;case mc:return i*t*4/s.components*s.byteLength;case _r:case yr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vr:case Mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qo:case ta:return Math.max(i,16)*Math.max(t,8)/4;case Ko:case jo:return Math.max(i,8)*Math.max(t,8)/2;case ea:case na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ra:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case aa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ca:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case la:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ha:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ua:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case da:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case fa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case pa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ga:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Sr:case _a:case ya:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Jl:case va:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ma:case Sa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function om(i){switch(i){case zn:case kl:return{byteLength:1,components:1};case As:case Hl:case Hs:return{byteLength:2,components:1};case uc:case dc:return{byteLength:2,components:4};case yi:case hc:case Fn:return{byteLength:4,components:1};case Gl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function am(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new gt,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,w){return f?new OffscreenCanvas(A,w):Er("canvas")}function _(A,w,H){let J=1,tt=_t(A);if((tt.width>H||tt.height>H)&&(J=H/Math.max(tt.width,tt.height)),J<1)if(typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&A instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&A instanceof ImageBitmap||typeof VideoFrame!="undefined"&&A instanceof VideoFrame){let K=Math.floor(J*tt.width),Pt=Math.floor(J*tt.height);d===void 0&&(d=m(K,Pt));let yt=w?m(K,Pt):d;return yt.width=K,yt.height=Pt,yt.getContext("2d").drawImage(A,0,0,K,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+K+"x"+Pt+")."),yt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),A;return A}function g(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(A,w,H,J,tt=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=w;if(w===i.RED&&(H===i.FLOAT&&(K=i.R32F),H===i.HALF_FLOAT&&(K=i.R16F),H===i.UNSIGNED_BYTE&&(K=i.R8)),w===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.R8UI),H===i.UNSIGNED_SHORT&&(K=i.R16UI),H===i.UNSIGNED_INT&&(K=i.R32UI),H===i.BYTE&&(K=i.R8I),H===i.SHORT&&(K=i.R16I),H===i.INT&&(K=i.R32I)),w===i.RG&&(H===i.FLOAT&&(K=i.RG32F),H===i.HALF_FLOAT&&(K=i.RG16F),H===i.UNSIGNED_BYTE&&(K=i.RG8)),w===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RG8UI),H===i.UNSIGNED_SHORT&&(K=i.RG16UI),H===i.UNSIGNED_INT&&(K=i.RG32UI),H===i.BYTE&&(K=i.RG8I),H===i.SHORT&&(K=i.RG16I),H===i.INT&&(K=i.RG32I)),w===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGB8UI),H===i.UNSIGNED_SHORT&&(K=i.RGB16UI),H===i.UNSIGNED_INT&&(K=i.RGB32UI),H===i.BYTE&&(K=i.RGB8I),H===i.SHORT&&(K=i.RGB16I),H===i.INT&&(K=i.RGB32I)),w===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),H===i.UNSIGNED_INT&&(K=i.RGBA32UI),H===i.BYTE&&(K=i.RGBA8I),H===i.SHORT&&(K=i.RGBA16I),H===i.INT&&(K=i.RGBA32I)),w===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),w===i.RGBA){let Pt=tt?jr:se.getTransfer(J);H===i.FLOAT&&(K=i.RGBA32F),H===i.HALF_FLOAT&&(K=i.RGBA16F),H===i.UNSIGNED_BYTE&&(K=Pt===de?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(A,w){let H;return A?w===null||w===yi||w===Qi?H=i.DEPTH24_STENCIL8:w===Fn?H=i.DEPTH32F_STENCIL8:w===As&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===yi||w===Qi?H=i.DEPTH_COMPONENT24:w===Fn?H=i.DEPTH_COMPONENT32F:w===As&&(H=i.DEPTH_COMPONENT16),H}function R(A,w){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==gn&&A.minFilter!==Mn?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function T(A){let w=A.target;w.removeEventListener("dispose",T),I(w),w.isVideoTexture&&h.delete(w)}function C(A){let w=A.target;w.removeEventListener("dispose",C),M(w)}function I(A){let w=n.get(A);if(w.__webglInit===void 0)return;let H=A.source,J=u.get(H);if(J){let tt=J[w.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&b(A),Object.keys(J).length===0&&u.delete(H)}n.remove(A)}function b(A){let w=n.get(A);i.deleteTexture(w.__webglTexture);let H=A.source,J=u.get(H);delete J[w.__cacheKey],o.memory.textures--}function M(A){let w=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(w.__webglFramebuffer[J]))for(let tt=0;tt<w.__webglFramebuffer[J].length;tt++)i.deleteFramebuffer(w.__webglFramebuffer[J][tt]);else i.deleteFramebuffer(w.__webglFramebuffer[J]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[J])}else{if(Array.isArray(w.__webglFramebuffer))for(let J=0;J<w.__webglFramebuffer.length;J++)i.deleteFramebuffer(w.__webglFramebuffer[J]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let J=0;J<w.__webglColorRenderbuffer.length;J++)w.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[J]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let H=A.textures;for(let J=0,tt=H.length;J<tt;J++){let K=n.get(H[J]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(H[J])}n.remove(A)}let P=0;function F(){P=0}function B(){let A=P;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function W(A){let w=[];return w.push(A.wrapS),w.push(A.wrapT),w.push(A.wrapR||0),w.push(A.magFilter),w.push(A.minFilter),w.push(A.anisotropy),w.push(A.internalFormat),w.push(A.format),w.push(A.type),w.push(A.generateMipmaps),w.push(A.premultiplyAlpha),w.push(A.flipY),w.push(A.unpackAlignment),w.push(A.colorSpace),w.join()}function Z(A,w){let H=n.get(A);if(A.isVideoTexture&&ft(A),A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){let J=A.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(H,A,w);return}}e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+w)}function G(A,w){let H=n.get(A);if(A.version>0&&H.__version!==A.version){$(H,A,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+w)}function nt(A,w){let H=n.get(A);if(A.version>0&&H.__version!==A.version){$(H,A,w);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+w)}function X(A,w){let H=n.get(A);if(A.version>0&&H.__version!==A.version){lt(H,A,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+w)}let st={[xn]:i.REPEAT,[xi]:i.CLAMP_TO_EDGE,[Jo]:i.MIRRORED_REPEAT},mt={[gn]:i.NEAREST,[Wh]:i.NEAREST_MIPMAP_NEAREST,[Xs]:i.NEAREST_MIPMAP_LINEAR,[Mn]:i.LINEAR,[oo]:i.LINEAR_MIPMAP_NEAREST,[_i]:i.LINEAR_MIPMAP_LINEAR},xt={[Zh]:i.NEVER,[tu]:i.ALWAYS,[$h]:i.LESS,[Ql]:i.LEQUAL,[Jh]:i.EQUAL,[jh]:i.GEQUAL,[Kh]:i.GREATER,[Qh]:i.NOTEQUAL};function zt(A,w){if(w.type===Fn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Mn||w.magFilter===oo||w.magFilter===Xs||w.magFilter===_i||w.minFilter===Mn||w.minFilter===oo||w.minFilter===Xs||w.minFilter===_i)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,st[w.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,st[w.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,st[w.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,mt[w.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,mt[w.minFilter]),w.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,xt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===gn||w.minFilter!==Xs&&w.minFilter!==_i||w.type===Fn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function jt(A,w){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",T));let J=w.source,tt=u.get(J);tt===void 0&&(tt={},u.set(J,tt));let K=W(w);if(K!==A.__cacheKey){tt[K]===void 0&&(tt[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),tt[K].usedTimes++;let Pt=tt[A.__cacheKey];Pt!==void 0&&(tt[A.__cacheKey].usedTimes--,Pt.usedTimes===0&&b(w)),A.__cacheKey=K,A.__webglTexture=tt[K].texture}return H}function $(A,w,H){let J=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(J=i.TEXTURE_3D);let tt=jt(A,w),K=w.source;e.bindTexture(J,A.__webglTexture,i.TEXTURE0+H);let Pt=n.get(K);if(K.version!==Pt.__version||tt===!0){e.activeTexture(i.TEXTURE0+H);let yt=se.getPrimaries(se.workingColorSpace),At=w.colorSpace===Jn?null:se.getPrimaries(w.colorSpace),ee=w.colorSpace===Jn||yt===At?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let ut=_(w.image,!1,s.maxTextureSize);ut=Vt(w,ut);let Rt=r.convert(w.format,w.colorSpace),kt=r.convert(w.type),Ht=v(w.internalFormat,Rt,kt,w.colorSpace,w.isVideoTexture);zt(J,w);let It,ne=w.mipmaps,Xt=w.isVideoTexture!==!0,le=Pt.__version===void 0||tt===!0,N=K.dataReady,St=R(w,ut);if(w.isDepthTexture)Ht=y(w.format===ji,w.type),le&&(Xt?e.texStorage2D(i.TEXTURE_2D,1,Ht,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,Ht,ut.width,ut.height,0,Rt,kt,null));else if(w.isDataTexture)if(ne.length>0){Xt&&le&&e.texStorage2D(i.TEXTURE_2D,St,Ht,ne[0].width,ne[0].height);for(let Y=0,Q=ne.length;Y<Q;Y++)It=ne[Y],Xt?N&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,It.width,It.height,Rt,kt,It.data):e.texImage2D(i.TEXTURE_2D,Y,Ht,It.width,It.height,0,Rt,kt,It.data);w.generateMipmaps=!1}else Xt?(le&&e.texStorage2D(i.TEXTURE_2D,St,Ht,ut.width,ut.height),N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut.width,ut.height,Rt,kt,ut.data)):e.texImage2D(i.TEXTURE_2D,0,Ht,ut.width,ut.height,0,Rt,kt,ut.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Xt&&le&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Ht,ne[0].width,ne[0].height,ut.depth);for(let Y=0,Q=ne.length;Y<Q;Y++)if(It=ne[Y],w.format!==mn)if(Rt!==null)if(Xt){if(N)if(w.layerUpdates.size>0){let Tt=Tl(It.width,It.height,w.format,w.type);for(let wt of w.layerUpdates){let Zt=It.data.subarray(wt*Tt/It.data.BYTES_PER_ELEMENT,(wt+1)*Tt/It.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,wt,It.width,It.height,1,Rt,Zt)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,It.width,It.height,ut.depth,Rt,It.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Ht,It.width,It.height,ut.depth,0,It.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,It.width,It.height,ut.depth,Rt,kt,It.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Ht,It.width,It.height,ut.depth,0,Rt,kt,It.data)}else{Xt&&le&&e.texStorage2D(i.TEXTURE_2D,St,Ht,ne[0].width,ne[0].height);for(let Y=0,Q=ne.length;Y<Q;Y++)It=ne[Y],w.format!==mn?Rt!==null?Xt?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,It.width,It.height,Rt,It.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Ht,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?N&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,It.width,It.height,Rt,kt,It.data):e.texImage2D(i.TEXTURE_2D,Y,Ht,It.width,It.height,0,Rt,kt,It.data)}else if(w.isDataArrayTexture)if(Xt){if(le&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Ht,ut.width,ut.height,ut.depth),N)if(w.layerUpdates.size>0){let Y=Tl(ut.width,ut.height,w.format,w.type);for(let Q of w.layerUpdates){let Tt=ut.data.subarray(Q*Y/ut.data.BYTES_PER_ELEMENT,(Q+1)*Y/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,ut.width,ut.height,1,Rt,kt,Tt)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,Rt,kt,ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ht,ut.width,ut.height,ut.depth,0,Rt,kt,ut.data);else if(w.isData3DTexture)Xt?(le&&e.texStorage3D(i.TEXTURE_3D,St,Ht,ut.width,ut.height,ut.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,Rt,kt,ut.data)):e.texImage3D(i.TEXTURE_3D,0,Ht,ut.width,ut.height,ut.depth,0,Rt,kt,ut.data);else if(w.isFramebufferTexture){if(le)if(Xt)e.texStorage2D(i.TEXTURE_2D,St,Ht,ut.width,ut.height);else{let Y=ut.width,Q=ut.height;for(let Tt=0;Tt<St;Tt++)e.texImage2D(i.TEXTURE_2D,Tt,Ht,Y,Q,0,Rt,kt,null),Y>>=1,Q>>=1}}else if(ne.length>0){if(Xt&&le){let Y=_t(ne[0]);e.texStorage2D(i.TEXTURE_2D,St,Ht,Y.width,Y.height)}for(let Y=0,Q=ne.length;Y<Q;Y++)It=ne[Y],Xt?N&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Rt,kt,It):e.texImage2D(i.TEXTURE_2D,Y,Ht,Rt,kt,It);w.generateMipmaps=!1}else if(Xt){if(le){let Y=_t(ut);e.texStorage2D(i.TEXTURE_2D,St,Ht,Y.width,Y.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Rt,kt,ut)}else e.texImage2D(i.TEXTURE_2D,0,Ht,Rt,kt,ut);g(w)&&p(J),Pt.__version=K.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function lt(A,w,H){if(w.image.length!==6)return;let J=jt(A,w),tt=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+H);let K=n.get(tt);if(tt.version!==K.__version||J===!0){e.activeTexture(i.TEXTURE0+H);let Pt=se.getPrimaries(se.workingColorSpace),yt=w.colorSpace===Jn?null:se.getPrimaries(w.colorSpace),At=w.colorSpace===Jn||Pt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let ee=w.isCompressedTexture||w.image[0].isCompressedTexture,ut=w.image[0]&&w.image[0].isDataTexture,Rt=[];for(let Q=0;Q<6;Q++)!ee&&!ut?Rt[Q]=_(w.image[Q],!0,s.maxCubemapSize):Rt[Q]=ut?w.image[Q].image:w.image[Q],Rt[Q]=Vt(w,Rt[Q]);let kt=Rt[0],Ht=r.convert(w.format,w.colorSpace),It=r.convert(w.type),ne=v(w.internalFormat,Ht,It,w.colorSpace),Xt=w.isVideoTexture!==!0,le=K.__version===void 0||J===!0,N=tt.dataReady,St=R(w,kt);zt(i.TEXTURE_CUBE_MAP,w);let Y;if(ee){Xt&&le&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ne,kt.width,kt.height);for(let Q=0;Q<6;Q++){Y=Rt[Q].mipmaps;for(let Tt=0;Tt<Y.length;Tt++){let wt=Y[Tt];w.format!==mn?Ht!==null?Xt?N&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt,0,0,wt.width,wt.height,Ht,wt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt,ne,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt,0,0,wt.width,wt.height,Ht,It,wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt,ne,wt.width,wt.height,0,Ht,It,wt.data)}}}else{if(Y=w.mipmaps,Xt&&le){Y.length>0&&St++;let Q=_t(Rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ne,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ut){Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Rt[Q].width,Rt[Q].height,Ht,It,Rt[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ne,Rt[Q].width,Rt[Q].height,0,Ht,It,Rt[Q].data);for(let Tt=0;Tt<Y.length;Tt++){let Zt=Y[Tt].image[Q].image;Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt+1,0,0,Zt.width,Zt.height,Ht,It,Zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt+1,ne,Zt.width,Zt.height,0,Ht,It,Zt.data)}}else{Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ht,It,Rt[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ne,Ht,It,Rt[Q]);for(let Tt=0;Tt<Y.length;Tt++){let wt=Y[Tt];Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt+1,0,0,Ht,It,wt.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt+1,ne,Ht,It,wt.image[Q])}}}g(w)&&p(i.TEXTURE_CUBE_MAP),K.__version=tt.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function Et(A,w,H,J,tt,K){let Pt=r.convert(H.format,H.colorSpace),yt=r.convert(H.type),At=v(H.internalFormat,Pt,yt,H.colorSpace),ee=n.get(w),ut=n.get(H);if(ut.__renderTarget=w,!ee.__hasExternalTextures){let Rt=Math.max(1,w.width>>K),kt=Math.max(1,w.height>>K);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,K,At,Rt,kt,w.depth,0,Pt,yt,null):e.texImage2D(tt,K,At,Rt,kt,0,Pt,yt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),Ct(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,tt,ut.__webglTexture,0,at(w)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,tt,ut.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(A,w,H){if(i.bindRenderbuffer(i.RENDERBUFFER,A),w.depthBuffer){let J=w.depthTexture,tt=J&&J.isDepthTexture?J.type:null,K=y(w.stencilBuffer,tt),Pt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=at(w);Ct(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt,K,w.width,w.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,K,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,K,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pt,i.RENDERBUFFER,A)}else{let J=w.textures;for(let tt=0;tt<J.length;tt++){let K=J[tt],Pt=r.convert(K.format,K.colorSpace),yt=r.convert(K.type),At=v(K.internalFormat,Pt,yt,K.colorSpace),ee=at(w);H&&Ct(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,At,w.width,w.height):Ct(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,At,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,At,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Lt(A,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=n.get(w.depthTexture);J.__renderTarget=w,(!J.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),Z(w.depthTexture,0);let tt=J.__webglTexture,K=at(w);if(w.depthTexture.format===qi)Ct(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(w.depthTexture.format===ji)Ct(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Ft(A){let w=n.get(A),H=A.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==A.depthTexture){let J=A.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),J){let tt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,J.removeEventListener("dispose",tt)};J.addEventListener("dispose",tt),w.__depthDisposeCallback=tt}w.__boundDepthTexture=J}if(A.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Lt(w.__webglFramebuffer,A)}else if(H){w.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[J]),w.__webglDepthbuffer[J]===void 0)w.__webglDepthbuffer[J]=i.createRenderbuffer(),dt(w.__webglDepthbuffer[J],A,!1);else{let tt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=w.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),dt(w.__webglDepthbuffer,A,!1);else{let J=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,tt),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,tt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ot(A,w,H){let J=n.get(A);w!==void 0&&Et(J.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ft(A)}function Yt(A){let w=A.texture,H=n.get(A),J=n.get(w);A.addEventListener("dispose",C);let tt=A.textures,K=A.isWebGLCubeRenderTarget===!0,Pt=tt.length>1;if(Pt||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=w.version,o.memory.textures++),K){H.__webglFramebuffer=[];for(let yt=0;yt<6;yt++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[yt]=[];for(let At=0;At<w.mipmaps.length;At++)H.__webglFramebuffer[yt][At]=i.createFramebuffer()}else H.__webglFramebuffer[yt]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let yt=0;yt<w.mipmaps.length;yt++)H.__webglFramebuffer[yt]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Pt)for(let yt=0,At=tt.length;yt<At;yt++){let ee=n.get(tt[yt]);ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&Ct(A)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let yt=0;yt<tt.length;yt++){let At=tt[yt];H.__webglColorRenderbuffer[yt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[yt]);let ee=r.convert(At.format,At.colorSpace),ut=r.convert(At.type),Rt=v(At.internalFormat,ee,ut,At.colorSpace,A.isXRRenderTarget===!0),kt=at(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,Rt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,H.__webglColorRenderbuffer[yt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),dt(H.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),zt(i.TEXTURE_CUBE_MAP,w);for(let yt=0;yt<6;yt++)if(w.mipmaps&&w.mipmaps.length>0)for(let At=0;At<w.mipmaps.length;At++)Et(H.__webglFramebuffer[yt][At],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,At);else Et(H.__webglFramebuffer[yt],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0);g(w)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let yt=0,At=tt.length;yt<At;yt++){let ee=tt[yt],ut=n.get(ee);e.bindTexture(i.TEXTURE_2D,ut.__webglTexture),zt(i.TEXTURE_2D,ee),Et(H.__webglFramebuffer,A,ee,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,0),g(ee)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let yt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(yt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(yt,J.__webglTexture),zt(yt,w),w.mipmaps&&w.mipmaps.length>0)for(let At=0;At<w.mipmaps.length;At++)Et(H.__webglFramebuffer[At],A,w,i.COLOR_ATTACHMENT0,yt,At);else Et(H.__webglFramebuffer,A,w,i.COLOR_ATTACHMENT0,yt,0);g(w)&&p(yt),e.unbindTexture()}A.depthBuffer&&Ft(A)}function j(A){let w=A.textures;for(let H=0,J=w.length;H<J;H++){let tt=w[H];if(g(tt)){let K=S(A),Pt=n.get(tt).__webglTexture;e.bindTexture(K,Pt),p(K),e.unbindTexture()}}}let rt=[],L=[];function pt(A){if(A.samples>0){if(Ct(A)===!1){let w=A.textures,H=A.width,J=A.height,tt=i.COLOR_BUFFER_BIT,K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pt=n.get(A),yt=w.length>1;if(yt)for(let At=0;At<w.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let At=0;At<w.length;At++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),yt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[At]);let ee=n.get(w[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ee,0)}i.blitFramebuffer(0,0,H,J,0,0,H,J,tt,i.NEAREST),c===!0&&(rt.length=0,L.length=0,rt.push(i.COLOR_ATTACHMENT0+At),A.depthBuffer&&A.resolveDepthBuffer===!1&&(rt.push(K),L.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),yt)for(let At=0;At<w.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[At]);let ee=n.get(w[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,ee,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let w=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function at(A){return Math.min(s.maxSamples,A.samples)}function Ct(A){let w=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ft(A){let w=o.render.frame;h.get(A)!==w&&(h.set(A,w),A.update())}function Vt(A,w){let H=A.colorSpace,J=A.format,tt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||H!==rs&&H!==Jn&&(se.getTransfer(H)===de?(J!==mn||tt!==zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function _t(A){return typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame!="undefined"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=F,this.setTexture2D=Z,this.setTexture2DArray=G,this.setTexture3D=nt,this.setTextureCube=X,this.rebindTextures=Ot,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=Ct}function cm(i,t){function e(n,s=Jn){let r,o=se.getTransfer(s);if(n===zn)return i.UNSIGNED_BYTE;if(n===uc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===dc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===kl)return i.BYTE;if(n===Hl)return i.SHORT;if(n===As)return i.UNSIGNED_SHORT;if(n===hc)return i.INT;if(n===yi)return i.UNSIGNED_INT;if(n===Fn)return i.FLOAT;if(n===Hs)return i.HALF_FLOAT;if(n===Wl)return i.ALPHA;if(n===Xl)return i.RGB;if(n===mn)return i.RGBA;if(n===ql)return i.LUMINANCE;if(n===Yl)return i.LUMINANCE_ALPHA;if(n===qi)return i.DEPTH_COMPONENT;if(n===ji)return i.DEPTH_STENCIL;if(n===Zl)return i.RED;if(n===fc)return i.RED_INTEGER;if(n===$l)return i.RG;if(n===pc)return i.RG_INTEGER;if(n===mc)return i.RGBA_INTEGER;if(n===_r||n===yr||n===vr||n===Mr)if(o===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===_r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===_r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ko||n===Qo||n===jo||n===ta)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ko)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ea||n===na||n===ia)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ea||n===na)return o===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ia)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===sa||n===ra||n===oa||n===aa||n===ca||n===la||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===xa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ra)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===aa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ca)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===la)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ha)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ua)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===da)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ma)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ga)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sr||n===_a||n===ya)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Sr)return o===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_a)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ya)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Jl||n===va||n===Ma||n===Sa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===va)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ma)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Oa=class extends ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ot=class extends Ge{constructor(){super(),this.isGroup=!0,this.type="Group"}},lm={type:"move"},Ss=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let g=e.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&u>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(lm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ot;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},hm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,um=`
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

}`,Ba=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new sn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new wn({vertexShader:hm,fragmentShader:um,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Fe(new we(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},za=class extends ti{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,m=null,_=new Ba,g=e.getContextAttributes(),p=null,S=null,v=[],y=[],R=new gt,T=null,C=new ke;C.viewport=new fe;let I=new ke;I.viewport=new fe;let b=[C,I],M=new Oa,P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let lt=v[$];return lt===void 0&&(lt=new Ss,v[$]=lt),lt.getTargetRaySpace()},this.getControllerGrip=function($){let lt=v[$];return lt===void 0&&(lt=new Ss,v[$]=lt),lt.getGripSpace()},this.getHand=function($){let lt=v[$];return lt===void 0&&(lt=new Ss,v[$]=lt),lt.getHandSpace()};function B($){let lt=y.indexOf($.inputSource);if(lt===-1)return;let Et=v[lt];Et!==void 0&&(Et.update($.inputSource,$.frame,l||o),Et.dispatchEvent({type:$.type,data:$.inputSource}))}function W(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Z);for(let $=0;$<v.length;$++){let lt=y[$];lt!==null&&(y[$]=null,v[$].disconnect(lt))}P=null,F=null,_.reset(),t.setRenderTarget(p),f=null,u=null,d=null,s=null,S=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){let lt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,lt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Vn(f.framebufferWidth,f.framebufferHeight,{format:mn,type:zn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let lt=null,Et=null,dt=null;g.depth&&(dt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,lt=g.stencil?ji:qi,Et=g.stencil?Qi:yi);let Lt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(Lt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new Vn(u.textureWidth,u.textureHeight,{format:mn,type:zn,depthTexture:new Ur(u.textureWidth,u.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,lt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),jt.setContext(s),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z($){for(let lt=0;lt<$.removed.length;lt++){let Et=$.removed[lt],dt=y.indexOf(Et);dt>=0&&(y[dt]=null,v[dt].disconnect(Et))}for(let lt=0;lt<$.added.length;lt++){let Et=$.added[lt],dt=y.indexOf(Et);if(dt===-1){for(let Ft=0;Ft<v.length;Ft++)if(Ft>=y.length){y.push(Et),dt=Ft;break}else if(y[Ft]===null){y[Ft]=Et,dt=Ft;break}if(dt===-1)break}let Lt=v[dt];Lt&&Lt.connect(Et)}}let G=new D,nt=new D;function X($,lt,Et){G.setFromMatrixPosition(lt.matrixWorld),nt.setFromMatrixPosition(Et.matrixWorld);let dt=G.distanceTo(nt),Lt=lt.projectionMatrix.elements,Ft=Et.projectionMatrix.elements,Ot=Lt[14]/(Lt[10]-1),Yt=Lt[14]/(Lt[10]+1),j=(Lt[9]+1)/Lt[5],rt=(Lt[9]-1)/Lt[5],L=(Lt[8]-1)/Lt[0],pt=(Ft[8]+1)/Ft[0],at=Ot*L,Ct=Ot*pt,ft=dt/(-L+pt),Vt=ft*-L;if(lt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Vt),$.translateZ(ft),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Lt[10]===-1)$.projectionMatrix.copy(lt.projectionMatrix),$.projectionMatrixInverse.copy(lt.projectionMatrixInverse);else{let _t=Ot+ft,A=Yt+ft,w=at-Vt,H=Ct+(dt-Vt),J=j*Yt/A*_t,tt=rt*Yt/A*_t;$.projectionMatrix.makePerspective(w,H,J,tt,_t,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function st($,lt){lt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(lt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let lt=$.near,Et=$.far;_.texture!==null&&(_.depthNear>0&&(lt=_.depthNear),_.depthFar>0&&(Et=_.depthFar)),M.near=I.near=C.near=lt,M.far=I.far=C.far=Et,(P!==M.near||F!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,F=M.far),C.layers.mask=$.layers.mask|2,I.layers.mask=$.layers.mask|4,M.layers.mask=C.layers.mask|I.layers.mask;let dt=$.parent,Lt=M.cameras;st(M,dt);for(let Ft=0;Ft<Lt.length;Ft++)st(Lt[Ft],dt);Lt.length===2?X(M,C,I):M.projectionMatrix.copy(C.projectionMatrix),mt($,M,dt)};function mt($,lt,Et){Et===null?$.matrix.copy(lt.matrixWorld):($.matrix.copy(Et.matrixWorld),$.matrix.invert(),$.matrix.multiply(lt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(lt.projectionMatrix),$.projectionMatrixInverse.copy(lt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Cs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let xt=null;function zt($,lt){if(h=lt.getViewerPose(l||o),m=lt,h!==null){let Et=h.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let dt=!1;Et.length!==M.cameras.length&&(M.cameras.length=0,dt=!0);for(let Ft=0;Ft<Et.length;Ft++){let Ot=Et[Ft],Yt=null;if(f!==null)Yt=f.getViewport(Ot);else{let rt=d.getViewSubImage(u,Ot);Yt=rt.viewport,Ft===0&&(t.setRenderTargetTextures(S,rt.colorTexture,u.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(S))}let j=b[Ft];j===void 0&&(j=new ke,j.layers.enable(Ft),j.viewport=new fe,b[Ft]=j),j.matrix.fromArray(Ot.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(Ot.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),Ft===0&&(M.matrix.copy(j.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),dt===!0&&M.cameras.push(j)}let Lt=s.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")){let Ft=d.getDepthInformation(Et[0]);Ft&&Ft.isValid&&Ft.texture&&_.init(t,Ft,s.renderState)}}for(let Et=0;Et<v.length;Et++){let dt=y[Et],Lt=v[Et];dt!==null&&Lt!==void 0&&Lt.update(dt,lt,l||o)}xt&&xt($,lt),lt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:lt}),m=null}let jt=new nh;jt.setAnimationLoop(zt),this.setAnimationLoop=function($){xt=$},this.dispose=function(){}}},di=new bn,dm=new _e;function fm(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,eh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,S,v,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,S,v):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===He&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===He&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let S=t.get(p),v=S.envMap,y=S.envMapRotation;v&&(g.envMap.value=v,di.copy(y),di.x*=-1,di.y*=-1,di.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),g.envMapRotation.value.setFromMatrix4(dm.makeRotationFromEuler(di)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,S,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*S,g.scale.value=v*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,S){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===He&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let S=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function pm(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,v){let y=v.program;n.uniformBlockBinding(S,y)}function l(S,v){let y=s[S.id];y===void 0&&(m(S),y=h(S),s[S.id]=y,S.addEventListener("dispose",g));let R=v.program;n.updateUBOMapping(S,R);let T=t.render.frame;r[S.id]!==T&&(u(S),r[S.id]=T)}function h(S){let v=d();S.__bindingPointIndex=v;let y=i.createBuffer(),R=S.__size,T=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,y),y}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){let v=s[S.id],y=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,C=y.length;T<C;T++){let I=Array.isArray(y[T])?y[T]:[y[T]];for(let b=0,M=I.length;b<M;b++){let P=I[b];if(f(P,T,b,R)===!0){let F=P.__offset,B=Array.isArray(P.value)?P.value:[P.value],W=0;for(let Z=0;Z<B.length;Z++){let G=B[Z],nt=_(G);typeof G=="number"||typeof G=="boolean"?(P.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,F+W,P.__data)):G.isMatrix3?(P.__data[0]=G.elements[0],P.__data[1]=G.elements[1],P.__data[2]=G.elements[2],P.__data[3]=0,P.__data[4]=G.elements[3],P.__data[5]=G.elements[4],P.__data[6]=G.elements[5],P.__data[7]=0,P.__data[8]=G.elements[6],P.__data[9]=G.elements[7],P.__data[10]=G.elements[8],P.__data[11]=0):(G.toArray(P.__data,W),W+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,v,y,R){let T=S.value,C=v+"_"+y;if(R[C]===void 0)return typeof T=="number"||typeof T=="boolean"?R[C]=T:R[C]=T.clone(),!0;{let I=R[C];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return R[C]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function m(S){let v=S.uniforms,y=0,R=16;for(let C=0,I=v.length;C<I;C++){let b=Array.isArray(v[C])?v[C]:[v[C]];for(let M=0,P=b.length;M<P;M++){let F=b[M],B=Array.isArray(F.value)?F.value:[F.value];for(let W=0,Z=B.length;W<Z;W++){let G=B[W],nt=_(G),X=y%R,st=X%nt.boundary,mt=X+st;y+=st,mt!==0&&R-mt<nt.storage&&(y+=R-mt),F.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=nt.storage}}}let T=y%R;return T>0&&(y+=R-T),S.__size=y,S.__cache={},this}function _(S){let v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function g(S){let v=S.target;v.removeEventListener("dispose",g);let y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Nr=class{constructor(t={}){let{canvas:e=xu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,S=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ve,this.toneMapping=Qn,this.toneMappingExposure=1;let y=this,R=!1,T=0,C=0,I=null,b=-1,M=null,P=new fe,F=new fe,B=null,W=new Jt(0),Z=0,G=e.width,nt=e.height,X=1,st=null,mt=null,xt=new fe(0,0,G,nt),zt=new fe(0,0,G,nt),jt=!1,$=new Ps,lt=!1,Et=!1,dt=new _e,Lt=new _e,Ft=new D,Ot=new fe,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},j=!1;function rt(){return I===null?X:1}let L=n;function pt(E,U){return e.getContext(E,U)}try{let E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ac}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",wt,!1),L===null){let U="webgl2";if(L=pt(U,E),L===null)throw pt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let at,Ct,ft,Vt,_t,A,w,H,J,tt,K,Pt,yt,At,ee,ut,Rt,kt,Ht,It,ne,Xt,le,N;function St(){at=new Ip(L),at.init(),Xt=new cm(L,at),Ct=new wp(L,at,t,Xt),ft=new rm(L,at),Ct.reverseDepthBuffer&&u&&ft.buffers.depth.setReversed(!0),Vt=new Dp(L),_t=new q0,A=new am(L,at,ft,_t,Ct,Xt,Vt),w=new Tp(y),H=new Rp(y),J=new zu(L),le=new Sp(L,J),tt=new Pp(L,J,Vt,le),K=new Np(L,tt,J,Vt),Ht=new Up(L,Ct,A),ut=new Ep(_t),Pt=new X0(y,w,H,at,Ct,le,ut),yt=new fm(y,_t),At=new Z0,ee=new tm(at),kt=new Mp(y,w,H,ft,K,f,c),Rt=new im(y,K,Ct),N=new pm(L,Vt,Ct,ft),It=new bp(L,at,Vt),ne=new Lp(L,at,Vt),Vt.programs=Pt.programs,y.capabilities=Ct,y.extensions=at,y.properties=_t,y.renderLists=At,y.shadowMap=Rt,y.state=ft,y.info=Vt}St();let Y=new za(y,L);this.xr=Y,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let E=at.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=at.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(E){E!==void 0&&(X=E,this.setSize(G,nt,!1))},this.getSize=function(E){return E.set(G,nt)},this.setSize=function(E,U,V=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=E,nt=U,e.width=Math.floor(E*X),e.height=Math.floor(U*X),V===!0&&(e.style.width=E+"px",e.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(G*X,nt*X).floor()},this.setDrawingBufferSize=function(E,U,V){G=E,nt=U,X=V,e.width=Math.floor(E*V),e.height=Math.floor(U*V),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(xt)},this.setViewport=function(E,U,V,z){E.isVector4?xt.set(E.x,E.y,E.z,E.w):xt.set(E,U,V,z),ft.viewport(P.copy(xt).multiplyScalar(X).round())},this.getScissor=function(E){return E.copy(zt)},this.setScissor=function(E,U,V,z){E.isVector4?zt.set(E.x,E.y,E.z,E.w):zt.set(E,U,V,z),ft.scissor(F.copy(zt).multiplyScalar(X).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(E){ft.setScissorTest(jt=E)},this.setOpaqueSort=function(E){st=E},this.setTransparentSort=function(E){mt=E},this.getClearColor=function(E){return E.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor.apply(kt,arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha.apply(kt,arguments)},this.clear=function(E=!0,U=!0,V=!0){let z=0;if(E){let O=!1;if(I!==null){let ht=I.texture.format;O=ht===mc||ht===pc||ht===fc}if(O){let ht=I.texture.type,bt=ht===zn||ht===yi||ht===As||ht===Qi||ht===uc||ht===dc,Dt=kt.getClearColor(),Ut=kt.getClearAlpha(),qt=Dt.r,Kt=Dt.g,Nt=Dt.b;bt?(m[0]=qt,m[1]=Kt,m[2]=Nt,m[3]=Ut,L.clearBufferuiv(L.COLOR,0,m)):(_[0]=qt,_[1]=Kt,_[2]=Nt,_[3]=Ut,L.clearBufferiv(L.COLOR,0,_))}else z|=L.COLOR_BUFFER_BIT}U&&(z|=L.DEPTH_BUFFER_BIT),V&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),At.dispose(),ee.dispose(),_t.dispose(),w.dispose(),H.dispose(),K.dispose(),le.dispose(),N.dispose(),Pt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Ze),Y.removeEventListener("sessionend",ri),$e.stop()};function Q(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let E=Vt.autoReset,U=Rt.enabled,V=Rt.autoUpdate,z=Rt.needsUpdate,O=Rt.type;St(),Vt.autoReset=E,Rt.enabled=U,Rt.autoUpdate=V,Rt.needsUpdate=z,Rt.type=O}function wt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Zt(E){let U=E.target;U.removeEventListener("dispose",Zt),ye(U)}function ye(E){Pe(E),_t.remove(E)}function Pe(E){let U=_t.get(E).programs;U!==void 0&&(U.forEach(function(V){Pt.releaseProgram(V)}),E.isShaderMaterial&&Pt.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,V,z,O,ht){U===null&&(U=Yt);let bt=O.isMesh&&O.matrixWorld.determinant()<0,Dt=$t(E,U,V,z,O);ft.setMaterial(z,bt);let Ut=V.index,qt=1;if(z.wireframe===!0){if(Ut=tt.getWireframeAttribute(V),Ut===void 0)return;qt=2}let Kt=V.drawRange,Nt=V.attributes.position,re=Kt.start*qt,pe=(Kt.start+Kt.count)*qt;ht!==null&&(re=Math.max(re,ht.start*qt),pe=Math.min(pe,(ht.start+ht.count)*qt)),Ut!==null?(re=Math.max(re,0),pe=Math.min(pe,Ut.count)):Nt!=null&&(re=Math.max(re,0),pe=Math.min(pe,Nt.count));let ge=pe-re;if(ge<0||ge===1/0)return;le.setup(O,z,Dt,V,Ut);let Je,ae=It;if(Ut!==null&&(Je=J.get(Ut),ae=ne,ae.setIndex(Je)),O.isMesh)z.wireframe===!0?(ft.setLineWidth(z.wireframeLinewidth*rt()),ae.setMode(L.LINES)):ae.setMode(L.TRIANGLES);else if(O.isLine){let Bt=z.linewidth;Bt===void 0&&(Bt=1),ft.setLineWidth(Bt*rt()),O.isLineSegments?ae.setMode(L.LINES):O.isLineLoop?ae.setMode(L.LINE_LOOP):ae.setMode(L.LINE_STRIP)}else O.isPoints?ae.setMode(L.POINTS):O.isSprite&&ae.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ae.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(at.get("WEBGL_multi_draw"))ae.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Bt=O._multiDrawStarts,Cn=O._multiDrawCounts,ce=O._multiDrawCount,un=Ut?J.get(Ut).bytesPerElement:1,Ai=_t.get(z).currentProgram.getUniforms();for(let tn=0;tn<ce;tn++)Ai.setValue(L,"_gl_DrawID",tn),ae.render(Bt[tn]/un,Cn[tn])}else if(O.isInstancedMesh)ae.renderInstances(re,ge,O.count);else if(V.isInstancedBufferGeometry){let Bt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Cn=Math.min(V.instanceCount,Bt);ae.renderInstances(re,ge,Cn)}else ae.render(re,ge)};function oe(E,U,V){E.transparent===!0&&E.side===Te&&E.forceSinglePass===!1?(E.side=He,E.needsUpdate=!0,et(E,U,V),E.side=jn,E.needsUpdate=!0,et(E,U,V),E.side=Te):et(E,U,V)}this.compile=function(E,U,V=null){V===null&&(V=E),p=ee.get(V),p.init(U),v.push(p),V.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),E!==V&&E.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();let z=new Set;return E.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let ht=O.material;if(ht)if(Array.isArray(ht))for(let bt=0;bt<ht.length;bt++){let Dt=ht[bt];oe(Dt,V,O),z.add(Dt)}else oe(ht,V,O),z.add(ht)}),v.pop(),p=null,z},this.compileAsync=function(E,U,V=null){let z=this.compile(E,U,V);return new Promise(O=>{function ht(){if(z.forEach(function(bt){_t.get(bt).currentProgram.isReady()&&z.delete(bt)}),z.size===0){O(E);return}setTimeout(ht,10)}at.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Qe=null;function ve(E){Qe&&Qe(E)}function Ze(){$e.stop()}function ri(){$e.start()}let $e=new nh;$e.setAnimationLoop(ve),typeof self!="undefined"&&$e.setContext(self),this.setAnimationLoop=function(E){Qe=E,Y.setAnimationLoop(E),E===null?$e.stop():$e.start()},Y.addEventListener("sessionstart",Ze),Y.addEventListener("sessionend",ri),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(U),U=Y.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,U,I),p=ee.get(E,v.length),p.init(U),v.push(p),Lt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),$.setFromProjectionMatrix(Lt),Et=this.localClippingEnabled,lt=ut.init(this.clippingPlanes,Et),g=At.get(E,S.length),g.init(),S.push(g),Y.enabled===!0&&Y.isPresenting===!0){let ht=y.xr.getDepthSensingMesh();ht!==null&&je(ht,U,-1/0,y.sortObjects)}je(E,U,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(st,mt),j=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,j&&kt.addToRenderList(g,E),this.info.render.frame++,lt===!0&&ut.beginShadows();let V=p.state.shadowsArray;Rt.render(V,E,U),lt===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=g.opaque,O=g.transmissive;if(p.setupLights(),U.isArrayCamera){let ht=U.cameras;if(O.length>0)for(let bt=0,Dt=ht.length;bt<Dt;bt++){let Ut=ht[bt];hs(z,O,E,Ut)}j&&kt.render(E);for(let bt=0,Dt=ht.length;bt<Dt;bt++){let Ut=ht[bt];An(g,E,Ut,Ut.viewport)}}else O.length>0&&hs(z,O,E,U),j&&kt.render(E),An(g,E,U);I!==null&&(A.updateMultisampleRenderTarget(I),A.updateRenderTargetMipmap(I)),E.isScene===!0&&E.onAfterRender(y,E,U),le.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],lt===!0&&ut.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function je(E,U,V,z){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||$.intersectsSprite(E)){z&&Ot.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Lt);let bt=K.update(E),Dt=E.material;Dt.visible&&g.push(E,bt,Dt,V,Ot.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||$.intersectsObject(E))){let bt=K.update(E),Dt=E.material;if(z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ot.copy(E.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Ot.copy(bt.boundingSphere.center)),Ot.applyMatrix4(E.matrixWorld).applyMatrix4(Lt)),Array.isArray(Dt)){let Ut=bt.groups;for(let qt=0,Kt=Ut.length;qt<Kt;qt++){let Nt=Ut[qt],re=Dt[Nt.materialIndex];re&&re.visible&&g.push(E,bt,re,V,Ot.z,Nt)}}else Dt.visible&&g.push(E,bt,Dt,V,Ot.z,null)}}let ht=E.children;for(let bt=0,Dt=ht.length;bt<Dt;bt++)je(ht[bt],U,V,z)}function An(E,U,V,z){let O=E.opaque,ht=E.transmissive,bt=E.transparent;p.setupLightsView(V),lt===!0&&ut.setGlobalState(y.clippingPlanes,V),z&&ft.viewport(P.copy(z)),O.length>0&&Ti(O,U,V),ht.length>0&&Ti(ht,U,V),bt.length>0&&Ti(bt,U,V),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function hs(E,U,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Vn(1,1,{generateMipmaps:!0,type:at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float")?Hs:zn,minFilter:_i,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));let ht=p.state.transmissionRenderTarget[z.id],bt=z.viewport||P;ht.setSize(bt.z,bt.w);let Dt=y.getRenderTarget();y.setRenderTarget(ht),y.getClearColor(W),Z=y.getClearAlpha(),Z<1&&y.setClearColor(16777215,.5),y.clear(),j&&kt.render(V);let Ut=y.toneMapping;y.toneMapping=Qn;let qt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),lt===!0&&ut.setGlobalState(y.clippingPlanes,z),Ti(E,V,z),A.updateMultisampleRenderTarget(ht),A.updateRenderTargetMipmap(ht),at.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Nt=0,re=U.length;Nt<re;Nt++){let pe=U[Nt],ge=pe.object,Je=pe.geometry,ae=pe.material,Bt=pe.group;if(ae.side===Te&&ge.layers.test(z.layers)){let Cn=ae.side;ae.side=He,ae.needsUpdate=!0,oi(ge,V,z,Je,ae,Bt),ae.side=Cn,ae.needsUpdate=!0,Kt=!0}}Kt===!0&&(A.updateMultisampleRenderTarget(ht),A.updateRenderTargetMipmap(ht))}y.setRenderTarget(Dt),y.setClearColor(W,Z),qt!==void 0&&(z.viewport=qt),y.toneMapping=Ut}function Ti(E,U,V){let z=U.isScene===!0?U.overrideMaterial:null;for(let O=0,ht=E.length;O<ht;O++){let bt=E[O],Dt=bt.object,Ut=bt.geometry,qt=z===null?bt.material:z,Kt=bt.group;Dt.layers.test(V.layers)&&oi(Dt,U,V,Ut,qt,Kt)}}function oi(E,U,V,z,O,ht){E.onBeforeRender(y,U,V,z,O,ht),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(y,U,V,z,E,ht),O.transparent===!0&&O.side===Te&&O.forceSinglePass===!1?(O.side=He,O.needsUpdate=!0,y.renderBufferDirect(V,U,z,O,E,ht),O.side=jn,O.needsUpdate=!0,y.renderBufferDirect(V,U,z,O,E,ht),O.side=Te):y.renderBufferDirect(V,U,z,O,E,ht),E.onAfterRender(y,U,V,z,O,ht)}function et(E,U,V){U.isScene!==!0&&(U=Yt);let z=_t.get(E),O=p.state.lights,ht=p.state.shadowsArray,bt=O.state.version,Dt=Pt.getParameters(E,O.state,ht,U,V),Ut=Pt.getProgramCacheKey(Dt),qt=z.programs;z.environment=E.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(E.isMeshStandardMaterial?H:w).get(E.envMap||z.environment),z.envMapRotation=z.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,qt===void 0&&(E.addEventListener("dispose",Zt),qt=new Map,z.programs=qt);let Kt=qt.get(Ut);if(Kt!==void 0){if(z.currentProgram===Kt&&z.lightsStateVersion===bt)return vt(E,Dt),Kt}else Dt.uniforms=Pt.getUniforms(E),E.onBeforeCompile(Dt,y),Kt=Pt.acquireProgram(Dt,Ut),qt.set(Ut,Kt),z.uniforms=Dt.uniforms;let Nt=z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Nt.clippingPlanes=ut.uniform),vt(E,Dt),z.needsLights=Wt(E),z.lightsStateVersion=bt,z.needsLights&&(Nt.ambientLightColor.value=O.state.ambient,Nt.lightProbe.value=O.state.probe,Nt.directionalLights.value=O.state.directional,Nt.directionalLightShadows.value=O.state.directionalShadow,Nt.spotLights.value=O.state.spot,Nt.spotLightShadows.value=O.state.spotShadow,Nt.rectAreaLights.value=O.state.rectArea,Nt.ltc_1.value=O.state.rectAreaLTC1,Nt.ltc_2.value=O.state.rectAreaLTC2,Nt.pointLights.value=O.state.point,Nt.pointLightShadows.value=O.state.pointShadow,Nt.hemisphereLights.value=O.state.hemi,Nt.directionalShadowMap.value=O.state.directionalShadowMap,Nt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Nt.spotShadowMap.value=O.state.spotShadowMap,Nt.spotLightMatrix.value=O.state.spotLightMatrix,Nt.spotLightMap.value=O.state.spotLightMap,Nt.pointShadowMap.value=O.state.pointShadowMap,Nt.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=Kt,z.uniformsList=null,Kt}function ct(E){if(E.uniformsList===null){let U=E.currentProgram.getUniforms();E.uniformsList=Zi.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function vt(E,U){let V=_t.get(E);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function $t(E,U,V,z,O){U.isScene!==!0&&(U=Yt),A.resetTextureUnits();let ht=U.fog,bt=z.isMeshStandardMaterial?U.environment:null,Dt=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:rs,Ut=(z.isMeshStandardMaterial?H:w).get(z.envMap||bt),qt=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Kt=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Nt=!!V.morphAttributes.position,re=!!V.morphAttributes.normal,pe=!!V.morphAttributes.color,ge=Qn;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ge=y.toneMapping);let Je=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ae=Je!==void 0?Je.length:0,Bt=_t.get(z),Cn=p.state.lights;if(lt===!0&&(Et===!0||E!==M)){let rn=E===M&&z.id===b;ut.setState(z,E,rn)}let ce=!1;z.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==Cn.state.version||Bt.outputColorSpace!==Dt||O.isBatchedMesh&&Bt.batching===!1||!O.isBatchedMesh&&Bt.batching===!0||O.isBatchedMesh&&Bt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Bt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Bt.instancing===!1||!O.isInstancedMesh&&Bt.instancing===!0||O.isSkinnedMesh&&Bt.skinning===!1||!O.isSkinnedMesh&&Bt.skinning===!0||O.isInstancedMesh&&Bt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Bt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Bt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Bt.instancingMorph===!1&&O.morphTexture!==null||Bt.envMap!==Ut||z.fog===!0&&Bt.fog!==ht||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==ut.numPlanes||Bt.numIntersection!==ut.numIntersection)||Bt.vertexAlphas!==qt||Bt.vertexTangents!==Kt||Bt.morphTargets!==Nt||Bt.morphNormals!==re||Bt.morphColors!==pe||Bt.toneMapping!==ge||Bt.morphTargetsCount!==ae)&&(ce=!0):(ce=!0,Bt.__version=z.version);let un=Bt.currentProgram;ce===!0&&(un=et(z,U,O));let Ai=!1,tn=!1,us=!1,xe=un.getUniforms(),yn=Bt.uniforms;if(ft.useProgram(un.program)&&(Ai=!0,tn=!0,us=!0),z.id!==b&&(b=z.id,tn=!0),Ai||M!==E){ft.buffers.depth.getReversed()?(dt.copy(E.projectionMatrix),yu(dt),vu(dt),xe.setValue(L,"projectionMatrix",dt)):xe.setValue(L,"projectionMatrix",E.projectionMatrix),xe.setValue(L,"viewMatrix",E.matrixWorldInverse);let Hn=xe.map.cameraPosition;Hn!==void 0&&Hn.setValue(L,Ft.setFromMatrixPosition(E.matrixWorld)),Ct.logarithmicDepthBuffer&&xe.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&xe.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,tn=!0,us=!0)}if(O.isSkinnedMesh){xe.setOptional(L,O,"bindMatrix"),xe.setOptional(L,O,"bindMatrixInverse");let rn=O.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),xe.setValue(L,"boneTexture",rn.boneTexture,A))}O.isBatchedMesh&&(xe.setOptional(L,O,"batchingTexture"),xe.setValue(L,"batchingTexture",O._matricesTexture,A),xe.setOptional(L,O,"batchingIdTexture"),xe.setValue(L,"batchingIdTexture",O._indirectTexture,A),xe.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&xe.setValue(L,"batchingColorTexture",O._colorsTexture,A));let ds=V.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0)&&Ht.update(O,V,un),(tn||Bt.receiveShadow!==O.receiveShadow)&&(Bt.receiveShadow=O.receiveShadow,xe.setValue(L,"receiveShadow",O.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(yn.envMap.value=Ut,yn.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(yn.envMapIntensity.value=U.environmentIntensity),tn&&(xe.setValue(L,"toneMappingExposure",y.toneMappingExposure),Bt.needsLights&&ie(yn,us),ht&&z.fog===!0&&yt.refreshFogUniforms(yn,ht),yt.refreshMaterialUniforms(yn,z,X,nt,p.state.transmissionRenderTarget[E.id]),Zi.upload(L,ct(Bt),yn,A)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Zi.upload(L,ct(Bt),yn,A),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&xe.setValue(L,"center",O.center),xe.setValue(L,"modelViewMatrix",O.modelViewMatrix),xe.setValue(L,"normalMatrix",O.normalMatrix),xe.setValue(L,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let rn=z.uniformsGroups;for(let Hn=0,Gn=rn.length;Hn<Gn;Hn++){let Ec=rn[Hn];N.update(Ec,un),N.bind(Ec,un)}}return un}function ie(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Wt(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(E,U,V){_t.get(E.texture).__webglTexture=U,_t.get(E.depthTexture).__webglTexture=V;let z=_t.get(E);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=V===void 0,z.__autoAllocateDepthBuffer||at.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){let V=_t.get(E);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,V=0){I=E,T=U,C=V;let z=!0,O=null,ht=!1,bt=!1;if(E){let Ut=_t.get(E);if(Ut.__useDefaultFramebuffer!==void 0)ft.bindFramebuffer(L.FRAMEBUFFER,null),z=!1;else if(Ut.__webglFramebuffer===void 0)A.setupRenderTarget(E);else if(Ut.__hasExternalTextures)A.rebindTextures(E,_t.get(E.texture).__webglTexture,_t.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Nt=E.depthTexture;if(Ut.__boundDepthTexture!==Nt){if(Nt!==null&&_t.has(Nt)&&(E.width!==Nt.image.width||E.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(E)}}let qt=E.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(bt=!0);let Kt=_t.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Kt[U])?O=Kt[U][V]:O=Kt[U],ht=!0):E.samples>0&&A.useMultisampledRTT(E)===!1?O=_t.get(E).__webglMultisampledFramebuffer:Array.isArray(Kt)?O=Kt[V]:O=Kt,P.copy(E.viewport),F.copy(E.scissor),B=E.scissorTest}else P.copy(xt).multiplyScalar(X).floor(),F.copy(zt).multiplyScalar(X).floor(),B=jt;if(ft.bindFramebuffer(L.FRAMEBUFFER,O)&&z&&ft.drawBuffers(E,O),ft.viewport(P),ft.scissor(F),ft.setScissorTest(B),ht){let Ut=_t.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ut.__webglTexture,V)}else if(bt){let Ut=_t.get(E.texture),qt=U||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ut.__webglTexture,V||0,qt)}b=-1},this.readRenderTargetPixels=function(E,U,V,z,O,ht,bt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=_t.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&bt!==void 0&&(Dt=Dt[bt]),Dt){ft.bindFramebuffer(L.FRAMEBUFFER,Dt);try{let Ut=E.texture,qt=Ut.format,Kt=Ut.type;if(!Ct.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-z&&V>=0&&V<=E.height-O&&L.readPixels(U,V,z,O,Xt.convert(qt),Xt.convert(Kt),ht)}finally{let Ut=I!==null?_t.get(I).__webglFramebuffer:null;ft.bindFramebuffer(L.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(E,U,V,z,O,ht,bt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=_t.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&bt!==void 0&&(Dt=Dt[bt]),Dt){let Ut=E.texture,qt=Ut.format,Kt=Ut.type;if(!Ct.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=E.width-z&&V>=0&&V<=E.height-O){ft.bindFramebuffer(L.FRAMEBUFFER,Dt);let Nt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Nt),L.bufferData(L.PIXEL_PACK_BUFFER,ht.byteLength,L.STREAM_READ),L.readPixels(U,V,z,O,Xt.convert(qt),Xt.convert(Kt),0);let re=I!==null?_t.get(I).__webglFramebuffer:null;ft.bindFramebuffer(L.FRAMEBUFFER,re);let pe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await _u(L,pe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Nt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ht),L.deleteBuffer(Nt),L.deleteSync(pe),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,U=null,V=0){E.isTexture!==!0&&(_s("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,E=arguments[1]);let z=Math.pow(2,-V),O=Math.floor(E.image.width*z),ht=Math.floor(E.image.height*z),bt=U!==null?U.x:0,Dt=U!==null?U.y:0;A.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,bt,Dt,O,ht),ft.unbindTexture()},this.copyTextureToTexture=function(E,U,V=null,z=null,O=0){E.isTexture!==!0&&(_s("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,E=arguments[1],U=arguments[2],O=arguments[3]||0,V=null);let ht,bt,Dt,Ut,qt,Kt,Nt,re,pe,ge=E.isCompressedTexture?E.mipmaps[O]:E.image;V!==null?(ht=V.max.x-V.min.x,bt=V.max.y-V.min.y,Dt=V.isBox3?V.max.z-V.min.z:1,Ut=V.min.x,qt=V.min.y,Kt=V.isBox3?V.min.z:0):(ht=ge.width,bt=ge.height,Dt=ge.depth||1,Ut=0,qt=0,Kt=0),z!==null?(Nt=z.x,re=z.y,pe=z.z):(Nt=0,re=0,pe=0);let Je=Xt.convert(U.format),ae=Xt.convert(U.type),Bt;U.isData3DTexture?(A.setTexture3D(U,0),Bt=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(A.setTexture2DArray(U,0),Bt=L.TEXTURE_2D_ARRAY):(A.setTexture2D(U,0),Bt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);let Cn=L.getParameter(L.UNPACK_ROW_LENGTH),ce=L.getParameter(L.UNPACK_IMAGE_HEIGHT),un=L.getParameter(L.UNPACK_SKIP_PIXELS),Ai=L.getParameter(L.UNPACK_SKIP_ROWS),tn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ge.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ge.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ut),L.pixelStorei(L.UNPACK_SKIP_ROWS,qt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Kt);let us=E.isDataArrayTexture||E.isData3DTexture,xe=U.isDataArrayTexture||U.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){let yn=_t.get(E),ds=_t.get(U),rn=_t.get(yn.__renderTarget),Hn=_t.get(ds.__renderTarget);ft.bindFramebuffer(L.READ_FRAMEBUFFER,rn.__webglFramebuffer),ft.bindFramebuffer(L.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let Gn=0;Gn<Dt;Gn++)us&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_t.get(E).__webglTexture,O,Kt+Gn),E.isDepthTexture?(xe&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_t.get(U).__webglTexture,O,pe+Gn),L.blitFramebuffer(Ut,qt,ht,bt,Nt,re,ht,bt,L.DEPTH_BUFFER_BIT,L.NEAREST)):xe?L.copyTexSubImage3D(Bt,O,Nt,re,pe+Gn,Ut,qt,ht,bt):L.copyTexSubImage2D(Bt,O,Nt,re,pe+Gn,Ut,qt,ht,bt);ft.bindFramebuffer(L.READ_FRAMEBUFFER,null),ft.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else xe?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(Bt,O,Nt,re,pe,ht,bt,Dt,Je,ae,ge.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Bt,O,Nt,re,pe,ht,bt,Dt,Je,ge.data):L.texSubImage3D(Bt,O,Nt,re,pe,ht,bt,Dt,Je,ae,ge):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,O,Nt,re,ht,bt,Je,ae,ge.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,O,Nt,re,ge.width,ge.height,Je,ge.data):L.texSubImage2D(L.TEXTURE_2D,O,Nt,re,ht,bt,Je,ae,ge);L.pixelStorei(L.UNPACK_ROW_LENGTH,Cn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ce),L.pixelStorei(L.UNPACK_SKIP_PIXELS,un),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ai),L.pixelStorei(L.UNPACK_SKIP_IMAGES,tn),O===0&&U.generateMipmaps&&L.generateMipmap(Bt),ft.unbindTexture()},this.copyTextureToTexture3D=function(E,U,V=null,z=null,O=0){return E.isTexture!==!0&&(_s("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,z=arguments[1]||null,E=arguments[2],U=arguments[3],O=arguments[4]||0),_s('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,U,V,z,O)},this.initRenderTarget=function(E){_t.get(E).__webglFramebuffer===void 0&&A.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),ft.unbindTexture()},this.resetState=function(){T=0,C=0,I=null,ft.reset(),le.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}},Fr=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Jt(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Or=class extends Ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Ls=class extends ni{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Al=new _e,Va=new Rs,dr=new ts,fr=new D,Br=class extends Ge{constructor(t=new Oe,e=new Ls){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(s),dr.radius+=r,t.ray.intersectsSphere(dr)===!1)return;Al.copy(s).invert(),Va.copy(t.ray).applyMatrix4(Al);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){let u=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let m=u,_=f;m<_;m++){let g=l.getX(m);fr.fromBufferAttribute(d,g),Cl(fr,g,c,s,t,e,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let m=u,_=f;m<_;m++)fr.fromBufferAttribute(d,m),Cl(fr,m,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Cl(i,t,e,n,s,r,o){let a=Va.distanceSqToPoint(i);if(a<e){let c=new D;Va.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ds=class extends sn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},an=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new gt:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new D,s=[],r=[],o=[],a=new D,c=new _e;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new D)}r[0]=new D,o[0]=new D;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(De(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(De(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Us=class extends an{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new gt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ka=class extends Us{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function _c(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var pr=new D,No=new _c,Fo=new _c,Oo=new _c,Ns=class extends an{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(pr.subVectors(s[0],s[1]).add(s[0]),l=pr);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(pr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=pr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),No.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,m,_,g),Fo.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,m,_,g),Oo.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(No.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Fo.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Oo.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(No.calc(c),Fo.calc(c),Oo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Rl(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function mm(i,t){let e=1-i;return e*e*t}function gm(i,t){return 2*(1-i)*i*t}function xm(i,t){return i*i*t}function bs(i,t,e,n){return mm(i,t)+gm(i,e)+xm(i,n)}function _m(i,t){let e=1-i;return e*e*e*t}function ym(i,t){let e=1-i;return 3*e*e*i*t}function vm(i,t){return 3*(1-i)*i*i*t}function Mm(i,t){return i*i*i*t}function ws(i,t,e,n,s){return _m(i,t)+ym(i,e)+vm(i,n)+Mm(i,s)}var zr=class extends an{constructor(t=new gt,e=new gt,n=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new gt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ws(t,s.x,r.x,o.x,a.x),ws(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ha=class extends an{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ws(t,s.x,r.x,o.x,a.x),ws(t,s.y,r.y,o.y,a.y),ws(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Vr=class extends an{constructor(t=new gt,e=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new gt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ga=class extends an{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},kr=class extends an{constructor(t=new gt,e=new gt,n=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new gt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(bs(t,s.x,r.x,o.x),bs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Hr=class extends an{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(bs(t,s.x,r.x,o.x),bs(t,s.y,r.y,o.y),bs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gr=class extends an{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new gt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Rl(a,c.x,l.x,h.x,d.x),Rl(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new gt().fromArray(s))}return this}},Wr=Object.freeze({__proto__:null,ArcCurve:ka,CatmullRomCurve3:Ns,CubicBezierCurve:zr,CubicBezierCurve3:Ha,EllipseCurve:Us,LineCurve:Vr,LineCurve3:Ga,QuadraticBezierCurve:kr,QuadraticBezierCurve3:Hr,SplineCurve:Gr}),Wa=class extends an{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wr[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Wr[s.type]().fromJSON(s))}return this}},Fs=class extends Wa{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Vr(this.currentPoint.clone(),new gt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new kr(this.currentPoint.clone(),new gt(t,e),new gt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new zr(this.currentPoint.clone(),new gt(t,e),new gt(n,s),new gt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Gr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Us(t,e,n,s,r,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Os=class i extends Oe{constructor(t=[new gt(0,-.5),new gt(.5,0),new gt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=De(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,d=new D,u=new gt,f=new D,m=new D,_=new D,g=0,p=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:g=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-g,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:g=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(m)}for(let S=0;S<=e;S++){let v=n+S*h*s,y=Math.sin(v),R=Math.cos(v);for(let T=0;T<=t.length-1;T++){d.x=t[T].x*y,d.y=t[T].y,d.z=t[T].x*R,o.push(d.x,d.y,d.z),u.x=S/e,u.y=T/(t.length-1),a.push(u.x,u.y);let C=c[3*T+0]*y,I=c[3*T+1],b=c[3*T+0]*R;l.push(C,I,b)}}for(let S=0;S<e;S++)for(let v=0;v<t.length-1;v++){let y=v+S*t.length,R=y,T=y+t.length,C=y+t.length+1,I=y+1;r.push(R,T,I),r.push(C,I,T)}this.setIndex(r),this.setAttribute("position",new he(o,3)),this.setAttribute("uv",new he(a,2)),this.setAttribute("normal",new he(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},cn=class i extends Os{constructor(t=1,e=1,n=4,s=8){let r=new Fs;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}};var q=class i extends Oe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],m=0,_=[],g=n/2,p=0;S(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new he(d,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(f,2));function S(){let y=new D,R=new D,T=0,C=(e-t)/n;for(let I=0;I<=r;I++){let b=[],M=I/r,P=M*(e-t)+t;for(let F=0;F<=s;F++){let B=F/s,W=B*c+a,Z=Math.sin(W),G=Math.cos(W);R.x=P*Z,R.y=-M*n+g,R.z=P*G,d.push(R.x,R.y,R.z),y.set(Z,C,G).normalize(),u.push(y.x,y.y,y.z),f.push(B,1-M),b.push(m++)}_.push(b)}for(let I=0;I<s;I++)for(let b=0;b<r;b++){let M=_[b][I],P=_[b+1][I],F=_[b+1][I+1],B=_[b][I+1];(t>0||b!==0)&&(h.push(M,P,B),T+=3),(e>0||b!==r-1)&&(h.push(P,F,B),T+=3)}l.addGroup(p,T,0),p+=T}function v(y){let R=m,T=new gt,C=new D,I=0,b=y===!0?t:e,M=y===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,g*M,0),u.push(0,M,0),f.push(.5,.5),m++;let P=m;for(let F=0;F<=s;F++){let W=F/s*c+a,Z=Math.cos(W),G=Math.sin(W);C.x=b*G,C.y=g*M,C.z=b*Z,d.push(C.x,C.y,C.z),u.push(0,M,0),T.x=Z*.5+.5,T.y=G*.5*M+.5,f.push(T.x,T.y),m++}for(let F=0;F<s;F++){let B=R+F,W=P+F;y===!0?h.push(W,W+1,B):h.push(W+1,W,B),I+=3}l.addGroup(p,I,y===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},We=class i extends q{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Xa=class i extends Oe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new he(r,3)),this.setAttribute("normal",new he(r.slice(),3)),this.setAttribute("uv",new he(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){let v=new D,y=new D,R=new D;for(let T=0;T<e.length;T+=3)f(e[T+0],v),f(e[T+1],y),f(e[T+2],R),c(v,y,R,S)}function c(S,v,y,R){let T=R+1,C=[];for(let I=0;I<=T;I++){C[I]=[];let b=S.clone().lerp(y,I/T),M=v.clone().lerp(y,I/T),P=T-I;for(let F=0;F<=P;F++)F===0&&I===T?C[I][F]=b:C[I][F]=b.clone().lerp(M,F/P)}for(let I=0;I<T;I++)for(let b=0;b<2*(T-I)-1;b++){let M=Math.floor(b/2);b%2===0?(u(C[I][M+1]),u(C[I+1][M]),u(C[I][M])):(u(C[I][M+1]),u(C[I+1][M+1]),u(C[I+1][M]))}}function l(S){let v=new D;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(S),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function h(){let S=new D;for(let v=0;v<r.length;v+=3){S.x=r[v+0],S.y=r[v+1],S.z=r[v+2];let y=g(S)/2/Math.PI+.5,R=p(S)/Math.PI+.5;o.push(y,1-R)}m(),d()}function d(){for(let S=0;S<o.length;S+=6){let v=o[S+0],y=o[S+2],R=o[S+4],T=Math.max(v,y,R),C=Math.min(v,y,R);T>.9&&C<.1&&(v<.2&&(o[S+0]+=1),y<.2&&(o[S+2]+=1),R<.2&&(o[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function f(S,v){let y=S*3;v.x=t[y+0],v.y=t[y+1],v.z=t[y+2]}function m(){let S=new D,v=new D,y=new D,R=new D,T=new gt,C=new gt,I=new gt;for(let b=0,M=0;b<r.length;b+=9,M+=6){S.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),y.set(r[b+6],r[b+7],r[b+8]),T.set(o[M+0],o[M+1]),C.set(o[M+2],o[M+3]),I.set(o[M+4],o[M+5]),R.copy(S).add(v).add(y).divideScalar(3);let P=g(R);_(T,M+0,S,P),_(C,M+2,v,P),_(I,M+4,y,P)}}function _(S,v,y,R){R<0&&S.x===1&&(o[v]=S.x-1),y.x===0&&y.z===0&&(o[v]=R/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var vi=class extends Fs{constructor(t){super(t),this.uuid=wi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Fs().fromJSON(s))}return this}},Sm={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=ah(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,d,u,f;if(n&&(r=Am(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let m=e;m<s;m+=e)d=i[m],u=i[m+1],d<a&&(a=d),u<c&&(c=u),d>l&&(l=d),u>h&&(h=u);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Bs(r,o,e,a,c,f,0),o}};function ah(i,t,e,n,s){let r,o;if(s===Bm(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Il(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Il(r,i[r],i[r+1],o);return o&&eo(o,o.next)&&(Vs(o),o=o.next),o}function Mi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(eo(e,e.next)||Se(e.prev,e,e.next)===0)){if(Vs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Bs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Lm(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?wm(i,n,s,r):bm(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Vs(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Em(Mi(i),t,e),Bs(i,t,e,n,s,r,2)):o===2&&Tm(i,t,e,n,s,r):Bs(Mi(i),t,e,n,s,r,1);break}}}function bm(i){let t=i.prev,e=i,n=i.next;if(Se(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,d=a<c?a<l?a:l:c<l?c:l,u=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&Wi(s,a,r,c,o,l,m.x,m.y)&&Se(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function wm(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Se(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,d=r.y,u=o.y,f=a<c?a<l?a:l:c<l?c:l,m=h<d?h<u?h:u:d<u?d:u,_=a>c?a>l?a:l:c>l?c:l,g=h>d?h>u?h:u:d>u?d:u,p=qa(f,m,t,e,n),S=qa(_,g,t,e,n),v=i.prevZ,y=i.nextZ;for(;v&&v.z>=p&&y&&y.z<=S;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&Wi(a,h,c,d,l,u,v.x,v.y)&&Se(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&Wi(a,h,c,d,l,u,y.x,y.y)&&Se(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&Wi(a,h,c,d,l,u,v.x,v.y)&&Se(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=S;){if(y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&Wi(a,h,c,d,l,u,y.x,y.y)&&Se(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Em(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!eo(s,r)&&ch(s,n,n.next,r)&&zs(s,r)&&zs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Vs(n),Vs(n.next),n=i=r),n=n.next}while(n!==i);return Mi(n)}function Tm(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Nm(o,a)){let c=lh(o,a);o=Mi(o,o.next),c=Mi(c,c.next),Bs(o,t,e,n,s,r,0),Bs(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Am(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=ah(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Um(l));for(s.sort(Cm),r=0;r<s.length;r++)e=Rm(s[r],e);return e}function Cm(i,t){return i.x-t.x}function Rm(i,t){let e=Im(i,t);if(!e)return t;let n=lh(e,i);return Mi(n,n.next),Mi(e,e.next)}function Im(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let u=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,s=e.x<e.next.x?e:e.next,u===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,d;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Wi(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(d=Math.abs(o-e.y)/(r-e.x),zs(e,i)&&(d<h||d===h&&(e.x>s.x||e.x===s.x&&Pm(s,e)))&&(s=e,h=d)),e=e.next;while(e!==a);return s}function Pm(i,t){return Se(i.prev,i,t.prev)<0&&Se(t.next,i,i.next)<0}function Lm(i,t,e,n){let s=i;do s.z===0&&(s.z=qa(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Dm(s)}function Dm(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function qa(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Um(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Wi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Nm(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Fm(i,t)&&(zs(i,t)&&zs(t,i)&&Om(i,t)&&(Se(i.prev,i,t.prev)||Se(i,t.prev,t))||eo(i,t)&&Se(i.prev,i,i.next)>0&&Se(t.prev,t,t.next)>0)}function Se(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function eo(i,t){return i.x===t.x&&i.y===t.y}function ch(i,t,e,n){let s=gr(Se(i,t,e)),r=gr(Se(i,t,n)),o=gr(Se(e,n,i)),a=gr(Se(e,n,t));return!!(s!==r&&o!==a||s===0&&mr(i,e,t)||r===0&&mr(i,n,t)||o===0&&mr(e,i,n)||a===0&&mr(e,t,n))}function mr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function gr(i){return i>0?1:i<0?-1:0}function Fm(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ch(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function zs(i,t){return Se(i.prev,i,i.next)<0?Se(i,t,i.next)>=0&&Se(i,i.prev,t)>=0:Se(i,t,i.prev)<0||Se(i,i.next,t)<0}function Om(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function lh(i,t){let e=new Ya(i.i,i.x,i.y),n=new Ya(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Il(i,t,e,n){let s=new Ya(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Vs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ya(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Bm(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Es=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Pl(t),Ll(n,t);let o=t.length;e.forEach(Pl);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Ll(n,e[c]);let a=Sm.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Pl(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ll(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ns=class i extends Oe{constructor(t=new vi([new gt(.5,.5),new gt(-.5,.5),new gt(-.5,-.5),new gt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new he(s,3)),this.setAttribute("uv",new he(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:zm,v,y=!1,R,T,C,I;p&&(v=p.getSpacedPoints(h),y=!0,u=!1,R=p.computeFrenetFrames(h,!1),T=new D,C=new D,I=new D),u||(g=0,f=0,m=0,_=0);let b=a.extractPoints(l),M=b.shape,P=b.holes;if(!Es.isClockWise(M)){M=M.reverse();for(let j=0,rt=P.length;j<rt;j++){let L=P[j];Es.isClockWise(L)&&(P[j]=L.reverse())}}let B=Es.triangulateShape(M,P),W=M;for(let j=0,rt=P.length;j<rt;j++){let L=P[j];M=M.concat(L)}function Z(j,rt,L){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(rt,L)}let G=M.length,nt=B.length;function X(j,rt,L){let pt,at,Ct,ft=j.x-rt.x,Vt=j.y-rt.y,_t=L.x-j.x,A=L.y-j.y,w=ft*ft+Vt*Vt,H=ft*A-Vt*_t;if(Math.abs(H)>Number.EPSILON){let J=Math.sqrt(w),tt=Math.sqrt(_t*_t+A*A),K=rt.x-Vt/J,Pt=rt.y+ft/J,yt=L.x-A/tt,At=L.y+_t/tt,ee=((yt-K)*A-(At-Pt)*_t)/(ft*A-Vt*_t);pt=K+ft*ee-j.x,at=Pt+Vt*ee-j.y;let ut=pt*pt+at*at;if(ut<=2)return new gt(pt,at);Ct=Math.sqrt(ut/2)}else{let J=!1;ft>Number.EPSILON?_t>Number.EPSILON&&(J=!0):ft<-Number.EPSILON?_t<-Number.EPSILON&&(J=!0):Math.sign(Vt)===Math.sign(A)&&(J=!0),J?(pt=-Vt,at=ft,Ct=Math.sqrt(w)):(pt=ft,at=Vt,Ct=Math.sqrt(w/2))}return new gt(pt/Ct,at/Ct)}let st=[];for(let j=0,rt=W.length,L=rt-1,pt=j+1;j<rt;j++,L++,pt++)L===rt&&(L=0),pt===rt&&(pt=0),st[j]=X(W[j],W[L],W[pt]);let mt=[],xt,zt=st.concat();for(let j=0,rt=P.length;j<rt;j++){let L=P[j];xt=[];for(let pt=0,at=L.length,Ct=at-1,ft=pt+1;pt<at;pt++,Ct++,ft++)Ct===at&&(Ct=0),ft===at&&(ft=0),xt[pt]=X(L[pt],L[Ct],L[ft]);mt.push(xt),zt=zt.concat(xt)}for(let j=0;j<g;j++){let rt=j/g,L=f*Math.cos(rt*Math.PI/2),pt=m*Math.sin(rt*Math.PI/2)+_;for(let at=0,Ct=W.length;at<Ct;at++){let ft=Z(W[at],st[at],pt);dt(ft.x,ft.y,-L)}for(let at=0,Ct=P.length;at<Ct;at++){let ft=P[at];xt=mt[at];for(let Vt=0,_t=ft.length;Vt<_t;Vt++){let A=Z(ft[Vt],xt[Vt],pt);dt(A.x,A.y,-L)}}}let jt=m+_;for(let j=0;j<G;j++){let rt=u?Z(M[j],zt[j],jt):M[j];y?(C.copy(R.normals[0]).multiplyScalar(rt.x),T.copy(R.binormals[0]).multiplyScalar(rt.y),I.copy(v[0]).add(C).add(T),dt(I.x,I.y,I.z)):dt(rt.x,rt.y,0)}for(let j=1;j<=h;j++)for(let rt=0;rt<G;rt++){let L=u?Z(M[rt],zt[rt],jt):M[rt];y?(C.copy(R.normals[j]).multiplyScalar(L.x),T.copy(R.binormals[j]).multiplyScalar(L.y),I.copy(v[j]).add(C).add(T),dt(I.x,I.y,I.z)):dt(L.x,L.y,d/h*j)}for(let j=g-1;j>=0;j--){let rt=j/g,L=f*Math.cos(rt*Math.PI/2),pt=m*Math.sin(rt*Math.PI/2)+_;for(let at=0,Ct=W.length;at<Ct;at++){let ft=Z(W[at],st[at],pt);dt(ft.x,ft.y,d+L)}for(let at=0,Ct=P.length;at<Ct;at++){let ft=P[at];xt=mt[at];for(let Vt=0,_t=ft.length;Vt<_t;Vt++){let A=Z(ft[Vt],xt[Vt],pt);y?dt(A.x,A.y+v[h-1].y,v[h-1].x+L):dt(A.x,A.y,d+L)}}}$(),lt();function $(){let j=s.length/3;if(u){let rt=0,L=G*rt;for(let pt=0;pt<nt;pt++){let at=B[pt];Lt(at[2]+L,at[1]+L,at[0]+L)}rt=h+g*2,L=G*rt;for(let pt=0;pt<nt;pt++){let at=B[pt];Lt(at[0]+L,at[1]+L,at[2]+L)}}else{for(let rt=0;rt<nt;rt++){let L=B[rt];Lt(L[2],L[1],L[0])}for(let rt=0;rt<nt;rt++){let L=B[rt];Lt(L[0]+G*h,L[1]+G*h,L[2]+G*h)}}n.addGroup(j,s.length/3-j,0)}function lt(){let j=s.length/3,rt=0;Et(W,rt),rt+=W.length;for(let L=0,pt=P.length;L<pt;L++){let at=P[L];Et(at,rt),rt+=at.length}n.addGroup(j,s.length/3-j,1)}function Et(j,rt){let L=j.length;for(;--L>=0;){let pt=L,at=L-1;at<0&&(at=j.length-1);for(let Ct=0,ft=h+g*2;Ct<ft;Ct++){let Vt=G*Ct,_t=G*(Ct+1),A=rt+pt+Vt,w=rt+at+Vt,H=rt+at+_t,J=rt+pt+_t;Ft(A,w,H,J)}}}function dt(j,rt,L){c.push(j),c.push(rt),c.push(L)}function Lt(j,rt,L){Ot(j),Ot(rt),Ot(L);let pt=s.length/3,at=S.generateTopUV(n,s,pt-3,pt-2,pt-1);Yt(at[0]),Yt(at[1]),Yt(at[2])}function Ft(j,rt,L,pt){Ot(j),Ot(rt),Ot(pt),Ot(rt),Ot(L),Ot(pt);let at=s.length/3,Ct=S.generateSideWallUV(n,s,at-6,at-3,at-2,at-1);Yt(Ct[0]),Yt(Ct[1]),Yt(Ct[3]),Yt(Ct[1]),Yt(Ct[2]),Yt(Ct[3])}function Ot(j){s.push(c[j*3+0]),s.push(c[j*3+1]),s.push(c[j*3+2])}function Yt(j){r.push(j.x),r.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Vm(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Wr[s.type]().fromJSON(s)),new i(n,t.options)}},zm={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new gt(r,o),new gt(a,c),new gt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],m=t[s*3+2],_=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new gt(o,1-c),new gt(l,1-d),new gt(u,1-m),new gt(_,1-p)]:[new gt(a,1-c),new gt(h,1-d),new gt(f,1-m),new gt(g,1-p)]}};function Vm(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var kn=class i extends Xa{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var it=class i extends Oe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],d=new D,u=new D,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let S=[],v=p/n,y=0;p===0&&o===0?y=.5/e:p===n&&c===Math.PI&&(y=-.5/e);for(let R=0;R<=e;R++){let T=R/e;d.x=-t*Math.cos(s+T*r)*Math.sin(o+v*a),d.y=t*Math.cos(o+v*a),d.z=t*Math.sin(s+T*r)*Math.sin(o+v*a),m.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(T+y,1-v),S.push(l++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){let v=h[p][S+1],y=h[p][S],R=h[p+1][S],T=h[p+1][S+1];(p!==0||o>0)&&f.push(v,y,T),(p!==n-1||c<Math.PI)&&f.push(y,R,T)}this.setIndex(f),this.setAttribute("position",new he(m,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Gt=class i extends Oe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new D,d=new D,u=new D;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){let _=m/s*r,g=f/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(_),d.y=(t+e*Math.cos(g))*Math.sin(_),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(m/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){let _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,S=(s+1)*f+m;o.push(_,g,S),o.push(g,p,S)}this.setIndex(o),this.setAttribute("position",new he(a,3)),this.setAttribute("normal",new he(c,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Xr=class i extends Oe{constructor(t=new Hr(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new D,c=new D,l=new gt,h=new D,d=[],u=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new he(d,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(f,2));function _(){for(let v=0;v<e;v++)g(v);g(r===!1?e:0),S(),p()}function g(v){h=t.getPointAt(v/e,h);let y=o.normals[v],R=o.binormals[v];for(let T=0;T<=s;T++){let C=T/s*Math.PI*2,I=Math.sin(C),b=-Math.cos(C);c.x=b*y.x+I*R.x,c.y=b*y.y+I*R.y,c.z=b*y.z+I*R.z,c.normalize(),u.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,d.push(a.x,a.y,a.z)}}function p(){for(let v=1;v<=e;v++)for(let y=1;y<=s;y++){let R=(s+1)*(v-1)+(y-1),T=(s+1)*v+(y-1),C=(s+1)*v+y,I=(s+1)*(v-1)+y;m.push(R,T,I),m.push(T,C,I)}}function S(){for(let v=0;v<=e;v++)for(let y=0;y<=s;y++)l.x=v/e,l.y=y/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Wr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var En=class extends ni{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kl,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function xr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function km(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var is=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Za=class extends is{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ic,endingEnd:Ic}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Pc:r=t,a=2*e-n;break;case Lc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Pc:o=t,c=2*n-e;break;case Lc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),_=m*m,g=_*m,p=-u*g+2*u*_-u*m,S=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*m+1,v=(-1-f)*g+(1.5+f)*_+.5*m,y=f*g-f*_;for(let R=0;R!==a;++R)r[R]=p*o[h+R]+S*o[l+R]+v*o[c+R]+y*o[d+R];return r}},$a=class extends is{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*d+o[c+u]*h;return r}},Ja=class extends is{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},_n=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=xr(e,this.TimeBufferType),this.values=xr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:xr(t.times,Array),values:xr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ja(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new $a(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Za(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case br:e=this.InterpolantFactoryMethodDiscrete;break;case ba:e=this.InterpolantFactoryMethodLinear;break;case ao:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return br;case this.InterpolantFactoryMethodLinear:return ba;case this.InterpolantFactoryMethodSmooth:return ao}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&km(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ao,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let d=a*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let _=e[d+m];if(_!==e[u+m]||_!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=ba;var Si=class extends _n{constructor(t,e,n){super(t,e,n)}};Si.prototype.ValueTypeName="bool";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=br;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var Ka=class extends _n{};Ka.prototype.ValueTypeName="color";var Qa=class extends _n{};Qa.prototype.ValueTypeName="number";var ja=class extends is{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)ei.slerpFlat(r,0,o,l-a,o,l,c);return r}},qr=class extends _n{InterpolantFactoryMethodLinear(t){return new ja(this.times,this.values,this.getValueSize(),t)}};qr.prototype.ValueTypeName="quaternion";qr.prototype.InterpolantFactoryMethodSmooth=void 0;var bi=class extends _n{constructor(t,e,n){super(t,e,n)}};bi.prototype.ValueTypeName="string";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=br;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var tc=class extends _n{};tc.prototype.ValueTypeName="vector";var ec=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],m=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}},Hm=new ec,nc=class{constructor(t){this.manager=t!==void 0?t:Hm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};nc.DEFAULT_MATERIAL_NAME="__DEFAULT";var ss=class extends Ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Yr=class extends ss{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Bo=new _e,Dl=new D,Ul=new D,Zr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.map=null,this.mapPass=null,this.matrix=new _e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ps,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Dl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dl),Ul.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ul),e.updateMatrixWorld(),Bo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Nl=new _e,xs=new D,zo=new D,ic=class extends Zr{constructor(){super(new ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new gt(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),xs.setFromMatrixPosition(t.matrixWorld),n.position.copy(xs),zo.copy(n.position),zo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(zo),n.updateMatrixWorld(),s.makeTranslation(-xs.x,-xs.y,-xs.z),Nl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nl)}},$r=class extends ss{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ic}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},sc=class extends Zr{constructor(){super(new Lr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ks=class extends ss{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.target=new Ge,this.shadow=new sc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Jr=class extends ss{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var yc="\\[\\]\\.:\\/",Gm=new RegExp("["+yc+"]","g"),vc="[^"+yc+"]",Wm="[^"+yc.replace("\\.","")+"]",Xm=/((?:WC+[\/:])*)/.source.replace("WC",vc),qm=/(WCOD+)?/.source.replace("WCOD",Wm),Ym=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vc),Zm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vc),$m=new RegExp("^"+Xm+qm+Ym+Zm+"$"),Jm=["material","materials","bones","map"],rc=class{constructor(t,e,n){let s=n||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Me=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Gm,"")}static parseTrackName(t){let e=$m.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Jm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=rc;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Rg=new Float32Array(1);var Fl=new _e,Kr=class{constructor(t,e,n=0,s=1/0){this.ray=new Rs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Is,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Fl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fl),this}intersectObject(t,e=!0,n=[]){return oc(t,this,n,e),n.sort(Ol),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)oc(t[s],this,n,e);return n.sort(Ol),n}};function Ol(i,t){return i.distance-t.distance}function oc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)oc(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ac}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ac);var ln='"Noto Sans HK", "PingFang HK", "Microsoft JhengHei", sans-serif',si='"Gluten", "Trebuchet MS", "Arial Rounded MT Bold", sans-serif';function me(i,t,e){let n=document.createElement("canvas");n.width=i,n.height=t;let s=n.getContext("2d");e(s,i,t);let r=new Ds(n);return r.colorSpace=Ve,r.needsUpdate=!0,r}function Km(i,t,e){let n=document.createElement("canvas");n.width=i,n.height=t;let s=n.getContext("2d");e(s,i,t);let r=new Ds(n);return r.needsUpdate=!0,r}function no(i){let t=i>>>0;return()=>(t=Math.imul(1664525,t)+1013904223>>>0,t/4294967296)}function Qm(){let i=new Map,t={clayBump(){let e=Km(128,128,(n,s,r)=>{let o=no(1337);n.fillStyle="#808080",n.fillRect(0,0,s,r);for(let a=0;a<420;a++){let c=o()*s,l=o()*r,h=1.5+o()*4.5,d=Math.floor(112+o()*34);n.fillStyle=`rgba(${d},${d},${d},0.35)`,n.beginPath(),n.arc(c,l,h,0,Math.PI*2),n.fill()}});return e.wrapS=e.wrapT=xn,e.repeat.set(2,2),e},woodPlank(){let e=me(256,256,(n,s,r)=>{let o=no(42),a=6,c=r/a,l=["#d4a168","#ca945a","#d9a972","#c68d54","#d29d63","#cf985e"];for(let h=0;h<a;h++){let d=h*c;n.fillStyle=l[h%l.length],n.fillRect(0,d,s,c);for(let f=0;f<14;f++){let m=d+2+o()*(c-4);n.strokeStyle=o()>.5?"rgba(110,66,30,0.16)":"rgba(255,235,200,0.13)",n.lineWidth=1+o()*1.4,n.beginPath(),n.moveTo(0,m),n.bezierCurveTo(s*.33,m+(o()-.5)*4,s*.66,m+(o()-.5)*4,s,m),n.stroke()}n.fillStyle="rgba(74,42,18,0.42)",n.fillRect(0,d,s,2.2),n.fillStyle="rgba(255,244,218,0.2)",n.fillRect(0,d+2.2,s,1.5);let u=(h*73+48)%(s-40)+20;n.fillStyle="rgba(74,42,18,0.34)",n.fillRect(u,d,2,c);for(let f of[u-7,u+9])for(let m of[d+10,d+c-10])n.fillStyle="#6c4828",n.beginPath(),n.arc(f,m,2.6,0,Math.PI*2),n.fill(),n.fillStyle="#e8c474",n.beginPath(),n.arc(f-.6,m-.6,1.2,0,Math.PI*2),n.fill()}});return e.wrapS=e.wrapT=xn,e.repeat.set(2,2),e},stoneWall(){let e=me(256,128,(n,s,r)=>{let o=no(88);n.fillStyle="#b9b4a8",n.fillRect(0,0,s,r);let a=4,c=r/a,l=["#cfc8bc","#c5beb1","#d6d0c4","#beb7aa","#cbc4b7"];for(let h=0;h<a;h++){let d=h*c,u=h%2*-28;for(;u<s;){let f=44+Math.floor(o()*24);n.fillStyle=l[Math.floor(o()*l.length)],n.fillRect(u+2,d+2,f-4,c-4),n.fillStyle="rgba(255,252,244,0.22)",n.fillRect(u+2,d+2,f-4,3),n.fillStyle="rgba(70,66,60,0.22)",n.fillRect(u+2,d+c-5,f-4,3),u+=f}}});return e.wrapS=e.wrapT=xn,e.repeat.set(4,1),e},pineappleCrust(){return me(256,256,(e,n,s)=>{let r=e.createRadialGradient(n*.5,s*.45,16,n*.5,s*.5,n*.62);r.addColorStop(0,"#ffd972"),r.addColorStop(.65,"#f0a93b"),r.addColorStop(1,"#c97422"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#9c4e12",e.lineWidth=4.5;let o=32;for(let a=-s;a<n+s;a+=o)e.beginPath(),e.moveTo(a,0),e.lineTo(a+s,s),e.stroke(),e.beginPath(),e.moveTo(a,s),e.lineTo(a+s,0),e.stroke();e.strokeStyle="rgba(255,244,196,0.52)",e.lineWidth=2;for(let a=-s+3;a<n+s;a+=o)e.beginPath(),e.moveTo(a,0),e.lineTo(a+s,s),e.stroke()})},riceSack(){return me(256,256,(e,n,s)=>{e.fillStyle="#f2e3c6",e.fillRect(0,0,n,s),e.strokeStyle="rgba(170,136,92,0.22)",e.lineWidth=2;for(let r=0;r<n;r+=8)e.beginPath(),e.moveTo(r,0),e.lineTo(r,s),e.stroke(),e.beginPath(),e.moveTo(0,r),e.lineTo(n,r),e.stroke();e.fillStyle="#c9382e",e.fillRect(0,26,n,10),e.fillRect(0,s-36,n,10),e.save(),e.translate(n/2,s/2+2),e.fillStyle="#fff8eb",e.strokeStyle="#c9382e",e.lineWidth=8,e.beginPath(),e.moveTo(0,-68),e.lineTo(68,0),e.lineTo(0,68),e.lineTo(-68,0),e.closePath(),e.fill(),e.stroke(),e.strokeStyle="#e09c2b",e.lineWidth=2.5,e.beginPath(),e.moveTo(0,-56),e.lineTo(56,0),e.lineTo(0,56),e.lineTo(-56,0),e.closePath(),e.stroke(),e.fillStyle="#b8241d",e.font=`900 72px ${ln}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u7C73",0,4),e.restore()})},checkerTile(){let e=me(128,128,(n,s,r)=>{for(let a=0;a<r;a+=32)for(let c=0;c<s;c+=32){let l=(c/32+a/32)%2===0;n.fillStyle=l?"#1f8c7a":"#fff6e3",n.fillRect(c,a,32,32),n.strokeStyle="rgba(40,60,55,0.16)",n.lineWidth=1.5,n.strokeRect(c+.75,a+.75,30.5,30.5)}});return e.wrapS=e.wrapT=xn,e.repeat.set(3,1.5),e},stripeRed(){let e=me(256,64,(n,s,r)=>{let a=s/8;for(let c=0;c<8;c++)n.fillStyle=c%2===0?"#e2473c":"#fff8eb",n.fillRect(c*a,0,a,r);n.fillStyle="rgba(255,212,96,0.85)",n.fillRect(0,r-7,s,7)});return e.wrapS=e.wrapT=xn,e},stripeCoral(){let e=me(256,64,(n,s,r)=>{let a=s/8;for(let c=0;c<8;c++)n.fillStyle=c%2===0?"#ff6b4a":"#fff8eb",n.fillRect(c*a,0,a,r);n.fillStyle="#14968b",n.fillRect(0,r-8,s,8)});return e.wrapS=e.wrapT=xn,e},brick(){let e=me(256,256,(n,s,r)=>{let o=no(450);n.fillStyle="#e2d6c3",n.fillRect(0,0,s,r);let a=10,c=r/a,l=42,h=["#b84136","#c44b3e","#a9392f","#cc5545","#b23e33"];for(let d=0;d<a;d++){let u=d*c,f=d%2*(-l*.5);for(;f<s;)n.fillStyle=h[Math.floor(o()*h.length)],n.fillRect(f+2.5,u+2.5,l-5,c-5),n.fillStyle="rgba(255,220,190,0.14)",n.fillRect(f+2.5,u+2.5,l-5,3),f+=l}});return e.wrapS=e.wrapT=xn,e.repeat.set(1.5,2.5),e},clockFace(){return me(256,256,(e,n,s)=>{let r=n/2,o=s/2,a=n*.45;e.fillStyle="#fff8e8",e.beginPath(),e.arc(r,o,a+6,0,Math.PI*2),e.fill(),e.strokeStyle="#3a2e28",e.lineWidth=7,e.beginPath(),e.arc(r,o,a,0,Math.PI*2),e.stroke(),e.strokeStyle="#c89b3c",e.lineWidth=3,e.beginPath(),e.arc(r,o,a-10,0,Math.PI*2),e.stroke();let c=["XII","I","II","III","IV","V","VI","VII","VIII","IX","X","XI"];e.fillStyle="#222430",e.textAlign="center",e.textBaseline="middle";for(let l=0;l<12;l++){let h=l*Math.PI/6-Math.PI/2;e.strokeStyle="#222430",e.lineWidth=l%3===0?5:2.5,e.beginPath(),e.moveTo(r+Math.cos(h)*(a-12),o+Math.sin(h)*(a-12)),e.lineTo(r+Math.cos(h)*(a-24),o+Math.sin(h)*(a-24)),e.stroke(),e.font=l%3===0?"bold 24px Georgia, serif":"bold 17px Georgia, serif",e.fillText(c[l],r+Math.cos(h)*(a-40),o+Math.sin(h)*(a-40))}e.strokeStyle="#1b1d28",e.lineCap="round",e.lineWidth=9,e.beginPath(),e.moveTo(r,o),e.lineTo(r-42,o-34),e.stroke(),e.lineWidth=6,e.beginPath(),e.moveTo(r,o),e.lineTo(r+58,o-44),e.stroke(),e.fillStyle="#d9a426",e.beginPath(),e.arc(r,o,10,0,Math.PI*2),e.fill()})},badge18222(){return me(256,144,(e,n,s)=>{e.fillStyle="#1b2852",e.fillRect(0,0,n,s),e.strokeStyle="#ffd154",e.lineWidth=8,e.strokeRect(8,8,n-16,s-16),e.fillStyle="#ff5c4a",e.fillRect(14,14,n-28,34),e.fillStyle="#fff9ec",e.font=`900 22px ${ln}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u9632\u9A19\u6613 ANTI-SCAM",n/2,32),e.fillStyle="#ffe066",e.font=`900 62px ${si}`,e.fillText("18222",n/2,95)})},neonSign(){return me(256,144,(e,n,s)=>{e.fillStyle="#181d38",e.fillRect(0,0,n,s),e.shadowColor="#38f3dc",e.shadowBlur=16,e.strokeStyle="#56ffe8",e.lineWidth=7,e.strokeRect(10,10,n-20,s-20),e.shadowColor="#ff5fa8",e.shadowBlur=18,e.strokeStyle="#ff7ab8",e.lineWidth=3,e.strokeRect(20,20,n-40,s-40),e.fillStyle="#ff85be",e.font=`900 58px ${ln}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u8336\u9910\u5EF3",n/2,66),e.shadowColor="#ffe26a",e.shadowBlur=10,e.fillStyle="#ffeb8a",e.font=`800 18px ${si}`,e.fillText("CHA CHAAN TENG",n/2,112)})},chalkboard(){return me(256,192,(e,n,s)=>{e.fillStyle="#263631",e.fillRect(0,0,n,s),e.strokeStyle="#b87c42",e.lineWidth=14,e.strokeRect(7,7,n-14,s-14),e.fillStyle="#ffe484",e.font=`900 34px ${ln}`,e.textAlign="center",e.fillText("\u65B0\u9BAE\u51FA\u7210",n/2,56),e.fillStyle="#fff8eb",e.font=`700 30px ${ln}`,e.fillText("\u83E0\u863F\u5305 $8",n/2,106),e.fillStyle="#ffb894",e.font=`700 26px ${ln}`,e.fillText("\u6E2F\u5F0F\u5976\u8336 $16",n/2,148)})},kioskScreen(){return me(256,192,(e,n,s)=>{let r=e.createLinearGradient(0,0,0,s);r.addColorStop(0,"#104f58"),r.addColorStop(1,"#0b323e"),e.fillStyle=r,e.fillRect(0,0,n,s),e.fillStyle="#32e6be",e.font=`800 22px ${ln}`,e.textAlign="center",e.fillText("\u516B\u9054\u901A \xB7 \u5132\u84C4\u9918\u984D",n/2,34),e.fillStyle="#fff6cf",e.font=`900 44px ${si}`,e.fillText("HK$1,888",n/2,86),[26,40,52,64,78].forEach((a,c)=>{e.fillStyle=c===4?"#ffd34e":"#34e2bc",e.fillRect(38+c*38,174-a*.72,24,a*.72)})})},shopBanner(){return me(256,96,(e,n,s)=>{e.fillStyle="#184f4a",e.fillRect(0,0,n,s),e.strokeStyle="#f2c14e",e.lineWidth=6,e.strokeRect(6,6,n-12,s-12),e.fillStyle="#ffe896",e.font=`900 38px ${ln}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u6D77\u508D\u5C0F\u5929\u5730",n/2,38),e.fillStyle="#fff6e5",e.font=`800 16px ${si}`,e.fillText("HARBOUR KEEP \xB7 1/F",n/2,72)})},pierPlaque(){return me(256,80,(e,n,s)=>{let r=e.createLinearGradient(0,0,n,s);r.addColorStop(0,"#f5cc58"),r.addColorStop(.5,"#d89c2e"),r.addColorStop(1,"#f2c852"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#6c4814",e.lineWidth=5,e.strokeRect(6,6,n-12,s-12),e.fillStyle="#2b1d0c",e.font=`900 28px ${ln}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u6D77\u508D\u5C0F\u5929\u5730",n/2,31),e.font=`800 14px ${si}`,e.fillText("VICTORIA HARBOUR KEEP",n/2,58)})},passbook(){return me(128,192,(e,n,s)=>{e.fillStyle="#14968b",e.fillRect(0,0,n,s),e.fillStyle="#fff6e5",e.fillRect(0,44,n,26),e.fillStyle="#ffd154",e.fillRect(0,70,n,8),e.fillStyle="#154e49",e.font=`900 20px ${ln}`,e.textAlign="center",e.fillText("\u5132\u84C4\u5B58\u647A",n/2,64),e.fillStyle="#fff6e5",e.font=`800 16px ${si}`,e.fillText("SAVINGS",n/2,128)})},calcScreen(){return me(192,256,(e,n,s)=>{e.fillStyle="#ece3d2",e.fillRect(0,0,n,s),e.fillStyle="#a8cdb0",e.fillRect(16,18,n-32,62),e.strokeStyle="#485a4e",e.lineWidth=4,e.strokeRect(16,18,n-32,62),e.fillStyle="#1b3324",e.font="bold 28px monospace",e.textAlign="right",e.fillText("APR 0%",n-26,60);let r=["#f47e54","#6b7d8e","#6b7d8e","#6b7d8e"];for(let o=0;o<4;o++)for(let a=0;a<4;a++){e.fillStyle=a===3?r[0]:o===0?"#14968b":"#3a4556";let c=18+a*40,l=98+o*36;e.fillRect(c,l,32,28),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(c,l,32,5)}})},tramSign(){return me(256,96,(e,n,s)=>{e.fillStyle="#145435",e.fillRect(0,0,n,s),e.fillStyle="#fff4d9",e.fillRect(8,10,n-16,s-20),e.strokeStyle="#d9a226",e.lineWidth=4,e.strokeRect(12,14,n-24,s-28),e.fillStyle="#11442b",e.font=`900 32px ${ln}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u5805\u5C3C\u5730\u57CE \xB7 \u53EE\u53EE",n/2,40),e.font=`800 15px ${si}`,e.fillText("HK TRAMWAYS \xB7 DAY 30",n/2,68)})},laisee(){return me(128,160,(e,n,s)=>{e.fillStyle="#d92b2b",e.fillRect(0,0,n,s),e.strokeStyle="#ffd34e",e.lineWidth=6,e.strokeRect(10,10,n-20,s-20),e.fillStyle="#ffd34e",e.beginPath(),e.arc(n/2,s/2,34,0,Math.PI*2),e.fill(),e.fillStyle="#b81d1d",e.font=`900 34px ${ln}`,e.textAlign="center",e.textBaseline="middle",e.fillText("\u5927\u5409",n/2,s/2+2)})},coinFace(){return me(128,128,(e,n,s)=>{let r=n/2,o=s/2,a=e.createRadialGradient(r-12,o-12,8,r,o,60);a.addColorStop(0,"#fff09c"),a.addColorStop(.6,"#f7be34"),a.addColorStop(1,"#c98512"),e.fillStyle=a,e.fillRect(0,0,n,s),e.strokeStyle="#fff5b8",e.lineWidth=5,e.beginPath(),e.arc(r,o,50,0,Math.PI*2),e.stroke(),e.fillStyle="#ffe87c";for(let c=0;c<5;c++){let l=c*Math.PI*2/5-Math.PI/2;e.save(),e.translate(r+Math.cos(l)*18,o+Math.sin(l)*18),e.rotate(l),e.beginPath(),e.ellipse(0,0,14,7,0,0,Math.PI*2),e.fill(),e.restore()}e.fillStyle="#b3730e",e.beginPath(),e.arc(r,o,8,0,Math.PI*2),e.fill()})},waterRipple(){return me(256,256,(n,s,r)=>{n.clearRect(0,0,s,r);let o=s/2,a=r/2;for(let c=1;c<=5;c++){let l=22+c*21;n.strokeStyle=`rgba(230,252,255,${.28-c*.035})`,n.lineWidth=c===1?5:3,n.setLineDash([28,16,14,18]),n.beginPath(),n.arc(o,a,l,c*.4,Math.PI*2+c*.4),n.stroke()}})},shadowDisc(){return me(128,128,(e,n,s)=>{let r=n/2,o=s/2,a=e.createRadialGradient(r,o,6,r,o,n*.48);a.addColorStop(0,"rgba(22,30,52,0.58)"),a.addColorStop(.55,"rgba(22,30,52,0.24)"),a.addColorStop(1,"rgba(22,30,52,0)"),e.fillStyle=a,e.fillRect(0,0,n,s)})},coasterDial(){return me(256,256,(e,n,s)=>{let r=n/2,o=s/2,a=e.createRadialGradient(r,o,10,r,o,n*.5);a.addColorStop(0,"#e2ba86"),a.addColorStop(.75,"#c59258"),a.addColorStop(1,"#9a6838"),e.fillStyle=a,e.fillRect(0,0,n,s),e.strokeStyle="rgba(105,62,25,0.14)",e.lineWidth=2;for(let c=18;c<118;c+=11)e.beginPath(),e.arc(r,o,c,0,Math.PI*2),e.stroke();e.strokeStyle="#f2cf6d",e.lineWidth=4,e.beginPath(),e.arc(r,o,106,0,Math.PI*2),e.stroke(),e.lineWidth=2,e.beginPath(),e.arc(r,o,95,0,Math.PI*2),e.stroke();for(let c=0;c<24;c++){let l=c*Math.PI*2/24,h=c%6===0?86:92;e.beginPath(),e.moveTo(r+Math.cos(l)*h,o+Math.sin(l)*h),e.lineTo(r+Math.cos(l)*104,o+Math.sin(l)*104),e.stroke()}})},trophy100(){return me(256,96,(e,n,s)=>{e.fillStyle="#d99d24",e.fillRect(0,0,n,s),e.strokeStyle="#fff2a8",e.lineWidth=6,e.strokeRect(8,8,n-16,s-16),e.fillStyle="#3a2204",e.font=`900 44px ${si}`,e.textAlign="center",e.textBaseline="middle",e.fillText("100 DAYS",n/2,s/2+2)})}};return{get(e){if(!i.has(e)){let n=t[e];if(!n)throw new Error("Unknown texture: "+e);i.set(e,n())}return i.get(e)},dispose(){for(let e of i.values())e.dispose();i.clear()}}}function io(i="day"){let t={day:["#ffffff","#d8f4ff","#ffeecd","#82c5cc"],dusk:["#ffe7c2","#ffab8a","#c88ec4","#554c82"],night:["#95b4ff","#3b5294","#272e62","#161a38"]},e=t[i]||t.day,n=me(128,64,(s,r,o)=>{let a=s.createLinearGradient(0,0,0,o);a.addColorStop(0,e[0]),a.addColorStop(.38,e[1]),a.addColorStop(.68,e[2]),a.addColorStop(1,e[3]),s.fillStyle=a,s.fillRect(0,0,r,o),s.fillStyle=i==="night"?"rgba(210,230,255,0.85)":"rgba(255,255,255,0.92)",s.fillRect(18,6,26,13),s.fillRect(82,8,22,11)});return n.mapping=Ts,n}function so(i="day"){let t={day:[[0,"#4ca9e6"],[.36,"#7fd0f7"],[.54,"#c9f0f7"],[.72,"#d8f5ec"],[1,"#66b8c7"]],dusk:[[0,"#3b3275"],[.28,"#8e589a"],[.48,"#f08a6d"],[.64,"#ffd08a"],[1,"#4a4375"]],night:[[0,"#0b112c"],[.34,"#16214f"],[.54,"#293875"],[.72,"#202e63"],[1,"#0d1633"]]}[i]||[];return me(32,256,(e,n,s)=>{let r=e.createLinearGradient(0,0,0,s);for(let[o,a]of t)r.addColorStop(o,a);e.fillStyle=r,e.fillRect(0,0,n,s)})}function hh(i={}){let t=Qm(),e=new Map,n=[],s=i.softwareGL?null:t.get("clayBump");function r(a,c){return e.has(a)||e.set(a,c()),e.get(a)}return{tex:t,emissives:n,clay(a,c={}){var h,d;let l=`clay:${a}:${(h=c.rough)!=null?h:.5}:${c.flat?1:0}:${(d=c.side)!=null?d:0}`;return r(l,()=>{var u,f;return new En({color:a,roughness:(u=c.rough)!=null?u:.5,metalness:(f=c.metalness)!=null?f:.03,bumpMap:c.noBump?null:s,bumpScale:c.noBump?0:.008,envMapIntensity:.65,flatShading:!!c.flat,side:c.side||0})})},gloss(a,c={}){var h;let l=`gloss:${a}:${(h=c.rough)!=null?h:.22}`;return r(l,()=>{var d,u;return new En({color:a,roughness:(d=c.rough)!=null?d:.22,metalness:(u=c.metalness)!=null?u:.05,envMapIntensity:.95})})},metal(a,c=.24,l=.78){let h=`metal:${a}:${c}:${l}`;return r(h,()=>new En({color:a,roughness:i.softwareGL?Math.max(.32,c):c,metalness:i.softwareGL?Math.min(.45,l):l,envMapIntensity:1.35}))},glass(a=14677759,c=.42){let l=`glass:${a}:${c}`;return r(l,()=>new En({color:a,roughness:.1,metalness:.1,transparent:!0,opacity:c,depthWrite:!1,envMapIntensity:1.2}))},emissive(a,c=.7,l=2.1,h={}){let d=`em:${a}:${c}:${l}:${h.transparent?h.opacity:1}`;return r(d,()=>{var f,m,_,g,p;let u=new En({color:(f=h.color)!=null?f:a,emissive:new Jt(a),emissiveIntensity:c,roughness:(m=h.rough)!=null?m:.28,metalness:(_=h.metalness)!=null?_:.05,transparent:!!h.transparent,opacity:(g=h.opacity)!=null?g:1,depthWrite:(p=h.depthWrite)!=null?p:!h.transparent,side:h.side||0});return n.push({mat:u,base:c,night:l}),u})},textured(a,c={}){var h,d,u;let l=`tx:${a}:${(h=c.rough)!=null?h:.56}:${(d=c.metal)!=null?d:.04}:${c.emissive?1:0}:${(u=c.side)!=null?u:0}`;return r(l,()=>{var _,g,p,S,v,y,R,T,C;let f=t.get(a),m=new En({map:f,color:(_=c.color)!=null?_:16777215,roughness:(g=c.rough)!=null?g:.56,metalness:(p=c.metal)!=null?p:.04,envMapIntensity:(S=c.env)!=null?S:.7,side:c.side||0,transparent:!!c.transparent,opacity:(v=c.opacity)!=null?v:1});return c.emissive&&(m.emissive=new Jt((y=c.emissiveColor)!=null?y:16777215),m.emissiveMap=f,m.emissiveIntensity=(R=c.baseEmissive)!=null?R:.55,n.push({mat:m,base:(T=c.baseEmissive)!=null?T:.55,night:(C=c.nightEmissive)!=null?C:1.65})),m})},shadowMat(a=.36){let c=`sh:${a}`;return r(c,()=>new ii({map:t.get("shadowDisc"),transparent:!0,opacity:a,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}))},lockedMat(a=0){let c=`locked:${a}`;return r(c,()=>new En({color:a===0?13293797:a===1?10400455:14937332,roughness:.48,metalness:a===2?.25:.08,bumpMap:s,bumpScale:.006,emissive:new Jt(2638689),emissiveIntensity:.14,envMapIntensity:.9}))},setNightFactor(a){let c=Math.max(0,Math.min(1,a));for(let l of n)l.mat.emissiveIntensity=l.base+(l.night-l.base)*c},dispose(){for(let a of e.values())a.dispose();e.clear(),n.length=0,t.dispose()}}}function k(i,t,e,n=.06,s=.024,r=3){let o=Math.min(s,i*.22,t*.22,e*.32),a=Math.max(.01,i-o*2),c=Math.max(.01,t-o*2),l=Math.max(.01,e-o*2),h=Math.min(n,a*.45,c*.45),d=-a/2,u=-c/2,f=new vi;f.moveTo(d+h,u),f.lineTo(d+a-h,u),f.quadraticCurveTo(d+a,u,d+a,u+h),f.lineTo(d+a,u+c-h),f.quadraticCurveTo(d+a,u+c,d+a-h,u+c),f.lineTo(d+h,u+c),f.quadraticCurveTo(d,u+c,d,u+c-h),f.lineTo(d,u+h),f.quadraticCurveTo(d,u,d+h,u);let m=new ns(f,{depth:l,bevelEnabled:o>.001,bevelThickness:o,bevelSize:o,bevelSegments:r,curveSegments:r+2});return m.center(),m}function Tn(i,t=24){let e=i.map(([n,s])=>new gt(n,s));return new Os(e,t)}function Ne(i,t,e=20,n=8,s=!1){let r=new Ns(i.map(o=>o instanceof D?o:new D(o[0],o[1],o[2])),s);return new Xr(r,e,t,n,s)}function x(i,t,e={}){let n=new Fe(i,t);return n.castShadow=e.cast!==!1,n.receiveShadow=e.recv!==!1,e.pos&&n.position.set(e.pos[0],e.pos[1],e.pos[2]),e.rot&&n.rotation.set(e.rot[0],e.rot[1],e.rot[2]),e.scale!=null&&(Array.isArray(e.scale)?n.scale.set(e.scale[0],e.scale[1],e.scale[2]):n.scale.setScalar(e.scale)),n}function ue(i,t,e){return i.userData.milestoneDay=t,i.userData.prop=e,i.traverse(n=>{n.userData.milestoneDay=t,n.userData.prop=e}),i}var Mc=null;function be(i,t,e,n=.012,s=.34,r){Mc||(Mc=new we(1,1));let o=new Fe(Mc,r.shadowMat(s));return o.rotation.x=-Math.PI/2,o.position.y=n,o.scale.set(t*2,e*2,1),o.renderOrder=1,o.userData.ignoreBounds=!0,i.add(o),o}function uh(i,t){let e=0;i.traverse(n=>{if(n.isMesh){if(n.material&&n.material.transparent&&n.material.opacity<.5&&!n.castShadow){if(n.material.map===t.tex.get("shadowDisc"))return;n.visible=!1;return}n.material=t.lockedMat(e%3),e++}})}function jm(i,t,e=.04){let n=new vi;for(let r=0;r<10;r++){let o=r%2?t:i,a=Math.PI/2+r*Math.PI/5,c=Math.cos(a)*o,l=Math.sin(a)*o;r?n.lineTo(c,l):n.moveTo(c,l)}n.closePath();let s=new ns(n,{depth:e,bevelEnabled:!0,bevelThickness:.012,bevelSize:.01,bevelSegments:2});return s.center(),s}function Gs(i,t){let e=new ot;if(!t)return{group:e,anim:null};if(t==="halo"){let n=i.metal(16763960,.18,.85),s=i.emissive(16769385,.6,1.4),r=x(new Gt(.28,.036,14,36),n,{rot:[Math.PI/2,0,0]}),o=x(new Gt(.28,.018,10,32),s,{rot:[Math.PI/2,0,0],cast:!1});e.add(r,o);let a=[];for(let c=0;c<3;c++){let l=c*Math.PI*2/3,h=x(new kn(.038,0),s,{pos:[Math.cos(l)*.37,.03,Math.sin(l)*.37],cast:!1});a.push(h),e.add(h)}return{group:e,anim(c){e.position.y=Math.sin(c*2.6)*.035,e.rotation.y=c*1.1,a.forEach((l,h)=>{l.scale.setScalar(.8+.3*Math.sin(c*4.2+h*2.1))})}}}if(t==="straw"){let n=i.clay(15517807,{rough:.62}),s=i.clay(16112010,{rough:.58}),r=i.clay(15222844,{rough:.45}),o=x(Tn([[0,.02],[.22,.03],[.42,0],[.44,-.025],[.2,0],[0,0]],28),n),a=x(Tn([[.22,0],[.21,.14],[.16,.2],[0,.21]],24),s),c=x(new q(.218,.224,.055,24),r,{pos:[0,.05,0]}),l=x(new it(.042,10,10),r,{pos:[.21,.05,.06]});return e.add(o,a,c,l),{group:e,anim:null}}if(t==="tophat"){let n=i.clay(2303282,{rough:.32}),s=i.metal(16763196,.22,.82),r=x(new q(.36,.37,.04,28),n,{pos:[0,.02,0]}),o=x(new Gt(.36,.02,10,28),n,{rot:[Math.PI/2,0,0],pos:[0,.02,0]}),a=x(new q(.25,.21,.34,28),n,{pos:[0,.21,0]}),c=x(new q(.225,.218,.075,28),s,{pos:[0,.08,0]});return e.add(r,o,a,c),{group:e,anim:null}}return{group:e,anim:null}}function as(i,t=null,e={}){let n=new ot,s=new ot;n.add(s);let r=e.golden?i.metal(16762941,.22,.86):i.clay(16014652,{rough:.42}),o=e.golden?i.metal(16766814,.2,.86):i.clay(16742216,{rough:.4}),a=e.golden?i.metal(16770442,.26,.8):i.clay(16770244,{rough:.5}),c=e.golden?i.metal(16755250,.25,.8):i.gloss(16749229,{rough:.32}),l=i.gloss(16777215,{rough:.16}),h=i.gloss(1776938,{rough:.14}),d=x(new it(.56,28,22),r,{pos:[0,.42,0],scale:[1.14,.72,.88]}),u=x(new it(.46,22,16),a,{pos:[0,.28,.06],scale:[1,.48,.82]});s.add(d,u);for(let R of[-1,1])for(let T=0;T<3;T++){let C=x(new it(.085-T*.012,12,10),r,{pos:[R*(.56-T*.06),.42-T*.03,-.14+T*.16]});s.add(C)}let f=new cn(.052,.16,6,10),m=new cn(.044,.15,6,10);for(let R of[-1,1])for(let T=0;T<3;T++){let C=-.18+T*.18,I=x(f,o,{pos:[R*.56,.24,C],rot:[.06*(T-1),0,R*-.95]}),b=x(m,r,{pos:[R*.72,.12,C*1.1],rot:[.06*(T-1),0,R*-.25]});s.add(I,b)}let _=[];for(let R of[-1,1]){let T=new ot;T.position.set(R*.48,.44,.16);let C=x(Ne([[0,0,0],[R*.22,.14,.12],[R*.28,.32,.16]],.072,14,10),o),I=x(new it(.175,18,14),r,{pos:[R*.3,.43,.18],scale:[1.1,.92,.85]}),b=x(new cn(.068,.17,6,12),r,{pos:[R*.2,.56,.24],rot:[.25,0,R*.65]}),M=x(new cn(.056,.13,6,12),o,{pos:[R*.34,.53,.27],rot:[.2,0,R*-.35]});T.add(C,I,b,M),s.add(T),_.push({pivot:T,sx:R})}for(let R of[-1,1]){let T=x(new q(.042,.055,.24,12),r,{pos:[R*.19,.74,.22],rot:[.18,0,R*-.14]}),C=x(new it(.115,18,16),l,{pos:[R*.21,.87,.25]}),I=x(new it(.064,14,12),h,{pos:[R*.21,.88,.335]}),b=x(new it(.024,8,8),l,{pos:[R*.23,.91,.38],cast:!1});s.add(T,C,I,b)}let g=x(Ne([[-.14,.42,.48],[0,.37,.52],[.14,.42,.48]],.022,12,8),h,{cast:!1}),p=x(new it(.068,12,10),c,{pos:[-.28,.42,.42],scale:[1.2,.72,.4],cast:!1}),S=x(new it(.068,12,10),c,{pos:[.28,.42,.42],scale:[1.2,.72,.4],cast:!1});s.add(g,p,S);let v=Gs(i,t),y=new ot;return y.position.set(0,t==="halo"?1.15:.88,.1),y.add(v.group),s.add(y),e.noShadow||be(n,.78,.62,.014,.34,i),{group:ue(n,0,"crab"),anim(R,T,C={}){let I=C.mood||"idle",b=I==="happy"||I==="proud"?5.2:I==="focus"?1.4:2.3,M=I==="happy"?.075:.028;s.position.y=Math.abs(Math.sin(R*b))*M,s.rotation.z=Math.sin(R*b*.5)*(I==="happy"?.08:.03),_.forEach(({pivot:P,sx:F},B)=>{let W=I==="happy"||I==="proud"?.25+Math.sin(R*7.5+B*Math.PI)*.28:Math.sin(R*2.1+B*1.4)*.1;P.rotation.z=F*W,P.rotation.x=I==="happy"?-.18:0}),v.anim&&v.anim(R,T,C)}}}function Ei(i,t="jack",e=null,n={}){let s=t==="jackie",r=new ot,o=new ot;r.add(o);let a=i.clay(16240816,{rough:.48}),c=i.clay(2761261,{rough:.44}),l=i.clay(16447730,{rough:.48}),h=i.gloss(1776938,{rough:.14}),d=i.gloss(16751539,{rough:.34}),u=i.clay(3815237,{rough:.56}),f=s?i.clay(15891810,{rough:.52}):i.clay(13283986,{rough:.52}),m=l,_=s?i.clay(7370634,{rough:.55}):i.clay(3813941,{rough:.55}),g=s?i.clay(16774888,{rough:.48}):i.clay(1675140,{rough:.48});for(let b of[-1,1]){let M=x(k(.16,.055,.24,.05,.015),u,{pos:[b*.12,.028,.03]}),P=x(new it(.095,14,12),l,{pos:[b*.12,.075,.035],scale:[.88,.65,1.25]});if(o.add(M,P),s){let F=x(new q(.058,.056,.12,12),l,{pos:[b*.12,.14,0]}),B=x(new q(.06,.056,.22,12),a,{pos:[b*.12,.28,0]});o.add(F,B)}else{let F=x(new cn(.075,.24,6,12),_,{pos:[b*.12,.25,0]});o.add(F)}}if(s){let b=x(new q(.18,.27,.28,18),_,{pos:[0,.46,0]}),M=x(new q(.18,.21,.34,18),l,{pos:[0,.72,0]}),P=x(k(.14,.33,.25,.04,.015),f,{pos:[-.11,.72,.02]}),F=x(k(.14,.33,.25,.04,.015),f,{pos:[.11,.72,.02]}),B=x(k(.32,.33,.12,.04,.015),f,{pos:[0,.72,-.09]}),W=x(new Gt(.1,.024,8,18),g,{pos:[0,.87,.02],rot:[Math.PI/2,0,0]});o.add(b,M,P,F,B,W)}else{let b=x(k(.42,.44,.28,.1,.03),f,{pos:[0,.62,0]}),M=x(k(.24,.13,.05,.03,.012),g,{pos:[0,.52,.14]}),P=x(new Gt(.14,.055,10,18),g,{pos:[0,.84,-.04],rot:[Math.PI/2.4,0,0]});o.add(b,M,P)}let p=new ot;p.position.set(-.25,.8,0),p.add(x(new cn(.064,.22,6,12),m,{pos:[-.04,-.14,0],rot:[0,0,-.22]}),x(new it(.068,12,10),a,{pos:[-.08,-.28,.02]})),o.add(p);let S=new ot;S.position.set(.25,.8,0),S.add(x(new cn(.064,.22,6,12),m,{pos:[.09,.12,.04],rot:[.2,0,-.58]}),x(new it(.07,12,10),a,{pos:[.18,.26,.08]})),o.add(S);let v=x(new q(.07,.075,.1,12),a,{pos:[0,.9,0]}),y=new ot;y.position.set(0,1.14,0);let R=x(new it(.28,24,20),a,{scale:[1.02,.98,.96]});y.add(R);for(let b of[-1,1])y.add(x(new it(.06,10,10),a,{pos:[b*.27,-.01,-.01],scale:[.6,1,.8]}));let T=x(new it(.295,24,18,0,Math.PI*2,0,Math.PI*.62),c,{pos:[0,.03,-.02]});if(y.add(T),s){let b=x(k(.56,.44,.26,.14,.04),c,{pos:[0,-.14,-.14]}),M=x(new cn(.075,.26,6,10),c,{pos:[-.24,-.12,.04],rot:[0,0,.12]}),P=x(new cn(.075,.26,6,10),c,{pos:[.24,-.12,.04],rot:[0,0,-.12]}),F=x(k(.42,.12,.12,.05,.02),c,{pos:[0,.17,.21]}),B=x(k(.1,.036,.03,.014,.006),f,{pos:[.16,.18,.26],rot:[0,.25,-.2]});y.add(b,M,P,F,B)}else{for(let M=-2;M<=2;M++){let P=x(new it(.095-Math.abs(M)*.01,12,10),c,{pos:[M*.085,.2-Math.abs(M)*.02,.19-Math.abs(M)*.03],scale:[1,.78,.85]});y.add(P)}let b=x(new it(.285,18,14),c,{pos:[0,-.01,-.07]});y.add(b)}for(let b of[-1,1])y.add(x(new it(.038,12,10),h,{pos:[b*.095,.01,.255]}),x(new it(.014,8,8),i.gloss(16777215),{pos:[b*.105,.024,.284],cast:!1}),x(new it(.048,10,8),d,{pos:[b*.155,-.055,.23],scale:[1.1,.65,.35],cast:!1}));y.add(x(Ne([[-.07,-.07,.26],[0,-.1,.278],[.07,-.07,.26]],.014,10,8),h,{cast:!1}));let C=Gs(i,e),I=new ot;return I.position.set(0,e==="halo"?.44:.27,0),I.scale.setScalar(.95),I.add(C.group),y.add(I),o.add(v,y),n.noShadow||be(r,.36,.3,.014,.32,i),{group:ue(r,s?14:11,t),anim(b,M,P={}){let F=P.mood==="happy"||P.mood==="proud",B=F?5:2.6;o.position.y=Math.abs(Math.sin(b*B))*(F?.055:.014),S.rotation.z=Math.sin(b*(F?7.2:3.4))*(F?.32:.16),y.rotation.z=Math.sin(b*1.5)*.04,C.anim&&C.anim(b,M,P)}}}function dh(i,t=!1){let e=new ot,s=x(Tn([[.01,-2.15],[.95,-1.98],[2.15,-1.55],[3.25,-1.02],[3.92,-.58],[4.28,-.34],[4.22,-.12]],36),i.clay(10122584,{rough:.68}),{cast:!1}),r=x(new q(4.32,3.88,.36,36),i.clay(8160910,{rough:.62}),{pos:[0,-.42,0],cast:!1});e.add(s,r);let o=i.glass(2668236,.72);o.roughness=.16,o.metalness=.08;let a=x(new q(5.65,5.15,.34,48),o,{pos:[0,-.34,0],cast:!1,recv:!0}),c=x(new Gt(5.58,.085,10,56),i.clay(10350839,{rough:.35}),{pos:[0,-.19,0],rot:[Math.PI/2,0,0],cast:!1}),l=i.textured("waterRipple",{rough:.25,transparent:!0,opacity:.72,side:Te});l.depthWrite=!1;let h=x(new we(11.1,11.1),l,{pos:[0,-.155,0],rot:[-Math.PI/2,0,0],cast:!1,recv:!1}),d=x(new we(10.6,10.6),l,{pos:[0,-.15,0],rot:[-Math.PI/2,0,.8],cast:!1,recv:!1});e.add(a,c,h,d);let u=x(new q(4.12,4.24,.44,40,1,!0),i.textured("stoneWall",{rough:.65}),{pos:[0,-.23,0]}),f=x(new Gt(4.12,.11,12,48),i.clay(15064528,{rough:.52}),{pos:[0,-.025,0],rot:[Math.PI/2,0,0]});e.add(u,f);let m=x(new q(4.06,4.08,.12,44),i.textured("woodPlank",{rough:.54}),{pos:[0,-.06,0],cast:!1,recv:!0});if(e.add(m),t){let F=x(k(2.55,.04,2.1,.2,.014),i.clay(14662274,{rough:.52}),{pos:[0,.008,-.35],cast:!1,recv:!0});e.add(F)}else{let F=x(new q(1.18,1.22,.036,36),[i.clay(10119224),i.textured("coasterDial",{rough:.46}),i.clay(10119224)],{pos:[0,.006,.35],cast:!1,recv:!0}),B=x(new Gt(1.2,.028,10,40),i.metal(15251784,.24,.8),{pos:[0,.024,.35],rot:[Math.PI/2,0,0],cast:!1});e.add(F,B)}let _=i.clay(8146994,{rough:.62}),g=i.metal(15251784,.24,.8),p=i.metal(3817551,.38,.72);for(let F=0;F<12;F++){let B=F*Math.PI*2/12+.12,W=Math.cos(B)*4.32,Z=Math.sin(B)*4.32;e.add(x(new q(.11,.12,.92,12),_,{pos:[W,-.38,Z]}))}[.52,2.62,-.55,-2.58].forEach((F,B)=>{let W=Math.cos(F)*3.82,Z=Math.sin(F)*3.82,G=new ot;if(G.position.set(W,0,Z),G.add(x(new q(.14,.17,.06,14),p,{pos:[0,.03,0]}),x(new q(.085,.1,.24,14),p,{pos:[0,.16,0]}),x(new it(.105,14,10),g,{pos:[0,.29,0],scale:[1,.6,1]})),B===1){let nt=[];for(let X=0;X<=26;X++){let st=X/26,mt=.12+st*.14,xt=st*Math.PI*5.2;nt.push([Math.cos(xt)*mt+.28,.032+st*.015,Math.sin(xt)*mt+.12])}G.add(x(Ne(nt,.025,32,7),i.clay(14201980,{rough:.68})))}e.add(G)});let v=x(k(1.18,.34,.08,.04,.015),g,{pos:[0,-.14,4.18],rot:[-.08,0,0]}),y=x(new we(1.06,.26),i.textured("pierPlaque",{rough:.34,metal:.45}),{pos:[0,-.14,4.225],rot:[-.08,0,0],cast:!1});e.add(v,y);let R=i.clay(3909732,{rough:.56}),T=i.clay(5817465,{rough:.54}),C=i.clay(10266030,{rough:.6});[[-3.15,-2.05,1.05],[-2.55,-2.75,.85],[2.6,-2.65,.95],[3.2,-1.95,.8],[0,-3.55,1.15]].forEach(([F,B,W],Z)=>{let G=new ot;G.position.set(F,0,B),G.scale.setScalar(W),G.add(x(new it(.28,14,12),Z%2?R:T,{pos:[0,.2,0]}),x(new it(.21,12,10),Z%2?T:R,{pos:[.2,.14,.1]}),x(new it(.19,12,10),R,{pos:[-.18,.13,.12]}),x(new it(.14,10,8),C,{pos:[.12,.07,.26],scale:[1.3,.7,1.1]})),e.add(G)});let b=new ot;e.add(b);let M=[];function P(F){for(;b.children.length;)b.remove(b.children[0]);M.length=0;let B=Math.max(0,Math.min(2,F|0));for(let W=0;W<B;W++){let Z=W===0?1.15:2.02,G=new ot;G.position.set(Math.cos(Z)*4.78,-.14,Math.sin(Z)*4.78);let nt=x(new Gt(.26,.085,12,24),i.clay(15748670,{rough:.4}),{rot:[Math.PI/2,0,0]}),X=x(new Gt(.36,.025,8,24),i.emissive(16767832,.55,1.35),{rot:[Math.PI/2,0,0],cast:!1});for(let st=0;st<4;st++){let mt=st*Math.PI/2;G.add(x(new Gt(.09,.026,8,12),i.clay(16775144,{rough:.42}),{pos:[Math.cos(mt)*.26,0,Math.sin(mt)*.26],rot:[0,-mt,0]}))}G.add(nt,X),b.add(G),M.push({bg:G,phase:W*1.9})}}return{group:e,setShields:P,anim(F){h.rotation.z=F*.06,d.rotation.z=-F*.045+.8,a.position.y=-.34+Math.sin(F*1.35)*.025,c.position.y=-.19+Math.sin(F*1.35)*.025;for(let B of M)B.bg.position.y=-.13+Math.sin(F*2.1+B.phase)*.045,B.bg.rotation.z=Math.sin(F*1.6+B.phase)*.1}}}function tg(i){let t=new ot,e=i.textured("woodPlank",{rough:.58}),n=i.metal(15382596,.22,.84),s=i.gloss(16745640,{rough:.24}),r=i.gloss(16753598,{rough:.26}),o=i.gloss(1974316,{rough:.16}),a=i.textured("coinFace",{rough:.22,metal:.78});for(let f of[-.34,0,.34])t.add(x(k(1.06,.075,.25,.03,.012),e,{pos:[0,.105,f]}));for(let f of[-.42,0,.42])t.add(x(k(.12,.07,.92,.02,.01),i.clay(10119226),{pos:[f,.035,0]}));let c=new ot;c.position.set(0,.14,0),c.rotation.y=-Math.PI*.58;let l=x(new it(.42,28,22),s,{pos:[0,.38,0],scale:[1.18,.94,.94]}),h=x(new q(.145,.165,.14,22),r,{pos:[.47,.36,0],rot:[0,0,-Math.PI/2],scale:[.85,1,1.15]});for(let f of[-.045,.045])c.add(x(new it(.028,10,8),i.clay(12995954),{pos:[.54,.37,f],scale:[.5,1.3,.8]}));for(let f of[-1,1])c.add(x(new We(.11,.19,14),s,{pos:[.18,.72,f*.19],rot:[f*.42,0,-.35]})),c.add(x(new it(.048,12,10),o,{pos:[.435,.49,f*.175]}),x(new it(.017,8,8),i.gloss(16777215),{pos:[.474,.508,f*.185],cast:!1}),x(new it(.068,10,8),i.gloss(16736141),{pos:[.395,.36,f*.28],scale:[.55,.65,.4],cast:!1}));for(let[f,m]of[[-.24,-.18],[-.24,.18],[.22,-.18],[.22,.18]])c.add(x(new q(.088,.072,.19,14),s,{pos:[f,.095,m]}));let d=[];for(let f=0;f<=18;f++){let m=f/18,_=m*Math.PI*3.4;d.push([-.47-m*.14,.44+Math.sin(_)*.055,Math.cos(_)*.055])}c.add(x(Ne(d,.026,22,8),s)),c.add(x(k(.24,.036,.075,.02,.008),n,{pos:[0,.77,0]}),x(k(.18,.02,.03,.006,.004),o,{pos:[0,.785,0],cast:!1})),c.add(l,h),t.add(c);let u=x(new q(.16,.16,.036,24),[n,a,a],{pos:[0,1.18,0],rot:[Math.PI/2,0,0]});t.add(u);for(let f=0;f<3;f++)t.add(x(new q(.095,.095,.026,18),[n,a,a],{pos:[.38,.158+f*.027,.28]}));return be(t,.65,.56,.008,.34,i),{group:ue(t,1,"piggy"),anim(f){u.rotation.z=f*2.4,u.position.y=1.15+Math.sin(f*2.8)*.06}}}function eg(i){let t=new ot,e=i.textured("woodPlank",{rough:.56}),n=i.clay(16774626,{rough:.48}),s=i.metal(14856516,.24,.84),r=i.metal(3816780,.4,.7),o=i.textured("pineappleCrust",{rough:.42}),a=i.clay(14919768,{rough:.55}),c=i.textured("stripeRed",{rough:.54,side:Te});for(let C of[-.46,.46]){let I=new ot;I.position.set(-.28,.28,C),I.add(x(new Gt(.25,.036,12,26),i.clay(8145446)),x(new Gt(.275,.014,8,26),r),x(new q(.055,.055,.08,12),s,{rot:[Math.PI/2,0,0]}));for(let b=0;b<6;b++)I.add(x(new q(.014,.014,.48,8),i.clay(10117686),{rot:[0,0,b*Math.PI/6]}));t.add(I)}for(let C of[-.34,.34])t.add(x(new q(.025,.025,.24,8),r,{pos:[.46,.16,C]}),x(new q(.085,.085,.045,16),r,{pos:[.46,.085,C],rot:[Math.PI/2,0,0]}));let l=x(k(1.22,.58,.78,.06,.02),e,{pos:[0,.54,0]}),h=x(k(1.32,.08,.88,.04,.016),n,{pos:[0,.85,0]}),d=x(Ne([[-.6,.76,-.32],[-.82,.86,-.32],[-.82,.86,.32],[-.6,.76,.32]],.026,20,8),s);t.add(l,h,d);let u=x(k(.76,.44,.64,.03,.01),i.glass(15399167,.36),{pos:[-.14,1.11,0],cast:!1}),f=x(k(.7,.028,.56,.01,.005),n,{pos:[-.14,1.08,0]});t.add(u,f),[[-.34,.94,-.14],[-.14,.94,-.14],[.06,.94,-.14],[-.32,.94,.14],[-.12,.94,.14],[-.24,1.14,0],[0,1.14,0]].forEach(([C,I,b],M)=>{let P=new ot;P.position.set(C,I,b),P.add(x(new q(.085,.075,.055,16),a,{pos:[0,.025,0]}),x(new it(.095,16,12,0,Math.PI*2,0,Math.PI*.62),o,{pos:[0,.045,0],scale:[1,.85,1]})),M===5&&P.add(x(k(.11,.03,.09,.008,.004),i.gloss(16770680),{pos:[.03,.052,.04],rot:[.1,.4,.12]})),t.add(P)});let _=x(Tn([[0,0],[.14,0],[.16,.28],[.13,.36],[.06,.42],[.03,.46],[0,.47]],20),s,{pos:[.42,.89,-.1]}),g=x(new q(.016,.016,.09,8),r,{pos:[.42,1,.08],rot:[Math.PI/2,0,0]}),p=x(new q(.055,.042,.09,14),n,{pos:[.44,.935,.22]}),S=x(new q(.048,.048,.01,14),i.gloss(11888682),{pos:[.44,.978,.22],cast:!1});t.add(_,g,p,S);for(let[C,I]of[[-.58,-.36],[.58,-.36],[-.58,.36],[.58,.36]])t.add(x(new q(.022,.022,.94,10),s,{pos:[C,1.34,I]}),x(new it(.038,10,8),s,{pos:[C,1.82,I]}));let v=x(k(1.44,.06,.98,.04,.015),c,{pos:[0,1.84,.02],rot:[.12,0,0]}),y=x(new Ue(1.42,.14,.03),c,{pos:[0,1.72,.49]}),R=x(new Ue(1.42,.11,.03),c,{pos:[0,1.83,-.45]});t.add(v,y,R);let T=new ot;return T.position.set(.84,0,.18),T.rotation.y=-.35,T.add(x(k(.46,.56,.05,.03,.01),i.clay(10117686),{pos:[0,.34,0],rot:[-.18,0,0]}),x(new we(.4,.48),i.textured("chalkboard",{rough:.65}),{pos:[0,.34,.028],rot:[-.18,0,0],cast:!1}),x(k(.4,.48,.04,.02,.008),i.clay(8146474),{pos:[0,.3,-.14],rot:[.22,0,0]})),t.add(T),be(t,.92,.66,.008,.34,i),{group:ue(t,2,"bakery"),anim(C){v.rotation.x=.12+Math.sin(C*2)*.012}}}function ng(i){let t=new ot,e=i.clay(1349259,{rough:.44}),n=i.clay(1010532,{rough:.48}),s=i.clay(16774627,{rough:.46}),r=i.metal(15777350,.24,.8),o=i.emissive(3601096,.8,1.9,{transparent:!0,opacity:.85});t.add(x(k(1.06,.12,.86,.12,.024),n,{pos:[0,.06,0]}),x(k(.92,1.38,.72,.12,.03),s,{pos:[0,.8,0]}),x(k(.96,.24,.76,.1,.02),e,{pos:[0,.24,0]}),x(k(1.18,.14,1.04,.18,.032),e,{pos:[0,1.56,.1],rot:[-.08,0,0]}),x(k(.9,.05,.18,.03,.01),i.emissive(16773298,.7,1.6),{pos:[0,1.48,.48],cast:!1})),t.add(x(k(.68,.5,.06,.05,.014),n,{pos:[0,1.12,.35]}),x(new we(.6,.42),i.textured("kioskScreen",{rough:.25,emissive:!0,baseEmissive:.55,nightEmissive:1.45}),{pos:[0,1.12,.384],cast:!1}));let a=x(k(.92,.1,.36,.05,.016),s,{pos:[0,.72,.44]}),c=x(new q(.14,.15,.04,22),i.clay(2634564),{pos:[-.2,.79,.48],rot:[.22,0,0]}),l=x(new Gt(.12,.018,10,24),o,{pos:[-.2,.815,.485],rot:[Math.PI/2+.22,0,0],cast:!1}),h=x(k(.22,.14,.022,.025,.005),i.gloss(16753720),{pos:[-.2,.94,.52],rot:[.35,.15,-.12]});t.add(a,c,l,h);let d=i.textured("passbook",{rough:.48});for(let u=0;u<3;u++)t.add(x(k(.24,.042,.32,.02,.008),u===2?d:u===1?i.clay(16745570):e,{pos:[.24,.795+u*.044,.46],rot:[0,.14*(u-1),0]}));for(let u=0;u<4;u++)t.add(x(k(.56,.045,.04,.01,.006),n,{pos:[0,.52+u*.12,-.36]}));return t.add(x(new q(.028,.028,1.15,10),r,{pos:[.32,.74,-.38]})),be(t,.72,.62,.008,.34,i),{group:ue(t,3,"kiosk"),anim(u){let f=.85+.28*(u*.9%1);l.scale.setScalar(f),h.position.y=.94+Math.sin(u*2.8)*.045,h.rotation.z=-.12+Math.sin(u*2.8)*.08}}}function ig(i){let t=new ot,e=i.clay(16642264,{rough:.52}),n=i.clay(14185556,{rough:.5}),s=i.clay(2059868,{rough:.46}),r=i.emissive(16769162,.65,1.85),o=i.clay(14201438,{rough:.55}),a=i.clay(8959060,{rough:.54}),c=i.clay(2631988,{rough:.65});t.add(x(k(2.06,.14,1.66,.06,.02),i.clay(13354166),{pos:[0,.07,0]}),x(k(1.94,1.04,1.52,.06,.024),e,{pos:[0,.64,0]}),x(k(2.14,.14,1.72,.06,.024),n,{pos:[0,1.19,0]}));for(let m of[-.88,-.3,.3,.88])t.add(x(k(.14,1.02,.16,.03,.012),e,{pos:[m,.62,.78]}));t.add(x(k(.5,.72,.06,.02,.008),s,{pos:[0,.49,.76]}));for(let m=-2;m<=2;m++)t.add(x(new Ue(.025,.66,.08),i.clay(1264704),{pos:[m*.09,.49,.77]}));for(let m of[-.59,.59])t.add(x(k(.38,.48,.06,.04,.01),s,{pos:[m,.64,.76]}),x(k(.3,.4,.07,.03,.008),r,{pos:[m,.64,.77],cast:!1}));for(let m of[-.52,0,.52])t.add(x(k(.34,.44,.06,.04,.01),s,{pos:[m,.66,-.76]}),x(k(.26,.36,.07,.03,.008),r,{pos:[m,.66,-.77],cast:!1}));for(let m of[-1,1])for(let _ of[-.34,.34])t.add(x(k(.06,.44,.36,.03,.01),s,{pos:[m*.97,.66,_]}),x(k(.07,.36,.28,.02,.008),r,{pos:[m*.98,.66,_],cast:!1}));t.add(x(k(1.18,.32,.08,.03,.012),i.clay(1593162),{pos:[0,1.05,.85]}),x(new we(1.1,.26),i.textured("shopBanner",{rough:.42}),{pos:[0,1.05,.895],cast:!1}));let l=new ot,h=new q(.024,.026,1.48,8),d=new q(.022,.022,1.85,8),u=new q(.022,.022,1.25,8);for(let m=0;m<4;m++){let _=-.82+m*.55;l.add(x(h,m%2?a:o,{pos:[-1.14,.74,_]}))}for(let m of[.34,.78,1.22]){l.add(x(d,o,{pos:[-1.14,m,0],rot:[Math.PI/2,0,0]}));for(let _=0;_<4;_++)l.add(x(new it(.034,6,6),c,{pos:[-1.14,m,-.82+_*.55],cast:!1}))}l.add(x(new q(.02,.02,2.05,8),a,{pos:[-1.16,.76,0],rot:[.95,0,0]}),x(k(.24,.04,1.72,.015,.006),i.clay(12092492),{pos:[-1.06,.79,0]}));for(let m of[.64,1.12])l.add(x(h,o,{pos:[m,.74,.94]}));for(let m of[.42,.95])l.add(x(u,a,{pos:[.88,m,.94],rot:[0,0,Math.PI/2]}));let f=x(new Ue(.46,.48,.02),i.glass(2668664,.65),{pos:[.88,.68,.96],cast:!1});return l.add(f),t.add(l),{group:ue(t,4,"floor1"),anim(m){f.rotation.x=Math.sin(m*2.2)*.04}}}function sg(i){let t=new ot,e=i.textured("woodPlank",{rough:.58}),n=i.textured("riceSack",{rough:.72}),s=i.clay(13185322,{rough:.44}),r=i.clay(14464108,{rough:.54}),o=i.clay(11173180,{rough:.56}),a=i.gloss(2532256,{rough:.2});t.add(x(k(1.26,.1,.92,.05,.018),e,{pos:[0,.05,0]}));let c=Tn([[0,0],[.28,0],[.36,.16],[.35,.46],[.25,.68],[.13,.78],[.22,.9],[.16,.92],[0,.82]],26),l=x(c,n,{pos:[-.24,.1,.02],scale:[1.05,1,.88]}),h=x(new Gt(.145,.026,10,22),s,{pos:[-.24,.88,.02],rot:[Math.PI/2,0,0]}),d=x(new it(.055,10,8),s,{pos:[-.12,.88,.14],scale:[1.4,.75,.6]}),u=x(new it(.055,10,8),s,{pos:[-.36,.88,.14],scale:[1.4,.75,.6]});t.add(l,h,d,u);let f=new ot;f.position.set(.32,.1,-.08);for(let S=0;S<3;S++){let v=.09+S*.16;f.add(x(new q(.24,.24,.15,22),r,{pos:[0,v,0]}),x(new Gt(.242,.018,8,24),o,{pos:[0,v+.06,0],rot:[Math.PI/2,0,0]}))}for(let S=0;S<3;S++){let v=S*Math.PI*2/3+.4;f.add(x(new it(.068,12,10),i.clay(16774620,{rough:.36}),{pos:[Math.cos(v)*.1,.51,Math.sin(v)*.1],scale:[1.1,.78,.9]}))}let m=x(new q(.245,.25,.055,22),r,{pos:[.06,.56,-.05],rot:[.22,0,-.26]});m.add(x(new Gt(.05,.014,8,14),o,{pos:[0,.04,0],rot:[0,0,0]})),f.add(m);let _=i.glass(16777215,.48),g=[];for(let S=0;S<4;S++){let v=x(new it(.065+S%2*.02,10,8),_,{pos:[0,.65+S*.16,0],cast:!1});g.push({m:v,phase:S*.25}),f.add(v)}t.add(f);let p=new ot;return p.position.set(.28,.1,.3),p.add(x(new it(.14,18,14),a,{pos:[0,.12,0],scale:[1.08,.86,1.08]}),x(new q(.08,.095,.04,16),a,{pos:[0,.23,0]}),x(new it(.032,10,8),a,{pos:[0,.265,0]}),x(Ne([[.12,.1,0],[.22,.16,0],[.25,.22,0]],.024,12,8),a),x(Ne([[-.12,.16,0],[-.21,.14,0],[-.14,.07,0]],.02,12,8),a),x(new q(.042,.032,.055,12),a,{pos:[.26,.028,.12]}),x(new q(.042,.032,.055,12),a,{pos:[.14,.028,.19]})),t.add(p),be(t,.72,.56,.008,.34,i),{group:ue(t,5,"pantry"),anim(S){for(let v of g){let y=(S*.38+v.phase)%1;v.m.position.y=.6+y*.58,v.m.position.x=Math.sin(y*Math.PI*2+v.phase*6)*.07,v.m.scale.setScalar(.55+y*.95)}}}}function rg(i){let t=new ot,e=i.clay(16770539,{rough:.5}),n=i.textured("checkerTile",{rough:.42}),s=i.clay(1797474,{rough:.44}),r=i.emissive(16768128,.7,1.95),o=i.metal(2895936,.38,.76),a=i.emissive(16736168,1.1,2.6),c=i.emissive(3732444,1,2.5),l=i.emissive(16769638,.95,2.3),h=i.textured("neonSign",{rough:.25,emissive:!0,baseEmissive:.85,nightEmissive:2});t.add(x(k(1.88,1.04,1.46,.06,.024),e,{pos:[0,.54,0]}),x(k(1.92,.3,1.5,.04,.012),n,{pos:[0,.19,0]}),x(k(2.04,.13,1.62,.06,.022),s,{pos:[0,1.09,0]}));for(let f of[-.52,0,.52])for(let m of[-1,1])t.add(x(k(.36,.48,.06,.08,.01),s,{pos:[f,.64,m*.73]}),x(k(.28,.4,.07,.06,.008),r,{pos:[f,.64,m*.74],cast:!1}));for(let f of[-.32,.32])t.add(x(k(.06,.48,.36,.06,.01),s,{pos:[-.94,.64,f]}),x(k(.07,.4,.28,.05,.008),r,{pos:[-.95,.64,f],cast:!1}));t.add(x(k(.34,.24,.2,.03,.008),i.clay(14936042),{pos:[-.62,.36,-.82]}),x(new q(.085,.085,.03,14),i.clay(3817548),{pos:[-.66,.36,-.92],rot:[Math.PI/2,0,0]}));let d=new ot;d.position.set(.94,.68,.1),d.scale.setScalar(1.18),d.add(x(new q(.022,.022,.42,8),o,{pos:[.2,.28,0],rot:[0,0,Math.PI/2]}),x(new q(.022,.022,.42,8),o,{pos:[.2,-.24,0],rot:[0,0,Math.PI/2]}),x(new q(.018,.018,.56,8),o,{pos:[.16,.02,0],rot:[0,0,.72]}),x(k(1.06,.64,.14,.06,.018),i.clay(1580344,{rough:.36}),{pos:[.84,.04,0]}),x(new we(.94,.52),h,{pos:[.84,.04,.075],cast:!1}),x(new we(.94,.52),h,{pos:[.84,.04,-.075],rot:[0,Math.PI,0],cast:!1}));for(let f of[-.082,.082])d.add(x(Ne([[.34,-.25,f],[1.34,-.25,f],[1.34,.33,f],[.34,.33,f]],.018,28,8,!0),c,{cast:!1}));let u=new ot;return u.position.set(.84,.48,0),u.add(x(new Gt(.11,.018,8,20,Math.PI),a,{rot:[0,0,Math.PI],cast:!1}),x(new q(.018,.018,.24,8),a,{rot:[0,0,Math.PI/2],cast:!1}),x(new Gt(.045,.014,8,12),l,{pos:[.12,-.04,0],cast:!1})),d.add(u),t.add(d),{group:ue(t,6,"neon"),anim(f){let m=1+Math.sin(f*4.5)*.06;u.scale.setScalar(m)}}}function og(i){let t=new ot,e=i.clay(1473100,{rough:.42}),n=i.clay(1005110,{rough:.48}),s=i.clay(16775142,{rough:.44}),r=i.clay(12090436,{rough:.56}),o=i.metal(15778376,.2,.85),a=i.emissive(16770716,.55,1.75),c=i.glass(15400191,.62),l=new ot;l.position.set(-.1,.05,0);let h=x(k(1.78,.28,.66,.26,.04),e,{pos:[0,.14,0]}),d=x(k(1.84,.06,.72,.28,.015),s,{pos:[0,.27,0]}),u=x(k(1.42,.24,.56,.14,.02),s,{pos:[0,.41,0]}),f=x(k(1.22,.28,.54,.12,.02),s,{pos:[0,.65,0]}),m=x(k(1.32,.07,.6,.14,.018),n,{pos:[0,.81,0]});l.add(h,d,u,f,m);for(let R=-2;R<=2;R++)for(let T of[-1,1])l.add(x(new Gt(.05,.014,8,14),o,{pos:[R*.24,.41,T*.285]}),x(new q(.042,.042,.02,12),a,{pos:[R*.24,.41,T*.28],rot:[Math.PI/2,0,0],cast:!1}),x(k(.16,.14,.03,.02,.005),a,{pos:[R*.22,.65,T*.27],cast:!1}));for(let R of[-.74,.74])l.add(x(k(.14,.06,.36,.02,.006),r,{pos:[R,.33,0]}));let _=x(new q(.11,.13,.36,18),s,{pos:[0,1.01,0]}),g=x(new q(.115,.115,.08,18),n,{pos:[0,1.17,0]}),p=jm(.075,.032,.02);l.add(_,g,x(p,o,{pos:[0,1,.125]}),x(p,o,{pos:[0,1,-.125]}),x(new it(.036,10,8),i.emissive(16728642,.9,2.2),{pos:[.6,.86,.25],cast:!1}),x(new it(.036,10,8),i.emissive(3600522,.9,2.2),{pos:[.6,.86,-.25],cast:!1}));let S=x(Ne([[-.82,.06,.16],[-1.18,.04,.34],[-1.46,.03,.5]],.038,14,8),c,{cast:!1}),v=x(Ne([[-.82,.06,-.16],[-1.18,.04,-.34],[-1.46,.03,-.5]],.038,14,8),c,{cast:!1});l.add(S,v),t.add(l);let y=new ot;y.position.set(.84,.14,.44),y.add(x(new Gt(.24,.08,14,28),i.clay(15748670,{rough:.4}),{rot:[Math.PI/2,0,0]}),x(new Gt(.35,.022,8,28),o,{rot:[Math.PI/2,0,0]}));for(let R=0;R<4;R++){let T=R*Math.PI/2;y.add(x(new Gt(.084,.024,8,12),s,{pos:[Math.cos(T)*.24,0,Math.sin(T)*.24],rot:[0,-T,0]}),x(new q(.01,.01,.68,6),o,{pos:[0,-.02,0],rot:[Math.PI/2,T+Math.PI/4,0]}))}return t.add(y),{group:ue(t,7,"ferry"),anim(R){l.position.y=.05+Math.sin(R*2)*.04,l.rotation.z=Math.sin(R*1.5)*.04,l.rotation.x=Math.cos(R*1.8)*.03,y.position.y=.14+Math.sin(R*2.4+1.2)*.045,y.rotation.y=R*.6}}}function ag(i){let t=new ot,e=i.metal(4937838,.34,.72),n=i.metal(16105272,.22,.86),s=i.metal(13734940,.28,.82),r=i.emissive(2945682,1,2.4),o=i.textured("coinFace",{rough:.22,metal:.8});t.add(x(k(.94,.96,.86,.1,.03),e,{pos:[-.08,.54,-.04]}),x(k(.78,.8,.09,.07,.02),s,{pos:[-.08,.54,.39]}),x(k(.76,.78,.05,.05,.012),i.metal(3818840,.4,.7),{pos:[-.08,.54,-.47]}),x(new q(.042,.042,.16,12),n,{pos:[-.54,.76,.36]}),x(new q(.042,.042,.16,12),n,{pos:[-.54,.32,.36]}),x(new it(.042,12,10),r,{pos:[.18,.82,.445],cast:!1}));for(let[l,h]of[[-.4,-.34],[.24,-.34],[-.4,.26],[.24,.26]])t.add(x(new q(.07,.08,.08,12),s,{pos:[l,.04,h]}));let a=new ot;a.position.set(-.08,.54,.47),a.add(x(new Gt(.2,.032,12,26),n),x(new q(.065,.065,.06,16),n,{rot:[Math.PI/2,0,0]}));for(let l=0;l<4;l++)a.add(x(new q(.02,.02,.38,8),n,{rot:[0,0,l*Math.PI/4]}));t.add(a);let c=new ot;c.position.set(.56,0,.28),c.rotation.y=-.32,c.add(x(k(.46,.42,.2,.07,.026),n,{pos:[0,.21,0]}),x(new Gt(.15,.042,12,24,Math.PI),i.metal(16769400,.18,.88),{pos:[0,.41,0]}),x(new q(.042,.042,.12,12),i.metal(16769400,.18,.88),{pos:[-.15,.39,0]}),x(new q(.042,.042,.12,12),i.metal(16769400,.18,.88),{pos:[.15,.39,0]}),x(new q(.042,.042,.03,12),i.clay(2629656),{pos:[0,.25,.1],rot:[Math.PI/2,0,0],cast:!1}),x(new Ue(.034,.1,.03),i.clay(2629656),{pos:[0,.18,.1],cast:!1})),t.add(c);for(let[l,h,d]of[[.56,-.18,5],[.76,.02,3]])for(let u=0;u<d;u++)t.add(x(new q(.11,.11,.036,20),[n,o,o],{pos:[l,.02+u*.038,h]}));return be(t,.82,.68,.008,.35,i),{group:ue(t,8,"vault"),anim(l){a.rotation.z=Math.sin(l*.9)*.8}}}function cg(i){let t=new ot,e=i.clay(14480878,{rough:.5}),n=i.clay(16774885,{rough:.48}),s=i.metal(2055246,.36,.72),r=i.emissive(16770976,.62,1.85),o=i.clay(13938268,{rough:.54});t.add(x(k(1.82,.98,1.4,.06,.022),e,{pos:[0,.51,0]}),x(k(1.98,.13,1.56,.06,.022),n,{pos:[0,1.04,0]}));for(let h of[-.46,0,.46])for(let d of[-1,1])t.add(x(k(.32,.56,.05,.04,.01),n,{pos:[h,.56,d*.7]}),x(k(.24,.46,.06,.03,.008),r,{pos:[h,.56,d*.71],cast:!1}));t.add(x(k(2.04,.08,.42,.04,.012),n,{pos:[0,.06,.84]})),t.add(x(k(2.02,.045,.045,.01,.005),s,{pos:[0,.42,1.02]}));for(let h=-4;h<=4;h++)t.add(x(new q(.014,.014,.36,6),s,{pos:[h*.23,.24,1.02]})),h<4&&t.add(x(new Gt(.055,.011,6,12),s,{pos:[h*.23+.115,.26,1.02]}));for(let h of[-1,1])t.add(x(k(.045,.045,.38,.01,.005),s,{pos:[h,.42,.84]}),x(new q(.014,.014,.36,6),s,{pos:[h,.24,.84]}));t.add(x(new q(.14,.14,.03,16),i.gloss(16776696),{pos:[.58,.24,.86]}),x(new q(.025,.04,.18,10),s,{pos:[.58,.14,.86]}),x(new q(.065,.065,.05,12),o,{pos:[.58,.28,.86]}),x(new q(.075,.055,.12,12),i.clay(14052420),{pos:[-.68,.15,.86]}),x(new it(.1,10,8),i.clay(3909732),{pos:[-.68,.25,.86]}));let a=new ot;a.position.set(-.92,.66,0);let c=[];return[{z:.24,tilt:.18,items:[{x:-.32,col:16739211,w:.22,h:.3},{x:-.64,col:6079743,w:.2,h:.28}]},{z:-.24,tilt:.12,items:[{x:-.36,col:16765516,w:.24,h:.26},{x:-.68,col:16774885,w:.18,h:.34}]}].forEach((h,d)=>{let u=x(new q(.018,.022,.96,8),o,{pos:[-.44,.08,h.z],rot:[0,0,Math.PI/2-h.tilt]});a.add(u),h.items.forEach((f,m)=>{let _=new ot;_.position.set(f.x,.08+(-f.x-.04)*Math.tan(h.tilt)*.45,h.z);let g=x(k(f.w,f.h,.045,.03,.01),i.clay(f.col,{rough:.56}),{pos:[0,-f.h*.52,0]});f.w>=.2&&g.add(x(k(.07,.1,.04,.02,.008),i.clay(f.col,{rough:.56}),{pos:[-f.w*.55,.06,0],rot:[0,0,.4]}),x(k(.07,.1,.04,.02,.008),i.clay(f.col,{rough:.56}),{pos:[f.w*.55,.06,0],rot:[0,0,-.4]}));let p=x(new Ue(.024,.055,.03),i.clay(10118196),{pos:[0,.01,0]});_.add(g,p),a.add(_),c.push({pivot:_,phase:d*1.7+m*.9})})}),t.add(a),{group:ue(t,9,"laundry"),anim(h){for(let d of c)d.pivot.rotation.x=Math.sin(h*2.2+d.phase)*.18}}}function lg(i){let t=new ot,e=i.textured("stoneWall",{rough:.65}),n=i.clay(14828344,{rough:.44}),s=i.clay(16774886,{rough:.46}),r=i.metal(2633020,.36,.78),o=i.metal(15777348,.22,.85),a=i.emissive(16771194,1.35,3),c=i.emissive(16770168,.75,1.85,{transparent:!0,opacity:.28,depthWrite:!1,side:Te});t.add(x(new q(.62,.7,.24,8),e,{pos:[0,.12,0]}),x(new q(.5,.56,.16,8),i.clay(14275269),{pos:[0,.32,0]}),x(k(.24,.32,.08,.08,.014),i.clay(8145446),{pos:[0,.56,.41]}),x(new it(.022,8,8),o,{pos:[.06,.54,.46]}));let l=[{y:.54,h:.32,rB:.44,rT:.4,mat:s},{y:.86,h:.32,rB:.4,rT:.36,mat:n},{y:1.18,h:.32,rB:.36,rT:.325,mat:s},{y:1.5,h:.32,rB:.325,rT:.29,mat:n},{y:1.76,h:.2,rB:.29,rT:.275,mat:s}];for(let m of l)t.add(x(new q(m.rT,m.rB,m.h,24),m.mat,{pos:[0,m.y,0]}));t.add(x(k(.46,.28,.06,.04,.01),o,{pos:[0,1.16,.34]}),x(new we(.4,.23),i.textured("badge18222",{rough:.34}),{pos:[0,1.16,.375],cast:!1}));for(let m of[Math.PI*.5,Math.PI,Math.PI*1.5])t.add(x(new Gt(.055,.016,8,14),o,{pos:[Math.sin(m)*.34,1.18,Math.cos(m)*.34],rot:[0,m,0]}));t.add(x(new q(.44,.3,.1,24),r,{pos:[0,1.9,0]}),x(new Gt(.41,.018,8,28),r,{pos:[0,2.08,0],rot:[Math.PI/2,0,0]}));for(let m=0;m<12;m++){let _=m*Math.PI*2/12;t.add(x(new q(.012,.012,.16,6),r,{pos:[Math.cos(_)*.41,2,Math.sin(_)*.41]}))}t.add(x(new q(.24,.24,.36,20),i.glass(15399167,.38),{pos:[0,2.13,0],cast:!1}),x(new it(.14,16,14),a,{pos:[0,2.14,0],cast:!1}),x(new it(.27,20,14,0,Math.PI*2,0,Math.PI*.55),n,{pos:[0,2.31,0]}),x(new q(.014,.025,.24,8),o,{pos:[0,2.66,0]}),x(new it(.045,10,8),o,{pos:[0,2.57,0]}));let h=new ot;h.position.set(0,2.14,0);let d=new We(.46,2.1,18,1,!0),u=x(d,c,{pos:[0,0,1.15],rot:[-Math.PI/2,0,0],cast:!1,recv:!1}),f=x(d,c,{pos:[0,0,-1.15],rot:[Math.PI/2,0,0],cast:!1,recv:!1});return u.userData.ignoreBounds=!0,f.userData.ignoreBounds=!0,h.add(u,f),t.add(h),be(t,.74,.74,.008,.36,i),{group:ue(t,10,"lighthouse"),anim(m){h.rotation.y=m*1.15}}}function hg(i){let t=new ot,e=Ei(i,"jack",null,{noShadow:!0});e.group.position.set(-.28,.06,0),t.add(e.group),t.add(x(k(1.26,.06,.86,.1,.015),i.textured("woodPlank",{rough:.58}),{pos:[0,.03,0]}));let n=i.clay(1349259,{rough:.44}),s=i.metal(15777348,.22,.84),r=i.textured("coinFace",{rough:.22,metal:.8}),o=new ot;o.position.set(.32,.06,.04),o.rotation.y=-.24,o.add(x(k(.56,.32,.4,.04,.016),n,{pos:[0,.16,0]}),x(k(.58,.055,.42,.02,.008),s,{pos:[0,.06,0]}),x(k(.58,.055,.42,.02,.008),s,{pos:[0,.28,0]}),x(k(.11,.13,.04,.03,.008),i.emissive(4978120,.65,1.5),{pos:[0,.24,.21]}));let a=new ot;a.position.set(0,.32,-.18),a.rotation.x=-.58,a.add(x(new q(.2,.2,.56,16,1,!1,0,Math.PI),n,{pos:[0,0,.18],rot:[0,0,Math.PI/2]}),x(new Gt(.205,.02,8,16,Math.PI),s,{pos:[-.22,0,.18],rot:[0,Math.PI/2,0]}),x(new Gt(.205,.02,8,16,Math.PI),s,{pos:[.22,0,.18],rot:[0,Math.PI/2,0]})),o.add(a);for(let c=0;c<6;c++)o.add(x(new q(.085,.085,.032,16),[s,r,r],{pos:[-.14+c%3*.14,.31+Math.floor(c/3)*.034,-.04+c%2*.09],rot:[.18*(c%2?1:-1),c,.14]}));return t.add(o),be(t,.72,.52,.008,.34,i),{group:ue(t,11,"jack"),anim(c,l,h){e.anim(c,l,h)}}}function ug(i){let t=new ot,e=i.clay(15920380,{rough:.5}),n=i.clay(14183244,{rough:.48}),s=i.clay(10775612,{rough:.54}),r=i.emissive(16768900,.7,1.9),o=i.clay(3119692,{rough:.52}),a=i.gloss(16745496,{rough:.22}),c=i.textured("laisee",{rough:.42});t.add(x(k(1.76,.98,1.36,.06,.022),e,{pos:[0,.5,0]}),x(k(1.92,.13,1.52,.06,.022),n,{pos:[0,1.04,0]}),x(k(.68,.14,.44,.03,.01),i.clay(3818070),{pos:[-.26,1.12,.22],rot:[.22,0,0]}),x(k(.58,.04,.36,.02,.006),r,{pos:[-.26,1.18,.23],rot:[.22,0,0],cast:!1}));for(let f of[-1,1])for(let m of[-.42,.24])t.add(x(k(.42,.48,.05,.05,.01),s,{pos:[m,.56,f*.68]}),x(k(.34,.4,.06,.04,.008),r,{pos:[m,.56,f*.69],cast:!1}));let l=new ot;l.position.set(1.06,.32,.12),l.rotation.set(-.22,.42,0),l.add(x(k(.36,.06,.34,.03,.01),s,{pos:[-.08,-.22,0]}),x(k(.36,.46,.1,.04,.014),i.clay(15459026),{pos:[0,.04,0]}),x(new we(.3,.4),i.textured("calcScreen",{rough:.35}),{pos:[0,.04,.055],cast:!1})),t.add(l);let h=new ot;h.position.set(.68,.04,.84),t.add(x(k(.62,.08,.46,.04,.012),i.clay(16774370),{pos:[.68,.04,.82]}));let d=Tn([[0,0],[.16,0],[.22,.26],[.25,.31],[.22,.33],[.18,.28],[0,.26]],20);h.add(x(d,i.clay(13589816,{rough:.54})),x(new q(.18,.18,.04,16),i.clay(5914152),{pos:[0,.26,0]}),x(Ne([[0,.26,0],[.04,.44,.02],[-.02,.62,-.02]],.042,12,8),i.clay(7227435)),x(new it(.24,16,14),o,{pos:[0,.72,0]}),x(new it(.19,14,12),i.clay(4371550),{pos:[.14,.66,.09]}),x(new it(.18,14,12),o,{pos:[-.14,.65,-.06]}),x(new it(.16,14,12),i.clay(4833124),{pos:[0,.86,.04]})),[[.16,.76,.18],[-.18,.73,.14],[.02,.92,.14],[.24,.64,-.02],[-.14,.82,-.14],[.1,.62,.22],[-.04,.7,-.22],[.18,.8,-.14]].forEach(([f,m,_])=>{h.add(x(new it(.056,12,10),a,{pos:[f,m,_],scale:[1.08,.92,1.08]}))});for(let[f,m,_,g]of[[.24,.56,.16,.4],[-.22,.56,.12,-.5]])h.add(x(new Ue(.08,.11,.015),c,{pos:[f,m,_],rot:[0,g,.12]}));return t.add(h),{group:ue(t,12,"loft"),anim(f){h.rotation.z=Math.sin(f*1.8)*.025}}}function Sc(i,t={}){let e=new ot,n=!!t.golden,s=n?i.clay(10100772,{rough:.36}):i.textured("woodPlank",{rough:.58}),r=n?i.metal(16763709,.2,.88):i.clay(8144932,{rough:.56}),o=n?i.metal(16763450,.24,.82):i.clay(13577774,{rough:.54,side:Te}),a=n?i.metal(10118162,.3,.78):i.clay(6043162,{rough:.6}),c=i.emissive(16760386,.95,2.3),l=new ot;l.position.y=.08;let h=x(k(1.72,.32,.66,.24,.05),s,{pos:[0,.18,0]}),d=x(k(.62,.22,.62,.12,.03),r,{pos:[-.52,.4,0],rot:[0,0,-.14]}),u=x(new We(.24,.42,12),r,{pos:[.92,.28,0],rot:[0,0,-Math.PI/2.4]}),f=x(k(.46,.24,.44,.04,.015),i.clay(9195050),{pos:[-.46,.58,0]}),m=x(new it(.068,12,10),c,{pos:[-.74,.62,0],scale:[.9,1.25,.9],cast:!1});l.add(h,d,u,f,m);for(let v of[-1,1])l.add(x(new it(.045,10,8),i.gloss(16777215),{pos:[.74,.24,v*.24],scale:[1,1,.4]}),x(new it(.024,8,8),i.gloss(1776936),{pos:[.75,.24,v*.26],scale:[1,1,.4]}));if(n){let v=x(Ne([[.82,.3,0],[1.06,.52,0],[1.14,.68,0]],.06,14,8),r),y=x(new it(.1,14,10),r,{pos:[1.18,.72,0],scale:[1.35,.9,.9]});l.add(v,y);for(let R=0;R<4;R++)l.add(x(new it(.075,10,8),r,{pos:[.05+R*.14,.41,R%2?.12:-.12],scale:[1.3,.65,.85]}))}function _(v,y,R,T){let C=new ot;C.position.set(v,.34,0),C.rotation.z=T,C.add(x(new q(.026,.038,y+.18,10),a,{pos:[0,(y+.18)*.5,0]}));let I=5;for(let b=0;b<I;b++){let M=b/(I-1),P=.26+M*(y-.34),F=R*(1-M*.28),B=Math.sin(M*Math.PI)*.09;C.add(x(k(F,(y-.3)/I+.02,.026,.015,.005),o,{pos:[.04,P,B]}),x(new q(.012,.012,F+.06,6),a,{pos:[.04,P,B+.02],rot:[0,0,Math.PI/2]}))}return l.add(C),C}let g=_(.08,1.48,.86,.06),p=_(.6,1.06,.58,-.14);e.add(l);let S=i.glass(7202034,.58);for(let[v,y,R]of[[-.65,.38,1],[.55,-.36,.9],[.05,.44,.85]])e.add(x(new Gt(.18*R,.045*R,8,16,Math.PI),S,{pos:[v,.02,y],rot:[0,.4,0],cast:!1}));return{group:ue(e,n?60:13,n?"treasure":"junk"),anim(v){l.position.y=.08+Math.sin(v*1.9)*.045,l.rotation.z=Math.sin(v*1.45)*.055,l.rotation.x=Math.cos(v*1.6)*.035,g.rotation.y=Math.sin(v*1.6)*.05,p.rotation.y=Math.sin(v*1.6+.6)*.06}}}function dg(i){let t=new ot,e=i.clay(16774366,{rough:.48}),n=i.clay(15762792,{rough:.48}),s=i.clay(10380086,{rough:.56}),r=i.clay(3450458,{rough:.52}),o=i.metal(16763708,.18,.86),a=i.emissive(16770938,1,2.5);t.add(x(k(1.94,.14,1.54,.08,.022),e,{pos:[0,.07,0]}),x(k(1.96,.18,.09,.03,.01),n,{pos:[0,.21,-.72]}),x(k(.09,.18,1.48,.03,.01),n,{pos:[-.92,.21,0]}),x(k(.09,.18,1.48,.03,.01),n,{pos:[.92,.21,0]}));for(let[u,f]of[[-.8,-.6],[.8,-.6],[-.8,.56],[.8,.56]])t.add(x(k(.11,1.24,.11,.02,.008),s,{pos:[u,.72,f]}));for(let u of[-.6,.56])t.add(x(k(1.88,.09,.11,.02,.008),s,{pos:[0,1.36,u]}));for(let u=-3;u<=3;u++)t.add(x(k(.08,.07,1.38,.015,.006),s,{pos:[u*.25,1.42,-.02]}));for(let[u,f,m]of[[-.82,1.38,.56],[.82,1.38,.56],[-.74,1.22,-.58],[.76,1.26,-.58],[0,1.46,-.58]])t.add(x(new it(.14,10,8),r,{pos:[u,f,m]}),x(new it(.1,10,8),i.clay(5227630),{pos:[u+.09,f-.08,m+.06]}));t.add(x(new Gt(.56,.042,12,28,Math.PI),o,{pos:[0,1.38,.56]}));let c=[];for(let u=0;u<7;u++){let f=u/6,m=-.72+f*1.44,_=Math.sin(f*Math.PI)*.14,g=x(new it(.044,10,8),a,{pos:[m,1.3-_,.58],cast:!1});c.push(g),t.add(g)}let l=Ei(i,"jackie",null,{noShadow:!0});l.group.position.set(-.22,.14,.14),l.group.scale.setScalar(.86),t.add(l.group);let h=Gs(i,"halo"),d=new ot;return d.position.set(.38,.86,.14),d.scale.setScalar(1.15),d.add(h.group),t.add(x(new q(.2,.24,.36,18),i.clay(16773842),{pos:[.38,.32,.14]}),x(new Gt(.21,.022,8,20),o,{pos:[.38,.5,.14],rot:[Math.PI/2,0,0]}),d),{group:ue(t,14,"sprint14"),anim(u,f,m){l.anim(u,f,m),h.anim&&h.anim(u,f,m),c.forEach((_,g)=>{_.scale.setScalar(.85+.28*Math.sin(u*3.8+g*1.1))})}}}function Xe(i,t){switch(i){case 1:return tg(t);case 2:return eg(t);case 3:return ng(t);case 4:return ig(t);case 5:return sg(t);case 6:return rg(t);case 7:return og(t);case 8:return ag(t);case 9:return cg(t);case 10:return lg(t);case 11:return hg(t);case 12:return ug(t);case 13:return Sc(t);case 14:return dg(t);default:return null}}function fg(i,t={}){let e=new ot,n=i.clay(14829372,{rough:.42}),s=i.clay(16774886,{rough:.46}),r=i.metal(15777348,.22,.85),o=i.emissive(4585396,1,2.5),a=new ot;a.position.y=.08,a.add(x(new q(.36,.42,.24,22),n,{pos:[0,.14,0]}),x(new Gt(.4,.045,10,24),s,{pos:[0,.24,0],rot:[Math.PI/2,0,0]}),x(new q(.022,.026,.72,8),r,{pos:[.16,.56,.16],rot:[-.22,0,.22]}),x(new q(.022,.026,.72,8),r,{pos:[-.16,.56,.16],rot:[-.22,0,-.22]}),x(new q(.022,.026,.72,8),r,{pos:[.16,.56,-.16],rot:[.22,0,.22]}),x(new q(.022,.026,.72,8),r,{pos:[-.16,.56,-.16],rot:[.22,0,-.22]}),x(new q(.14,.16,.06,16),n,{pos:[0,.9,0]}),x(new it(.08,12,10),o,{pos:[0,1,0],cast:!1}));let c=x(Tn([[0,0],[.13,0],[.11,.08],[.08,.19],[.03,.24],[0,.24]],18),r,{pos:[0,.56,0]});a.add(c),e.add(a);let l=i.clay(16645110,{rough:.44}),h=i.clay(5924986,{rough:.48}),d=i.clay(16754222,{rough:.4}),u=t.island?2.6:.74,f=t.island?3.2:1.38,m=[];for(let _=0;_<3;_++){let g=new ot;g.add(x(new it(.085,14,10),l,{scale:[.82,.76,1.55]}),x(new it(.058,12,10),l,{pos:[0,.035,.12]}),x(new We(.024,.085,8),d,{pos:[0,.025,.195],rot:[Math.PI/2,0,0]}),x(k(.09,.018,.09,.01,.004),h,{pos:[0,.01,-.14]}));let p=new ot;p.position.set(-.06,.02,.02),p.add(x(k(.22,.024,.09,.014,.005),l,{pos:[-.11,0,0]}),x(k(.14,.02,.075,.01,.004),h,{pos:[-.26,-.015,-.01],rot:[0,.15,-.18]}));let S=new ot;S.position.set(.06,.02,.02),S.add(x(k(.22,.024,.09,.014,.005),l,{pos:[.11,0,0]}),x(k(.14,.02,.075,.01,.004),h,{pos:[.26,-.015,-.01],rot:[0,-.15,.18]})),g.add(p,S),t.island&&(g.userData.ignoreBounds=!0),e.add(g),m.push({bird:g,wingL:p,wingR:S,phase:_*Math.PI*2/3,yOff:(_-1)*.18})}return{group:ue(e,18,"gulls"),anim(_){a.position.y=.08+Math.sin(_*2.2)*.05,a.rotation.z=Math.sin(_*1.7)*.1,c.rotation.z=-Math.sin(_*1.7)*.24;for(let g of m){let p=_*.65+g.phase;g.bird.position.set(Math.cos(p)*u,f+g.yOff+Math.sin(_*2.4+g.phase)*.1,Math.sin(p)*u),g.bird.rotation.y=-p,g.bird.rotation.z=.18;let S=Math.sin(_*6.5+g.phase*2)*.42;g.wingL.rotation.z=S,g.wingR.rotation.z=-S}}}}function pg(i){let t=new ot,e=i.clay(2635110,{rough:.4}),n=i.metal(2663594,.28,.72),s=i.metal(16107596,.22,.84),r=i.emissive(4978920,.85,2.3),o=i.emissive(16769128,.85,2.3),a=i.emissive(5044202,.55,1.5,{transparent:!0,opacity:.2,depthWrite:!1,side:Te}),c=i.emissive(16769390,.55,1.5,{transparent:!0,opacity:.2,depthWrite:!1,side:Te});t.add(x(k(1.06,.22,.9,.06,.02),i.clay(3819640),{pos:[0,.11,0]}),x(k(.84,1.15,.72,.05,.02),e,{pos:[0,.78,0]}),x(k(.62,.85,.54,.05,.018),e,{pos:[0,1.72,0]}),x(k(.4,.48,.36,.04,.014),n,{pos:[0,2.34,0]}),x(new We(.24,.46,4),s,{pos:[0,2.8,0],rot:[0,Math.PI/4,0]}),x(new q(.016,.032,.55,10),s,{pos:[0,3.24,0]}),x(new it(.065,12,10),o,{pos:[0,3.52,0],cast:!1}));for(let d=0;d<4;d++){let u=.42+d*.24;t.add(x(k(.87,.055,.75,.02,.005),d%2?o:r,{pos:[0,u,0],cast:!1}))}for(let d=0;d<3;d++){let u=1.48+d*.24;t.add(x(k(.65,.05,.57,.02,.005),d%2?r:o,{pos:[0,u,0],cast:!1}))}let l=x(new We(.55,2.4,16,1,!0),a,{pos:[-.24,3.2,0],rot:[0,0,Math.PI+.24],cast:!1,recv:!1}),h=x(new We(.55,2.4,16,1,!0),c,{pos:[.24,3.2,0],rot:[0,0,Math.PI-.24],cast:!1,recv:!1});return l.userData.ignoreBounds=!0,h.userData.ignoreBounds=!0,t.add(l,h),be(t,.68,.6,.008,.36,i),{group:ue(t,21,"twilight"),anim(d){l.rotation.z=Math.PI+.26+Math.sin(d*.9)*.16,h.rotation.z=Math.PI-.26+Math.cos(d*.85)*.16}}}function mg(i){let t=new ot,e=i.textured("woodPlank",{rough:.56}),n=i.clay(9328946,{rough:.52}),s=i.metal(15777348,.24,.82),r=i.textured("stripeCoral",{rough:.5,side:Te}),o=i.gloss(16776694,{rough:.22}),a=i.metal(3817551,.4,.72);t.add(x(new q(.82,.86,.1,24),e,{pos:[0,.05,0]})),t.add(x(new q(.16,.22,.06,16),a,{pos:[0,.12,0]}),x(new q(.04,.04,.54,12),a,{pos:[0,.4,0]}),x(new q(.46,.46,.05,24),o,{pos:[0,.68,0]}),x(new Gt(.46,.02,8,28),s,{pos:[0,.68,0],rot:[Math.PI/2,0,0]}),x(new q(.03,.034,1.54,12),n,{pos:[0,.96,0]}),x(new We(.92,.36,8),r,{pos:[0,1.66,0]}),x(new it(.065,12,10),s,{pos:[0,1.86,0]})),[1807996,15886411,16762941].forEach((u,f)=>{let m=f*Math.PI*2/3+.4,_=Math.cos(m)*.56,g=Math.sin(m)*.56,p=new ot;p.position.set(_,.1,g),p.add(x(new q(.145,.135,.05,16),i.gloss(u,{rough:.32}),{pos:[0,.34,0]}),x(new q(.018,.02,.34,8),a,{pos:[-.07,.17,-.07],rot:[.1,0,-.1]}),x(new q(.018,.02,.34,8),a,{pos:[.07,.17,-.07],rot:[.1,0,.1]}),x(new q(.018,.02,.34,8),a,{pos:[-.07,.17,.07],rot:[-.1,0,-.1]}),x(new q(.018,.02,.34,8),a,{pos:[.07,.17,.07],rot:[-.1,0,.1]})),t.add(p)});let l=i.glass(16771276,.45),h=i.gloss(13200414,{rough:.18}),d=i.clay(16769346,{rough:.38});for(let[u,f,m]of[[.2,.14,1],[-.18,.2,.94]]){let _=new ot;_.position.set(u,.71,f),_.scale.setScalar(m),_.add(x(new q(.068,.052,.19,14),l,{pos:[0,.095,0],cast:!1}),x(new q(.058,.044,.145,14),h,{pos:[0,.08,0]}),x(new q(.048,.048,.014,12),d,{pos:[.01,.135,.01],rot:[.4,.2,.3]}),x(new q(.009,.009,.25,6),i.clay(16732754),{pos:[.02,.14,-.01],rot:[.1,0,-.22]})),t.add(_)}return be(t,.88,.88,.008,.34,i),{group:ue(t,25,"umbrella"),anim(u){t.children[5].rotation.y=Math.sin(u*.9)*.04}}}function gg(i,t={}){let e=new ot,n=i.clay(1469758,{rough:.38}),s=i.clay(16774622,{rough:.44}),r=i.clay(2962752,{rough:.52}),o=i.metal(15777348,.22,.84),a=i.metal(4607580,.36,.78),c=i.emissive(16770452,.65,1.9),l=i.emissive(16774590,1,2.6),h=i.textured("tramSign",{rough:.4});for(let u of[-.26,.26])e.add(x(new Ue(1.96,.035,.04),a,{pos:[0,.04,u]}));for(let u=-4;u<=4;u++)e.add(x(new Ue(.08,.03,.72),i.clay(8213814),{pos:[u*.22,.018,0]}));let d=new ot;d.position.y=.06;for(let[u,f]of[[-.46,-.26],[-.46,.26],[.46,-.26],[.46,.26]])d.add(x(new q(.11,.11,.05,16),a,{pos:[u,.11,f],rot:[Math.PI/2,0,0]}));d.add(x(k(1.56,.54,.66,.08,.025),n,{pos:[0,.45,0]}),x(k(1.6,.24,.69,.06,.016),s,{pos:[0,.82,0]}),x(k(1.56,.48,.66,.08,.024),n,{pos:[0,1.16,0]}),x(k(1.64,.11,.72,.1,.028),r,{pos:[0,1.44,0]}),x(new we(1.22,.2),h,{pos:[0,.82,.35],cast:!1}),x(new we(1.22,.2),h,{pos:[0,.82,-.35],rot:[0,Math.PI,0],cast:!1}));for(let u=-2;u<=2;u++)for(let f of[-1,1])d.add(x(k(.22,.24,.03,.025,.005),c,{pos:[u*.27,.52,f*.33],cast:!1}),x(k(.22,.24,.03,.025,.005),c,{pos:[u*.27,1.18,f*.33],cast:!1}));for(let u of[-1,1])d.add(x(k(.03,.24,.44,.03,.006),c,{pos:[u*.78,.54,0],cast:!1}),x(k(.03,.24,.44,.03,.006),c,{pos:[u*.78,1.18,0],cast:!1}),x(new q(.06,.065,.06,14),o,{pos:[u*.8,.32,0],rot:[0,0,Math.PI/2]}),x(new it(.048,10,8),l,{pos:[u*.82,.32,0],cast:!1}),x(k(.12,.07,.56,.03,.01),a,{pos:[u*.81,.19,0]}));if(d.add(x(new q(.04,.055,.12,12),o,{pos:[0,1.54,0]}),x(new q(.014,.018,.62,8),a,{pos:[-.18,1.76,0],rot:[0,0,.68]}),x(new q(.025,.025,.16,8),o,{pos:[-.39,1.98,0],rot:[Math.PI/2,0,0]})),e.add(d),!t.island){let u=Gs(i,"straw");u.group.position.set(.42,1.54,0),u.group.scale.setScalar(.86),u.group.rotation.z=-.14,d.add(u.group)}return be(e,1.05,.5,.008,.34,i),{group:ue(e,30,"tram"),anim(u){d.position.x=Math.sin(u*1.1)*.12,d.position.y=.06+Math.abs(Math.sin(u*4.4))*.008}}}function xg(i){let t=new ot,e=i.clay(8142374,{rough:.52}),n=i.metal(15777348,.22,.84),s=i.emissive(16731192,.8,2.25),r=i.clay(16764746,{rough:.45});for(let l of[-.95,.95])t.add(x(new q(.1,.13,.14,14),i.clay(14209220),{pos:[l,.07,0]}),x(new q(.052,.06,1.62,14),e,{pos:[l,.92,0]}),x(new it(.08,12,10),n,{pos:[l,1.76,0]}),x(k(.24,.06,.12,.02,.008),e,{pos:[l,1.64,0]}));let o=[];for(let l=0;l<=16;l++){let h=l/16,d=-.95+h*1.9,u=1.64-Math.sin(h*Math.PI)*.28;o.push([d,u,0])}t.add(x(Ne(o,.018,22,8),n));let a=[],c=Tn([[0,-.15],[.06,-.15],[.13,-.09],[.155,0],[.13,.09],[.06,.15],[0,.15]],18);for(let l=0;l<5;l++){let h=(l+1)/6,d=-.95+h*1.9,u=1.64-Math.sin(h*Math.PI)*.28,f=new ot;f.position.set(d,u,0),f.add(x(new q(.008,.008,.16,6),n,{pos:[0,-.08,0]}),x(new q(.072,.072,.036,14),n,{pos:[0,-.17,0]}),x(c,s,{pos:[0,-.32,0],cast:!1}),x(new q(.072,.072,.036,14),n,{pos:[0,-.47,0]}),x(new q(.022,.034,.16,8),r,{pos:[0,-.57,0]})),t.add(f),a.push({pivot:f,phase:l*.9})}return be(t,1.05,.34,.008,.3,i),{group:ue(t,35,"lanterns"),anim(l){for(let h of a)h.pivot.rotation.z=Math.sin(l*2.1+h.phase)*.14,h.pivot.rotation.x=Math.cos(l*1.6+h.phase)*.08}}}function _g(i){let t=new ot,e=i.textured("stoneWall",{rough:.64}),n=i.textured("brick",{rough:.58}),s=i.clay(15919318,{rough:.52}),r=i.clay(4958354,{rough:.38,metalness:.28}),o=i.metal(15777348,.22,.85),a=i.textured("clockFace",{rough:.34,emissive:!0,baseEmissive:.25,nightEmissive:1.05});t.add(x(k(1.06,.24,1.06,.05,.02),e,{pos:[0,.12,0]}),x(k(.92,.44,.92,.04,.018),e,{pos:[0,.44,0]}),x(k(.32,.38,.08,.1,.014),i.clay(6043168),{pos:[0,.42,.46]}),x(k(.98,.1,.98,.04,.015),s,{pos:[0,.68,0]})),t.add(x(k(.76,1.44,.76,.03,.014),n,{pos:[0,1.44,0]}));for(let[l,h]of[[-.36,-.36],[.36,-.36],[-.36,.36],[.36,.36]])t.add(x(k(.11,1.44,.11,.02,.008),s,{pos:[l,1.44,h]}));let c=i.emissive(16769428,.45,1.6);for(let l=0;l<4;l++){let h=l*Math.PI/2,d=new ot;d.rotation.y=h,d.add(x(k(.18,.32,.04,.07,.008),c,{pos:[0,1.42,.385],cast:!1})),t.add(d)}t.add(x(k(.9,.1,.9,.04,.014),s,{pos:[0,2.2,0]}),x(k(.82,.66,.82,.04,.016),s,{pos:[0,2.58,0]}),x(k(.92,.1,.92,.04,.016),s,{pos:[0,2.94,0]}));for(let l=0;l<4;l++){let h=l*Math.PI/2,d=new ot;d.rotation.y=h,d.add(x(new Gt(.25,.028,10,24),o,{pos:[0,2.58,.415]}),x(new q(.24,.24,.02,24),[o,a,a],{pos:[0,2.58,.412],rot:[Math.PI/2,0,0],cast:!1})),t.add(d)}for(let l=0;l<8;l++){let h=l*Math.PI*2/8;t.add(x(new q(.032,.036,.36,10),s,{pos:[Math.cos(h)*.28,3.16,Math.sin(h)*.28]}))}return t.add(x(new q(.32,.34,.08,16),s,{pos:[0,3.36,0]}),x(new it(.31,20,14,0,Math.PI*2,0,Math.PI*.55),r,{pos:[0,3.4,0]}),x(new q(.018,.042,.46,10),o,{pos:[0,3.86,0]}),x(new it(.055,10,8),o,{pos:[0,3.74,0]})),be(t,.72,.72,.008,.36,i),{group:ue(t,45,"clock"),anim:null}}function yg(i){return Sc(i,{golden:!0})}function vg(i){let t=new ot,e=i.clay(3909732,{rough:.56}),n=i.clay(2655308,{rough:.56}),s=i.clay(12103328,{rough:.62}),r=i.clay(14238264,{rough:.46}),o=i.clay(14248760,{rough:.48}),a=i.metal(15777348,.24,.84);t.add(x(new it(1.12,20,14,0,Math.PI*2,0,Math.PI*.55),e,{pos:[0,0,0],scale:[1.35,.85,.92]}),x(new it(.68,18,14),s,{pos:[-.36,.72,.04],scale:[1.05,1.15,.85]}),x(new it(.74,18,14),e,{pos:[.34,.56,-.04],scale:[1.28,.85,.88]}),x(new it(.48,14,12),s,{pos:[-.74,.48,.12],scale:[1.1,.78,.8]}));for(let h=0;h<6;h++)t.add(x(k(.22,.05,.14,.02,.006),i.clay(15064528),{pos:[.82-h*.14,.14+h*.16,.54-h*.06],rot:[0,-.35,0]}));[[-.95,.34,.42],[.95,.36,.28],[.58,.76,-.45],[-.12,.68,.56],[.22,.86,.38]].forEach(([h,d,u],f)=>{t.add(x(new q(.025,.035,.18,6),i.clay(8146474),{pos:[h,d,u]}),x(new We(.14,.28,8),f%2?n:e,{pos:[h,d+.18,u]}))});let l=new ot;l.position.set(-.34,1.38,.04),l.add(x(new q(.38,.42,.1,6),i.clay(15064528),{pos:[0,.05,0]}),x(new We(.5,.24,6),o,{pos:[0,.52,0]}),x(new We(.32,.22,6),o,{pos:[0,.72,0]}),x(new it(.055,10,8),a,{pos:[0,.86,0]}),x(new it(.075,10,8),i.emissive(16765528,.7,1.8),{pos:[0,.34,0],cast:!1}));for(let h=0;h<6;h++){let d=h*Math.PI*2/6;l.add(x(new q(.024,.026,.36,8),r,{pos:[Math.cos(d)*.28,.26,Math.sin(d)*.28]}))}return t.add(l),be(t,1.38,.96,.008,.36,i),{group:ue(t,75,"lionrock"),anim:null}}function Mg(i){let t=new ot,e=i.clay(3578460,{rough:.56}),n=i.clay(16775146,{rough:.42}),s=i.clay(1478021,{rough:.44}),r=i.emissive(8122111,.55,1.75),o=i.clay(14234156,{rough:.38}),a=i.metal(15777348,.22,.84);t.add(x(new q(.84,1.18,.68,24),e,{pos:[0,.34,0]}),x(new it(.24,12,10),i.clay(5027950),{pos:[-.74,.52,.48]}),x(new it(.22,12,10),i.clay(2982988),{pos:[.78,.46,-.44]})),t.add(x(k(1.02,.42,.66,.06,.02),n,{pos:[0,.86,0]}),x(k(.88,.28,.69,.04,.01),r,{pos:[0,.88,0],cast:!1}),x(k(1.42,.16,.72,.08,.025),n,{pos:[0,1.14,0]}),x(k(1.74,.16,.76,.12,.028),s,{pos:[0,1.3,0]}),x(k(1.94,.12,.82,.14,.026),n,{pos:[0,1.44,0]}),x(k(1.66,.1,.79,.04,.01),r,{pos:[0,1.3,0],cast:!1}));for(let h of[-.52,.52])t.add(x(new q(.018,.026,.18,8),a,{pos:[h,1.58,.28]}),x(new q(.026,.02,.14,10),a,{pos:[h,1.67,.3],rot:[Math.PI/2-.15,0,0]}));let c=x(k(.28,.05,1.24,.02,.008),i.clay(5396582),{pos:[.84,.42,.42],rot:[-.52,.22,0]}),l=new ot;return l.add(x(k(.24,.2,.46,.04,.012),o,{pos:[0,.12,0]}),x(k(.25,.09,.36,.02,.006),i.emissive(16771222,.7,1.8),{pos:[0,.14,0],cast:!1}),x(k(.25,.04,.48,.02,.006),n,{pos:[0,.23,0]})),l.rotation.set(-.52,.22,0),t.add(c,l),be(t,1.18,1.02,.008,.36,i),{group:ue(t,90,"peaktram"),anim(h){let d=Math.sin(h*.9)*.28;l.position.set(.84+d*.18,.45-d*.5,.42+d*.85)}}}function Sg(i){let t=new ot,e=i.gloss(16775920,{rough:.26}),n=i.metal(16106557,.18,.88),s=i.textured("trophy100",{rough:.28,metal:.65}),r=i.emissive(16770936,1,2.4);t.add(x(new q(.76,.84,.16,8),e,{pos:[0,.08,0]}),x(new q(.62,.68,.52,8),e,{pos:[0,.42,0]}),x(new q(.68,.64,.1,8),n,{pos:[0,.72,0]}),x(new Gt(.64,.028,10,28),n,{pos:[0,.18,0],rot:[Math.PI/2,0,0]}),x(k(.56,.24,.05,.03,.01),n,{pos:[0,.42,.62]}),x(new we(.5,.19),s,{pos:[0,.42,.648],cast:!1}));let o=as(i,"tophat",{golden:!0,noShadow:!0});o.group.position.set(0,.78,0),o.group.scale.setScalar(.86),t.add(o.group);let a=[];for(let c=0;c<4;c++){let l=x(new kn(.065,0),r,{cast:!1});t.add(l),a.push({m:l,phase:c*Math.PI/2})}return be(t,.88,.88,.008,.36,i),{group:ue(t,100,"centennial"),anim(c,l,h){o.anim(c,l,{mood:"proud"});for(let d of a){let u=c*1.15+d.phase;d.m.position.set(Math.cos(u)*.82,1.38+Math.sin(c*3+d.phase)*.16,Math.sin(u)*.82),d.m.rotation.y=c*2.5}}}}function bc(i,t){let e=new ot,n=[16773836,14677480,16770262,14872319,15918847],s=[1349259,15232072,3896004,9329604,13932066],r=Math.max(0,i-15)%n.length,o=t.clay(n[r],{rough:.5}),a=t.clay(s[r],{rough:.46}),c=t.emissive(16770454,.65,1.9);e.add(x(k(1.74,.94,1.34,.06,.022),o,{pos:[0,.48,0]}),x(k(1.88,.12,1.48,.06,.02),a,{pos:[0,.99,0]}));for(let l of[-1,1])for(let h of[-.46,0,.46])e.add(x(k(.32,.42,.05,.04,.01),a,{pos:[h,.52,l*.67]}),x(k(.24,.34,.06,.03,.008),c,{pos:[h,.52,l*.68],cast:!1}));for(let l of[-.46,.46])e.add(x(k(.32,.1,.14,.02,.008),t.clay(13132858),{pos:[l,.25,.74]}),x(new it(.08,10,8),t.clay(3909732),{pos:[l-.06,.34,.74]}),x(new it(.075,10,8),t.clay(16743836),{pos:[l+.06,.34,.74]}));return{group:ue(e,i,"brick_"+i),anim:null}}function wc(i,t){let e=Math.max(1,Math.floor((i-100)/14)),n=new ot,s=t.metal(16106557,.22,.84),r=t.clay(1346692,{rough:.42}),o=t.emissive(16771204,.85,2.25);n.add(x(k(.84,.2,.84,.06,.02),r,{pos:[0,.1,0]}),x(k(.64,1.38,.64,.06,.02),s,{pos:[0,.88,0]}),x(k(.46,.68,.46,.05,.016),r,{pos:[0,1.88,0]}),x(new We(.28,.56,6),s,{pos:[0,2.5,0]}),x(new it(.08,12,10),o,{pos:[0,2.82,0],cast:!1}));for(let a=0;a<4;a++)n.add(x(k(.67,.07,.67,.02,.006),o,{pos:[0,.44+a*.3,0],cast:!1}));for(let a=0;a<4;a++){let c=a*Math.PI/2+.4;n.add(x(new it(.11,10,8),t.clay(3909732),{pos:[Math.cos(c)*.32,1.62,Math.sin(c)*.32]}))}return be(n,.54,.54,.008,.34,t),{group:ue(n,i,"wing_"+e),anim:null}}function hn(i,t,e={}){switch(i){case 18:return fg(t,e);case 21:return pg(t);case 25:return mg(t);case 30:return gg(t,e);case 35:return xg(t);case 45:return _g(t);case 60:return yg(t);case 75:return vg(t);case 90:return Mg(t);case 100:return Sg(t);default:return i>100&&(i-100)%14===0?wc(i,t):i>14?bc(i,t):null}}var cs=.22,ls=1.18,Ie={day:{bg:9230327,fog:12446455,fogDensity:.011,hemiSky:16775920,hemiGround:6338756,hemiInt:1.05,keyColor:16774366,keyInt:1.75,keyPos:[8.5,13.5,9],rimColor:16769220,rimInt:.72,ambInt:.24,nightGlow:0,nightFactor:0,cloudCol:16776696,starOpacity:0,sunY:14.5,sunVisible:!0,moonVisible:!1},dusk:{bg:15108986,fog:15703940,fogDensity:.013,hemiSky:16765352,hemiGround:6049674,hemiInt:.92,keyColor:16754794,keyInt:1.65,keyPos:[11.5,6.8,7.5],rimColor:12752127,rimInt:.95,ambInt:.22,nightGlow:1.45,nightFactor:.58,cloudCol:16763824,starOpacity:.42,sunY:5.5,sunVisible:!0,moonVisible:!1},night:{bg:1450319,fog:1713752,fogDensity:.014,hemiSky:6455512,hemiGround:1977176,hemiInt:.78,keyColor:10929407,keyInt:1.25,keyPos:[-7.5,12.5,8.5],rimColor:5691624,rimInt:.9,ambInt:.22,nightGlow:2.6,nightFactor:1,cloudCol:6123430,starOpacity:.95,sunY:-10,sunVisible:!1,moonVisible:!0}},Ws=null,ph=!1;function mh(){if(Ws!==null)return Ws;try{let i=document.createElement("canvas"),t=i.getContext("webgl2")||i.getContext("webgl")||i.getContext("experimental-webgl");if(Ws=!!t,t){let e="";try{let s=t.getExtension("WEBGL_debug_renderer_info");e=String(s?t.getParameter(s.UNMASKED_RENDERER_WEBGL)||"":t.getParameter(t.RENDERER)||"")}catch{}ph=/SwiftShader|llvmpipe|Software|Mesa|Basic Render/i.test(e);let n=t.getExtension("WEBGL_lose_context");n&&n.loseContext()}}catch{Ws=!1}return Ws}function fh(i){return i>=100?"tophat":i>=30?"straw":i>=14?"halo":null}function bg(i){i.updateMatrixWorld(!0);let t=new Sn,e=new Sn;return i.traverse(n=>{!n.isMesh||!n.visible||n.userData.ignoreBounds||(n.geometry.boundingBox||n.geometry.computeBoundingBox(),e.copy(n.geometry.boundingBox).applyMatrix4(n.matrixWorld),t.union(e))}),t.isEmpty()&&t.set(new D(-.5,0,-.5),new D(.5,1,.5)),t}function ro(i){i.traverse(t=>{t.isMesh&&t.geometry&&!t.userData.sharedGeo&&t.geometry.dispose()})}function wg(i){let t=new ot,e=i.clay(8146474,{rough:.48}),n=i.metal(15777348,.22,.84),s=i.textured("coasterDial",{rough:.44}),r=i.emissive(8181503,.75,1.5,{transparent:!0,opacity:.65});t.add(x(new q(1.74,1.84,.16,48),[e,s,e],{pos:[0,.08,0],cast:!1,recv:!0}),x(new Gt(1.75,.048,12,56),n,{pos:[0,.155,0],rot:[Math.PI/2,0,0]}),x(new Gt(1.85,.032,10,56),e,{pos:[0,.02,0],rot:[Math.PI/2,0,0],cast:!1}));let o=x(new Gt(1.64,.03,10,48),r,{pos:[0,.18,0],rot:[Math.PI/2,0,0],cast:!1});return o.visible=!1,t.add(o),be(t,2.25,2.25,-.01,.36,i),{group:t,lockRing:o}}function Eg(i){let t=new ot,e={day:so("day"),dusk:so("dusk"),night:so("night")},n=new ii({map:e.day,side:He,depthWrite:!1,fog:!1}),s=new Fe(new it(46,32,20),n);t.add(s);let r=i.clay(16776696,{rough:.65,noBump:!0}),o=[];[{a:.35,r:24,y:3.4,s:1.35},{a:1.45,r:26,y:5.6,s:1.15},{a:2.55,r:25,y:2.8,s:1.3},{a:3.75,r:27,y:4.8,s:1.25},{a:4.85,r:24,y:3.8,s:1.1},{a:5.75,r:26,y:6.2,s:1}].forEach(p=>{let S=new ot;S.add(x(new it(1.15,14,12),r,{scale:[1.3,.78,.92],cast:!1,recv:!1}),x(new it(.85,12,10),r,{pos:[1,-.1,.15],scale:[1.1,.75,.85],cast:!1,recv:!1}),x(new it(.78,12,10),r,{pos:[-.95,-.15,-.1],scale:[1.15,.72,.88],cast:!1,recv:!1}),x(new it(.68,12,10),r,{pos:[.22,.45,-.05],scale:[1.1,.82,.85],cast:!1,recv:!1})),S.scale.setScalar(p.s),t.add(S),o.push({cg:S,...p})});let c=x(new it(1.9,20,16),i.emissive(16770682,1.1,1.1),{pos:[-11.5,4.8,-26],cast:!1,recv:!1});t.add(c);let l=new ot;l.position.set(7.4,6.2,-9.2),l.rotation.y=-.35,l.add(x(new Gt(.92,.3,12,26,Math.PI*1.28),i.emissive(16773542,1.4,1.75),{rot:[0,0,Math.PI*.62],cast:!1,recv:!1})),l.visible=!1,t.add(l);let h=320,d=new Float32Array(h*3),u=9001,f=()=>(u=Math.imul(1664525,u)+1013904223>>>0,u/4294967296);for(let p=0;p<h;p++){let S=f()*Math.PI*2,v=.42+f()*1.42,y=28+f()*8;d[p*3]=y*Math.sin(v)*Math.cos(S),d[p*3+1]=y*Math.cos(v)+1.2,d[p*3+2]=y*Math.sin(v)*Math.sin(S)}let m=new Oe;m.setAttribute("position",new Ke(d,3));let _=new Ls({color:16775378,size:.78,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),g=new Br(m,_);return t.add(g),{group:t,setSky(p){let S=Ie[p]||Ie.day;n.map=e[p]||e.day,n.needsUpdate=!0,r.color.setHex(S.cloudCol),c.visible=S.sunVisible,c.position.y=p==="dusk"?1.8:4.8,l.visible=S.moonVisible,_.opacity=S.starOpacity},anim(p,S){let v=S?0:.022;for(let y of o){let R=y.a+p*v;y.cg.position.set(Math.cos(R)*y.r,y.y+Math.sin(p*.6+y.a)*.25,Math.sin(R)*y.r),y.cg.lookAt(0,y.y,0)}_.opacity>.01&&!S&&(_.size=.44+Math.sin(p*2.4)*.07)},dispose(){Object.values(e).forEach(p=>p.dispose()),s.geometry.dispose(),n.dispose(),m.dispose(),_.dispose()}}}function Tg(i){let t=new ot;t.visible=!1;let e=i.emissive(3993768,.9,1.9,{transparent:!0,opacity:.55,depthWrite:!1}),n=i.emissive(16769126,.85,1.85,{transparent:!0,opacity:.45,depthWrite:!1}),s=i.clay(3057242,{rough:.42}),r=i.clay(4837230,{rough:.38}),o=i.emissive(16769902,.9,2),a=x(new Gt(1.55,.045,10,48),e,{rot:[Math.PI/2,0,0],cast:!1,recv:!1}),c=x(new Gt(1.95,.035,10,48),n,{rot:[Math.PI/2,0,0],cast:!1,recv:!1});t.add(a,c);let l=new ot;l.position.set(0,.05,0);let h=x(Ne([[0,0,0],[.04,.45,.02],[-.02,.95,0]],.055,14,10),s),d=x(new it(.24,14,10),r,{pos:[-.22,.62,.04],rot:[.15,.2,.58],scale:[1.45,.42,.78]}),u=x(new it(.24,14,10),r,{pos:[.22,.72,-.02],rot:[-.1,-.2,-.58],scale:[1.45,.42,.78]}),f=x(new kn(.18,1),o,{pos:[-.02,1.06,0],cast:!1});l.add(h,d,u,f),t.add(l);let m=[];for(let g=0;g<8;g++){let p=x(new it(.055,8,8),g%2?n:e,{cast:!1,recv:!1});t.add(p),m.push({m:p,phase:g/8,rad:1.15+g%3*.35})}let _=0;return{group:t,setProgress(g){_=Math.max(0,Math.min(1,Number(g)||0)),t.visible=_>.005},anim(g,p,S=.35){if(!t.visible)return;t.position.set(0,p?.16:.04,p?0:S);let v=p?1:.86,y=_,R=g*.45%1,T=(g*.45+.5)%1;a.position.y=.08+R*(1.2+y*1.4),a.scale.setScalar(v*(.7+R*.55)),c.position.y=.08+T*(1.2+y*1.4),c.scale.setScalar(v*(.65+T*.65));let C=.24+y*.92;l.position.set(p?1.2:.95,.04,p?.55:.25),l.scale.setScalar(C),l.rotation.y=Math.sin(g*1.4)*.2,f.scale.setScalar(.6+y*.8+Math.sin(g*4)*.08),f.rotation.y=g*1.8;for(let I of m){let b=(g*(.28+y*.35)+I.phase)%1,M=g*1.1+I.phase*Math.PI*2;I.m.position.set(Math.cos(M)*I.rad*v,.15+b*(1.5+y*1.6),Math.sin(M)*I.rad*v),I.m.scale.setScalar(Math.sin(b*Math.PI)*(.7+y*.6))}}}}function Ag(i){let t=new ot,e=new q(.11,.11,.028,14),n=new Ue(.13,.07,.02),s=new kn(.1,0),r=new it(.11,12,10),o=i.metal(16763708,.18,.88),a=i.glass(6287615,.65),l=[16739154,1349259,16764996,16740520,4576888,7125247].map(u=>i.gloss(u,{rough:.28})),h=[];function d(u="yes",f=1.6){let m=u==="sprint14"||u==="milestone"?36:24;for(let _=0;_<m;_++){let g=n,p=l[_%l.length];u==="shield"?(g=_%3===0?s:r,p=_%3===0?o:a):u==="rescue"?(g=_%2===0?s:n,p=_%3===0?o:l[4]):u==="sprint14"||u==="milestone"?(g=_%2===0?e:s,p=_%3===0?l[_%l.length]:o):(g=_%2===0?e:n,p=_%2===0?o:l[_%l.length]);let S=new Fe(g,p);S.castShadow=!1,S.position.set((Math.random()-.5)*.8,f+Math.random()*.4,(Math.random()-.5)*.8);let v=Math.random()*Math.PI*2,y=1.3+Math.random()*2.4,R=(u==="shield"?2.4:4.2)+Math.random()*2.8;t.add(S),h.push({m:S,vx:Math.cos(v)*y,vy:R,vz:Math.sin(v)*y,rx:(Math.random()-.5)*9,ry:(Math.random()-.5)*9,life:0,maxLife:1.45+Math.random()*.6,grav:u==="shield"?-2.4:-7.6})}}return{group:t,spawn:d,update(u){for(let f=h.length-1;f>=0;f--){let m=h[f];if(m.life+=u,m.life>=m.maxLife){t.remove(m.m),h.splice(f,1);continue}m.vy+=m.grav*u,m.m.position.x+=m.vx*u,m.m.position.y+=m.vy*u,m.m.position.z+=m.vz*u,m.m.rotation.x+=m.rx*u,m.m.rotation.y+=m.ry*u;let _=1-Math.max(0,(m.life-m.maxLife*.65)/(m.maxLife*.35));m.m.scale.setScalar(Math.max(.01,_))}},dispose(){e.dispose(),n.dispose(),s.dispose(),r.dispose()}}}function Cg(i,t={}){if(!i||!mh())return null;let e=ph,n;try{n=new Nr({antialias:!e,alpha:!1,powerPreference:"high-performance"})}catch{return null}n.outputColorSpace=Ve,n.toneMapping=lc,n.toneMappingExposure=1.06,n.shadowMap.enabled=!e,n.shadowMap.type=cc,n.shadowMap.autoUpdate=!1;let s=()=>{n.shadowMap.enabled&&(n.shadowMap.needsUpdate=!0)},r=n.domElement;r.style.width="100%",r.style.height="100%",r.style.display="block",r.style.touchAction="none",r.setAttribute("aria-label","Interactive 3D Harbour Keep Diorama"),i.replaceChildren(r);let o=new Or;o.background=new Jt(Ie.day.bg),o.fog=new Fr(Ie.day.fog,Ie.day.fogDensity);let a=new ke(36,1,.2,120),c=hh({softwareGL:e}),l=e?null:{day:io("day"),dusk:io("dusk"),night:io("night")};l&&(o.environment=l.day);let h=new Jr(16777215,.24),d=new Yr(Ie.day.hemiSky,Ie.day.hemiGround,Ie.day.hemiInt),u=new ks(Ie.day.keyColor,Ie.day.keyInt);u.position.set(...Ie.day.keyPos),u.castShadow=!0,u.shadow.mapSize.set(1024,1024),u.shadow.camera.left=-7.2,u.shadow.camera.right=7.2,u.shadow.camera.top=8.4,u.shadow.camera.bottom=-6.2,u.shadow.camera.near=2,u.shadow.camera.far=32,u.shadow.bias=-5e-4,u.shadow.normalBias=.025,u.shadow.radius=2.4;let f=new ks(Ie.day.rimColor,Ie.day.rimInt);f.position.set(-9.5,6.5,-8.5);let m=new $r(16758892,0,14,1.5);m.position.set(1.2,2.4,2.2),o.add(h,d,u,f,m);let _=Eg(c);o.add(_.group);let g=new ot,p=new ot;p.visible=!1,o.add(g,p);let S=wg(c);p.add(S.group);let v=new ot;p.add(v);let y=Tg(c),R=Ag(c);o.add(y.group,R.group);let T={totalDays:Math.max(0,Math.floor(Number(t.totalDays)||0)),streak:Math.max(0,Math.floor(Number(t.streak)||0)),shields:Math.max(0,Math.floor(Number(t.shields)||0)),sky:t.sky||"day",avatar:t.avatar||"crab",mood:t.mood||"idle"},C="island",I=null,b=!1,M="",P=null,F=[],B=null,W=0,Z=0,G=0,nt=0,X=!1,st=-.34,mt=-.34,xt=1.04,zt=1.04,jt=11.2,$=11.2,lt=.85,Et=.85,dt=0,Lt=0,Ft=1,Ot=1,Yt=1,j=()=>!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);function rt(){let et=Ot/Math.max(1,Yt),ct=et<.8,vt=ct?44:36;a.fov!==vt&&(a.fov=vt);let $t=Math.tan(Re.degToRad(vt*.5))*et;if(C==="item"){let ht=2.05/Math.max(.14,$t),bt=Math.max(7.4,ht);return{y:1.15,r:bt,phi:1.12,theta:-.34,minR:Math.max(4,bt*.56),maxR:bt*1.55}}let ie=T.totalDays,Wt=ie>=14?Math.min(3,Math.floor((ie-14)/8)):0,E=.62,U=12.2;ie>=14?(E=2.6+Wt*.68,U=18.2+Wt*2.2):ie>=12?(E=2.05,U=15.8):ie>=9?(E=1.68,U=14.6):ie>=6?(E=1.35,U=13.6):ie>=4&&(E=1.05,U=12.8);let V=ie>=14?4.95:4.65,z=ct?V/Math.max(.14,$t*.96):0,O=Math.max(U,z);return{y:E,r:O,phi:1.04,theta:-.34,minR:Math.max(6.8,O*.56),maxR:O*1.58}}function L(et){let ct=Ie[et]?et:"day",vt=Ie[ct];T.sky=ct,o.background.setHex(vt.bg),o.fog.color.setHex(vt.fog),o.fog.density=vt.fogDensity,l&&(o.environment=l[ct]),d.color.setHex(vt.hemiSky),d.groundColor.setHex(vt.hemiGround),d.intensity=vt.hemiInt+(e?.3:0),u.color.setHex(vt.keyColor),u.intensity=vt.keyInt+(e?.22:0),u.position.set(...vt.keyPos),f.color.setHex(vt.rimColor),f.intensity=vt.rimInt+(e?.18:0),h.intensity=vt.ambInt+(e?.24:0),m.intensity=vt.nightGlow,c.setNightFactor(vt.nightFactor),_.setSky(ct),s()}function pt(et,ct,vt=0,$t=1){!et||!et.group||(et.group.position.set(ct[0],ct[1],ct[2]),et.group.rotation.y=vt,$t!==1&&et.group.scale.setScalar($t),g.add(et.group),et.anim&&F.push(et.anim))}function at(){let et=`${T.totalDays}|${T.avatar}|${T.shields}`;if(et===M)return;for(M=et;g.children.length;){let z=g.children[0];g.remove(z),ro(z)}F=[];let ct=T.totalDays,vt=ct>=4;P=dh(c,vt),P.setShields(T.shields),g.add(P.group),F.push(P.anim);let $t=fh(ct),ie;T.avatar==="jack"?ie=Ei(c,"jack",$t):T.avatar==="jackie"?ie=Ei(c,"jackie",$t):ie=as(c,$t),vt?pt(ie,[0,0,1.92],0,T.avatar==="crab"?.96:.92):pt(ie,[0,.025,.35],0,T.avatar==="crab"?1.15:1.06);let Wt=0,E=-.35,U=0;ct>=4&&(pt(Xe(4,c),[Wt,U,E],0,1),U+=1.25),ct>=6&&(pt(Xe(6,c),[Wt,U,E],0,1),U+=1.15),ct>=9&&(pt(Xe(9,c),[Wt,U,E],0,1),U+=1.1),ct>=12&&(pt(Xe(12,c),[Wt,U,E],0,1),U+=1.1);let V=ct>=14?Math.min(3,Math.floor((ct-14)/8)):0;for(let z=0;z<V;z++)pt(bc(15+z*8,c),[Wt,U,E],0,1),U+=1.05;if(ct>=14&&pt(Xe(14,c),[Wt,U,E],0,1),ct>=1&&pt(Xe(1,c),vt?[-1.68,0,1.62]:[-1.48,0,.72],.36,vt?.88:.98),ct>=2&&pt(Xe(2,c),vt?[1.82,0,1.48]:[1.52,0,.64],-.46,vt?.78:.88),ct>=3&&pt(Xe(3,c),vt?[2.56,0,.06]:[1.72,0,-.95],-.9,vt?.78:.84),ct>=5&&pt(Xe(5,c),[-2.38,0,.36],.92,.82),ct>=7&&pt(Xe(7,c),[3.72,-.22,3.05],-.58,.9),ct>=8&&pt(Xe(8,c),[-2.18,0,-1.2],-.52,.82),ct>=10&&pt(Xe(10,c),[-3.22,0,-.45],.52,.92),ct>=11&&pt(Xe(11,c),[-1.14,0,2.52],.28,.72),ct>=13&&pt(Xe(13,c),[-3.82,-.22,2.95],.68,.92),ct>=18&&pt(hn(18,c,{island:!0}),[1.65,-.22,4.42],0,.88),ct>=21&&pt(hn(21,c,{island:!0}),[0,0,-2.85],0,.9),ct>=25&&pt(hn(25,c,{island:!0}),[2.75,0,1.84],-.48,.78),ct>=30&&pt(hn(30,c,{island:!0}),[2.62,0,-1.42],-2.22,.78),ct>=35&&pt(hn(35,c,{island:!0}),[1.46,0,2.66],-.42,.72),ct>=45&&pt(hn(45,c,{island:!0}),[3.28,0,-.32],-.55,.88),ct>=60&&pt(hn(60,c,{island:!0}),[4.45,-.22,-1.85],-1.95,.9),ct>=75&&pt(hn(75,c,{island:!0}),[-2.18,-.05,-2.96],.35,.95),ct>=90&&pt(hn(90,c,{island:!0}),[2.18,-.05,-2.88],-.4,.92),ct>=100&&pt(hn(100,c,{island:!0}),[-.22,0,3.22],0,.74),ct>=114){let z=Math.min(4,Math.floor((ct-100)/14)),O=[[-1.2,-3.28],[1.2,-3.28],[-3.25,-2.18],[3.25,-2.18]];for(let ht=0;ht<z;ht++)pt(wc(100+(ht+1)*14,c),[O[ht][0],0,O[ht][1]],0,.76)}c.setNightFactor((Ie[T.sky]||Ie.day).nightFactor),s()}function Ct(et,ct){for(;v.children.length;){let z=v.children[0];v.remove(z),ro(z)}B=null;let vt=null;if(et<=0){let z=fh(T.totalDays);T.avatar==="jack"?vt=Ei(c,"jack",z,{noShadow:!0}):T.avatar==="jackie"?vt=Ei(c,"jackie",z,{noShadow:!0}):vt=as(c,z,{noShadow:!0})}else et<=14?vt=Xe(et,c):vt=hn(et,c,{island:!1});vt||(vt=as(c,null,{noShadow:!0}));let $t=new ot;$t.add(vt.group),v.add($t);let ie=bg(vt.group),Wt=new D,E=new D;ie.getSize(Wt),ie.getCenter(E);let U=Math.max(Wt.x,Wt.y,Wt.z,.4),V=Re.clamp(2.38/U,.55,2.15);vt.group.scale.multiplyScalar(V),vt.group.position.set(-E.x*V,-ie.min.y*V+.16,-E.z*V),ct&&uh(vt.group,c),S.lockRing.visible=!!ct,B=vt.anim||null,nt=j()?0:.45,c.setNightFactor((Ie[T.sky]||Ie.day).nightFactor),s()}function ft(){let et=rt(),ct=Re.clamp(jt,et.minR,et.maxR),vt=Re.clamp(xt,cs,ls),$t=Math.sin(vt);a.position.set(ct*$t*Math.sin(st),Et+ct*Math.cos(vt),ct*$t*Math.cos(st)),a.lookAt(0,Et,0),Math.abs(Z)>.001?a.setViewOffset(Ot,Yt,0,Z*Yt*.55,Ot,Yt):a.clearViewOffset(),a.updateProjectionMatrix()}function Vt(){if(X)return;let et=i.getBoundingClientRect();Ot=Math.max(1,Math.round(et.width||window.innerWidth||800)),Yt=Math.max(1,Math.round(et.height||window.innerHeight||600));let ct=e?1:Math.min(2,window.devicePixelRatio||1);n.setPixelRatio(ct),n.setSize(Ot,Yt,!1),a.aspect=Ot/Yt;let vt=rt();$=Re.clamp(vt.r*Ft,vt.minR,vt.maxR),ft()}let _t=new Map,A=new Kr,w=!1,H=0,J=0,tt=0,K=0,Pt=0,yt=0,At=0,ee=1,ut=!1,Rt=0,kt=0;function Ht(et){if(!X){try{r.setPointerCapture(et.pointerId)}catch{}if(_t.set(et.pointerId,{x:et.clientX,y:et.clientY}),_t.size===1)w=!0,H=Pt=et.clientX,J=yt=et.clientY,tt=0,K=performance.now(),dt=0,Lt=0;else if(_t.size===2){w=!1;let ct=[..._t.values()];At=Math.hypot(ct[0].x-ct[1].x,ct[0].y-ct[1].y)||1,ee=Ft}}}function It(et){if(X||!_t.has(et.pointerId))return;if(_t.set(et.pointerId,{x:et.clientX,y:et.clientY}),_t.size===2){let E=[..._t.values()],U=Math.hypot(E[0].x-E[1].x,E[0].y-E[1].y)||1,V=At/U;Ft=Re.clamp(ee*V,.62,1.5);let z=rt();$=Re.clamp(z.r*Ft,z.minR,z.maxR);return}if(!w)return;let ct=et.clientX-Pt,vt=et.clientY-yt;Pt=et.clientX,yt=et.clientY,tt+=Math.hypot(ct,vt);let $t=Math.PI*1.45/Math.max(320,Math.min(Ot,Yt)),ie=-ct*$t,Wt=-vt*$t*.72;if(mt+=ie,zt=Re.clamp(zt+Wt,cs,ls),st+=ie*.55,xt=Re.clamp(xt+Wt*.55,cs,ls),dt=Re.clamp(ie*22,-6.5,6.5),Lt=Re.clamp(Wt*16,-4,4),ft(),je(),!ut&&tt>6&&(ut=!0,typeof t.onFirstDrag=="function"))try{t.onFirstDrag()}catch{}if(Rt+=Math.abs(ie),Rt>=.24&&(Rt=0,typeof t.onOrbitTick=="function"))try{t.onOrbitTick()}catch{}}function ne(et,ct){let vt=performance.now();if(vt-kt<310){kt=0,Q();return}if(kt=vt,typeof t.onTapProp!="function")return;let $t=r.getBoundingClientRect(),ie=new gt((et-$t.left)/Math.max(1,$t.width)*2-1,-((ct-$t.top)/Math.max(1,$t.height))*2+1);A.setFromCamera(ie,a);let Wt=C==="item"?v:g,E=A.intersectObject(Wt,!0);for(let U of E){let V=U.object.userData.milestoneDay,z=U.object.userData.prop;if(typeof V=="number"){try{t.onTapProp({day:V,prop:z})}catch{}return}}if(C==="island")try{t.onTapProp({day:null,prop:"pier"})}catch{}}function Xt(et){if(X)return;let ct=w&&_t.size===1;_t.delete(et.pointerId),_t.size===0&&(w=!1),ct&&tt<8&&performance.now()-K<420&&ne(et.clientX,et.clientY)}function le(et){if(X)return;et.preventDefault();let ct=Math.sign(et.deltaY)*.08;Ft=Re.clamp(Ft+ct,.62,1.5);let vt=rt();$=Re.clamp(vt.r*Ft,vt.minR,vt.maxR)}function N(et){et.preventDefault()}r.addEventListener("pointerdown",Ht),r.addEventListener("pointermove",It),r.addEventListener("pointerup",Xt),r.addEventListener("pointercancel",Xt),r.addEventListener("wheel",le,{passive:!1}),r.addEventListener("webglcontextlost",N),window.addEventListener("resize",Vt);function St(et={}){if(X)return;et.totalDays!=null&&(T.totalDays=Math.max(0,Math.floor(Number(et.totalDays)||0))),et.streak!=null&&(T.streak=Math.max(0,Math.floor(Number(et.streak)||0))),et.shields!=null&&(T.shields=Math.max(0,Math.floor(Number(et.shields)||0))),et.avatar&&(T.avatar=et.avatar),et.mood&&(T.mood=et.mood),et.sky&&L(et.sky),at(),C==="item"&&I===0&&Ct(0,!1);let ct=rt();lt=ct.y,$=Re.clamp(ct.r*Ft,ct.minR,ct.maxR),e&&(Et=lt,jt=$,je())}function Y(et,ct={}){if(X)return;if(et==null){let ie=C==="item";C="island",I=null,b=!1,g.visible=!0,p.visible=!1,Ft=1;let Wt=rt();lt=Wt.y,$=Wt.r,zt=Wt.phi,mt=Wt.theta,s(),ie&&(Et=Wt.y,jt=Wt.r,xt=Wt.phi,st=Wt.theta,dt=0,Lt=0,ft(),je());return}let vt=Math.max(0,Math.floor(Number(et)||0));C="item",I=vt,b=!!ct.locked,g.visible=!1,p.visible=!0,Ct(vt,b),Ft=1;let $t=rt();lt=$t.y,Et=$t.y,$=$t.r,jt=$t.r,zt=$t.phi,xt=$t.phi,mt=$t.theta,st=$t.theta,dt=0,Lt=0,ft(),je()}function Q(){Ft=1;let et=rt();mt=et.theta,zt=et.phi,$=et.r,lt=et.y,dt=0,Lt=0,e&&(st=et.theta,xt=et.phi,jt=et.r,Et=et.y,ft(),je())}function Tt(et=0,ct=0){mt+=Number(et)||0,zt=Re.clamp(zt+(Number(ct)||0),cs,ls),st+=(Number(et)||0)*(e?1:.45),xt=Re.clamp(xt+(Number(ct)||0)*(e?1:.45),cs,ls),ft(),je()}function wt(et){W=Re.clamp(Number(et)||0,-.55,.55),e&&(Z=W,ft(),je())}function Zt(et){y.setProgress(et),je()}function ye(et="yes"){G=j()?0:.65;let ct=C==="item"?1.5:Math.min(4.2,Et+.9);R.spawn(et,ct),je()}function Pe(){return{mode:C,inspectDay:I}}function oe(){return{theta:Number(st.toFixed(4)),phi:Number(xt.toFixed(4)),radius:Number(jt.toFixed(4))}}function Qe(et=800,ct=600){if(X)return"";let vt=Ot,$t=Yt,ie=n.getPixelRatio(),Wt=Z,E=Math.max(64,Math.round(et)),U=Math.max(64,Math.round(ct));n.setPixelRatio(1),n.setSize(E,U,!1),a.aspect=E/U,Z=0,a.clearViewOffset(),a.updateProjectionMatrix(),n.render(o,a);let V="";try{V=n.domElement.toDataURL("image/png")}catch{V=""}return n.setPixelRatio(ie),n.setSize(vt,$t,!1),a.aspect=vt/Math.max(1,$t),Z=Wt,ft(),n.render(o,a),V}let ve=0,Ze=0,ri=performance.now(),$e=0;function je(){X||!e||(Ze&&(clearTimeout(Ze),Ze=0),ve||(ve=requestAnimationFrame(An)))}function An(et){if(ve=0,X)return;if(document.hidden){ri=et;return}let ct=Math.min(.05,Math.max(.001,(et-ri)/1e3));ri=et;let vt=j();if(vt||($e+=ct),!w)if(Math.abs(dt)>.001||Math.abs(Lt)>.001){mt+=dt*ct,zt=Re.clamp(zt+Lt*ct,cs,ls);let Wt=Math.exp(-5.4*ct);dt*=Wt,Lt*=Wt}else!vt&&C==="item"&&!e&&(mt+=ct*.22);let $t=1-Math.exp(-9.5*ct);st+=(mt-st)*$t,xt+=(zt-xt)*$t,jt+=($-jt)*$t,Et+=(lt-Et)*$t,Z+=(W-Z)*$t;let ie=1;if(G>0){G=Math.max(0,G-ct);let Wt=1-G/.65;ie=1+Math.sin(Wt*Math.PI*2)*(1-Wt)*.07}if(g.scale.setScalar(ie),C==="item"){if(nt>0){nt=Math.max(0,nt-ct);let Wt=1-nt/.45,E=.55+.45*(1-Math.pow(1-Wt,3))+Math.sin(Wt*Math.PI)*.08;v.scale.setScalar(E*ie)}else v.scale.setScalar(ie);B&&!vt&&B($e,ct,{mood:T.mood}),S.lockRing.visible&&!vt&&S.lockRing.scale.setScalar(1+Math.sin($e*2.8)*.03)}else if(!vt){let Wt={mood:T.mood};for(let E=0;E<F.length;E++)F[E]($e,ct,Wt)}if(_.anim($e,vt),y.anim($e,C==="item",T.totalDays>=4?1.92:.35),R.update(ct),ft(),n.render(o,a),e){let Wt=w||G>0||nt>0;Ze=setTimeout(()=>{Ze=0,!X&&!document.hidden&&!ve&&(ve=requestAnimationFrame(An))},Wt?40:180)}else ve=requestAnimationFrame(An)}function hs(){!document.hidden&&!X&&!ve&&!Ze&&(ri=performance.now(),ve=requestAnimationFrame(An))}document.addEventListener("visibilitychange",hs);function Ti(){X||(X=!0,ve&&cancelAnimationFrame(ve),ve=0,Ze&&clearTimeout(Ze),Ze=0,document.removeEventListener("visibilitychange",hs),window.removeEventListener("resize",Vt),r.removeEventListener("pointerdown",Ht),r.removeEventListener("pointermove",It),r.removeEventListener("pointerup",Xt),r.removeEventListener("pointercancel",Xt),r.removeEventListener("wheel",le),r.removeEventListener("webglcontextlost",N),ro(g),ro(v),_.dispose(),R.dispose(),l&&Object.values(l).forEach(et=>et.dispose()),c.dispose(),n.dispose(),r.parentNode&&r.remove())}L(T.sky),at(),Vt();let oi=rt();return lt=Et=oi.y,$=jt=oi.r,zt=xt=oi.phi,mt=st=oi.theta,ft(),n.render(o,a),e?Ze=setTimeout(()=>{Ze=0,!X&&!document.hidden&&!ve&&(ve=requestAnimationFrame(An))},180):ve=requestAnimationFrame(An),{setState:St,inspectMilestone:Y,getMode:Pe,setFocusProgress:Zt,celebrate:ye,getCameraAngles:oe,nudgeOrbit:Tt,resetCamera:Q,setVerticalOffset:wt,resize:Vt,snapshot:Qe,dispose:Ti}}window.TFF_DAILY3D={isSupported:mh,mount:Cg};})();
