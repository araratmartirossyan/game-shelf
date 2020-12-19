<template>
  <div class="wrapper" :data-open="state === 'open' ? 1 : 0">
    <div class="bg" @click="() => setState('half')"></div>
    <div
      ref="card"
      id="card"
      class="card"
      :data-state="isMove ? 'move' : state"
      :style="{ top: `${isMove ? y : calcY()}px` }"
    >
      <div class="pan-area" ref="pan" id="pan">
        <div class="bar" id="bar" ref="bar"></div>
      </div>
      <div class="contents">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs';

export default {
  props: {
    openY: {
      type: Number,
      default: 0.1,
    },
    halfY: {
      type: Number,
      default: 0.6,
    },
    defaultState: {
      type: String,
      default: 'half',
    },
  },
  // setup(props) {
  //   const card = ref()
  //   const pan = ref()
  //   const bar = ref()
  //   const mc = ref()
  //   const y = ref()
  //   const startY = ref()
  //   const isMove = ref()
  //   const state = ref({})
  //   const rect = ref({})

  // },
  data() {
    return {
      mc: null,
      y: 0,
      startY: 0,
      isMove: false,
      state: this.defaultState,
      rect: {},
    };
  },
  mounted() {
    window.onresize = () => {
      const card = document.getElementById('card');
      this.rect = card.getBoundingClientRect();
    };
    const card = document.getElementById('card');
    this.rect = card.getBoundingClientRect();
    const pan = document.getElementById('pan');

    this.mc = new Hammer(pan);
    this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    this.mc.on('panup pandown', evt => {
      this.y = evt.center.y - 16;
    });

    this.mc.on('panstart', evt => {
      this.startY = evt.center.y;
      this.isMove = true;
    });

    this.mc.on('panend', evt => {
      this.isMove = false;

      switch (this.state) {
        case 'half':
          if (this.startY - evt.center.y > 120) {
            this.state = 'open';
          }

          if (this.startY - evt.center.y < -50) {
            this.state = 'close';
          }
          break;
        case 'open':
          if (this.startY - evt.center.y < -120) {
            this.state = 'half';
          }
          break;
      }
    });
  },
  beforeUnmount() {
    this.mc.destroy();
    window.onresize = null;
  },
  methods: {
    calcY() {
      switch (this.state) {
        case 'close':
          return this.rect.height;
        case 'open':
          return this.rect.height * this.openY;
        case 'half':
          return this.rect.height * this.halfY;
        default:
          return this.y;
      }
    },
    setState(state) {
      this.state = state;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper[data-open='1'] {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1px;
}

.wrapper[data-open='1'] .bg {
  display: block;
  transition: all 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.card {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -3px 4px rgba(0, 0, 0, 0.1);
  left: 0;
  border-top-left-radius: 34px;
  border-top-right-radius: 34px;
}

.card[data-state='half'],
.card[data-state='open'],
.card[data-state='close'] {
  transition: top 0.3s ease-out;
}

.card[data-state='close'] {
  box-shadow: none;
}

.bar {
  width: 45px;
  height: 8px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  cursor: pointer;
}

.pan-area {
  padding: 12px 0;
}

.contents {
  overflow-y: scroll;
  max-height: 100%;
  padding-bottom: calc(100vh * 0.2);
  box-sizing: border-box;
}
</style>
