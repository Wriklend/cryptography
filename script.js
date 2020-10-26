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

  // Tritemiy.innerHTML = `Тритемий: ${encryptionTritemiy(input.value)}`
  // Belazo.innerHTML = `Белазо: ${encryptionBelazo(input.value)}`
  // Visioner.innerHTML = `Виженер: ${encryptionVisioner(input.value)}`

  // Playfair.innerHTML = ` Плэйфер: ${encriptionPlayfair(input.value)}`
  Shennon.innerHTML = ` Шеннон: ${encriptionShennon(input.value)}`
}

input.oninput = inputHandler

const normalizeText = (text) => text.split('') // Приводим текст к нужному формату
  .map(char => {
    if (char === '.') return 'ТЧК'
    if (char === ',') return 'ЗПТ'
    if (char === ' ') return ''
    return char.toUpperCase()
  }).join('')

const encryptRule = (encryptFunc) => (string) => { // Здесь мы создаем правило для шифрования. Причем правило задается вне функции.
  return string.split('')
    .map((char, index) => isNumber(char) ? char : encryptFunc(char, index, string))
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

const secretChar = 'Л'

const visionerEncryptRule = (char, index, normalizedText) => (
  alphabetMatrix[alphabetMatrix[0].indexOf(index === 0 ? secretChar : normalizedText[index - 1])][alphabetMatrix[0].indexOf(char)]
)

// Шифр Плэйфера

const encryptPlayfair = text => {
  const playfairMatrix = [
    ['Р', 'Е', 'С', 'П', 'У', 'Б', 'Л', 'И'],
    ['К', 'А', 'В', 'Г', 'Д', 'Ж', 'З', 'Й'],
    ['М', 'Н', 'О', 'Т', 'Ф', 'Х', 'Ц', 'Ч'],
    ['Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я']
  ]

  const getMatrixIndex = char => { //Функция, которая определяет индекс у буквы из текста
    const firstIndex = playfairMatrix.findIndex(item => {
      return item.includes(char)
    })
    return [firstIndex, playfairMatrix[firstIndex].indexOf(char)]
  }

  const doEncrypt = chars => {
    const matrixIndexList = chars.split('').map(getMatrixIndex) // Создаем бинарный массив из индексов

    if (matrixIndexList.length === 1) { // Если приходит только одна буква (крайняя), то двигаем ее вправо
      return playfairMatrix[matrixIndexList[0][0]][(matrixIndexList[0][1] + 1) % 7]
    }

    const firstCharIndex = matrixIndexList[0]

    const secondCharIndex = matrixIndexList[1]

    const equalsMethods = { // Это чтобы не хардкодить ифы, все условия добавим в объект
      nothingEqual: () => playfairMatrix[firstCharIndex[0]][secondCharIndex[1]] + playfairMatrix[secondCharIndex[0]][firstCharIndex[1]],
      columnsEqual: () => playfairMatrix[(firstCharIndex[0] + 1) % 4][firstCharIndex[1]] + playfairMatrix[(secondCharIndex[0] + 1) % 4][secondCharIndex[1]],
      rowsEqual: () => playfairMatrix[firstCharIndex[0]][(firstCharIndex[1] + 1) % 8] + playfairMatrix[secondCharIndex[0]][(secondCharIndex[1] + 1) % 8],
      allEqual: () => playfairMatrix[firstCharIndex[0]][firstCharIndex[1]] + 'Ф' + playfairMatrix[secondCharIndex[0]][secondCharIndex[1]],
    }

    const binaryEqualsCode = firstCharIndex.map((item, index) => { // Создаем двоичный код равенства
      return item === secondCharIndex[index]         // Например массив [true, false] === '10'
    }) 

    //Тут мы преобразуем код равентва в двоичную систему,
    //Затем парсим в десятичную и вызываем функцию из массива, который получен 
    //из объекта с равенствами
    return Object.values(equalsMethods)[parseInt(binaryEqualsCode.reduce((p, c) => p + +c, ''),2)]() 
  }

  let result = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i + 1]) {
      result += doEncrypt(text[i] + text[i + 1])
      i++
    } else {
      result += doEncrypt(text[i])
    }
  }
  return result //Перебираем текст по два символа, кидаем результат
}

// Шифр Шеннона

const shennonEncryptRule = (text) => {
  const m = text.split('').map(char => ALPHABET.indexOf(char)) //Создаем последовательнсть символов текста

  const k = m.map(m => Math.floor(Math.random() * ALPHABET.length)) //Создаем шифрующую последовательность длины равной m.

  return m.map((m, index) => ALPHABET[m ^ k[index]]).join('') //Выполняем операцию исключающего ИЛИ (m XOR k). И возвращаем результат
} 

// Функции рендера

const encriptionShennon = text => compose(shennonEncryptRule, normalizeText)(text)

const encriptionPlayfair = text => compose(encryptPlayfair, normalizeText)(text)

const encryptionVisioner = text => compose(encryptRule(visionerEncryptRule), normalizeText)(text)

const encryptionTritemiy = text => compose(encryptRule((char, index) => alphabetMatrix[ALPHABET.indexOf(char)][Math.abs((ALPHABET.indexOf(char) + index - 1) % ALPHABET.length)]), normalizeText)(text)

const encryptionBelazo = text => compose(encryptRule((char, index) => belazoMatrix[index % belazoKey.length + 1][belazoMatrix[0].indexOf(char)]), normalizeText)(text)

// Лабораторная 1
const encryptionCaesar = (text) => compose(encryptRule(char => ALPHABET[(ALPHABET.indexOf(char) + 3) % ALPHABET.length]), normalizeText)(text)

const encryptionATBASH = (text) => compose(encryptRule(char => ALPHABET.split('').reverse()[ALPHABET.indexOf(char)]), normalizeText)(text)

const encryptionPolibiy = (text) => compose(encryptRule(char => polibiyMap[char]), normalizeText)(text)
// Функции расшифрования
const unEncryptionCaesar = (text) => compose(encryptRule(char => ALPHABET[(ALPHABET.indexOf(char) - 3) % ALPHABET.length]), normalizeText)(text)

const unEncryptionATBASH = (text) => compose(encryptRule(char => ALPHABET.split('').reverse()[ALPHABET.indexOf(char)]), normalizeText)(text)