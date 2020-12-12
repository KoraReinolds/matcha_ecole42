const sentences = require('./sentences')

const manNames = JSON.parse('["Руслан","Жерар","Цефас","Осип","Харитон","Сергей","Шарль","Иосиф","Пётр","Давид","Борис","Вадим","Устин","Ираклий","Устин","Игорь","Никита","Лукиллиан","Эрик","Виталий","Аким","Борис","Шерлок","Борис","Павел","Яромир","Жигер","Жерар","Макар","Ефим","Савва","Йосып","Иосиф","Захар","Ленар","Эдуард","Шарль","Эрик","Игорь","Цицерон","Йомер","Ким","Цезарь","Павел","Михаил","Михаил","Шамиль","Даниил","Харитон","Оливер","Игнат","Чарльз","Ждан","Устин","Тарас","Семён","Казбек","Зуфар","Цезарь","Цезарь","Спартак","Йомер","Данила","Донат","Чарльз","Болеслав","Эдуард","Осип","Феликс","Харитон","Карл","Тарас","Йонас","Артём","Даниил","Цицерон","Шарль","Яков","Яков","Зиновий","Нестор","Яромир","Йомер","Устин","Лоренс","Зуфар","Юлий","Захар","Юрий","Харитон","Устин","Йозеф","Жигер","Тарас","Платон","Осип","Закир","Геннадий","Руслан"]')
const manLNames = JSON.parse('["Кличко","Силин","Кузьмин","Щукин","Алексеев","Овчаренко","Соловьёв","Антонов","Павлик","Гущин","Макаров","Павлов","Посидайло","Гриневская","Цушко","Фокин","Коваленко","Максимов","Яковенко","Лукашенко","Блохин","Денисов","Зуев","Воронцов","Федункив","Шуфрич","Исаев","Ефремов","Петровский","Родионов","Романов","Степанов","Воронов","Давыдов","Устинов","Чухрай","Савенко","Яворивский","Симоненко","Юдин","Миклашевский","Яковлев","Комаров","Смирнов","Доронин","Сасько","Батейко","Алчевский","Ткаченко","Гончар","Петрик","Максимов","Евдокимов","Пахомов","Бирюков","Марочко","Суханов","Доронин","Андрейко","Моисеев","Правый","Белов","Павлик","Кириленко","Мазайло","Щербаков","Барановский","Белоусов","Фомичёв","Алексеев","Шкраба","Колобов","Бородай","Яковенко","Шестаков","Иванов","Мамонтов","Давыдов","Беляков","Лебедев","Белов","Нестеров","Саксаганский","Осипов","Гончар","Владимиров","Рымар","Петрик","Игнатов","Некрасов","Фролов","Марочко","Недбайло","Ларионов","Медведев","Карпов","Пономарёв","Худобяк","Сергеев"]')
const womanNames = JSON.parse('["Доминика","Цвета","Ирина","Юзефа","Чилита","Федосья","Полина","Полина","Прасковья","Злата","Татьяна","Лада","Ольга","Таисия","Устинья","Жаклин","Олеся","Марта","Цветелина","Христина","Чеслава","Пелагея","Устинья","Цветелина","Прасковья","Пелагея","Шанетта","Таисия","София","Ника","Светлана","Злата","Дарья","Шанетта","Хильда","Светлана","Чара","Йосифа","Антонина","Прасковья","Цара","Элоиза","Марина","Таисия","Шушана","Лариса","Злата","Полина","Федосья","Люся","Олеся","Жасмин","Алиса","Кристина","Пелагея","Фаина","Ирина","Алина","Регина","Василиса","Светлана","Шарлота","Чара","Валерия","Нонна","Ульяна","Цветелина","Юна","Марта","Рада","Хильда","Харитина","Лариса","Юна","Гертруда","Анжелика","Алла","Гелена","Кристина","Зоя","Ирина","Ольга","Светлана","Пелагея","Кристина","Марина","Маргарита","Валентина","Елизавета","Федосья","Зинаида","Чечилия","Лидия","Георгина","Софья","Йолика","Шанетта","Цезария","Прасковья"]')
const womanLNames = JSON.parse('["Самсонова","Виноградова","Кулакова","Маслова","Чикольба","Андрейко","Блохина","Агафонова","Терентьева","Линник","Сирко","Соболева","Барановска","Пархоменко","Королёва","Тарасова","Зимина","Ковалёва","Пархоменко","Лобанова","Воронова","Гамула","Гайчук","Гуляева","Селезнёва","Никонова","Гребневска","Симоненко","Макарова","Громова","Самойлова","Кулагина","Острожска","Шарапова","Хижняк","Гуляева","Бердник","Копылова","Федункив","Фролова","Денисова","Тимошенко","Кудрявцева","Лыткина","Власова","Трофимова","Козлова","Суворова","Ермакова","Коровяк","Линник","Мирна","Евсеева","Харитонова","Белова","Гайчук","Тетерина","Белозёрова","Овчаренко","Быкова","Коновалова","Ефремова","Титова","Тарасова","Носова","Пономаренко","Федосеева","Рыбакова","Цветкова","Павленко","Кабанова","Медяник","Щербакова","Филатова","Кобзар","Сысоева","Дементьева","Хованска","Попова","Новикова","Андрейко","Ковалёва","Шумейко","Гущина","Ланова","Козлова","Кулакова","Сирко","Кобзар","Каськив","Самсонова","Гордеева","Марочко","Макарова","Владимирова","Капустина","Владимирова","Сафонова","Абрамова"]')
const genderArray = [1, 2]
const preferencesArray = [1, 2, 3]
const myLocation = { x: 55.751640, y: 37.616565 }
const tagsArray = ['football', 'TV', 'games', 'poker', 'fishing', 'comics', 'work', 'food', 'rest', 'sex', 'films', 'pizza', 'talk', 'travel']
let imageId = 1
// get random value from min to max
const getRandomValue = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))

