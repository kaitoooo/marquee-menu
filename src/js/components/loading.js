import { gsap } from 'gsap';
import { throttle } from './utils/throttle';

export default class Loading {
    constructor() {
        this.elms = {
            loadingWrap: document.querySelector('[data-loading="wrap"]'),
            loadingInner: document.querySelector('[data-loading="inner"]'),
            kvBlock: document.querySelector('[data-kv="block"]'),
        };
        this.wd = window.innerWidth;
        this.sp = 768;
        this.init();
    }
    init() {
        this.start();
        this.handleEvents();
        gsap.config({
            force3D: true,
        });
    }
    start() {
        // マウスが現れる処理
        const tl = gsap.timeline({
            defaults: {
                ease: 'power2.ease',
            },
        });

        if (this.wd <= this.sp) {
            tl.to(
                this.elms.loadingInner,
                {
                    duration: 0.3,
                    opacity: 0,
                },
                2.8
            );
            tl.to(
                this.elms.loadingWrap,
                {
                    duration: 0.9,
                    scale: 0,
                },
                3.0
            );
            tl.to(
                this.elms.loadingInner,
                {
                    duration: 0.3,
                    opacity: 0,
                },
                2.8
            );
            tl.to(
                this.elms.loadingWrap,
                {
                    duration: 0.9,
                    scale: 0,
                },
                3.0
            );
            tl.to(
                this.elms.kvBlock,
                {
                    duration: 0.9,
                    opacity: 1,
                    top: '42%',
                },
                3.7
            );
        } else {
            tl.to(
                this.elms.loadingInner,
                {
                    duration: 0.3,
                    opacity: 0,
                },
                2.8
            );
            tl.to(
                this.elms.loadingWrap,
                {
                    duration: 0.9,
                    scale: 0,
                },
                3.0
            );
            tl.to(
                this.elms.loadingInner,
                {
                    duration: 0.3,
                    opacity: 0,
                },
                2.8
            );
            tl.to(
                this.elms.loadingWrap,
                {
                    duration: 0.9,
                    scale: 0,
                },
                3.0
            );
            tl.to(
                this.elms.kvBlock,
                {
                    duration: 0.9,
                    opacity: 1,
                    top: '50%',
                },
                3.7
            );
        }
        tl.play();
    }
    handleEvents() {
        window.addEventListener('resize', throttle(this.handleResize.bind(this)), false);
    }
    handleResize() {
        // リサイズ処理
        if (this.wd !== window.innerWidth) {
            this.wd = window.innerWidth;
        }
    }
}
