import { Notify } from "quasar";

function success(message) {
  Notify.create({
    type: 'positive',
    position: 'top-right',
    message: `${message}`
  })
}

function error(message) {
  Notify.create({
    type: 'negative',
    position: 'top-right',
    message: `${message}`
  })
}

function warning(message) {
  Notify.create({
    type: 'warning',
    position: 'top-right',
    message: `${message}`
  })
}

export {
  success,
  error,
  warning
}
