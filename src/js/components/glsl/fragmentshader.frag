precision mediump float;

uniform float uTrans;
uniform sampler2D uTexture0;// webgl.js 95行目で定義したテクスチャーを受け取る
uniform sampler2D uTexture1;// webgl.js 96行目で定義したテクスチャーを受け取る
uniform sampler2D uDisp;// webgl.js 97行目で定義したテクスチャーを受け取る

varying vec2 vUv;

float quarticInOut(float t) {
  return t < 0.5 ? + 8.0 * pow(t, 4.0) : -8.0 * pow(t - 1.0, 4.0) + 1.0;
}

void main() {
	// texture2Dでテクスチャーの色情報を取得し、gl_FragColorへ渡す
	vec4 disp = texture2D(uDisp, vec2(0.0, 0.5) + (vUv - vec2(0.0, 0.5)) * (0.2 + 0.8 * (1.0 - uTrans)) );
	float trans = clamp(1.6  * uTrans - disp.r * 0.4 - vUv.x * 0.2, 0.0, 1.0);
	trans = quarticInOut(trans);
	vec4 color0 = texture2D(uTexture0, vec2(0.5 - 0.3 * trans, 0.5) + (vUv - vec2(0.5)) * (1.0 - 0.2 * trans));
	vec4 color1 = texture2D(uTexture1, vec2(0.5 + sin( (1.0 - trans) * 0.1), 0.5 ) + (vUv - vec2(0.5)) * (0.9 + 0.1 * trans));
	// 色情報を受け取り、canvasで表示させる.mix関数でテクスチャーの色情報を混ぜる
	gl_FragColor = mix(color0, color1 , trans);
}