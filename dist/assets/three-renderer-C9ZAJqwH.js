import{c as wr,N as At,S as Ir,C as Ze,F as ir,M as $t,V as We,R as yr,a as ft,w as sn,W as Jn,b as Ht,d as nt,L as Xt,H as hn,U as It,D as Mt,B as _t,e as Zt,f as mn,p as Nr,E as Or,g as ut,P as ln,A as Fr,h as Sn,i as Tt,j as un,k as Wn,l as Qt,m as Jt,n as rr,o as Br,q as Ft,r as dn,s as Gr,t as Hr,u as zt,O as Vr,v as kr,x as Wr,y as zr,z as Xr,G as Yr,I as Kr,J as qr,K as $r,Q as Zr,T as Qr,X as Jr,Y as jr,Z as ea,_ as ta,$ as na,a0 as ia,a1 as ra,a2 as Mn,a3 as Bt,a4 as nn,a5 as aa,a6 as Kt,a7 as oa,a8 as sa,a9 as la,aa as ca,ab as ar,ac as fa,ad as ua,ae as da,af as pa,ag as Be,ah as ha,ai as ma,aj as _a,ak as yt,al as zn,am as qt,an as xt,ao as or,ap as wt,aq as St,ar as pn,as as sr,at as lr,au as cr,av as va,aw as ga,ax as Ea,ay as fr,az as Dt,aA as Sa,aB as Ma,aC as Ta,aD as ur,aE as xa,aF as dr,aG as pr,aH as Tn,aI as xn,aJ as An,aK as Rn,aL as qe,aM as jn,aN as ei,aO as ti,aP as ni,aQ as ii,aR as ri,aS as ai,aT as oi,aU as si,aV as li,aW as ci,aX as fi,aY as ui,aZ as di,a_ as pi,a$ as hi,b0 as mi,b1 as _i,b2 as vi,b3 as gi,b4 as Ei,b5 as bn,b6 as Si,b7 as Mi,b8 as Aa,b9 as Ti,ba as xi,bb as Ai,bc as In,bd as yn,be as Nn,bf as On,bg as Fn,bh as Bn,bi as Gn,bj as Ra,bk as Ri,bl as ba,bm as cn,bn as Ca,bo as bi,bp as Ci,bq as Pi,br as Hn,bs as Vn,bt as Pa,bu as hr,bv as Ua,bw as _n,bx as La,by as Da,bz as mr,bA as _r,bB as Ui,bC as vr,bD as gr,bE as Li,bF as Er,bG as jt,bH as Vt,bI as wa,bJ as Ia,bK as ya,bL as Na,bM as Oa,bN as Di,bO as ct,bP as Fa,bQ as Ba,bR as Ga,bS as Ha,bT as Va,bU as ka,bV as Wa,bW as za,bX as Xa,bY as Ya,bZ as Ka,b_ as qa,b$ as $a,c0 as Za,c1 as Qa,c2 as Ja,c3 as ja}from"./three-core-BT-ibd6O.js";/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Sr(){let e=null,n=!1,t=null,i=null;function l(o,h){t(o,h),i=e.requestAnimationFrame(l)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(l),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(o){t=o},setContext:function(o){e=o}}}function eo(e){const n=new WeakMap;function t(f,C){const x=f.array,T=f.usage,v=x.byteLength,E=e.createBuffer();e.bindBuffer(C,E),e.bufferData(C,x,T),f.onUploadCallback();let g;if(x instanceof Float32Array)g=e.FLOAT;else if(typeof Float16Array<"u"&&x instanceof Float16Array)g=e.HALF_FLOAT;else if(x instanceof Uint16Array)f.isFloat16BufferAttribute?g=e.HALF_FLOAT:g=e.UNSIGNED_SHORT;else if(x instanceof Int16Array)g=e.SHORT;else if(x instanceof Uint32Array)g=e.UNSIGNED_INT;else if(x instanceof Int32Array)g=e.INT;else if(x instanceof Int8Array)g=e.BYTE;else if(x instanceof Uint8Array)g=e.UNSIGNED_BYTE;else if(x instanceof Uint8ClampedArray)g=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+x);return{buffer:E,type:g,bytesPerElement:x.BYTES_PER_ELEMENT,version:f.version,size:v}}function i(f,C,x){const T=C.array,v=C.updateRanges;if(e.bindBuffer(x,f),v.length===0)e.bufferSubData(x,0,T);else{v.sort((g,y)=>g.start-y.start);let E=0;for(let g=1;g<v.length;g++){const y=v[E],U=v[g];U.start<=y.start+y.count+1?y.count=Math.max(y.count,U.start+U.count-y.start):(++E,v[E]=U)}v.length=E+1;for(let g=0,y=v.length;g<y;g++){const U=v[g];e.bufferSubData(x,U.start*T.BYTES_PER_ELEMENT,T,U.start,U.count)}C.clearUpdateRanges()}C.onUploadCallback()}function l(f){return f.isInterleavedBufferAttribute&&(f=f.data),n.get(f)}function o(f){f.isInterleavedBufferAttribute&&(f=f.data);const C=n.get(f);C&&(e.deleteBuffer(C.buffer),n.delete(f))}function h(f,C){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const T=n.get(f);(!T||T.version<f.version)&&n.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const x=n.get(f);if(x===void 0)n.set(f,t(f,C));else if(x.version<f.version){if(x.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(x.buffer,f,C),x.version=f.version}}return{get:l,remove:o,update:h}}var to=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,no=`#ifdef USE_ALPHAHASH
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
#endif`,io=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ro=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ao=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,oo=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,so=`#ifdef USE_AOMAP
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
#endif`,lo=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,co=`#ifdef USE_BATCHING
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
#endif`,fo=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uo=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,po=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ho=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mo=`#ifdef USE_IRIDESCENCE
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
#endif`,_o=`#ifdef USE_BUMPMAP
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
#endif`,vo=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,go=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Eo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,So=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mo=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,To=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ao=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ro=`#define PI 3.141592653589793
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
} // validated`,bo=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Co=`vec3 transformedNormal = objectNormal;
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
#endif`,Po=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Uo=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lo=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Do=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wo="gl_FragColor = linearToOutputTexel( gl_FragColor );",Io=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yo=`#ifdef USE_ENVMAP
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
#endif`,No=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Oo=`#ifdef USE_ENVMAP
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
#endif`,Fo=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bo=`#ifdef USE_ENVMAP
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
#endif`,Go=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ho=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vo=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ko=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wo=`#ifdef USE_GRADIENTMAP
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
}`,zo=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xo=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yo=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ko=`uniform bool receiveShadow;
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
#endif`,qo=`#ifdef USE_ENVMAP
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
#endif`,$o=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zo=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qo=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jo=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jo=`PhysicalMaterial material;
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
#endif`,es=`struct PhysicalMaterial {
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
}`,ts=`
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
#endif`,ns=`#if defined( RE_IndirectDiffuse )
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
#endif`,is=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rs=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,as=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,os=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ss=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ls=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cs=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fs=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,us=`#if defined( USE_POINTS_UV )
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
#endif`,ds=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ps=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hs=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ms=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_s=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vs=`#ifdef USE_MORPHTARGETS
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
#endif`,gs=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Es=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ss=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ms=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ts=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xs=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,As=`#ifdef USE_NORMALMAP
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
#endif`,Rs=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bs=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cs=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ps=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Us=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ls=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ds=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ws=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Is=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ys=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ns=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Os=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fs=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
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
#endif`,Bs=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gs=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hs=`float getShadowMask() {
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
}`,Vs=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ks=`#ifdef USE_SKINNING
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
#endif`,Ws=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zs=`#ifdef USE_SKINNING
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
#endif`,Xs=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ys=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ks=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qs=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$s=`#ifdef USE_TRANSMISSION
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
#endif`,Zs=`#ifdef USE_TRANSMISSION
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
#endif`,Qs=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Js=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,js=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,el=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tl=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nl=`uniform sampler2D t2D;
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
}`,il=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rl=`#ifdef ENVMAP_TYPE_CUBE
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
}`,al=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ol=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sl=`#include <common>
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
}`,ll=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,cl=`#define DISTANCE
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
}`,fl=`#define DISTANCE
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
}`,ul=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dl=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pl=`uniform float scale;
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
}`,hl=`uniform vec3 diffuse;
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
}`,ml=`#include <common>
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
}`,_l=`uniform vec3 diffuse;
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
}`,vl=`#define LAMBERT
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
}`,gl=`#define LAMBERT
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
}`,El=`#define MATCAP
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
}`,Sl=`#define MATCAP
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
}`,Ml=`#define NORMAL
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
}`,Tl=`#define NORMAL
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
}`,xl=`#define PHONG
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
}`,Al=`#define PHONG
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
}`,Rl=`#define STANDARD
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
}`,bl=`#define STANDARD
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
}`,Cl=`#define TOON
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
}`,Pl=`#define TOON
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
}`,Ul=`uniform float size;
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
}`,Ll=`uniform vec3 diffuse;
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
}`,Dl=`#include <common>
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
}`,wl=`uniform vec3 color;
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
}`,Il=`uniform float rotation;
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
}`,yl=`uniform vec3 diffuse;
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
}`,De={alphahash_fragment:to,alphahash_pars_fragment:no,alphamap_fragment:io,alphamap_pars_fragment:ro,alphatest_fragment:ao,alphatest_pars_fragment:oo,aomap_fragment:so,aomap_pars_fragment:lo,batching_pars_vertex:co,batching_vertex:fo,begin_vertex:uo,beginnormal_vertex:po,bsdfs:ho,iridescence_fragment:mo,bumpmap_pars_fragment:_o,clipping_planes_fragment:vo,clipping_planes_pars_fragment:go,clipping_planes_pars_vertex:Eo,clipping_planes_vertex:So,color_fragment:Mo,color_pars_fragment:To,color_pars_vertex:xo,color_vertex:Ao,common:Ro,cube_uv_reflection_fragment:bo,defaultnormal_vertex:Co,displacementmap_pars_vertex:Po,displacementmap_vertex:Uo,emissivemap_fragment:Lo,emissivemap_pars_fragment:Do,colorspace_fragment:wo,colorspace_pars_fragment:Io,envmap_fragment:yo,envmap_common_pars_fragment:No,envmap_pars_fragment:Oo,envmap_pars_vertex:Fo,envmap_physical_pars_fragment:qo,envmap_vertex:Bo,fog_vertex:Go,fog_pars_vertex:Ho,fog_fragment:Vo,fog_pars_fragment:ko,gradientmap_pars_fragment:Wo,lightmap_pars_fragment:zo,lights_lambert_fragment:Xo,lights_lambert_pars_fragment:Yo,lights_pars_begin:Ko,lights_toon_fragment:$o,lights_toon_pars_fragment:Zo,lights_phong_fragment:Qo,lights_phong_pars_fragment:Jo,lights_physical_fragment:jo,lights_physical_pars_fragment:es,lights_fragment_begin:ts,lights_fragment_maps:ns,lights_fragment_end:is,logdepthbuf_fragment:rs,logdepthbuf_pars_fragment:as,logdepthbuf_pars_vertex:os,logdepthbuf_vertex:ss,map_fragment:ls,map_pars_fragment:cs,map_particle_fragment:fs,map_particle_pars_fragment:us,metalnessmap_fragment:ds,metalnessmap_pars_fragment:ps,morphinstance_vertex:hs,morphcolor_vertex:ms,morphnormal_vertex:_s,morphtarget_pars_vertex:vs,morphtarget_vertex:gs,normal_fragment_begin:Es,normal_fragment_maps:Ss,normal_pars_fragment:Ms,normal_pars_vertex:Ts,normal_vertex:xs,normalmap_pars_fragment:As,clearcoat_normal_fragment_begin:Rs,clearcoat_normal_fragment_maps:bs,clearcoat_pars_fragment:Cs,iridescence_pars_fragment:Ps,opaque_fragment:Us,packing:Ls,premultiplied_alpha_fragment:Ds,project_vertex:ws,dithering_fragment:Is,dithering_pars_fragment:ys,roughnessmap_fragment:Ns,roughnessmap_pars_fragment:Os,shadowmap_pars_fragment:Fs,shadowmap_pars_vertex:Bs,shadowmap_vertex:Gs,shadowmask_pars_fragment:Hs,skinbase_vertex:Vs,skinning_pars_vertex:ks,skinning_vertex:Ws,skinnormal_vertex:zs,specularmap_fragment:Xs,specularmap_pars_fragment:Ys,tonemapping_fragment:Ks,tonemapping_pars_fragment:qs,transmission_fragment:$s,transmission_pars_fragment:Zs,uv_pars_fragment:Qs,uv_pars_vertex:Js,uv_vertex:js,worldpos_vertex:el,background_vert:tl,background_frag:nl,backgroundCube_vert:il,backgroundCube_frag:rl,cube_vert:al,cube_frag:ol,depth_vert:sl,depth_frag:ll,distanceRGBA_vert:cl,distanceRGBA_frag:fl,equirect_vert:ul,equirect_frag:dl,linedashed_vert:pl,linedashed_frag:hl,meshbasic_vert:ml,meshbasic_frag:_l,meshlambert_vert:vl,meshlambert_frag:gl,meshmatcap_vert:El,meshmatcap_frag:Sl,meshnormal_vert:Ml,meshnormal_frag:Tl,meshphong_vert:xl,meshphong_frag:Al,meshphysical_vert:Rl,meshphysical_frag:bl,meshtoon_vert:Cl,meshtoon_frag:Pl,points_vert:Ul,points_frag:Ll,shadow_vert:Dl,shadow_frag:wl,sprite_vert:Il,sprite_frag:yl},ie={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},gt={basic:{uniforms:ct([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:ct([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ze(0)}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:ct([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:ct([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:ct([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Ze(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:ct([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:ct([ie.points,ie.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:ct([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:ct([ie.common,ie.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:ct([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:ct([ie.sprite,ie.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distanceRGBA:{uniforms:ct([ie.common,ie.displacementmap,{referencePosition:{value:new We},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distanceRGBA_vert,fragmentShader:De.distanceRGBA_frag},shadow:{uniforms:ct([ie.lights,ie.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};gt.physical={uniforms:ct([gt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const rn={r:0,b:0,g:0},Ct=new vr,Nl=new $t;function Ol(e,n,t,i,l,o,h){const f=new Ze(0);let C=o===!0?0:1,x,T,v=null,E=0,g=null;function y(b){let _=b.isScene===!0?b.background:null;return _&&_.isTexture&&(_=(b.backgroundBlurriness>0?t:n).get(_)),_}function U(b){let _=!1;const O=y(b);O===null?r(f,C):O&&O.isColor&&(r(O,1),_=!0);const L=e.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,h):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,h),(e.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function c(b,_){const O=y(_);O&&(O.isCubeTexture||O.mapping===_n)?(T===void 0&&(T=new xt(new _r(1,1,1),new yt({name:"BackgroundCubeMaterial",uniforms:Ui(gt.backgroundCube.uniforms),vertexShader:gt.backgroundCube.vertexShader,fragmentShader:gt.backgroundCube.fragmentShader,side:_t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),T.geometry.deleteAttribute("normal"),T.geometry.deleteAttribute("uv"),T.onBeforeRender=function(L,N,V){this.matrixWorld.copyPosition(V.matrixWorld)},Object.defineProperty(T.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(T)),Ct.copy(_.backgroundRotation),Ct.x*=-1,Ct.y*=-1,Ct.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(Ct.y*=-1,Ct.z*=-1),T.material.uniforms.envMap.value=O,T.material.uniforms.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,T.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,T.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,T.material.uniforms.backgroundRotation.value.setFromMatrix4(Nl.makeRotationFromEuler(Ct)),T.material.toneMapped=nt.getTransfer(O.colorSpace)!==qe,(v!==O||E!==O.version||g!==e.toneMapping)&&(T.material.needsUpdate=!0,v=O,E=O.version,g=e.toneMapping),T.layers.enableAll(),b.unshift(T,T.geometry,T.material,0,0,null)):O&&O.isTexture&&(x===void 0&&(x=new xt(new cr(2,2),new yt({name:"BackgroundMaterial",uniforms:Ui(gt.background.uniforms),vertexShader:gt.background.vertexShader,fragmentShader:gt.background.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),x.geometry.deleteAttribute("normal"),Object.defineProperty(x.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(x)),x.material.uniforms.t2D.value=O,x.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,x.material.toneMapped=nt.getTransfer(O.colorSpace)!==qe,O.matrixAutoUpdate===!0&&O.updateMatrix(),x.material.uniforms.uvTransform.value.copy(O.matrix),(v!==O||E!==O.version||g!==e.toneMapping)&&(x.material.needsUpdate=!0,v=O,E=O.version,g=e.toneMapping),x.layers.enableAll(),b.unshift(x,x.geometry,x.material,0,0,null))}function r(b,_){b.getRGB(rn,mr(e)),i.buffers.color.setClear(rn.r,rn.g,rn.b,_,h)}function I(){T!==void 0&&(T.geometry.dispose(),T.material.dispose(),T=void 0),x!==void 0&&(x.geometry.dispose(),x.material.dispose(),x=void 0)}return{getClearColor:function(){return f},setClearColor:function(b,_=1){f.set(b),C=_,r(f,C)},getClearAlpha:function(){return C},setClearAlpha:function(b){C=b,r(f,C)},render:U,addToRenderList:c,dispose:I}}function Fl(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},l=E(null);let o=l,h=!1;function f(u,M,Y,X,k){let J=!1;const z=v(X,Y,M);o!==z&&(o=z,x(o.object)),J=g(u,X,Y,k),J&&y(u,X,Y,k),k!==null&&n.update(k,e.ELEMENT_ARRAY_BUFFER),(J||h)&&(h=!1,_(u,M,Y,X),k!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(k).buffer))}function C(){return e.createVertexArray()}function x(u){return e.bindVertexArray(u)}function T(u){return e.deleteVertexArray(u)}function v(u,M,Y){const X=Y.wireframe===!0;let k=i[u.id];k===void 0&&(k={},i[u.id]=k);let J=k[M.id];J===void 0&&(J={},k[M.id]=J);let z=J[X];return z===void 0&&(z=E(C()),J[X]=z),z}function E(u){const M=[],Y=[],X=[];for(let k=0;k<t;k++)M[k]=0,Y[k]=0,X[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:Y,attributeDivisors:X,object:u,attributes:{},index:null}}function g(u,M,Y,X){const k=o.attributes,J=M.attributes;let z=0;const ne=Y.getAttributes();for(const G in ne)if(ne[G].location>=0){const Te=k[G];let we=J[G];if(we===void 0&&(G==="instanceMatrix"&&u.instanceMatrix&&(we=u.instanceMatrix),G==="instanceColor"&&u.instanceColor&&(we=u.instanceColor)),Te===void 0||Te.attribute!==we||we&&Te.data!==we.data)return!0;z++}return o.attributesNum!==z||o.index!==X}function y(u,M,Y,X){const k={},J=M.attributes;let z=0;const ne=Y.getAttributes();for(const G in ne)if(ne[G].location>=0){let Te=J[G];Te===void 0&&(G==="instanceMatrix"&&u.instanceMatrix&&(Te=u.instanceMatrix),G==="instanceColor"&&u.instanceColor&&(Te=u.instanceColor));const we={};we.attribute=Te,Te&&Te.data&&(we.data=Te.data),k[G]=we,z++}o.attributes=k,o.attributesNum=z,o.index=X}function U(){const u=o.newAttributes;for(let M=0,Y=u.length;M<Y;M++)u[M]=0}function c(u){r(u,0)}function r(u,M){const Y=o.newAttributes,X=o.enabledAttributes,k=o.attributeDivisors;Y[u]=1,X[u]===0&&(e.enableVertexAttribArray(u),X[u]=1),k[u]!==M&&(e.vertexAttribDivisor(u,M),k[u]=M)}function I(){const u=o.newAttributes,M=o.enabledAttributes;for(let Y=0,X=M.length;Y<X;Y++)M[Y]!==u[Y]&&(e.disableVertexAttribArray(Y),M[Y]=0)}function b(u,M,Y,X,k,J,z){z===!0?e.vertexAttribIPointer(u,M,Y,k,J):e.vertexAttribPointer(u,M,Y,X,k,J)}function _(u,M,Y,X){U();const k=X.attributes,J=Y.getAttributes(),z=M.defaultAttributeValues;for(const ne in J){const G=J[ne];if(G.location>=0){let ve=k[ne];if(ve===void 0&&(ne==="instanceMatrix"&&u.instanceMatrix&&(ve=u.instanceMatrix),ne==="instanceColor"&&u.instanceColor&&(ve=u.instanceColor)),ve!==void 0){const Te=ve.normalized,we=ve.itemSize,Oe=n.get(ve);if(Oe===void 0)continue;const it=Oe.buffer,Ye=Oe.type,H=Oe.bytesPerElement,re=Ye===e.INT||Ye===e.UNSIGNED_INT||ve.gpuType===fr;if(ve.isInterleavedBufferAttribute){const ee=ve.data,xe=ee.stride,Ae=ve.offset;if(ee.isInstancedInterleavedBuffer){for(let Pe=0;Pe<G.locationSize;Pe++)r(G.location+Pe,ee.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Pe=0;Pe<G.locationSize;Pe++)c(G.location+Pe);e.bindBuffer(e.ARRAY_BUFFER,it);for(let Pe=0;Pe<G.locationSize;Pe++)b(G.location+Pe,we/G.locationSize,Ye,Te,xe*H,(Ae+we/G.locationSize*Pe)*H,re)}else{if(ve.isInstancedBufferAttribute){for(let ee=0;ee<G.locationSize;ee++)r(G.location+ee,ve.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let ee=0;ee<G.locationSize;ee++)c(G.location+ee);e.bindBuffer(e.ARRAY_BUFFER,it);for(let ee=0;ee<G.locationSize;ee++)b(G.location+ee,we/G.locationSize,Ye,Te,we*H,we/G.locationSize*ee*H,re)}}else if(z!==void 0){const Te=z[ne];if(Te!==void 0)switch(Te.length){case 2:e.vertexAttrib2fv(G.location,Te);break;case 3:e.vertexAttrib3fv(G.location,Te);break;case 4:e.vertexAttrib4fv(G.location,Te);break;default:e.vertexAttrib1fv(G.location,Te)}}}}I()}function O(){V();for(const u in i){const M=i[u];for(const Y in M){const X=M[Y];for(const k in X)T(X[k].object),delete X[k];delete M[Y]}delete i[u]}}function L(u){if(i[u.id]===void 0)return;const M=i[u.id];for(const Y in M){const X=M[Y];for(const k in X)T(X[k].object),delete X[k];delete M[Y]}delete i[u.id]}function N(u){for(const M in i){const Y=i[M];if(Y[u.id]===void 0)continue;const X=Y[u.id];for(const k in X)T(X[k].object),delete X[k];delete Y[u.id]}}function V(){p(),h=!0,o!==l&&(o=l,x(o.object))}function p(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:V,resetDefaultState:p,dispose:O,releaseStatesOfGeometry:L,releaseStatesOfProgram:N,initAttributes:U,enableAttribute:c,disableUnusedAttributes:I}}function Bl(e,n,t){let i;function l(x){i=x}function o(x,T){e.drawArrays(i,x,T),t.update(T,i,1)}function h(x,T,v){v!==0&&(e.drawArraysInstanced(i,x,T,v),t.update(T,i,v))}function f(x,T,v){if(v===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,x,0,T,0,v);let g=0;for(let y=0;y<v;y++)g+=T[y];t.update(g,i,1)}function C(x,T,v,E){if(v===0)return;const g=n.get("WEBGL_multi_draw");if(g===null)for(let y=0;y<x.length;y++)h(x[y],T[y],E[y]);else{g.multiDrawArraysInstancedWEBGL(i,x,0,T,0,E,0,v);let y=0;for(let U=0;U<v;U++)y+=T[U]*E[U];t.update(y,i,1)}}this.setMode=l,this.render=o,this.renderInstances=h,this.renderMultiDraw=f,this.renderMultiDrawInstances=C}function Gl(e,n,t,i){let l;function o(){if(l!==void 0)return l;if(n.has("EXT_texture_filter_anisotropic")===!0){const N=n.get("EXT_texture_filter_anisotropic");l=e.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(N){return!(N!==Tt&&i.convert(N)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(N){const V=N===hn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(N!==It&&i.convert(N)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==Dt&&!V)}function C(N){if(N==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let x=t.precision!==void 0?t.precision:"highp";const T=C(x);T!==x&&(console.warn("THREE.WebGLRenderer:",x,"not supported, using",T,"instead."),x=T);const v=t.logarithmicDepthBuffer===!0,E=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),g=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),y=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),U=e.getParameter(e.MAX_TEXTURE_SIZE),c=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),r=e.getParameter(e.MAX_VERTEX_ATTRIBS),I=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),_=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),O=y>0,L=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:C,textureFormatReadable:h,textureTypeReadable:f,precision:x,logarithmicDepthBuffer:v,reversedDepthBuffer:E,maxTextures:g,maxVertexTextures:y,maxTextureSize:U,maxCubemapSize:c,maxAttributes:r,maxVertexUniforms:I,maxVaryings:b,maxFragmentUniforms:_,vertexTextures:O,maxSamples:L}}function Hl(e){const n=this;let t=null,i=0,l=!1,o=!1;const h=new pa,f=new Be,C={value:null,needsUpdate:!1};this.uniform=C,this.numPlanes=0,this.numIntersection=0,this.init=function(v,E){const g=v.length!==0||E||i!==0||l;return l=E,i=v.length,g},this.beginShadows=function(){o=!0,T(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(v,E){t=T(v,E,0)},this.setState=function(v,E,g){const y=v.clippingPlanes,U=v.clipIntersection,c=v.clipShadows,r=e.get(v);if(!l||y===null||y.length===0||o&&!c)o?T(null):x();else{const I=o?0:i,b=I*4;let _=r.clippingState||null;C.value=_,_=T(y,E,b,g);for(let O=0;O!==b;++O)_[O]=t[O];r.clippingState=_,this.numIntersection=U?this.numPlanes:0,this.numPlanes+=I}};function x(){C.value!==t&&(C.value=t,C.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function T(v,E,g,y){const U=v!==null?v.length:0;let c=null;if(U!==0){if(c=C.value,y!==!0||c===null){const r=g+U*4,I=E.matrixWorldInverse;f.getNormalMatrix(I),(c===null||c.length<r)&&(c=new Float32Array(r));for(let b=0,_=g;b!==U;++b,_+=4)h.copy(v[b]).applyMatrix4(I,f),h.normal.toArray(c,_),c[_+3]=h.constant}C.value=c,C.needsUpdate=!0}return n.numPlanes=U,n.numIntersection=0,c}}function Vl(e){let n=new WeakMap;function t(h,f){return f===Hn?h.mapping=jt:f===Vn&&(h.mapping=Vt),h}function i(h){if(h&&h.isTexture){const f=h.mapping;if(f===Hn||f===Vn)if(n.has(h)){const C=n.get(h).texture;return t(C,h.mapping)}else{const C=h.image;if(C&&C.height>0){const x=new Pa(C.height);return x.fromEquirectangularTexture(e,h),n.set(h,x),h.addEventListener("dispose",l),t(x.texture,h.mapping)}else return null}}return h}function l(h){const f=h.target;f.removeEventListener("dispose",l);const C=n.get(f);C!==void 0&&(n.delete(f),C.dispose())}function o(){n=new WeakMap}return{get:i,dispose:o}}const Gt=4,wi=[.125,.215,.35,.446,.526,.582],Lt=20,Cn=new wa,Ii=new Ze;let Pn=null,Un=0,Ln=0,Dn=!1;const Ut=(1+Math.sqrt(5))/2,Ot=1/Ut,yi=[new We(-Ut,Ot,0),new We(Ut,Ot,0),new We(-Ot,0,Ut),new We(Ot,0,Ut),new We(0,Ut,-Ot),new We(0,Ut,Ot),new We(-1,1,-1),new We(1,1,-1),new We(-1,1,1),new We(1,1,1)],kl=new We;class Ni{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,l=100,o={}){const{size:h=256,position:f=kl}=o;Pn=this._renderer.getRenderTarget(),Un=this._renderer.getActiveCubeFace(),Ln=this._renderer.getActiveMipmapLevel(),Dn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const C=this._allocateTargets();return C.depthBuffer=!0,this._sceneToCubeUV(n,i,l,C,f),t>0&&this._blur(C,0,0,t),this._applyPMREM(C),this._cleanup(C),C}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bi(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fi(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(Pn,Un,Ln),this._renderer.xr.enabled=Dn,n.scissorTest=!1,an(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===jt||n.mapping===Vt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Pn=this._renderer.getRenderTarget(),Un=this._renderer.getActiveCubeFace(),Ln=this._renderer.getActiveMipmapLevel(),Dn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:hn,format:Tt,colorSpace:mn,depthBuffer:!1},l=Oi(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oi(n,t,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wl(o)),this._blurMaterial=zl(o,n,t)}return l}_compileMaterial(n){const t=new xt(this._lodPlanes[0],n);this._renderer.compile(t,Cn)}_sceneToCubeUV(n,t,i,l,o){const C=new ln(90,1,t,i),x=[1,-1,1,1,1,1],T=[1,1,1,-1,-1,-1],v=this._renderer,E=v.autoClear,g=v.toneMapping;v.getClearColor(Ii),v.toneMapping=At,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null));const U=new Ia({name:"PMREM.Background",side:_t,depthWrite:!1,depthTest:!1}),c=new xt(new _r,U);let r=!1;const I=n.background;I?I.isColor&&(U.color.copy(I),n.background=null,r=!0):(U.color.copy(Ii),r=!0);for(let b=0;b<6;b++){const _=b%3;_===0?(C.up.set(0,x[b],0),C.position.set(o.x,o.y,o.z),C.lookAt(o.x+T[b],o.y,o.z)):_===1?(C.up.set(0,0,x[b]),C.position.set(o.x,o.y,o.z),C.lookAt(o.x,o.y+T[b],o.z)):(C.up.set(0,x[b],0),C.position.set(o.x,o.y,o.z),C.lookAt(o.x,o.y,o.z+T[b]));const O=this._cubeSize;an(l,_*O,b>2?O:0,O,O),v.setRenderTarget(l),r&&v.render(c,C),v.render(n,C)}c.geometry.dispose(),c.material.dispose(),v.toneMapping=g,v.autoClear=E,n.background=I}_textureToCubeUV(n,t){const i=this._renderer,l=n.mapping===jt||n.mapping===Vt;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bi()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fi());const o=l?this._cubemapMaterial:this._equirectMaterial,h=new xt(this._lodPlanes[0],o),f=o.uniforms;f.envMap.value=n;const C=this._cubeSize;an(t,0,0,3*C,2*C),i.setRenderTarget(t),i.render(h,Cn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const l=this._lodPlanes.length;for(let o=1;o<l;o++){const h=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),f=yi[(l-o-1)%yi.length];this._blur(n,o-1,o,h,f)}t.autoClear=i}_blur(n,t,i,l,o){const h=this._pingPongRenderTarget;this._halfBlur(n,h,t,i,l,"latitudinal",o),this._halfBlur(h,n,i,i,l,"longitudinal",o)}_halfBlur(n,t,i,l,o,h,f){const C=this._renderer,x=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const T=3,v=new xt(this._lodPlanes[l],x),E=x.uniforms,g=this._sizeLods[i]-1,y=isFinite(o)?Math.PI/(2*g):2*Math.PI/(2*Lt-1),U=o/y,c=isFinite(o)?1+Math.floor(T*U):Lt;c>Lt&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${c} samples when the maximum is set to ${Lt}`);const r=[];let I=0;for(let N=0;N<Lt;++N){const V=N/U,p=Math.exp(-V*V/2);r.push(p),N===0?I+=p:N<c&&(I+=2*p)}for(let N=0;N<r.length;N++)r[N]=r[N]/I;E.envMap.value=n.texture,E.samples.value=c,E.weights.value=r,E.latitudinal.value=h==="latitudinal",f&&(E.poleAxis.value=f);const{_lodMax:b}=this;E.dTheta.value=y,E.mipInt.value=b-i;const _=this._sizeLods[l],O=3*_*(l>b-Gt?l-b+Gt:0),L=4*(this._cubeSize-_);an(t,O,L,3*_,2*_),C.setRenderTarget(t),C.render(v,Cn)}}function Wl(e){const n=[],t=[],i=[];let l=e;const o=e-Gt+1+wi.length;for(let h=0;h<o;h++){const f=Math.pow(2,l);t.push(f);let C=1/f;h>e-Gt?C=wi[h-e+Gt-1]:h===0&&(C=0),i.push(C);const x=1/(f-2),T=-x,v=1+x,E=[T,T,v,T,v,v,T,T,v,v,T,v],g=6,y=6,U=3,c=2,r=1,I=new Float32Array(U*y*g),b=new Float32Array(c*y*g),_=new Float32Array(r*y*g);for(let L=0;L<g;L++){const N=L%3*2/3-1,V=L>2?0:-1,p=[N,V,0,N+2/3,V,0,N+2/3,V+1,0,N,V,0,N+2/3,V+1,0,N,V+1,0];I.set(p,U*y*L),b.set(E,c*y*L);const u=[L,L,L,L,L,L];_.set(u,r*y*L)}const O=new zn;O.setAttribute("position",new qt(I,U)),O.setAttribute("uv",new qt(b,c)),O.setAttribute("faceIndex",new qt(_,r)),n.push(O),l>Gt&&l--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function Oi(e,n,t){const i=new Ht(e,n,t);return i.texture.mapping=_n,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function an(e,n,t,i,l){e.viewport.set(n,t,i,l),e.scissor.set(n,t,i,l)}function zl(e,n,t){const i=new Float32Array(Lt),l=new We(0,1,0);return new yt({name:"SphericalGaussianBlur",defines:{n:Lt,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Xn(),fragmentShader:`

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
		`,blending:wt,depthTest:!1,depthWrite:!1})}function Fi(){return new yt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xn(),fragmentShader:`

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
		`,blending:wt,depthTest:!1,depthWrite:!1})}function Bi(){return new yt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wt,depthTest:!1,depthWrite:!1})}function Xn(){return`

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
	`}function Xl(e){let n=new WeakMap,t=null;function i(f){if(f&&f.isTexture){const C=f.mapping,x=C===Hn||C===Vn,T=C===jt||C===Vt;if(x||T){let v=n.get(f);const E=v!==void 0?v.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==E)return t===null&&(t=new Ni(e)),v=x?t.fromEquirectangular(f,v):t.fromCubemap(f,v),v.texture.pmremVersion=f.pmremVersion,n.set(f,v),v.texture;if(v!==void 0)return v.texture;{const g=f.image;return x&&g&&g.height>0||T&&g&&l(g)?(t===null&&(t=new Ni(e)),v=x?t.fromEquirectangular(f):t.fromCubemap(f),v.texture.pmremVersion=f.pmremVersion,n.set(f,v),f.addEventListener("dispose",o),v.texture):null}}}return f}function l(f){let C=0;const x=6;for(let T=0;T<x;T++)f[T]!==void 0&&C++;return C===x}function o(f){const C=f.target;C.removeEventListener("dispose",o);const x=n.get(C);x!==void 0&&(n.delete(C),x.dispose())}function h(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:h}}function Yl(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let l;switch(i){case"WEBGL_depth_texture":l=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=e.getExtension(i)}return n[i]=l,l}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const l=t(i);return l===null&&sn("THREE.WebGLRenderer: "+i+" extension not supported."),l}}}function Kl(e,n,t,i){const l={},o=new WeakMap;function h(v){const E=v.target;E.index!==null&&n.remove(E.index);for(const y in E.attributes)n.remove(E.attributes[y]);E.removeEventListener("dispose",h),delete l[E.id];const g=o.get(E);g&&(n.remove(g),o.delete(E)),i.releaseStatesOfGeometry(E),E.isInstancedBufferGeometry===!0&&delete E._maxInstanceCount,t.memory.geometries--}function f(v,E){return l[E.id]===!0||(E.addEventListener("dispose",h),l[E.id]=!0,t.memory.geometries++),E}function C(v){const E=v.attributes;for(const g in E)n.update(E[g],e.ARRAY_BUFFER)}function x(v){const E=[],g=v.index,y=v.attributes.position;let U=0;if(g!==null){const I=g.array;U=g.version;for(let b=0,_=I.length;b<_;b+=3){const O=I[b+0],L=I[b+1],N=I[b+2];E.push(O,L,L,N,N,O)}}else if(y!==void 0){const I=y.array;U=y.version;for(let b=0,_=I.length/3-1;b<_;b+=3){const O=b+0,L=b+1,N=b+2;E.push(O,L,L,N,N,O)}}else return;const c=new(Oa(E)?ya:Na)(E,1);c.version=U;const r=o.get(v);r&&n.remove(r),o.set(v,c)}function T(v){const E=o.get(v);if(E){const g=v.index;g!==null&&E.version<g.version&&x(v)}else x(v);return o.get(v)}return{get:f,update:C,getWireframeAttribute:T}}function ql(e,n,t){let i;function l(E){i=E}let o,h;function f(E){o=E.type,h=E.bytesPerElement}function C(E,g){e.drawElements(i,g,o,E*h),t.update(g,i,1)}function x(E,g,y){y!==0&&(e.drawElementsInstanced(i,g,o,E*h,y),t.update(g,i,y))}function T(E,g,y){if(y===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,g,0,o,E,0,y);let c=0;for(let r=0;r<y;r++)c+=g[r];t.update(c,i,1)}function v(E,g,y,U){if(y===0)return;const c=n.get("WEBGL_multi_draw");if(c===null)for(let r=0;r<E.length;r++)x(E[r]/h,g[r],U[r]);else{c.multiDrawElementsInstancedWEBGL(i,g,0,o,E,0,U,0,y);let r=0;for(let I=0;I<y;I++)r+=g[I]*U[I];t.update(r,i,1)}}this.setMode=l,this.setIndex=f,this.render=C,this.renderInstances=x,this.renderMultiDraw=T,this.renderMultiDrawInstances=v}function $l(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,h,f){switch(t.calls++,h){case e.TRIANGLES:t.triangles+=f*(o/3);break;case e.LINES:t.lines+=f*(o/2);break;case e.LINE_STRIP:t.lines+=f*(o-1);break;case e.LINE_LOOP:t.lines+=f*o;break;case e.POINTS:t.points+=f*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:l,update:i}}function Zl(e,n,t){const i=new WeakMap,l=new ft;function o(h,f,C){const x=h.morphTargetInfluences,T=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,v=T!==void 0?T.length:0;let E=i.get(f);if(E===void 0||E.count!==v){let p=function(){N.dispose(),i.delete(f),f.removeEventListener("dispose",p)};E!==void 0&&E.texture.dispose();const g=f.morphAttributes.position!==void 0,y=f.morphAttributes.normal!==void 0,U=f.morphAttributes.color!==void 0,c=f.morphAttributes.position||[],r=f.morphAttributes.normal||[],I=f.morphAttributes.color||[];let b=0;g===!0&&(b=1),y===!0&&(b=2),U===!0&&(b=3);let _=f.attributes.position.count*b,O=1;_>n.maxTextureSize&&(O=Math.ceil(_/n.maxTextureSize),_=n.maxTextureSize);const L=new Float32Array(_*O*4*v),N=new hr(L,_,O,v);N.type=Dt,N.needsUpdate=!0;const V=b*4;for(let u=0;u<v;u++){const M=c[u],Y=r[u],X=I[u],k=_*O*4*u;for(let J=0;J<M.count;J++){const z=J*V;g===!0&&(l.fromBufferAttribute(M,J),L[k+z+0]=l.x,L[k+z+1]=l.y,L[k+z+2]=l.z,L[k+z+3]=0),y===!0&&(l.fromBufferAttribute(Y,J),L[k+z+4]=l.x,L[k+z+5]=l.y,L[k+z+6]=l.z,L[k+z+7]=0),U===!0&&(l.fromBufferAttribute(X,J),L[k+z+8]=l.x,L[k+z+9]=l.y,L[k+z+10]=l.z,L[k+z+11]=X.itemSize===4?l.w:1)}}E={count:v,texture:N,size:new ut(_,O)},i.set(f,E),f.addEventListener("dispose",p)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)C.getUniforms().setValue(e,"morphTexture",h.morphTexture,t);else{let g=0;for(let U=0;U<x.length;U++)g+=x[U];const y=f.morphTargetsRelative?1:1-g;C.getUniforms().setValue(e,"morphTargetBaseInfluence",y),C.getUniforms().setValue(e,"morphTargetInfluences",x)}C.getUniforms().setValue(e,"morphTargetsTexture",E.texture,t),C.getUniforms().setValue(e,"morphTargetsTextureSize",E.size)}return{update:o}}function Ql(e,n,t,i){let l=new WeakMap;function o(C){const x=i.render.frame,T=C.geometry,v=n.get(C,T);if(l.get(v)!==x&&(n.update(v),l.set(v,x)),C.isInstancedMesh&&(C.hasEventListener("dispose",f)===!1&&C.addEventListener("dispose",f),l.get(C)!==x&&(t.update(C.instanceMatrix,e.ARRAY_BUFFER),C.instanceColor!==null&&t.update(C.instanceColor,e.ARRAY_BUFFER),l.set(C,x))),C.isSkinnedMesh){const E=C.skeleton;l.get(E)!==x&&(E.update(),l.set(E,x))}return v}function h(){l=new WeakMap}function f(C){const x=C.target;x.removeEventListener("dispose",f),t.remove(x.instanceMatrix),x.instanceColor!==null&&t.remove(x.instanceColor)}return{update:o,dispose:h}}const Mr=new gr,Gi=new rr(1,1),Tr=new hr,xr=new Ka,Ar=new Ya,Hi=[],Vi=[],ki=new Float32Array(16),Wi=new Float32Array(9),zi=new Float32Array(4);function kt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const l=n*t;let o=Hi[l];if(o===void 0&&(o=new Float32Array(l),Hi[l]=o),n!==0){i.toArray(o,0);for(let h=1,f=0;h!==n;++h)f+=t,e[h].toArray(o,f)}return o}function rt(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function at(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function vn(e,n){let t=Vi[n];t===void 0&&(t=new Int32Array(n),Vi[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Jl(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function jl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(rt(t,n))return;e.uniform2fv(this.addr,n),at(t,n)}}function ec(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(rt(t,n))return;e.uniform3fv(this.addr,n),at(t,n)}}function tc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(rt(t,n))return;e.uniform4fv(this.addr,n),at(t,n)}}function nc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(rt(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),at(t,n)}else{if(rt(t,i))return;zi.set(i),e.uniformMatrix2fv(this.addr,!1,zi),at(t,i)}}function ic(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(rt(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),at(t,n)}else{if(rt(t,i))return;Wi.set(i),e.uniformMatrix3fv(this.addr,!1,Wi),at(t,i)}}function rc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(rt(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),at(t,n)}else{if(rt(t,i))return;ki.set(i),e.uniformMatrix4fv(this.addr,!1,ki),at(t,i)}}function ac(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function oc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(rt(t,n))return;e.uniform2iv(this.addr,n),at(t,n)}}function sc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(rt(t,n))return;e.uniform3iv(this.addr,n),at(t,n)}}function lc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(rt(t,n))return;e.uniform4iv(this.addr,n),at(t,n)}}function cc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function fc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(rt(t,n))return;e.uniform2uiv(this.addr,n),at(t,n)}}function uc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(rt(t,n))return;e.uniform3uiv(this.addr,n),at(t,n)}}function dc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(rt(t,n))return;e.uniform4uiv(this.addr,n),at(t,n)}}function pc(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l);let o;this.type===e.SAMPLER_2D_SHADOW?(Gi.compareFunction=ar,o=Gi):o=Mr,t.setTexture2D(n||o,l)}function hc(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTexture3D(n||xr,l)}function mc(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTextureCube(n||Ar,l)}function _c(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTexture2DArray(n||Tr,l)}function vc(e){switch(e){case 5126:return Jl;case 35664:return jl;case 35665:return ec;case 35666:return tc;case 35674:return nc;case 35675:return ic;case 35676:return rc;case 5124:case 35670:return ac;case 35667:case 35671:return oc;case 35668:case 35672:return sc;case 35669:case 35673:return lc;case 5125:return cc;case 36294:return fc;case 36295:return uc;case 36296:return dc;case 35678:case 36198:case 36298:case 36306:case 35682:return pc;case 35679:case 36299:case 36307:return hc;case 35680:case 36300:case 36308:case 36293:return mc;case 36289:case 36303:case 36311:case 36292:return _c}}function gc(e,n){e.uniform1fv(this.addr,n)}function Ec(e,n){const t=kt(n,this.size,2);e.uniform2fv(this.addr,t)}function Sc(e,n){const t=kt(n,this.size,3);e.uniform3fv(this.addr,t)}function Mc(e,n){const t=kt(n,this.size,4);e.uniform4fv(this.addr,t)}function Tc(e,n){const t=kt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function xc(e,n){const t=kt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function Ac(e,n){const t=kt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Rc(e,n){e.uniform1iv(this.addr,n)}function bc(e,n){e.uniform2iv(this.addr,n)}function Cc(e,n){e.uniform3iv(this.addr,n)}function Pc(e,n){e.uniform4iv(this.addr,n)}function Uc(e,n){e.uniform1uiv(this.addr,n)}function Lc(e,n){e.uniform2uiv(this.addr,n)}function Dc(e,n){e.uniform3uiv(this.addr,n)}function wc(e,n){e.uniform4uiv(this.addr,n)}function Ic(e,n,t){const i=this.cache,l=n.length,o=vn(t,l);rt(i,o)||(e.uniform1iv(this.addr,o),at(i,o));for(let h=0;h!==l;++h)t.setTexture2D(n[h]||Mr,o[h])}function yc(e,n,t){const i=this.cache,l=n.length,o=vn(t,l);rt(i,o)||(e.uniform1iv(this.addr,o),at(i,o));for(let h=0;h!==l;++h)t.setTexture3D(n[h]||xr,o[h])}function Nc(e,n,t){const i=this.cache,l=n.length,o=vn(t,l);rt(i,o)||(e.uniform1iv(this.addr,o),at(i,o));for(let h=0;h!==l;++h)t.setTextureCube(n[h]||Ar,o[h])}function Oc(e,n,t){const i=this.cache,l=n.length,o=vn(t,l);rt(i,o)||(e.uniform1iv(this.addr,o),at(i,o));for(let h=0;h!==l;++h)t.setTexture2DArray(n[h]||Tr,o[h])}function Fc(e){switch(e){case 5126:return gc;case 35664:return Ec;case 35665:return Sc;case 35666:return Mc;case 35674:return Tc;case 35675:return xc;case 35676:return Ac;case 5124:case 35670:return Rc;case 35667:case 35671:return bc;case 35668:case 35672:return Cc;case 35669:case 35673:return Pc;case 5125:return Uc;case 36294:return Lc;case 36295:return Dc;case 36296:return wc;case 35678:case 36198:case 36298:case 36306:case 35682:return Ic;case 35679:case 36299:case 36307:return yc;case 35680:case 36300:case 36308:case 36293:return Nc;case 36289:case 36303:case 36311:case 36292:return Oc}}class Bc{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=vc(t.type)}}class Gc{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fc(t.type)}}class Hc{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const l=this.seq;for(let o=0,h=l.length;o!==h;++o){const f=l[o];f.setValue(n,t[f.id],i)}}}const wn=/(\w+)(\])?(\[|\.)?/g;function Xi(e,n){e.seq.push(n),e.map[n.id]=n}function Vc(e,n,t){const i=e.name,l=i.length;for(wn.lastIndex=0;;){const o=wn.exec(i),h=wn.lastIndex;let f=o[1];const C=o[2]==="]",x=o[3];if(C&&(f=f|0),x===void 0||x==="["&&h+2===l){Xi(t,x===void 0?new Bc(f,e,n):new Gc(f,e,n));break}else{let v=t.map[f];v===void 0&&(v=new Hc(f),Xi(t,v)),t=v}}}class fn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let l=0;l<i;++l){const o=n.getActiveUniform(t,l),h=n.getUniformLocation(t,o.name);Vc(o,h,this)}}setValue(n,t,i,l){const o=this.map[t];o!==void 0&&o.setValue(n,i,l)}setOptional(n,t,i){const l=t[i];l!==void 0&&this.setValue(n,i,l)}static upload(n,t,i,l){for(let o=0,h=t.length;o!==h;++o){const f=t[o],C=i[f.id];C.needsUpdate!==!1&&f.setValue(n,C.value,l)}}static seqWithValue(n,t){const i=[];for(let l=0,o=n.length;l!==o;++l){const h=n[l];h.id in t&&i.push(h)}return i}}function Yi(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const kc=37297;let Wc=0;function zc(e,n){const t=e.split(`
`),i=[],l=Math.max(n-6,0),o=Math.min(n+6,t.length);for(let h=l;h<o;h++){const f=h+1;i.push(`${f===n?">":" "} ${f}: ${t[h]}`)}return i.join(`
`)}const Ki=new Be;function Xc(e){nt._getMatrix(Ki,nt.workingColorSpace,e);const n=`mat3( ${Ki.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(e)){case Er:return[n,"LinearTransferOETF"];case qe:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function qi(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),o=(e.getShaderInfoLog(n)||"").trim();if(i&&o==="")return"";const h=/ERROR: 0:(\d+)/.exec(o);if(h){const f=parseInt(h[1]);return t.toUpperCase()+`

`+o+`

`+zc(e.getShaderSource(n),f)}else return o}function Yc(e,n){const t=Xc(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Kc(e,n){let t;switch(n){case Xa:t="Linear";break;case za:t="Reinhard";break;case Wa:t="Cineon";break;case ka:t="ACESFilmic";break;case Va:t="AgX";break;case Ha:t="Neutral";break;case Ga:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const on=new We;function qc(){nt.getLuminanceCoefficients(on);const e=on.x.toFixed(4),n=on.y.toFixed(4),t=on.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $c(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yt).join(`
`)}function Zc(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Qc(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let l=0;l<i;l++){const o=e.getActiveAttrib(n,l),h=o.name;let f=1;o.type===e.FLOAT_MAT2&&(f=2),o.type===e.FLOAT_MAT3&&(f=3),o.type===e.FLOAT_MAT4&&(f=4),t[h]={type:o.type,location:e.getAttribLocation(n,h),locationSize:f}}return t}function Yt(e){return e!==""}function $i(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Zi(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Jc=/^[ \t]*#include +<([\w\d./]+)>/gm;function kn(e){return e.replace(Jc,ef)}const jc=new Map;function ef(e,n){let t=De[n];if(t===void 0){const i=jc.get(n);if(i!==void 0)t=De[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return kn(t)}const tf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qi(e){return e.replace(tf,nf)}function nf(e,n,t,i){let l="";for(let o=parseInt(n);o<parseInt(t);o++)l+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return l}function Ji(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}function rf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===or?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===Ba?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===St&&(n="SHADOWMAP_TYPE_VSM"),n}function af(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case jt:case Vt:n="ENVMAP_TYPE_CUBE";break;case _n:n="ENVMAP_TYPE_CUBE_UV";break}return n}function of(e){let n="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case Vt:n="ENVMAP_MODE_REFRACTION";break}return n}function sf(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Qa:n="ENVMAP_BLENDING_MULTIPLY";break;case Za:n="ENVMAP_BLENDING_MIX";break;case $a:n="ENVMAP_BLENDING_ADD";break}return n}function lf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function cf(e,n,t,i){const l=e.getContext(),o=t.defines;let h=t.vertexShader,f=t.fragmentShader;const C=rf(t),x=af(t),T=of(t),v=sf(t),E=lf(t),g=$c(t),y=Zc(o),U=l.createProgram();let c,r,I=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(c=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Yt).join(`
`),c.length>0&&(c+=`
`),r=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Yt).join(`
`),r.length>0&&(r+=`
`)):(c=[Ji(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+T:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+C:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yt).join(`
`),r=[Ji(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+x:"",t.envMap?"#define "+T:"",t.envMap?"#define "+v:"",E?"#define CUBEUV_TEXEL_WIDTH "+E.texelWidth:"",E?"#define CUBEUV_TEXEL_HEIGHT "+E.texelHeight:"",E?"#define CUBEUV_MAX_MIP "+E.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+C:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==At?"#define TONE_MAPPING":"",t.toneMapping!==At?De.tonemapping_pars_fragment:"",t.toneMapping!==At?Kc("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,Yc("linearToOutputTexel",t.outputColorSpace),qc(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Yt).join(`
`)),h=kn(h),h=$i(h,t),h=Zi(h,t),f=kn(f),f=$i(f,t),f=Zi(f,t),h=Qi(h),f=Qi(f),t.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,c=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+c,r=["#define varying in",t.glslVersion===Di?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Di?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+r);const b=I+c+h,_=I+r+f,O=Yi(l,l.VERTEX_SHADER,b),L=Yi(l,l.FRAGMENT_SHADER,_);l.attachShader(U,O),l.attachShader(U,L),t.index0AttributeName!==void 0?l.bindAttribLocation(U,0,t.index0AttributeName):t.morphTargets===!0&&l.bindAttribLocation(U,0,"position"),l.linkProgram(U);function N(M){if(e.debug.checkShaderErrors){const Y=l.getProgramInfoLog(U)||"",X=l.getShaderInfoLog(O)||"",k=l.getShaderInfoLog(L)||"",J=Y.trim(),z=X.trim(),ne=k.trim();let G=!0,ve=!0;if(l.getProgramParameter(U,l.LINK_STATUS)===!1)if(G=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(l,U,O,L);else{const Te=qi(l,O,"vertex"),we=qi(l,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(U,l.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+J+`
`+Te+`
`+we)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(z===""||ne==="")&&(ve=!1);ve&&(M.diagnostics={runnable:G,programLog:J,vertexShader:{log:z,prefix:c},fragmentShader:{log:ne,prefix:r}})}l.deleteShader(O),l.deleteShader(L),V=new fn(l,U),p=Qc(l,U)}let V;this.getUniforms=function(){return V===void 0&&N(this),V};let p;this.getAttributes=function(){return p===void 0&&N(this),p};let u=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return u===!1&&(u=l.getProgramParameter(U,kc)),u},this.destroy=function(){i.releaseStatesOfProgram(this),l.deleteProgram(U),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wc++,this.cacheKey=n,this.usedTimes=1,this.program=U,this.vertexShader=O,this.fragmentShader=L,this}let ff=0;class uf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,l=this._getShaderStage(t),o=this._getShaderStage(i),h=this._getShaderCacheForMaterial(n);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(o)===!1&&(h.add(o),o.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new df(n),t.set(n,i)),i}}class df{constructor(n){this.id=ff++,this.code=n,this.usedTimes=0}}function pf(e,n,t,i,l,o,h){const f=new Fa,C=new uf,x=new Set,T=[],v=l.logarithmicDepthBuffer,E=l.vertexTextures;let g=l.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function U(p){return x.add(p),p===0?"uv":`uv${p}`}function c(p,u,M,Y,X){const k=Y.fog,J=X.geometry,z=p.isMeshStandardMaterial?Y.environment:null,ne=(p.isMeshStandardMaterial?t:n).get(p.envMap||z),G=ne&&ne.mapping===_n?ne.image.height:null,ve=y[p.type];p.precision!==null&&(g=l.getMaxPrecision(p.precision),g!==p.precision&&console.warn("THREE.WebGLProgram.getParameters:",p.precision,"not supported, using",g,"instead."));const Te=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,we=Te!==void 0?Te.length:0;let Oe=0;J.morphAttributes.position!==void 0&&(Oe=1),J.morphAttributes.normal!==void 0&&(Oe=2),J.morphAttributes.color!==void 0&&(Oe=3);let it,Ye,H,re;if(ve){const He=gt[ve];it=He.vertexShader,Ye=He.fragmentShader}else it=p.vertexShader,Ye=p.fragmentShader,C.update(p),H=C.getVertexShaderID(p),re=C.getFragmentShaderID(p);const ee=e.getRenderTarget(),xe=e.state.buffers.depth.getReversed(),Ae=X.isInstancedMesh===!0,Pe=X.isBatchedMesh===!0,et=!!p.map,Ne=!!p.matcap,m=!!ne,ze=!!p.aoMap,Se=!!p.lightMap,Ge=!!p.bumpMap,ge=!!p.normalMap,$e=!!p.displacementMap,fe=!!p.emissiveMap,Ie=!!p.metalnessMap,ot=!!p.roughnessMap,tt=p.anisotropy>0,d=p.clearcoat>0,a=p.dispersion>0,P=p.iridescence>0,B=p.sheen>0,K=p.transmission>0,F=tt&&!!p.anisotropyMap,_e=d&&!!p.clearcoatMap,j=d&&!!p.clearcoatNormalMap,pe=d&&!!p.clearcoatRoughnessMap,he=P&&!!p.iridescenceMap,Z=P&&!!p.iridescenceThicknessMap,se=B&&!!p.sheenColorMap,be=B&&!!p.sheenRoughnessMap,me=!!p.specularMap,ae=!!p.specularColorMap,Le=!!p.specularIntensityMap,S=K&&!!p.transmissionMap,Q=K&&!!p.thicknessMap,te=!!p.gradientMap,ce=!!p.alphaMap,q=p.alphaTest>0,W=!!p.alphaHash,de=!!p.extensions;let Ue=At;p.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ue=e.toneMapping);const Xe={shaderID:ve,shaderType:p.type,shaderName:p.name,vertexShader:it,fragmentShader:Ye,defines:p.defines,customVertexShaderID:H,customFragmentShaderID:re,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:g,batching:Pe,batchingColor:Pe&&X._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&X.instanceColor!==null,instancingMorph:Ae&&X.morphTexture!==null,supportsVertexTextures:E,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:mn,alphaToCoverage:!!p.alphaToCoverage,map:et,matcap:Ne,envMap:m,envMapMode:m&&ne.mapping,envMapCubeUVHeight:G,aoMap:ze,lightMap:Se,bumpMap:Ge,normalMap:ge,displacementMap:E&&$e,emissiveMap:fe,normalMapObjectSpace:ge&&p.normalMapType===Da,normalMapTangentSpace:ge&&p.normalMapType===La,metalnessMap:Ie,roughnessMap:ot,anisotropy:tt,anisotropyMap:F,clearcoat:d,clearcoatMap:_e,clearcoatNormalMap:j,clearcoatRoughnessMap:pe,dispersion:a,iridescence:P,iridescenceMap:he,iridescenceThicknessMap:Z,sheen:B,sheenColorMap:se,sheenRoughnessMap:be,specularMap:me,specularColorMap:ae,specularIntensityMap:Le,transmission:K,transmissionMap:S,thicknessMap:Q,gradientMap:te,opaque:p.transparent===!1&&p.blending===cn&&p.alphaToCoverage===!1,alphaMap:ce,alphaTest:q,alphaHash:W,combine:p.combine,mapUv:et&&U(p.map.channel),aoMapUv:ze&&U(p.aoMap.channel),lightMapUv:Se&&U(p.lightMap.channel),bumpMapUv:Ge&&U(p.bumpMap.channel),normalMapUv:ge&&U(p.normalMap.channel),displacementMapUv:$e&&U(p.displacementMap.channel),emissiveMapUv:fe&&U(p.emissiveMap.channel),metalnessMapUv:Ie&&U(p.metalnessMap.channel),roughnessMapUv:ot&&U(p.roughnessMap.channel),anisotropyMapUv:F&&U(p.anisotropyMap.channel),clearcoatMapUv:_e&&U(p.clearcoatMap.channel),clearcoatNormalMapUv:j&&U(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&U(p.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&U(p.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&U(p.iridescenceThicknessMap.channel),sheenColorMapUv:se&&U(p.sheenColorMap.channel),sheenRoughnessMapUv:be&&U(p.sheenRoughnessMap.channel),specularMapUv:me&&U(p.specularMap.channel),specularColorMapUv:ae&&U(p.specularColorMap.channel),specularIntensityMapUv:Le&&U(p.specularIntensityMap.channel),transmissionMapUv:S&&U(p.transmissionMap.channel),thicknessMapUv:Q&&U(p.thicknessMap.channel),alphaMapUv:ce&&U(p.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(ge||tt),vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!J.attributes.uv&&(et||ce),fog:!!k,useFog:p.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:p.flatShading===!0&&p.wireframe===!1,sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:xe,skinning:X.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Oe,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numSpotLightMaps:u.spotLightMap.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numSpotLightShadowsWithMaps:u.numSpotLightShadowsWithMaps,numLightProbes:u.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:p.dithering,shadowMapEnabled:e.shadowMap.enabled&&M.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ue,decodeVideoTexture:et&&p.map.isVideoTexture===!0&&nt.getTransfer(p.map.colorSpace)===qe,decodeVideoTextureEmissive:fe&&p.emissiveMap.isVideoTexture===!0&&nt.getTransfer(p.emissiveMap.colorSpace)===qe,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===Mt,flipSided:p.side===_t,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:de&&p.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&p.extensions.multiDraw===!0||Pe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return Xe.vertexUv1s=x.has(1),Xe.vertexUv2s=x.has(2),Xe.vertexUv3s=x.has(3),x.clear(),Xe}function r(p){const u=[];if(p.shaderID?u.push(p.shaderID):(u.push(p.customVertexShaderID),u.push(p.customFragmentShaderID)),p.defines!==void 0)for(const M in p.defines)u.push(M),u.push(p.defines[M]);return p.isRawShaderMaterial===!1&&(I(u,p),b(u,p),u.push(e.outputColorSpace)),u.push(p.customProgramCacheKey),u.join()}function I(p,u){p.push(u.precision),p.push(u.outputColorSpace),p.push(u.envMapMode),p.push(u.envMapCubeUVHeight),p.push(u.mapUv),p.push(u.alphaMapUv),p.push(u.lightMapUv),p.push(u.aoMapUv),p.push(u.bumpMapUv),p.push(u.normalMapUv),p.push(u.displacementMapUv),p.push(u.emissiveMapUv),p.push(u.metalnessMapUv),p.push(u.roughnessMapUv),p.push(u.anisotropyMapUv),p.push(u.clearcoatMapUv),p.push(u.clearcoatNormalMapUv),p.push(u.clearcoatRoughnessMapUv),p.push(u.iridescenceMapUv),p.push(u.iridescenceThicknessMapUv),p.push(u.sheenColorMapUv),p.push(u.sheenRoughnessMapUv),p.push(u.specularMapUv),p.push(u.specularColorMapUv),p.push(u.specularIntensityMapUv),p.push(u.transmissionMapUv),p.push(u.thicknessMapUv),p.push(u.combine),p.push(u.fogExp2),p.push(u.sizeAttenuation),p.push(u.morphTargetsCount),p.push(u.morphAttributeCount),p.push(u.numDirLights),p.push(u.numPointLights),p.push(u.numSpotLights),p.push(u.numSpotLightMaps),p.push(u.numHemiLights),p.push(u.numRectAreaLights),p.push(u.numDirLightShadows),p.push(u.numPointLightShadows),p.push(u.numSpotLightShadows),p.push(u.numSpotLightShadowsWithMaps),p.push(u.numLightProbes),p.push(u.shadowMapType),p.push(u.toneMapping),p.push(u.numClippingPlanes),p.push(u.numClipIntersection),p.push(u.depthPacking)}function b(p,u){f.disableAll(),u.supportsVertexTextures&&f.enable(0),u.instancing&&f.enable(1),u.instancingColor&&f.enable(2),u.instancingMorph&&f.enable(3),u.matcap&&f.enable(4),u.envMap&&f.enable(5),u.normalMapObjectSpace&&f.enable(6),u.normalMapTangentSpace&&f.enable(7),u.clearcoat&&f.enable(8),u.iridescence&&f.enable(9),u.alphaTest&&f.enable(10),u.vertexColors&&f.enable(11),u.vertexAlphas&&f.enable(12),u.vertexUv1s&&f.enable(13),u.vertexUv2s&&f.enable(14),u.vertexUv3s&&f.enable(15),u.vertexTangents&&f.enable(16),u.anisotropy&&f.enable(17),u.alphaHash&&f.enable(18),u.batching&&f.enable(19),u.dispersion&&f.enable(20),u.batchingColor&&f.enable(21),u.gradientMap&&f.enable(22),p.push(f.mask),f.disableAll(),u.fog&&f.enable(0),u.useFog&&f.enable(1),u.flatShading&&f.enable(2),u.logarithmicDepthBuffer&&f.enable(3),u.reversedDepthBuffer&&f.enable(4),u.skinning&&f.enable(5),u.morphTargets&&f.enable(6),u.morphNormals&&f.enable(7),u.morphColors&&f.enable(8),u.premultipliedAlpha&&f.enable(9),u.shadowMapEnabled&&f.enable(10),u.doubleSided&&f.enable(11),u.flipSided&&f.enable(12),u.useDepthPacking&&f.enable(13),u.dithering&&f.enable(14),u.transmission&&f.enable(15),u.sheen&&f.enable(16),u.opaque&&f.enable(17),u.pointsUvs&&f.enable(18),u.decodeVideoTexture&&f.enable(19),u.decodeVideoTextureEmissive&&f.enable(20),u.alphaToCoverage&&f.enable(21),p.push(f.mask)}function _(p){const u=y[p.type];let M;if(u){const Y=gt[u];M=Ua.clone(Y.uniforms)}else M=p.uniforms;return M}function O(p,u){let M;for(let Y=0,X=T.length;Y<X;Y++){const k=T[Y];if(k.cacheKey===u){M=k,++M.usedTimes;break}}return M===void 0&&(M=new cf(e,u,p,o),T.push(M)),M}function L(p){if(--p.usedTimes===0){const u=T.indexOf(p);T[u]=T[T.length-1],T.pop(),p.destroy()}}function N(p){C.remove(p)}function V(){C.dispose()}return{getParameters:c,getProgramCacheKey:r,getUniforms:_,acquireProgram:O,releaseProgram:L,releaseShaderCache:N,programs:T,dispose:V}}function hf(){let e=new WeakMap;function n(h){return e.has(h)}function t(h){let f=e.get(h);return f===void 0&&(f={},e.set(h,f)),f}function i(h){e.delete(h)}function l(h,f,C){e.get(h)[f]=C}function o(){e=new WeakMap}return{has:n,get:t,remove:i,update:l,dispose:o}}function mf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function ji(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function er(){const e=[];let n=0;const t=[],i=[],l=[];function o(){n=0,t.length=0,i.length=0,l.length=0}function h(v,E,g,y,U,c){let r=e[n];return r===void 0?(r={id:v.id,object:v,geometry:E,material:g,groupOrder:y,renderOrder:v.renderOrder,z:U,group:c},e[n]=r):(r.id=v.id,r.object=v,r.geometry=E,r.material=g,r.groupOrder=y,r.renderOrder=v.renderOrder,r.z=U,r.group=c),n++,r}function f(v,E,g,y,U,c){const r=h(v,E,g,y,U,c);g.transmission>0?i.push(r):g.transparent===!0?l.push(r):t.push(r)}function C(v,E,g,y,U,c){const r=h(v,E,g,y,U,c);g.transmission>0?i.unshift(r):g.transparent===!0?l.unshift(r):t.unshift(r)}function x(v,E){t.length>1&&t.sort(v||mf),i.length>1&&i.sort(E||ji),l.length>1&&l.sort(E||ji)}function T(){for(let v=n,E=e.length;v<E;v++){const g=e[v];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:l,init:o,push:f,unshift:C,finish:T,sort:x}}function _f(){let e=new WeakMap;function n(i,l){const o=e.get(i);let h;return o===void 0?(h=new er,e.set(i,[h])):l>=o.length?(h=new er,o.push(h)):h=o[l],h}function t(){e=new WeakMap}return{get:n,dispose:t}}function vf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new We,color:new Ze};break;case"SpotLight":t={position:new We,direction:new We,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new We,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new We,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new We,halfWidth:new We,halfHeight:new We};break}return e[n.id]=t,t}}}function gf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Ef=0;function Sf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Mf(e){const n=new vf,t=gf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let x=0;x<9;x++)i.probe.push(new We);const l=new We,o=new $t,h=new $t;function f(x){let T=0,v=0,E=0;for(let p=0;p<9;p++)i.probe[p].set(0,0,0);let g=0,y=0,U=0,c=0,r=0,I=0,b=0,_=0,O=0,L=0,N=0;x.sort(Sf);for(let p=0,u=x.length;p<u;p++){const M=x[p],Y=M.color,X=M.intensity,k=M.distance,J=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)T+=Y.r*X,v+=Y.g*X,E+=Y.b*X;else if(M.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(M.sh.coefficients[z],X);N++}else if(M.isDirectionalLight){const z=n.get(M);if(z.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const ne=M.shadow,G=t.get(M);G.shadowIntensity=ne.intensity,G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,i.directionalShadow[g]=G,i.directionalShadowMap[g]=J,i.directionalShadowMatrix[g]=M.shadow.matrix,I++}i.directional[g]=z,g++}else if(M.isSpotLight){const z=n.get(M);z.position.setFromMatrixPosition(M.matrixWorld),z.color.copy(Y).multiplyScalar(X),z.distance=k,z.coneCos=Math.cos(M.angle),z.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),z.decay=M.decay,i.spot[U]=z;const ne=M.shadow;if(M.map&&(i.spotLightMap[O]=M.map,O++,ne.updateMatrices(M),M.castShadow&&L++),i.spotLightMatrix[U]=ne.matrix,M.castShadow){const G=t.get(M);G.shadowIntensity=ne.intensity,G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,i.spotShadow[U]=G,i.spotShadowMap[U]=J,_++}U++}else if(M.isRectAreaLight){const z=n.get(M);z.color.copy(Y).multiplyScalar(X),z.halfWidth.set(M.width*.5,0,0),z.halfHeight.set(0,M.height*.5,0),i.rectArea[c]=z,c++}else if(M.isPointLight){const z=n.get(M);if(z.color.copy(M.color).multiplyScalar(M.intensity),z.distance=M.distance,z.decay=M.decay,M.castShadow){const ne=M.shadow,G=t.get(M);G.shadowIntensity=ne.intensity,G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,G.shadowCameraNear=ne.camera.near,G.shadowCameraFar=ne.camera.far,i.pointShadow[y]=G,i.pointShadowMap[y]=J,i.pointShadowMatrix[y]=M.shadow.matrix,b++}i.point[y]=z,y++}else if(M.isHemisphereLight){const z=n.get(M);z.skyColor.copy(M.color).multiplyScalar(X),z.groundColor.copy(M.groundColor).multiplyScalar(X),i.hemi[r]=z,r++}}c>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ie.LTC_FLOAT_1,i.rectAreaLTC2=ie.LTC_FLOAT_2):(i.rectAreaLTC1=ie.LTC_HALF_1,i.rectAreaLTC2=ie.LTC_HALF_2)),i.ambient[0]=T,i.ambient[1]=v,i.ambient[2]=E;const V=i.hash;(V.directionalLength!==g||V.pointLength!==y||V.spotLength!==U||V.rectAreaLength!==c||V.hemiLength!==r||V.numDirectionalShadows!==I||V.numPointShadows!==b||V.numSpotShadows!==_||V.numSpotMaps!==O||V.numLightProbes!==N)&&(i.directional.length=g,i.spot.length=U,i.rectArea.length=c,i.point.length=y,i.hemi.length=r,i.directionalShadow.length=I,i.directionalShadowMap.length=I,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=I,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=_+O-L,i.spotLightMap.length=O,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=N,V.directionalLength=g,V.pointLength=y,V.spotLength=U,V.rectAreaLength=c,V.hemiLength=r,V.numDirectionalShadows=I,V.numPointShadows=b,V.numSpotShadows=_,V.numSpotMaps=O,V.numLightProbes=N,i.version=Ef++)}function C(x,T){let v=0,E=0,g=0,y=0,U=0;const c=T.matrixWorldInverse;for(let r=0,I=x.length;r<I;r++){const b=x[r];if(b.isDirectionalLight){const _=i.directional[v];_.direction.setFromMatrixPosition(b.matrixWorld),l.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(l),_.direction.transformDirection(c),v++}else if(b.isSpotLight){const _=i.spot[g];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(c),_.direction.setFromMatrixPosition(b.matrixWorld),l.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(l),_.direction.transformDirection(c),g++}else if(b.isRectAreaLight){const _=i.rectArea[y];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(c),h.identity(),o.copy(b.matrixWorld),o.premultiply(c),h.extractRotation(o),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(h),_.halfHeight.applyMatrix4(h),y++}else if(b.isPointLight){const _=i.point[E];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(c),E++}else if(b.isHemisphereLight){const _=i.hemi[U];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(c),U++}}}return{setup:f,setupView:C,state:i}}function tr(e){const n=new Mf(e),t=[],i=[];function l(T){x.camera=T,t.length=0,i.length=0}function o(T){t.push(T)}function h(T){i.push(T)}function f(){n.setup(t)}function C(T){n.setupView(t,T)}const x={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:l,state:x,setupLights:f,setupLightsView:C,pushLight:o,pushShadow:h}}function Tf(e){let n=new WeakMap;function t(l,o=0){const h=n.get(l);let f;return h===void 0?(f=new tr(e),n.set(l,[f])):o>=h.length?(f=new tr(e),h.push(f)):f=h[o],f}function i(){n=new WeakMap}return{get:t,dispose:i}}const xf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Af=`uniform sampler2D shadow_pass;
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
}`;function Rf(e,n,t){let i=new ir;const l=new ut,o=new ut,h=new ft,f=new ha({depthPacking:ma}),C=new _a,x={},T=t.maxTextureSize,v={[Zt]:_t,[_t]:Zt,[Mt]:Mt},E=new yt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:xf,fragmentShader:Af}),g=E.clone();g.defines.HORIZONTAL_PASS=1;const y=new zn;y.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const U=new xt(y,E),c=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=or;let r=this.type;this.render=function(L,N,V){if(c.enabled===!1||c.autoUpdate===!1&&c.needsUpdate===!1||L.length===0)return;const p=e.getRenderTarget(),u=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),Y=e.state;Y.setBlending(wt),Y.buffers.depth.getReversed()?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const X=r!==St&&this.type===St,k=r===St&&this.type!==St;for(let J=0,z=L.length;J<z;J++){const ne=L[J],G=ne.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const ve=G.getFrameExtents();if(l.multiply(ve),o.copy(G.mapSize),(l.x>T||l.y>T)&&(l.x>T&&(o.x=Math.floor(T/ve.x),l.x=o.x*ve.x,G.mapSize.x=o.x),l.y>T&&(o.y=Math.floor(T/ve.y),l.y=o.y*ve.y,G.mapSize.y=o.y)),G.map===null||X===!0||k===!0){const we=this.type!==St?{minFilter:Kt,magFilter:Kt}:{};G.map!==null&&G.map.dispose(),G.map=new Ht(l.x,l.y,we),G.map.texture.name=ne.name+".shadowMap",G.camera.updateProjectionMatrix()}e.setRenderTarget(G.map),e.clear();const Te=G.getViewportCount();for(let we=0;we<Te;we++){const Oe=G.getViewport(we);h.set(o.x*Oe.x,o.y*Oe.y,o.x*Oe.z,o.y*Oe.w),Y.viewport(h),G.updateMatrices(ne,we),i=G.getFrustum(),_(N,V,G.camera,ne,this.type)}G.isPointLightShadow!==!0&&this.type===St&&I(G,V),G.needsUpdate=!1}r=this.type,c.needsUpdate=!1,e.setRenderTarget(p,u,M)};function I(L,N){const V=n.update(U);E.defines.VSM_SAMPLES!==L.blurSamples&&(E.defines.VSM_SAMPLES=L.blurSamples,g.defines.VSM_SAMPLES=L.blurSamples,E.needsUpdate=!0,g.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Ht(l.x,l.y)),E.uniforms.shadow_pass.value=L.map.texture,E.uniforms.resolution.value=L.mapSize,E.uniforms.radius.value=L.radius,e.setRenderTarget(L.mapPass),e.clear(),e.renderBufferDirect(N,null,V,E,U,null),g.uniforms.shadow_pass.value=L.mapPass.texture,g.uniforms.resolution.value=L.mapSize,g.uniforms.radius.value=L.radius,e.setRenderTarget(L.map),e.clear(),e.renderBufferDirect(N,null,V,g,U,null)}function b(L,N,V,p){let u=null;const M=V.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(M!==void 0)u=M;else if(u=V.isPointLight===!0?C:f,e.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const Y=u.uuid,X=N.uuid;let k=x[Y];k===void 0&&(k={},x[Y]=k);let J=k[X];J===void 0&&(J=u.clone(),k[X]=J,N.addEventListener("dispose",O)),u=J}if(u.visible=N.visible,u.wireframe=N.wireframe,p===St?u.side=N.shadowSide!==null?N.shadowSide:N.side:u.side=N.shadowSide!==null?N.shadowSide:v[N.side],u.alphaMap=N.alphaMap,u.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,u.map=N.map,u.clipShadows=N.clipShadows,u.clippingPlanes=N.clippingPlanes,u.clipIntersection=N.clipIntersection,u.displacementMap=N.displacementMap,u.displacementScale=N.displacementScale,u.displacementBias=N.displacementBias,u.wireframeLinewidth=N.wireframeLinewidth,u.linewidth=N.linewidth,V.isPointLight===!0&&u.isMeshDistanceMaterial===!0){const Y=e.properties.get(u);Y.light=V}return u}function _(L,N,V,p,u){if(L.visible===!1)return;if(L.layers.test(N.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&u===St)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,L.matrixWorld);const X=n.update(L),k=L.material;if(Array.isArray(k)){const J=X.groups;for(let z=0,ne=J.length;z<ne;z++){const G=J[z],ve=k[G.materialIndex];if(ve&&ve.visible){const Te=b(L,ve,p,u);L.onBeforeShadow(e,L,N,V,X,Te,G),e.renderBufferDirect(V,null,X,Te,L,G),L.onAfterShadow(e,L,N,V,X,Te,G)}}}else if(k.visible){const J=b(L,k,p,u);L.onBeforeShadow(e,L,N,V,X,J,null),e.renderBufferDirect(V,null,X,J,L,null),L.onAfterShadow(e,L,N,V,X,J,null)}}const Y=L.children;for(let X=0,k=Y.length;X<k;X++)_(Y[X],N,V,p,u)}function O(L){L.target.removeEventListener("dispose",O);for(const V in x){const p=x[V],u=L.target.uuid;u in p&&(p[u].dispose(),delete p[u])}}}const bf={[Gn]:Bn,[Fn]:yn,[On]:In,[dn]:Nn,[Bn]:Gn,[yn]:Fn,[In]:On,[Nn]:dn};function Cf(e,n){function t(){let S=!1;const Q=new ft;let te=null;const ce=new ft(0,0,0,0);return{setMask:function(q){te!==q&&!S&&(e.colorMask(q,q,q,q),te=q)},setLocked:function(q){S=q},setClear:function(q,W,de,Ue,Xe){Xe===!0&&(q*=Ue,W*=Ue,de*=Ue),Q.set(q,W,de,Ue),ce.equals(Q)===!1&&(e.clearColor(q,W,de,Ue),ce.copy(Q))},reset:function(){S=!1,te=null,ce.set(-1,0,0,0)}}}function i(){let S=!1,Q=!1,te=null,ce=null,q=null;return{setReversed:function(W){if(Q!==W){const de=n.get("EXT_clip_control");W?de.clipControlEXT(de.LOWER_LEFT_EXT,de.ZERO_TO_ONE_EXT):de.clipControlEXT(de.LOWER_LEFT_EXT,de.NEGATIVE_ONE_TO_ONE_EXT),Q=W;const Ue=q;q=null,this.setClear(Ue)}},getReversed:function(){return Q},setTest:function(W){W?ee(e.DEPTH_TEST):xe(e.DEPTH_TEST)},setMask:function(W){te!==W&&!S&&(e.depthMask(W),te=W)},setFunc:function(W){if(Q&&(W=bf[W]),ce!==W){switch(W){case Gn:e.depthFunc(e.NEVER);break;case Bn:e.depthFunc(e.ALWAYS);break;case Fn:e.depthFunc(e.LESS);break;case dn:e.depthFunc(e.LEQUAL);break;case On:e.depthFunc(e.EQUAL);break;case Nn:e.depthFunc(e.GEQUAL);break;case yn:e.depthFunc(e.GREATER);break;case In:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ce=W}},setLocked:function(W){S=W},setClear:function(W){q!==W&&(Q&&(W=1-W),e.clearDepth(W),q=W)},reset:function(){S=!1,te=null,ce=null,q=null,Q=!1}}}function l(){let S=!1,Q=null,te=null,ce=null,q=null,W=null,de=null,Ue=null,Xe=null;return{setTest:function(He){S||(He?ee(e.STENCIL_TEST):xe(e.STENCIL_TEST))},setMask:function(He){Q!==He&&!S&&(e.stencilMask(He),Q=He)},setFunc:function(He,Et,vt){(te!==He||ce!==Et||q!==vt)&&(e.stencilFunc(He,Et,vt),te=He,ce=Et,q=vt)},setOp:function(He,Et,vt){(W!==He||de!==Et||Ue!==vt)&&(e.stencilOp(He,Et,vt),W=He,de=Et,Ue=vt)},setLocked:function(He){S=He},setClear:function(He){Xe!==He&&(e.clearStencil(He),Xe=He)},reset:function(){S=!1,Q=null,te=null,ce=null,q=null,W=null,de=null,Ue=null,Xe=null}}}const o=new t,h=new i,f=new l,C=new WeakMap,x=new WeakMap;let T={},v={},E=new WeakMap,g=[],y=null,U=!1,c=null,r=null,I=null,b=null,_=null,O=null,L=null,N=new Ze(0,0,0),V=0,p=!1,u=null,M=null,Y=null,X=null,k=null;const J=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,ne=0;const G=e.getParameter(e.VERSION);G.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(G)[1]),z=ne>=1):G.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),z=ne>=2);let ve=null,Te={};const we=e.getParameter(e.SCISSOR_BOX),Oe=e.getParameter(e.VIEWPORT),it=new ft().fromArray(we),Ye=new ft().fromArray(Oe);function H(S,Q,te,ce){const q=new Uint8Array(4),W=e.createTexture();e.bindTexture(S,W),e.texParameteri(S,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(S,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let de=0;de<te;de++)S===e.TEXTURE_3D||S===e.TEXTURE_2D_ARRAY?e.texImage3D(Q,0,e.RGBA,1,1,ce,0,e.RGBA,e.UNSIGNED_BYTE,q):e.texImage2D(Q+de,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,q);return W}const re={};re[e.TEXTURE_2D]=H(e.TEXTURE_2D,e.TEXTURE_2D,1),re[e.TEXTURE_CUBE_MAP]=H(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[e.TEXTURE_2D_ARRAY]=H(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),re[e.TEXTURE_3D]=H(e.TEXTURE_3D,e.TEXTURE_3D,1,1),o.setClear(0,0,0,1),h.setClear(1),f.setClear(0),ee(e.DEPTH_TEST),h.setFunc(dn),Ge(!1),ge(Ri),ee(e.CULL_FACE),ze(wt);function ee(S){T[S]!==!0&&(e.enable(S),T[S]=!0)}function xe(S){T[S]!==!1&&(e.disable(S),T[S]=!1)}function Ae(S,Q){return v[S]!==Q?(e.bindFramebuffer(S,Q),v[S]=Q,S===e.DRAW_FRAMEBUFFER&&(v[e.FRAMEBUFFER]=Q),S===e.FRAMEBUFFER&&(v[e.DRAW_FRAMEBUFFER]=Q),!0):!1}function Pe(S,Q){let te=g,ce=!1;if(S){te=E.get(Q),te===void 0&&(te=[],E.set(Q,te));const q=S.textures;if(te.length!==q.length||te[0]!==e.COLOR_ATTACHMENT0){for(let W=0,de=q.length;W<de;W++)te[W]=e.COLOR_ATTACHMENT0+W;te.length=q.length,ce=!0}}else te[0]!==e.BACK&&(te[0]=e.BACK,ce=!0);ce&&e.drawBuffers(te)}function et(S){return y!==S?(e.useProgram(S),y=S,!0):!1}const Ne={[zt]:e.FUNC_ADD,[Hr]:e.FUNC_SUBTRACT,[Gr]:e.FUNC_REVERSE_SUBTRACT};Ne[Ja]=e.MIN,Ne[ja]=e.MAX;const m={[ta]:e.ZERO,[ea]:e.ONE,[jr]:e.SRC_COLOR,[Jr]:e.SRC_ALPHA,[Qr]:e.SRC_ALPHA_SATURATE,[Zr]:e.DST_COLOR,[$r]:e.DST_ALPHA,[qr]:e.ONE_MINUS_SRC_COLOR,[Kr]:e.ONE_MINUS_SRC_ALPHA,[Yr]:e.ONE_MINUS_DST_COLOR,[Xr]:e.ONE_MINUS_DST_ALPHA,[zr]:e.CONSTANT_COLOR,[Wr]:e.ONE_MINUS_CONSTANT_COLOR,[kr]:e.CONSTANT_ALPHA,[Vr]:e.ONE_MINUS_CONSTANT_ALPHA};function ze(S,Q,te,ce,q,W,de,Ue,Xe,He){if(S===wt){U===!0&&(xe(e.BLEND),U=!1);return}if(U===!1&&(ee(e.BLEND),U=!0),S!==Ca){if(S!==c||He!==p){if((r!==zt||_!==zt)&&(e.blendEquation(e.FUNC_ADD),r=zt,_=zt),He)switch(S){case cn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Pi:e.blendFunc(e.ONE,e.ONE);break;case Ci:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case bi:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}else switch(S){case cn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Pi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Ci:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bi:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}I=null,b=null,O=null,L=null,N.set(0,0,0),V=0,c=S,p=He}return}q=q||Q,W=W||te,de=de||ce,(Q!==r||q!==_)&&(e.blendEquationSeparate(Ne[Q],Ne[q]),r=Q,_=q),(te!==I||ce!==b||W!==O||de!==L)&&(e.blendFuncSeparate(m[te],m[ce],m[W],m[de]),I=te,b=ce,O=W,L=de),(Ue.equals(N)===!1||Xe!==V)&&(e.blendColor(Ue.r,Ue.g,Ue.b,Xe),N.copy(Ue),V=Xe),c=S,p=!1}function Se(S,Q){S.side===Mt?xe(e.CULL_FACE):ee(e.CULL_FACE);let te=S.side===_t;Q&&(te=!te),Ge(te),S.blending===cn&&S.transparent===!1?ze(wt):ze(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),h.setFunc(S.depthFunc),h.setTest(S.depthTest),h.setMask(S.depthWrite),o.setMask(S.colorWrite);const ce=S.stencilWrite;f.setTest(ce),ce&&(f.setMask(S.stencilWriteMask),f.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),f.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),fe(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?ee(e.SAMPLE_ALPHA_TO_COVERAGE):xe(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(S){u!==S&&(S?e.frontFace(e.CW):e.frontFace(e.CCW),u=S)}function ge(S){S!==Ra?(ee(e.CULL_FACE),S!==M&&(S===Ri?e.cullFace(e.BACK):S===ba?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):xe(e.CULL_FACE),M=S}function $e(S){S!==Y&&(z&&e.lineWidth(S),Y=S)}function fe(S,Q,te){S?(ee(e.POLYGON_OFFSET_FILL),(X!==Q||k!==te)&&(e.polygonOffset(Q,te),X=Q,k=te)):xe(e.POLYGON_OFFSET_FILL)}function Ie(S){S?ee(e.SCISSOR_TEST):xe(e.SCISSOR_TEST)}function ot(S){S===void 0&&(S=e.TEXTURE0+J-1),ve!==S&&(e.activeTexture(S),ve=S)}function tt(S,Q,te){te===void 0&&(ve===null?te=e.TEXTURE0+J-1:te=ve);let ce=Te[te];ce===void 0&&(ce={type:void 0,texture:void 0},Te[te]=ce),(ce.type!==S||ce.texture!==Q)&&(ve!==te&&(e.activeTexture(te),ve=te),e.bindTexture(S,Q||re[S]),ce.type=S,ce.texture=Q)}function d(){const S=Te[ve];S!==void 0&&S.type!==void 0&&(e.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function a(){try{e.compressedTexImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function P(){try{e.compressedTexImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function B(){try{e.texSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function K(){try{e.texSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function F(){try{e.compressedTexSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function _e(){try{e.compressedTexSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function j(){try{e.texStorage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function pe(){try{e.texStorage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function he(){try{e.texImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Z(){try{e.texImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function se(S){it.equals(S)===!1&&(e.scissor(S.x,S.y,S.z,S.w),it.copy(S))}function be(S){Ye.equals(S)===!1&&(e.viewport(S.x,S.y,S.z,S.w),Ye.copy(S))}function me(S,Q){let te=x.get(Q);te===void 0&&(te=new WeakMap,x.set(Q,te));let ce=te.get(S);ce===void 0&&(ce=e.getUniformBlockIndex(Q,S.name),te.set(S,ce))}function ae(S,Q){const ce=x.get(Q).get(S);C.get(Q)!==ce&&(e.uniformBlockBinding(Q,ce,S.__bindingPointIndex),C.set(Q,ce))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),h.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),T={},ve=null,Te={},v={},E=new WeakMap,g=[],y=null,U=!1,c=null,r=null,I=null,b=null,_=null,O=null,L=null,N=new Ze(0,0,0),V=0,p=!1,u=null,M=null,Y=null,X=null,k=null,it.set(0,0,e.canvas.width,e.canvas.height),Ye.set(0,0,e.canvas.width,e.canvas.height),o.reset(),h.reset(),f.reset()}return{buffers:{color:o,depth:h,stencil:f},enable:ee,disable:xe,bindFramebuffer:Ae,drawBuffers:Pe,useProgram:et,setBlending:ze,setMaterial:Se,setFlipSided:Ge,setCullFace:ge,setLineWidth:$e,setPolygonOffset:fe,setScissorTest:Ie,activeTexture:ot,bindTexture:tt,unbindTexture:d,compressedTexImage2D:a,compressedTexImage3D:P,texImage2D:he,texImage3D:Z,updateUBOMapping:me,uniformBlockBinding:ae,texStorage2D:j,texStorage3D:pe,texSubImage2D:B,texSubImage3D:K,compressedTexSubImage2D:F,compressedTexSubImage3D:_e,scissor:se,viewport:be,reset:Le}}function Pf(e,n,t,i,l,o,h){const f=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,C=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),x=new ut,T=new WeakMap;let v;const E=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(d,a){return g?new OffscreenCanvas(d,a):qa("canvas")}function U(d,a,P){let B=1;const K=tt(d);if((K.width>P||K.height>P)&&(B=P/Math.max(K.width,K.height)),B<1)if(typeof HTMLImageElement<"u"&&d instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&d instanceof ImageBitmap||typeof VideoFrame<"u"&&d instanceof VideoFrame){const F=Math.floor(B*K.width),_e=Math.floor(B*K.height);v===void 0&&(v=y(F,_e));const j=a?y(F,_e):v;return j.width=F,j.height=_e,j.getContext("2d").drawImage(d,0,0,F,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+F+"x"+_e+")."),j}else return"data"in d&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),d;return d}function c(d){return d.generateMipmaps}function r(d){e.generateMipmap(d)}function I(d){return d.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:d.isWebGL3DRenderTarget?e.TEXTURE_3D:d.isWebGLArrayRenderTarget||d.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(d,a,P,B,K=!1){if(d!==null){if(e[d]!==void 0)return e[d];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+d+"'")}let F=a;if(a===e.RED&&(P===e.FLOAT&&(F=e.R32F),P===e.HALF_FLOAT&&(F=e.R16F),P===e.UNSIGNED_BYTE&&(F=e.R8)),a===e.RED_INTEGER&&(P===e.UNSIGNED_BYTE&&(F=e.R8UI),P===e.UNSIGNED_SHORT&&(F=e.R16UI),P===e.UNSIGNED_INT&&(F=e.R32UI),P===e.BYTE&&(F=e.R8I),P===e.SHORT&&(F=e.R16I),P===e.INT&&(F=e.R32I)),a===e.RG&&(P===e.FLOAT&&(F=e.RG32F),P===e.HALF_FLOAT&&(F=e.RG16F),P===e.UNSIGNED_BYTE&&(F=e.RG8)),a===e.RG_INTEGER&&(P===e.UNSIGNED_BYTE&&(F=e.RG8UI),P===e.UNSIGNED_SHORT&&(F=e.RG16UI),P===e.UNSIGNED_INT&&(F=e.RG32UI),P===e.BYTE&&(F=e.RG8I),P===e.SHORT&&(F=e.RG16I),P===e.INT&&(F=e.RG32I)),a===e.RGB_INTEGER&&(P===e.UNSIGNED_BYTE&&(F=e.RGB8UI),P===e.UNSIGNED_SHORT&&(F=e.RGB16UI),P===e.UNSIGNED_INT&&(F=e.RGB32UI),P===e.BYTE&&(F=e.RGB8I),P===e.SHORT&&(F=e.RGB16I),P===e.INT&&(F=e.RGB32I)),a===e.RGBA_INTEGER&&(P===e.UNSIGNED_BYTE&&(F=e.RGBA8UI),P===e.UNSIGNED_SHORT&&(F=e.RGBA16UI),P===e.UNSIGNED_INT&&(F=e.RGBA32UI),P===e.BYTE&&(F=e.RGBA8I),P===e.SHORT&&(F=e.RGBA16I),P===e.INT&&(F=e.RGBA32I)),a===e.RGB&&P===e.UNSIGNED_INT_5_9_9_9_REV&&(F=e.RGB9_E5),a===e.RGBA){const _e=K?Er:nt.getTransfer(B);P===e.FLOAT&&(F=e.RGBA32F),P===e.HALF_FLOAT&&(F=e.RGBA16F),P===e.UNSIGNED_BYTE&&(F=_e===qe?e.SRGB8_ALPHA8:e.RGBA8),P===e.UNSIGNED_SHORT_4_4_4_4&&(F=e.RGBA4),P===e.UNSIGNED_SHORT_5_5_5_1&&(F=e.RGB5_A1)}return(F===e.R16F||F===e.R32F||F===e.RG16F||F===e.RG32F||F===e.RGBA16F||F===e.RGBA32F)&&n.get("EXT_color_buffer_float"),F}function _(d,a){let P;return d?a===null||a===Jt||a===Qt?P=e.DEPTH24_STENCIL8:a===Dt?P=e.DEPTH32F_STENCIL8:a===pn&&(P=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):a===null||a===Jt||a===Qt?P=e.DEPTH_COMPONENT24:a===Dt?P=e.DEPTH_COMPONENT32F:a===pn&&(P=e.DEPTH_COMPONENT16),P}function O(d,a){return c(d)===!0||d.isFramebufferTexture&&d.minFilter!==Kt&&d.minFilter!==Bt?Math.log2(Math.max(a.width,a.height))+1:d.mipmaps!==void 0&&d.mipmaps.length>0?d.mipmaps.length:d.isCompressedTexture&&Array.isArray(d.image)?a.mipmaps.length:1}function L(d){const a=d.target;a.removeEventListener("dispose",L),V(a),a.isVideoTexture&&T.delete(a)}function N(d){const a=d.target;a.removeEventListener("dispose",N),u(a)}function V(d){const a=i.get(d);if(a.__webglInit===void 0)return;const P=d.source,B=E.get(P);if(B){const K=B[a.__cacheKey];K.usedTimes--,K.usedTimes===0&&p(d),Object.keys(B).length===0&&E.delete(P)}i.remove(d)}function p(d){const a=i.get(d);e.deleteTexture(a.__webglTexture);const P=d.source,B=E.get(P);delete B[a.__cacheKey],h.memory.textures--}function u(d){const a=i.get(d);if(d.depthTexture&&(d.depthTexture.dispose(),i.remove(d.depthTexture)),d.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(a.__webglFramebuffer[B]))for(let K=0;K<a.__webglFramebuffer[B].length;K++)e.deleteFramebuffer(a.__webglFramebuffer[B][K]);else e.deleteFramebuffer(a.__webglFramebuffer[B]);a.__webglDepthbuffer&&e.deleteRenderbuffer(a.__webglDepthbuffer[B])}else{if(Array.isArray(a.__webglFramebuffer))for(let B=0;B<a.__webglFramebuffer.length;B++)e.deleteFramebuffer(a.__webglFramebuffer[B]);else e.deleteFramebuffer(a.__webglFramebuffer);if(a.__webglDepthbuffer&&e.deleteRenderbuffer(a.__webglDepthbuffer),a.__webglMultisampledFramebuffer&&e.deleteFramebuffer(a.__webglMultisampledFramebuffer),a.__webglColorRenderbuffer)for(let B=0;B<a.__webglColorRenderbuffer.length;B++)a.__webglColorRenderbuffer[B]&&e.deleteRenderbuffer(a.__webglColorRenderbuffer[B]);a.__webglDepthRenderbuffer&&e.deleteRenderbuffer(a.__webglDepthRenderbuffer)}const P=d.textures;for(let B=0,K=P.length;B<K;B++){const F=i.get(P[B]);F.__webglTexture&&(e.deleteTexture(F.__webglTexture),h.memory.textures--),i.remove(P[B])}i.remove(d)}let M=0;function Y(){M=0}function X(){const d=M;return d>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+d+" texture units while this GPU supports only "+l.maxTextures),M+=1,d}function k(d){const a=[];return a.push(d.wrapS),a.push(d.wrapT),a.push(d.wrapR||0),a.push(d.magFilter),a.push(d.minFilter),a.push(d.anisotropy),a.push(d.internalFormat),a.push(d.format),a.push(d.type),a.push(d.generateMipmaps),a.push(d.premultiplyAlpha),a.push(d.flipY),a.push(d.unpackAlignment),a.push(d.colorSpace),a.join()}function J(d,a){const P=i.get(d);if(d.isVideoTexture&&Ie(d),d.isRenderTargetTexture===!1&&d.isExternalTexture!==!0&&d.version>0&&P.__version!==d.version){const B=d.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{re(P,d,a);return}}else d.isExternalTexture&&(P.__webglTexture=d.sourceTexture?d.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,P.__webglTexture,e.TEXTURE0+a)}function z(d,a){const P=i.get(d);if(d.isRenderTargetTexture===!1&&d.version>0&&P.__version!==d.version){re(P,d,a);return}t.bindTexture(e.TEXTURE_2D_ARRAY,P.__webglTexture,e.TEXTURE0+a)}function ne(d,a){const P=i.get(d);if(d.isRenderTargetTexture===!1&&d.version>0&&P.__version!==d.version){re(P,d,a);return}t.bindTexture(e.TEXTURE_3D,P.__webglTexture,e.TEXTURE0+a)}function G(d,a){const P=i.get(d);if(d.version>0&&P.__version!==d.version){ee(P,d,a);return}t.bindTexture(e.TEXTURE_CUBE_MAP,P.__webglTexture,e.TEXTURE0+a)}const ve={[ra]:e.REPEAT,[ia]:e.CLAMP_TO_EDGE,[na]:e.MIRRORED_REPEAT},Te={[Kt]:e.NEAREST,[aa]:e.NEAREST_MIPMAP_NEAREST,[nn]:e.NEAREST_MIPMAP_LINEAR,[Bt]:e.LINEAR,[Mn]:e.LINEAR_MIPMAP_NEAREST,[Xt]:e.LINEAR_MIPMAP_LINEAR},we={[da]:e.NEVER,[ua]:e.ALWAYS,[fa]:e.LESS,[ar]:e.LEQUAL,[ca]:e.EQUAL,[la]:e.GEQUAL,[sa]:e.GREATER,[oa]:e.NOTEQUAL};function Oe(d,a){if(a.type===Dt&&n.has("OES_texture_float_linear")===!1&&(a.magFilter===Bt||a.magFilter===Mn||a.magFilter===nn||a.magFilter===Xt||a.minFilter===Bt||a.minFilter===Mn||a.minFilter===nn||a.minFilter===Xt)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(d,e.TEXTURE_WRAP_S,ve[a.wrapS]),e.texParameteri(d,e.TEXTURE_WRAP_T,ve[a.wrapT]),(d===e.TEXTURE_3D||d===e.TEXTURE_2D_ARRAY)&&e.texParameteri(d,e.TEXTURE_WRAP_R,ve[a.wrapR]),e.texParameteri(d,e.TEXTURE_MAG_FILTER,Te[a.magFilter]),e.texParameteri(d,e.TEXTURE_MIN_FILTER,Te[a.minFilter]),a.compareFunction&&(e.texParameteri(d,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(d,e.TEXTURE_COMPARE_FUNC,we[a.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(a.magFilter===Kt||a.minFilter!==nn&&a.minFilter!==Xt||a.type===Dt&&n.has("OES_texture_float_linear")===!1)return;if(a.anisotropy>1||i.get(a).__currentAnisotropy){const P=n.get("EXT_texture_filter_anisotropic");e.texParameterf(d,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,l.getMaxAnisotropy())),i.get(a).__currentAnisotropy=a.anisotropy}}}function it(d,a){let P=!1;d.__webglInit===void 0&&(d.__webglInit=!0,a.addEventListener("dispose",L));const B=a.source;let K=E.get(B);K===void 0&&(K={},E.set(B,K));const F=k(a);if(F!==d.__cacheKey){K[F]===void 0&&(K[F]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,P=!0),K[F].usedTimes++;const _e=K[d.__cacheKey];_e!==void 0&&(K[d.__cacheKey].usedTimes--,_e.usedTimes===0&&p(a)),d.__cacheKey=F,d.__webglTexture=K[F].texture}return P}function Ye(d,a,P){return Math.floor(Math.floor(d/P)/a)}function H(d,a,P,B){const F=d.updateRanges;if(F.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,a.width,a.height,P,B,a.data);else{F.sort((Z,se)=>Z.start-se.start);let _e=0;for(let Z=1;Z<F.length;Z++){const se=F[_e],be=F[Z],me=se.start+se.count,ae=Ye(be.start,a.width,4),Le=Ye(se.start,a.width,4);be.start<=me+1&&ae===Le&&Ye(be.start+be.count-1,a.width,4)===ae?se.count=Math.max(se.count,be.start+be.count-se.start):(++_e,F[_e]=be)}F.length=_e+1;const j=e.getParameter(e.UNPACK_ROW_LENGTH),pe=e.getParameter(e.UNPACK_SKIP_PIXELS),he=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,a.width);for(let Z=0,se=F.length;Z<se;Z++){const be=F[Z],me=Math.floor(be.start/4),ae=Math.ceil(be.count/4),Le=me%a.width,S=Math.floor(me/a.width),Q=ae,te=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Le),e.pixelStorei(e.UNPACK_SKIP_ROWS,S),t.texSubImage2D(e.TEXTURE_2D,0,Le,S,Q,te,P,B,a.data)}d.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,j),e.pixelStorei(e.UNPACK_SKIP_PIXELS,pe),e.pixelStorei(e.UNPACK_SKIP_ROWS,he)}}function re(d,a,P){let B=e.TEXTURE_2D;(a.isDataArrayTexture||a.isCompressedArrayTexture)&&(B=e.TEXTURE_2D_ARRAY),a.isData3DTexture&&(B=e.TEXTURE_3D);const K=it(d,a),F=a.source;t.bindTexture(B,d.__webglTexture,e.TEXTURE0+P);const _e=i.get(F);if(F.version!==_e.__version||K===!0){t.activeTexture(e.TEXTURE0+P);const j=nt.getPrimaries(nt.workingColorSpace),pe=a.colorSpace===Ft?null:nt.getPrimaries(a.colorSpace),he=a.colorSpace===Ft||j===pe?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let Z=U(a.image,!1,l.maxTextureSize);Z=ot(a,Z);const se=o.convert(a.format,a.colorSpace),be=o.convert(a.type);let me=b(a.internalFormat,se,be,a.colorSpace,a.isVideoTexture);Oe(B,a);let ae;const Le=a.mipmaps,S=a.isVideoTexture!==!0,Q=_e.__version===void 0||K===!0,te=F.dataReady,ce=O(a,Z);if(a.isDepthTexture)me=_(a.format===un,a.type),Q&&(S?t.texStorage2D(e.TEXTURE_2D,1,me,Z.width,Z.height):t.texImage2D(e.TEXTURE_2D,0,me,Z.width,Z.height,0,se,be,null));else if(a.isDataTexture)if(Le.length>0){S&&Q&&t.texStorage2D(e.TEXTURE_2D,ce,me,Le[0].width,Le[0].height);for(let q=0,W=Le.length;q<W;q++)ae=Le[q],S?te&&t.texSubImage2D(e.TEXTURE_2D,q,0,0,ae.width,ae.height,se,be,ae.data):t.texImage2D(e.TEXTURE_2D,q,me,ae.width,ae.height,0,se,be,ae.data);a.generateMipmaps=!1}else S?(Q&&t.texStorage2D(e.TEXTURE_2D,ce,me,Z.width,Z.height),te&&H(a,Z,se,be)):t.texImage2D(e.TEXTURE_2D,0,me,Z.width,Z.height,0,se,be,Z.data);else if(a.isCompressedTexture)if(a.isCompressedArrayTexture){S&&Q&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,me,Le[0].width,Le[0].height,Z.depth);for(let q=0,W=Le.length;q<W;q++)if(ae=Le[q],a.format!==Tt)if(se!==null)if(S){if(te)if(a.layerUpdates.size>0){const de=Li(ae.width,ae.height,a.format,a.type);for(const Ue of a.layerUpdates){const Xe=ae.data.subarray(Ue*de/ae.data.BYTES_PER_ELEMENT,(Ue+1)*de/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,q,0,0,Ue,ae.width,ae.height,1,se,Xe)}a.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,q,0,0,0,ae.width,ae.height,Z.depth,se,ae.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,q,me,ae.width,ae.height,Z.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else S?te&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,q,0,0,0,ae.width,ae.height,Z.depth,se,be,ae.data):t.texImage3D(e.TEXTURE_2D_ARRAY,q,me,ae.width,ae.height,Z.depth,0,se,be,ae.data)}else{S&&Q&&t.texStorage2D(e.TEXTURE_2D,ce,me,Le[0].width,Le[0].height);for(let q=0,W=Le.length;q<W;q++)ae=Le[q],a.format!==Tt?se!==null?S?te&&t.compressedTexSubImage2D(e.TEXTURE_2D,q,0,0,ae.width,ae.height,se,ae.data):t.compressedTexImage2D(e.TEXTURE_2D,q,me,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):S?te&&t.texSubImage2D(e.TEXTURE_2D,q,0,0,ae.width,ae.height,se,be,ae.data):t.texImage2D(e.TEXTURE_2D,q,me,ae.width,ae.height,0,se,be,ae.data)}else if(a.isDataArrayTexture)if(S){if(Q&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,me,Z.width,Z.height,Z.depth),te)if(a.layerUpdates.size>0){const q=Li(Z.width,Z.height,a.format,a.type);for(const W of a.layerUpdates){const de=Z.data.subarray(W*q/Z.data.BYTES_PER_ELEMENT,(W+1)*q/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,W,Z.width,Z.height,1,se,be,de)}a.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,se,be,Z.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,me,Z.width,Z.height,Z.depth,0,se,be,Z.data);else if(a.isData3DTexture)S?(Q&&t.texStorage3D(e.TEXTURE_3D,ce,me,Z.width,Z.height,Z.depth),te&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,se,be,Z.data)):t.texImage3D(e.TEXTURE_3D,0,me,Z.width,Z.height,Z.depth,0,se,be,Z.data);else if(a.isFramebufferTexture){if(Q)if(S)t.texStorage2D(e.TEXTURE_2D,ce,me,Z.width,Z.height);else{let q=Z.width,W=Z.height;for(let de=0;de<ce;de++)t.texImage2D(e.TEXTURE_2D,de,me,q,W,0,se,be,null),q>>=1,W>>=1}}else if(Le.length>0){if(S&&Q){const q=tt(Le[0]);t.texStorage2D(e.TEXTURE_2D,ce,me,q.width,q.height)}for(let q=0,W=Le.length;q<W;q++)ae=Le[q],S?te&&t.texSubImage2D(e.TEXTURE_2D,q,0,0,se,be,ae):t.texImage2D(e.TEXTURE_2D,q,me,se,be,ae);a.generateMipmaps=!1}else if(S){if(Q){const q=tt(Z);t.texStorage2D(e.TEXTURE_2D,ce,me,q.width,q.height)}te&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,se,be,Z)}else t.texImage2D(e.TEXTURE_2D,0,me,se,be,Z);c(a)&&r(B),_e.__version=F.version,a.onUpdate&&a.onUpdate(a)}d.__version=a.version}function ee(d,a,P){if(a.image.length!==6)return;const B=it(d,a),K=a.source;t.bindTexture(e.TEXTURE_CUBE_MAP,d.__webglTexture,e.TEXTURE0+P);const F=i.get(K);if(K.version!==F.__version||B===!0){t.activeTexture(e.TEXTURE0+P);const _e=nt.getPrimaries(nt.workingColorSpace),j=a.colorSpace===Ft?null:nt.getPrimaries(a.colorSpace),pe=a.colorSpace===Ft||_e===j?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const he=a.isCompressedTexture||a.image[0].isCompressedTexture,Z=a.image[0]&&a.image[0].isDataTexture,se=[];for(let W=0;W<6;W++)!he&&!Z?se[W]=U(a.image[W],!0,l.maxCubemapSize):se[W]=Z?a.image[W].image:a.image[W],se[W]=ot(a,se[W]);const be=se[0],me=o.convert(a.format,a.colorSpace),ae=o.convert(a.type),Le=b(a.internalFormat,me,ae,a.colorSpace),S=a.isVideoTexture!==!0,Q=F.__version===void 0||B===!0,te=K.dataReady;let ce=O(a,be);Oe(e.TEXTURE_CUBE_MAP,a);let q;if(he){S&&Q&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Le,be.width,be.height);for(let W=0;W<6;W++){q=se[W].mipmaps;for(let de=0;de<q.length;de++){const Ue=q[de];a.format!==Tt?me!==null?S?te&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,de,0,0,Ue.width,Ue.height,me,Ue.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,de,Le,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):S?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,de,0,0,Ue.width,Ue.height,me,ae,Ue.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,de,Le,Ue.width,Ue.height,0,me,ae,Ue.data)}}}else{if(q=a.mipmaps,S&&Q){q.length>0&&ce++;const W=tt(se[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Le,W.width,W.height)}for(let W=0;W<6;W++)if(Z){S?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,se[W].width,se[W].height,me,ae,se[W].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Le,se[W].width,se[W].height,0,me,ae,se[W].data);for(let de=0;de<q.length;de++){const Xe=q[de].image[W].image;S?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,de+1,0,0,Xe.width,Xe.height,me,ae,Xe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,de+1,Le,Xe.width,Xe.height,0,me,ae,Xe.data)}}else{S?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,me,ae,se[W]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Le,me,ae,se[W]);for(let de=0;de<q.length;de++){const Ue=q[de];S?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,de+1,0,0,me,ae,Ue.image[W]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,de+1,Le,me,ae,Ue.image[W])}}}c(a)&&r(e.TEXTURE_CUBE_MAP),F.__version=K.version,a.onUpdate&&a.onUpdate(a)}d.__version=a.version}function xe(d,a,P,B,K,F){const _e=o.convert(P.format,P.colorSpace),j=o.convert(P.type),pe=b(P.internalFormat,_e,j,P.colorSpace),he=i.get(a),Z=i.get(P);if(Z.__renderTarget=a,!he.__hasExternalTextures){const se=Math.max(1,a.width>>F),be=Math.max(1,a.height>>F);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?t.texImage3D(K,F,pe,se,be,a.depth,0,_e,j,null):t.texImage2D(K,F,pe,se,be,0,_e,j,null)}t.bindFramebuffer(e.FRAMEBUFFER,d),fe(a)?f.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,B,K,Z.__webglTexture,0,$e(a)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,B,K,Z.__webglTexture,F),t.bindFramebuffer(e.FRAMEBUFFER,null)}function Ae(d,a,P){if(e.bindRenderbuffer(e.RENDERBUFFER,d),a.depthBuffer){const B=a.depthTexture,K=B&&B.isDepthTexture?B.type:null,F=_(a.stencilBuffer,K),_e=a.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,j=$e(a);fe(a)?f.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,j,F,a.width,a.height):P?e.renderbufferStorageMultisample(e.RENDERBUFFER,j,F,a.width,a.height):e.renderbufferStorage(e.RENDERBUFFER,F,a.width,a.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,_e,e.RENDERBUFFER,d)}else{const B=a.textures;for(let K=0;K<B.length;K++){const F=B[K],_e=o.convert(F.format,F.colorSpace),j=o.convert(F.type),pe=b(F.internalFormat,_e,j,F.colorSpace),he=$e(a);P&&fe(a)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,he,pe,a.width,a.height):fe(a)?f.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,he,pe,a.width,a.height):e.renderbufferStorage(e.RENDERBUFFER,pe,a.width,a.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Pe(d,a){if(a&&a.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,d),!(a.depthTexture&&a.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const B=i.get(a.depthTexture);B.__renderTarget=a,(!B.__webglTexture||a.depthTexture.image.width!==a.width||a.depthTexture.image.height!==a.height)&&(a.depthTexture.image.width=a.width,a.depthTexture.image.height=a.height,a.depthTexture.needsUpdate=!0),J(a.depthTexture,0);const K=B.__webglTexture,F=$e(a);if(a.depthTexture.format===Wn)fe(a)?f.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,F):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(a.depthTexture.format===un)fe(a)?f.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,F):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function et(d){const a=i.get(d),P=d.isWebGLCubeRenderTarget===!0;if(a.__boundDepthTexture!==d.depthTexture){const B=d.depthTexture;if(a.__depthDisposeCallback&&a.__depthDisposeCallback(),B){const K=()=>{delete a.__boundDepthTexture,delete a.__depthDisposeCallback,B.removeEventListener("dispose",K)};B.addEventListener("dispose",K),a.__depthDisposeCallback=K}a.__boundDepthTexture=B}if(d.depthTexture&&!a.__autoAllocateDepthBuffer){if(P)throw new Error("target.depthTexture not supported in Cube render targets");const B=d.texture.mipmaps;B&&B.length>0?Pe(a.__webglFramebuffer[0],d):Pe(a.__webglFramebuffer,d)}else if(P){a.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[B]),a.__webglDepthbuffer[B]===void 0)a.__webglDepthbuffer[B]=e.createRenderbuffer(),Ae(a.__webglDepthbuffer[B],d,!1);else{const K=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,F=a.__webglDepthbuffer[B];e.bindRenderbuffer(e.RENDERBUFFER,F),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,F)}}else{const B=d.texture.mipmaps;if(B&&B.length>0?t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer),a.__webglDepthbuffer===void 0)a.__webglDepthbuffer=e.createRenderbuffer(),Ae(a.__webglDepthbuffer,d,!1);else{const K=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,F=a.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,F),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,F)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Ne(d,a,P){const B=i.get(d);a!==void 0&&xe(B.__webglFramebuffer,d,d.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),P!==void 0&&et(d)}function m(d){const a=d.texture,P=i.get(d),B=i.get(a);d.addEventListener("dispose",N);const K=d.textures,F=d.isWebGLCubeRenderTarget===!0,_e=K.length>1;if(_e||(B.__webglTexture===void 0&&(B.__webglTexture=e.createTexture()),B.__version=a.version,h.memory.textures++),F){P.__webglFramebuffer=[];for(let j=0;j<6;j++)if(a.mipmaps&&a.mipmaps.length>0){P.__webglFramebuffer[j]=[];for(let pe=0;pe<a.mipmaps.length;pe++)P.__webglFramebuffer[j][pe]=e.createFramebuffer()}else P.__webglFramebuffer[j]=e.createFramebuffer()}else{if(a.mipmaps&&a.mipmaps.length>0){P.__webglFramebuffer=[];for(let j=0;j<a.mipmaps.length;j++)P.__webglFramebuffer[j]=e.createFramebuffer()}else P.__webglFramebuffer=e.createFramebuffer();if(_e)for(let j=0,pe=K.length;j<pe;j++){const he=i.get(K[j]);he.__webglTexture===void 0&&(he.__webglTexture=e.createTexture(),h.memory.textures++)}if(d.samples>0&&fe(d)===!1){P.__webglMultisampledFramebuffer=e.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let j=0;j<K.length;j++){const pe=K[j];P.__webglColorRenderbuffer[j]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,P.__webglColorRenderbuffer[j]);const he=o.convert(pe.format,pe.colorSpace),Z=o.convert(pe.type),se=b(pe.internalFormat,he,Z,pe.colorSpace,d.isXRRenderTarget===!0),be=$e(d);e.renderbufferStorageMultisample(e.RENDERBUFFER,be,se,d.width,d.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+j,e.RENDERBUFFER,P.__webglColorRenderbuffer[j])}e.bindRenderbuffer(e.RENDERBUFFER,null),d.depthBuffer&&(P.__webglDepthRenderbuffer=e.createRenderbuffer(),Ae(P.__webglDepthRenderbuffer,d,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(F){t.bindTexture(e.TEXTURE_CUBE_MAP,B.__webglTexture),Oe(e.TEXTURE_CUBE_MAP,a);for(let j=0;j<6;j++)if(a.mipmaps&&a.mipmaps.length>0)for(let pe=0;pe<a.mipmaps.length;pe++)xe(P.__webglFramebuffer[j][pe],d,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+j,pe);else xe(P.__webglFramebuffer[j],d,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);c(a)&&r(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let j=0,pe=K.length;j<pe;j++){const he=K[j],Z=i.get(he);let se=e.TEXTURE_2D;(d.isWebGL3DRenderTarget||d.isWebGLArrayRenderTarget)&&(se=d.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(se,Z.__webglTexture),Oe(se,he),xe(P.__webglFramebuffer,d,he,e.COLOR_ATTACHMENT0+j,se,0),c(he)&&r(se)}t.unbindTexture()}else{let j=e.TEXTURE_2D;if((d.isWebGL3DRenderTarget||d.isWebGLArrayRenderTarget)&&(j=d.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(j,B.__webglTexture),Oe(j,a),a.mipmaps&&a.mipmaps.length>0)for(let pe=0;pe<a.mipmaps.length;pe++)xe(P.__webglFramebuffer[pe],d,a,e.COLOR_ATTACHMENT0,j,pe);else xe(P.__webglFramebuffer,d,a,e.COLOR_ATTACHMENT0,j,0);c(a)&&r(j),t.unbindTexture()}d.depthBuffer&&et(d)}function ze(d){const a=d.textures;for(let P=0,B=a.length;P<B;P++){const K=a[P];if(c(K)){const F=I(d),_e=i.get(K).__webglTexture;t.bindTexture(F,_e),r(F),t.unbindTexture()}}}const Se=[],Ge=[];function ge(d){if(d.samples>0){if(fe(d)===!1){const a=d.textures,P=d.width,B=d.height;let K=e.COLOR_BUFFER_BIT;const F=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,_e=i.get(d),j=a.length>1;if(j)for(let he=0;he<a.length;he++)t.bindFramebuffer(e.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+he,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,_e.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+he,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const pe=d.texture.mipmaps;pe&&pe.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let he=0;he<a.length;he++){if(d.resolveDepthBuffer&&(d.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),d.stencilBuffer&&d.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),j){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,_e.__webglColorRenderbuffer[he]);const Z=i.get(a[he]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Z,0)}e.blitFramebuffer(0,0,P,B,0,0,P,B,K,e.NEAREST),C===!0&&(Se.length=0,Ge.length=0,Se.push(e.COLOR_ATTACHMENT0+he),d.depthBuffer&&d.resolveDepthBuffer===!1&&(Se.push(F),Ge.push(F),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ge)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Se))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),j)for(let he=0;he<a.length;he++){t.bindFramebuffer(e.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+he,e.RENDERBUFFER,_e.__webglColorRenderbuffer[he]);const Z=i.get(a[he]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,_e.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+he,e.TEXTURE_2D,Z,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(d.depthBuffer&&d.resolveDepthBuffer===!1&&C){const a=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[a])}}}function $e(d){return Math.min(l.maxSamples,d.samples)}function fe(d){const a=i.get(d);return d.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&a.__useRenderToTexture!==!1}function Ie(d){const a=h.render.frame;T.get(d)!==a&&(T.set(d,a),d.update())}function ot(d,a){const P=d.colorSpace,B=d.format,K=d.type;return d.isCompressedTexture===!0||d.isVideoTexture===!0||P!==mn&&P!==Ft&&(nt.getTransfer(P)===qe?(B!==Tt||K!==It)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",P)),a}function tt(d){return typeof HTMLImageElement<"u"&&d instanceof HTMLImageElement?(x.width=d.naturalWidth||d.width,x.height=d.naturalHeight||d.height):typeof VideoFrame<"u"&&d instanceof VideoFrame?(x.width=d.displayWidth,x.height=d.displayHeight):(x.width=d.width,x.height=d.height),x}this.allocateTextureUnit=X,this.resetTextureUnits=Y,this.setTexture2D=J,this.setTexture2DArray=z,this.setTexture3D=ne,this.setTextureCube=G,this.rebindTextures=Ne,this.setupRenderTarget=m,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=fe}function Uf(e,n){function t(i,l=Ft){let o;const h=nt.getTransfer(l);if(i===It)return e.UNSIGNED_BYTE;if(i===sr)return e.UNSIGNED_SHORT_4_4_4_4;if(i===lr)return e.UNSIGNED_SHORT_5_5_5_1;if(i===va)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===ga)return e.BYTE;if(i===Ea)return e.SHORT;if(i===pn)return e.UNSIGNED_SHORT;if(i===fr)return e.INT;if(i===Jt)return e.UNSIGNED_INT;if(i===Dt)return e.FLOAT;if(i===hn)return e.HALF_FLOAT;if(i===Sa)return e.ALPHA;if(i===Ma)return e.RGB;if(i===Tt)return e.RGBA;if(i===Wn)return e.DEPTH_COMPONENT;if(i===un)return e.DEPTH_STENCIL;if(i===Ta)return e.RED;if(i===ur)return e.RED_INTEGER;if(i===xa)return e.RG;if(i===dr)return e.RG_INTEGER;if(i===pr)return e.RGBA_INTEGER;if(i===Tn||i===xn||i===An||i===Rn)if(h===qe)if(o=n.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Tn)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===xn)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===An)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Rn)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=n.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Tn)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===xn)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===An)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Rn)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jn||i===ei||i===ti||i===ni)if(o=n.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===jn)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ei)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ti)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ni)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ii||i===ri||i===ai)if(o=n.get("WEBGL_compressed_texture_etc"),o!==null){if(i===ii||i===ri)return h===qe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===ai)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===oi||i===si||i===li||i===ci||i===fi||i===ui||i===di||i===pi||i===hi||i===mi||i===_i||i===vi||i===gi||i===Ei)if(o=n.get("WEBGL_compressed_texture_astc"),o!==null){if(i===oi)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===si)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===li)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ci)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===fi)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ui)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===di)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===pi)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===hi)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===mi)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===_i)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vi)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gi)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ei)return h===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bn||i===Si||i===Mi)if(o=n.get("EXT_texture_compression_bptc"),o!==null){if(i===bn)return h===qe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Si)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Mi)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Aa||i===Ti||i===xi||i===Ai)if(o=n.get("EXT_texture_compression_rgtc"),o!==null){if(i===bn)return o.COMPRESSED_RED_RGTC1_EXT;if(i===Ti)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xi)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ai)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Qt?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}class Rr extends gr{constructor(n=null){super(),this.sourceTexture=n,this.isExternalTexture=!0}}const Lf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Df=`
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

}`;class wf{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new Rr(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new yt({vertexShader:Lf,fragmentShader:Df,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xt(new cr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class If extends Or{constructor(n,t){super();const i=this;let l=null,o=1,h=null,f="local-floor",C=1,x=null,T=null,v=null,E=null,g=null,y=null;const U=new wf,c={},r=t.getContextAttributes();let I=null,b=null;const _=[],O=[],L=new ut;let N=null;const V=new ln;V.viewport=new ft;const p=new ln;p.viewport=new ft;const u=[V,p],M=new Fr;let Y=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let re=_[H];return re===void 0&&(re=new Sn,_[H]=re),re.getTargetRaySpace()},this.getControllerGrip=function(H){let re=_[H];return re===void 0&&(re=new Sn,_[H]=re),re.getGripSpace()},this.getHand=function(H){let re=_[H];return re===void 0&&(re=new Sn,_[H]=re),re.getHandSpace()};function k(H){const re=O.indexOf(H.inputSource);if(re===-1)return;const ee=_[re];ee!==void 0&&(ee.update(H.inputSource,H.frame,x||h),ee.dispatchEvent({type:H.type,data:H.inputSource}))}function J(){l.removeEventListener("select",k),l.removeEventListener("selectstart",k),l.removeEventListener("selectend",k),l.removeEventListener("squeeze",k),l.removeEventListener("squeezestart",k),l.removeEventListener("squeezeend",k),l.removeEventListener("end",J),l.removeEventListener("inputsourceschange",z);for(let H=0;H<_.length;H++){const re=O[H];re!==null&&(O[H]=null,_[H].disconnect(re))}Y=null,X=null,U.reset();for(const H in c)delete c[H];n.setRenderTarget(I),g=null,E=null,v=null,l=null,b=null,Ye.stop(),i.isPresenting=!1,n.setPixelRatio(N),n.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){o=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){f=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return x||h},this.setReferenceSpace=function(H){x=H},this.getBaseLayer=function(){return E!==null?E:g},this.getBinding=function(){return v},this.getFrame=function(){return y},this.getSession=function(){return l},this.setSession=async function(H){if(l=H,l!==null){if(I=n.getRenderTarget(),l.addEventListener("select",k),l.addEventListener("selectstart",k),l.addEventListener("selectend",k),l.addEventListener("squeeze",k),l.addEventListener("squeezestart",k),l.addEventListener("squeezeend",k),l.addEventListener("end",J),l.addEventListener("inputsourceschange",z),r.xrCompatible!==!0&&await t.makeXRCompatible(),N=n.getPixelRatio(),n.getSize(L),typeof XRWebGLBinding<"u"&&(v=new XRWebGLBinding(l,t)),v!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,xe=null,Ae=null;r.depth&&(Ae=r.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=r.stencil?un:Wn,xe=r.stencil?Qt:Jt);const Pe={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:o};E=v.createProjectionLayer(Pe),l.updateRenderState({layers:[E]}),n.setPixelRatio(1),n.setSize(E.textureWidth,E.textureHeight,!1),b=new Ht(E.textureWidth,E.textureHeight,{format:Tt,type:It,depthTexture:new rr(E.textureWidth,E.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:r.stencil,colorSpace:n.outputColorSpace,samples:r.antialias?4:0,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}else{const ee={antialias:r.antialias,alpha:!0,depth:r.depth,stencil:r.stencil,framebufferScaleFactor:o};g=new XRWebGLLayer(l,t,ee),l.updateRenderState({baseLayer:g}),n.setPixelRatio(1),n.setSize(g.framebufferWidth,g.framebufferHeight,!1),b=new Ht(g.framebufferWidth,g.framebufferHeight,{format:Tt,type:It,colorSpace:n.outputColorSpace,stencilBuffer:r.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(C),x=null,h=await l.requestReferenceSpace(f),Ye.setContext(l),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return U.getDepthTexture()};function z(H){for(let re=0;re<H.removed.length;re++){const ee=H.removed[re],xe=O.indexOf(ee);xe>=0&&(O[xe]=null,_[xe].disconnect(ee))}for(let re=0;re<H.added.length;re++){const ee=H.added[re];let xe=O.indexOf(ee);if(xe===-1){for(let Pe=0;Pe<_.length;Pe++)if(Pe>=O.length){O.push(ee),xe=Pe;break}else if(O[Pe]===null){O[Pe]=ee,xe=Pe;break}if(xe===-1)break}const Ae=_[xe];Ae&&Ae.connect(ee)}}const ne=new We,G=new We;function ve(H,re,ee){ne.setFromMatrixPosition(re.matrixWorld),G.setFromMatrixPosition(ee.matrixWorld);const xe=ne.distanceTo(G),Ae=re.projectionMatrix.elements,Pe=ee.projectionMatrix.elements,et=Ae[14]/(Ae[10]-1),Ne=Ae[14]/(Ae[10]+1),m=(Ae[9]+1)/Ae[5],ze=(Ae[9]-1)/Ae[5],Se=(Ae[8]-1)/Ae[0],Ge=(Pe[8]+1)/Pe[0],ge=et*Se,$e=et*Ge,fe=xe/(-Se+Ge),Ie=fe*-Se;if(re.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Ie),H.translateZ(fe),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),Ae[10]===-1)H.projectionMatrix.copy(re.projectionMatrix),H.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const ot=et+fe,tt=Ne+fe,d=ge-Ie,a=$e+(xe-Ie),P=m*Ne/tt*ot,B=ze*Ne/tt*ot;H.projectionMatrix.makePerspective(d,a,P,B,ot,tt),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function Te(H,re){re===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(re.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(l===null)return;let re=H.near,ee=H.far;U.texture!==null&&(U.depthNear>0&&(re=U.depthNear),U.depthFar>0&&(ee=U.depthFar)),M.near=p.near=V.near=re,M.far=p.far=V.far=ee,(Y!==M.near||X!==M.far)&&(l.updateRenderState({depthNear:M.near,depthFar:M.far}),Y=M.near,X=M.far),M.layers.mask=H.layers.mask|6,V.layers.mask=M.layers.mask&3,p.layers.mask=M.layers.mask&5;const xe=H.parent,Ae=M.cameras;Te(M,xe);for(let Pe=0;Pe<Ae.length;Pe++)Te(Ae[Pe],xe);Ae.length===2?ve(M,V,p):M.projectionMatrix.copy(V.projectionMatrix),we(H,M,xe)};function we(H,re,ee){ee===null?H.matrix.copy(re.matrixWorld):(H.matrix.copy(ee.matrixWorld),H.matrix.invert(),H.matrix.multiply(re.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(re.projectionMatrix),H.projectionMatrixInverse.copy(re.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Br*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(E===null&&g===null))return C},this.setFoveation=function(H){C=H,E!==null&&(E.fixedFoveation=H),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=H)},this.hasDepthSensing=function(){return U.texture!==null},this.getDepthSensingMesh=function(){return U.getMesh(M)},this.getCameraTexture=function(H){return c[H]};let Oe=null;function it(H,re){if(T=re.getViewerPose(x||h),y=re,T!==null){const ee=T.views;g!==null&&(n.setRenderTargetFramebuffer(b,g.framebuffer),n.setRenderTarget(b));let xe=!1;ee.length!==M.cameras.length&&(M.cameras.length=0,xe=!0);for(let Ne=0;Ne<ee.length;Ne++){const m=ee[Ne];let ze=null;if(g!==null)ze=g.getViewport(m);else{const Ge=v.getViewSubImage(E,m);ze=Ge.viewport,Ne===0&&(n.setRenderTargetTextures(b,Ge.colorTexture,Ge.depthStencilTexture),n.setRenderTarget(b))}let Se=u[Ne];Se===void 0&&(Se=new ln,Se.layers.enable(Ne),Se.viewport=new ft,u[Ne]=Se),Se.matrix.fromArray(m.transform.matrix),Se.matrix.decompose(Se.position,Se.quaternion,Se.scale),Se.projectionMatrix.fromArray(m.projectionMatrix),Se.projectionMatrixInverse.copy(Se.projectionMatrix).invert(),Se.viewport.set(ze.x,ze.y,ze.width,ze.height),Ne===0&&(M.matrix.copy(Se.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),xe===!0&&M.cameras.push(Se)}const Ae=l.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&v){const Ne=v.getDepthInformation(ee[0]);Ne&&Ne.isValid&&Ne.texture&&U.init(Ne,l.renderState)}if(Ae&&Ae.includes("camera-access")&&(n.state.unbindTexture(),v))for(let Ne=0;Ne<ee.length;Ne++){const m=ee[Ne].camera;if(m){let ze=c[m];ze||(ze=new Rr,c[m]=ze);const Se=v.getCameraImage(m);ze.sourceTexture=Se}}}for(let ee=0;ee<_.length;ee++){const xe=O[ee],Ae=_[ee];xe!==null&&Ae!==void 0&&Ae.update(xe,re,x||h)}Oe&&Oe(H,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),y=null}const Ye=new Sr;Ye.setAnimationLoop(it),this.setAnimationLoop=function(H){Oe=H},this.dispose=function(){}}}const Pt=new vr,yf=new $t;function Nf(e,n){function t(c,r){c.matrixAutoUpdate===!0&&c.updateMatrix(),r.value.copy(c.matrix)}function i(c,r){r.color.getRGB(c.fogColor.value,mr(e)),r.isFog?(c.fogNear.value=r.near,c.fogFar.value=r.far):r.isFogExp2&&(c.fogDensity.value=r.density)}function l(c,r,I,b,_){r.isMeshBasicMaterial||r.isMeshLambertMaterial?o(c,r):r.isMeshToonMaterial?(o(c,r),v(c,r)):r.isMeshPhongMaterial?(o(c,r),T(c,r)):r.isMeshStandardMaterial?(o(c,r),E(c,r),r.isMeshPhysicalMaterial&&g(c,r,_)):r.isMeshMatcapMaterial?(o(c,r),y(c,r)):r.isMeshDepthMaterial?o(c,r):r.isMeshDistanceMaterial?(o(c,r),U(c,r)):r.isMeshNormalMaterial?o(c,r):r.isLineBasicMaterial?(h(c,r),r.isLineDashedMaterial&&f(c,r)):r.isPointsMaterial?C(c,r,I,b):r.isSpriteMaterial?x(c,r):r.isShadowMaterial?(c.color.value.copy(r.color),c.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)}function o(c,r){c.opacity.value=r.opacity,r.color&&c.diffuse.value.copy(r.color),r.emissive&&c.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(c.map.value=r.map,t(r.map,c.mapTransform)),r.alphaMap&&(c.alphaMap.value=r.alphaMap,t(r.alphaMap,c.alphaMapTransform)),r.bumpMap&&(c.bumpMap.value=r.bumpMap,t(r.bumpMap,c.bumpMapTransform),c.bumpScale.value=r.bumpScale,r.side===_t&&(c.bumpScale.value*=-1)),r.normalMap&&(c.normalMap.value=r.normalMap,t(r.normalMap,c.normalMapTransform),c.normalScale.value.copy(r.normalScale),r.side===_t&&c.normalScale.value.negate()),r.displacementMap&&(c.displacementMap.value=r.displacementMap,t(r.displacementMap,c.displacementMapTransform),c.displacementScale.value=r.displacementScale,c.displacementBias.value=r.displacementBias),r.emissiveMap&&(c.emissiveMap.value=r.emissiveMap,t(r.emissiveMap,c.emissiveMapTransform)),r.specularMap&&(c.specularMap.value=r.specularMap,t(r.specularMap,c.specularMapTransform)),r.alphaTest>0&&(c.alphaTest.value=r.alphaTest);const I=n.get(r),b=I.envMap,_=I.envMapRotation;b&&(c.envMap.value=b,Pt.copy(_),Pt.x*=-1,Pt.y*=-1,Pt.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Pt.y*=-1,Pt.z*=-1),c.envMapRotation.value.setFromMatrix4(yf.makeRotationFromEuler(Pt)),c.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,c.reflectivity.value=r.reflectivity,c.ior.value=r.ior,c.refractionRatio.value=r.refractionRatio),r.lightMap&&(c.lightMap.value=r.lightMap,c.lightMapIntensity.value=r.lightMapIntensity,t(r.lightMap,c.lightMapTransform)),r.aoMap&&(c.aoMap.value=r.aoMap,c.aoMapIntensity.value=r.aoMapIntensity,t(r.aoMap,c.aoMapTransform))}function h(c,r){c.diffuse.value.copy(r.color),c.opacity.value=r.opacity,r.map&&(c.map.value=r.map,t(r.map,c.mapTransform))}function f(c,r){c.dashSize.value=r.dashSize,c.totalSize.value=r.dashSize+r.gapSize,c.scale.value=r.scale}function C(c,r,I,b){c.diffuse.value.copy(r.color),c.opacity.value=r.opacity,c.size.value=r.size*I,c.scale.value=b*.5,r.map&&(c.map.value=r.map,t(r.map,c.uvTransform)),r.alphaMap&&(c.alphaMap.value=r.alphaMap,t(r.alphaMap,c.alphaMapTransform)),r.alphaTest>0&&(c.alphaTest.value=r.alphaTest)}function x(c,r){c.diffuse.value.copy(r.color),c.opacity.value=r.opacity,c.rotation.value=r.rotation,r.map&&(c.map.value=r.map,t(r.map,c.mapTransform)),r.alphaMap&&(c.alphaMap.value=r.alphaMap,t(r.alphaMap,c.alphaMapTransform)),r.alphaTest>0&&(c.alphaTest.value=r.alphaTest)}function T(c,r){c.specular.value.copy(r.specular),c.shininess.value=Math.max(r.shininess,1e-4)}function v(c,r){r.gradientMap&&(c.gradientMap.value=r.gradientMap)}function E(c,r){c.metalness.value=r.metalness,r.metalnessMap&&(c.metalnessMap.value=r.metalnessMap,t(r.metalnessMap,c.metalnessMapTransform)),c.roughness.value=r.roughness,r.roughnessMap&&(c.roughnessMap.value=r.roughnessMap,t(r.roughnessMap,c.roughnessMapTransform)),r.envMap&&(c.envMapIntensity.value=r.envMapIntensity)}function g(c,r,I){c.ior.value=r.ior,r.sheen>0&&(c.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),c.sheenRoughness.value=r.sheenRoughness,r.sheenColorMap&&(c.sheenColorMap.value=r.sheenColorMap,t(r.sheenColorMap,c.sheenColorMapTransform)),r.sheenRoughnessMap&&(c.sheenRoughnessMap.value=r.sheenRoughnessMap,t(r.sheenRoughnessMap,c.sheenRoughnessMapTransform))),r.clearcoat>0&&(c.clearcoat.value=r.clearcoat,c.clearcoatRoughness.value=r.clearcoatRoughness,r.clearcoatMap&&(c.clearcoatMap.value=r.clearcoatMap,t(r.clearcoatMap,c.clearcoatMapTransform)),r.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=r.clearcoatRoughnessMap,t(r.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),r.clearcoatNormalMap&&(c.clearcoatNormalMap.value=r.clearcoatNormalMap,t(r.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),r.side===_t&&c.clearcoatNormalScale.value.negate())),r.dispersion>0&&(c.dispersion.value=r.dispersion),r.iridescence>0&&(c.iridescence.value=r.iridescence,c.iridescenceIOR.value=r.iridescenceIOR,c.iridescenceThicknessMinimum.value=r.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=r.iridescenceThicknessRange[1],r.iridescenceMap&&(c.iridescenceMap.value=r.iridescenceMap,t(r.iridescenceMap,c.iridescenceMapTransform)),r.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=r.iridescenceThicknessMap,t(r.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),r.transmission>0&&(c.transmission.value=r.transmission,c.transmissionSamplerMap.value=I.texture,c.transmissionSamplerSize.value.set(I.width,I.height),r.transmissionMap&&(c.transmissionMap.value=r.transmissionMap,t(r.transmissionMap,c.transmissionMapTransform)),c.thickness.value=r.thickness,r.thicknessMap&&(c.thicknessMap.value=r.thicknessMap,t(r.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=r.attenuationDistance,c.attenuationColor.value.copy(r.attenuationColor)),r.anisotropy>0&&(c.anisotropyVector.value.set(r.anisotropy*Math.cos(r.anisotropyRotation),r.anisotropy*Math.sin(r.anisotropyRotation)),r.anisotropyMap&&(c.anisotropyMap.value=r.anisotropyMap,t(r.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=r.specularIntensity,c.specularColor.value.copy(r.specularColor),r.specularColorMap&&(c.specularColorMap.value=r.specularColorMap,t(r.specularColorMap,c.specularColorMapTransform)),r.specularIntensityMap&&(c.specularIntensityMap.value=r.specularIntensityMap,t(r.specularIntensityMap,c.specularIntensityMapTransform))}function y(c,r){r.matcap&&(c.matcap.value=r.matcap)}function U(c,r){const I=n.get(r).light;c.referencePosition.value.setFromMatrixPosition(I.matrixWorld),c.nearDistance.value=I.shadow.camera.near,c.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:l}}function Of(e,n,t,i){let l={},o={},h=[];const f=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function C(I,b){const _=b.program;i.uniformBlockBinding(I,_)}function x(I,b){let _=l[I.id];_===void 0&&(y(I),_=T(I),l[I.id]=_,I.addEventListener("dispose",c));const O=b.program;i.updateUBOMapping(I,O);const L=n.render.frame;o[I.id]!==L&&(E(I),o[I.id]=L)}function T(I){const b=v();I.__bindingPointIndex=b;const _=e.createBuffer(),O=I.__size,L=I.usage;return e.bindBuffer(e.UNIFORM_BUFFER,_),e.bufferData(e.UNIFORM_BUFFER,O,L),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,b,_),_}function v(){for(let I=0;I<f;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function E(I){const b=l[I.id],_=I.uniforms,O=I.__cache;e.bindBuffer(e.UNIFORM_BUFFER,b);for(let L=0,N=_.length;L<N;L++){const V=Array.isArray(_[L])?_[L]:[_[L]];for(let p=0,u=V.length;p<u;p++){const M=V[p];if(g(M,L,p,O)===!0){const Y=M.__offset,X=Array.isArray(M.value)?M.value:[M.value];let k=0;for(let J=0;J<X.length;J++){const z=X[J],ne=U(z);typeof z=="number"||typeof z=="boolean"?(M.__data[0]=z,e.bufferSubData(e.UNIFORM_BUFFER,Y+k,M.__data)):z.isMatrix3?(M.__data[0]=z.elements[0],M.__data[1]=z.elements[1],M.__data[2]=z.elements[2],M.__data[3]=0,M.__data[4]=z.elements[3],M.__data[5]=z.elements[4],M.__data[6]=z.elements[5],M.__data[7]=0,M.__data[8]=z.elements[6],M.__data[9]=z.elements[7],M.__data[10]=z.elements[8],M.__data[11]=0):(z.toArray(M.__data,k),k+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,Y,M.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function g(I,b,_,O){const L=I.value,N=b+"_"+_;if(O[N]===void 0)return typeof L=="number"||typeof L=="boolean"?O[N]=L:O[N]=L.clone(),!0;{const V=O[N];if(typeof L=="number"||typeof L=="boolean"){if(V!==L)return O[N]=L,!0}else if(V.equals(L)===!1)return V.copy(L),!0}return!1}function y(I){const b=I.uniforms;let _=0;const O=16;for(let N=0,V=b.length;N<V;N++){const p=Array.isArray(b[N])?b[N]:[b[N]];for(let u=0,M=p.length;u<M;u++){const Y=p[u],X=Array.isArray(Y.value)?Y.value:[Y.value];for(let k=0,J=X.length;k<J;k++){const z=X[k],ne=U(z),G=_%O,ve=G%ne.boundary,Te=G+ve;_+=ve,Te!==0&&O-Te<ne.storage&&(_+=O-Te),Y.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=_,_+=ne.storage}}}const L=_%O;return L>0&&(_+=O-L),I.__size=_,I.__cache={},this}function U(I){const b={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(b.boundary=4,b.storage=4):I.isVector2?(b.boundary=8,b.storage=8):I.isVector3||I.isColor?(b.boundary=16,b.storage=12):I.isVector4?(b.boundary=16,b.storage=16):I.isMatrix3?(b.boundary=48,b.storage=48):I.isMatrix4?(b.boundary=64,b.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),b}function c(I){const b=I.target;b.removeEventListener("dispose",c);const _=h.indexOf(b.__bindingPointIndex);h.splice(_,1),e.deleteBuffer(l[b.id]),delete l[b.id],delete o[b.id]}function r(){for(const I in l)e.deleteBuffer(l[I]);h=[],l={},o={}}return{bind:C,update:x,dispose:r}}class Bf{constructor(n={}){const{canvas:t=wr(),context:i=null,depth:l=!0,stencil:o=!1,alpha:h=!1,antialias:f=!1,premultipliedAlpha:C=!0,preserveDrawingBuffer:x=!1,powerPreference:T="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:E=!1}=n;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=h;const y=new Uint32Array(4),U=new Int32Array(4);let c=null,r=null;const I=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=At,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let O=!1;this._outputColorSpace=Ir;let L=0,N=0,V=null,p=-1,u=null;const M=new ft,Y=new ft;let X=null;const k=new Ze(0);let J=0,z=t.width,ne=t.height,G=1,ve=null,Te=null;const we=new ft(0,0,z,ne),Oe=new ft(0,0,z,ne);let it=!1;const Ye=new ir;let H=!1,re=!1;const ee=new $t,xe=new We,Ae=new ft,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function Ne(){return V===null?G:1}let m=i;function ze(s,A){return t.getContext(s,A)}try{const s={alpha:!0,depth:l,stencil:o,antialias:f,premultipliedAlpha:C,preserveDrawingBuffer:x,powerPreference:T,failIfMajorPerformanceCaveat:v};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${yr}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",q,!1),m===null){const A="webgl2";if(m=ze(A,s),m===null)throw ze(A)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(s){throw console.error("THREE.WebGLRenderer: "+s.message),s}let Se,Ge,ge,$e,fe,Ie,ot,tt,d,a,P,B,K,F,_e,j,pe,he,Z,se,be,me,ae,Le;function S(){Se=new Yl(m),Se.init(),me=new Uf(m,Se),Ge=new Gl(m,Se,n,me),ge=new Cf(m,Se),Ge.reversedDepthBuffer&&E&&ge.buffers.depth.setReversed(!0),$e=new $l(m),fe=new hf,Ie=new Pf(m,Se,ge,fe,Ge,me,$e),ot=new Vl(_),tt=new Xl(_),d=new eo(m),ae=new Fl(m,d),a=new Kl(m,d,$e,ae),P=new Ql(m,a,d,$e),Z=new Zl(m,Ge,Ie),j=new Hl(fe),B=new pf(_,ot,tt,Se,Ge,ae,j),K=new Nf(_,fe),F=new _f,_e=new Tf(Se),he=new Ol(_,ot,tt,ge,P,g,C),pe=new Rf(_,P,Ge),Le=new Of(m,$e,Ge,ge),se=new Bl(m,Se,$e),be=new ql(m,Se,$e),$e.programs=B.programs,_.capabilities=Ge,_.extensions=Se,_.properties=fe,_.renderLists=F,_.shadowMap=pe,_.state=ge,_.info=$e}S();const Q=new If(_,m);this.xr=Q,this.getContext=function(){return m},this.getContextAttributes=function(){return m.getContextAttributes()},this.forceContextLoss=function(){const s=Se.get("WEBGL_lose_context");s&&s.loseContext()},this.forceContextRestore=function(){const s=Se.get("WEBGL_lose_context");s&&s.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(s){s!==void 0&&(G=s,this.setSize(z,ne,!1))},this.getSize=function(s){return s.set(z,ne)},this.setSize=function(s,A,D=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=s,ne=A,t.width=Math.floor(s*G),t.height=Math.floor(A*G),D===!0&&(t.style.width=s+"px",t.style.height=A+"px"),this.setViewport(0,0,s,A)},this.getDrawingBufferSize=function(s){return s.set(z*G,ne*G).floor()},this.setDrawingBufferSize=function(s,A,D){z=s,ne=A,G=D,t.width=Math.floor(s*D),t.height=Math.floor(A*D),this.setViewport(0,0,s,A)},this.getCurrentViewport=function(s){return s.copy(M)},this.getViewport=function(s){return s.copy(we)},this.setViewport=function(s,A,D,w){s.isVector4?we.set(s.x,s.y,s.z,s.w):we.set(s,A,D,w),ge.viewport(M.copy(we).multiplyScalar(G).round())},this.getScissor=function(s){return s.copy(Oe)},this.setScissor=function(s,A,D,w){s.isVector4?Oe.set(s.x,s.y,s.z,s.w):Oe.set(s,A,D,w),ge.scissor(Y.copy(Oe).multiplyScalar(G).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(s){ge.setScissorTest(it=s)},this.setOpaqueSort=function(s){ve=s},this.setTransparentSort=function(s){Te=s},this.getClearColor=function(s){return s.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor(...arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha(...arguments)},this.clear=function(s=!0,A=!0,D=!0){let w=0;if(s){let R=!1;if(V!==null){const $=V.texture.format;R=$===pr||$===dr||$===ur}if(R){const $=V.texture.type,oe=$===It||$===Jt||$===pn||$===Qt||$===sr||$===lr,ue=he.getClearColor(),le=he.getClearAlpha(),Re=ue.r,Ce=ue.g,Ee=ue.b;oe?(y[0]=Re,y[1]=Ce,y[2]=Ee,y[3]=le,m.clearBufferuiv(m.COLOR,0,y)):(U[0]=Re,U[1]=Ce,U[2]=Ee,U[3]=le,m.clearBufferiv(m.COLOR,0,U))}else w|=m.COLOR_BUFFER_BIT}A&&(w|=m.DEPTH_BUFFER_BIT),D&&(w|=m.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),m.clear(w)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",q,!1),he.dispose(),F.dispose(),_e.dispose(),fe.dispose(),ot.dispose(),tt.dispose(),P.dispose(),ae.dispose(),Le.dispose(),B.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",vt),Q.removeEventListener("sessionend",Yn),Rt.stop()};function te(s){s.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),O=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),O=!1;const s=$e.autoReset,A=pe.enabled,D=pe.autoUpdate,w=pe.needsUpdate,R=pe.type;S(),$e.autoReset=s,pe.enabled=A,pe.autoUpdate=D,pe.needsUpdate=w,pe.type=R}function q(s){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",s.statusMessage)}function W(s){const A=s.target;A.removeEventListener("dispose",W),de(A)}function de(s){Ue(s),fe.remove(s)}function Ue(s){const A=fe.get(s).programs;A!==void 0&&(A.forEach(function(D){B.releaseProgram(D)}),s.isShaderMaterial&&B.releaseShaderCache(s))}this.renderBufferDirect=function(s,A,D,w,R,$){A===null&&(A=Pe);const oe=R.isMesh&&R.matrixWorld.determinant()<0,ue=br(s,A,D,w,R);ge.setMaterial(w,oe);let le=D.index,Re=1;if(w.wireframe===!0){if(le=a.getWireframeAttribute(D),le===void 0)return;Re=2}const Ce=D.drawRange,Ee=D.attributes.position;let ye=Ce.start*Re,Ve=(Ce.start+Ce.count)*Re;$!==null&&(ye=Math.max(ye,$.start*Re),Ve=Math.min(Ve,($.start+$.count)*Re)),le!==null?(ye=Math.max(ye,0),Ve=Math.min(Ve,le.count)):Ee!=null&&(ye=Math.max(ye,0),Ve=Math.min(Ve,Ee.count));const je=Ve-ye;if(je<0||je===1/0)return;ae.setup(R,w,ue,D,le);let Ke,ke=se;if(le!==null&&(Ke=d.get(le),ke=be,ke.setIndex(Ke)),R.isMesh)w.wireframe===!0?(ge.setLineWidth(w.wireframeLinewidth*Ne()),ke.setMode(m.LINES)):ke.setMode(m.TRIANGLES);else if(R.isLine){let Me=w.linewidth;Me===void 0&&(Me=1),ge.setLineWidth(Me*Ne()),R.isLineSegments?ke.setMode(m.LINES):R.isLineLoop?ke.setMode(m.LINE_LOOP):ke.setMode(m.LINE_STRIP)}else R.isPoints?ke.setMode(m.POINTS):R.isSprite&&ke.setMode(m.TRIANGLES);if(R.isBatchedMesh)if(R._multiDrawInstances!==null)sn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ke.renderMultiDrawInstances(R._multiDrawStarts,R._multiDrawCounts,R._multiDrawCount,R._multiDrawInstances);else if(Se.get("WEBGL_multi_draw"))ke.renderMultiDraw(R._multiDrawStarts,R._multiDrawCounts,R._multiDrawCount);else{const Me=R._multiDrawStarts,Qe=R._multiDrawCounts,Fe=R._multiDrawCount,dt=le?d.get(le).bytesPerElement:1,Nt=fe.get(w).currentProgram.getUniforms();for(let pt=0;pt<Fe;pt++)Nt.setValue(m,"_gl_DrawID",pt),ke.render(Me[pt]/dt,Qe[pt])}else if(R.isInstancedMesh)ke.renderInstances(ye,je,R.count);else if(D.isInstancedBufferGeometry){const Me=D._maxInstanceCount!==void 0?D._maxInstanceCount:1/0,Qe=Math.min(D.instanceCount,Me);ke.renderInstances(ye,je,Qe)}else ke.render(ye,je)};function Xe(s,A,D){s.transparent===!0&&s.side===Mt&&s.forceSinglePass===!1?(s.side=_t,s.needsUpdate=!0,tn(s,A,D),s.side=Zt,s.needsUpdate=!0,tn(s,A,D),s.side=Mt):tn(s,A,D)}this.compile=function(s,A,D=null){D===null&&(D=s),r=_e.get(D),r.init(A),b.push(r),D.traverseVisible(function(R){R.isLight&&R.layers.test(A.layers)&&(r.pushLight(R),R.castShadow&&r.pushShadow(R))}),s!==D&&s.traverseVisible(function(R){R.isLight&&R.layers.test(A.layers)&&(r.pushLight(R),R.castShadow&&r.pushShadow(R))}),r.setupLights();const w=new Set;return s.traverse(function(R){if(!(R.isMesh||R.isPoints||R.isLine||R.isSprite))return;const $=R.material;if($)if(Array.isArray($))for(let oe=0;oe<$.length;oe++){const ue=$[oe];Xe(ue,D,R),w.add(ue)}else Xe($,D,R),w.add($)}),r=b.pop(),w},this.compileAsync=function(s,A,D=null){const w=this.compile(s,A,D);return new Promise(R=>{function $(){if(w.forEach(function(oe){fe.get(oe).currentProgram.isReady()&&w.delete(oe)}),w.size===0){R(s);return}setTimeout($,10)}Se.get("KHR_parallel_shader_compile")!==null?$():setTimeout($,10)})};let He=null;function Et(s){He&&He(s)}function vt(){Rt.stop()}function Yn(){Rt.start()}const Rt=new Sr;Rt.setAnimationLoop(Et),typeof self<"u"&&Rt.setContext(self),this.setAnimationLoop=function(s){He=s,Q.setAnimationLoop(s),s===null?Rt.stop():Rt.start()},Q.addEventListener("sessionstart",vt),Q.addEventListener("sessionend",Yn),this.render=function(s,A){if(A!==void 0&&A.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;if(s.matrixWorldAutoUpdate===!0&&s.updateMatrixWorld(),A.parent===null&&A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(A),A=Q.getCamera()),s.isScene===!0&&s.onBeforeRender(_,s,A,V),r=_e.get(s,b.length),r.init(A),b.push(r),ee.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),Ye.setFromProjectionMatrix(ee,Jn,A.reversedDepth),re=this.localClippingEnabled,H=j.init(this.clippingPlanes,re),c=F.get(s,I.length),c.init(),I.push(c),Q.enabled===!0&&Q.isPresenting===!0){const $=_.xr.getDepthSensingMesh();$!==null&&gn($,A,-1/0,_.sortObjects)}gn(s,A,0,_.sortObjects),c.finish(),_.sortObjects===!0&&c.sort(ve,Te),et=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,et&&he.addToRenderList(c,s),this.info.render.frame++,H===!0&&j.beginShadows();const D=r.state.shadowsArray;pe.render(D,s,A),H===!0&&j.endShadows(),this.info.autoReset===!0&&this.info.reset();const w=c.opaque,R=c.transmissive;if(r.setupLights(),A.isArrayCamera){const $=A.cameras;if(R.length>0)for(let oe=0,ue=$.length;oe<ue;oe++){const le=$[oe];qn(w,R,s,le)}et&&he.render(s);for(let oe=0,ue=$.length;oe<ue;oe++){const le=$[oe];Kn(c,s,le,le.viewport)}}else R.length>0&&qn(w,R,s,A),et&&he.render(s),Kn(c,s,A);V!==null&&N===0&&(Ie.updateMultisampleRenderTarget(V),Ie.updateRenderTargetMipmap(V)),s.isScene===!0&&s.onAfterRender(_,s,A),ae.resetDefaultState(),p=-1,u=null,b.pop(),b.length>0?(r=b[b.length-1],H===!0&&j.setGlobalState(_.clippingPlanes,r.state.camera)):r=null,I.pop(),I.length>0?c=I[I.length-1]:c=null};function gn(s,A,D,w){if(s.visible===!1)return;if(s.layers.test(A.layers)){if(s.isGroup)D=s.renderOrder;else if(s.isLOD)s.autoUpdate===!0&&s.update(A);else if(s.isLight)r.pushLight(s),s.castShadow&&r.pushShadow(s);else if(s.isSprite){if(!s.frustumCulled||Ye.intersectsSprite(s)){w&&Ae.setFromMatrixPosition(s.matrixWorld).applyMatrix4(ee);const oe=P.update(s),ue=s.material;ue.visible&&c.push(s,oe,ue,D,Ae.z,null)}}else if((s.isMesh||s.isLine||s.isPoints)&&(!s.frustumCulled||Ye.intersectsObject(s))){const oe=P.update(s),ue=s.material;if(w&&(s.boundingSphere!==void 0?(s.boundingSphere===null&&s.computeBoundingSphere(),Ae.copy(s.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Ae.copy(oe.boundingSphere.center)),Ae.applyMatrix4(s.matrixWorld).applyMatrix4(ee)),Array.isArray(ue)){const le=oe.groups;for(let Re=0,Ce=le.length;Re<Ce;Re++){const Ee=le[Re],ye=ue[Ee.materialIndex];ye&&ye.visible&&c.push(s,oe,ye,D,Ae.z,Ee)}}else ue.visible&&c.push(s,oe,ue,D,Ae.z,null)}}const $=s.children;for(let oe=0,ue=$.length;oe<ue;oe++)gn($[oe],A,D,w)}function Kn(s,A,D,w){const R=s.opaque,$=s.transmissive,oe=s.transparent;r.setupLightsView(D),H===!0&&j.setGlobalState(_.clippingPlanes,D),w&&ge.viewport(M.copy(w)),R.length>0&&en(R,A,D),$.length>0&&en($,A,D),oe.length>0&&en(oe,A,D),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function qn(s,A,D,w){if((D.isScene===!0?D.overrideMaterial:null)!==null)return;r.state.transmissionRenderTarget[w.id]===void 0&&(r.state.transmissionRenderTarget[w.id]=new Ht(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float")?hn:It,minFilter:Xt,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));const $=r.state.transmissionRenderTarget[w.id],oe=w.viewport||M;$.setSize(oe.z*_.transmissionResolutionScale,oe.w*_.transmissionResolutionScale);const ue=_.getRenderTarget(),le=_.getActiveCubeFace(),Re=_.getActiveMipmapLevel();_.setRenderTarget($),_.getClearColor(k),J=_.getClearAlpha(),J<1&&_.setClearColor(16777215,.5),_.clear(),et&&he.render(D);const Ce=_.toneMapping;_.toneMapping=At;const Ee=w.viewport;if(w.viewport!==void 0&&(w.viewport=void 0),r.setupLightsView(w),H===!0&&j.setGlobalState(_.clippingPlanes,w),en(s,D,w),Ie.updateMultisampleRenderTarget($),Ie.updateRenderTargetMipmap($),Se.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let Ve=0,je=A.length;Ve<je;Ve++){const Ke=A[Ve],ke=Ke.object,Me=Ke.geometry,Qe=Ke.material,Fe=Ke.group;if(Qe.side===Mt&&ke.layers.test(w.layers)){const dt=Qe.side;Qe.side=_t,Qe.needsUpdate=!0,$n(ke,D,w,Me,Qe,Fe),Qe.side=dt,Qe.needsUpdate=!0,ye=!0}}ye===!0&&(Ie.updateMultisampleRenderTarget($),Ie.updateRenderTargetMipmap($))}_.setRenderTarget(ue,le,Re),_.setClearColor(k,J),Ee!==void 0&&(w.viewport=Ee),_.toneMapping=Ce}function en(s,A,D){const w=A.isScene===!0?A.overrideMaterial:null;for(let R=0,$=s.length;R<$;R++){const oe=s[R],ue=oe.object,le=oe.geometry,Re=oe.group;let Ce=oe.material;Ce.allowOverride===!0&&w!==null&&(Ce=w),ue.layers.test(D.layers)&&$n(ue,A,D,le,Ce,Re)}}function $n(s,A,D,w,R,$){s.onBeforeRender(_,A,D,w,R,$),s.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,s.matrixWorld),s.normalMatrix.getNormalMatrix(s.modelViewMatrix),R.onBeforeRender(_,A,D,w,s,$),R.transparent===!0&&R.side===Mt&&R.forceSinglePass===!1?(R.side=_t,R.needsUpdate=!0,_.renderBufferDirect(D,A,w,R,s,$),R.side=Zt,R.needsUpdate=!0,_.renderBufferDirect(D,A,w,R,s,$),R.side=Mt):_.renderBufferDirect(D,A,w,R,s,$),s.onAfterRender(_,A,D,w,R,$)}function tn(s,A,D){A.isScene!==!0&&(A=Pe);const w=fe.get(s),R=r.state.lights,$=r.state.shadowsArray,oe=R.state.version,ue=B.getParameters(s,R.state,$,A,D),le=B.getProgramCacheKey(ue);let Re=w.programs;w.environment=s.isMeshStandardMaterial?A.environment:null,w.fog=A.fog,w.envMap=(s.isMeshStandardMaterial?tt:ot).get(s.envMap||w.environment),w.envMapRotation=w.environment!==null&&s.envMap===null?A.environmentRotation:s.envMapRotation,Re===void 0&&(s.addEventListener("dispose",W),Re=new Map,w.programs=Re);let Ce=Re.get(le);if(Ce!==void 0){if(w.currentProgram===Ce&&w.lightsStateVersion===oe)return Qn(s,ue),Ce}else ue.uniforms=B.getUniforms(s),s.onBeforeCompile(ue,_),Ce=B.acquireProgram(ue,le),Re.set(le,Ce),w.uniforms=ue.uniforms;const Ee=w.uniforms;return(!s.isShaderMaterial&&!s.isRawShaderMaterial||s.clipping===!0)&&(Ee.clippingPlanes=j.uniform),Qn(s,ue),w.needsLights=Pr(s),w.lightsStateVersion=oe,w.needsLights&&(Ee.ambientLightColor.value=R.state.ambient,Ee.lightProbe.value=R.state.probe,Ee.directionalLights.value=R.state.directional,Ee.directionalLightShadows.value=R.state.directionalShadow,Ee.spotLights.value=R.state.spot,Ee.spotLightShadows.value=R.state.spotShadow,Ee.rectAreaLights.value=R.state.rectArea,Ee.ltc_1.value=R.state.rectAreaLTC1,Ee.ltc_2.value=R.state.rectAreaLTC2,Ee.pointLights.value=R.state.point,Ee.pointLightShadows.value=R.state.pointShadow,Ee.hemisphereLights.value=R.state.hemi,Ee.directionalShadowMap.value=R.state.directionalShadowMap,Ee.directionalShadowMatrix.value=R.state.directionalShadowMatrix,Ee.spotShadowMap.value=R.state.spotShadowMap,Ee.spotLightMatrix.value=R.state.spotLightMatrix,Ee.spotLightMap.value=R.state.spotLightMap,Ee.pointShadowMap.value=R.state.pointShadowMap,Ee.pointShadowMatrix.value=R.state.pointShadowMatrix),w.currentProgram=Ce,w.uniformsList=null,Ce}function Zn(s){if(s.uniformsList===null){const A=s.currentProgram.getUniforms();s.uniformsList=fn.seqWithValue(A.seq,s.uniforms)}return s.uniformsList}function Qn(s,A){const D=fe.get(s);D.outputColorSpace=A.outputColorSpace,D.batching=A.batching,D.batchingColor=A.batchingColor,D.instancing=A.instancing,D.instancingColor=A.instancingColor,D.instancingMorph=A.instancingMorph,D.skinning=A.skinning,D.morphTargets=A.morphTargets,D.morphNormals=A.morphNormals,D.morphColors=A.morphColors,D.morphTargetsCount=A.morphTargetsCount,D.numClippingPlanes=A.numClippingPlanes,D.numIntersection=A.numClipIntersection,D.vertexAlphas=A.vertexAlphas,D.vertexTangents=A.vertexTangents,D.toneMapping=A.toneMapping}function br(s,A,D,w,R){A.isScene!==!0&&(A=Pe),Ie.resetTextureUnits();const $=A.fog,oe=w.isMeshStandardMaterial?A.environment:null,ue=V===null?_.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:mn,le=(w.isMeshStandardMaterial?tt:ot).get(w.envMap||oe),Re=w.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,Ce=!!D.attributes.tangent&&(!!w.normalMap||w.anisotropy>0),Ee=!!D.morphAttributes.position,ye=!!D.morphAttributes.normal,Ve=!!D.morphAttributes.color;let je=At;w.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(je=_.toneMapping);const Ke=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ke=Ke!==void 0?Ke.length:0,Me=fe.get(w),Qe=r.state.lights;if(H===!0&&(re===!0||s!==u)){const st=s===u&&w.id===p;j.setState(w,s,st)}let Fe=!1;w.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==Qe.state.version||Me.outputColorSpace!==ue||R.isBatchedMesh&&Me.batching===!1||!R.isBatchedMesh&&Me.batching===!0||R.isBatchedMesh&&Me.batchingColor===!0&&R.colorTexture===null||R.isBatchedMesh&&Me.batchingColor===!1&&R.colorTexture!==null||R.isInstancedMesh&&Me.instancing===!1||!R.isInstancedMesh&&Me.instancing===!0||R.isSkinnedMesh&&Me.skinning===!1||!R.isSkinnedMesh&&Me.skinning===!0||R.isInstancedMesh&&Me.instancingColor===!0&&R.instanceColor===null||R.isInstancedMesh&&Me.instancingColor===!1&&R.instanceColor!==null||R.isInstancedMesh&&Me.instancingMorph===!0&&R.morphTexture===null||R.isInstancedMesh&&Me.instancingMorph===!1&&R.morphTexture!==null||Me.envMap!==le||w.fog===!0&&Me.fog!==$||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==j.numPlanes||Me.numIntersection!==j.numIntersection)||Me.vertexAlphas!==Re||Me.vertexTangents!==Ce||Me.morphTargets!==Ee||Me.morphNormals!==ye||Me.morphColors!==Ve||Me.toneMapping!==je||Me.morphTargetsCount!==ke)&&(Fe=!0):(Fe=!0,Me.__version=w.version);let dt=Me.currentProgram;Fe===!0&&(dt=tn(w,A,R));let Nt=!1,pt=!1,Wt=!1;const Je=dt.getUniforms(),ht=Me.uniforms;if(ge.useProgram(dt.program)&&(Nt=!0,pt=!0,Wt=!0),w.id!==p&&(p=w.id,pt=!0),Nt||u!==s){ge.buffers.depth.getReversed()&&s.reversedDepth!==!0&&(s._reversedDepth=!0,s.updateProjectionMatrix()),Je.setValue(m,"projectionMatrix",s.projectionMatrix),Je.setValue(m,"viewMatrix",s.matrixWorldInverse);const lt=Je.map.cameraPosition;lt!==void 0&&lt.setValue(m,xe.setFromMatrixPosition(s.matrixWorld)),Ge.logarithmicDepthBuffer&&Je.setValue(m,"logDepthBufFC",2/(Math.log(s.far+1)/Math.LN2)),(w.isMeshPhongMaterial||w.isMeshToonMaterial||w.isMeshLambertMaterial||w.isMeshBasicMaterial||w.isMeshStandardMaterial||w.isShaderMaterial)&&Je.setValue(m,"isOrthographic",s.isOrthographicCamera===!0),u!==s&&(u=s,pt=!0,Wt=!0)}if(R.isSkinnedMesh){Je.setOptional(m,R,"bindMatrix"),Je.setOptional(m,R,"bindMatrixInverse");const st=R.skeleton;st&&(st.boneTexture===null&&st.computeBoneTexture(),Je.setValue(m,"boneTexture",st.boneTexture,Ie))}R.isBatchedMesh&&(Je.setOptional(m,R,"batchingTexture"),Je.setValue(m,"batchingTexture",R._matricesTexture,Ie),Je.setOptional(m,R,"batchingIdTexture"),Je.setValue(m,"batchingIdTexture",R._indirectTexture,Ie),Je.setOptional(m,R,"batchingColorTexture"),R._colorsTexture!==null&&Je.setValue(m,"batchingColorTexture",R._colorsTexture,Ie));const mt=D.morphAttributes;if((mt.position!==void 0||mt.normal!==void 0||mt.color!==void 0)&&Z.update(R,D,dt),(pt||Me.receiveShadow!==R.receiveShadow)&&(Me.receiveShadow=R.receiveShadow,Je.setValue(m,"receiveShadow",R.receiveShadow)),w.isMeshGouraudMaterial&&w.envMap!==null&&(ht.envMap.value=le,ht.flipEnvMap.value=le.isCubeTexture&&le.isRenderTargetTexture===!1?-1:1),w.isMeshStandardMaterial&&w.envMap===null&&A.environment!==null&&(ht.envMapIntensity.value=A.environmentIntensity),pt&&(Je.setValue(m,"toneMappingExposure",_.toneMappingExposure),Me.needsLights&&Cr(ht,Wt),$&&w.fog===!0&&K.refreshFogUniforms(ht,$),K.refreshMaterialUniforms(ht,w,G,ne,r.state.transmissionRenderTarget[s.id]),fn.upload(m,Zn(Me),ht,Ie)),w.isShaderMaterial&&w.uniformsNeedUpdate===!0&&(fn.upload(m,Zn(Me),ht,Ie),w.uniformsNeedUpdate=!1),w.isSpriteMaterial&&Je.setValue(m,"center",R.center),Je.setValue(m,"modelViewMatrix",R.modelViewMatrix),Je.setValue(m,"normalMatrix",R.normalMatrix),Je.setValue(m,"modelMatrix",R.matrixWorld),w.isShaderMaterial||w.isRawShaderMaterial){const st=w.uniformsGroups;for(let lt=0,En=st.length;lt<En;lt++){const bt=st[lt];Le.update(bt,dt),Le.bind(bt,dt)}}return dt}function Cr(s,A){s.ambientLightColor.needsUpdate=A,s.lightProbe.needsUpdate=A,s.directionalLights.needsUpdate=A,s.directionalLightShadows.needsUpdate=A,s.pointLights.needsUpdate=A,s.pointLightShadows.needsUpdate=A,s.spotLights.needsUpdate=A,s.spotLightShadows.needsUpdate=A,s.rectAreaLights.needsUpdate=A,s.hemisphereLights.needsUpdate=A}function Pr(s){return s.isMeshLambertMaterial||s.isMeshToonMaterial||s.isMeshPhongMaterial||s.isMeshStandardMaterial||s.isShadowMaterial||s.isShaderMaterial&&s.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(s,A,D){const w=fe.get(s);w.__autoAllocateDepthBuffer=s.resolveDepthBuffer===!1,w.__autoAllocateDepthBuffer===!1&&(w.__useRenderToTexture=!1),fe.get(s.texture).__webglTexture=A,fe.get(s.depthTexture).__webglTexture=w.__autoAllocateDepthBuffer?void 0:D,w.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(s,A){const D=fe.get(s);D.__webglFramebuffer=A,D.__useDefaultFramebuffer=A===void 0};const Ur=m.createFramebuffer();this.setRenderTarget=function(s,A=0,D=0){V=s,L=A,N=D;let w=!0,R=null,$=!1,oe=!1;if(s){const le=fe.get(s);if(le.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(m.FRAMEBUFFER,null),w=!1;else if(le.__webglFramebuffer===void 0)Ie.setupRenderTarget(s);else if(le.__hasExternalTextures)Ie.rebindTextures(s,fe.get(s.texture).__webglTexture,fe.get(s.depthTexture).__webglTexture);else if(s.depthBuffer){const Ee=s.depthTexture;if(le.__boundDepthTexture!==Ee){if(Ee!==null&&fe.has(Ee)&&(s.width!==Ee.image.width||s.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(s)}}const Re=s.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(oe=!0);const Ce=fe.get(s).__webglFramebuffer;s.isWebGLCubeRenderTarget?(Array.isArray(Ce[A])?R=Ce[A][D]:R=Ce[A],$=!0):s.samples>0&&Ie.useMultisampledRTT(s)===!1?R=fe.get(s).__webglMultisampledFramebuffer:Array.isArray(Ce)?R=Ce[D]:R=Ce,M.copy(s.viewport),Y.copy(s.scissor),X=s.scissorTest}else M.copy(we).multiplyScalar(G).floor(),Y.copy(Oe).multiplyScalar(G).floor(),X=it;if(D!==0&&(R=Ur),ge.bindFramebuffer(m.FRAMEBUFFER,R)&&w&&ge.drawBuffers(s,R),ge.viewport(M),ge.scissor(Y),ge.setScissorTest(X),$){const le=fe.get(s.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_CUBE_MAP_POSITIVE_X+A,le.__webglTexture,D)}else if(oe){const le=A;for(let Re=0;Re<s.textures.length;Re++){const Ce=fe.get(s.textures[Re]);m.framebufferTextureLayer(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0+Re,Ce.__webglTexture,D,le)}}else if(s!==null&&D!==0){const le=fe.get(s.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,le.__webglTexture,D)}p=-1},this.readRenderTargetPixels=function(s,A,D,w,R,$,oe,ue=0){if(!(s&&s.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let le=fe.get(s).__webglFramebuffer;if(s.isWebGLCubeRenderTarget&&oe!==void 0&&(le=le[oe]),le){ge.bindFramebuffer(m.FRAMEBUFFER,le);try{const Re=s.textures[ue],Ce=Re.format,Ee=Re.type;if(!Ge.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}A>=0&&A<=s.width-w&&D>=0&&D<=s.height-R&&(s.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+ue),m.readPixels(A,D,w,R,me.convert(Ce),me.convert(Ee),$))}finally{const Re=V!==null?fe.get(V).__webglFramebuffer:null;ge.bindFramebuffer(m.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(s,A,D,w,R,$,oe,ue=0){if(!(s&&s.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let le=fe.get(s).__webglFramebuffer;if(s.isWebGLCubeRenderTarget&&oe!==void 0&&(le=le[oe]),le)if(A>=0&&A<=s.width-w&&D>=0&&D<=s.height-R){ge.bindFramebuffer(m.FRAMEBUFFER,le);const Re=s.textures[ue],Ce=Re.format,Ee=Re.type;if(!Ge.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ye=m.createBuffer();m.bindBuffer(m.PIXEL_PACK_BUFFER,ye),m.bufferData(m.PIXEL_PACK_BUFFER,$.byteLength,m.STREAM_READ),s.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+ue),m.readPixels(A,D,w,R,me.convert(Ce),me.convert(Ee),0);const Ve=V!==null?fe.get(V).__webglFramebuffer:null;ge.bindFramebuffer(m.FRAMEBUFFER,Ve);const je=m.fenceSync(m.SYNC_GPU_COMMANDS_COMPLETE,0);return m.flush(),await Nr(m,je,4),m.bindBuffer(m.PIXEL_PACK_BUFFER,ye),m.getBufferSubData(m.PIXEL_PACK_BUFFER,0,$),m.deleteBuffer(ye),m.deleteSync(je),$}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(s,A=null,D=0){const w=Math.pow(2,-D),R=Math.floor(s.image.width*w),$=Math.floor(s.image.height*w),oe=A!==null?A.x:0,ue=A!==null?A.y:0;Ie.setTexture2D(s,0),m.copyTexSubImage2D(m.TEXTURE_2D,D,0,0,oe,ue,R,$),ge.unbindTexture()};const Lr=m.createFramebuffer(),Dr=m.createFramebuffer();this.copyTextureToTexture=function(s,A,D=null,w=null,R=0,$=null){$===null&&(R!==0?(sn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),$=R,R=0):$=0);let oe,ue,le,Re,Ce,Ee,ye,Ve,je;const Ke=s.isCompressedTexture?s.mipmaps[$]:s.image;if(D!==null)oe=D.max.x-D.min.x,ue=D.max.y-D.min.y,le=D.isBox3?D.max.z-D.min.z:1,Re=D.min.x,Ce=D.min.y,Ee=D.isBox3?D.min.z:0;else{const mt=Math.pow(2,-R);oe=Math.floor(Ke.width*mt),ue=Math.floor(Ke.height*mt),s.isDataArrayTexture?le=Ke.depth:s.isData3DTexture?le=Math.floor(Ke.depth*mt):le=1,Re=0,Ce=0,Ee=0}w!==null?(ye=w.x,Ve=w.y,je=w.z):(ye=0,Ve=0,je=0);const ke=me.convert(A.format),Me=me.convert(A.type);let Qe;A.isData3DTexture?(Ie.setTexture3D(A,0),Qe=m.TEXTURE_3D):A.isDataArrayTexture||A.isCompressedArrayTexture?(Ie.setTexture2DArray(A,0),Qe=m.TEXTURE_2D_ARRAY):(Ie.setTexture2D(A,0),Qe=m.TEXTURE_2D),m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,A.flipY),m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),m.pixelStorei(m.UNPACK_ALIGNMENT,A.unpackAlignment);const Fe=m.getParameter(m.UNPACK_ROW_LENGTH),dt=m.getParameter(m.UNPACK_IMAGE_HEIGHT),Nt=m.getParameter(m.UNPACK_SKIP_PIXELS),pt=m.getParameter(m.UNPACK_SKIP_ROWS),Wt=m.getParameter(m.UNPACK_SKIP_IMAGES);m.pixelStorei(m.UNPACK_ROW_LENGTH,Ke.width),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,Ke.height),m.pixelStorei(m.UNPACK_SKIP_PIXELS,Re),m.pixelStorei(m.UNPACK_SKIP_ROWS,Ce),m.pixelStorei(m.UNPACK_SKIP_IMAGES,Ee);const Je=s.isDataArrayTexture||s.isData3DTexture,ht=A.isDataArrayTexture||A.isData3DTexture;if(s.isDepthTexture){const mt=fe.get(s),st=fe.get(A),lt=fe.get(mt.__renderTarget),En=fe.get(st.__renderTarget);ge.bindFramebuffer(m.READ_FRAMEBUFFER,lt.__webglFramebuffer),ge.bindFramebuffer(m.DRAW_FRAMEBUFFER,En.__webglFramebuffer);for(let bt=0;bt<le;bt++)Je&&(m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,fe.get(s).__webglTexture,R,Ee+bt),m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,fe.get(A).__webglTexture,$,je+bt)),m.blitFramebuffer(Re,Ce,oe,ue,ye,Ve,oe,ue,m.DEPTH_BUFFER_BIT,m.NEAREST);ge.bindFramebuffer(m.READ_FRAMEBUFFER,null),ge.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else if(R!==0||s.isRenderTargetTexture||fe.has(s)){const mt=fe.get(s),st=fe.get(A);ge.bindFramebuffer(m.READ_FRAMEBUFFER,Lr),ge.bindFramebuffer(m.DRAW_FRAMEBUFFER,Dr);for(let lt=0;lt<le;lt++)Je?m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,mt.__webglTexture,R,Ee+lt):m.framebufferTexture2D(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,mt.__webglTexture,R),ht?m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,st.__webglTexture,$,je+lt):m.framebufferTexture2D(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,st.__webglTexture,$),R!==0?m.blitFramebuffer(Re,Ce,oe,ue,ye,Ve,oe,ue,m.COLOR_BUFFER_BIT,m.NEAREST):ht?m.copyTexSubImage3D(Qe,$,ye,Ve,je+lt,Re,Ce,oe,ue):m.copyTexSubImage2D(Qe,$,ye,Ve,Re,Ce,oe,ue);ge.bindFramebuffer(m.READ_FRAMEBUFFER,null),ge.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else ht?s.isDataTexture||s.isData3DTexture?m.texSubImage3D(Qe,$,ye,Ve,je,oe,ue,le,ke,Me,Ke.data):A.isCompressedArrayTexture?m.compressedTexSubImage3D(Qe,$,ye,Ve,je,oe,ue,le,ke,Ke.data):m.texSubImage3D(Qe,$,ye,Ve,je,oe,ue,le,ke,Me,Ke):s.isDataTexture?m.texSubImage2D(m.TEXTURE_2D,$,ye,Ve,oe,ue,ke,Me,Ke.data):s.isCompressedTexture?m.compressedTexSubImage2D(m.TEXTURE_2D,$,ye,Ve,Ke.width,Ke.height,ke,Ke.data):m.texSubImage2D(m.TEXTURE_2D,$,ye,Ve,oe,ue,ke,Me,Ke);m.pixelStorei(m.UNPACK_ROW_LENGTH,Fe),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,dt),m.pixelStorei(m.UNPACK_SKIP_PIXELS,Nt),m.pixelStorei(m.UNPACK_SKIP_ROWS,pt),m.pixelStorei(m.UNPACK_SKIP_IMAGES,Wt),$===0&&A.generateMipmaps&&m.generateMipmap(Qe),ge.unbindTexture()},this.copyTextureToTexture3D=function(s,A,D=null,w=null,R=0){return sn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(s,A,D,w,R)},this.initRenderTarget=function(s){fe.get(s).__webglFramebuffer===void 0&&Ie.setupRenderTarget(s)},this.initTexture=function(s){s.isCubeTexture?Ie.setTextureCube(s,0):s.isData3DTexture?Ie.setTexture3D(s,0):s.isDataArrayTexture||s.isCompressedArrayTexture?Ie.setTexture2DArray(s,0):Ie.setTexture2D(s,0),ge.unbindTexture()},this.resetState=function(){L=0,N=0,V=null,ge.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(n),t.unpackColorSpace=nt._getUnpackColorSpace()}}function Gf(e,n=!1){const t=e[0].index!==null,i=new Set(Object.keys(e[0].attributes)),l=new Set(Object.keys(e[0].morphAttributes)),o={},h={},f=e[0].morphTargetsRelative,C=new zn;let x=0;for(let T=0;T<e.length;++T){const v=e[T];let E=0;if(t!==(v.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const g in v.attributes){if(!i.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;o[g]===void 0&&(o[g]=[]),o[g].push(v.attributes[g]),E++}if(E!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+". Make sure all geometries have the same number of attributes."),null;if(f!==v.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const g in v.morphAttributes){if(!l.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+".  .morphAttributes must be consistent throughout all geometries."),null;h[g]===void 0&&(h[g]=[]),h[g].push(v.morphAttributes[g])}if(n){let g;if(t)g=v.index.count;else if(v.attributes.position!==void 0)g=v.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+". The geometry must have either an index or a position attribute"),null;C.addGroup(x,g,T),x+=g}}if(t){let T=0;const v=[];for(let E=0;E<e.length;++E){const g=e[E].index;for(let y=0;y<g.count;++y)v.push(g.getX(y)+T);T+=e[E].attributes.position.count}C.setIndex(v)}for(const T in o){const v=nr(o[T]);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+T+" attribute."),null;C.setAttribute(T,v)}for(const T in h){const v=h[T][0].length;if(v===0)break;C.morphAttributes=C.morphAttributes||{},C.morphAttributes[T]=[];for(let E=0;E<v;++E){const g=[];for(let U=0;U<h[T].length;++U)g.push(h[T][U][E]);const y=nr(g);if(!y)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+T+" morphAttribute."),null;C.morphAttributes[T].push(y)}}return C}function nr(e){let n,t,i,l=-1,o=0;for(let x=0;x<e.length;++x){const T=e[x];if(n===void 0&&(n=T.array.constructor),n!==T.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=T.itemSize),t!==T.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=T.normalized),i!==T.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(l===-1&&(l=T.gpuType),l!==T.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=T.count*t}const h=new n(o),f=new qt(h,t,i);let C=0;for(let x=0;x<e.length;++x){const T=e[x];if(T.isInterleavedBufferAttribute){const v=C/t;for(let E=0,g=T.count;E<g;E++)for(let y=0;y<t;y++){const U=T.getComponent(E,y);f.setComponent(E+v,y,U)}}else h.set(T.array,C);C+=T.count*t}return l!==void 0&&(f.gpuType=l),f}export{Bf as W,Gf as m};
