import { gsap } from 'gsap';
import { closestEdge } from './utils/closestEdge';

export default class MenuItem {
    constructor(targetItem) {
        this.elms = { target: targetItem };
        this.elms.link = this.elms.target.querySelector('[data-menu="link"]');
        this.elms.marquee = this.elms.target.querySelector('[data-menu="marquee"]');
        this.elms.marqueeInner = this.elms.marquee.querySelector('[data-menu="wrap"]');
        this.animationDefaults = { duration: 0.6, ease: 'expo' };
        this.init();
    }
    init() {
        this.onMouseEnterFn = (ev) => this.mouseEnter(ev);
        this.elms.link.addEventListener('mouseenter', this.onMouseEnterFn);
        this.onMouseLeaveFn = (ev) => this.mouseLeave(ev);
        this.elms.link.addEventListener('mouseleave', this.onMouseLeaveFn);
    }
    mouseEnter(ev) {
        // マウスに一番近い箇所を取得
        const edge = this.findClosestEdge(ev);

        gsap.timeline({ defaults: this.animationDefaults })
            .set(this.elms.marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(this.elms.marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
            .to([this.elms.marquee, this.elms.marqueeInner], { y: '0%' }, 0);
    }
    mouseLeave(ev) {
        // マウスに一番近い箇所を取得
        const edge = this.findClosestEdge(ev);

        gsap.timeline({ defaults: this.animationDefaults })
            .to(this.elms.marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(this.elms.marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    }
    // mouseenterかmouseleaveするときにマウスに一番近い箇所を見つける
    findClosestEdge(ev) {
        const x = ev.pageX - this.elms.target.offsetLeft;
        const y = ev.pageY - this.elms.target.offsetTop;
        return closestEdge(x, y, this.elms.target.clientWidth, this.elms.target.clientHeight);
    }
}
