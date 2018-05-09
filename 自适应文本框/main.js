let hiddenTexteara
let HIDDEN_STYLE = `
  height: 0 !important;
  overflow: hidden !important;
  position: fixed !important;
  top: -99999999px !important;
  left: -99999999px !important;
  opacity: 0 !important;
`
let NODE_STYLE = [
  'width',
  'line-height',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'border-width',
  'font-family',
  'font-size',
  'box-sizing'
]

function calcNodeStyle(el) {
  let styles = window.getComputedStyle(el)
  let paddingSize =
    Number.parseFloat(styles.getPropertyValue('padding-top')) +
    Number.parseFloat(styles.getPropertyValue('padding-bottom'))
  let borderSize =
    Number.parseFloat(styles.getPropertyValue('border-top')) +
    Number.parseFloat(styles.getPropertyValue('border-bottom'))
  let boxSizing = styles.getPropertyValue('box-sizing')
  let nodeStyle = NODE_STYLE.map(property => {
    return property + ':' + styles.getPropertyValue(property)
  }).join(';')
  return {
    nodeStyle,
    paddingSize,
    borderSize,
    boxSizing
  }
}

function calcTextareaHeight(el, minRow = 1, maxRow = null) {
  let { nodeStyle, paddingSize, borderSize, boxSizing } = calcNodeStyle(el)
  if (!hiddenTexteara) {
    hiddenTexteara = document.createElement('textarea')
    document.body.appendChild(hiddenTexteara)
  }
  hiddenTexteara.setAttribute('style', `${nodeStyle};${HIDDEN_STYLE}`)
  hiddenTexteara.value = ''
  let singleRowHight = hiddenTexteara.scrollHeight - paddingSize
  hiddenTexteara.value = el.value || el.placeHolder
  let height = hiddenTexteara.scrollHeight
  if (boxSizing === 'border-box') {
    height += borderSize
  } else if (boxSizing === 'content-box') {
    height -= paddingSize
  }
  let result = {}
  if (minRow) {
    let minHeight = minRow * singleRowHight
    if (boxSizing === 'border-box') {
      minHeight += paddingSize + borderSize
    }
    height = Math.max(height, minHeight)
    result.minHeight = `${minHeight}px`
  }
  if (maxRow) {
    let maxHeight = maxRow * singleRowHight
    if (boxSizing === 'border-box') {
      maxHeight += paddingSize + borderSize
    }
    height = Math.min(height, maxHeight)
  }
  result.height = `${height}px`
  hiddenTexteara.parentNode &&
    hiddenTexteara.parentNode.removeChild(hiddenTexteara)
  hiddenTexteara = null
  return result
}

function applyStyle(node, styles) {
  for (let key in styles) {
    node.style[key] = styles[key]
  }
}

let textarea = document.querySelector('.adjust-textarea-container textarea')
applyStyle(textarea, calcTextareaHeight(textarea, 1, 4))
textarea.addEventListener('input', () => {
  applyStyle(textarea, calcTextareaHeight(textarea, 1, 4))
})
