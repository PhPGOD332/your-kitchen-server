## Твоя Кухня Server

Приложение разработано для компании [**Твоя Кухня**](https://youkuhnya.ru)

### Работа с проектом
#### Установка зависимостей
```bash
yarn
```
или
```bash
npm install
```
---
#### Запуск в режиме разработки

```bash
npm run dev
```
или
```bash
yarn dev
```
---
#### Сборка проекта
```bash
npm run build
```
или
```bash
yarn build
```
---
#### Запуск в production режиме
```bash
npm run start
```
или
```bash
yarn start
```
---
### Стек:
- TypeScript
- Express
- MongoDB

### Архитектура
api:
- index.ts - подключение к БД, настройка cors и подключение всех роутеров

src:
- controllers - функции вызова сервисов
- dtos - создание типа сущностей
- exceptions - ошибки
- features - вспомогательные функции
- middlewares - обработчики перед контроллерами
- models - модели MongoDB
- routes - роутеры
- services - функции получения и обработки данных из БД
- types - типы и интерфейсы

Автор: [Киреев Кирилл](https://t.me/ker4ik13)