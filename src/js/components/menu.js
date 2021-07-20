import gsap from 'gsap';
import MenuItem from './menuItem';
import { throttle } from './utils/throttle';

export default class Menu {
    constructor(targetItem) {
        this.elms = { target: targetItem };
        this.elms.menuItems = this.elms.target.querySelectorAll('[data-menu="item"]');
        this.menuItems = [];
        // 配列に要素を追加
        this.elms.menuItems.forEach((target) => this.menuItems.push(new MenuItem(target)));

        this.wd = window.innerWidth;
        this.wh = window.innerHeight;
        this.isSp = 768;
        this.flg = {
            sp: false,
        };

        this.btn = document.querySelector('[data-menu="toggle"]');
        this.wrap = document.querySelector('[data-menu="wrap"]');
        this.link = document.querySelectorAll('[data-menu="link"]');
        // this.top = document.querySelector('[data-menu="top"]');
        // this.center = document.querySelector('[data-menu="center"]');
        // this.bottom = document.querySelector('[data-menu="bottom"]');
        this.border = document.querySelectorAll('[data-menu="border"]');
        this.arrow = document.querySelector('[data-menu="arrow"]');
        this.hey = document.querySelector('[data-menu="hey"]');
        this.text = document.querySelector('[data-menu="click"]');
        this.yes = document.querySelector('[data-menu="yes"]');
        this.thanks = document.querySelector('[data-menu="thanks"]');
        this.addClass = 'is-active';

        this.init();
        this.click();
        this.handleEvents();
    }
    init() {
        this.btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
        });
    }
    click() {
        this.link.forEach((elm) => {
            elm.addEventListener('click', () => {
                this.toggle();
            });
        });
    }
    toggle() {
        if (this.wrap.classList.contains(this.addClass)) {
            gsap.to(this.wrap, {
                duration: 0.3,
                ease: 'power2.easeOut',
                opacity: 0,
            });
            gsap.to(
                this.wrap,
                {
                    duration: 0.3,
                    ease: 'power2.easeOut',
                    visibility: 'hidden',
                },
                3
            );
            gsap.to(this.arrow, {
                duration: 0.3,
                ease: 'power2.easeOut',
                opacity: 1,
            });
            gsap.to(this.yes, {
                duration: 0.3,
                ease: 'power2.easeOut',
                visibility: 'hidden',
            });
            gsap.to(this.thanks, {
                duration: 0.3,
                ease: 'power2.easeOut',
                visibility: 'hidden',
            });
            gsap.to(this.hey, {
                duration: 0.3,
                ease: 'power2.easeOut',
                visibility: 'visible',
            });
            gsap.to(this.text, {
                duration: 0.3,
                ease: 'power2.easeOut',
                visibility: 'visible',
            });
            gsap.to(this.border, {
                onComplete: function () {
                    this.targets().forEach((elm) => elm.classList.remove('is-active'));
                },
            });
            setTimeout(() => {
                this.wrap.classList.remove(this.addClass);
            }, 1500);
        } else {
            //　開く処理
            this.wrap.classList.add(this.addClass);
            gsap.to(this.wrap, {
                duration: 0.3,
                ease: 'power2.easeOut',
                opacity: 1,
                visibility: 'visible',
            });
            gsap.to(this.arrow, {
                duration: 0.3,
                ease: 'power2.easeOut',
                opacity: 0,
            });
            gsap.to(this.hey, {
                duration: 0.3,
                ease: 'power2.easeOut',
                visibility: 'hidden',
            });
            gsap.to(this.text, {
                duration: 0.3,
                ease: 'power2.easeOut',
                visibility: 'hidden',
            });
            gsap.to(this.yes, {
                duration: 0.3,
                ease: 'power2.easeOut',
                visibility: 'visible',
            });
            gsap.to(this.thanks, {
                duration: 0.3,
                ease: 'power2.easeOut',
                visibility: 'visible',
            });
            gsap.to(this.border, {
                onComplete: function () {
                    this.targets().forEach((elm) => elm.classList.add('is-active'));
                },
            });
        }
    }
    handleEvents() {
        window.addEventListener('resize', throttle(this.handleResize.bind(this)), false);
    }
    handleResize() {
        // リサイズ処理
        if (this.wd !== window.innerWidth) {
            this.wd = window.innerWidth;
            this.wh = window.innerHeight;
        }
        if (this.wd > this.isSp) {
            this.flg.sp = true;
        }
    }
}
