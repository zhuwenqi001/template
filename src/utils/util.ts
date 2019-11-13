interface DeepCopyCache {
  original: any
  copy: any
}

/**
 * Created by Administrator on 2017/9/21 0021.
 * 封装常用工具函数,包含对原生基本类型的扩展
 */
var weeks = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六'
]
export const util = {
  // extend() {
  //   var options
  //   var name
  //   var src
  //   var copy
  //   var copyIsArray
  //   var clone
  //   var target = arguments[0] || {}
  //   var i = 1
  //   var length = arguments.length
  //   var deep = false

  //   // Handle a deep copy situation
  //   if (typeof target === 'boolean') {
  //     deep = target

  //     // Skip the boolean and the target
  //     target = arguments[i] || {}
  //     i++
  //   }

  //   // Handle case when target is a string or something (possible in deep copy)
  //   if (typeof target !== 'object' && typeof target !== 'function') {
  //     target = {}
  //   }

  //   // Extend jQuery itself if only one argument is passed
  //   if (i === length) {
  //     target = this
  //     i--
  //   }

  //   for (; i < length; i++) {
  //     // Only deal with non-null/undefined values
  //     if ((options = arguments[i]) != null) {
  //       // Extend the base object
  //       for (name in options) {
  //         src = target[name]
  //         copy = options[name]

  //         // Prevent never-ending loop
  //         if (target === copy) {
  //           continue
  //         }

  //         // Recurse if we're merging plain objects or arrays
  //         if (
  //           deep &&
  //           copy &&
  //           (copy.constructor === Object || (copyIsArray = Array.isArray(copy)))
  //         ) {
  //           if (copyIsArray) {
  //             copyIsArray = false
  //             clone = src && Array.isArray(src) ? src : []
  //           } else {
  //             clone = src && src.constructor === Object ? src : {}
  //           }

  //           // Never move original objects, clone them
  //           target[name] = this.extend(deep, clone, copy)

  //           // Don't bring in undefined values
  //         } else if (copy !== undefined) {
  //           target[name] = copy
  //         }
  //       }
  //     }
  //   }
  //   // Return the modified object
  //   return target
  // },
  getCurDate() {
    const date = new Date()
    const year = date.getFullYear()
    let month: string | number = date.getMonth() + 1
    let day: string | number = date.getDate()
    month = month.toString().length > 1 ? month : '0' + month
    day = day.toString().length > 1 ? day : '0' + day
    return { year, month, day }
  },
  getCurTime() {
    const date = new Date()

    let hours: string | number = date.getHours()
    let minutes: string | number = date.getMinutes()
    let seconds: string | number = date.getSeconds()

    hours = hours.toString().length > 1 ? hours : '0' + hours
    minutes = minutes.toString().length > 1 ? minutes : '0' + minutes
    seconds = seconds.toString().length > 1 ? seconds : '0' + seconds

    return { hours, minutes, seconds }
  },
  getWeek() {
    const date = new Date()
    const week = weeks[date.getDay()]
    return { week }
  },
  getCurDateTimeWeek() {
    const date = this.getCurDate()
    const time = this.getCurTime()
    const week = this.getWeek()

    return (
      date.year +
      '-' +
      date.month +
      '-' +
      date.day +
      ' ' +
      time.hours +
      ':' +
      time.minutes +
      ':' +
      time.seconds +
      ' ' +
      week.week
    )
  },
  // dateToStr(now, flag) {
  //   if (!now) return ''
  //   if (typeof now === 'string') return now
  //   var year = now.getFullYear()
  //   var month = now.getMonth() + 1
  //   var date = now.getDate()
  //   var hour = now.getHours()
  //   var min = now.getMinutes()
  //   var sec = now.getSeconds()
  //   if (month < 10) {
  //     month = '0' + month
  //   }
  //   if (date < 10) {
  //     date = '0' + date
  //   }
  //   if (hour < 10) {
  //     hour = '0' + hour
  //   }
  //   if (min < 10) {
  //     min = '0' + min
  //   }
  //   if (sec < 10) {
  //     sec = '0' + sec
  //   }
  //   if (flag === 1) {
  //     return year + '-' + month + '-' + date
  //   } else if (flag === 2) {
  //     return hour + ':' + min
  //   } else if (flag === 3) {
  //     return year + '-' + month + '-' + date + ' ' + hour + ':' + min
  //   }
  // },
  // timeToStr(now, flag) {
  //   if (!now) return ''
  //   now = new Date(now)
  //   var year = now.getFullYear()
  //   var month = now.getMonth() + 1
  //   var date = now.getDate()
  //   var hour = now.getHours()
  //   var min = now.getMinutes()
  //   var sec = now.getSeconds()
  //   if (month < 10) {
  //     month = '0' + month
  //   }
  //   if (date < 10) {
  //     date = '0' + date
  //   }
  //   if (hour < 10) {
  //     hour = '0' + hour
  //   }
  //   if (min < 10) {
  //     min = '0' + min
  //   }
  //   if (sec < 10) {
  //     sec = '0' + sec
  //   }
  //   if (flag === 1) {
  //     return year + '-' + month + '-' + date
  //   } else if (flag === 2) {
  //     return hour + ':' + min + ':' + sec
  //   } else if (flag === 3) {
  //     return (
  //       year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec
  //     )
  //   }
  // },
  deepCopy<T>(obj: T, cache: DeepCopyCache[] = []): T {
    function find(list: any[], f: (param: any) => boolean) {
      return list.filter(f)[0]
    }
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
      return hit.copy
    }

    const copy: any = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
      original: obj,
      copy
    })

    Object.keys(obj).forEach(key => {
      copy[key] = this.deepCopy((<any>obj)[key], cache)
    })

    return copy
  }
  //   isObject: input => typeof input === 'object' && !(input instanceof Array),
  //   isEmptyObject(e) {
  //     let t
  //     for (t in e) {
  //       return !1
  //     }
  //     return !0
  //   },
  //   param2Obj(url) {
  //     const search = url.split('?')[1]
  //     if (!search) {
  //       return {}
  //     }
  //     return JSON.parse(
  //       '{"' +
  //         decodeURIComponent(search)
  //           .replace(/"/g, '\\"')
  //           .replace(/&/g, '","')
  //           .replace(/=/g, '":"')
  //           .replace(/\+/g, ' ') +
  //         '"}'
  //     )
  //   }
  //
}
