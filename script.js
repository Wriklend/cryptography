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
  // Shennon.innerHTML = ` Шеннон: ${encriptionShennon(input.value)}`
  // verticalPermutation.innerHTML = ` Вертикальная перестановка: ${encryptionVerticalPermutation(input.value)}`

  RSA.innerHTML = `RSA: ${encryptionRSA(input.value)}`
}

input.oninput = inputHandler

const primes = [
  36307, 36313, 36319, 36341, 36343, 36353, 36373, 36383, 36389, 36433, 36451, 36457, 36467, 36469, 36473, 36479, 36493, 36497, 36523, 36527, 36529, 36541, 36551, 36559, 36563, 36571, 36583, 36587, 36599, 36607, 36629, 36637, 36643, 36653, 36671, 36677, 36683, 36691, 36697, 36709, 36713, 36721, 36739, 36749, 36761, 36767, 36779, 36781, 36787, 36791, 36793, 36809, 36821, 36833, 36847, 36857, 36871, 36877, 36887, 36899, 36901, 36913, 36919, 36923, 36929, 36931, 36943, 36947, 36973, 36979, 36997, 37003, 37013, 37019, 37021, 37039, 37049, 37057, 37061, 37087, 37097, 37117, 37123, 37139, 37159, 37171, 37181, 37189, 37199, 37201, 37217, 37223, 37243, 37253, 37273, 37277, 37307, 37309, 37313, 37321, 37337, 37339, 37357, 37361, 37363, 37369, 37379, 37397, 37409, 37423, 37441, 37447, 37463, 37483, 37489, 37493, 37501, 37507, 37511, 37517, 37529, 37537, 37547, 37549, 37561, 37567, 37571, 37573, 37579, 37589, 37591, 37607, 37619, 37633, 37643, 37649, 37657, 37663, 37691, 37693, 37699, 37717, 37747, 37781, 37783, 37799, 37811, 37813, 37831, 37847, 37853, 37861, 37871, 37879, 37889, 37897, 37907, 37951, 37957, 37963, 37967, 37987, 37991, 37993, 37997, 38011, 38039, 38047, 38053, 38069, 38083, 38113, 38119, 38149, 38153, 38167, 38177, 38183, 38189, 38197, 38201, 38219, 38231, 38237, 38239, 38261, 38273, 38281, 38287, 38299, 38303, 38317, 38321, 38327, 38329, 38333, 38351, 38371, 38377, 38393, 38431, 38447, 38449, 38453, 38459, 38461, 38501, 38543, 38557, 38561, 38567, 38569, 38593, 38603, 38609, 38611, 38629, 38639, 38651, 38653, 38669, 38671, 38677, 38693, 38699, 38707, 38711, 38713, 38723, 38729, 38737, 38747, 38749, 38767, 38783, 38791, 38803, 38821, 38833, 38839, 38851, 38861, 38867, 38873, 38891, 38903, 38917, 38921, 38923, 38933, 38953, 38959, 38971, 38977, 38993, 39019, 39023, 39041, 39043, 39047, 39079, 39089, 39097, 39103, 39107, 39113, 39119, 39133, 39139, 39157, 39161, 39163, 39181, 39191, 39199, 39209, 39217, 39227, 39229, 39233, 39239, 39241, 39251, 39293, 39301, 39313, 39317, 39323, 39341, 39343, 39359, 39367, 39371, 39373, 39383, 39397, 39409, 39419, 39439, 39443, 39451, 39461, 39499, 39503, 39509, 39511, 39521, 39541, 39551, 39563, 39569, 39581, 39607, 39619, 39623, 39631, 39659, 39667, 39671, 39679, 39703, 39709, 39719, 39727, 39733, 39749, 39761, 39769, 39779, 39791, 39799, 39821, 39827, 39829, 39839, 39841, 39847, 39857, 39863, 39869, 39877, 39883, 39887, 39901, 39929, 39937, 39953, 39971, 39979, 39983, 39989, 40009, 40013, 40031, 40037, 40039, 40063, 40087, 40093, 40099, 40111, 40123, 40127, 40129, 40151, 40153, 40163, 40169, 40177, 40189, 40193, 40213, 40231, 40237, 40241, 40253, 40277, 40283, 40289, 40343, 40351, 40357, 40361, 40387, 40423, 40427, 40429, 40433, 40459, 40471, 40483, 40487, 40493, 40499, 40507, 40519, 40529, 40531, 40543, 40559, 40577, 40583, 40591, 40597, 40609, 40627, 40637, 40639, 40693, 40697, 40699, 40709, 40739, 40751, 40759, 40763, 40771, 40787, 40801, 40813, 40819, 40823, 40829, 40841, 40847, 40849, 40853
]

