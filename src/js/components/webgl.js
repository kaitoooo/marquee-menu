import * as THREE from 'three/build/three.module.js';
import vertexShader from './glsl/vertexshader.vert';
import fragmentShader from './glsl/fragmentshader.frag';
import { throttle } from './utils/throttle';
import { gsap } from 'gsap';

export default class Webgl {
    constructor(hoverTarget, imgs) {
        this.elms = {
            canvas: document.querySelector('[data-size]'),
            hoverTarget: hoverTarget,
            imgs: imgs,
        };
        this.wd = this.elms.canvas.clientWidth;
        this.wh = this.elms.canvas.clientHeight;

        this.three = {
            canvas: null,
            scene: null,
            renderer: null,
            camera: null,
            redraw: null,
            mat: null,
            obj: null,
            mesh: null,
            geo: null,
        };
        this.flg = {
            loaded: false,
        };
        this.init();
    }
    init() {
        this.initRenderer();
        this.initScene();
        this.initCamera();
        this.setLoading();
        this.handleEvents();
        this.mouseEnter();
        this.mouseLeave();
    }
    initScene() {
        this.three.scene = new THREE.Scene();
    }
    initRenderer() {
        const hoverTarget = document.querySelector(this.elms.hoverTarget);
        // レンダラーの初期化
        this.three.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true, //背景色を設定しないとき、背景を透明にする
        });
        this.three.renderer.setPixelRatio(window.devicePixelRatio);
        this.elms.canvas.style.borderRadius = '50%';
        this.three.renderer.setSize(this.wd, this.wh);
        this.three.renderer.physicallyCorrectLights = true;
        this.three.renderer.shadowMap.enabled = true;
        this.three.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        hoverTarget.appendChild(this.three.renderer.domElement);
    }
    setLoading() {
        // 使用する画像
        const imgs = this.elms.imgs;
        const assetUrls = imgs;

        let cnt = 0;
        let textureArr = [];
        this.three.obj = { trans: 0 };

        // テクスチャの初期化
        assetUrls.forEach((url, index) => {
            let img = new Image();

            let texture = new THREE.Texture();
            texture.flipY = false;
            textureArr.push(texture);

            img.onload = function (_index, _img) {
                let texture = textureArr[_index];
                texture.image = _img;
                texture.needsUpdate = true;

                cnt++;
                if (cnt == 3) {
                    this.flg.loaded = true;
                    this.rendering();
                }
            }.bind(this, index, img);

            img.crossOrigin = 'Anonymous';
            img.src = url;
        });
        // テクスチャーを定義してfragmentShaderへ送る
        this.three.mat = new THREE.RawShaderMaterial({
            uniforms: {
                uTrans: { value: this.three.obj.trans },
                uTexture0: { value: textureArr[0] },
                uTexture1: { value: textureArr[1] },
                uDisp: { value: textureArr[2] },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });

        this.three.geo = new THREE.PlaneGeometry(2, 2);
        this.three.mesh = new THREE.Mesh(this.three.geo, this.three.mat);
        this.three.scene.add(this.three.mesh);
        this.flg.loaded = true;
    }
    initCamera() {
        // カメラの初期化
        this.three.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
        this.three.camera.position.z = 1;
    }
    rendering() {
        this.three.mat.uniforms.uTrans.value = this.three.obj.trans;
        this.three.renderer.render(this.three.scene, this.three.camera);
        requestAnimationFrame(this.rendering.bind(this));
    }
    mouseEnter() {
        gsap.killTweensOf(this.three.obj);
        gsap.to(this.three.obj, 1.5, { trans: 1 });
    }
    mouseLeave() {
        gsap.killTweensOf(this.three.obj);
        gsap.to(this.three.obj, 1.5, { trans: 0 });
    }
    handleResize() {
        // リサイズ処理
        if (this.wd !== window.innerWidth) {
            this.wd = this.elms.canvas.clientWidth;
            this.wh = this.elms.canvas.clientHeight;
            this.three.camera.updateProjectionMatrix();
            this.three.renderer.setSize(this.wd, this.wh);
            this.three.renderer.setPixelRatio(window.devicePixelRatio);
        }
    }
    handleEvents() {
        const hoverTarget = document.querySelector(this.elms.hoverTarget);

        hoverTarget.addEventListener('mouseenter', () => {
            this.mouseEnter();
        });
        hoverTarget.addEventListener('mouseleave', () => {
            this.mouseLeave();
        });
        window.addEventListener('resize', throttle(this.handleResize.bind(this)), false);
    }
}
