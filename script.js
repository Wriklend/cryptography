const ALPHABET = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'

const input = document.getElementById('input')

const Caesar = document.getElementById('Caesar')

const unCaesar = document.getElementById('unCaesar')

const ATBASH = document.getElementById('ATBASH')

const unATBASH = document.getElementById('unATBASH')

const Polybiy = document.getElementById('Polybiy')

const polibiyMap = {}

function polybiyEncryption() { //Собираем объект для Квадрата Полибия
  const LEN = 6
  
  let i = 1

  let j = 1

  ALPHABET.split('').forEach((item, index) => {
    if ((index + 1) % LEN === 0) {
      polibiyMap[item] = `${j}${i}`
      i = 1
      j += 1
      return
    }
    polibiyMap[item] = `${j}${i}`
    i += 1
  })
}
polybiyEncryption()

function isNumber(char) { // Проверка, является ли символ числом
  return char.charCodeAt() >= 48 && char.charCodeAt() <= 57
}

function compose(...funcs) { // Функция композиции, для разделения логики нормализации текста и шифрования
  if (funcs.length === 0 || funcs.length === 1) {
    return console.log('ошибка в композиции')
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

const inputHandler = (e) => { //Отслеживаем события на изменении ввода текста
  e.preventDefault()
  charsCount.innerHTML = `&nbsp${input.value.length}`

  // Caesar.innerHTML = `Цезарь: ${encryptionCaesar(input.value)}`
  // ATBASH.innerHTML = `АТБАШ: ${encryptionATBASH(input.value)}`
  // Polybiy.innerHTML = `Полибий: ${encryptionPolibiy(input.value)}`

  // unCaesar.innerHTML = `Расшифровка Цезарь: ${unEncryptionCaesar(input.value)}`
  // unATBASH.innerHTML = `Расшифровка АТБАШ: ${unEncryptionATBASH(input.value)}`

  Tritemiy.innerHTML = `Тритемий: ${encryptionTritemiy(input.value)}`
  Belazo.innerHTML = `Белазо: ${encryptionBelazo(input.value)}`
  Visioner.innerHTML = `Виженер: ${encryptionVisioner(input.value)}`

}

const normalizeText = (text) => text.split('') // Приводим текст к нужному формату
  .map(char => {
    if (char === '.') return 'ТЧК'
    if (char === ',') return 'ЗПТ'
    if (char === ' ') return ''
    return char.toUpperCase()
  }).join('')

const encryptRule = (encryptFunc) => (string) => { // Здесь мы создаем правило для шифрования. Причем правило задается вне функции.
  return string.split('')
    .map((char, index) => isNumber(char) ? char : encryptFunc(char, index))
    .join('')
}

// Лабораторная 2
// Шифр Тритемия
const alphabetMatrix = []

for (let i = 0; i < ALPHABET.length; i++) { // Создаем матрицу Тритемия для шифрования
  alphabetMatrix[i] = new Array
  for (let j = 0; j < ALPHABET.length; j++) {
    alphabetMatrix[i].push(ALPHABET[(j + i) % ALPHABET.length])
  }
}

// Шифр Белазо
const belazoKey = 'ЗОНД'

const belazoMatrix = belazoKey.split('').map(char => alphabetMatrix[alphabetMatrix[0].indexOf(char)])

belazoMatrix.unshift(alphabetMatrix[0])

// Шифр Виженера

console.log(alphabetMatrix)
const secretChar = 'Л'

const visionerEncryptRule = (char, index, text) => {
  if (index === 0) {
    return alphabetMatrix[ALPHABET[indexOf(secretChar)]][alphabetMatrix[0].indexOf(char)]
  }
  return alphabetMatrix[ALPHABET[indexOf(text[index - 1])]][alphabetMatrix[0].indexOf(char)]
}

const encryptionVisioner = text => compose(encryptRule((char, index) => text => visionerEncryptRule(char, index)(text)), normalizeText)(text)

const encryptionTritemiy = text => compose(encryptRule((char, index) => alphabetMatrix[ALPHABET.indexOf(char)][Math.abs((ALPHABET.indexOf(char) + index - 1) % ALPHABET.length)]), normalizeText)(text)

const encryptionBelazo = text => compose(encryptRule((char, index) => belazoMatrix[index % 4 + 1][belazoMatrix[0].indexOf(char)]), normalizeText)(text)





 









input.oninput = inputHandler
// Ниже создаем функции шифрования
const encryptionCaesar = (text) => compose(encryptRule(char => ALPHABET[(ALPHABET.indexOf(char) + 3) % ALPHABET.length]), normalizeText)(text)

const encryptionATBASH = (text) => compose(encryptRule(char => ALPHABET.split('').reverse()[ALPHABET.indexOf(char)]), normalizeText)(text)

const encryptionPolibiy = (text) => compose(encryptRule(char => polibiyMap[char]), normalizeText)(text)
// Функции расшифрования
const unEncryptionCaesar = (text) => compose(encryptRule(char => ALPHABET[(ALPHABET.indexOf(char) - 3) % ALPHABET.length]), normalizeText)(text)

const unEncryptionATBASH = (text) => compose(encryptRule(char => ALPHABET.split('').reverse()[ALPHABET.indexOf(char)]), normalizeText)(text)
