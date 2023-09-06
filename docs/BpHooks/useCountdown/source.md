## 倒计时hook源码

```ts
import { bpFixed } from 'bp-math';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // 记得导入这个插件
import { Ref } from 'vue';
dayjs.extend(duration); // 安到 dayjs

type ICountdownType = 'Y' | 'M' | 'D' | 'h' | 'm' | 's';
/**
 * 获取倒计时
 * @param targetTime 目标时间戳(毫秒)
 * @param {String} format 格式：Y年，M月，D日，h时，m分，s秒
 * @returns
 */
export function getCountDown(targetStamp: number | string, format: ICountdownType) {
  function _toTwo(num) {
    return String(num).length < 2 ? '0' + num : num;
  }
  const now: any = dayjs(); // 当前时间戳
  const diffTime = dayjs.duration(+targetStamp - now); // 相差的时间(时间戳)

  // const targetTime = '2022/11/15'; // 目标时间
  // const targetStamp = new Date(targetTime).getTime(); // 目标时间戳
  if (format === 'M') {
    // 精确到月
    const months = _toTwo(Math.floor(diffTime.asMonths()));
    const days = _toTwo(diffTime.days());
    const hours = _toTwo(bpFixed(diffTime.hours()));
    const minutes = _toTwo(diffTime.minutes());
    const seconds = _toTwo(diffTime.seconds());

    return {
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  } else if (format === 'D') {
    // 精确到天
    const days = _toTwo(Math.floor(diffTime.asDays()));
    const hours = _toTwo(bpFixed(diffTime.hours()));
    const minutes = _toTwo(diffTime.minutes());
    const seconds = _toTwo(diffTime.seconds());

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  } else if (format === 'h') {
    // 精确到时
    const hours = _toTwo(Math.floor(diffTime.asHours()));
    const minutes = _toTwo(diffTime.minutes());
    const seconds = _toTwo(diffTime.seconds());

    return {
      hours,
      minutes,
      seconds,
    };
  } else if (format === 'm') {
    // 精确到分
    const minutes = _toTwo(Math.floor(diffTime.asMinutes()));
    const seconds = _toTwo(diffTime.seconds());

    return {
      minutes,
      seconds,
    };
  } else if (format === 's') {
    // 精确到秒
    const seconds = _toTwo(Math.floor(diffTime.asSeconds()));

    return {
      seconds,
    };
  } else {
    // 全年输出
    const year = diffTime.years(); //年
    const month = diffTime.months(); //月
    const days = diffTime.days(); //天
    const hours = diffTime.hours(); //小时
    const minutes = diffTime.minutes(); //分钟
    const seconds = diffTime.seconds(); //秒
    // console.log(`${day}天${hours}小时${minutes}分${seconds}秒`);
    return {
      year,
      month,
      days,
      hours,
      minutes,
      seconds,
    };
  }
}

/**
 * 更新策略
 */
export function useUpdate(cb: () => void) {
  let requestTimer = null;

  const updateCountdown = (timestamp) => {
    requestTimer = requestAnimationFrame(updateCountdown);
    cb();
  };

  const cancel = () => {
    cancelAnimationFrame(requestTimer);
  };

  onMounted(() => {
    requestTimer = requestAnimationFrame(updateCountdown);
  });

  onUnmounted(() => {
    cancelAnimationFrame(requestTimer);
  });

  return {
    cancel,
  };
}

/**
 * 普通倒计时
 */
export function useCountdown(
  startTime: Ref<number | string>,
  endTime: Ref<number | string>,
  type: ICountdownType,
  extra?: { onFinished: () => void }
) {
  const countdownTime = ref(null);
  const lock = ref(true);
  const nowTime = ref(Date.now());

  // 倒计时状态: 未开始、已结束、进行中
  const coutingStatus = computed<'notStart' | 'expired' | 'counting'>(() => {
    // 没有开始
    if (+startTime.value > nowTime.value) {
      return 'notStart';
    }
    // 已经结束
    else if (+endTime.value <= nowTime.value) {
      return 'expired';
    } else {
      return 'counting';
    }
  });

  /**
   * 解锁
   */
  const unLock = () => {
    lock.value = false;
  };
  watch(
    endTime,
    (val) => {
      if (+val) {
        unLock();
      }
    },
    { immediate: true }
  );

  const { cancel } = useUpdate(() => {
    if (lock.value) return;
    nowTime.value = Date.now();

    // 没有开始
    if (+startTime.value > Date.now()) {
      countdownTime.value = getCountDown(startTime.value, type);
    }

    // 已经结束
    else if (+endTime.value <= Date.now()) {
      extra?.onFinished?.();
      cancel();
    } else {
      countdownTime.value = getCountDown(endTime.value, type);
    }
  });

  return {
    countdownTime,
    coutingStatus,
  };
}

```
