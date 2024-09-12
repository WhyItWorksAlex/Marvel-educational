Учебный проект из курса Петриченко применены следующие методы и подходы:
1. Работа с fetch запросами, 
2. Отрисовка компонентов по циклу,
3. Бесконечный скролл,
4. Стики контент,
5. Работа с состояниями,
6. Работа с сервисным компонентов и его методами.

В компоненте CharInfo реализован поход с помощью пакета prop-types для определения типов пропсов.
<a href="https://ru.legacy.reactjs.org/docs/typechecking-with-proptypes.html">Ссылка на документацию</a>

- Применен компонент ErrorBoundary для ловли ошибок.
- В Компоненте ComicsList применен метод хранения сессии в LocalStorage
- В компоненте App применен способ ленивой загрузки страницы 404
- Использована библиотека Helmet для изменения title и мета информации на каждой странице с динамическим имененм в SingleComicPage
- в компоненте CharInfo и ветке finite-state_machine применен метод конечный автоматов

Применен классовый подход к созданию React приложения, хэши до 03.09.2024

Попробован подход переделки компонента из классового в функциональный

Запуск проекта: npm run start