// get random value from array
const randomValueFromArray = (arr) => arr[getRandomValue(0, arr.length - 1)]

// get new array with unique values from 'arr' and random length from min to max
const randomArray = (min, max, arr) => {
  let val
  let newArray = []
  while (newArray.length < getRandomValue(min, max)) {
    val = getRandomValue(1, arr.length) - 1
    if (newArray.indexOf(arr[val]) == -1) newArray.push(arr[val])
  }
  return newArray
}

// returns string with values from 'arr'
const randomText = (min, max, arr) => {
  return randomArray(min, max, arr).join(' ')
}

const generateUser = () => {
  const location = {
    x: (myLocation.x * 10000000 - getRandomValue(-2000000, 2000000)) / 10000000,
    y: (myLocation.y * 10000000 - getRandomValue(-2000000, 2000000)) / 10000000,
  }
  const tags = randomArray(1, 5, tagsArray)
  const gender = randomValueFromArray(genderArray)
  const fname = randomValueFromArray(gender === 1 ? manNames : womanNames)
  const lname = randomValueFromArray(gender === 1 ? manLNames : womanLNames)
  const email = `${fname}@mail.ru`
  const age = getRandomValue(18, 28)
  const rating = getRandomValue(0, 1000)
  const preference = randomValueFromArray(preferencesArray)
  const biography = randomText(1, 5, sentences).slice(0, 200)
  const images = [
    { avatar: true, index: 0, src: `https://picsum.photos/id/${getRandomValue(0, 1000)}/200/300` },
    { avatar: false, index: 1, src: `https://picsum.photos/id/${getRandomValue(0, 1000)}/200/300` },
  ]
  return {
    isFilled: true,
    location: myLocation,
    login: `${fname}-${getRandomValue(0, 100000)}`,
    fname,
    lname,
    password: "123",
    email,
    age,
    rating,
    gender,
    preference,
    biography,
    tags,
    images,
    dist: 10,
  }
}

module.exports = {

  generateUsers: (n) => new Array(n).fill(0).map(() => generateUser()),
  generateUser: generateUser,
}