const getBlocks = text => {
  return text.split('').map(char => ALPHABET.indexOf(char))
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
const belazoKey = 'ЗОНД' // Ключ

const belazoMatrix = belazoKey.split('').map(char => alphabetMatrix[alphabetMatrix[0].indexOf(char)]) // Создаем матрицу 

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
      return item === secondCharIndex[index] // Например массив [true, false] === '10'
    })

    //Тут мы преобразуем код равентва в двоичную систему,
    //Затем парсим в десятичную и вызываем функцию из массива, который получен 
    //из объекта с равенствами
    return Object.values(equalsMethods)[parseInt(binaryEqualsCode.reduce((p, c) => p + +c, ''), 2)]()
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

const shennonEncryptRule = text => {
  const m = text.split('').map(char => ALPHABET.indexOf(char)) //Создаем последовательнсть символов текста

  const k = m.map(m => Math.floor(Math.random() * ALPHABET.length)) //Создаем шифрующую последовательность длины равной m.

  return m.map((m, index) => ALPHABET[m ^ k[index]]).join('') //Выполняем операцию исключающего ИЛИ (m XOR k). И возвращаем результат
}

// Вертикальная перестановка 

const verticalPermutationEncryptRule = text => {
  const matrix = []

  const rowLength = 7

  const addVoidSymbols = (text, rowLength) => { // Добавляем _
    if (text.length % rowLength !== 0) {
      return addVoidSymbols(text + '_', rowLength)
    }

    return text
  }

  const proccessedText = addVoidSymbols(text, rowLength)
  const columnLength = Math.ceil(proccessedText.length / rowLength)


  for (let i = 0; i < columnLength; i++) { // Создаем матрицу змейкой
    if (i % 2 === 0) {
      matrix[i] = proccessedText.slice(i * rowLength, rowLength * (i + 1)).split('')
    } else {
      matrix[i] = proccessedText.slice(i * rowLength, rowLength * (i + 1)).split('').reverse()
    }
  }
  const result = []

  for (let i = rowLength - 1; i >= 0; i--) { // Считываем змейкой снизу вверх
    let justFlag = true

    if (justFlag) {
      for (let j = columnLength - 1; j >= 0; j--) {
        result.push(matrix[j][i])
      }
    } else {
      for (let j = 0; j < columnLength; j++) {
        result.push(matrix[j][i])
      }
    }
    justFlag = !justFlag
  }

  return result.join('')
}

// RSA

const RSAEncryptRule = (text) => {

  const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b); // НОД через алгоритм Евклида

  const getPrimeNumber = num => { //Функция, возвращающая взаимно простое число
    for (let i = 2; i < num; i++) {
      if (gcd(i, num) === 1) {
        console.log("вибираем d равное " + i)
        return i
      }
    }
    throw new Error('Что-то не так')
  }

  const getE = (d, p, q) => { // число е, для которого является истинным следующее соотношение (e * d) mod ((p - 1) * (q - 1)) = 1
    for (let i = 2; Number.MAX_SAFE_INTEGER; i++) { // маленькое значение е - потенциально опасно, будем брать числа не меньше 32

      if ((i * d) % ((p - 1) * (q - 1)) === 1) {
        console.log("выбираем е равное " + i)
        return i
      }
    }
    throw new Error('Не могу найти e')
  }

  const getQ = (p) => {
    const q = primes[Math.floor(Math.random() * primes.length)]

    if (p === q) return getQ(p)

    return q
  }

  // const p = primes[Math.floor(Math.random() * primes.length)]

  const p = 37

  // const q = getQ(p)

  const q = 61

  const n = p * q

  const d = getPrimeNumber((p - 1) * (q - 1)) //Получаем взаимно-простое число

  const e = getE(d, p, q) //Получаем е

  //Открытый ключ - {e, n}, закрытый ключ - {d, n}

  const encryptedText = getBlocks(text).map(item => BigInt(item) ** BigInt(e) % BigInt(n)) // Зашифрованный текст

  const unEcryptedText = encryptedText.map(item => ALPHABET[(BigInt(item) ** BigInt(d)) % BigInt(n)]) //Расшифрованный текст

  console.log('Длина ключа: ', +(p * q).toString(2).length - 1)

  console.log(unEcryptedText)

  return encryptedText.map(item => +item.toString(2)).join(' ')
}

// Функции рендера


const encryptionRSA = text => compose(RSAEncryptRule, normalizeText)(text)

const encryptionVerticalPermutation = text => compose(verticalPermutationEncryptRule, normalizeText)(text)

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